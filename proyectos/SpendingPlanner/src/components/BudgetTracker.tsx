import { AmountDisplay } from "./AmountDisplay"

export const BudgetTracker = () => {
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
          quantity={300}
        />

        <AmountDisplay
          label="Disponible"
          quantity={100}
        />

        <AmountDisplay
          label="Gastado"
          quantity={250}
        />
      </div>
    </div>
  )
}
