
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city');
        const type = searchParams.get('type');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const search = searchParams.get('search');

        const where: Prisma.ListingWhereInput = {
            status: 'ACTIVE',
        };

        if (city && city !== 'Все города') {
            where.city = city;
        }

        if (type && type !== 'all') {
            where.propertyType = type;
        }

        if (minPrice || maxPrice) {
            where.pricePerNight = {};
            if (minPrice) where.pricePerNight.gte = parseFloat(minPrice);
            if (maxPrice) where.pricePerNight.lte = parseFloat(maxPrice);
        }

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
            ];
        }

        const listings = await prisma.listing.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                title: true,
                description: true,
                city: true,
                address: true,
                pricePerNight: true,
                images: true,
                propertyType: true,
                maxGuests: true,
                bedrooms: true,
                beds: true,
                bathrooms: true,
                instantBook: true,
                reviews: {
                    select: {
                        rating: true
                    }
                },
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
                }
            }
        });

        // Map to match frontend expectations
        const mappedListings = listings.map(l => {
            const avgRating = l.reviews.length > 0
                ? l.reviews.reduce((acc, r) => acc + r.rating, 0) / l.reviews.length
                : 0;

            return {
                ...l,
                images: l.images, // JSON.parse logic removed, Prisma returns array
                type: l.propertyType,
                rating: avgRating || 5.0,
                reviewsCount: l.reviews.length,
                hostName: l.host.name,
                hostAvatar: l.host.avatar,
                amenities: l.amenities.map(la => la.amenity.name)
            };
        });

        return NextResponse.json(mappedListings);
    } catch (error) {
        console.error('Error fetching listings:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
