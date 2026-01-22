'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Star,
    MapPin,
    Users,
    Bed,
    Bath,
    Home,
    Wifi,
    Wind,
    Tv,
    Car,
    Utensils,
    Waves,
    Heart,
    Share2,
    MessageCircle,
    Phone,
    Calendar,
    CheckCircle,
    Shield
} from 'lucide-react';
import { listings } from '@/data/listings';
import { notFound } from 'next/navigation';

const amenityIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'Wi-Fi': Wifi,
    'Кондиционер': Wind,
    'Телевизор': Tv,
    'Парковка': Car,
    'Паркинг': Car,
    'Кухня': Utensils,
    'Бассейн': Waves,
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ListingDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const listing = listings.find(l => l.id === id);

    if (!listing) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-20 pb-16">
            {/* Back Button */}
            <div className="container mb-6">
                <Link
                    href="/listings"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    Назад к каталогу
                </Link>
            </div>

            {/* Image Gallery */}
            <div className="container mb-8">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                        <Image
                            src={listing.images[0]}
                            alt={listing.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {listing.images.slice(1, 5).map((image, index) => (
                            <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                                <Image
                                    src={image}
                                    alt={`${listing.title} - фото ${index + 2}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        {listing.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-4 text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>{listing.city}, {listing.address}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-white font-medium">{listing.rating}</span>
                                            <span>({listing.reviewsCount} отзывов)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                                        <Heart size={20} />
                                    </button>
                                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="flex flex-wrap gap-6 p-4 bg-white/5 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <Home size={20} className="text-primary-400" />
                                    <span className="text-gray-300">{listing.type === 'apartment' ? 'Квартира' : listing.type === 'house' ? 'Дом' : listing.type === 'studio' ? 'Студия' : 'Комната'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={20} className="text-primary-400" />
                                    <span className="text-gray-300">до {listing.maxGuests} гостей</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bed size={20} className="text-primary-400" />
                                    <span className="text-gray-300">{listing.bedrooms} спальни, {listing.beds} кровати</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bath size={20} className="text-primary-400" />
                                    <span className="text-gray-300">{listing.bathrooms} ванная</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-xl font-semibold text-white mb-4">Описание</h2>
                            <p className="text-gray-300 leading-relaxed">
                                {listing.description}
                            </p>
                        </motion.div>

                        {/* Amenities */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-xl font-semibold text-white mb-4">Удобства</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {listing.amenities.map((amenity) => {
                                    const Icon = amenityIcons[amenity] || CheckCircle;
                                    return (
                                        <div
                                            key={amenity}
                                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                                        >
                                            <Icon size={20} className="text-primary-400" />
                                            <span className="text-gray-300">{amenity}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Host */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="card-glass p-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                    <Image
                                        src={listing.hostAvatar}
                                        alt={listing.hostName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Хозяин: {listing.hostName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <Shield size={14} className="text-green-400" />
                                        <span>Подтверждённый владелец</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Booking Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            className="card-glass p-6 sticky top-24"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {/* Price */}
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl font-bold text-white">
                                    {listing.pricePerNight.toLocaleString()} ₴
                                </span>
                                <span className="text-gray-400">/ ночь</span>
                            </div>

                            {/* Quick Book Info */}
                            {listing.instantBook && (
                                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg mb-6">
                                    <CheckCircle size={18} className="text-green-400" />
                                    <span className="text-green-400 text-sm font-medium">Мгновенное бронирование</span>
                                </div>
                            )}

                            {/* Dates placeholder */}
                            <div className="space-y-4 mb-6">
                                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <Calendar size={20} />
                                        <span>Выберите даты при бронировании</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-3">
                                <a
                                    href={`https://t.me/rentua?text=${encodeURIComponent(`Здравствуйте! Хочу забронировать: ${listing.title}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary w-full"
                                >
                                    <MessageCircle size={20} />
                                    Забронировать в Telegram
                                </a>
                                <a
                                    href="tel:+380991234567"
                                    className="btn btn-secondary w-full"
                                >
                                    <Phone size={20} />
                                    Позвонить
                                </a>
                            </div>

                            {/* Price breakdown hint */}
                            <p className="text-center text-gray-500 text-sm mt-4">
                                Окончательная цена зависит от дат и количества гостей
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
