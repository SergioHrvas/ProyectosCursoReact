import {Request, Response} from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
import type { TUser } from '../models/User'
import { hashPassword, isUniqueUser } from '../utils/auth'

export class AuthController {
    

    static createAccount = async (req : Request, res: Response) => {
        try {
            const user = new User(req.body)

            const isUnique = await isUniqueUser(user, res);
            
            if(!isUnique){
                return res.status(409).send({error: "Ya existe un usuario con ese correo/username"})
            }

            user.password = await hashPassword(req.body.password)

            await user.save()

            res.send('Cuenta creada. Te hemos enviado un correo electrónico para confirmar la cuenta.')
        } catch (error) {
            res.status(500).send({error: "Error interno."})
        }
    }
}