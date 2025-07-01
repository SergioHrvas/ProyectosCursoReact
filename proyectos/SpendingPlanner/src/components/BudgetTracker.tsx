import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { AmountDisplay } from "./AmountDisplay"

export const BudgetTracker = () => {

  const {state} = useBudget()

  const spent = useMemo(() => state.expenses.reduce((total, exp) => total + exp.amount, 0), [state.expenses])
  const available = state.budget - spent


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-between">
        <img src="/grafico.jpg" alt="Gráfica de presupuesto y gastos"/>
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
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
