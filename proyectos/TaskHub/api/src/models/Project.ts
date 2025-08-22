import mongoose, {Schema, Document, PopulatedDoc, Types} from 'mongoose'
import Task, { TTask } from './Task'
import { TUser } from './User'
// Tipo para TypeScript
export type TProject = Document & {
    name: string
    client: string
    description: string,
    admin: PopulatedDoc<TUser & Document>,
    tasks: PopulatedDoc<TTask & Document>[],
    team: PopulatedDoc<TUser & Document>[]
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
    admin: {
        type: Types.ObjectId,
        ref: 'User'
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    team: [
        {
            type: Types.ObjectId,
            ref: 'User'
        }
    ]
    

}, {timestamps: true})

// Middleware
ProjectSchema.pre('deleteOne', { document: true, query: false}, async function () {
    
    const projectId = this._id
    if(!projectId) return
    
    const tasks = await Task.find({project: projectId})

    await Promise.all(tasks.map(task => task.deleteOne()))
})
// Registramos el esquema en la instancia de mongo
const Project = mongoose.model<TProject>('Project', ProjectSchema) // Le ponemos el generic ProjectType para el autocompletado
export default Project