import { useEffect } from "react"
import { CryptoForm } from "./components/CryptoForm"
import "./index.css"
import { useCryptoStore } from "./store"
import { CryptoExhange } from "./components/CryptoExhange"

function App() {

  const {fetchCryptos} = useCryptoStore()

  useEffect(() => { fetchCryptos() }, [])

  
  return (
    <>
      <div className="container">
        <h1 className="app-title">
          <span className="title">CryptoConvert</span> Conversor de criptomonedas en tiempo real
        </h1>

        <div className="content">
          <CryptoForm/>
          <CryptoExhange/>
        </div>
      </div>
      
    </>
  )
}

export default App
