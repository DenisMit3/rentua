import prisma from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';
import { CrystalCard } from '@/components/admin/ui/CrystalCard';
import { BookingsClient } from './BookingsClient';

type BookingData = {
    id: string;
    type: 'housing' | 'vehicle';
    target: string;
    customer: string;
    totalPrice: number;
    status: BookingStatus;
    dates: string;
    createdAt: Date;
};

export const revalidate = 0;

export default async function AdminBookingsPage() {
    const [housingBookings, vehicleBookings] = await Promise.all([
        prisma.booking.findMany({
            include: { listing: { select: { title: true } }, guest: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
            take: 50
        }),
        prisma.vehicleBooking.findMany({
            include: { vehicle: { select: { title: true } }, renter: { select: { name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
            take: 50
        })
    ]);

    const formattedBookings: BookingData[] = [
        ...housingBookings.map(b => ({
            id: b.id,
            type: 'housing' as const,
            target: b.listing.title,
            customer: b.guest.name || b.guest.email || 'Guest',
            totalPrice: b.totalPrice,
            status: b.status,
            dates: `${b.checkIn.toLocaleDateString()} - ${b.checkOut.toLocaleDateString()}`,
            createdAt: b.createdAt
        })),
        ...vehicleBookings.map(b => ({
            id: b.id,
            type: 'vehicle' as const,
            target: b.vehicle.title,
            customer: b.renter.name || b.renter.email || 'Guest',
            totalPrice: b.totalDaysPrice, // Adjusting field name for vehicle
            status: b.status,
            dates: `${b.pickupDate.toLocaleDateString()} - ${b.returnDate.toLocaleDateString()}`,
            createdAt: b.createdAt
        }))
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Единая лента заказов</h1>
                    <p className="text-gray-400 text-sm">Мониторинг всех бронирований платформы.</p>
                </div>
                <CrystalCard className="px-4 py-3 flex items-center justify-between md:justify-start gap-4 bg-emerald-500/10 border-emerald-500/20 text-emerald-200">
                    <span className="text-sm font-medium">Всего заказов</span>
                    <span className="text-2xl font-bold font-mono text-white">{formattedBookings.length}</span>
                </CrystalCard>
            </div>

            <BookingsClient initialData={formattedBookings} />
        </div>
    );
}
