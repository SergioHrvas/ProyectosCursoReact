import mongoose, {Schema, Document, PopulatedDoc, Types, mongo} from 'mongoose'

export type Token = Document & {
    token: string,
    user: Types.ObjectId,
    createdAt: Date
}

const tokenSchema: Schema = new Schema ({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: '10min'
    }
})

const token = mongoose.model<Token>('Token', tokenSchema)
export default token