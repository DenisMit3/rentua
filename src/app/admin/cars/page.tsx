import prisma from '@/lib/prisma';
import { ListingStatus } from '@prisma/client';
import { CrystalCard } from '@/components/admin/ui/CrystalCard';
import { CarsClient } from './CarsClient';

type VehicleData = {
    id: string;
    make: string;
    model: string;
    year: number;
    owner: string;
    price: number;
    status: ListingStatus;
    image: string;
};

export const revalidate = 0;

export default async function AdminVehiclesPage() {
    const vehicles = await prisma.vehicle.findMany({
        include: { owner: true },
        orderBy: { createdAt: 'desc' },
        take: 100
    });

    const formattedVehicles: VehicleData[] = vehicles.map(v => ({
        id: v.id,
        make: v.make,
        model: v.model,
        year: v.year,
        owner: v.owner.name || v.owner.email || 'Unknown',
        price: v.pricePerDay,
        status: v.status as ListingStatus,
        image: v.images[0] || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=200&auto=format&fit=crop'
    }));

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Автопарк Системы</h1>
                    <p className="text-gray-400 text-sm">Управление доступными автомобилями для аренды.</p>
                </div>
                <CrystalCard className="px-4 py-2 flex items-center gap-4 bg-amber-500/10 border-amber-500/20 text-amber-200">
                    <span className="text-sm font-medium">Всего авто</span>
                    <span className="text-2xl font-bold font-mono text-white">{vehicles.length}</span>
                </CrystalCard>
            </div>

            <CarsClient initialData={formattedVehicles} />
        </div>
    );
}
