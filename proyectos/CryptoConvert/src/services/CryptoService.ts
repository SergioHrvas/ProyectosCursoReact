import axios from "axios"

import { CryptoCurrenciesSchema, CryptoEchangeSchema } from "../schemas/crypto-schema"
import type { CryptoCurrenciesPair } from "../types"

export async function getCryptoCurrencies () {

    const url = "https://data-api.coindesk.com/asset/v1/top/list?page=1&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD&page_size=20"

    const {data: { Data: { LIST: list } } } = await axios(url)
    
    const result = CryptoCurrenciesSchema.safeParse(list)

    if(result.success){
        return result.data
    }
    else{
        return []
    }
}


export async function getCryptoExchange(cryptoCurrenciesParams: CryptoCurrenciesPair){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrenciesParams.cryptocurrency}&tsyms=${cryptoCurrenciesParams.currency}`
    const {data : { DISPLAY : { [cryptoCurrenciesParams.cryptocurrency ] : { [cryptoCurrenciesParams.currency] : datos}}}} = await axios(url)

    const result = CryptoEchangeSchema.safeParse(datos)

    console.log(result)
    if(result.success){
        return result.data
    }
    
}