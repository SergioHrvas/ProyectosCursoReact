import {Request, Response} from 'express'
import User from '../models/User'
import Token from '../models/Token'
import { checkPassword, hashPassword, isUniqueUser } from '../utils/auth'
import { generateToken } from '../utils/token'
import { AuthEmail } from '../emails/AuthEmail'

export class AuthController {
    

    static createAccount = async (req : Request, res: Response) => {
        try {
            const user = new User(req.body)

            const isUnique = await isUniqueUser(user, res);
            
            if(!isUnique){
                return res.status(409).send({error: "Ya existe un usuario con ese correo/username"})
            }

            user.password = await hashPassword(req.body.password)

            const token = new Token()
            token.token = generateToken()
            token.user = user.id

            await AuthEmail.sendConfirmEmail({email: user.email, token: token.token, name: user.name})

            await Promise.allSettled([user.save(), token.save()])

            res.send('Cuenta creada. Te hemos enviado un correo electrónico para confirmar la cuenta.')
        } catch (error) {
            res.status(500).send({error: "Error interno."})
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body
            
            const tokenExists = await Token.findOne({token})

            if(!tokenExists){
                const error = new Error('Token no válido')
                return res.status(404).send(error.message)
            }
            else {
                const user = await User.findById(tokenExists.user)
                user.confirmed = true

                Promise.allSettled([tokenExists.deleteOne(), user.save()])

                return res.status(200).send("Cuenta confirmada correctamente")
            }

        } catch (error) {
            res.status(500).send({error: "Error interno."})
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const { user, password } = req.body
            
            const userExists = await User.findOne({$or: [ {email: user}, {username: user}]})

            console.log(userExists)
            if(!userExists){
                const error = new Error('El usuario no existe')
                return res.status(404).send(error.message)
            }
            if ( ! userExists.confirmed ){
                const token = new Token()
                token.token = generateToken()
                
                token.user = userExists.id

                await token.save()
                await AuthEmail.sendConfirmEmail({email: userExists.email, token: token.token, name: userExists.name})


                const error = new Error('El usuario no está confirmado. Hemos enviado un correo electrónico. Comprueba su bandeja de entrada')
                return res.status(401).send(error.message)
            }
            
            // Revisamos la contraseña
            const isPasswordCorrect = await checkPassword(password, userExists.password)
            console.log(isPasswordCorrect)
            if(!isPasswordCorrect){
                const error = new Error('Error en la autenticación. Revisa que el usuario y la contraseña sean válidos')
                return res.status(403).send(error.message)
            }
            
            return res.status(200).send("Inicio de sesión realizado correctamente")
            

        } catch (error) {
            res.status(500).send({error: "Error interno."})
        }
    }
}