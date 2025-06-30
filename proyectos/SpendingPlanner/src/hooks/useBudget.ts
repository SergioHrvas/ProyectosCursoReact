import { useContext } from "react"
import { BudgetContext } from '../context/BudgetContext'

export const useBudget = () => {
    const context = useContext(BudgetContext)

    // Buena práctica: si no hay context, lanzamos error
    if(!context) {
        throw new Error("useBudget must be used within a BudgetProvider")
    }
    return context
}