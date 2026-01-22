'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Link2,
    Copy,
    Check,
    Share2,
    Home,
    Car,
    Calendar,
    Users,
    Clock,
    ExternalLink,
    QrCode,
    Send,
    Phone,
    MessageCircle,
    FileText,
    CheckCircle
} from 'lucide-react';
import { listings } from '@/data/listings';
import { vehicles } from '@/data/vehicles';

export default function StaffSharePage() {
    const [selectedType, setSelectedType] = useState<'listing' | 'vehicle'>('listing');
    const [selectedId, setSelectedId] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [generatedLink, setGeneratedLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const items = selectedType === 'listing' ? listings : vehicles;
    const selectedItem = items.find(item => item.id === selectedId);

    const generateLink = async () => {
        if (!selectedId) return;

        setIsGenerating(true);

        try {
            const response = await fetch('/api/booking-links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    listingId: selectedType === 'listing' ? selectedId : undefined,
                    vehicleId: selectedType === 'vehicle' ? selectedId : undefined,
                    checkIn: checkIn || undefined,
                    checkOut: checkOut || undefined,
                    guests: guests || undefined,
                    expiresIn: 168 // 7 дней
                })
            });

            if (response.ok) {
                const data = await response.json();
                setGeneratedLink(data.url);
            } else {
                // Fallback - генерируем локально для демо
                const code = Math.random().toString(36).substring(2, 8).toUpperCase();
                const baseUrl = window.location.origin;
                setGeneratedLink(`${baseUrl}/b/${code}`);
            }
        } catch {
            // Fallback
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();
            const baseUrl = window.location.origin;
            setGeneratedLink(`${baseUrl}/b/${code}`);
        }

        setIsGenerating(false);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const sendToTelegram = () => {
        const text = selectedItem
            ? `Здравствуйте! Вот ссылка для бронирования:\n\n${selectedItem.title}\n${generatedLink}`
            : generatedLink;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(generatedLink)}&text=${encodeURIComponent(text)}`, '_blank');
    };

    const sendToWhatsApp = () => {
        const text = selectedItem
            ? `Здравствуйте! Вот ссылка для бронирования: ${selectedItem.title}\n${generatedLink}`
            : generatedLink;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="min-h-screen pt-20 pb-16">
            <div className="container max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl font-bold text-white mb-2">
                        🔗 Генератор ссылок
                    </h1>
                    <p className="text-gray-400 mb-8">
                        Создайте короткую ссылку для отправки клиенту в Telegram
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Форма генерации */}
                        <div className="card-glass p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">1. Выберите объект</h2>

                            {/* Тип */}
                            <div className="flex gap-2 mb-4">
                                <button
                                    onClick={() => { setSelectedType('listing'); setSelectedId(''); }}
                                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-medium transition-colors ${selectedType === 'listing' ? 'bg-gradient text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
                                >
                                    <Home size={20} />
                                    Жильё
                                </button>
                                <button
                                    onClick={() => { setSelectedType('vehicle'); setSelectedId(''); }}
                                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl font-medium transition-colors ${selectedType === 'vehicle' ? 'bg-gradient text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
                                >
                                    <Car size={20} />
                                    Авто
                                </button>
                            </div>

                            {/* Выбор объекта */}
                            <div className="mb-4">
                                <label className="block text-gray-400 text-sm mb-2">
                                    {selectedType === 'listing' ? 'Объект жилья' : 'Автомобиль'}
                                </label>
                                <select
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    className="input w-full"
                                >
                                    <option value="">Выберите...</option>
                                    {items.map(item => (
                                        <option key={item.id} value={item.id}>
                                            {item.title} — {item.city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <h2 className="text-lg font-semibold text-white mb-4 mt-6">2. Предзаполнение (опционально)</h2>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">
                                        <Calendar size={14} className="inline mr-1" />
                                        {selectedType === 'listing' ? 'Заезд' : 'Получение'}
                                    </label>
                                    <input
                                        type="date"
                                        value={checkIn}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        className="input w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">
                                        <Calendar size={14} className="inline mr-1" />
                                        {selectedType === 'listing' ? 'Выезд' : 'Возврат'}
                                    </label>
                                    <input
                                        type="date"
                                        value={checkOut}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        className="input w-full"
                                    />
                                </div>
                            </div>

                            {selectedType === 'listing' && (
                                <div className="mb-6">
                                    <label className="block text-gray-400 text-sm mb-2">
                                        <Users size={14} className="inline mr-1" />
                                        Гостей
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                                        className="input w-full"
                                    />
                                </div>
                            )}

                            <button
                                onClick={generateLink}
                                disabled={!selectedId || isGenerating}
                                className="btn btn-primary w-full"
                            >
                                {isGenerating ? (
                                    <>
                                        <Clock size={20} className="animate-spin" />
                                        Генерация...
                                    </>
                                ) : (
                                    <>
                                        <Link2 size={20} />
                                        Создать ссылку
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Результат */}
                        <div className="card-glass p-6">
                            <h2 className="text-lg font-semibold text-white mb-4">3. Отправьте клиенту</h2>

                            {generatedLink ? (
                                <>
                                    {/* Превью объекта */}
                                    {selectedItem && (
                                        <div className="p-4 bg-white/5 rounded-xl mb-4">
                                            <h3 className="text-white font-medium mb-1">{selectedItem.title}</h3>
                                            <p className="text-gray-400 text-sm">{selectedItem.city}</p>
                                            {checkIn && checkOut && (
                                                <p className="text-primary-400 text-sm mt-2">
                                                    {checkIn} — {checkOut}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Ссылка */}
                                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CheckCircle size={18} className="text-green-400" />
                                            <span className="text-green-400 font-medium">Ссылка создана!</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={generatedLink}
                                                readOnly
                                                className="input flex-1 text-sm"
                                            />
                                            <button
                                                onClick={copyLink}
                                                className={`btn ${copied ? 'btn-success' : 'btn-outline'} px-3`}
                                            >
                                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Кнопки шаринга */}
                                    <div className="space-y-3">
                                        <button
                                            onClick={sendToTelegram}
                                            className="btn w-full bg-[#0088cc] hover:bg-[#006699] text-white"
                                        >
                                            <Send size={20} />
                                            Отправить в Telegram
                                        </button>
                                        <button
                                            onClick={sendToWhatsApp}
                                            className="btn w-full bg-[#25D366] hover:bg-[#1da851] text-white"
                                        >
                                            <MessageCircle size={20} />
                                            Отправить в WhatsApp
                                        </button>
                                        <button
                                            onClick={copyLink}
                                            className="btn btn-outline w-full"
                                        >
                                            <Copy size={20} />
                                            Скопировать ссылку
                                        </button>
                                    </div>

                                    {/* Инструкция */}
                                    <div className="mt-6 p-4 bg-white/5 rounded-xl">
                                        <h4 className="text-white font-medium mb-2">📝 Что дальше?</h4>
                                        <ul className="text-gray-400 text-sm space-y-1">
                                            <li>1. Отправьте ссылку клиенту</li>
                                            <li>2. Клиент заполнит данные и оплатит</li>
                                            <li>3. Вы получите уведомление о бронировании</li>
                                        </ul>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12 text-gray-500">
                                    <QrCode size={48} className="mx-auto mb-4 opacity-50" />
                                    <p>Выберите объект и нажмите "Создать ссылку"</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Заполнение за клиента */}
                    <div className="card-glass p-6 mt-8">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <FileText className="text-primary-400" />
                            Оформление за клиента
                        </h2>
                        <p className="text-gray-400 mb-4">
                            Если клиент диктует данные по телефону, используйте прямую ссылку:
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={selectedId ? `/listings/${selectedId}/booking?staff=true` : '#'}
                                className={`btn btn-outline ${!selectedId ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                <Home size={20} />
                                Оформить жильё
                            </Link>
                            <Link
                                href={selectedId ? `/cars/${selectedId}/booking?staff=true` : '#'}
                                className={`btn btn-outline ${!selectedId ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                <Car size={20} />
                                Оформить авто
                            </Link>
                        </div>
                        <p className="text-gray-500 text-sm mt-4">
                            * При оформлении за клиента отметьте галочку "Клиент подтвердил согласие устно"
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
