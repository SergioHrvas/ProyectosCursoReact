import mongoose, {Schema, Document, PopulatedDoc, Types} from 'mongoose'
import { TaskType } from './Task'

// Tipo para TypeScript
export type ProjectType = Document & {
    name: string
    client: string
    description: string
    tasks: PopulatedDoc<TaskType & Document>[]
}

// Esquema para MongoDB
const ProjectSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Quita espacios
    },
    client: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ]
}, {timestamps: true})

// Registramos el esquema en la instancia de mongo
const Project = mongoose.model<ProjectType>('Project', ProjectSchema) // Le ponemos el generic ProjectType para el autocompletado
export default Project