'use client';

import { CrystalCard } from '@/components/admin/ui/CrystalCard';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
    label: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon?: React.ReactNode;
}

export function MetricCard({ label, value, trend, trendUp, icon }: MetricCardProps) {
    return (
        <CrystalCard className="p-6">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    {icon || <Activity size={24} />}
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full border",
                    trendUp
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                        : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                )}>
                    {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {trend}
                </div>
            </div>

            <div>
                <p className="text-sm font-medium text-gray-500 mb-1 tracking-wide">{label}</p>
                <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
            </div>
        </CrystalCard>
    );
}
