import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        const { id } = params;

        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
            include: {
                features: {
                    include: {
                        feature: true
                    }
                },
                owner: {
                    select: {
                        name: true,
                        avatar: true,
                        createdAt: true
                    }
                },
                reviews: {
                    include: {
                        author: {
                            select: {
                                name: true,
                                avatar: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        if (!vehicle) {
            return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
        }

        // Parse images
        let parsedImages = [];
        try {
            parsedImages = JSON.parse(vehicle.images);
        } catch (e) {
            parsedImages = [vehicle.images];
        }

        const formattedVehicle = {
            ...vehicle,
            images: parsedImages,
            features: vehicle.features.map(f => f.feature.name),
            ownerName: vehicle.owner.name,
            ownerAvatar: vehicle.owner.avatar,
            type: vehicle.vehicleType // Map vehicleType to type for frontend compatibility if needed
        };

        return NextResponse.json(formattedVehicle);

    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
