import { BudgetForm } from "./components/BudgetForm"

function App() {
  return (
    <>
      <header className="bg-lime-600 py-8 max-h-70">
        <h1 className="font-black text-6xl uppercase text-center text-white">
          SpendingPlanner
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl mt-10 p-10">
        <BudgetForm/>
      </div>
    </>
  )
}

export default App
