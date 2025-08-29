import AdminSidebar from '@/components/admin/AdminSidebar';
import { ToastNotification } from '@/components/ToastNotification';
import React from 'react'

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="md:flex">
                <aside className="md:w-72 md:h-screen  bg-slate-800">
                    <AdminSidebar />
                </aside>

                <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
                    {children}
                </main>
            </div>

            <ToastNotification />
        </>
    )
}