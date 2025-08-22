import mongoose, {Schema, Document, Types} from 'mongoose'
import Note from './Note';

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
    status: TaskStatusType,
    completedBy: [{
        user: Types.ObjectId,
        status: String,
        date: Date
    }],
    notes: Types.ObjectId[]
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
    },
    completedBy:  [
        {
            user: {
                type: Types.ObjectId,
                ref: 'User',
                default: null
            },
            status: {
                type: String,
                enum: Object.values(taskStatus),
                default: taskStatus.PENDING,
            },
            date: {
                type: Date,
            }
        }
    ],
    notes: [
        {
            type: Types.ObjectId,
            ref: 'Note'
        }
    ]
}, {timestamps: true})

// Middleware
TaskSchema.pre('deleteOne', { document: true, query: false}, async function () {
    
    const taskId = this._id
    if(!taskId) return
    
    console.log("aaaaaaaaaaaaaa")
    await Note.deleteMany({task: taskId})
})


// Registramos el esquema en la instancia de mongo
const Task = mongoose.model<TTask>('Task', TaskSchema)
export default Task