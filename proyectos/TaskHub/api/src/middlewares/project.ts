import type { Request, Response, NextFunction} from 'express'
import Project, { ProjectType } from '../models/Project'
import { Types } from 'mongoose'

declare global {
    namespace Express {
        interface Request { // asi añadimos el campo project a Request de Express (al ser una interfaz repetida en Express, añade los campos nuevos)
            project: ProjectType
        }
    }
}

export async function validateProjectExists (req: Request, res: Response, next: NextFunction) {
    const {projectId} = req.params
    
    try {
        if(!Types.ObjectId.isValid(projectId)){
            return res.status(400).send({error: "Id no válido"})
        }
        
        const project = await Project.findById(projectId)
        if(!project){
            const error = new Error("Proyecto no encontrado")
            return res.status(404).send({error: error.message})
        }

        req.project = project
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send({error: "Error interno"})
    }
}