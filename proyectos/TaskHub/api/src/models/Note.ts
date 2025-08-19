import mongoose, {Schema, Document, PopulatedDoc, Types} from 'mongoose'
import { TTask } from './Task'
import { TUser } from './User'

// Tipo para TypeScript
export type TNote = Document & {
    text: string
    author: Types.ObjectId
    task: Types.ObjectId,
}

// Esquema para MongoDB
const NoteSchema: Schema = new Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    task: {
        type: Types.ObjectId,
        ref: 'Task',
        required: true
    }
}, {timestamps: true})

// Registramos el esquema en la instancia de mongo
const Note = mongoose.model<TNote>('Note', NoteSchema) 
export default Note