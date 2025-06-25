import Header from './components/Header.tsx'
import Instrument from './components/Instrument.tsx';
import useCart from './hooks/useCart.ts'

function App() {

  // Hook personalizado
  const {
    data,
    cart,
    cleanCart, 
    changeCount, 
    removeFromCart,
    addToCart,
    isEmpty,
    calcularTotal
  } = useCart()
  

  return (
    <>
        {/* Cabecera */}
        <Header 
          cart={cart} 
          removeFromCart={removeFromCart}
          changeCount={changeCount}
          cleanCart={cleanCart}
          isEmpty={isEmpty}
          calcularTotal={calcularTotal}
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
