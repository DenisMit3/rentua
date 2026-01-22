import { redirect, notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

// Принудительно динамический рендеринг - страница работает с БД
export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ code: string }>;
}

export default async function BookingLinkPage({ params }: PageProps) {
    const { code } = await params;

    // Находим ссылку
    const bookingLink = await prisma.bookingLink.findUnique({
        where: { code: code.toUpperCase() }
    });

    if (!bookingLink) {
        notFound();
    }

    // Проверяем срок действия
    if (bookingLink.expiresAt && new Date() > bookingLink.expiresAt) {
        notFound();
    }

    // Увеличиваем счётчик просмотров
    await prisma.bookingLink.update({
        where: { id: bookingLink.id },
        data: { views: { increment: 1 } }
    });

    // Формируем URL для редиректа
    let redirectUrl = '';
    const queryParams = new URLSearchParams();

    if (bookingLink.checkIn) {
        queryParams.set('checkIn', bookingLink.checkIn.toISOString().split('T')[0]);
    }
    if (bookingLink.checkOut) {
        queryParams.set('checkOut', bookingLink.checkOut.toISOString().split('T')[0]);
    }
    if (bookingLink.guests) {
        queryParams.set('guests', bookingLink.guests.toString());
    }
    // Добавляем код ссылки для отслеживания
    queryParams.set('ref', code);

    const query = queryParams.toString();

    if (bookingLink.listingId) {
        redirectUrl = `/listings/${bookingLink.listingId}/booking${query ? `?${query}` : ''}`;
    } else if (bookingLink.vehicleId) {
        redirectUrl = `/cars/${bookingLink.vehicleId}/booking${query ? `?${query}` : ''}`;
    } else {
        notFound();
    }

    redirect(redirectUrl);
}
