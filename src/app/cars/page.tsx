import prisma from '@/lib/prisma';
import CarsPageClient from '@/components/pages/CarsPageClient';
import { Vehicle } from '@/data/vehicles';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CarsPage() {
    let dbVehicles: any[] = [];
    try {
        dbVehicles = await prisma.vehicle.findMany({
            where: { status: 'ACTIVE' },
            orderBy: { createdAt: 'desc' },
            include: {
                owner: true,
                features: {
                    include: {
                        feature: true
                    }
                },
                reviews: {
                    select: {
                        rating: true
                    }
                }
            }
        });
    } catch (e) {
        console.error("Failed to fetch vehicles during build/render:", e);
    }

    const vehicles: Vehicle[] = dbVehicles.map(v => ({
        id: v.id,
        title: v.title,
        description: v.description,
        make: v.make,
        model: v.model,
        year: v.year,
        type: v.vehicleType.toLowerCase() as any,
        transmission: v.transmission.toLowerCase() as any,
        fuelType: v.fuelType.toLowerCase() as any,
        city: v.city,
        address: v.address,
        pricePerDay: v.pricePerDay,
        deposit: v.deposit || 0,
        images: (v.images as unknown) as string[],
        seats: v.seats,
        doors: v.doors,
        features: v.features.map((f: any) => f.feature.name),
        rating: v.reviews.length > 0 ? v.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / v.reviews.length : 0,
        reviewsCount: v.reviews.length,
        ownerName: v.owner.name || 'Owner',
        ownerAvatar: v.owner.avatar || '',
        instantBook: v.instantBook,
        mileageLimit: v.mileageLimit ?? null,
        deliveryAvailable: v.deliveryAvailable,
        deliveryRadius: v.deliveryRadius ?? null,
        deliveryPrice: v.deliveryPrice ?? null
    }));

    return <CarsPageClient initialVehicles={vehicles} />;
}
