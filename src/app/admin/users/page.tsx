import prisma from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import { CrystalCard } from '@/components/admin/ui/CrystalCard';
import { UsersClient } from './UsersClient';

type UserData = {
    id: string;
    name: string | null;
    email: string | null;
    role: UserRole;
    isVerified: boolean;
    createdAt: Date;
    bookingsCount: number;
};

export const revalidate = 0; // Dynamic for Admin

export default async function UsersPage() {
    // 3. Data Fetching
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            // Count relations for stats
            bookingsAsGuest: { select: { id: true } },
            vehicles: { select: { id: true } },
            listings: { select: { id: true } },
        },
        take: 100 // Limit for performance MVP
    });

    const formattedUsers: UserData[] = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        isVerified: u.isVerified,
        createdAt: u.createdAt,
        bookingsCount: u.bookingsAsGuest.length + u.listings.length + u.vehicles.length // Just total activity for now
    }));

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">База Пользователей</h1>
                    <p className="text-gray-400 text-sm">Управление доступом, ролями и верификацией.</p>
                </div>
                <CrystalCard className="px-4 py-3 flex items-center justify-between md:justify-start gap-4 bg-indigo-500/10 border-indigo-500/20 text-indigo-200">
                    <span className="text-sm font-medium">Всего пользователей</span>
                    <span className="text-2xl font-bold font-mono text-white">{users.length}</span>
                </CrystalCard>
            </div>

            <UsersClient initialData={formattedUsers} />
        </div>
    );
}
