import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './config/db'
import projectRoutes from './routes/projectRoutes'

// Expongo las variables de entorno
dotenv.config()

connectionDB()

const app = express()

app.use('/api/projects', projectRoutes)

export default app