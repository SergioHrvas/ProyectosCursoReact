import { z } from "zod"

export const CurrencySchema = z.object({
    code: z.string(),
    name: z.string()
})



export const CryptoCurrencySchema = z.object({
    SYMBOL: z.string(),
    NAME: z.string()
})

export const CryptoCurrenciesSchema = z.array(CryptoCurrencySchema)


export const CryptoCurrenciesPairSchema = z.object(
    {
        currency: z.string(),
        cryptocurrency: z.string()
    }
)

export const CryptoEchangeSchema = z.object({
    IMAGEURL: z.string(),
    PRICE: z.string(),
    HIGHDAY: z.string(),
    LOWDAY: z.string(),
    CHANGEPCT24HOUR: z.string(),
    LASTUPDATE: z.string()
})