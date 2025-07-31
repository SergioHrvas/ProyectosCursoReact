import { bold } from 'colors'
import mongoose, {Schema, Document, PopulatedDoc, Types, mongo} from 'mongoose'

export type TUser = Document & {
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    confirmed: true
}

const UserSchema : Schema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model<TUser>('User', UserSchema)
export default User