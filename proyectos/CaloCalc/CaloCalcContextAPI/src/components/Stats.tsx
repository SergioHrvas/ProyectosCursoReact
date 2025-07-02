import { useMemo } from 'react'
import { CalorieStat } from './CalorieStat'
import { useActivity } from '../hooks/useActivity'

export const Stats = () => {

  const {state} = useActivity()
    
  // Contadores
  const consumedCalories = useMemo(() => 
    state.activities.reduce((total, act) => act.category === 1 ? total + act.calories : total, 0), [state.activities])

  const burnedCalories = useMemo(() => 
    state.activities.reduce((total, act) => act.category === 2 ? total + act.calories : total, 0), [state.activities])
  
  const totalCalories = useMemo(() => consumedCalories - burnedCalories, [state.activities])
  
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
