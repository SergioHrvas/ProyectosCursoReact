"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminSidebarElementProps = {
    nav: {
        url: string;
        text: string;
        blank: boolean;
    }
}

export const AdminSidebarElement = ({ nav }: AdminSidebarElementProps) => {

    const pathName = usePathname()

    return (
        <Link
            href={nav.url}
            target={nav.blank ? '_blank' : ''}
            className={`${pathName.startsWith(nav.url) ? 'bg-emerald-700' : ''} font-bold flex items-center gap-4 w-full border-t text-white border-slate-600 p-3 last-of-type:border-b`}
        ><p className=" text-2xl ml-4">{nav.text}</p></Link>
    )
}
