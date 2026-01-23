'use client';

import { DataTable } from '@/components/admin/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { BookingStatus } from '@prisma/client';
import { FileText, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { updateBookingStatus } from '@/app/actions/admin';
import { useRouter } from 'next/navigation';

type BookingData = {
    id: string;
    type: 'housing' | 'vehicle';
    target: string;
    customer: string;
    totalPrice: number;
    status: BookingStatus;
    dates: string;
    createdAt: Date;
};

export function BookingsClient({ initialData }: { initialData: BookingData[] }) {
    const router = useRouter();

    const handleStatusUpdate = async (id: string, status: BookingStatus, type: 'housing' | 'vehicle') => {
        const promise = updateBookingStatus(id, status, type);

        toast.promise(promise, {
            loading: 'Обновление заказа...',
            success: (res) => {
                if (res.success) {
                    router.refresh();
                    return `Заказ ${status === 'CONFIRMED' ? 'подтвержден' : 'отменен'}`;
                }
                throw new Error(res.error);
            },
            error: (err) => err.message
        });
    };

    const columns: ColumnDef<BookingData>[] = [
        {
            accessorKey: "type",
            header: "Тип",
            cell: ({ row }) => {
                const type = row.original.type;
                return (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${type === 'housing'
                        ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                        }`}>
                        {type === 'housing' ? 'Жилье' : 'Авто'}
                    </span>
                );
            }
        },
        {
            accessorKey: "target",
            header: "Объект",
            cell: ({ row }) => <span className="text-white font-medium max-w-[180px] truncate block">{row.original.target}</span>
        },
        {
            accessorKey: "customer",
            header: "Клиент",
            cell: ({ row }) => <span className="text-gray-300 text-sm">{row.original.customer}</span>
        },
        {
            accessorKey: "dates",
            header: "Даты",
            cell: ({ row }) => <span className="text-gray-400 text-xs">{row.original.dates}</span>
        },
        {
            accessorKey: "totalPrice",
            header: "Сумма",
            cell: ({ row }) => <span className="text-white font-bold font-mono">₽{row.original.totalPrice.toLocaleString()}</span>
        },
        {
            accessorKey: "status",
            header: "Статус",
            cell: ({ row }) => <StatusBadge status={row.original.status} type="booking" />
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => handleStatusUpdate(row.original.id, 'CONFIRMED', row.original.type)}
                        className="p-1.5 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors"
                        title="Подтвердить"
                    >
                        <CheckCircle size={15} />
                    </button>
                    <button
                        onClick={() => handleStatusUpdate(row.original.id, 'CANCELLED', row.original.type)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Отменить"
                    >
                        <XCircle size={15} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Документы">
                        <FileText size={15} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={initialData}
            searchKey="target"
            searchPlaceholder="Поиск по объекту..."
        />
    );
}
