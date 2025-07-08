import { create } from "zustand"

import type { CryptoCurrency } from "./types"
import { getCryptoCurrencies } from "./services/CryptoService"

type CryptoStore = {
    cryptoCurrencies: CryptoCurrency[],
    fetchCryptos: () => Promise<void>,

}


export const useCryptoStore = create<CryptoStore>((set) => ({
    // Estado
    cryptoCurrencies: [],

    // Acciones
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptoCurrencies()
        console.log(cryptocurrencies)
        set(() => ({
            cryptoCurrencies: cryptocurrencies
        }))
    },
}))