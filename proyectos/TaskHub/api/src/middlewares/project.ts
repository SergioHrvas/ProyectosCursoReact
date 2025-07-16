import type { Request, Response, NextFunction} from 'express'
import Project, { ProjectType } from '../models/Project'

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