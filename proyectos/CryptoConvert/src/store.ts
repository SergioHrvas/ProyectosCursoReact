import { create } from "zustand"

import type { CryptoCurrenciesPair, CryptoCurrency, CryptoExhange } from "./types"
import { getCryptoCurrencies, getCryptoExchange } from "./services/CryptoService"

type CryptoStore = {
    cryptoCurrencies: CryptoCurrency[],
    cryptoExchange: CryptoExhange,
    loading: boolean,
    fetchCryptos: () => Promise<void>,
    fetchExchange: (cryptoCurrenciesParams: CryptoCurrenciesPair) => Promise<void>,
}


export const useCryptoStore = create<CryptoStore>((set) => ({
    // Estado
    cryptoCurrencies: [],

    cryptoExchange: {
        IMAGEURL: "",
        PRICE: "",
        HIGHDAY: "",
        LOWDAY: "",
        CHANGEPCT24HOUR: "",
        LASTUPDATE: ""
    },

    loading: false,

    // Acciones
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptoCurrencies()
        set(() => ({
            cryptoCurrencies: cryptocurrencies
        }))
    },

    fetchExchange: async(cryptoCurrenciesParams: CryptoCurrenciesPair) => {
        set(() => ({
            loading: true
        }))
        const result = await getCryptoExchange(cryptoCurrenciesParams)
        set(() => ({
            cryptoExchange: result,
            loading: false
        }))

    }
}))