import prisma from '@/lib/prisma';
import ListingDetailPageClient from '@/components/pages/ListingDetailPageClient';
import { notFound } from 'next/navigation';
import { Listing } from '@/data/listings';

export const revalidate = 60;

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
    const { id } = await params;

    // Fetch directly via Prisma
    const l = await prisma.listing.findUnique({
        where: { id },
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

    if (!l) {
        notFound();
    }

    const listing: Listing = {
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
        amenities: l.amenities.map(a => a.amenity.name),
        rating: l.reviews.length > 0 ? l.reviews.reduce((acc, r) => acc + r.rating, 0) / l.reviews.length : 0,
        reviewsCount: l.reviews.length,
        hostName: l.host.name || 'Host',
        hostAvatar: l.host.avatar || '',
        instantBook: l.instantBook,
        hasSauna: l.amenities.some(a => a.amenity.name === 'Сауна'),
        saunaPrice: undefined
    };

    return <ListingDetailPageClient listing={listing} />;
}
