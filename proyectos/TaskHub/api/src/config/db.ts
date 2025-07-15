import mongoose from 'mongoose'
import colors from 'colors'
import { exit } from 'node:process'

export const connectionDB = async() => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}:${connection.port}`

        console.log(colors.bgGreen.bold.white(` == MongoDB Conectado en ${url} == `))
    } catch (error) {
        console.log(colors.bgRed.bold.white(` XX Error al conectar con MongoDB - ${error.message} XX`))
        exit(1)
    }
}