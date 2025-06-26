import { categories } from "../data/categories"
import { useState, type ActionDispatch, type ChangeEvent, type FormEvent } from "react"
import type { Activity } from '../types'
import type { ActivityActions } from "../reducers/activityReducer"

type FormProps = {
    dispatch: ActionDispatch<[action: ActivityActions]>
}

const initialState = {
    category: 1,
    name: "",
    calories: 0
  }


export const Form = ({dispatch}: FormProps) => {

  // Estado
  const [activity, setActivity] = useState<Activity>(initialState)

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ) => {
    setActivity(
        {
            ...activity,
            [e.target.id]: ["category", "calories"].includes(e.target.id) ? +e.target.value : e.target.value
        }
    )
  }

  const isValidActivity = () => {
    const {name, calories} = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault() // Para que no suba

     // Mandamos acción al reducer para que guarde la actividad
     dispatch({ type: "save-activity", payload: {newActivity: activity}})

     // Reiniciamos formulario
     setActivity(
        initialState
     )
  }

  return (
    <form
        className='space-y-5 bg-white shadow p-10 rounded-xl'
        onSubmit={handleSubmit}
    >
        <div className='grid grid-cols-1 gap-3'>
            <label htmlFor='category' className="font-bold">Categoría:</label>
            <select
                className='border border-slate-300 bg-slate-200 p-2 rounded-xl w-full '
                id='category'
                value={activity.category}
                onChange={handleChange}
            >
                {categories.map(category => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
        <div className='grid grid-cols-1 gap-3'>
            <label htmlFor='name' className="font-bold">Actividad:</label>
            <input
                id="name"
                type="text"
                className="border border-slate-300 bg-slate-200 p-2 rounded-xl w-full"
                placeholder="Introduzca la actividad (ej: comida, ensalada, ejercicio, pesas)"
                value={activity.name}
                onChange={handleChange}
            >
            </input>
        </div>
        <div className='grid grid-cols-1 gap-3'>
            <label htmlFor='calories' className="font-bold">Calorías:</label>
            <input
                id="calories"
                type="number"
                className="border border-slate-300 bg-slate-200 p-2 rounded-xl w-full"
                placeholder="Introduzca las calorías (ej: 200, 500...)"
                value={activity.calories}
                onChange={handleChange}
            >
            </input>
        </div>
                
        <input
            type="submit"
            className="bg-gray-800 hover:bg-black text-white font-bold uppercase w-full p-4 disabled:opacity-10
            cursor-pointer"
            value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
            disabled={!isValidActivity()}
            />
    </form>
  )
}
