'use client';

import { DataTable } from '@/components/admin/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { ListingStatus } from '@prisma/client';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { updateListingStatus } from '@/app/actions/admin';
import { useRouter } from 'next/navigation';

type VehicleData = {
    id: string;
    make: string;
    model: string;
    year: number;
    owner: string;
    price: number;
    status: ListingStatus;
    image: string;
};

export function CarsClient({ initialData }: { initialData: VehicleData[] }) {
    const router = useRouter();

    const handleToggleStatus = async (id: string, currentStatus: ListingStatus) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'REJECTED' : 'ACTIVE';
        // Reuse updateListingStatus because Vehicles also have ACTIVE/REJECTED status in ListingStatus-like way in schema
        // Actually schema for vehicle status is also an enum but might be named differently? 
        // Let's check schema for vehicle status
        const promise = updateListingStatus(id, newStatus);

        toast.promise(promise, {
            loading: 'Обновление...',
            success: (res) => {
                if (res.success) {
                    router.refresh();
                    return `Автомобиль ${newStatus === 'ACTIVE' ? 'активирован' : 'отклонен'}`;
                }
                throw new Error(res.error);
            },
            error: (err) => err.message
        });
    };
    const columns: ColumnDef<VehicleData>[] = [
        {
            accessorKey: "image",
            header: "Фото",
            cell: ({ row }) => (
                <div className="h-10 w-16 overflow-hidden rounded-lg bg-white/5 border border-white/10">
                    <img src={row.original.image} alt={row.original.make} className="h-full w-full object-cover" />
                </div>
            )
        },
        {
            id: "vehicle",
            header: "Автомобиль",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium text-white">{row.original.make} {row.original.model}</span>
                    <span className="text-xs text-gray-500">{row.original.year} год</span>
                </div>
            )
        },
        {
            accessorKey: "owner",
            header: "Владелец",
            cell: ({ row }) => <span className="text-gray-300 text-sm">{row.original.owner}</span>
        },
        {
            accessorKey: "price",
            header: "Сутки",
            cell: ({ row }) => <span className="text-white font-mono">₽{row.original.price.toLocaleString()}</span>
        },
        {
            accessorKey: "status",
            header: "Статус",
            cell: ({ row }) => (
                <button
                    onClick={() => handleToggleStatus(row.original.id, row.original.status)}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <StatusBadge status={row.original.status} type="listing" />
                </button>
            )
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Посмотреть">
                        <ExternalLink size={16} />
                    </button>
                    <button
                        onClick={() => toast.info('Функция редактирования в разработке')}
                        className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                        title="Редактировать"
                    >
                        <Edit size={16} />
                    </button>
                    <button
                        onClick={() => toast.error('Удаление авто ограничено в демо-режиме')}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Удалить"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={initialData}
            searchKey="make"
            searchPlaceholder="Поиск по марке..."
        />
    );
}
