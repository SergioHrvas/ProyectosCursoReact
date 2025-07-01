import { BudgetForm } from "./components/BudgetForm"
import { BudgetTracker } from "./components/BudgetTracker"
import { ExpenseList } from "./components/ExpenseList"
import ExpenseModal from "./components/ExpenseModal"
import { useBudget } from "./hooks/useBudget"
import { useMemo } from "react"

function App() {
  const { state } = useBudget()

  const isValid = useMemo(() => state.budget > 0, [state.budget])
  return (
    <>
      <header className="bg-lime-600 py-8 max-h-70">
        <h1 className="font-black text-6xl uppercase text-center text-white">
          SpendingPlanner
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl mt-10 p-10">
        {isValid
          ? <BudgetTracker/>
          : <BudgetForm/>
        }
      </div>

        {isValid && 
          (
            <main className="max-w-3xl mx-auto py-10">
              <ExpenseModal/>
              <ExpenseList/>
            </main>
          )
        }

    </>
  )
}

export default App
