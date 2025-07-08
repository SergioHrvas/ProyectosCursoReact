import { useState, type ChangeEvent, type FormEvent } from "react"

import { currencies } from "../data/db"
import { useCryptoStore } from "../store"
import type { CryptoCurrenciesPair } from "../types"
import { Alert } from "./Alert"


export const CryptoForm = () => {

    const {cryptoCurrencies, fetchExchange} = useCryptoStore()

    const [currenciesPair, setCurrenciesPair] = useState<CryptoCurrenciesPair>({
        currency: '',
        cryptocurrency: ''
    })

    const [error, setError] = useState("")

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {

        console.log(e.target.value)
        setCurrenciesPair(
                {
                    ...currenciesPair,
                    [e.target.name]: e.target.value
                }
        )
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (Object.values(currenciesPair).includes('')){
            setError("Todos los campos son obligatorios.")
            return
        }

        setError("")
        fetchExchange(currenciesPair)
    }

    return (
        <form className="form" onSubmit={handleSubmit}>

            {error && <Alert>{error}</Alert>}
 
            <div className="field">
                <label htmlFor="currency">Divisa:</label>
                <select
                    name="currency"
                    id="currency"
                    value={currenciesPair.currency}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione una divisa --</option>
                    {currencies.map(currency => (
                        <option
                            key={currency.code}
                            value={currency.code}>
                                {currency.name}
                        </option>

                    ))}
                </select>
            </div>
            <div className="field">
                <label htmlFor="cryptocurrency">Criptomoneda:</label>
                <select
                    name="cryptocurrency"
                    id="cryptocurrency"
                    value={currenciesPair.cryptocurrency}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione una criptomoneda --</option>
                    {cryptoCurrencies.map(currency => (
                        <option
                            key={currency.SYMBOL}
                            value={currency.SYMBOL}>
                                {currency.NAME}
                        </option>

                    ))}
                </select>
            </div>

            <input type="submit" value="Convertir"/>
        </form>
    )
}
