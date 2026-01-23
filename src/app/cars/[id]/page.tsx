import prisma from '@/lib/prisma';
import VehicleDetailPageClient from '@/components/pages/VehicleDetailPageClient';
import { notFound } from 'next/navigation';
import { Vehicle } from '@/data/vehicles';

export const revalidate = 60;

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function VehicleDetailPage({ params }: PageProps) {
    const { id } = await params;

    // Fetch directly via Prisma
    const v = await prisma.vehicle.findUnique({
        where: { id },
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

    if (!v) {
        notFound();
    }

    const vehicle: Vehicle = {
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
        features: v.features.map(f => f.feature.name),
        rating: v.reviews.length > 0
            ? v.reviews.reduce((acc, r) => acc + r.rating, 0) / v.reviews.length
            : 0,
        reviewsCount: v.reviews.length,
        ownerName: v.owner.name || 'Owner',
        ownerAvatar: v.owner.avatar || '',
        instantBook: v.instantBook,
        mileageLimit: v.mileageLimit ?? null,
        deliveryAvailable: v.deliveryAvailable,
        deliveryRadius: v.deliveryRadius ?? null,
        deliveryPrice: v.deliveryPrice ?? null
    };

    return <VehicleDetailPageClient vehicle={vehicle} />;
}
