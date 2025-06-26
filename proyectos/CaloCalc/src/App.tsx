import {Form} from './components/Form'
import { useReducer } from 'react'
import { activityReducer, initialState } from './reducers/activityReducer'

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    <>
      <header className="bg-blue-400 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-black text-blue-900 text-center uppercase">CaloCalc</h1>
          <button className="bg-slate-800 text-white font-bold p-3 rounded-2xl ">Reiniciar contadores</button>
        </div>
      </header>
      <section className="bg-blue-200 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch}/>
        </div>
      </section>
    </>
  )
}

export default App
