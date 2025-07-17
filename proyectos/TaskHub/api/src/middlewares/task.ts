import type { Request, Response, NextFunction} from 'express'
import Task, { TaskType } from '../models/Task'
import { Types } from 'mongoose'

declare global {
    namespace Express {
        interface Request { // asi añadimos el campo task a Request de Express (al ser una interfaz repetida en Express, añade los campos nuevos)
            task: TaskType
        }
    }
}

export async function validateTaskExists (req: Request, res: Response, next: NextFunction) {
    const {taskId} = req.params

    try {
        if(!Types.ObjectId.isValid(taskId)){
            return res.status(400).send({error: "Id no válido"})
        }

        const task = await Task.findById(taskId)
        
        if(!task){
            const error = new Error("Tarea no encontrada")
            return res.status(404).send({error: error.message})
        }

        req.task = task
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({error: "Error interno"})
    }
    
}


export async function taskBelongsToProject ( req: Request, res: Response, next: NextFunction) {
    const task = req.task
    if(task.project.toString() !== req.project.id.toString()){
        const error = new Error ("Solicitud no válida")
        return res.status(400).send({deleted: false, error: error.message})
    }
    next()

}