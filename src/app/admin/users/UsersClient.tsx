'use client';

import { DataTable } from '@/components/admin/ui/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { UserRole } from '@prisma/client';
import { FileText, Ban } from 'lucide-react';
import { toast } from 'sonner';
import { toggleUserVerification, deleteUser } from '@/app/actions/admin';
import { useRouter } from 'next/navigation';

type UserData = {
    id: string;
    name: string | null;
    email: string | null;
    role: UserRole;
    isVerified: boolean;
    createdAt: Date;
    bookingsCount: number;
};

export function UsersClient({ initialData }: { initialData: UserData[] }) {
    const router = useRouter();

    const handleToggleVerification = async (userId: string, currentStatus: boolean) => {
        const promise = toggleUserVerification(userId, currentStatus);

        toast.promise(promise, {
            loading: 'Обновление статуса...',
            success: (res) => {
                if (res.success) {
                    router.refresh();
                    return `Пользователь ${!currentStatus ? 'верифицирован' : 'снят с верификации'}`;
                }
                throw new Error(res.error);
            },
            error: (err) => err.message
        });
    };

    const handleDeleteUser = async (userId: string, name: string) => {
        if (!confirm(`Вы уверены, что хотите удалить пользователя ${name}?`)) return;

        const promise = deleteUser(userId);

        toast.promise(promise, {
            loading: 'Удаление...',
            success: (res) => {
                if (res.success) {
                    router.refresh();
                    return `Пользователь ${name} удален`;
                }
                throw new Error(res.error);
            },
            error: (err) => err.message
        });
    };

    const columns: ColumnDef<UserData>[] = [
        {
            accessorKey: "name",
            header: "Пользователь",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xs font-bold text-indigo-300">
                            {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-white">{user.name || 'Аноним'}</span>
                            <span className="text-xs text-gray-500">{user.email}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "role",
            header: "Роль",
            cell: ({ row }) => {
                return <StatusBadge status={row.original.role} type="user" />;
            }
        },
        {
            accessorKey: "isVerified",
            header: "Верификация",
            cell: ({ row }) => {
                return (
                    <button
                        onClick={() => handleToggleVerification(row.original.id, row.original.isVerified)}
                        className={`flex items-center gap-2 text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${row.original.isVerified ? 'text-emerald-400' : 'text-rose-400'}`}
                    >
                        <div className={`h-1.5 w-1.5 rounded-full ${row.original.isVerified ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]'}`} />
                        {row.original.isVerified ? 'Подтвержден' : 'Не подтвержден'}
                    </button>
                )
            }
        },
        {
            accessorKey: "bookingsCount",
            header: "Активность",
            cell: ({ row }) => <span className="font-mono text-gray-400">{row.original.bookingsCount}</span>
        },
        {
            accessorKey: "createdAt",
            header: "Регистрация",
            cell: ({ row }) => <span className="text-gray-500 text-xs">{new Date(row.original.createdAt).toLocaleDateString()}</span>
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Открыть профиль">
                            <FileText size={16} />
                        </button>
                        <button
                            onClick={() => handleDeleteUser(row.original.id, row.original.name || row.original.email || 'Аноним')}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Удалить пользователя"
                        >
                            <Ban size={16} />
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={initialData}
            searchKey="name"
            searchPlaceholder="Поиск по имени..."
        />
    );
}
