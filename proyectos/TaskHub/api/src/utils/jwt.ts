import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

type UserPayload = {
    id: ObjectId 
}

export const createJWT = (payload: UserPayload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '180d'
    })

    return token
}

export const decodeJWT = (token: string) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    return decoded
}