import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseItem } from "./ExpenseItem"

export const ExpenseList = () => {

  const {state} = useBudget()

  
  const filteredExpenses = state.categoryFilter ? state.expenses.filter(exp => exp.category === state.categoryFilter) : state.expenses
  
  const isEmpty = useMemo (() => filteredExpenses.length === 0, [filteredExpenses])

  return (
    <div className="mt-10 bg-white shadow-xl rounded-lg p-10">
        {isEmpty ? <p className="text-gray-700 text-2xl font-bold">No hay gastos introducidos.</p> : 
        (
            <>
                <p className="text-gray-700 text-2xl font-bold my-5">Histórico de gastos</p>
                {filteredExpenses.map(expense => 
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
