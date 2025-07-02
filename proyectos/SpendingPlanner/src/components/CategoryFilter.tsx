import type { ChangeEvent } from 'react'
import {categories} from '../data/categories'
import { useBudget } from '../hooks/useBudget'

export const CategoryFilter = () => {
  const { dispatch } = useBudget()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {    
    dispatch(
        {
            type: "set-category-filter", 
            payload: {
                categoryId: e.target.value
            }
        }
    )   
  }
    

  return (
    <div className="bg-white shadow-xl rounded-lg p-10 ">
        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="filterCategory">Filtrar gastos por categoría</label>
                <select
                    id="filterCategory"
                    className='bg-slate-100 p-3 flex-1 rounded-lg'
                    onChange={handleChange}>
                    <option value="">-- Todas las categorías --</option>
                    { categories.map (cat => 
                        <option
                            key={cat.id}
                            value={cat.id}
                        >
                        {cat.name}
                        </option>
                    )}
                </select>
            </div>
        </form>
    </div>
  )
}
