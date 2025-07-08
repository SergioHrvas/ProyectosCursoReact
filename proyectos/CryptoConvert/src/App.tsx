import { useEffect } from "react"
import { CryptoForm } from "./components/CryptoForm"
import "./index.css"
import { useCryptoStore } from "./store"

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
        </div>
      </div>
      
    </>
  )
}

export default App
