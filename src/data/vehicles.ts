// Данные автомобилей для MVP
export interface Vehicle {
    id: string;
    title: string;
    description: string;
    make: string;
    model: string;
    year: number;
    type: 'sedan' | 'suv' | 'hatchback' | 'minivan' | 'coupe' | 'electric' | 'luxury';
    transmission: 'automatic' | 'manual';
    fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
    city: string;
    pricePerDay: number;
    deposit: number;
    images: string[];
    seats: number;
    doors: number;
    features: string[];
    rating: number;
    reviewsCount: number;
    ownerName: string;
    ownerAvatar: string;
    instantBook: boolean;
    mileageLimit: number | null;
}

export const vehicles: Vehicle[] = [
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
        city: 'Киев',
        pricePerDay: 1800,
        deposit: 10000,
        images: [
            'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
            'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800',
            'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800'
        ],
        seats: 5,
        doors: 4,
        features: ['GPS навигация', 'Камера заднего вида', 'Климат-контроль', 'Bluetooth', 'USB зарядка'],
        rating: 4.9,
        reviewsCount: 56,
        ownerName: 'Игорь',
        ownerAvatar: 'https://i.pravatar.cc/150?img=4',
        instantBook: true,
        mileageLimit: 300
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
        city: 'Киев',
        pricePerDay: 4500,
        deposit: 25000,
        images: [
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
        ],
        seats: 5,
        doors: 5,
        features: ['GPS навигация', 'Панорамная крыша', 'Кожаный салон', 'Парктроники', 'Apple CarPlay'],
        rating: 4.95,
        reviewsCount: 34,
        ownerName: 'Александр',
        ownerAvatar: 'https://i.pravatar.cc/150?img=7',
        instantBook: false,
        mileageLimit: 250
    },
    {
        id: '3',
        title: 'Volkswagen ID.4 2023',
        description: 'Современный электрокар с запасом хода 500 км. Экологично, экономично, стильно.',
        make: 'Volkswagen',
        model: 'ID.4',
        year: 2023,
        type: 'electric',
        transmission: 'automatic',
        fuelType: 'electric',
        city: 'Львов',
        pricePerDay: 2200,
        deposit: 15000,
        images: [
            'https://images.unsplash.com/photo-1619317996009-7d0dbfeffb99?w=800',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
            'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800'
        ],
        seats: 5,
        doors: 5,
        features: ['GPS навигация', 'Autopilot', 'Быстрая зарядка', 'Премиум аудио', 'Подогрев сидений'],
        rating: 4.85,
        reviewsCount: 28,
        ownerName: 'Марина',
        ownerAvatar: 'https://i.pravatar.cc/150?img=10',
        instantBook: true,
        mileageLimit: null
    },
    {
        id: '4',
        title: 'Toyota Sienna 2022',
        description: 'Просторный минивэн для семейных путешествий. 8 мест, огромный багажник, гибридный двигатель.',
        make: 'Toyota',
        model: 'Sienna',
        year: 2022,
        type: 'minivan',
        transmission: 'automatic',
        fuelType: 'hybrid',
        city: 'Одесса',
        pricePerDay: 2800,
        deposit: 15000,
        images: [
            'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
            'https://images.unsplash.com/photo-1571127236794-81c0bbfe1ce3?w=800',
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800'
        ],
        seats: 8,
        doors: 5,
        features: ['GPS навигация', 'Детские кресла', 'DVD система', 'Климат-контроль', 'Камеры 360°'],
        rating: 4.8,
        reviewsCount: 19,
        ownerName: 'Сергей',
        ownerAvatar: 'https://i.pravatar.cc/150?img=11',
        instantBook: true,
        mileageLimit: 400
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
        city: 'Киев',
        pricePerDay: 8000,
        deposit: 50000,
        images: [
            'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
            'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800',
            'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800'
        ],
        seats: 5,
        doors: 4,
        features: ['Массаж сидений', 'Burmester аудио', 'Ночное видение', 'HUD дисплей', 'Автопилот L3'],
        rating: 5.0,
        reviewsCount: 12,
        ownerName: 'Владислав',
        ownerAvatar: 'https://i.pravatar.cc/150?img=13',
        instantBook: false,
        mileageLimit: 200
    },
    {
        id: '6',
        title: 'Volkswagen Polo 2023',
        description: 'Экономичный хэтчбек для города. Компактный, маневренный, низкий расход топлива.',
        make: 'Volkswagen',
        model: 'Polo',
        year: 2023,
        type: 'hatchback',
        transmission: 'manual',
        fuelType: 'petrol',
        city: 'Харьков',
        pricePerDay: 1200,
        deposit: 8000,
        images: [
            'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
            'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'
        ],
        seats: 5,
        doors: 5,
        features: ['GPS навигация', 'Bluetooth', 'Кондиционер', 'USB зарядка'],
        rating: 4.7,
        reviewsCount: 41,
        ownerName: 'Наталья',
        ownerAvatar: 'https://i.pravatar.cc/150?img=16',
        instantBook: true,
        mileageLimit: 350
    }
];
