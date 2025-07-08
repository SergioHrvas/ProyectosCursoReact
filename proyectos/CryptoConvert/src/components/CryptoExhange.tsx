import { useMemo } from "react"
import { useCryptoStore } from "../store"
import { Spinner } from "./Spinner/Spinner"

export const CryptoExhange = () => {
    
    const { cryptoExchange, loading } = useCryptoStore()

    const thereIsExchange = useMemo(() => !Object.values(cryptoExchange).includes(''), [cryptoExchange])
    return (

        <div className="resultContainer">
            { loading ? <Spinner/> :
            thereIsExchange && (
                <>
                    <h2>Cotización</h2>
                    <div className="result">
                        <img src={`https://www.cryptocompare.com${cryptoExchange.IMAGEURL}`}></img>
                        <div>
                            <p>El precio es de <span>{cryptoExchange.PRICE}</span></p>
                            <p>Mayor precio del día: <span>{cryptoExchange.HIGHDAY}</span></p>
                            <p>Menor precio del día: <span>{cryptoExchange.LOWDAY}</span></p>
                            <p>Variación últimas 24h: <span>{cryptoExchange.CHANGEPCT24HOUR}</span></p>
                            <p>Última actualización: <span>{cryptoExchange.LASTUPDATE}</span></p>

                        </div>
                    </div>
                </>
            ) }
        </div>
    )
}
