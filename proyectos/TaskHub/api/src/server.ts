import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './config/db'
import projectRoutes from './routes/projectRoutes'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'

// Expongo las variables de entorno
dotenv.config()

connectionDB()

const app = express()

app.use(cors(corsConfig))

//Logging con morgan
app.use(morgan('dev'))

//Leer datos de formularios
app.use(express.json())

app.use('/api/projects', projectRoutes)

export default app