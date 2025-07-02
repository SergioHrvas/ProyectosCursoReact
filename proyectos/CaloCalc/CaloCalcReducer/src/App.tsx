import { Form } from './components/Form'
import { ActivityList } from './components/ActivityList'
import { Stats } from './components/Stats'
import { useEffect, useMemo, useReducer } from 'react'
import { activityReducer, initialState } from './reducers/activityReducer'

function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = useMemo(() => state.activities.length > 0, [state.activities])
  
  return (
    <>
      <header className="bg-blue-400 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-black text-blue-900 text-center uppercase">CaloCalc</h1>
          <button 
            className="bg-slate-800 text-white font-bold p-3 rounded-2xl disabled:opacity-10 "
            disabled={!canRestartApp}
            onClick={() => dispatch({type: "clear-activities"})}
          >
              Reiniciar App
          </button>
        </div>
      </header>
      <section className="bg-blue-200 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} state={state}/>
        </div>
      </section>
      <section className="bg-blue-950 py-20 px-10">
        <div className='max-w-4xl mx-auto'>
          <Stats activities={state.activities}/>
        </div>
      </section>
      <section className="bg-white py-20 mx-auto max-w-4xl">
        <ActivityList 
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
