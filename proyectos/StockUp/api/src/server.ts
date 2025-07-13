import express from 'express'
import router from './router'
import swaggerSpec, {swaggerUIOptions} from './config/swagger'
import swaggerUI from 'swagger-ui-express'
import db from './config/db'
import colors from 'colors'


// Conexion a db
export async function connectionDB(){
    try {
        await db.authenticate() // Nos autenticamos en la db
        await db.sync() //Sincronizamos la db en caso de agregar nuevas tablas, filsa...
        //console.log(colors.green.bold("Se ha realizado la conexión con la BD de forma exitosa.")) 
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold("Hubo un error en la conexión con la BD"))
    }
}

connectionDB()

//Instancia de express
const server = express()

//Leemos los datos del body
server.use(express.json())

// Agregamos el Router
server.use('/api/products', router)

// Añadimos recursos estáticos en public
server.use(express.static('public'))

/*server.get('/api', (req, res) => {
    res.json({msg:"Hola mundo"})
})*/



//Documentacion SWAGGER
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))

export default server