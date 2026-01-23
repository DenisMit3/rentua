
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const listing = await prisma.listing.findUnique({
            where: { id },
            include: {
                host: {
                    select: {
                        name: true,
                        avatar: true
                    }
                },
                amenities: {
                    include: {
                        amenity: true
                    }
                },
                reviews: {
                    select: {
                        rating: true,
                        comment: true,
                        author: { select: { name: true } }
                    }
                }
            }
        });

        if (!listing) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        const avgRating = listing.reviews.length > 0
            ? listing.reviews.reduce((acc, r) => acc + r.rating, 0) / listing.reviews.length
            : 0;

        const mappedListing = {
            ...listing,
            images: JSON.parse(listing.images),
            type: listing.propertyType,
            amenities: listing.amenities.map(a => a.amenity.name),
            reviewsCount: listing.reviews.length,
            rating: avgRating || 5.0,
            hostName: listing.host.name,
            hostAvatar: listing.host.avatar
        };

        return NextResponse.json(mappedListing);
    } catch (error) {
        console.error('Error fetching listing:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
