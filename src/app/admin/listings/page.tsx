import prisma from '@/lib/prisma';
import { ListingStatus } from '@prisma/client';
import { CrystalCard } from '@/components/admin/ui/CrystalCard';
import { ListingsClient } from './ListingsClient';

type ListingData = {
    id: string;
    title: string;
    host: string;
    city: string;
    price: number;
    status: ListingStatus;
    image: string;
};

export const revalidate = 0;

export default async function ListingsPage() {
    const listings = await prisma.listing.findMany({
        include: { host: true },
        orderBy: { createdAt: 'desc' },
        take: 100
    });

    const formattedListings: ListingData[] = listings.map(l => ({
        id: l.id,
        title: l.title,
        host: l.host.name || l.host.email || 'Unknown',
        city: l.city,
        price: l.pricePerNight,
        status: l.status,
        image: l.images[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=200&auto=format&fit=crop'
    }));

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Объекты Недвижимости</h1>
                    <p className="text-gray-400 text-sm">Управление объявлениями о сдаче жилья.</p>
                </div>
                <CrystalCard className="px-4 py-3 flex items-center justify-between md:justify-start gap-4 bg-indigo-500/10 border-indigo-500/20 text-indigo-200">
                    <span className="text-sm font-medium">Всего объектов</span>
                    <span className="text-2xl font-bold font-mono text-white">{listings.length}</span>
                </CrystalCard>
            </div>

            <ListingsClient initialData={formattedListings} />
        </div>
    );
}
