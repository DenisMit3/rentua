
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Полные данные из src/data/listings.ts и src/data/vehicles.ts
const listingsData = [
    {
        id: '1',
        title: 'Уютная студия в центре Москвы',
        description: 'Современная студия с панорамным видом на город. Полностью оборудована для комфортного проживания. Рядом метро, рестораны и достопримечательности.',
        type: 'studio',
        city: 'Москва',
        address: 'ул. Тверская, 15',
        pricePerNight: 4500,
        cleaningFee: 1000,
        images: [
            'https://picsum.photos/seed/studio1/800/600',
            'https://picsum.photos/seed/studio1b/800/600',
            'https://picsum.photos/seed/studio1c/800/600'
        ],
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        amenities: ['Wi-Fi', 'Кондиционер', 'Кухня', 'Стиральная машина', 'Телевизор'],
        rating: 4.9,
        reviewsCount: 48,
        hostName: 'Анна',
        instantBook: true
    },
    {
        id: '2',
        title: 'Просторная 2-комнатная квартира',
        description: 'Стильная квартира в новом доме с современным ремонтом. Отличный вариант для семьи или компании друзей. Есть парковка.',
        type: 'apartment',
        city: 'Санкт-Петербург',
        address: 'Невский проспект, 88',
        pricePerNight: 5500,
        cleaningFee: 1200,
        images: [
            'https://picsum.photos/seed/apt2/800/600',
            'https://picsum.photos/seed/apt2b/800/600',
            'https://picsum.photos/seed/apt2c/800/600'
        ],
        bedrooms: 2,
        beds: 2,
        bathrooms: 1,
        maxGuests: 4,
        amenities: ['Wi-Fi', 'Кондиционер', 'Кухня', 'Балкон', 'Паркинг', 'Телевизор'],
        rating: 4.8,
        reviewsCount: 32,
        hostName: 'Максим',
        instantBook: true
    },
    {
        id: '3',
        title: 'Дом с садом у моря',
        description: 'Уютный дом в 5 минутах от пляжа. Большой сад, мангал, беседка. Идеально для семейного отдыха. Тихий район.',
        type: 'house',
        city: 'Сочи',
        address: 'ул. Приморская, 22',
        pricePerNight: 8000,
        cleaningFee: 2000,
        images: [
            'https://picsum.photos/seed/house3/800/600',
            'https://picsum.photos/seed/house3b/800/600',
            'https://picsum.photos/seed/house3c/800/600'
        ],
        bedrooms: 3,
        beds: 4,
        bathrooms: 2,
        maxGuests: 8,
        amenities: ['Wi-Fi', 'Кондиционер', 'Кухня', 'Сад', 'Мангал', 'Парковка', 'Бассейн'],
        rating: 4.95,
        reviewsCount: 67,
        hostName: 'Виктория',
        instantBook: false
    },
    {
        id: '4',
        title: 'Loft в историческом центре',
        description: 'Стильный лофт в отреставрированном здании XIX века. Высокие потолки, кирпичные стены, дизайнерская мебель.',
        type: 'apartment',
        city: 'Казань',
        address: 'ул. Баумана, 8',
        pricePerNight: 3500,
        cleaningFee: 800,
        images: [
            'https://picsum.photos/seed/loft4/800/600',
            'https://picsum.photos/seed/loft4b/800/600',
            'https://picsum.photos/seed/loft4c/800/600'
        ],
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        amenities: ['Wi-Fi', 'Отопление', 'Кухня', 'Кофемашина', 'Телевизор'],
        rating: 4.85,
        reviewsCount: 89,
        hostName: 'Олег',
        instantBook: true
    },
    {
        id: '5',
        title: 'Пентхаус с террасой',
        description: 'Роскошный пентхаус на последнем этаже с огромной террасой. Джакузи, панорамные окна, премиум-класс.',
        type: 'apartment',
        city: 'Москва',
        address: 'Пресненская набережная, 12',
        pricePerNight: 15000,
        cleaningFee: 3000,
        images: [
            'https://picsum.photos/seed/pent5/800/600',
            'https://picsum.photos/seed/pent5b/800/600',
            'https://picsum.photos/seed/pent5c/800/600'
        ],
        bedrooms: 3,
        beds: 3,
        bathrooms: 2,
        maxGuests: 6,
        amenities: ['Wi-Fi', 'Кондиционер', 'Кухня', 'Терраса', 'Джакузи', 'Вид на город', 'Консьерж'],
        rating: 5.0,
        reviewsCount: 23,
        hostName: 'Елена',
        instantBook: false
    },
    {
        id: '6',
        title: 'Комната в центре Краснодара',
        description: 'Уютная комната в просторной квартире. Общая кухня и ванная. Отличный вариант для командировки.',
        type: 'room',
        city: 'Краснодар',
        address: 'ул. Красная, 4',
        pricePerNight: 1500,
        cleaningFee: 500,
        images: [
            'https://picsum.photos/seed/room6/800/600',
            'https://picsum.photos/seed/room6b/800/600',
            'https://picsum.photos/seed/room6c/800/600'
        ],
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 1,
        amenities: ['Wi-Fi', 'Кухня', 'Стиральная машина'],
        rating: 4.6,
        reviewsCount: 15,
        hostName: 'Дмитрий',
        instantBook: true
    },
    {
        id: '7',
        title: 'Апартаменты с видом на Неву',
        description: 'Элегантные апартаменты с потрясающим видом на Неву и Эрмитаж. Исторический центр, рядом все достопримечательности.',
        type: 'apartment',
        city: 'Санкт-Петербург',
        address: 'Дворцовая набережная, 32',
        pricePerNight: 7000,
        cleaningFee: 1500,
        images: [
            'https://picsum.photos/seed/neva7/800/600',
            'https://picsum.photos/seed/neva7b/800/600',
            'https://picsum.photos/seed/neva7c/800/600'
        ],
        bedrooms: 2,
        beds: 2,
        bathrooms: 1,
        maxGuests: 4,
        amenities: ['Wi-Fi', 'Кондиционер', 'Кухня', 'Вид на Неву', 'Паркинг'],
        rating: 4.9,
        reviewsCount: 56,
        hostName: 'Ирина',
        instantBook: true
    },
    {
        id: '8',
        title: 'Коттедж в горах Красной Поляны',
        description: 'Уютный коттедж для горнолыжного отдыха. Камин, сауна, панорамные окна с видом на горы.',
        type: 'house',
        city: 'Сочи',
        address: 'Красная Поляна, ул. Горная, 15',
        pricePerNight: 12000,
        cleaningFee: 2500,
        images: [
            'https://picsum.photos/seed/cottage8/800/600',
            'https://picsum.photos/seed/cottage8b/800/600',
            'https://picsum.photos/seed/cottage8c/800/600'
        ],
        bedrooms: 4,
        beds: 5,
        bathrooms: 2,
        maxGuests: 10,
        amenities: ['Wi-Fi', 'Камин', 'Сауна', 'Кухня', 'Парковка', 'Вид на горы'],
        rating: 4.95,
        reviewsCount: 42,
        hostName: 'Андрей',
        instantBook: false,
        hasSauna: true,
        saunaPrice: 5000
    }
];

