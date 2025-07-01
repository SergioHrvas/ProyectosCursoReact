import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"

export const BudgetForm = () => {

  const [budget, setBudget] = useState(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value)
  }

  const {dispatch} = useBudget()

  const isValid = useMemo(() => !(isNaN(budget)) && (budget > 0) && (budget < 10000),[budget])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({type: "add-budget", "payload": {budget}})

  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="budget" className="text-4xl text-lime-800 font-bold text-center">Presupuesto: {''}</label>
          <input 
            id="budget"
            name="budget"
            type="number" 
            className="w-full bg-slate-100 border border-gray-300 rounded-lg p-2"
            placeholder="Introduzca el presupuesto deseado"
            value={budget}
            onChange={handleChange}
          />
        </div>

        <input
          type="submit"
          className="w-full uppercase rounded-2xl bg-lime-700 hover:bg-lime-900 text-white font-black p-4 cursor-pointer disabled:opacity-30 disabled:cursor-default"
          value="Definir presupuesto"
          onClick={() => console.log("Presupuesto definido")}
          disabled={!isValid}
        />
    </form>
  )
}
