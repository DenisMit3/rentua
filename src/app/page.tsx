import prisma from '@/lib/prisma';
import HomePageClient from '@/components/pages/HomePageClient';
import { Listing } from '@/data/listings';
import { Vehicle } from '@/data/vehicles';

// Revalidate data every hour
// Revalidate data every hour
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // Fetch Listings
  let dbListings: any[] = [];
  try {
    dbListings = await prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      take: 3,
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
  } catch (error) {
    console.error('Failed to fetch listings:', error);
  }

  // Map Prisma Listing to UI Listing
  const featuredListings: Listing[] = dbListings.map(l => ({
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

  // Fetch Vehicles
  let dbVehicles: any[] = [];
  try {
    dbVehicles = await prisma.vehicle.findMany({
      where: { status: 'ACTIVE' },
      take: 3,
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
  } catch (error) {
    console.error('Failed to fetch vehicles:', error);
  }

  // Map Prisma Vehicle to UI Vehicle
  const featuredVehicles: Vehicle[] = dbVehicles.map(v => ({
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

  return (
    <HomePageClient
      featuredListings={featuredListings}
      featuredVehicles={featuredVehicles}
    />
  );
}