const vehiclesData = [
    {
        id: '1',
        title: 'Toyota Camry 2023',
        description: 'Идеальный бизнес-седан для деловых поездок и путешествий. Просторный салон, экономичный расход топлива.',
        make: 'Toyota',
        model: 'Camry',
        year: 2023,
        type: 'sedan',
        transmission: 'automatic',
        fuelType: 'petrol',
        city: 'Москва',
        address: 'ул. Тверская, 22',
        pricePerDay: 5000,
        deposit: 30000,
        images: [
            'https://picsum.photos/seed/camry1/800/600',
            'https://picsum.photos/seed/camry2/800/600',
            'https://picsum.photos/seed/camry3/800/600'
        ],
        seats: 5,
        doors: 4,
        features: ['GPS навигация', 'Камера заднего вида', 'Климат-контроль', 'Bluetooth', 'USB зарядка'],
        rating: 4.9,
        reviewsCount: 56,
        ownerName: 'Игорь',
        instantBook: true,
        mileageLimit: 300,
        deliveryAvailable: true,
        deliveryRadius: 15,
        deliveryPrice: 1000
    },
    {
        id: '2',
        title: 'BMW X5 2022',
        description: 'Премиальный внедорожник для комфортных поездок. Полный привод, роскошный интерьер, мощный двигатель.',
        make: 'BMW',
        model: 'X5',
        year: 2022,
        type: 'suv',
        transmission: 'automatic',
        fuelType: 'diesel',
        city: 'Москва',
        address: 'ул. Новый Арбат, 16',
        pricePerDay: 12000,
        deposit: 80000,
        images: [
            'https://picsum.photos/seed/bmwx5a/800/600',
            'https://picsum.photos/seed/bmwx5b/800/600',
            'https://picsum.photos/seed/bmwx5c/800/600'
        ],
        seats: 5,
        doors: 5,
        features: ['GPS навигация', 'Панорамная крыша', 'Кожаный салон', 'Парктроники', 'Apple CarPlay'],
        rating: 4.95,
        reviewsCount: 34,
        ownerName: 'Александр',
        instantBook: false,
        mileageLimit: 250,
        deliveryAvailable: true,
        deliveryRadius: 20,
        deliveryPrice: 1500
    },
    {
        id: '3',
        title: 'Tesla Model 3 2023',
        description: 'Современный электрокар с запасом хода 500 км. Экологично, экономично, стильно.',
        make: 'Tesla',
        model: 'Model 3',
        year: 2023,
        type: 'electric',
        transmission: 'automatic',
        fuelType: 'electric',
        city: 'Санкт-Петербург',
        address: 'Невский проспект, 100',
        pricePerDay: 7000,
        deposit: 50000,
        images: [
            'https://picsum.photos/seed/tesla3a/800/600',
            'https://picsum.photos/seed/tesla3b/800/600',
            'https://picsum.photos/seed/tesla3c/800/600'
        ],
        seats: 5,
        doors: 4,
        features: ['GPS навигация', 'Autopilot', 'Быстрая зарядка', 'Премиум аудио', 'Подогрев сидений'],
        rating: 4.85,
        reviewsCount: 28,
        ownerName: 'Марина',
        instantBook: true,
        mileageLimit: null,
        deliveryAvailable: true,
        deliveryRadius: 10,
        deliveryPrice: 800
    },
    {
        id: '4',
        title: 'Toyota Alphard 2022',
        description: 'Просторный минивэн для семейных путешествий. 7 мест, огромный багажник, максимальный комфорт.',
        make: 'Toyota',
        model: 'Alphard',
        year: 2022,
        type: 'minivan',
        transmission: 'automatic',
        fuelType: 'hybrid',
        city: 'Сочи',
        address: 'ул. Курортный проспект, 15',
        pricePerDay: 8000,
        deposit: 50000,
        images: [
            'https://picsum.photos/seed/alphard1/800/600',
            'https://picsum.photos/seed/alphard2/800/600',
            'https://picsum.photos/seed/alphard3/800/600'
        ],
        seats: 7,
        doors: 5,
        features: ['GPS навигация', 'Детские кресла', 'DVD система', 'Климат-контроль', 'Камеры 360°'],
        rating: 4.8,
        reviewsCount: 19,
        ownerName: 'Сергей',
        instantBook: true,
        mileageLimit: 400,
        deliveryAvailable: true,
        deliveryRadius: 30,
        deliveryPrice: 2000
    },
    {
        id: '5',
        title: 'Mercedes-Benz S-Class 2023',
        description: 'Флагманский седан для VIP-поездок. Максимальный комфорт, престиж и технологии.',
        make: 'Mercedes-Benz',
        model: 'S-Class',
        year: 2023,
        type: 'luxury',
        transmission: 'automatic',
        fuelType: 'petrol',
        city: 'Москва',
        address: 'ул. Остоженка, 10',
        pricePerDay: 20000,
        deposit: 150000,
        images: [
            'https://picsum.photos/seed/sclass1/800/600',
            'https://picsum.photos/seed/sclass2/800/600',
            'https://picsum.photos/seed/sclass3/800/600'
        ],
        seats: 5,
        doors: 4,
        features: ['Массаж сидений', 'Burmester аудио', 'Ночное видение', 'HUD дисплей', 'Автопилот L3'],
        rating: 5.0,
        reviewsCount: 12,
        ownerName: 'Владислав',
        instantBook: false,
        mileageLimit: 200,
        deliveryAvailable: true,
        deliveryRadius: 30,
        deliveryPrice: 3000
    },
    {
        id: '6',
        title: 'Kia Rio 2023',
        description: 'Экономичный седан для города. Компактный, маневренный, низкий расход топлива.',
        make: 'Kia',
        model: 'Rio',
        year: 2023,
        type: 'sedan',
        transmission: 'automatic',
        fuelType: 'petrol',
        city: 'Казань',
        address: 'ул. Баумана, 45',
        pricePerDay: 3000,
        deposit: 20000,
        images: [
            'https://picsum.photos/seed/rio1/800/600',
            'https://picsum.photos/seed/rio2/800/600',
            'https://picsum.photos/seed/rio3/800/600'
        ],
        seats: 5,
        doors: 4,
        features: ['GPS навигация', 'Bluetooth', 'Кондиционер', 'USB зарядка'],
        rating: 4.7,
        reviewsCount: 41,
        ownerName: 'Наталья',
        instantBook: true,
        mileageLimit: 350,
        deliveryAvailable: true,
        deliveryRadius: 10,
        deliveryPrice: 500
    },
    {
        id: '7',
        title: 'Porsche Cayenne 2023',
        description: 'Спортивный внедорожник премиум-класса. Мощность, динамика и роскошь в одном автомобиле.',
        make: 'Porsche',
        model: 'Cayenne',
        year: 2023,
        type: 'suv',
        transmission: 'automatic',
        fuelType: 'petrol',
        city: 'Санкт-Петербург',
        address: 'Каменноостровский проспект, 25',
        pricePerDay: 15000,
        deposit: 100000,
        images: [
            'https://picsum.photos/seed/cayenne1/800/600',
            'https://picsum.photos/seed/cayenne2/800/600',
            'https://picsum.photos/seed/cayenne3/800/600'
        ],
        seats: 5,
        doors: 5,
        features: ['Sport Chrono', 'Панорамная крыша', 'Bose аудио', 'Адаптивный круиз', 'Парктроники'],
        rating: 4.9,
        reviewsCount: 18,
        ownerName: 'Артём',
        instantBook: false,
        mileageLimit: 200,
        deliveryAvailable: true,
        deliveryRadius: 25,
        deliveryPrice: 2000
    },
    {
        id: '8',
        title: 'Hyundai Solaris 2023',
        description: 'Надёжный и экономичный автомобиль для города и путешествий. Идеален для аренды.',
        make: 'Hyundai',
        model: 'Solaris',
        year: 2023,
        type: 'sedan',
        transmission: 'automatic',
        fuelType: 'petrol',
        city: 'Краснодар',
        address: 'ул. Красная, 100',
        pricePerDay: 2500,
        deposit: 15000,
        images: [
            'https://picsum.photos/seed/solaris1/800/600',
            'https://picsum.photos/seed/solaris2/800/600',
            'https://picsum.photos/seed/solaris3/800/600'
        ],
        seats: 5,
        doors: 4,
        features: ['Кондиционер', 'Bluetooth', 'USB зарядка', 'Подогрев сидений'],
        rating: 4.6,
        reviewsCount: 35,
        ownerName: 'Павел',
        instantBook: true,
        mileageLimit: 400,
        deliveryAvailable: false,
        deliveryRadius: null,
        deliveryPrice: null
    }
];

