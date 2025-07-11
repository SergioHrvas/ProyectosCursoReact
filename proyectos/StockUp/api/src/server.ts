import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'


// Conexion a db
async function connectionDB(){
    try {
        await db.authenticate() // Nos autenticamos en la db
        db.sync() //Sincronizamos la db en caso de agregar nuevas tablas, filsa...
        //console.log(colors.green.bold("Se ha realizado la conexión con la BD de forma exitosa.")) 
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold ("Hubo un error en la conexión con la BD."))
    }
}

connectionDB()

//Instancia de express
const server = express()

//Leemos los datos del body
server.use(express.json())

// Agregamos el Router
server.use('/api/products', router)


server.get('/api', (req, res) => {
    res.json({msg:"Hola mundo"})
})
export default server