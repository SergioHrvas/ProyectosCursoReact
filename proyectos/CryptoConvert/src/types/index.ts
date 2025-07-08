import { z } from "zod"
import { CryptoCurrenciesPairSchema, CryptoCurrencySchema, CryptoEchangeSchema, CurrencySchema } from '../schemas/crypto-schema'

export type Currency = z.infer<typeof CurrencySchema>

export type CryptoCurrency = z.infer<typeof CryptoCurrencySchema>

export type CryptoCurrenciesPair = z.infer<typeof CryptoCurrenciesPairSchema>

export type CryptoExhange = z.infer<typeof CryptoEchangeSchema>