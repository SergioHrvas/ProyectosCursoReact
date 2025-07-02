import type {Activity} from "../types"
import { categories } from "../data/categories"
import { useMemo } from "react"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid"
import { useActivity } from "../hooks/useActivity"


export const ActivityList = () => {

  const {state, dispatch} = useActivity()
  
  const categoryName = useMemo(() => 
    (category: Activity['category']) => 
        categories.map( cat => cat.id === category ? cat.name : '')
    , [state.activities])

  const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])

  return (
    <>
        <h2 className='text-4xl font-bold text-slate-700 text-center'>
            { isEmptyActivities ? 
            (<p className="text-center text-2xl">No hay actividades registradas.</p>)
            :
            (state.activities.map(activity => 
                (
                    <div key={activity.id} className="p-10 bg-white mt-5 flex justify-between">
                        <div className="space-y-2 relative">
                            <p className={`absolute text-white -top-8 -left-8 px-10 py-2 uppercase ${activity.category === 1 ? 'bg-blue-400' : 'bg-orange-400'}`}>{categoryName(activity.category)}</p>
                            <p className="text-2xl pt-5">{activity.name}</p>
                            <p className="font-black text-4xl text-blue-400">{activity.calories} {''}calorías</p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <button 
                                onClick={() => dispatch({ type: "set-activityId", payload: {id: activity.id}})}>
                                <PencilSquareIcon className="h-8 w-8 text-gray-800"/>
                            </button>
                            <button 
                                onClick={() => dispatch({ type: "delete-activity", payload: {id: activity.id}})}>
                                <TrashIcon className="h-8 w-8 text-red-600"/>
                            </button>
                        </div>
                    </div>
                )
            ))}
        </h2>
    </>
  )
}
