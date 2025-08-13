import mongoose, {Schema, Document, Types} from 'mongoose'

//Creamos nuestro propio type para task
const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const

export type TaskStatusType = typeof taskStatus[keyof typeof taskStatus]
export const taskStatusValues = Object.values(taskStatus); 

// Tipo para TypeScript
export type TTask = Document & {
    name: string
    description: string,
    project: Types.ObjectId,
    status: TaskStatusType
} // también se podria declarar como un interface

// Esquema para MongoDB
const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    project: { // referencia a proyecto
        type: Types.ObjectId,
        ref: 'Project',
        required: true
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING,
        required: true
    } 
}, {timestamps: true})

// Registramos el esquema en la instancia de mongo
const Task = mongoose.model<TTask>('Task', TaskSchema)
export default Task