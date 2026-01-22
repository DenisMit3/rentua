'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import {
    Home,
    Car,
    Calendar,
    Heart,
    Settings,
    LogOut,
    Plus,
    Bell,
    MessageCircle,
    TrendingUp,
    Users,
    CreditCard,
    ChevronRight
} from 'lucide-react';

interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

interface DashboardContentProps {
    user: User;
}

export default function DashboardContent({ user }: DashboardContentProps) {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Бронирований', value: '0', icon: Calendar, color: 'bg-blue-500/20 text-blue-400' },
        { label: 'В избранном', value: '0', icon: Heart, color: 'bg-rose-500/20 text-rose-400' },
        { label: 'Сообщений', value: '0', icon: MessageCircle, color: 'bg-green-500/20 text-green-400' },
    ];

    const menuItems = [
        { id: 'overview', label: 'Обзор', icon: TrendingUp },
        { id: 'bookings', label: 'Мои бронирования', icon: Calendar },
        { id: 'favorites', label: 'Избранное', icon: Heart },
        { id: 'messages', label: 'Сообщения', icon: MessageCircle },
        { id: 'settings', label: 'Настройки', icon: Settings },
    ];

    return (
        <div className="min-h-screen pt-20">
            <div className="container py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <motion.aside
                        className="lg:col-span-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="card-glass p-6 sticky top-24">
                            {/* User Info */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gradient">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || 'User'}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
                                            {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {user.name || 'Пользователь'}
                                    </h3>
                                    <p className="text-sm text-gray-400">{user.email}</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-1">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id
                                                ? 'bg-primary-500/20 text-primary-400'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <item.icon size={20} />
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </nav>

                            {/* Host CTA */}
                            <div className="mt-6 p-4 bg-gradient rounded-xl">
                                <h4 className="font-semibold text-white mb-2">Стать хостом</h4>
                                <p className="text-sm text-white/80 mb-3">
                                    Сдавайте жильё или авто и зарабатывайте
                                </p>
                                <Link href="/host" className="btn bg-white text-gray-900 w-full text-sm">
                                    <Plus size={16} />
                                    Начать
                                </Link>
                            </div>

                            {/* Logout */}
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full flex items-center gap-3 px-4 py-3 mt-4 text-gray-400 hover:text-red-400 transition-colors"
                            >
                                <LogOut size={20} />
                                <span>Выйти</span>
                            </button>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <motion.main
                        className="lg:col-span-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">
                                    Привет, {user.name?.split(' ')[0] || 'Пользователь'}! 👋
                                </h1>
                                <p className="text-gray-400">Добро пожаловать в личный кабинет</p>
                            </div>
                            <button className="relative p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                                <Bell size={24} className="text-gray-400" />
                                {/* Notification badge */}
                                {/* <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" /> */}
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="card-glass p-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                    <div className="text-gray-400">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Content based on active tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {/* Quick Actions */}
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Быстрые действия</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Link href="/listings" className="card-glass p-6 flex items-center gap-4 group">
                                            <div className="w-14 h-14 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                                <Home size={28} className="text-indigo-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white group-hover:text-gradient transition-all">
                                                    Найти жильё
                                                </h3>
                                                <p className="text-sm text-gray-400">Квартиры и дома посуточно</p>
                                            </div>
                                            <ChevronRight size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                                        </Link>

                                        <Link href="/cars" className="card-glass p-6 flex items-center gap-4 group">
                                            <div className="w-14 h-14 rounded-xl bg-rose-500/20 flex items-center justify-center">
                                                <Car size={28} className="text-rose-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white group-hover:text-gradient transition-all">
                                                    Арендовать авто
                                                </h3>
                                                <p className="text-sm text-gray-400">Автомобили на любой вкус</p>
                                            </div>
                                            <ChevronRight size={20} className="text-gray-500 group-hover:text-white transition-colors" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Recent Activity (empty state) */}
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Последняя активность</h2>
                                    <div className="card-glass p-12 text-center">
                                        <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                                            <Calendar size={32} className="text-gray-500" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white mb-2">Пока нет активности</h3>
                                        <p className="text-gray-400 mb-6">
                                            Забронируйте жильё или авто, чтобы увидеть историю
                                        </p>
                                        <div className="flex gap-4 justify-center">
                                            <Link href="/listings" className="btn btn-primary">
                                                Найти жильё
                                            </Link>
                                            <Link href="/cars" className="btn btn-secondary">
                                                Найти авто
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'bookings' && (
                            <div className="card-glass p-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                                    <Calendar size={32} className="text-gray-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Нет бронирований</h3>
                                <p className="text-gray-400 mb-6">
                                    У вас пока нет активных бронирований
                                </p>
                                <Link href="/listings" className="btn btn-primary">
                                    Найти жильё
                                </Link>
                            </div>
                        )}

                        {activeTab === 'favorites' && (
                            <div className="card-glass p-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                                    <Heart size={32} className="text-gray-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Список избранного пуст</h3>
                                <p className="text-gray-400 mb-6">
                                    Добавляйте понравившиеся объекты в избранное
                                </p>
                                <Link href="/listings" className="btn btn-primary">
                                    Смотреть каталог
                                </Link>
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div className="card-glass p-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                                    <MessageCircle size={32} className="text-gray-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">Нет сообщений</h3>
                                <p className="text-gray-400">
                                    Здесь будут ваши переписки с хозяевами и арендаторами
                                </p>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <div className="card-glass p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Личные данные</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Имя</label>
                                            <input
                                                type="text"
                                                defaultValue={user.name || ''}
                                                className="input"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Email</label>
                                            <input
                                                type="email"
                                                defaultValue={user.email || ''}
                                                className="input"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Телефон</label>
                                            <input
                                                type="tel"
                                                placeholder="+380 99 123 45 67"
                                                className="input"
                                            />
                                        </div>
                                    </div>
                                    <button className="btn btn-primary mt-6">
                                        Сохранить изменения
                                    </button>
                                </div>

                                <div className="card-glass p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Безопасность</h3>
                                    <button className="btn btn-secondary">
                                        Изменить пароль
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.main>
                </div>
            </div>
        </div>
    );
}
