import { z } from "zod"
import { CryptoCurrenciesPairSchema, CryptoCurrencySchema, CurrencySchema } from '../schemas/crypto-schema'

export type Currency = z.infer<typeof CurrencySchema>

export type CryptoCurrency = z.infer<typeof CryptoCurrencySchema>

export type CryptoCurrenciesPair = z.infer<typeof CryptoCurrenciesPairSchema>