import axios from "axios"

import { CryptoCurrenciesSchema } from "../schemas/crypto-schema"

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