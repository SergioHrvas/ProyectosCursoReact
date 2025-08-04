import {Request, Response} from 'express'
import User from '../models/User'
import Token from '../models/Token'
import { hashPassword, isUniqueUser } from '../utils/auth'
import { generateToken } from '../utils/token'
import { transport } from '../config/nodemailer'
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
                return res.status(401).send(error.message)
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
}