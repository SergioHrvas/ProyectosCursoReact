import Header from './components/Header.tsx'
import Instrument from './components/Instrument.tsx';

import { useEffect, useReducer } from 'react';
import { cartReducer, initialState } from './reducers/cartReducer.ts';

function App() {

  const [state, dispatch] = useReducer(cartReducer, initialState)

    // Guaramos persistencia de datos
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])

  return (
    <>
        {/* Cabecera */}
        <Header 
          cart={state.cart} 
          dispatch={dispatch}
        />


        <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {state.data.map((element) => {
                return (
                  <Instrument 
                    element={element} 
                    key={element.id}
                    dispatch={dispatch}
                  />
                )
              })}
          </div>
        </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">MusicShop - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
