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
            const project = req.project
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
        try {
            const project = req.project

            project.name = req.body.name
            project.client = req.body.client
            project.description = req.body.description

            const updatedProject = await project.save()


            res.send(updatedProject)

        } catch (error) {
            console.log(error)
            res.status(500).send({error: "Error interno."})
        }
    }


    static deleteProject = async (req: Request, res: Response) => {
        const {id} = req.params

        try {
            const project = req.project

            await project.deleteOne()


            res.send({deleted: true, project})

        } catch (error) {
            console.log(error)
            res.status(500).send({deleted: false, error: "Error interno."})
        }
    }
}

