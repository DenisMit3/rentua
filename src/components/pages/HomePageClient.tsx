'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Home,
    Car,
    Shield,
    Clock,
    MessageCircle,
    ArrowRight,
    CheckCircle,
    Sparkles
} from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import VehicleCard from '@/components/VehicleCard';
import { Listing } from '@/data/listings';
import { Vehicle } from '@/data/vehicles';

interface HomePageClientProps {
    featuredListings: Listing[];
    featuredVehicles: Vehicle[];
}

export default function HomePageClient({ featuredListings, featuredVehicles }: HomePageClientProps) {
    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-rose-900/60 z-10" />
                    <Image
                        src="https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&q=80&w=1920"
                        alt="Moscow Night"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Animated shapes */}
                <div className="absolute inset-0 z-10 overflow-hidden">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.4, 0.6, 0.4]
                        }}
                        transition={{ duration: 6, repeat: Infinity }}
                    />
                </div>

                {/* Content */}
                <div className="container relative z-20 pt-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/80 mb-6">
                                <Sparkles size={16} className="text-yellow-400" />
                                Аренда по всей России
                            </span>
                        </motion.div>

                        <motion.h1
                            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Жильё и авто
                            <br />
                            <span className="text-gradient">для вашего отдыха</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Квартиры, дома и автомобили от проверенных владельцев.
                            Быстрое бронирование, честные цены, поддержка 24/7.
                        </motion.p>

                        {/* Search tabs */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link
                                href="/listings"
                                className="btn btn-primary text-lg px-8 py-4"
                            >
                                <Home size={20} />
                                Найти жильё
                            </Link>
                            <Link
                                href="/cars"
                                className="btn btn-secondary text-lg px-8 py-4"
                            >
                                <Car size={20} />
                                Найти авто
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="flex flex-wrap justify-center gap-8 md:gap-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">500+</div>
                                <div className="text-gray-400 text-sm">Объектов</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">50+</div>
                                <div className="text-gray-400 text-sm">Автомобилей</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">4.9</div>
                                <div className="text-gray-400 text-sm">Средний рейтинг</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">24/7</div>
                                <div className="text-gray-400 text-sm">Поддержка</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-white rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="section bg-[var(--color-bg)]">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="section-title text-white">
                            Почему выбирают <span className="text-gradient">RentRF</span>
                        </h2>
                        <p className="section-subtitle mx-auto">
                            Мы делаем аренду простой, безопасной и приятной
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Shield,
                                title: 'Проверенные объекты',
                                description: 'Каждый объект проходит верификацию нашей командой'
                            },
                            {
                                icon: Clock,
                                title: 'Быстрое бронирование',
                                description: 'Забронируйте жильё или авто за пару минут'
                            },
                            {
                                icon: MessageCircle,
                                title: 'Поддержка 24/7',
                                description: 'Всегда на связи в Telegram и по телефону'
                            },
                            {
                                icon: CheckCircle,
                                title: 'Честные цены',
                                description: 'Никаких скрытых комиссий и доплат'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                className="card-glass p-6 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient mx-auto mb-4 flex items-center justify-center">
                                    <feature.icon size={24} className="text-white" />
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Listings */}
            <section className="section bg-[var(--color-bg-secondary)]">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                        <div>
                            <h2 className="section-title text-white">
                                Популярное <span className="text-gradient">жильё</span>
                            </h2>
                            <p className="section-subtitle">
                                Лучшие варианты по мнению наших гостей
                            </p>
                        </div>
                        <Link href="/listings" className="btn btn-outline">
                            Все объекты
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredListings.map((listing, index) => (
                            <ListingCard key={listing.id} listing={listing} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Vehicles */}
            <section className="section bg-[var(--color-bg)]">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                        <div>
                            <h2 className="section-title text-white">
                                Популярные <span className="text-gradient">авто</span>
                            </h2>
                            <p className="section-subtitle">
                                Надёжные автомобили для любых целей
                            </p>
                        </div>
                        <Link href="/cars" className="btn btn-outline">
                            Все автомобили
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredVehicles.map((vehicle, index) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Cities Section */}
            <section className="section bg-[var(--color-bg-secondary)]">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="section-title text-white">
                            Работаем по всей <span className="text-gradient">России</span>
                        </h2>
                        <p className="section-subtitle mx-auto">
                            Выберите город для поиска жилья или авто
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { city: 'Москва', image: 'https://picsum.photos/seed/moscow/400/300', count: 234 },
                            { city: 'Санкт-Петербург', image: 'https://picsum.photos/seed/spb/400/300', count: 187 },
                            { city: 'Сочи', image: 'https://picsum.photos/seed/sochi/400/300', count: 156 },
                            { city: 'Казань', image: 'https://picsum.photos/seed/kazan/400/300', count: 98 }
                        ].map((item, index) => (
                            <motion.div
                                key={item.city}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/listings?city=${encodeURIComponent(item.city)}`}
                                    className="block relative aspect-[4/3] rounded-2xl overflow-hidden group"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.city}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-white font-bold text-xl mb-1">{item.city}</h3>
                                        <p className="text-gray-300 text-sm">{item.count} объектов</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient opacity-90" />
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                </div>

                <div className="container relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Готовы забронировать?
                        </h2>
                        <p className="text-xl text-white/80 mb-8">
                            Свяжитесь с нами в Telegram для быстрого бронирования
                            или позвоните — мы поможем выбрать лучший вариант!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://t.me/MikhalinaAnn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-white text-gray-900 hover:bg-gray-100"
                            >
                                <MessageCircle size={20} />
                                Написать Анне в Telegram
                            </a>
                            <a
                                href="tel:+79818188279"
                                className="btn btn-outline border-white text-white hover:bg-white/10"
                            >
                                Позвонить: +7 981 818 8279
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
