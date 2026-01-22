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
    address: string;
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
    deliveryAvailable: boolean;
    deliveryRadius: number | null;
    deliveryPrice: number | null;
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
