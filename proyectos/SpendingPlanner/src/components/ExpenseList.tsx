import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseItem } from "./ExpenseItem"

export const ExpenseList = () => {

  const {state} = useBudget()

  const isEmpty = useMemo (() => state.expenses.length === 0, [state.expenses])
  
  return (
    <div>
        {isEmpty ? <p className="text-gray-700 text-2xl font-bold">No hay gastos introducidos.</p> : 
        (
            <>
                <p className="text-gray-700 text-2xl font-bold my-5">Histórico de gastos</p>
                {state.expenses.map(expense => 
                    <ExpenseItem
                        key={expense.id}
                        expense={expense}
                    />
                )}
            </>
        )
        }
    </div>
  )
}
