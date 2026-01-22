// Данные объектов жилья для MVP
export interface Listing {
    id: string;
    title: string;
    description: string;
    type: 'apartment' | 'house' | 'room' | 'studio';
    city: string;
    address: string;
    pricePerNight: number;
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
}

export const listings: Listing[] = [
    {
        id: '1',
        title: 'Уютная студия в центре Киева',
        description: 'Современная студия с панорамным видом на город. Полностью оборудована для комфортного проживания. Рядом метро, рестораны и достопримечательности.',
        type: 'studio',
        city: 'Киев',
        address: 'ул. Крещатик, 15',
        pricePerNight: 1500,
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
        ],
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        amenities: ['Wi-Fi', 'Кондиционер', 'Кухня', 'Стиральная машина', 'Телевизор'],
        rating: 4.9,
        reviewsCount: 48,
        hostName: 'Анна',
        hostAvatar: 'https://i.pravatar.cc/150?img=1',
        instantBook: true
    },
    {
        id: '2',
        title: 'Просторная 2-комнатная квартира',
        description: 'Стильная квартира в новом доме с современным ремонтом. Отличный вариант для семьи или компании друзей. Есть парковка.',
        type: 'apartment',
        city: 'Одесса',
        address: 'Аркадия, ул. Генуэзская, 5',
        pricePerNight: 2200,
        images: [
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
        ],
        bedrooms: 2,
        beds: 2,
        bathrooms: 1,
        maxGuests: 4,
        amenities: ['Wi-Fi', 'Кондиционер', 'Кухня', 'Балкон', 'Паркинг', 'Телевизор'],
        rating: 4.8,
        reviewsCount: 32,
        hostName: 'Максим',
        hostAvatar: 'https://i.pravatar.cc/150?img=3',
        instantBook: true
    },
    {
        id: '3',
        title: 'Дом с садом у моря',
        description: 'Уютный дом в 5 минутах от пляжа. Большой сад, мангал, беседка. Идеально для семейного отдыха. Тихий район.',
        type: 'house',
        city: 'Одесса',
        address: 'Совиньон, ул. Морская, 22',
        pricePerNight: 4500,
        images: [
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
        ],
        bedrooms: 3,
        beds: 4,
        bathrooms: 2,
        maxGuests: 8,
        amenities: ['Wi-Fi', 'Кондиционер', 'Кухня', 'Сад', 'Мангал', 'Парковка', 'Бассейн'],
        rating: 4.95,
        reviewsCount: 67,
        hostName: 'Виктория',
        hostAvatar: 'https://i.pravatar.cc/150?img=5',
        instantBook: false
    },
    {
        id: '4',
        title: 'Loft в историческом центре',
        description: 'Стильный лофт в отреставрированном здании XIX века. Высокие потолки, кирпичные стены, дизайнерская мебель.',
        type: 'apartment',
        city: 'Львов',
        address: 'пл. Рынок, 8',
        pricePerNight: 1800,
        images: [
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
            'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'
        ],
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        amenities: ['Wi-Fi', 'Отопление', 'Кухня', 'Кофемашина', 'Телевизор'],
        rating: 4.85,
        reviewsCount: 89,
        hostName: 'Олег',
        hostAvatar: 'https://i.pravatar.cc/150?img=8',
        instantBook: true
    },
    {
        id: '5',
        title: 'Пентхаус с террасой',
        description: 'Роскошный пентхаус на последнем этаже с огромной террасой. Джакузи, панорамные окна, премиум-класс.',
        type: 'apartment',
        city: 'Киев',
        address: 'Печерск, ул. Леси Украинки, 7',
        pricePerNight: 6500,
        images: [
            'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
            'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800'
        ],
        bedrooms: 3,
        beds: 3,
        bathrooms: 2,
        maxGuests: 6,
        amenities: ['Wi-Fi', 'Кондиционер', 'Кухня', 'Терраса', 'Джакузи', 'Вид на город', 'Консьерж'],
        rating: 5.0,
        reviewsCount: 23,
        hostName: 'Елена',
        hostAvatar: 'https://i.pravatar.cc/150?img=9',
        instantBook: false
    },
    {
        id: '6',
        title: 'Комната в центре Харькова',
        description: 'Уютная комната в просторной квартире. Общая кухня и ванная. Отличный вариант для командировки.',
        type: 'room',
        city: 'Харьков',
        address: 'пл. Свободы, 4',
        pricePerNight: 600,
        images: [
            'https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800',
            'https://images.unsplash.com/photo-1598928506311-c55ez69f3af?w=800',
            'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800'
        ],
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 1,
        amenities: ['Wi-Fi', 'Кухня', 'Стиральная машина'],
        rating: 4.6,
        reviewsCount: 15,
        hostName: 'Дмитрий',
        hostAvatar: 'https://i.pravatar.cc/150?img=12',
        instantBook: true
    }
];
