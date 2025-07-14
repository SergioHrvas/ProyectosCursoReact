import express from 'express'
import router from './router'
import swaggerSpec, {swaggerUIOptions} from './config/swagger'
import swaggerUI from 'swagger-ui-express'
import db from './config/db'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
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


// Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        // Origin: Quién envia la peticion
        // Callback: permitir o negar la conexion

        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }
        else{
            callback(new Error("Error de CORS"))
        }
    }
}


server.use(cors(corsOptions))

//Leemos los datos del body
server.use(express.json())


server.use(morgan('dev'))
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