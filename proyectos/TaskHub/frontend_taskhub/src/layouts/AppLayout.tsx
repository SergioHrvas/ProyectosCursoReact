import { Link, Outlet } from "react-router-dom"
import { Logo } from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 

export const AppLayout = () => {
  return (
    <>
        <header className="bg-slate-800 py-5">
            <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="w-72">
                  <Link to={'/'}>
                    <Logo/>
                  </Link>
                </div>
                <NavMenu/>
            </div>
        </header>
        <main className="max-w-screen-2xl mx-auto mt-10 p-4">
            <Outlet/>
        </main>

        <footer className="py-5 mt-10 bg-slate-900">
          <p className="text-center text-white">Todos los derechos reservados. TaskHub {new Date().getFullYear()}.</p>
        </footer>

        <ToastContainer
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
    </>
  )
}
