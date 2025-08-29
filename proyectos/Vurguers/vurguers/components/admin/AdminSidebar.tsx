import { Logo } from "../ui/Logo"
import { AdminSidebarElement } from "./AdminSidebarElement"

const adminNavigation = [
    {url: '/admin/orders', text: 'Ordenes', blank: false},
    {url: '/admin/products', text: 'Productos', blank: false},
    {url: '/order/snacks', text: 'Ver Quiosco', blank: true},
]

export default function AdminSidebar() {

    return (
        <>
            <Logo/>
            <div className="space-y-3 ">
                <p className="mt-10 uppercase font-bold text-sm text-white text-center">Navegación</p>
                <nav className="flex flex-col">
                    {
                        adminNavigation.map(nav => 
                            <AdminSidebarElement key={nav.url} nav={nav}/>
                        )
                    }
                </nav>
            </div>
        </>

    )
}