// Данные объектов жилья для MVP
export interface Listing {
    id: string;
    title: string;
    description: string;
    type: 'apartment' | 'house' | 'room' | 'studio';
    city: string;
    address: string;
    pricePerNight: number;
    cleaningFee: number;
    images: string[];
    bedrooms: number;
    beds: number;
    bathrooms: number;
    maxGuests: number;
    amenities: string[];
    rating: number;
    reviewsCount: number;
    hostName: string;
    hostAvatar: string;
    instantBook: boolean;
    hasSauna?: boolean;
    saunaPrice?: number;
}

// Список городов России для фильтров
export const russianCities = [
    'Москва',
    'Санкт-Петербург',
    'Сочи',
    'Казань',
    'Нижний Новгород',
    'Екатеринбург',
    'Новосибирск',
    'Краснодар',
    'Калининград',
    'Владивосток',
    'Ростов-на-Дону',
    'Самара',
    'Уфа',
    'Красноярск',
    'Воронеж'
];

export const listings: Listing[] = [
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
        hostAvatar: 'https://picsum.photos/seed/anna/150/150',
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
        hostAvatar: 'https://picsum.photos/seed/max/150/150',
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
        hostAvatar: 'https://picsum.photos/seed/vika/150/150',
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
        hostAvatar: 'https://picsum.photos/seed/oleg/150/150',
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
        hostAvatar: 'https://picsum.photos/seed/elena/150/150',
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
        hostAvatar: 'https://picsum.photos/seed/dima/150/150',
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
        hostAvatar: 'https://picsum.photos/seed/irina/150/150',
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
        hostAvatar: 'https://picsum.photos/seed/andrey/150/150',
        instantBook: false,
        hasSauna: true,
        saunaPrice: 5000
    }
];
