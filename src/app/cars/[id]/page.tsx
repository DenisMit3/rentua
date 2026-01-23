'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Star,
    MapPin,
    Users,
    Fuel,
    Settings,
    Gauge,
    Calendar,
    Heart,
    Share2,
    MessageCircle,
    Phone,
    CheckCircle,
    Shield,
    Navigation,
    Bluetooth,
    Camera,
    Thermometer,
    Usb,
    Music,
    CreditCard
} from 'lucide-react';
import { Vehicle } from '@/data/vehicles';
import { notFound } from 'next/navigation';

const featureIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'GPS навигация': Navigation,
    'Bluetooth': Bluetooth,
    'Камера заднего вида': Camera,
    'Климат-контроль': Thermometer,
    'USB зарядка': Usb,
    'Премиум аудио': Music,
};

const fuelTypeLabels: Record<string, string> = {
    petrol: 'Бензин',
    diesel: 'Дизель',
    electric: 'Электро',
    hybrid: 'Гибрид'
};

const transmissionLabels: Record<string, string> = {
    automatic: 'Автоматическая',
    manual: 'Механическая'
};

const vehicleTypeLabels: Record<string, string> = {
    sedan: 'Седан',
    suv: 'Внедорожник',
    hatchback: 'Хэтчбек',
    minivan: 'Минивэн',
    coupe: 'Купе',
    electric: 'Электромобиль',
    luxury: 'Премиум'
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function VehicleDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        async function fetchVehicle() {
            try {
                const res = await fetch(`/api/cars/${id}`);
                if (!res.ok) {
                    if (res.status === 404) notFound();
                    throw new Error('Failed to fetch');
                }
                const data = await res.json();
                setVehicle(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchVehicle();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
                <div className="text-white">Загрузка...</div>
            </div>
        );
    }

    if (!vehicle) {
        // Technically handled by notFound() inside effect but render might happen before notFound() redirect completes if not handled carefully. 
        // We rendered a loading state. If execution reaches here and not loading and no vehicle, meaningful not found.
        return null;
    }

    return (
        <div className="min-h-screen pt-20 pb-16">
            {/* Back Button */}
            <div className="container mb-6">
                <Link
                    href="/cars"
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
                            src={vehicle.images[0]}
                            alt={vehicle.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        {vehicle.fuelType === 'electric' && (
                            <div className="absolute top-4 left-4">
                                <span className="badge badge-primary text-base px-4 py-2">
                                    ⚡ Электромобиль
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {vehicle.images.slice(1, 5).map((image, index) => (
                            <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                                <Image
                                    src={image}
                                    alt={`${vehicle.title} - фото ${index + 2}`}
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
                                        {vehicle.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-4 text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>{vehicle.city}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                            <span className="text-white font-medium">{vehicle.rating}</span>
                                            <span>({vehicle.reviewsCount} отзывов)</span>
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
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-white mb-1">{vehicle.year}</div>
                                    <div className="text-gray-400 text-sm">Год выпуска</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl text-center">
                                    <div className="text-2xl font-bold text-white mb-1">{vehicle.seats}</div>
                                    <div className="text-gray-400 text-sm">Мест</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl text-center">
                                    <div className="text-lg font-bold text-white mb-1">{transmissionLabels[vehicle.transmission]}</div>
                                    <div className="text-gray-400 text-sm">КПП</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl text-center">
                                    <div className="text-lg font-bold text-white mb-1">{fuelTypeLabels[vehicle.fuelType]}</div>
                                    <div className="text-gray-400 text-sm">Топливо</div>
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
                                {vehicle.description}
                            </p>
                        </motion.div>

                        {/* Specifications */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            <h2 className="text-xl font-semibold text-white mb-4">Характеристики</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                                    <span className="text-gray-400">Марка:</span>
                                    <span className="text-white font-medium">{vehicle.make}</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                                    <span className="text-gray-400">Модель:</span>
                                    <span className="text-white font-medium">{vehicle.model}</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                                    <span className="text-gray-400">Тип:</span>
                                    <span className="text-white font-medium">{vehicleTypeLabels[vehicle.type]}</span>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                                    <span className="text-gray-400">Дверей:</span>
                                    <span className="text-white font-medium">{vehicle.doors}</span>
                                </div>
                                {vehicle.mileageLimit && (
                                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg col-span-2">
                                        <Gauge size={20} className="text-primary-400" />
                                        <span className="text-gray-400">Лимит пробега:</span>
                                        <span className="text-white font-medium">{vehicle.mileageLimit} км/день</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-xl font-semibold text-white mb-4">Оснащение</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {vehicle.features.map((feature) => {
                                    const Icon = featureIcons[feature] || CheckCircle;
                                    return (
                                        <div
                                            key={feature}
                                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
                                        >
                                            <Icon size={20} className="text-primary-400" />
                                            <span className="text-gray-300">{feature}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Owner */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="card-glass p-6"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                    <Image
                                        src={vehicle.ownerAvatar}
                                        alt={vehicle.ownerName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        Владелец: {vehicle.ownerName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                                        <Shield size={14} className="text-green-400" />
                                        <span>Проверенный владелец</span>
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
                            {/* Price */}
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-3xl font-bold text-white">
                                    {vehicle.pricePerDay.toLocaleString()} ₽
                                </span>
                                <span className="text-gray-400">/ день</span>
                            </div>

                            {/* Deposit */}
                            <div className="text-gray-400 text-sm mb-6">
                                Залог: {vehicle.deposit.toLocaleString()} ₽
                            </div>

                            {/* Quick Book Info */}
                            {vehicle.instantBook && (
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

                            {/* Requirements */}
                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-6">
                                <h4 className="text-amber-400 font-medium mb-2">Требования</h4>
                                <ul className="text-amber-400/80 text-sm space-y-1">
                                    <li>• Возраст от 21 года</li>
                                    <li>• Стаж вождения от 2 лет</li>
                                    <li>• Действующие водительские права</li>
                                </ul>
                            </div>

                            {/* CTA Buttons */}
                            <div className="space-y-3">
                                <Link
                                    href={`/cars/${vehicle.id}/booking`}
                                    className="btn btn-primary w-full"
                                >
                                    <CreditCard size={20} />
                                    Забронировать онлайн
                                </Link>
                                <a
                                    href={`https://t.me/MikhalinaAnn?text=${encodeURIComponent(`Здравствуйте! Хочу арендовать: ${vehicle.title}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary w-full"
                                >
                                    <MessageCircle size={20} />
                                    Написать в Telegram
                                </a>
                                <a
                                    href="tel:+79818188279"
                                    className="btn btn-outline w-full"
                                >
                                    <Phone size={20} />
                                    Позвонить
                                </a>
                            </div>

                            {/* Price breakdown hint */}
                            <p className="text-center text-gray-500 text-sm mt-4">
                                Цена зависит от срока аренды. Скидки от 3+ дней.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
