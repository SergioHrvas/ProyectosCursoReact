import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './config/db'

// Expongo las variables de entorno
dotenv.config()

connectionDB()

const app = express()

export default app