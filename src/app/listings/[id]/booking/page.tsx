'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    Users,
    CreditCard,
    CheckCircle,
    FileText,
    Shield,
    AlertCircle,
    Loader2,
    ExternalLink
} from 'lucide-react';
import { listings } from '@/data/listings';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

// Модальное окно для документов
function DocumentModal({
    isOpen,
    onClose,
    title,
    content,
    onScrollComplete
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    onScrollComplete: () => void;
}) {
    const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50) {
            setHasScrolledToEnd(true);
            onScrollComplete();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                className="relative w-full max-w-3xl max-h-[80vh] bg-[var(--color-bg-secondary)] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                </div>
                <div
                    className="p-6 max-h-[50vh] overflow-y-auto"
                    onScroll={handleScroll}
                >
                    <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {content}
                    </div>
                </div>
                <div className="p-6 border-t border-white/10 flex justify-between items-center">
                    {!hasScrolledToEnd && (
                        <p className="text-sm text-yellow-400 flex items-center gap-2">
                            <AlertCircle size={16} />
                            Прокрутите документ до конца
                        </p>
                    )}
                    <div className="flex gap-3 ml-auto">
                        <button
                            onClick={onClose}
                            className="btn btn-outline"
                        >
                            Закрыть
                        </button>
                        {hasScrolledToEnd && (
                            <button
                                onClick={onClose}
                                className="btn btn-primary"
                            >
                                <CheckCircle size={18} />
                                Я ознакомился
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// Тексты документов
const OFFER_TEXT = `ПУБЛИЧНАЯ ОФЕРТА
на оказание услуг по бронированию жилья

1. ОБЩИЕ ПОЛОЖЕНИЯ
1.1. Настоящая публичная оферта является официальным предложением ООО «РентРФ» (далее — Исполнитель) заключить договор на условиях, изложенных в настоящей оферте.
1.2. Акцептом оферты является нажатие кнопки «Забронировать» и оплата услуг.

2. ПРЕДМЕТ ДОГОВОРА
2.1. Исполнитель обязуется предоставить Заказчику услуги по бронированию жилого помещения на условиях, согласованных сторонами.

3. ПРАВА И ОБЯЗАННОСТИ СТОРОН
3.1. Исполнитель обязуется:
- предоставить жилое помещение в соответствии с описанием;
- обеспечить заселение в согласованное время;
- предоставить необходимую информацию о правилах проживания.

3.2. Заказчик обязуется:
- своевременно оплатить услуги;
- соблюдать правила проживания;
- бережно относиться к имуществу.

4. ПОРЯДОК ОПЛАТЫ
4.1. Оплата производится онлайн при бронировании.
4.2. Стоимость включает: проживание, сервисный сбор.

5. ОТМЕНА БРОНИРОВАНИЯ
5.1. Бесплатная отмена возможна за 48 часов до заезда.
5.2. При отмене менее чем за 48 часов — возврат 50%.
5.3. При неявке — возврат не производится.

6. ОТВЕТСТВЕННОСТЬ СТОРОН
6.1. Стороны несут ответственность в соответствии с законодательством Российской Федерации.

7. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ
7.1. Оферта вступает в силу с момента акцепта.
7.2. Все споры решаются путём переговоров.

Дата публикации: 01.01.2024
Версия: 1.0`;

const RENTAL_AGREEMENT_TEXT = `ДОГОВОР АРЕНДЫ ЖИЛОГО ПОМЕЩЕНИЯ

АРЕНДОДАТЕЛЬ: ___________________________
АРЕНДАТОР: [ФИО Арендатора]

1. ПРЕДМЕТ ДОГОВОРА
1.1. Арендодатель передаёт, а Арендатор принимает во временное пользование жилое помещение.

2. СРОК АРЕНДЫ
2.1. Начало аренды: [дата заезда]
2.2. Окончание аренды: [дата выезда]
2.3. Время заезда: 14:00
2.4. Время выезда: 12:00

3. СТОИМОСТЬ И ПОРЯДОК ОПЛАТЫ
3.1. Стоимость аренды: [сумма] руб
3.2. Оплата производится в полном объёме при бронировании.

4. ПРАВА И ОБЯЗАННОСТИ АРЕНДАТОРА
4.1. Арендатор имеет право:
- пользоваться помещением и имуществом;
- требовать устранения неисправностей.

4.2. Арендатор обязуется:
- использовать помещение по назначению;
- соблюдать правила проживания;
- возместить ущерб в случае порчи имущества;
- сдать помещение в надлежащем состоянии.

5. ПРАВИЛА ПРОЖИВАНИЯ
5.1. Запрещено курение в помещении
5.2. Запрещено проведение шумных мероприятий после 22:00
5.3. Размещение домашних животных — по согласованию
5.4. Максимальное количество гостей соответствует описанию

6. ОТВЕТСТВЕННОСТЬ
6.1. За порчу имущества Арендатор возмещает стоимость ремонта/замены.
6.2. Страховой депозит возвращается после проверки состояния помещения.

7. ФОРС-МАЖОР
7.1. Стороны освобождаются от ответственности при обстоятельствах непреодолимой силы.

8. РЕКВИЗИТЫ И ПОДПИСИ

Арендодатель: _______________ 
Арендатор: _______________

Дата: _______________`;

const PRIVACY_POLICY_TEXT = `СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ

Я, ______________________, даю согласие ООО «РентРФ» на обработку моих персональных данных:

• ФИО
• Дата рождения
• Контактный телефон
• Адрес электронной почты
• Паспортные данные
• Адрес регистрации

Цели обработки:
- Заключение и исполнение договора аренды
- Связь по вопросам бронирования
- Ведение бухгалтерского учёта
- Направление информационных сообщений (с согласия)

Данные хранятся в течение 3 лет после завершения договорных отношений.

Я уведомлен о праве отозвать согласие письменным заявлением.

Дата: _______________
Подпись: _______________`;

export default function BookingPage({ params }: PageProps) {
    const { id } = use(params);
    const listing = listings.find(l => l.id === id);

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Форма данных
    const [formData, setFormData] = useState({
        // Даты
        checkIn: '',
        checkOut: '',
        guests: 1,
        // Персональные данные
        fullName: '',
        birthDate: '',
        phone: '',
        email: '',
        passportSeries: '',
        passportNumber: '',
        passportIssuedBy: '',
        passportIssuedDate: '',
        registrationAddress: '',
        specialRequests: ''
    });

    // Согласия
    const [consents, setConsents] = useState({
        offer: false,
        rentalAgreement: false,
        privacy: false,
        houseRules: false
    });

    // Прочитанные документы
    const [readDocuments, setReadDocuments] = useState({
        offer: false,
        rentalAgreement: false,
        privacy: false
    });

    // Модальные окна
    const [activeModal, setActiveModal] = useState<'offer' | 'rental' | 'privacy' | null>(null);

    if (!listing) {
        notFound();
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConsentChange = (key: keyof typeof consents) => {
        // Проверяем, прочитан ли документ
        if (key === 'offer' && !readDocuments.offer) {
            setActiveModal('offer');
            return;
        }
        if (key === 'rentalAgreement' && !readDocuments.rentalAgreement) {
            setActiveModal('rental');
            return;
        }
        if (key === 'privacy' && !readDocuments.privacy) {
            setActiveModal('privacy');
            return;
        }

        setConsents(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const canProceedToPayment = () => {
        return (
            formData.fullName &&
            formData.birthDate &&
            formData.phone &&
            formData.email &&
            formData.passportNumber &&
            formData.passportIssuedBy &&
            formData.passportIssuedDate &&
            formData.registrationAddress &&
            consents.offer &&
            consents.rentalAgreement &&
            consents.privacy &&
            consents.houseRules
        );
    };

    const handleSubmit = async () => {
        if (!canProceedToPayment()) return;

        setIsLoading(true);
        // TODO: Отправка данных на сервер и оплата
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        setStep(3);
    };

    // Расчёт цены
    const nights = 3; // Placeholder
    const pricePerNight = listing.pricePerNight;
    const subtotal = pricePerNight * nights;
    const cleaningFee = listing.cleaningFee || 500;
    const serviceFee = Math.round(subtotal * 0.1);
    const total = subtotal + cleaningFee + serviceFee;

    return (
        <div className="min-h-screen pt-20 pb-16">
            {/* Back Button */}
            <div className="container mb-6">
                <Link
                    href={`/listings/${id}`}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    Назад к объекту
                </Link>
            </div>

            <div className="container">
                {/* Progress */}
                <div className="flex items-center gap-4 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= s ? 'bg-gradient text-white' : 'bg-white/10 text-gray-500'}`}>
                                {step > s ? <CheckCircle size={18} /> : s}
                            </div>
                            <span className={`text-sm ${step >= s ? 'text-white' : 'text-gray-500'}`}>
                                {s === 1 ? 'Данные' : s === 2 ? 'Подтверждение' : 'Готово'}
                            </span>
                            {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-gradient' : 'bg-white/10'}`} />}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Dates */}
                                <div className="card-glass p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <Calendar className="text-primary-400" size={24} />
                                        Даты проживания
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Дата заезда</label>
                                            <input
                                                type="date"
                                                name="checkIn"
                                                value={formData.checkIn}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Дата выезда</label>
                                            <input
                                                type="date"
                                                name="checkOut"
                                                value={formData.checkOut}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Гостей</label>
                                            <select
                                                name="guests"
                                                value={formData.guests}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                            >
                                                {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map(n => (
                                                    <option key={n} value={n}>{n} {n === 1 ? 'гость' : n < 5 ? 'гостя' : 'гостей'}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Data */}
                                <div className="card-glass p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <Users className="text-primary-400" size={24} />
                                        Данные арендатора
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-4">
                                        Данные необходимы для оформления договора аренды
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-400 text-sm mb-2">ФИО полностью *</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="Иванов Иван Иванович"
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Дата рождения *</label>
                                            <input
                                                type="date"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Телефон *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+7 9XX XXX XX XX"
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-400 text-sm mb-2">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="email@example.com"
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Passport Data */}
                                <div className="card-glass p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <FileText className="text-primary-400" size={24} />
                                        Паспортные данные
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Серия паспорта</label>
                                            <input
                                                type="text"
                                                name="passportSeries"
                                                value={formData.passportSeries}
                                                onChange={handleInputChange}
                                                placeholder="АА"
                                                className="input w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Номер паспорта *</label>
                                            <input
                                                type="text"
                                                name="passportNumber"
                                                value={formData.passportNumber}
                                                onChange={handleInputChange}
                                                placeholder="123456"
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-400 text-sm mb-2">Кем выдан *</label>
                                            <input
                                                type="text"
                                                name="passportIssuedBy"
                                                value={formData.passportIssuedBy}
                                                onChange={handleInputChange}
                                                placeholder="МВД России по г. Москве"
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Дата выдачи *</label>
                                            <input
                                                type="date"
                                                name="passportIssuedDate"
                                                value={formData.passportIssuedDate}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-gray-400 text-sm mb-2">Адрес регистрации *</label>
                                            <input
                                                type="text"
                                                name="registrationAddress"
                                                value={formData.registrationAddress}
                                                onChange={handleInputChange}
                                                placeholder="г. Москва, ул. Тверская, д. 1, кв. 1"
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    className="btn btn-primary w-full"
                                    disabled={!formData.fullName || !formData.phone || !formData.email}
                                >
                                    Продолжить
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Consents */}
                                <div className="card-glass p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <Shield className="text-primary-400" size={24} />
                                        Согласие с условиями
                                    </h2>
                                    <p className="text-gray-400 text-sm mb-6">
                                        Пожалуйста, ознакомьтесь с документами и подтвердите согласие
                                    </p>

                                    <div className="space-y-4">
                                        {/* Оферта */}
                                        <div className={`p-4 rounded-xl border transition-colors ${consents.offer ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={consents.offer}
                                                    onChange={() => handleConsentChange('offer')}
                                                    className="w-5 h-5 mt-0.5 rounded border-white/30 bg-transparent text-primary-500 focus:ring-primary-500"
                                                />
                                                <div className="flex-1">
                                                    <span className="text-white font-medium">
                                                        Я ознакомился с{' '}
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveModal('offer')}
                                                            className="text-primary-400 hover:underline inline-flex items-center gap-1"
                                                        >
                                                            Публичной офертой
                                                            <ExternalLink size={14} />
                                                        </button>
                                                    </span>
                                                    {!readDocuments.offer && (
                                                        <p className="text-yellow-400 text-sm mt-1">
                                                            Необходимо прочитать документ
                                                        </p>
                                                    )}
                                                </div>
                                            </label>
                                        </div>

                                        {/* Договор аренды */}
                                        <div className={`p-4 rounded-xl border transition-colors ${consents.rentalAgreement ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={consents.rentalAgreement}
                                                    onChange={() => handleConsentChange('rentalAgreement')}
                                                    className="w-5 h-5 mt-0.5 rounded border-white/30 bg-transparent text-primary-500 focus:ring-primary-500"
                                                />
                                                <div className="flex-1">
                                                    <span className="text-white font-medium">
                                                        Я ознакомился с{' '}
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveModal('rental')}
                                                            className="text-primary-400 hover:underline inline-flex items-center gap-1"
                                                        >
                                                            Договором аренды
                                                            <ExternalLink size={14} />
                                                        </button>
                                                    </span>
                                                    {!readDocuments.rentalAgreement && (
                                                        <p className="text-yellow-400 text-sm mt-1">
                                                            Необходимо прочитать документ
                                                        </p>
                                                    )}
                                                </div>
                                            </label>
                                        </div>

                                        {/* Персональные данные */}
                                        <div className={`p-4 rounded-xl border transition-colors ${consents.privacy ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={consents.privacy}
                                                    onChange={() => handleConsentChange('privacy')}
                                                    className="w-5 h-5 mt-0.5 rounded border-white/30 bg-transparent text-primary-500 focus:ring-primary-500"
                                                />
                                                <div className="flex-1">
                                                    <span className="text-white font-medium">
                                                        Согласен на{' '}
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveModal('privacy')}
                                                            className="text-primary-400 hover:underline inline-flex items-center gap-1"
                                                        >
                                                            обработку персональных данных
                                                            <ExternalLink size={14} />
                                                        </button>
                                                    </span>
                                                    {!readDocuments.privacy && (
                                                        <p className="text-yellow-400 text-sm mt-1">
                                                            Необходимо прочитать документ
                                                        </p>
                                                    )}
                                                </div>
                                            </label>
                                        </div>

                                        {/* Правила проживания */}
                                        <div className={`p-4 rounded-xl border transition-colors ${consents.houseRules ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={consents.houseRules}
                                                    onChange={() => setConsents(prev => ({ ...prev, houseRules: !prev.houseRules }))}
                                                    className="w-5 h-5 mt-0.5 rounded border-white/30 bg-transparent text-primary-500 focus:ring-primary-500"
                                                />
                                                <div className="flex-1">
                                                    <span className="text-white font-medium">
                                                        Согласен с правилами проживания
                                                    </span>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        Заезд с 14:00, выезд до 12:00. Без курения. Тишина после 22:00.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Special Requests */}
                                <div className="card-glass p-6">
                                    <h2 className="text-lg font-semibold text-white mb-4">Особые пожелания</h2>
                                    <textarea
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleInputChange}
                                        placeholder="Ранний заезд, детская кроватка и т.д."
                                        rows={3}
                                        className="input w-full resize-none"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="btn btn-outline flex-1"
                                    >
                                        Назад
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={!canProceedToPayment() || isLoading}
                                        className="btn btn-primary flex-1"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 size={20} className="animate-spin" />
                                                Обработка...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={20} />
                                                Оплатить {total.toLocaleString()} ₽
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="card-glass p-8 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle size={40} className="text-green-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    Бронирование подтверждено!
                                </h2>
                                <p className="text-gray-400 mb-6">
                                    Мы отправили подтверждение на {formData.email}.<br />
                                    Договор аренды будет отправлен отдельным письмом.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Link href="/dashboard" className="btn btn-primary">
                                        Мои бронирования
                                    </Link>
                                    <Link href="/" className="btn btn-outline">
                                        На главную
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Sidebar - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="card-glass p-6 sticky top-24">
                            {/* Listing Preview */}
                            <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={listing.images[0]}
                                        alt={listing.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">{listing.title}</h3>
                                    <p className="text-gray-400 text-sm">{listing.city}</p>
                                    <div className="flex items-center gap-1 text-sm mt-1">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-white">{listing.rating}</span>
                                        <span className="text-gray-500">({listing.reviewsCount})</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>{pricePerNight.toLocaleString()} ₽ × {nights} ночей</span>
                                    <span>{subtotal.toLocaleString()} ₽</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Уборка</span>
                                    <span>{cleaningFee.toLocaleString()} ₽</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Сервисный сбор</span>
                                    <span>{serviceFee.toLocaleString()} ₽</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-white/10">
                                    <span>Итого</span>
                                    <span>{total.toLocaleString()} ₽</span>
                                </div>
                            </div>

                            {/* Security Note */}
                            <div className="flex items-start gap-3 p-4 bg-green-500/10 rounded-xl">
                                <Shield size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-green-400 text-sm">
                                    Безопасная оплата. Данные защищены шифрованием.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Document Modals */}
            <DocumentModal
                isOpen={activeModal === 'offer'}
                onClose={() => setActiveModal(null)}
                title="Публичная оферта"
                content={OFFER_TEXT}
                onScrollComplete={() => setReadDocuments(prev => ({ ...prev, offer: true }))}
            />
            <DocumentModal
                isOpen={activeModal === 'rental'}
                onClose={() => setActiveModal(null)}
                title="Договор аренды"
                content={RENTAL_AGREEMENT_TEXT}
                onScrollComplete={() => setReadDocuments(prev => ({ ...prev, rentalAgreement: true }))}
            />
            <DocumentModal
                isOpen={activeModal === 'privacy'}
                onClose={() => setActiveModal(null)}
                title="Согласие на обработку персональных данных"
                content={PRIVACY_POLICY_TEXT}
                onScrollComplete={() => setReadDocuments(prev => ({ ...prev, privacy: true }))}
            />
        </div>
    );
}