// SQL to create tables if they don't exist (Manual migration)
async function ensureTablesExist() {
    console.log('Ensuring tables exist...');

    // Enums (handled as check constraints or implicit text usually, but Postgres supports CREATE TYPE)
    // We will simulate enums with TEXT to avoid complex type management in raw SQL for now, or just rely on Prisma expecting them.
    // For simplicity and robustness in this rescue script, we'll create tables.

    await prisma.$executeRawUnsafe(`
        CREATE TABLE IF NOT EXISTS "User" (
            "id" TEXT NOT NULL,
            "name" TEXT,
            "email" TEXT,
            "emailVerified" TIMESTAMP(3),
            "image" TEXT,
            "password" TEXT,
            "phone" TEXT,
            "avatar" TEXT,
            "role" TEXT DEFAULT 'USER',
            "isVerified" BOOLEAN NOT NULL DEFAULT false,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL,
            CONSTRAINT "User_pkey" PRIMARY KEY ("id")
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

        CREATE TABLE IF NOT EXISTS "Account" (
            "id" TEXT NOT NULL,
            "userId" TEXT NOT NULL,
            "type" TEXT NOT NULL,
            "provider" TEXT NOT NULL,
            "providerAccountId" TEXT NOT NULL,
            "refresh_token" TEXT,
            "access_token" TEXT,
            "expires_at" INTEGER,
            "token_type" TEXT,
            "scope" TEXT,
            "id_token" TEXT,
            "session_state" TEXT,
            CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");
        
        CREATE TABLE IF NOT EXISTS "Session" (
            "id" TEXT NOT NULL,
            "sessionToken" TEXT NOT NULL,
            "userId" TEXT NOT NULL,
            "expires" TIMESTAMP(3) NOT NULL,
            CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken");

        CREATE TABLE IF NOT EXISTS "Listing" (
            "id" TEXT NOT NULL,
            "title" TEXT NOT NULL,
            "description" TEXT NOT NULL,
            "slug" TEXT NOT NULL,
            "status" TEXT NOT NULL DEFAULT 'DRAFT',
            "country" TEXT NOT NULL,
            "city" TEXT NOT NULL,
            "address" TEXT NOT NULL,
            "latitude" DOUBLE PRECISION,
            "longitude" DOUBLE PRECISION,
            "propertyType" TEXT NOT NULL,
            "rooms" INTEGER NOT NULL,
            "bedrooms" INTEGER NOT NULL,
            "beds" INTEGER NOT NULL,
            "bathrooms" INTEGER NOT NULL,
            "maxGuests" INTEGER NOT NULL,
            "floor" INTEGER,
            "totalFloors" INTEGER,
            "area" DOUBLE PRECISION,
            "pricePerNight" DOUBLE PRECISION NOT NULL,
            "cleaningFee" DOUBLE PRECISION,
            "deposit" DOUBLE PRECISION,
            "instantBook" BOOLEAN NOT NULL DEFAULT false,
            "images" TEXT[],
            "hasSauna" BOOLEAN NOT NULL DEFAULT false,
            "saunaPrice" DOUBLE PRECISION,
            "views" INTEGER NOT NULL DEFAULT 0,
            "rating" DOUBLE PRECISION DEFAULT 0,
            "hostId" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "Listing_slug_key" ON "Listing"("slug");

        CREATE TABLE IF NOT EXISTS "Amenity" (
            "id" TEXT NOT NULL,
            "name" TEXT NOT NULL,
            "icon" TEXT,
            "category" TEXT NOT NULL,
            CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "Amenity_name_key" ON "Amenity"("name");

        CREATE TABLE IF NOT EXISTS "ListingAmenity" (
            "id" TEXT NOT NULL,
            "listingId" TEXT NOT NULL,
            "amenityId" TEXT NOT NULL,
            CONSTRAINT "ListingAmenity_pkey" PRIMARY KEY ("id")
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "ListingAmenity_listingId_amenityId_key" ON "ListingAmenity"("listingId", "amenityId");

        CREATE TABLE IF NOT EXISTS "Vehicle" (
            "id" TEXT NOT NULL,
            "title" TEXT NOT NULL,
            "description" TEXT NOT NULL,
            "slug" TEXT NOT NULL,
            "status" TEXT NOT NULL DEFAULT 'DRAFT',
            "make" TEXT NOT NULL,
            "model" TEXT NOT NULL,
            "year" INTEGER NOT NULL,
            "color" TEXT,
            "vin" TEXT,
            "vehicleType" TEXT NOT NULL,
            "transmission" TEXT NOT NULL,
            "fuelType" TEXT NOT NULL,
            "seats" INTEGER NOT NULL,
            "doors" INTEGER NOT NULL,
            "engineVolume" DOUBLE PRECISION,
            "enginePower" INTEGER,
            "city" TEXT NOT NULL,
            "address" TEXT NOT NULL,
            "latitude" DOUBLE PRECISION,
            "longitude" DOUBLE PRECISION,
            "pricePerDay" DOUBLE PRECISION NOT NULL,
            "deposit" DOUBLE PRECISION,
            "minRentalDays" INTEGER DEFAULT 1,
            "maxRentalDays" INTEGER DEFAULT 30,
            "minDriverAge" INTEGER,
            "minDrivingExp" INTEGER,
            "mileageLimit" INTEGER,
            "overMileageFee" DOUBLE PRECISION,
            "deliveryAvailable" BOOLEAN NOT NULL DEFAULT false,
            "deliveryRadius" INTEGER,
            "deliveryPrice" DOUBLE PRECISION,
            "instantBook" BOOLEAN NOT NULL DEFAULT false,
            "images" TEXT[],
            "views" INTEGER NOT NULL DEFAULT 0,
            "rating" DOUBLE PRECISION DEFAULT 0,
            "ownerId" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "Vehicle_slug_key" ON "Vehicle"("slug");

        CREATE TABLE IF NOT EXISTS "VehicleFeature" (
            "id" TEXT NOT NULL,
            "name" TEXT NOT NULL,
            "icon" TEXT,
            "category" TEXT NOT NULL,
            CONSTRAINT "VehicleFeature_pkey" PRIMARY KEY ("id")
        );
        CREATE UNIQUE INDEX IF NOT EXISTS "VehicleFeature_name_key" ON "VehicleFeature"("name");

        CREATE TABLE IF NOT EXISTS "VehicleFeatureLink" (
            "id" TEXT NOT NULL,
            "vehicleId" TEXT NOT NULL,
            "featureId" TEXT NOT NULL,
            CONSTRAINT "VehicleFeatureLink_pkey" PRIMARY KEY ("id")
        );
         CREATE UNIQUE INDEX IF NOT EXISTS "VehicleFeatureLink_vehicleId_featureId_key" ON "VehicleFeatureLink"("vehicleId", "featureId");

        CREATE TABLE IF NOT EXISTS "LegalDocument" (
            "id" TEXT NOT NULL,
            "type" TEXT NOT NULL,
            "title" TEXT NOT NULL,
            "content" TEXT NOT NULL,
            "version" TEXT NOT NULL,
            "isActive" BOOLEAN NOT NULL DEFAULT true,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "LegalDocument_pkey" PRIMARY KEY ("id")
        );
    `);
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key !== 'rentua_secret') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        console.log('Seeding database via API...');

        // Ensure tables exist before seeding
        await ensureTablesExist();

        // 1. Create a dummy Host
        const password = await bcrypt.hash('password123', 10);
        const host = await prisma.user.upsert({
            where: { email: 'host@example.com' },
            update: {},
            create: {
                email: 'host@example.com',
                name: 'Super Host',
                password,
                role: "HOST",
                isVerified: true,
                avatar: 'https://picsum.photos/seed/host/150/150'
            }
        });

        // 2. Create Amenities
        const allAmenities = new Set<string>();
        listingsData.forEach(l => l.amenities.forEach(a => allAmenities.add(a)));

        const amenityMap = new Map<string, string>();
        for (const amenityName of allAmenities) {
            const amenity = await prisma.amenity.upsert({
                where: { name: amenityName },
                update: {},
                create: {
                    name: amenityName,
                    icon: 'check-circle',
                    category: 'basic'
                }
            });
            amenityMap.set(amenityName, amenity.id);
        }

        // 3. Create Listings
        let createdListingsCount = 0;
        for (const l of listingsData) {
            const slug = `${l.title.toLowerCase().replace(/[^a-z0-9а-яё]+/g, '-').replace(/^-|-$/g, '')}-${l.id}`;

            const listing = await prisma.listing.upsert({
                where: { slug: slug },
                update: {
                    title: l.title,
                    description: l.description,
                    pricePerNight: l.pricePerNight,
                    cleaningFee: l.cleaningFee,
                    images: l.images,
                    bedrooms: l.bedrooms,
                    beds: l.beds,
                    bathrooms: l.bathrooms,
                    maxGuests: l.maxGuests,
                    instantBook: l.instantBook,
                    hasSauna: (l as any).hasSauna || false,
                    saunaPrice: (l as any).saunaPrice || null,
                },
                create: {
                    title: l.title,
                    description: l.description,
                    slug: slug,
                    status: "ACTIVE",
                    country: 'Россия',
                    city: l.city,
                    address: l.address,
                    latitude: 55.75 + Math.random() * 0.1,
                    longitude: 37.61 + Math.random() * 0.1,
                    propertyType: l.type,
                    rooms: l.bedrooms + 1,
                    bedrooms: l.bedrooms,
                    beds: l.beds,
                    bathrooms: l.bathrooms,
                    maxGuests: l.maxGuests,
                    floor: 1,
                    totalFloors: 5,
                    area: 50 + l.bedrooms * 20,
                    pricePerNight: l.pricePerNight,
                    cleaningFee: l.cleaningFee,
                    instantBook: l.instantBook,
                    images: l.images,
                    hostId: host.id,
                    hasSauna: (l as any).hasSauna || false,
                    saunaPrice: (l as any).saunaPrice || null,
                }
            });

            // Link Amenities
            await prisma.listingAmenity.deleteMany({ where: { listingId: listing.id } });

            for (const amName of l.amenities) {
                const amId = amenityMap.get(amName);
                if (amId) {
                    await prisma.listingAmenity.create({
                        data: { listingId: listing.id, amenityId: amId }
                    });
                }
            }
            createdListingsCount++;
        }

        // 4. Create Vehicle Features
        const allFeatures = new Set<string>();
        vehiclesData.forEach(v => v.features.forEach(f => allFeatures.add(f)));

        const featureMap = new Map<string, string>();
        for (const featureName of allFeatures) {
            const feature = await prisma.vehicleFeature.upsert({
                where: { name: featureName },
                update: {},
                create: {
                    name: featureName,
                    icon: 'check-circle',
                    category: 'default'
                }
            });
            featureMap.set(featureName, feature.id);
        }

        // 5. Create Vehicles
        let createdVehiclesCount = 0;
        for (const v of vehiclesData) {
            const slug = `${v.make.toLowerCase()}-${v.model.toLowerCase()}-${v.year}-${v.id}`.replace(/[^a-z0-9]+/g, '-');

            const vehicle = await prisma.vehicle.upsert({
                where: { slug: slug },
                update: {
                    title: v.title,
                    description: v.description,
                    make: v.make,
                    model: v.model,
                    year: v.year,
                    vehicleType: v.type.toUpperCase() as any,
                    transmission: v.transmission.toUpperCase() as any,
                    fuelType: v.fuelType.toUpperCase() as any,
                    pricePerDay: v.pricePerDay,
                    deposit: v.deposit,
                    images: v.images,
                    seats: v.seats,
                    doors: v.doors,
                    mileageLimit: v.mileageLimit,
                    deliveryAvailable: v.deliveryAvailable,
                    deliveryRadius: v.deliveryRadius,
                    deliveryPrice: v.deliveryPrice,
                    instantBook: v.instantBook,
                    ownerId: host.id,
                },
                create: {
                    title: v.title,
                    description: v.description,
                    slug: slug,
                    status: 'ACTIVE',
                    make: v.make,
                    model: v.model,
                    year: v.year,
                    color: 'Black',
                    vehicleType: v.type.toUpperCase() as any,
                    transmission: v.transmission.toUpperCase() as any,
                    fuelType: v.fuelType.toUpperCase() as any,
                    seats: v.seats,
                    doors: v.doors,
                    city: v.city,
                    address: v.address,
                    latitude: 55.75 + Math.random() * 0.1,
                    longitude: 37.61 + Math.random() * 0.1,
                    pricePerDay: v.pricePerDay,
                    deposit: v.deposit,
                    minRentalDays: 1,
                    maxRentalDays: 30,
                    minDriverAge: 21,
                    minDrivingExp: 2,
                    mileageLimit: v.mileageLimit,
                    deliveryAvailable: v.deliveryAvailable,
                    deliveryRadius: v.deliveryRadius,
                    deliveryPrice: v.deliveryPrice,
                    instantBook: v.instantBook,
                    images: v.images,
                    ownerId: host.id,
                }
            });

            // Link Features
            await prisma.vehicleFeatureLink.deleteMany({ where: { vehicleId: vehicle.id } });

            for (const fName of v.features) {
                const fId = featureMap.get(fName);
                if (fId) {
                    await prisma.vehicleFeatureLink.create({
                        data: { vehicleId: vehicle.id, featureId: fId }
                    });
                }
            }
            createdVehiclesCount++;
        }

        // 6. Create Legal Docs
        const legalDocs = [
            { type: 'offer', title: 'Публичная оферта', content: 'Текст оферты...' },
            { type: 'rental_agreement', title: 'Договор аренды', content: 'Текст договора...' },
            { type: 'privacy_policy', title: 'Политика обработки ПД', content: 'Текст политики...' },
            { type: 'car_rules', title: 'Правила аренды авто', content: 'Текст правил...' }
        ];

        for (const doc of legalDocs) {
            const existing = await prisma.legalDocument.findFirst({
                where: { type: doc.type }
            });

            if (!existing) {
                await prisma.legalDocument.create({
                    data: {
                        type: doc.type,
                        title: doc.title,
                        content: doc.content,
                        version: '1.0'
                    }
                });
            }
        }

        return NextResponse.json({
            status: 'ok',
            message: 'Seed completed successfully',
            stats: {
                listings: createdListingsCount,
                vehicles: createdVehiclesCount,
                amenities: amenityMap.size,
                features: featureMap.size
            }
        });

    } catch (e: any) {
        console.error('Seed error:', e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
