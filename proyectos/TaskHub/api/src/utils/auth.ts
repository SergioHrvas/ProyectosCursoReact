import { genSalt, hash } from 'bcrypt'
import User, { TUser } from '../models/User'
import {Response} from 'express'

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string) : Promise<string> => {
    //Encriptamos la contraeña
    const salt = await genSalt(SALT_ROUNDS)
    const hashed_password = await hash(password, salt)
    return hashed_password
}

export const isUniqueUser = async (user: TUser, res: Response) : Promise<boolean> => {
    const users = await User.find({$or: [{"email": user.email}, {"username": user.username}]})
    if(users && users.length > 0){
        return false
    }
    return true
}