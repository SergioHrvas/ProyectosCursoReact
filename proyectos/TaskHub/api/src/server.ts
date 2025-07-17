import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './config/db'
import projectRoutes from './routes/projectRoutes'
import cors from 'cors'
import { corsConfig } from './config/cors'

// Expongo las variables de entorno
dotenv.config()

connectionDB()

const app = express()

app.use(cors(corsConfig))

app.use(express.json())

app.use('/api/projects', projectRoutes)

export default app