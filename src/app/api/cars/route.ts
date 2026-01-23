import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma, VehicleType, TransmissionType } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Фильтры
        const city = searchParams.get('city');
        const type = searchParams.get('type');
        const transmission = searchParams.get('transmission');
        const search = searchParams.get('search');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');

        const where: Prisma.VehicleWhereInput = {
            status: 'ACTIVE'
        };

        if (city && city !== 'Все города') {
            where.city = city;
        }

        if (type && type !== 'all') {
            where.vehicleType = type.toUpperCase() as VehicleType;
        }

        if (transmission && transmission !== 'all') {
            where.transmission = transmission.toUpperCase() as TransmissionType;
        }

        if (minPrice || maxPrice) {
            where.pricePerDay = {};
            if (minPrice) where.pricePerDay.gte = parseFloat(minPrice);
            if (maxPrice) where.pricePerDay.lte = parseFloat(maxPrice);
        }

        if (search) {
            where.OR = [
                { make: { contains: search } }, // SQLite search is case-sensitive by default usually, but we removed mode: insensitive
                { model: { contains: search } },
                { title: { contains: search } }
            ];
        }

        const vehicles = await prisma.vehicle.findMany({
            where,
            include: {
                features: {
                    include: {
                        feature: true
                    }
                },
                owner: {
                    select: {
                        name: true,
                        avatar: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Преобразуем данные для фронтенда (features: string[], images: parsed)
        const formattedVehicles = vehicles.map(v => {
            return {
                ...v,
                // images is natively array
                features: v.features.map(f => f.feature.name),
                type: v.vehicleType,
                ownerName: v.owner.name,
                ownerAvatar: v.owner.avatar
            };
        });

        return NextResponse.json(formattedVehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
