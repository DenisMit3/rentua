import prisma from '@/lib/prisma';
import { DataTable } from '@/components/admin/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Star, MessageSquare, Trash2, ShieldAlert } from 'lucide-react';
import { CrystalCard } from '@/components/admin/ui/CrystalCard';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';

type UnifiedReview = {
    id: string;
    type: 'housing' | 'vehicle';
    targetName: string;
    authorName: string;
    rating: number;
    comment: string;
    createdAt: Date;
};

const columns: ColumnDef<UnifiedReview>[] = [
    {
        accessorKey: "type",
        header: "Тип",
        cell: ({ row }) => {
            const type = row.original.type;
            return (
                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${type === 'housing'
                        ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                        : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                    }`}>
                    {type === 'housing' ? 'Жилье' : 'Авто'}
                </span>
            );
        }
    },
    {
        accessorKey: "targetName",
        header: "Объект",
        cell: ({ row }) => <span className="text-white font-medium">{row.original.targetName}</span>
    },
    {
        accessorKey: "authorName",
        header: "Автор",
        cell: ({ row }) => <span className="text-gray-300">{row.original.authorName}</span>
    },
    {
        accessorKey: "rating",
        header: "Оценка",
        cell: ({ row }) => (
            <div className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-white">{row.original.rating}</span>
            </div>
        )
    },
    {
        accessorKey: "comment",
        header: "Комментарий",
        cell: ({ row }) => (
            <div className="max-w-[300px] truncate text-gray-400 text-sm" title={row.original.comment}>
                {row.original.comment}
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Дата",
        cell: ({ row }) => <span className="text-gray-500 text-xs">{new Date(row.original.createdAt).toLocaleDateString()}</span>
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Скрыть">
                    <ShieldAlert size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Удалить">
                    <Trash2 size={16} />
                </button>
            </div>
        )
    }
];

export const revalidate = 0;

export default async function AdminReviewsPage() {
    const [housingReviews, vehicleReviews] = await Promise.all([
        prisma.review.findMany({
            include: {
                author: { select: { name: true, email: true } },
                listing: { select: { title: true } }
            },
            orderBy: { createdAt: 'desc' }
        }),
        prisma.vehicleReview.findMany({
            include: {
                author: { select: { name: true, email: true } },
                vehicle: { select: { title: true } }
            },
            orderBy: { createdAt: 'desc' }
        })
    ]);

    const unified: UnifiedReview[] = [
        ...housingReviews.map(r => ({
            id: r.id,
            type: 'housing' as const,
            targetName: r.listing.title,
            authorName: r.author.name || r.author.email || 'Anonymous',
            rating: r.rating,
            comment: r.comment,
            createdAt: r.createdAt
        })),
        ...vehicleReviews.map(r => ({
            id: r.id,
            type: 'vehicle' as const,
            targetName: r.vehicle.title,
            authorName: r.author.name || r.author.email || 'Anonymous',
            rating: r.rating,
            comment: r.comment,
            createdAt: r.createdAt
        }))
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Отзывы платформы</h1>
                    <p className="text-gray-400 text-sm">Модерация оценок и комментариев пользователей.</p>
                </div>
                <div className="flex gap-4">
                    <CrystalCard className="px-4 py-2 flex items-center gap-3 bg-indigo-500/10 border-indigo-500/20">
                        <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                            <Star size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-indigo-300 font-medium uppercase tracking-wider">Всего отзывов</span>
                            <span className="text-xl font-bold text-white">{unified.length}</span>
                        </div>
                    </CrystalCard>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={unified}
                searchKey="comment"
                searchPlaceholder="Поиск по содержанию..."
            />
        </div>
    );
}
