
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const listings = [
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
    }
];

const vehicles = [
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
        ownerAvatar: 'https://picsum.photos/seed/igor/150/150',
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
        ownerAvatar: 'https://picsum.photos/seed/alex/150/150',
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
        ownerAvatar: 'https://picsum.photos/seed/marina/150/150',
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
        ownerAvatar: 'https://picsum.photos/seed/sergey/150/150',
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
        ownerAvatar: 'https://picsum.photos/seed/vlad/150/150',
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
        ownerAvatar: 'https://picsum.photos/seed/natasha/150/150',
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
        ownerAvatar: 'https://picsum.photos/seed/artem/150/150',
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
        ownerAvatar: 'https://picsum.photos/seed/pavel/150/150',
        instantBook: true,
        mileageLimit: 400,
        deliveryAvailable: false,
        deliveryRadius: null,
        deliveryPrice: null
    }
];

async function main() {
    console.log('Seeding database...');

    // 1. Create a dummy Host
    const password = await bcrypt.hash('password123', 10);
    const host = await prisma.user.upsert({
        where: { email: 'host@example.com' },
        update: {},
        create: {
            email: 'host@example.com',
            name: 'Super Host',
            password,
            role: "HOST", // Enum
            isVerified: true
        }
    });

    console.log(`Host created: ${host.id}`);

    // 1.1 Create Admin User
    const adminPassword = await bcrypt.hash('admin', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@rentrf.ru' },
        update: {
            password: adminPassword,
            role: "ADMIN",
        },
        create: {
            email: 'admin@rentrf.ru',
            name: 'Главный Администратор',
            password: adminPassword,
            role: "ADMIN",
            isVerified: true
        }
    });

    console.log(`Admin created: ${admin.id}`);

    // 2. Create Amenities
    // Collect all unique amenities
    const allAmenities = new Set<string>();
    listings.forEach(l => l.amenities.forEach(a => allAmenities.add(a)));

    const amenityMap = new Map<string, string>();

    for (const amenityName of allAmenities) {
        const amenity = await prisma.amenity.upsert({
            where: { name: amenityName },
            update: {},
            create: {
                name: amenityName,
                icon: 'check-circle', // Placeholder
                category: 'basic'
            }
        });
        amenityMap.set(amenityName, amenity.id);
    }

    console.log(`Amenities created: ${amenityMap.size}`);

    // 3. Create Listings
    for (const l of listings) {
        // Create generated slug
        const slug = `${l.title.toLowerCase().replace(/[^a-z0-9а-яё]+/g, '-').replace(/^-|-$/g, '')}-${l.id}`;

        // This is a simplified migration. In a real scenario, we might want to preserve IDs if possible, 
        // but Prisma CUIDs are strings. We will rely on upsert by slug or create new ones.
        // Since we don't have existing IDs that match likely collision, we'll just create or update by slug.

        const listing = await prisma.listing.upsert({
            where: { slug: slug },
            update: {
                title: l.title,
                description: l.description,
                pricePerNight: l.pricePerNight,
                cleaningFee: l.cleaningFee,
                images: { set: l.images },
                bedrooms: l.bedrooms,
                beds: l.beds,
                bathrooms: l.bathrooms,
                maxGuests: l.maxGuests,
                instantBook: l.instantBook,
            },
            create: {
                title: l.title,
                description: l.description,
                slug: slug,
                status: "ACTIVE",
                country: 'Россия',
                city: l.city,
                address: l.address,
                latitude: 55.75 + Math.random() * 0.1, // Random coords near center
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
            }
        });

        // Link Amenities
        // First remove existing links
        await prisma.listingAmenity.deleteMany({
            where: { listingId: listing.id }
        });

        for (const amName of l.amenities) {
            const amId = amenityMap.get(amName);
            if (amId) {
                await prisma.listingAmenity.create({
                    data: {
                        listingId: listing.id,
                        amenityId: amId
                    }
                });
            }
        }
        console.log(`Processed listing: ${l.title}`);
    }

    // 4. Create Vehicles
    console.log('Seeding vehicles...');

    // Collect all unique features
    const allFeatures = new Set<string>();
    vehicles.forEach(v => v.features.forEach(f => allFeatures.add(f)));

    const featureMap = new Map<string, string>();

    for (const featureName of allFeatures) {
        const feature = await prisma.vehicleFeature.upsert({
            where: { name: featureName },
            update: {},
            create: {
                name: featureName,
                icon: 'check-circle', // Placeholder
                category: 'default'
            }
        });
        featureMap.set(featureName, feature.id);
    }

    console.log(`Vehicle Features created: ${featureMap.size}`);

    for (const v of vehicles) {
        // Create generated slug
        const slug = `${v.make.toLowerCase()}-${v.model.toLowerCase()}-${v.year}-${v.id}`.replace(/[^a-z0-9]+/g, '-');

        const vehicle = await prisma.vehicle.upsert({
            where: { slug: slug },
            update: {
                title: v.title,
                description: v.description,
                make: v.make,
                model: v.model,
                year: v.year,
                vehicleType: v.type.toUpperCase() as any, // Map to Enum
                transmission: v.transmission.toUpperCase() as any, // Map to Enum
                fuelType: v.fuelType.toUpperCase() as any, // Map to Enum
                pricePerDay: v.pricePerDay,
                deposit: v.deposit,
                images: { set: v.images },
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
                color: 'Black', // Placeholder
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
        await prisma.vehicleFeatureLink.deleteMany({
            where: { vehicleId: vehicle.id }
        });

        for (const fName of v.features) {
            const fId = featureMap.get(fName);
            if (fId) {
                await prisma.vehicleFeatureLink.create({
                    data: {
                        vehicleId: vehicle.id,
                        featureId: fId
                    }
                });
            }
        }
        console.log(`Processed vehicle: ${v.title}`);
    }

    // 5. Create Legal Documents (for Booking API Consents)
    // To avoid creating duplicates every run, we check by type.
    const legalDocs = [
        { type: 'offer', title: 'Публичная оферта', content: 'Текст оферты...' },
        { type: 'rental_agreement', title: 'Договор аренды', content: 'Текст договора...' },
        { type: 'privacy_policy', title: 'Политика обработки ПД', content: 'Текст политики...' },
        { type: 'car_rules', title: 'Правила аренды авто', content: 'Текст правил...' }
    ];

    for (const doc of legalDocs) {
        // Since we don't have a unique field for type in schema (only ID),
        // we'll try to find first or create.
        // For seed script, we can just create if not exists using findFirst.
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
            console.log(`Created legal doc: ${doc.title}`);
        }
    }

    // 6. Create Sample Bookings and Reviews for Stats
    console.log('Seeding bookings and reviews...');

    // Create a dummy Guest
    const guestPassword = await bcrypt.hash('password123', 10);
    const guest = await prisma.user.upsert({
        where: { email: 'guest@example.com' },
        update: {},
        create: {
            email: 'guest@example.com',
            name: 'Ivan Guest',
            password: guestPassword,
            role: "USER"
        }
    });

    const allListings = await prisma.listing.findMany({ take: 5 });
    const allVehicles = await prisma.vehicle.findMany({ take: 5 });

    for (let i = 0; i < 10; i++) {
        const listing = allListings[i % allListings.length];
        const daysAgo = Math.floor(Math.random() * 20);
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - daysAgo);

        const checkIn = new Date(createdAt);
        checkIn.setDate(checkIn.getDate() + 2);
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + 3);

        await prisma.booking.create({
            data: {
                listingId: listing.id,
                guestId: guest.id,
                hostId: host.id,
                checkIn,
                checkOut,
                guests: 2,
                nights: 3,
                pricePerNight: listing.pricePerNight,
                cleaningFee: listing.cleaningFee || 0,
                serviceFee: 500,
                totalPrice: (listing.pricePerNight * 3) + (listing.cleaningFee || 0) + 500,
                status: 'CONFIRMED',
                createdAt
            }
        });
    }

    for (let i = 0; i < 5; i++) {
        const vehicle = allVehicles[i % allVehicles.length];
        const daysAgo = Math.floor(Math.random() * 15);
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - daysAgo);

        await prisma.vehicleBooking.create({
            data: {
                vehicleId: vehicle.id,
                renterId: guest.id,
                ownerId: host.id,
                pickupDate: new Date(),
                returnDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                pickupTime: "10:00",
                returnTime: "18:00",
                days: 2,
                pickupLocation: vehicle.city,
                returnLocation: vehicle.city,
                pricePerDay: vehicle.pricePerDay,
                totalDaysPrice: vehicle.pricePerDay * 2,
                deposit: vehicle.deposit,
                serviceFee: 300,
                totalPrice: (vehicle.pricePerDay * 2) + 300,
                status: 'CONFIRMED',
                createdAt
            }
        });
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
