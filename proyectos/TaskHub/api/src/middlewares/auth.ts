import { NextFunction, Request, Response } from "express";
import { decodeJWT } from "../utils/jwt";
import User, { TUser } from "../models/User";

declare global {
    namespace Express {
        interface Request {
            user?: TUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
        
    if(!bearer){
        const error = new Error("Usuario no autorizado")
        return res.status(401).send({error: error.message})
    }

    const token = bearer.split(' ')[1]

    try {
        const decoded = decodeJWT(token)

        if(typeof decoded === 'object' && decoded.id){
            const user = await User.findById(decoded.id).select('_id name username surname email')
            
            if(!user) {
                const error = new Error("Token no válido")
                return res.status(500).send({error: error.message})   
            }

            req.user = user
        }

    } catch (error) {
        return res.status(500).send({error: "Token no válido"})
    }

    next()
}