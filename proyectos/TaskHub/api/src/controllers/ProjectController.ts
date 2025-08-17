import type {Request, Response} from 'express'
import Project from '../models/Project'

// En una clase para agrupar los métodos en vez de funciones sueltas (también podría ser)
// de esta forma, solo tenemos que exportar la clase 
export class ProjectController {

    // Realizamos métodos estáticos porque no requieren ser instanciados

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            if (!req.user || !req.user.id) {
                return res.status(401).send({error: "Usuario no autenticado"});
            }

            const projects = await Project.find(
                {$or: [
                    {admin: req.user.id},
                    {team: {$in: [req.user.id]}}
                ]})

            res.send(projects)
        } catch (error) {
            console.log(error)
            res.status(500).send({error: "Error interno."})
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        try {
            const project = req.project
            
            if(!project){
                const error = new Error("Prouecto no encontrado")
                return res.status(404).send({error: error.message})
            }
            
            if(project.admin.toString() !== req.user.id && !project.team.includes(req.user.id)){
                const error = new Error("Usuario no autorizado")
                return res.status(401).send({error: error.message})
            }
            
            res.send(project)
        } catch (error) {
            console.log(error)
            res.status(500).send({error: "Error interno."})
        }
    }

    static createProject = async (req: Request, res: Response) => {
        const newProject = new Project(req.body)
        newProject.admin = req.user.id

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

            if(!project){
                const error = new Error("Prouecto no encontrado")
                return res.status(404).send({error: error.message})
            }
            
            if(project.admin.toString() !== req.user.id){
                const error = new Error("Usuario no autorizado")
                return res.status(401).send({error: error.message})
            }

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
        try {
            
            const project = req.project

            if(!project){
                const error = new Error("Prouecto no encontrado")
                return res.status(404).send({error: error.message})
            }
            
            if(project.admin.toString() !== req.user.id){
                const error = new Error("Usuario no autorizado")
                return res.status(401).send({error: error.message})
            }
            
            await project.deleteOne()


            res.send({deleted: true, project})

        } catch (error) {
            console.log(error)
            res.status(500).send({deleted: false, error: "Error interno."})
        }
    }
}

