'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Users,
    Home,
    Car,
    CalendarDays,
    MessageSquare,
    Settings,
    ShieldAlert,
    LogOut,
    Sparkles,
    Menu
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const menuItems = [
    { href: '/admin', label: 'Обзор', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Пользователи', icon: Users },
    { href: '/admin/listings', label: 'Недвижимость', icon: Home },
    { href: '/admin/cars', label: 'Автопарк', icon: Car },
    { href: '/admin/bookings', label: 'Бронирования', icon: CalendarDays },
    { href: '/admin/reviews', label: 'Отзывы', icon: MessageSquare },
    { href: '/admin/settings', label: 'Настройки', icon: Settings },
];

interface AdminSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
    const pathname = usePathname();

    // Close sidebar on navigation (mobile)
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const SidebarContent = () => (
        <>
            {/* Logo Area (Removed as it is now in Header) */}
            <div className="flex h-20 items-center px-8 border-b border-white/5 opacity-0 pointer-events-none" aria-hidden="true" />

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-4 py-8 overflow-y-auto custom-scrollbar">
                <div className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Модули
                </div>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.href} href={item.href} className="group relative block">
                            {/* Active Background Pill */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-transparent"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}

                            {/* Active Left Border Indicator */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"
                                />
                            )}

                            <div
                                className={cn(
                                    'relative flex items-center gap-4 rounded-xl px-4 py-3.5 transition-colors duration-200',
                                    isActive
                                        ? 'text-white'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                                )}
                            >
                                <Icon
                                    size={20}
                                    className={cn(
                                        'transition-colors duration-200',
                                        isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-gray-300'
                                    )}
                                />
                                <span className="text-sm font-medium tracking-wide">{item.label}</span>

                                {isActive && (
                                    <Sparkles size={14} className="ml-auto text-indigo-400/50 animate-pulse" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Profile Stub */}
            <div className="border-t border-white/5 p-4">
                <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/5 group">
                    <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-gray-800">
                        {/* Placeholder Avatar */}
                        <div className="h-full w-full bg-gradient-to-br from-gray-700 to-gray-900" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-white">Administrator</p>
                        <p className="truncate text-xs text-gray-500">System Root</p>
                    </div>
                    <LogOut size={18} className="text-gray-500 group-hover:text-red-400 transition-colors" />
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar (Always Visible) */}
            <aside className="hidden lg:flex w-72 flex-col border-r border-white/5 bg-[#030711]/95 text-white backdrop-blur-xl h-screen sticky top-0">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar (Drawer) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.aside
                            className="fixed inset-y-0 left-0 z-[100] w-72 flex flex-col border-r border-white/5 bg-[#030711] text-white shadow-2xl lg:hidden"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
