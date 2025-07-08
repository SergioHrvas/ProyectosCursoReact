import { useState, type ChangeEvent } from "react"

import { currencies } from "../data/db"
import { useCryptoStore } from "../store"
import type { CryptoCurrenciesPair } from "../types"


export const CryptoForm = () => {

    const {cryptoCurrencies} = useCryptoStore()

    const [currenciesPair, setCurrenciesPair] = useState<CryptoCurrenciesPair>({
        currency: '',
        cryptocurrency: ''
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.name)
        if(e.target.name === "currency"){
            setCurrenciesPair(
                {
                    ...currenciesPair,
                    currency: e.target.value
                }
            )
        }
        else if(e.target.name === "cryptocurrency"){
            setCurrenciesPair(
                {
                    ...currenciesPair,
                    cryptocurrency: e.target.value
                }
            )
        }
    }

    return (
        <form className="form">
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
