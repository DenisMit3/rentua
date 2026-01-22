'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { Home, Car, Menu, X, Phone, MessageCircle, User, LogOut, LayoutDashboard } from 'lucide-react';

export default function Header() {
    const { data: session, status } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient flex items-center justify-center">
                            <span className="text-xl font-bold text-white">R</span>
                        </div>
                        <span className="text-xl font-bold text-white group-hover:text-gradient transition-all">
                            RentRF
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/listings"
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <Home size={18} />
                            <span>Жильё</span>
                        </Link>
                        <Link
                            href="/cars"
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <Car size={18} />
                            <span>Авто</span>
                        </Link>
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="https://t.me/MikhalinaAnn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-300 hover:text-white mr-2"
                        >
                            <MessageCircle size={18} />
                            <span>Связаться с Анной</span>
                        </a>
                        {status === 'loading' ? (
                            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
                        ) : session?.user ? (
                            /* User Menu */
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient flex items-center justify-center">
                                        {session.user.image ? (
                                            <Image
                                                src={session.user.image}
                                                alt={session.user.name || 'User'}
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <span className="text-white font-medium">
                                                {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
                                            </span>
                                        )}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 mt-2 w-56 card-glass rounded-xl overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-white/10">
                                                <p className="text-white font-medium truncate">
                                                    {session.user.name || 'Пользователь'}
                                                </p>
                                                <p className="text-sm text-gray-400 truncate">
                                                    {session.user.email}
                                                </p>
                                            </div>
                                            <div className="p-2">
                                                <Link
                                                    href="/dashboard"
                                                    className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <LayoutDashboard size={18} />
                                                    Личный кабинет
                                                </Link>
                                                <Link
                                                    href="/staff/share"
                                                    className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                >
                                                    <MessageCircle size={18} />
                                                    Генератор ссылок
                                                </Link>
                                                <button
                                                    onClick={() => signOut({ callbackUrl: '/' })}
                                                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                                                >
                                                    <LogOut size={18} />
                                                    Выйти
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            /* Auth Buttons */
                            <>
                                <Link href="/login" className="btn btn-secondary text-sm">
                                    Войти
                                </Link>
                                <Link href="/register" className="btn btn-primary text-sm">
                                    Регистрация
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-white"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </nav>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/10"
                    >
                        <div className="container py-4 flex flex-col gap-4">
                            <Link
                                href="/listings"
                                className="flex items-center gap-3 text-gray-300 hover:text-white py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Home size={20} />
                                <span>Жильё</span>
                            </Link>
                            <Link
                                href="/cars"
                                className="flex items-center gap-3 text-gray-300 hover:text-white py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Car size={20} />
                                <span>Авто</span>
                            </Link>

                            <div className="h-px bg-white/10 my-1" />

                            <a
                                href="https://t.me/MikhalinaAnn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-300 hover:text-white py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <MessageCircle size={20} />
                                <span>Связаться с Анной</span>
                            </a>
                            <a
                                href="tel:+79818188279"
                                className="flex items-center gap-3 text-gray-300 hover:text-white py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <Phone size={20} />
                                <span>+7 981 818 8279</span>
                            </a>

                            <div className="h-px bg-white/10 my-1" />


                            {session?.user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-3 text-gray-300 hover:text-white py-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <LayoutDashboard size={20} />
                                        <span>Личный кабинет</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut({ callbackUrl: '/' });
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="flex items-center gap-3 text-gray-300 hover:text-red-400 py-2"
                                    >
                                        <LogOut size={20} />
                                        <span>Выйти</span>
                                    </button>
                                </>
                            ) : (
                                <div className="flex gap-3 pt-2">
                                    <Link
                                        href="/login"
                                        className="btn btn-secondary flex-1 text-sm"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Войти
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="btn btn-primary flex-1 text-sm"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Регистрация
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
