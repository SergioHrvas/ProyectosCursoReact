import mongoose, {Schema, Document} from 'mongoose'

// Tipo para TypeScript
export type ProjectType = Document & {
    name: string
    client: string
    description: string
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
    }
})

// Registramos el esquema en la instancia de mongo
const Project = mongoose.model<ProjectType>('Projects', ProjectSchema) // Le ponemos el generic ProjectType para el autocompletado
export default Project