import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Toaster } from 'sonner';

export const metadata = {
    title: 'Titan Admin | RentRF',
    description: 'Центр управления системой',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#030711] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
            <Toaster position="top-right" theme="dark" richColors />
            {/* Background Ambience (Aurora) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10 flex min-h-screen">
                <AdminSidebar />

                <div className="flex flex-1 flex-col">
                    <AdminHeader />
                    <main className="flex-1 p-8 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
