import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/vehicle-bookings - получить бронирования машин пользователя
export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const bookings = await prisma.vehicleBooking.findMany({
            where: {
                renterId: session.user.id
            },
            include: {
                vehicle: {
                    select: {
                        id: true,
                        title: true,
                        make: true,
                        model: true,
                        year: true,
                        city: true,
                        images: true,
                        pricePerDay: true
                    }
                },
                guestDetails: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching vehicle bookings:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST /api/vehicle-bookings - создать бронирование машины
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        const body = await request.json();

        const {
            vehicleId,
            pickupDate,
            pickupTime,
            returnDate,
            returnTime,
            pickupLocation,
            returnLocation,
            deliveryRequested,
            // Данные арендатора
            guestDetails,
            // Права
            driverLicense,
            // Согласия
            consents,
            specialRequests
        } = body;

        // Валидация
        if (!vehicleId || !pickupDate || !returnDate) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Получаем машину
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: vehicleId }
        });

        if (!vehicle) {
            return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
        }

        // Расчёт
        const pickupDateObj = new Date(pickupDate);
        const returnDateObj = new Date(returnDate);
        const days = Math.max(1, Math.ceil((returnDateObj.getTime() - pickupDateObj.getTime()) / (1000 * 60 * 60 * 24)));
        const pricePerDay = vehicle.pricePerDay;
        const totalDaysPrice = pricePerDay * days;
        const deposit = vehicle.deposit;
        const serviceFee = Math.round(totalDaysPrice * 0.1);
        const deliveryFee = deliveryRequested ? (vehicle.deliveryPrice || 0) : 0;
        const totalPrice = totalDaysPrice + serviceFee + deliveryFee;

        // IP и User-Agent
        const ip = request.headers.get('x-forwarded-for') || 'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Получаем или создаем пользователя
        let userId = session?.user?.id;

        if (!userId && guestDetails?.email) {
            const user = await prisma.user.upsert({
                where: { email: guestDetails.email },
                update: {
                    name: guestDetails.fullName,
                    phone: guestDetails.phone
                },
                create: {
                    email: guestDetails.email,
                    name: guestDetails.fullName,
                    phone: guestDetails.phone,
                    role: 'USER',
                    isVerified: false
                }
            });
            userId = user.id;
        }

        if (!userId) {
            return NextResponse.json({ error: 'User identification failed' }, { status: 400 });
        }

        // Транзакция
        const booking = await prisma.$transaction(async (tx) => {
            // 1. Создаём бронирование
            const newBooking = await tx.vehicleBooking.create({
                data: {
                    vehicleId,
                    renterId: userId,
                    ownerId: vehicle.ownerId,
                    pickupDate: pickupDateObj,
                    pickupTime: pickupTime || '10:00',
                    returnDate: returnDateObj,
                    returnTime: returnTime || '18:00',
                    days,
                    pickupLocation: pickupLocation || vehicle.address,
                    returnLocation: returnLocation || pickupLocation || vehicle.address,
                    sameReturnLocation: !returnLocation || returnLocation === pickupLocation,
                    pricePerDay,
                    totalDaysPrice,
                    deposit,
                    deliveryFee: deliveryFee > 0 ? deliveryFee : null,
                    serviceFee,
                    totalPrice,
                    driverLicense: driverLicense || null,
                    specialRequests,
                    status: 'PENDING'
                }
            });

            // 2. Данные арендатора
            if (guestDetails) {
                await tx.guestDetails.create({
                    data: {
                        vehicleBookingId: newBooking.id,
                        fullName: guestDetails.fullName,
                        birthDate: new Date(guestDetails.birthDate),
                        phone: guestDetails.phone,
                        email: guestDetails.email,
                        passportSeries: guestDetails.passportSeries || null,
                        passportNumber: guestDetails.passportNumber,
                        passportIssuedBy: guestDetails.passportIssuedBy,
                        passportIssuedDate: new Date(guestDetails.passportIssuedDate),
                        registrationAddress: guestDetails.registrationAddress
                    }
                });
            }

            // 3. Согласия
            if (consents) {
                const consentRecords = [];

                for (const [type, agreed] of Object.entries(consents)) {
                    if (agreed) {
                        const doc = await tx.legalDocument.findFirst({
                            where: {
                                type: type === 'offer' ? 'offer' :
                                    type === 'rentalAgreement' ? 'rental_agreement' :
                                        type === 'privacy' ? 'privacy_policy' : 'car_rules',
                                isActive: true
                            }
                        });

                        if (doc) {
                            consentRecords.push({
                                consentType: type,
                                consentMethod: 'online',
                                ipAddress: ip,
                                userAgent: userAgent,
                                userId: session?.user?.id || null,
                                documentId: doc.id,
                                vehicleBookingId: newBooking.id
                            });
                        }
                    }
                }

                if (consentRecords.length > 0) {
                    await tx.userConsent.createMany({
                        data: consentRecords
                    });
                }
            }

            return newBooking;
        });

        // Отправка уведомления в Telegram
        const message = `
🚗 <b>Новое бронирование автомобиля!</b>

<b>Авто:</b> ${vehicle.make} ${vehicle.model} (${vehicle.year})
<b>Город:</b> ${vehicle.city}

<b>Получение:</b> ${pickupDateObj.toLocaleDateString('ru-RU')} ${pickupTime}
<b>Возврат:</b> ${returnDateObj.toLocaleDateString('ru-RU')} ${returnTime}
<b>Дней:</b> ${days}

<b>Место получения:</b> ${pickupLocation || vehicle.address}
<b>Место возврата:</b> ${returnLocation || pickupLocation || vehicle.address}

<b>Сумма:</b> ${totalPrice}₽ (в т.ч. залог: ${deposit}₽)

<b>Арендатор:</b> ${guestDetails?.fullName || session?.user?.name || 'Не указано'}
<b>Телефон:</b> ${guestDetails?.phone || session?.user?.email || 'Не указано'}
<b>Email:</b> ${guestDetails?.email || session?.user?.email || 'Не указано'}

<b>Нужна доставка:</b> ${deliveryRequested ? 'Да' : 'Нет'}
<b>Комментарий:</b> ${specialRequests || 'Нет'}
        `;

        // Отправляем асинхронно
        import('@/lib/telegram').then(lib => {
            lib.sendTelegramNotification(message);
        });


        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error('Error creating vehicle booking:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
