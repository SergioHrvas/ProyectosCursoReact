import type {Request, Response} from 'express'
import Project from '../models/Project'

// En una clase para agrupar los métodos en vez de funciones sueltas (también podría ser)
// de esta forma, solo tenemos que exportar la clase 
export class ProjectController {

    // Realizamos métodos estáticos porque no requieren ser instanciados

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find()
            res.send(projects)
        } catch (error) {
            console.log(error)
            res.status(500).send({error: "Error interno."})
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        const {id} = req.params
        try {
            const project = await Project.findById(id)
            
            if(!project){
                const error = new Error ("Proyecto no encontrado")
                return res.status(404).send({error: error.message})
            }
            res.send(project)
        } catch (error) {
            console.log(error)
            res.status(500).send({error: "Error interno."})
        }
    }

    static createProject = async (req: Request, res: Response) => {
        const newProject = new Project(req.body)
        try {
            const projectSaved = await newProject.save()
            res.send(projectSaved)
        } catch (error) {
            console.log(error)
            res.status(500).send({error: "Error interno."})
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const {id} = req.params

        try {
            const project = await Project.findByIdAndUpdate(id, req.body, {new: true})

            if (!project){
                const error = new Error ("Proyecto no encontrado")
                return res.status(404).send({error: error.message}) 
            }


            res.send(project)

        } catch (error) {
            console.log(error)
            res.status(500).send({error: "Error interno."})
        }
    }


    static deleteProject = async (req: Request, res: Response) => {
        const {id} = req.params

        try {
            const project = await Project.findById(id)
            
            if (!project){
                const error = new Error ("Proyecto no encontrado")
                return res.status(404).send({deleted: false, error: error.message}) 
            }

            await project.deleteOne()


            res.send({deleted: true, project})

        } catch (error) {
            console.log(error)
            res.status(500).send({deleted: false, error: "Error interno."})
        }
    }
}

