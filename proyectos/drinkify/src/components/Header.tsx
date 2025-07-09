import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"
import { useEffect } from "react"
import type { SearchParams } from "../types"

export const Header = () => {

    const [searchParams, setSearchParams] = useState<SearchParams>({
        ingredient: "",
        category: ""
    })

    const [error, setError] = useState("")

    const {pathname} = useLocation()
    const {categories, fetchCategories, fetchRecipes} = useAppStore()

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(searchParams).includes('')){
            setError('Todos los campos son obligatorios')
            return
        }

        setError("")
        fetchRecipes(searchParams)
    }

    const isHome = useMemo(() => pathname === "/", [pathname])

    return (
        <header className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}>
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

                { isHome && (
                    <form 
                        className="md:w-1/2 2xl:w-1/3 bg-orange-500 my-20 p-6 rounded-lg shadow ml-auto space-y-4"
                        onSubmit={handleSubmit}>
                        <div className="flex flex-row gap-4 items-center">
                            <label 
                                className="block text-white uppercase font-extrabold text-lg" 
                                htmlFor="ingredient">
                                    Ingrediente
                            </label>
                            <input 
                                type="text" 
                                name="ingredient" 
                                id="ingredient" 
                                value={searchParams.ingredient}
                                onChange={handleChange}
                                placeholder="Introduzca el nombre o ingredientes"
                                className="p-3 rounded bg-slate-300 w-full focus:outline-none"
                            />
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                            <label 
                                className="block text-white uppercase font-extrabold text-lg" 
                                htmlFor="category">
                                    Categoría
                            </label>
                            <select 
                                name="category" 
                                id="category"
                                value={searchParams.category}
                                onChange={handleChange}
                                className="p-3 rounded bg-slate-300 w-full focus:outline-none"
                            >
                                <option value="">-- Seleccione la categoría --</option>
                                {categories.drinks.map(cat => 
                                    (
                                        <option key={cat.strCategory} value={cat.strCategory}>{cat.strCategory}</option>
                                    )
                                )
                                }
                            </select>
                        </div>
                        <input type="submit" value="Buscar receta"
                            className="w-full rounded-lg bg-slate-900 text-white font-bold uppercase p-3 cursor-pointer hover:bg-slate-800"/>
                    </form>
                )}
            </div>
        </header>
    )
}
