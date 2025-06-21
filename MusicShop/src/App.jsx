import Header from './components/Header.jsx'
import Instrument from './components/Instrument.jsx'

function App() {

  return (
    <>
        {/* Cabecera */}
        <Header/>


        <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            <Instrument/>
            <Instrument/>
            <Instrument/>
            <Instrument/>
            <Instrument/>
            <Instrument/>
            <Instrument/>
            <Instrument/>
            <Instrument/>
            <Instrument/>
            <Instrument/>
            <Instrument/>
            <Instrument/>
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>    </>
  )
}

export default App
