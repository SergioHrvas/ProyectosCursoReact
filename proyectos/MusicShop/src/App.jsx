import Header from './components/Header.jsx'
import Instrument from './components/Instrument.jsx'
import { useState, useEffect } from 'react'
import { db } from './data/db.js'

function App() {
  const [data, setData] = useState(db)

  // Si fuese una API
  /*
  const [data, setData] = useState([])

  useState(() => {
    setData(db)
  }, [])
  */

  const [cart, setCart] = useState([])

  function addToCart(element){
    //Buscamos si existe el elemento en el carrito
    const itemExists = cart.findIndex((item) => element.id === item.id)

    if(itemExists === -1){ //No existe en el carrito
      setCart([...cart, {...element, count: 1}])
    }
    else{ // Ya existe en el carrito
      setCart(cart.map((item, indice) =>
        indice === itemExists
          ? {...item, count: item.count + 1} 
          : item
      ))
      
      /* Otra opción */
      // Copiamos el estado del carro
      // const updatedCart = [...cart]
      // updatedCart[itemExists].count++
      // setCart(updatedCart)
    }
  }

  return (
    <>
        {/* Cabecera */}
        <Header cart={cart}/>


        <main className="container-xl mt-5">
          <h2 className="text-center">Nuestra Colección</h2>

          <div className="row mt-5">
              {data.map((element) => {
                return (
                  <Instrument 
                    element={element} 
                    key={element.id}
                    addToCart={addToCart}
                  />
                )
              })}
          </div>
        </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
