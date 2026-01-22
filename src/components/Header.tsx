'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Car, Menu, X, Phone, MessageCircle } from 'lucide-react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                            RentUA
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

                    {/* Contact Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="https://t.me/rentua"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary text-sm"
                        >
                            <MessageCircle size={18} />
                            Telegram
                        </a>
                        <a
                            href="tel:+380991234567"
                            className="btn btn-primary text-sm"
                        >
                            <Phone size={18} />
                            Позвонить
                        </a>
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
                            <div className="flex gap-3 pt-2">
                                <a
                                    href="https://t.me/rentua"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary flex-1 text-sm"
                                >
                                    <MessageCircle size={18} />
                                    Telegram
                                </a>
                                <a
                                    href="tel:+380991234567"
                                    className="btn btn-primary flex-1 text-sm"
                                >
                                    <Phone size={18} />
                                    Позвонить
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
