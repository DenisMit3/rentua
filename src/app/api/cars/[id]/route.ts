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

        const formattedVehicle = {
            ...vehicle,
            // images is already an array in Prisma Postgres
            features: vehicle.features.map(f => f.feature.name),
            ownerName: vehicle.owner.name,
            ownerAvatar: vehicle.owner.avatar,
            type: vehicle.vehicleType
        };

        return NextResponse.json(formattedVehicle);

    } catch (error) {
        console.error('Error fetching vehicle:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
