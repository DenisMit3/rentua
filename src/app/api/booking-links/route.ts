import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Генерация короткого кода
function generateShortCode(length = 6): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Без похожих символов
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// GET /api/booking-links - получить ссылки сотрудника
export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const links = await prisma.bookingLink.findMany({
            where: {
                createdById: session.user.id
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 50
        });

        return NextResponse.json(links);
    } catch (error) {
        console.error('Error fetching booking links:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST /api/booking-links - создать ссылку для шаринга
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const {
            listingId,
            vehicleId,
            checkIn,
            checkOut,
            guests,
            expiresIn // в часах
        } = body;

        // Валидация - должен быть либо listingId, либо vehicleId
        if (!listingId && !vehicleId) {
            return NextResponse.json({ error: 'Either listingId or vehicleId is required' }, { status: 400 });
        }

        // Генерируем уникальный код
        let code: string;
        let isUnique = false;

        while (!isUnique) {
            code = generateShortCode();
            const existing = await prisma.bookingLink.findUnique({
                where: { code }
            });
            if (!existing) isUnique = true;
        }

        // Срок действия
        const expiresAt = expiresIn
            ? new Date(Date.now() + expiresIn * 60 * 60 * 1000)
            : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 дней по умолчанию

        const bookingLink = await prisma.bookingLink.create({
            data: {
                code: code!,
                listingId: listingId || null,
                vehicleId: vehicleId || null,
                checkIn: checkIn ? new Date(checkIn) : null,
                checkOut: checkOut ? new Date(checkOut) : null,
                guests: guests || null,
                expiresAt,
                createdById: session.user.id
            }
        });

        // Формируем полную ссылку
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const fullUrl = `${baseUrl}/b/${bookingLink.code}`;

        return NextResponse.json({
            ...bookingLink,
            url: fullUrl,
            shortUrl: `/b/${bookingLink.code}`
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating booking link:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
