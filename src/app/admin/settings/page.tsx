import { CrystalCard } from '@/components/admin/ui/CrystalCard';
import { Save, Bell, Shield, Globe, CreditCard, Mail, Database } from 'lucide-react';

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Настройки системы</h1>
                    <p className="text-gray-400 text-sm">Конфигурация параметров платформы RentRF.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all shadow-lg shadow-indigo-500/25 active:scale-95">
                    <Save size={18} />
                    Сохранить изменения
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Navigation or Sections */}
                <div className="space-y-2">
                    {[
                        { id: 'general', icon: Globe, label: 'Общие настройки' },
                        { id: 'payments', icon: CreditCard, label: 'Платежи и комиссии' },
                        { id: 'notifications', icon: Bell, label: 'Уведомления' },
                        { id: 'security', icon: Shield, label: 'Безопасность' },
                        { id: 'email', icon: Mail, label: 'Email рассылки' },
                        { id: 'system', icon: Database, label: 'Системные параметры' },
                    ].map((item, i) => (
                        <button key={item.id} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${i === 0 ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-lg shadow-indigo-500/5' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}>
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Right Column: Settings Content */}
                <div className="md:col-span-2 space-y-6">
                    <CrystalCard className="p-8">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Общие конфигурации</h3>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Название платформы</label>
                                    <input type="text" defaultValue="RentRF Titan" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Контактный Email</label>
                                    <input type="email" defaultValue="admin@rentrf.ru" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400">Описание (Meta Description)</label>
                                <textarea rows={3} defaultValue="Лучшая платформа для аренды жилья и автомобилей в России." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors resize-none" />
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium">Техническое обслуживание</span>
                                    <span className="text-xs text-gray-500">Перевести сайт в режим "Только чтение"</span>
                                </div>
                                <div className="h-6 w-12 rounded-full bg-gray-700 relative cursor-pointer">
                                    <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
                                </div>
                            </div>
                        </div>
                    </CrystalCard>

                    <CrystalCard className="p-8">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-white/5 pb-4">Финансовые параметры</h3>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Сервисный сбор (%)</label>
                                    <input type="number" defaultValue="12" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">НДС (%)</label>
                                    <input type="number" defaultValue="20" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Миним. сумма вывода</label>
                                    <input type="text" defaultValue="5,000 ₽" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Валюта системы</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors">
                                        <option>RUB (₽)</option>
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </CrystalCard>
                </div>
            </div>
        </div>
    );
}
