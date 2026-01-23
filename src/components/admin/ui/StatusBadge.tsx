'use client';

import { cn } from '@/lib/utils';
import { BadgeCheck, Ban, Clock, XCircle, AlertCircle, CheckCircle, Users } from 'lucide-react';

interface StatusBadgeProps {
    status: string;
    className?: string;
    type?: 'user' | 'booking' | 'listing' | 'vehicle';
}

export function StatusBadge({ status, className, type = 'booking' }: StatusBadgeProps) {
    let colorClass = 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    let icon = AlertCircle;
    let label = status;

    const s = status.toUpperCase();

    // Color Mapping Logic
    if (['ACTIVE', 'CONFIRMED', 'VERIFIED', 'COMPLETED', 'PAID'].includes(s)) {
        colorClass = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        icon = CheckCircle;
    } else if (['PENDING', 'PENDING_REVIEW', 'DRAFT'].includes(s)) {
        colorClass = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        icon = Clock;
    } else if (['CANCELLED', 'REJECTED', 'BANNED', 'BLOCKED'].includes(s)) {
        colorClass = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
        icon = s === 'BANNED' ? Ban : XCircle;
    } else if (s === 'ADMIN') {
        colorClass = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
        icon = BadgeCheck;
    } else if (s === 'HOST') {
        colorClass = 'text-purple-400 bg-purple-500/10 border-purple-500/20';
        icon = Users; // Will be imported
    }

    const Icon = icon;

    // Translation Map
    const translations: Record<string, string> = {
        'ACTIVE': 'Активен',
        'CONFIRMED': 'Подтвержден',
        'VERIFIED': 'Верифицирован',
        'COMPLETED': 'Завершен',
        'PAID': 'Оплачен',
        'PENDING': 'Ожидание',
        'PENDING_REVIEW': 'На проверке',
        'DRAFT': 'Черновик',
        'CANCELLED': 'Отменен',
        'REJECTED': 'Отклонен',
        'BANNED': 'Заблокирован',
        'BLOCKED': 'Заблокирован',
        'ADMIN': 'Админ',
        'HOST': 'Владелец',
        'USER': 'Пользователь',
    };

    if (translations[s]) label = translations[s];

    return (
        <div className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider",
            colorClass,
            className
        )}>
            <Icon size={12} />
            {label}
        </div>
    );
}


