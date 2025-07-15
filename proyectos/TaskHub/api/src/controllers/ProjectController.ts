import type {Request, Response} from 'express'
import Project from '../models/Project'

// En una clase para agrupar los métodos en vez de funciones sueltas (también podría ser)
// de esta forma, solo tenemos que exportar la clase 
export class ProjectController {

    // Realizamos métodos estáticos porque no requieren ser instanciados

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find()
            return res.send(projects)
        } catch (error) {
            console.log(error)
        }
    }
}
