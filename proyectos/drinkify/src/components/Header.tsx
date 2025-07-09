import { Link, NavLink } from "react-router-dom"

export const Header = () => {
  return (
    <header className="bg-slate-800">
        <div className='mx-auto container py-6 px-6'>
            <div className='flex justify-between items-center'>
                <img className="w-40" src="/BEBIDA.png"/>
                <nav className="flex gap-6">
                    <NavLink to="/" className={({isActive}) => 
                        isActive ? 
                        'text-orange-500 uppercase font-bold text-2xl py-2 px-8 rounded-lg cursor-pointer hover:bg-slate-500' : 
                        'text-white uppercase font-bold text-2xl py-2 px-8 rounded-lg cursor-pointer hover:bg-slate-500'
                    }>
                        Inicio
                    </NavLink>
                    <NavLink to="/favourites" className={({isActive}) => 
                        isActive ? 
                        'text-orange-500 uppercase font-bold text-2xl py-2 px-8 rounded-lg cursor-pointer hover:bg-slate-500' : 
                        'text-white uppercase font-bold text-2xl py-2 px-8 rounded-lg cursor-pointer hover:bg-slate-500'
                    }>
                        Favoritos
                    </NavLink>
                </nav>
            </div>


        </div>
    </header>
  )
}
