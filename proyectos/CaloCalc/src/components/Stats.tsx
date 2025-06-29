import { useMemo } from 'react'
import type { Activity } from '../types'
import { CalorieStat } from './CalorieStat'

type StatsProps = {
    activities: Activity[]
}

export const Stats = ({activities}: StatsProps) => {
    
  // Contadores
  const consumedCalories = useMemo(() => 
    activities.reduce((total, act) => act.category === 1 ? total + act.calories : total, 0), [activities])

  const burnedCalories = useMemo(() => 
    activities.reduce((total, act) => act.category === 2 ? total + act.calories : total, 0), [activities])
  
  const totalCalories = useMemo(() => consumedCalories - burnedCalories, [activities])
  
  return (
    <>
        <h2 className='font-black text-white text-4xl text-center'>
            Contadores de calorías
        </h2>
        
        <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
            <CalorieStat text="Consumidas" quantity={consumedCalories}/>
            <CalorieStat text="Quemadas" quantity={burnedCalories}/>

            <CalorieStat text="Totales" quantity={totalCalories}/>
        </div>

    </>
  )
}
