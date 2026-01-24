

'use client';

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Toaster } from 'sonner';
import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#030711] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            <Toaster position="top-right" theme="dark" richColors />
            {/* Background Ambience (Aurora) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex min-h-screen">
                <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out w-full">
                    <AdminHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <main className="flex-1 p-4 lg:p-8 overflow-y-auto overflow-x-hidden w-full">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
