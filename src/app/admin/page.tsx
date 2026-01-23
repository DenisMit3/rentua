import { MetricCard } from '@/components/admin/dashboard/MetricCard';
import { CrystalCard } from '@/components/admin/ui/CrystalCard';
import { Users, DollarSign, CalendarCheck, ShieldCheck, MoreHorizontal, UserPlus, Database } from 'lucide-react';
import prisma from '@/lib/prisma';

export const revalidate = 0;

export default async function AdminDashboardPage() {
    // 1. Fetch KPI Data
    const [
        totalUsers,
        pendingBookings,
        totalBookings,
        totalVehicleBookings,
        pendingVerifications,
        revenueData,
        dailyRevenue
    ] = await Promise.all([
        prisma.user.count(),
        prisma.booking.count({ where: { status: 'PENDING' } }),
        prisma.booking.count(),
        prisma.vehicleBooking.count(),
        prisma.user.count({ where: { isVerified: false } }),
        prisma.booking.aggregate({
            _sum: { totalPrice: true }
        }),
        // Fetch revenue for the last 30 days
        prisma.booking.findMany({
            where: {
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 30))
                }
            },
            select: {
                totalPrice: true,
                createdAt: true
            }
        })
    ]);

    const totalRevenue = revenueData._sum.totalPrice || 0;
    const combinedBookings = totalBookings + totalVehicleBookings;

    // Process daily revenue for the chart
    const revenueByDayMap = dailyRevenue.reduce((acc, curr) => {
        const day = curr.createdAt.toISOString().split('T')[0];
        acc[day] = (acc[day] || 0) + (curr.totalPrice || 0);
        return acc;
    }, {} as Record<string, number>);

    // Ensure we have at least some bars for the last 15 days
    const chartData = Array.from({ length: 15 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (14 - i));
        const day = date.toISOString().split('T')[0];
        return {
            label: day,
            value: revenueByDayMap[day] || 0
        };
    });

    const maxRevenue = Math.max(...chartData.map(d => d.value), 1000);

    // 2. Fetch Recent Activity
    const [recentUsers, recentBookings] = await Promise.all([
        prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 3
        }),
        prisma.booking.findMany({
            orderBy: { createdAt: 'desc' },
            take: 3,
            include: { listing: { select: { title: true } } }
        })
    ]);

    const activities = [
        ...recentUsers.map(u => ({
            id: u.id,
            action: 'Новый пользователь',
            detail: u.email || u.name || 'Anonymous',
            time: 'Недавно',
            icon: <UserPlus size={14} className="text-indigo-400" />
        })),
        ...recentBookings.map(b => ({
            id: b.id,
            action: 'Бронирование создано',
            detail: b.listing.title,
            time: 'Недавно',
            icon: <CalendarCheck size={14} className="text-emerald-400" />
        }))
    ].slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight text-white">Панель управления</h1>
                <p className="text-gray-400">Оперативная аналитика платформы RentRF Titan.</p>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    label="Общая выручка"
                    value={`₽${totalRevenue.toLocaleString()}`}
                    trend="+12.5%"
                    trendUp={true}
                    icon={<DollarSign size={24} />}
                />
                <MetricCard
                    label="Всего пользователей"
                    value={totalUsers.toLocaleString()}
                    trend="+5.2%"
                    trendUp={true}
                    icon={<Users size={24} />}
                />
                <MetricCard
                    label="Всего бронирований"
                    value={combinedBookings.toLocaleString()}
                    trend="+18.2%"
                    trendUp={true}
                    icon={<CalendarCheck size={24} />}
                />
                <MetricCard
                    label="Ожидают проверки"
                    value={pendingVerifications.toLocaleString()}
                    trend="-2.4%"
                    trendUp={false}
                    icon={<ShieldCheck size={24} />}
                />
            </div>

            {/* Main Content Area: Charts & Activity */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 min-h-[450px]">
                {/* Main Chart Area */}
                <CrystalCard className="lg:col-span-2 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-white">Аналитика доходов</h3>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-gray-400 focus:outline-none hover:bg-white/10 transition-colors cursor-pointer">
                            <option>За 30 дней</option>
                            <option>За 3 месяца</option>
                            <option>С начала года</option>
                        </select>
                    </div>

                    {/* Chart with real data from last 15 days */}
                    <div className="flex-1 w-full rounded-xl bg-gradient-to-b from-indigo-500/5 to-transparent border border-white/5 relative flex items-end justify-between p-6 gap-2">
                        {chartData.map((dayData, i) => {
                            const heightPercentage = Math.max((dayData.value / maxRevenue) * 100, 2);
                            return (
                                <div key={i} className="flex-1 bg-indigo-500/20 hover:bg-indigo-500/40 transition-all rounded-t-sm relative group" style={{ height: `${heightPercentage}%` }}>
                                    <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md whitespace-nowrap z-10 transition-all">
                                        ₽{dayData.value.toLocaleString()} ({dayData.label})
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CrystalCard>

                {/* Live Feed / Recent Activity */}
                <CrystalCard className="p-0 flex flex-col">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-semibold text-white">Лента событий</h3>
                        <MoreHorizontal size={16} className="text-gray-500" />
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                        {activities.length > 0 ? activities.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-all">
                                    {item.icon}
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm text-gray-200 font-medium truncate">{item.action}</p>
                                    <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                                </div>
                                <span className="text-[10px] text-indigo-400/50 font-mono">{item.time}</span>
                            </div>
                        )) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2 opacity-50">
                                <Database size={32} />
                                <span className="text-sm">Событий пока нет</span>
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t border-white/5 bg-white/[0.01]">
                        <button className="w-full py-2.5 text-xs font-bold text-center text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all uppercase tracking-widest border border-transparent hover:border-white/5">
                            Полный лог системы
                        </button>
                    </div>
                </CrystalCard>
            </div>
        </div>
    );
}
