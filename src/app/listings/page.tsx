import prisma from '@/lib/prisma';
import ListingsPageClient from '@/components/pages/ListingsPageClient';
import { Listing } from '@/data/listings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ListingsPage() {
    let dbListings: any[] = [];
    try {
        dbListings = await prisma.listing.findMany({
            where: { status: 'ACTIVE' },
            orderBy: { createdAt: 'desc' },
            include: {
                host: true,
                amenities: {
                    include: {
                        amenity: true
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
        console.error("Failed to fetch listings during build/render:", e);
    }

    const listings: Listing[] = dbListings.map(l => ({
        id: l.id,
        title: l.title,
        description: l.description,
        type: l.propertyType as any,
        city: l.city,
        address: l.address,
        pricePerNight: l.pricePerNight,
        cleaningFee: l.cleaningFee || 0,
        images: (l.images as unknown) as string[],
        bedrooms: l.bedrooms,
        beds: l.beds,
        bathrooms: l.bathrooms,
        maxGuests: l.maxGuests,
        amenities: l.amenities.map((a: any) => a.amenity.name),
        rating: l.reviews.length > 0 ? l.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / l.reviews.length : 0,
        reviewsCount: l.reviews.length,
        hostName: l.host.name || 'Host',
        hostAvatar: l.host.avatar || '',
        instantBook: l.instantBook,
        hasSauna: l.amenities.some((a: any) => a.amenity.name === 'Сауна'),
        saunaPrice: undefined
    }));

    return <ListingsPageClient initialListings={listings} />;
}
