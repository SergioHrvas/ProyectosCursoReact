import Header from './components/Header.jsx'
import Instrument from './components/Instrument.jsx'
import { useState, useEffect } from 'react'
import { db } from './data/db.js'

function App() {

  // Carrito inicial (recuperamos de localStorage)
  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    
    // Comprobamos si hay algo
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  //Estados
  const [cart, setCart] = useState(initialCart())
  const [data] = useState(db)

  //Constantes
  const MAX_ITEMS = 10;
  const MIN_ITEMS = 1;

  // Guaramos persistencia de datos
  useEffect(()=> {
        localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

   // Si fuese una API
  /*
  const [data, setData] = useState([])

  useState(() => {
    setData(db)
  }, [])
  */
  
  function addToCart(element){
    //Buscamos si existe el elemento en el carrito
    const itemExists = cart.findIndex((item) => element.id === item.id)

    if(itemExists === -1){ //No existe en el carrito
      setCart([...cart, {...element, count: 1}])
    }
    else{ // Ya existe en el carrito
      setCart(prevCart => prevCart.map((item, indice) =>
        (indice === itemExists && item.count < MAX_ITEMS)
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

  function removeFromCart(id){
    //setCart(cart.filter(element => element.id !== id))

    setCart(prevCart => prevCart.filter(element => element.id !== id))
  }

  function changeCount(id, inc){
    if (inc === true) //INCREMENTAR
      setCart(prevCart => prevCart.map(element => (element.id === id && element.count < MAX_ITEMS) ? {...element, count: element.count + 1} : element))
    else // DECREMENTAR
      setCart(prevCart => prevCart.map(element => (element.id === id && element.count > MIN_ITEMS )? {...element, count: element.count - 1} : element))
  }

  function cleanCart(){
    setCart([])  
  }


  return (
    <>
        {/* Cabecera */}
        <Header 
          cart={cart} 
          removeFromCart={removeFromCart}
          changeCount={changeCount}
          cleanCart={cleanCart}
        />


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
              <p className="text-white text-center fs-4 mt-4 m-md-0">MusicShop - Todos los derechos Reservados</p>
          </div>
      </footer>
    </>
  )
}

export default App
