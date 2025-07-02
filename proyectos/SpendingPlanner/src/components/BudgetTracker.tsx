import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { useBudget } from "../hooks/useBudget"
import { AmountDisplay } from "./AmountDisplay"

import 'react-circular-progressbar/dist/styles.css'

export const BudgetTracker = () => {

  const {state, dispatch, spent, available} = useBudget()
  
  const percentage = +((spent / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-between">
        <CircularProgressbar 
          value = {percentage}
          text = {`${percentage}% gastado`}
          styles = {buildStyles({
            pathColor: percentage === 100 ? "#DC2626" : '#65a30d',
            trailColor: '#F5F5F5',
            textSize: 10,
            textColor: "#65a30d"
          })}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          onClick={() => dispatch({type: "clear-app"})}
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-xl">
            Reiniciar app
        </button>

        <AmountDisplay
          label="Presupuesto"
          quantity={state.budget}
        />

        <AmountDisplay
          label="Disponible"
          quantity={available}
        />

        <AmountDisplay
          label="Gastado"
          quantity={spent}
        />
      </div>
    </div>
  )
}
