import { OrderContent } from "./components/OrderContent"
import { OrderTotals } from "./components/OrderTotals"
import { Product } from "./components/Product"
import { TipForm } from "./components/TipForm"
import { useReducer } from "react"
import { menuItems } from "./data/db"
import { initialState, orderReducer } from "./reducers/orderReducer"

function App() { 

  const [state, dispatch] = useReducer(orderReducer, initialState)

  return (
    <>
      <header className="bg-orange-300 py-5">
        <h1 className="text-center text-3xl font-black">TipCalc - Tu calculadora de propinas</h1>
      </header>

      <main className="max-w-7xl mx-auto py-10 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="font-black text-4xl">Menú</h2>
          <div className="space-y-4 mt-7">
            {menuItems.map(item => (
            <Product 
              key={item.id}
              item={item}
              dispatch={dispatch}
            />
          ))}
          </div>
        </div>
        <div className="border border-dashed border-orange-900 p-5 rounded-xl space-y-4">
          {state.order.length > 0 ?
          (
          <>
            <OrderContent 
              order={state.order}
              dispatch={dispatch}
            />
            <TipForm
              dispatch={dispatch}
              tip={state.tip}/>
            <OrderTotals
              order={state.order}
              tip={state.tip}
              dispatch={dispatch}/>
          </>
          )
        : (<p className='text-center'>Esta vacío</p>) 
        }
        </div>
      </main>
    </>
  )
}

export default App
