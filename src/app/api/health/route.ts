import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Попытка выполнить простой запрос к базе
        await prisma.$queryRaw`SELECT 1`;

        // Попытка получить количество пользователей (проверка доступа к таблицам)
        const userCount = await prisma.user.count();

        return NextResponse.json({
            status: 'ok',
            message: 'Database connected successfully',
            database: 'postgresql',
            userCount: userCount
        }, { status: 200 });

    } catch (error: any) {
        console.error('Database connection failed:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Database connection failed',
            error: error.message
        }, { status: 500 });
    }
}
