'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    Clock,
    Users,
    CreditCard,
    CheckCircle,
    FileText,
    Shield,
    AlertCircle,
    Loader2,
    ExternalLink,
    MapPin,
    Car,
    Upload
} from 'lucide-react';
import { vehicles } from '@/data/vehicles';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

// Модальное окно для документов (такое же как для жилья)
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
                        <button onClick={onClose} className="btn btn-outline">
                            Закрыть
                        </button>
                        {hasScrolledToEnd && (
                            <button onClick={onClose} className="btn btn-primary">
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

// Тексты документов для аренды авто
const CAR_RENTAL_OFFER = `ПУБЛИЧНАЯ ОФЕРТА
на оказание услуг по аренде автомобиля

1. ОБЩИЕ ПОЛОЖЕНИЯ
1.1. Настоящая публичная оферта является официальным предложением ООО «РентРФ» (далее — Арендодатель) заключить договор аренды транспортного средства.
1.2. Акцептом оферты является бронирование автомобиля и оплата услуг.

2. ПРЕДМЕТ ДОГОВОРА
2.1. Арендодатель передаёт Арендатору во временное пользование транспортное средство.

3. ТРЕБОВАНИЯ К АРЕНДАТОРУ
3.1. Возраст не менее 21 года
3.2. Водительский стаж не менее 2 лет
3.3. Действующее водительское удостоверение

4. ПРАВА И ОБЯЗАННОСТИ СТОРОН
4.1. Арендодатель обязуется:
- предоставить автомобиль в исправном состоянии;
- передать документы на автомобиль;
- проинструктировать по особенностям эксплуатации.

4.2. Арендатор обязуется:
- эксплуатировать автомобиль бережно;
- соблюдать ПДД;
- не передавать управление третьим лицам;
- вернуть автомобиль в оговорённое время и место;
- возместить ущерб при повреждении.

5. ПОРЯДОК ОПЛАТЫ
5.1. Оплата аренды производится онлайн при бронировании.
5.2. Залог блокируется на карте и возвращается после возврата авто.

6. СТРАХОВАНИЕ
6.1. Автомобиль застрахован по ОСАГО.
6.2. КАСКО — опционально за дополнительную плату.

7. ОГРАНИЧЕНИЯ
7.1. Запрещено использование для такси/каршеринга
7.2. Запрещено пересечение границы без согласования
7.3. Лимит пробега — согласно условиям аренды

8. ОТВЕТСТВЕННОСТЬ
8.1. Арендатор несёт полную ответственность за ДТП по своей вине.
8.2. Франшиза при КАСКО — согласно условиям страховки.

Дата публикации: 01.01.2024
Версия: 1.0`;

const CAR_RENTAL_AGREEMENT = `ДОГОВОР АРЕНДЫ ТРАНСПОРТНОГО СРЕДСТВА

АРЕНДОДАТЕЛЬ: ООО «РентРФ»
АРЕНДАТОР: [ФИО Арендатора]

1. ПРЕДМЕТ ДОГОВОРА
1.1. Арендодатель передаёт, а Арендатор принимает во временное пользование транспортное средство:
- Марка/модель: [марка модель]
- Год выпуска: [год]
- Гос. номер: [номер]

2. СРОК АРЕНДЫ
2.1. Дата и время получения: [дата время]
2.2. Дата и время возврата: [дата время]
2.3. Место получения: [адрес]
2.4. Место возврата: [адрес]

3. СТОИМОСТЬ И ПОРЯДОК ОПЛАТЫ
3.1. Стоимость аренды: [сумма] руб
3.2. Залог: [сумма] руб
3.3. Залог возвращается в течение 24 часов после возврата авто.

4. АКТ ПРИЁМА-ПЕРЕДАЧИ
4.1. При получении фиксируется:
- Пробег на момент выдачи
- Уровень топлива
- Внешние повреждения (фото)
- Комплектность (документы, ключи, аптечка, огнетушитель)

4.2. При возврате фиксируется:
- Пробег на момент возврата
- Уровень топлива
- Новые повреждения

5. ОБЯЗАННОСТИ АРЕНДАТОРА
5.1. Соблюдать ПДД
5.2. Использовать только рекомендованное топливо
5.3. Не курить в автомобиле
5.4. Сообщать о неисправностях
5.5. При ДТП — вызвать полицию и уведомить Арендодателя

6. ОГРАНИЧЕНИЯ ПРОБЕГА
6.1. Лимит: [X] км/сутки
6.2. Перепробег: [Y] руб/км

7. ШТРАФНЫЕ САНКЦИИ
7.1. Просрочка возврата: [сумма] руб/час
7.2. Курение в салоне: [сумма] руб
7.3. Грязный салон: [сумма] руб

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
• Водительское удостоверение
• Адрес регистрации

Цели обработки:
- Заключение и исполнение договора аренды
- Проверка водительского стажа
- Связь по вопросам бронирования
- Ведение бухгалтерского учёта

Данные хранятся в течение 3 лет после завершения договорных отношений.

Я уведомлен о праве отозвать согласие письменным заявлением.

Дата: _______________
Подпись: _______________`;

export default function CarBookingPage({ params }: PageProps) {
    const { id } = use(params);
    const vehicle = vehicles.find(v => v.id === id);

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Форма данных
    const [formData, setFormData] = useState({
        // Даты и время
        pickupDate: '',
        pickupTime: '10:00',
        returnDate: '',
        returnTime: '18:00',
        // Локация
        pickupLocation: '',
        deliveryRequested: false,
        deliveryAddress: '',
        // Персональные данные
        fullName: '',
        birthDate: '',
        phone: '',
        email: '',
        // Паспорт
        passportSeries: '',
        passportNumber: '',
        passportIssuedBy: '',
        passportIssuedDate: '',
        registrationAddress: '',
        // Права
        licenseNumber: '',
        licenseIssuedDate: '',
        licenseExpiryDate: '',
        drivingExperience: '',
        // Доп
        specialRequests: ''
    });

    // Загрузка прав
    const [licenseUploaded, setLicenseUploaded] = useState(false);

    // Согласия
    const [consents, setConsents] = useState({
        offer: false,
        rentalAgreement: false,
        privacy: false,
        carRules: false
    });

    // Прочитанные документы
    const [readDocuments, setReadDocuments] = useState({
        offer: false,
        rentalAgreement: false,
        privacy: false
    });

    // Модальные окна
    const [activeModal, setActiveModal] = useState<'offer' | 'rental' | 'privacy' | null>(null);

    if (!vehicle) {
        notFound();
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleConsentChange = (key: keyof typeof consents) => {
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
            formData.licenseNumber &&
            licenseUploaded &&
            consents.offer &&
            consents.rentalAgreement &&
            consents.privacy &&
            consents.carRules
        );
    };

    const handleSubmit = async () => {
        if (!canProceedToPayment()) return;
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        setStep(3);
    };

    // Расчёт цены
    const days = 3; // Placeholder
    const pricePerDay = vehicle.pricePerDay;
    const subtotal = pricePerDay * days;
    const deposit = vehicle.deposit;
    const serviceFee = Math.round(subtotal * 0.1);
    const deliveryFee = formData.deliveryRequested ? (vehicle.deliveryPrice || 500) : 0;
    const total = subtotal + serviceFee + deliveryFee;

    return (
        <div className="min-h-screen pt-20 pb-16">
            {/* Back Button */}
            <div className="container mb-6">
                <Link
                    href={`/cars/${id}`}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    Назад к автомобилю
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
                                {/* Dates & Time */}
                                <div className="card-glass p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <Calendar className="text-primary-400" size={24} />
                                        Дата и время аренды
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Дата получения</label>
                                            <input
                                                type="date"
                                                name="pickupDate"
                                                value={formData.pickupDate}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Время получения</label>
                                            <select
                                                name="pickupTime"
                                                value={formData.pickupTime}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                            >
                                                {Array.from({ length: 13 }, (_, i) => i + 8).map(h => (
                                                    <option key={h} value={`${h}:00`}>{h}:00</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Дата возврата</label>
                                            <input
                                                type="date"
                                                name="returnDate"
                                                value={formData.returnDate}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Время возврата</label>
                                            <select
                                                name="returnTime"
                                                value={formData.returnTime}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                            >
                                                {Array.from({ length: 13 }, (_, i) => i + 8).map(h => (
                                                    <option key={h} value={`${h}:00`}>{h}:00</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Delivery option */}
                                    {vehicle.deliveryAvailable && (
                                        <div className="mt-4 p-4 bg-white/5 rounded-xl">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="deliveryRequested"
                                                    checked={formData.deliveryRequested}
                                                    onChange={handleInputChange}
                                                    className="w-5 h-5 rounded"
                                                />
                                                <div>
                                                    <span className="text-white font-medium">Доставка автомобиля</span>
                                                    <p className="text-gray-400 text-sm">+{vehicle.deliveryPrice || 500} ₽ • Радиус до {vehicle.deliveryRadius || 20} км</p>
                                                </div>
                                            </label>
                                            {formData.deliveryRequested && (
                                                <div className="mt-3">
                                                    <input
                                                        type="text"
                                                        name="deliveryAddress"
                                                        value={formData.deliveryAddress}
                                                        onChange={handleInputChange}
                                                        placeholder="Адрес доставки"
                                                        className="input w-full"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Personal Data */}
                                <div className="card-glass p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <Users className="text-primary-400" size={24} />
                                        Данные арендатора
                                    </h2>
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

                                {/* Passport */}
                                <div className="card-glass p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <FileText className="text-primary-400" size={24} />
                                        Паспортные данные
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Серия</label>
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
                                            <label className="block text-gray-400 text-sm mb-2">Номер *</label>
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
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Driver License */}
                                <div className="card-glass p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                        <Car className="text-primary-400" size={24} />
                                        Водительское удостоверение
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Номер ВУ *</label>
                                            <input
                                                type="text"
                                                name="licenseNumber"
                                                value={formData.licenseNumber}
                                                onChange={handleInputChange}
                                                placeholder="ABC123456"
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Стаж вождения (лет) *</label>
                                            <input
                                                type="number"
                                                name="drivingExperience"
                                                value={formData.drivingExperience}
                                                onChange={handleInputChange}
                                                min="0"
                                                className="input w-full"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Дата выдачи</label>
                                            <input
                                                type="date"
                                                name="licenseIssuedDate"
                                                value={formData.licenseIssuedDate}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Действительно до</label>
                                            <input
                                                type="date"
                                                name="licenseExpiryDate"
                                                value={formData.licenseExpiryDate}
                                                onChange={handleInputChange}
                                                className="input w-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Upload license */}
                                    <div className="mt-4">
                                        <label className="block text-gray-400 text-sm mb-2">Фото водительского удостоверения *</label>
                                        <div
                                            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${licenseUploaded ? 'border-green-500 bg-green-500/10' : 'border-white/20 hover:border-primary-400'}`}
                                            onClick={() => setLicenseUploaded(true)}
                                        >
                                            {licenseUploaded ? (
                                                <div className="flex items-center justify-center gap-2 text-green-400">
                                                    <CheckCircle size={24} />
                                                    <span>Фото загружено</span>
                                                </div>
                                            ) : (
                                                <div className="text-gray-400">
                                                    <Upload size={32} className="mx-auto mb-2" />
                                                    <p>Нажмите для загрузки</p>
                                                    <p className="text-sm">JPG, PNG до 5MB</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    className="btn btn-primary w-full"
                                    disabled={!formData.fullName || !formData.phone || !formData.licenseNumber}
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

                                    <div className="space-y-4">
                                        {/* Оферта */}
                                        <div className={`p-4 rounded-xl border transition-colors ${consents.offer ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={consents.offer}
                                                    onChange={() => handleConsentChange('offer')}
                                                    className="w-5 h-5 mt-0.5 rounded"
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
                                                        <p className="text-yellow-400 text-sm mt-1">Необходимо прочитать документ</p>
                                                    )}
                                                </div>
                                            </label>
                                        </div>

                                        {/* Договор */}
                                        <div className={`p-4 rounded-xl border transition-colors ${consents.rentalAgreement ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={consents.rentalAgreement}
                                                    onChange={() => handleConsentChange('rentalAgreement')}
                                                    className="w-5 h-5 mt-0.5 rounded"
                                                />
                                                <div className="flex-1">
                                                    <span className="text-white font-medium">
                                                        Я ознакомился с{' '}
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveModal('rental')}
                                                            className="text-primary-400 hover:underline inline-flex items-center gap-1"
                                                        >
                                                            Договором аренды ТС
                                                            <ExternalLink size={14} />
                                                        </button>
                                                    </span>
                                                    {!readDocuments.rentalAgreement && (
                                                        <p className="text-yellow-400 text-sm mt-1">Необходимо прочитать документ</p>
                                                    )}
                                                </div>
                                            </label>
                                        </div>

                                        {/* ПД */}
                                        <div className={`p-4 rounded-xl border transition-colors ${consents.privacy ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={consents.privacy}
                                                    onChange={() => handleConsentChange('privacy')}
                                                    className="w-5 h-5 mt-0.5 rounded"
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
                                                        <p className="text-yellow-400 text-sm mt-1">Необходимо прочитать документ</p>
                                                    )}
                                                </div>
                                            </label>
                                        </div>

                                        {/* Правила */}
                                        <div className={`p-4 rounded-xl border transition-colors ${consents.carRules ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                                            <label className="flex items-start gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={consents.carRules}
                                                    onChange={() => setConsents(prev => ({ ...prev, carRules: !prev.carRules }))}
                                                    className="w-5 h-5 mt-0.5 rounded"
                                                />
                                                <div className="flex-1">
                                                    <span className="text-white font-medium">Согласен с правилами эксплуатации</span>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        Без курения • Лимит {vehicle.mileageLimit || 300} км/сутки • Возврат с тем же уровнем топлива
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Deposit info */}
                                <div className="card-glass p-6 border-l-4 border-yellow-500">
                                    <h3 className="text-white font-semibold mb-2">💳 Информация о залоге</h3>
                                    <p className="text-gray-400 text-sm">
                                        На вашей карте будет заблокирована сумма залога <strong>{deposit.toLocaleString()} ₽</strong>.
                                        Залог возвращается в течение 24 часов после возврата автомобиля без повреждений.
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(1)} className="btn btn-outline flex-1">
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
                                    Инструкции по получению авто будут отправлены отдельным письмом.
                                </p>
                                <div className="p-4 bg-white/5 rounded-xl mb-6 text-left">
                                    <h4 className="text-white font-semibold mb-2">📍 Место получения:</h4>
                                    <p className="text-gray-400">{vehicle.city}, {vehicle.address}</p>
                                    <p className="text-gray-400 mt-2">
                                        <strong>Дата:</strong> {formData.pickupDate} в {formData.pickupTime}
                                    </p>
                                </div>
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

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card-glass p-6 sticky top-24">
                            {/* Vehicle Preview */}
                            <div className="flex gap-4 mb-6 pb-6 border-b border-white/10">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={vehicle.images[0]}
                                        alt={vehicle.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">{vehicle.make} {vehicle.model}</h3>
                                    <p className="text-gray-400 text-sm">{vehicle.year} • {vehicle.transmission}</p>
                                    <div className="flex items-center gap-1 text-sm mt-1">
                                        <span className="text-yellow-400">★</span>
                                        <span className="text-white">{vehicle.rating}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>{pricePerDay.toLocaleString()} ₽ × {days} дней</span>
                                    <span>{subtotal.toLocaleString()} ₽</span>
                                </div>
                                {deliveryFee > 0 && (
                                    <div className="flex justify-between text-gray-400">
                                        <span>Доставка</span>
                                        <span>{deliveryFee.toLocaleString()} ₽</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-400">
                                    <span>Сервисный сбор</span>
                                    <span>{serviceFee.toLocaleString()} ₽</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-lg pt-3 border-t border-white/10">
                                    <span>Итого</span>
                                    <span>{total.toLocaleString()} ₽</span>
                                </div>
                                <div className="flex justify-between text-yellow-400 text-sm">
                                    <span>+ Залог (возвращаемый)</span>
                                    <span>{deposit.toLocaleString()} ₽</span>
                                </div>
                            </div>

                            {/* Security */}
                            <div className="flex items-start gap-3 p-4 bg-green-500/10 rounded-xl">
                                <Shield size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                                <p className="text-green-400 text-sm">
                                    Безопасная оплата. Залог возвращается автоматически.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <DocumentModal
                isOpen={activeModal === 'offer'}
                onClose={() => setActiveModal(null)}
                title="Публичная оферта"
                content={CAR_RENTAL_OFFER}
                onScrollComplete={() => setReadDocuments(prev => ({ ...prev, offer: true }))}
            />
            <DocumentModal
                isOpen={activeModal === 'rental'}
                onClose={() => setActiveModal(null)}
                title="Договор аренды"
                content={CAR_RENTAL_AGREEMENT}
                onScrollComplete={() => setReadDocuments(prev => ({ ...prev, rentalAgreement: true }))}
            />
            <DocumentModal
                isOpen={activeModal === 'privacy'}
                onClose={() => setActiveModal(null)}
                title="Согласие на обработку ПД"
                content={PRIVACY_POLICY_TEXT}
                onScrollComplete={() => setReadDocuments(prev => ({ ...prev, privacy: true }))}
            />
        </div>
    );
}
