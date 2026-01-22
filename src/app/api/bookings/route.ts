import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// GET /api/bookings - получить бронирования пользователя
export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const bookings = await prisma.booking.findMany({
            where: {
                guestId: session.user.id
            },
            include: {
                listing: {
                    select: {
                        id: true,
                        title: true,
                        city: true,
                        images: true,
                        pricePerNight: true
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
        console.error('Error fetching bookings:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST /api/bookings - создать новое бронирование
export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        const body = await request.json();

        const {
            listingId,
            checkIn,
            checkOut,
            guests,
            // Данные арендатора
            guestDetails,
            // Согласия
            consents,
            specialRequests
        } = body;

        // Валидация
        if (!listingId || !checkIn || !checkOut || !guests) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Получаем объект
        const listing = await prisma.listing.findUnique({
            where: { id: listingId }
        });

        if (!listing) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }

        // Расчёт цен
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
        const pricePerNight = listing.pricePerNight;
        const cleaningFee = listing.cleaningFee || 0;
        const serviceFee = Math.round(pricePerNight * nights * 0.1);
        const totalPrice = pricePerNight * nights + cleaningFee + serviceFee;

        // Получаем IP и User-Agent для согласий
        const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';

        // Создаём бронирование с транзакцией
        const booking = await prisma.$transaction(async (tx) => {
            // 1. Создаём бронирование
            const newBooking = await tx.booking.create({
                data: {
                    listingId,
                    guestId: session?.user?.id || 'guest',
                    hostId: listing.hostId,
                    checkIn: checkInDate,
                    checkOut: checkOutDate,
                    guests,
                    nights,
                    pricePerNight,
                    cleaningFee,
                    serviceFee,
                    totalPrice,
                    specialRequests,
                    status: 'PENDING'
                }
            });

            // 2. Сохраняем данные арендатора
            if (guestDetails) {
                await tx.guestDetails.create({
                    data: {
                        bookingId: newBooking.id,
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

            // 3. Сохраняем согласия
            if (consents) {
                const consentRecords = [];

                for (const [type, agreed] of Object.entries(consents)) {
                    if (agreed) {
                        // Находим активный документ
                        const doc = await tx.legalDocument.findFirst({
                            where: {
                                type: type === 'offer' ? 'offer' :
                                    type === 'rentalAgreement' ? 'rental_agreement' :
                                        type === 'privacy' ? 'privacy_policy' : 'house_rules',
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
                                bookingId: newBooking.id
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
🏠 <b>Новое бронирование жилья!</b>

<b>Объект:</b> ${listing.title}
<b>Город:</b> ${listing.city}

<b>Даты:</b> ${checkInDate.toLocaleDateString('ru-RU')} - ${checkOutDate.toLocaleDateString('ru-RU')}
<b>Ночей:</b> ${nights}
<b>Гостей:</b> ${guests}

<b>Сумма:</b> ${totalPrice}₽ (в т.ч. уборка: ${cleaningFee}₽)

<b>Гость:</b> ${guestDetails?.fullName || session?.user?.name || 'Не указано'}
<b>Телефон:</b> ${guestDetails?.phone || session?.user?.email || 'Не указано'}
<b>Email:</b> ${guestDetails?.email || session?.user?.email || 'Не указано'}

<b>Комментарий:</b> ${specialRequests || 'Нет'}
        `;

        // Отправляем асинхронно, не блокируя ответ
        import('@/lib/telegram').then(lib => {
            lib.sendTelegramNotification(message);
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
