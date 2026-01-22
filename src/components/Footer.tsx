import Link from 'next/link';
import { Home, Car, Phone, Mail, MessageCircle, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0a0f1a] border-t border-white/5">
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient flex items-center justify-center">
                                <span className="text-xl font-bold text-white">R</span>
                            </div>
                            <span className="text-xl font-bold text-white">RentUA</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Аренда жилья и автомобилей по всей Украине. Надёжно, быстро, удобно.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://t.me/rentua"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-500/20 hover:text-primary-400 transition-all"
                            >
                                <MessageCircle size={18} />
                            </a>
                            <a
                                href="https://instagram.com/rentua"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-pink-500/20 hover:text-pink-400 transition-all"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://facebook.com/rentua"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-all"
                            >
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Аренда */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Аренда</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/listings" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <Home size={16} />
                                    Жильё посуточно
                                </Link>
                            </li>
                            <li>
                                <Link href="/cars" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <Car size={16} />
                                    Автомобили
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Города */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Города</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/listings?city=Киев" className="text-gray-400 hover:text-white transition-colors">
                                    Киев
                                </Link>
                            </li>
                            <li>
                                <Link href="/listings?city=Одесса" className="text-gray-400 hover:text-white transition-colors">
                                    Одесса
                                </Link>
                            </li>
                            <li>
                                <Link href="/listings?city=Львов" className="text-gray-400 hover:text-white transition-colors">
                                    Львов
                                </Link>
                            </li>
                            <li>
                                <Link href="/listings?city=Харьков" className="text-gray-400 hover:text-white transition-colors">
                                    Харьков
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Контакты</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="tel:+380991234567" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <Phone size={16} />
                                    +380 99 123 45 67
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@rentua.com" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                                    <Mail size={16} />
                                    info@rentua.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://t.me/rentua"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                                >
                                    <MessageCircle size={16} />
                                    @rentua
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2026 RentUA. Все права защищены.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                            Конфиденциальность
                        </Link>
                        <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                            Условия использования
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
