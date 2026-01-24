'use client';

import { Search, Bell, Command, LogOut, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';

interface AdminHeaderProps {
    onToggleSidebar: () => void;
}

export function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-white/5 bg-[#030711]/80 px-4 lg:px-8 backdrop-blur-xl">
            {/* Global Search Command Center */}
            <div className="flex flex-1 items-center justify-end md:justify-start">
                {/* Mobile Sidebar Toggle */}
                <button
                    onClick={onToggleSidebar}
                    className="lg:hidden mr-4 p-2 text-gray-400 hover:text-white"
                >
                    <Menu size={20} />
                </button>

                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center gap-2 mr-auto">
                    <span className="text-lg font-bold tracking-wide text-white">TITAN</span>
                </div>

                <button className="md:hidden p-2 text-gray-400 hover:text-white">
                    <Search size={20} />
                </button>
                <button
                    onClick={() => { }} // TODO: Implement Command Palette (CMDK)
                    className="hidden md:flex group h-11 w-full max-w-lg items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 text-sm text-gray-500 transition-all hover:bg-white/10 hover:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                    <Search size={18} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                    <span className="flex-1 text-left">Поиск по системе...</span>
                    <div className="flex items-center gap-1 rounded border border-white/10 bg-black/20 px-1.5 py-0.5 text-xs font-medium text-gray-500">
                        <Command size={10} />
                        <span>K</span>
                    </div>
                </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                {/* Live Status Indicator */}
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Система онлайн
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative rounded-xl p-2.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#030711]" />
                    </button>

                    <div className="h-8 w-px bg-white/5" />

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex flex-col text-right">
                            <span className="text-sm font-bold text-white leading-tight">{session?.user?.name || 'Администратор'}</span>
                            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{session?.user?.email === 'admin@rentrf.ru' ? 'Super Admin' : 'Editor'}</span>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="group relative h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:bg-red-500/10 hover:border-red-500/20 text-gray-400 hover:text-red-400 transition-all cursor-pointer"
                            title="Выйти из системы"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
