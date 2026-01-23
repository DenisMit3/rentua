'use client';

import { DataTable } from '@/components/admin/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { ListingStatus } from '@prisma/client';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { updateListingStatus } from '@/app/actions/admin';
import { useRouter } from 'next/navigation';

type ListingData = {
    id: string;
    title: string;
    host: string;
    city: string;
    price: number;
    status: ListingStatus;
    image: string;
};

export function ListingsClient({ initialData }: { initialData: ListingData[] }) {
    const router = useRouter();

    const handleToggleStatus = async (id: string, currentStatus: ListingStatus) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'REJECTED' : 'ACTIVE';
        const promise = updateListingStatus(id, newStatus);

        toast.promise(promise, {
            loading: 'Обновление...',
            success: (res) => {
                if (res.success) {
                    router.refresh();
                    return `Объявление ${newStatus === 'ACTIVE' ? 'опубликовано' : 'отклонено'}`;
                }
                throw new Error(res.error);
            },
            error: (err) => err.message
        });
    };

    const columns: ColumnDef<ListingData>[] = [
        {
            accessorKey: "image",
            header: "Фото",
            cell: ({ row }) => (
                <div className="h-10 w-16 overflow-hidden rounded-lg bg-white/5 border border-white/10">
                    <img src={row.original.image} alt={row.original.title} className="h-full w-full object-cover" />
                </div>
            )
        },
        {
            accessorKey: "title",
            header: "Объект",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium text-white max-w-[200px] truncate">{row.original.title}</span>
                    <span className="text-xs text-gray-500">{row.original.city}</span>
                </div>
            )
        },
        {
            accessorKey: "host",
            header: "Хост",
            cell: ({ row }) => <span className="text-gray-300">{row.original.host}</span>
        },
        {
            accessorKey: "price",
            header: "Цена/ночь",
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
                        onClick={() => toast.error('Удаление объявлений ограничено для демо')}
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
            searchKey="title"
            searchPlaceholder="Поиск по названию..."
        />
    );
}
