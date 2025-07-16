import { Request, Response } from 'express'
import Task from "../models/Task"

export class TaskController { 
    static createTask = async (req: Request, res: Response) => {
        const {projectId} = req.params
        const project = req.project
        try {
            const task = new Task({...req.body, project: projectId})
            project.tasks.push(task.id)

            // Guardamos

            await Promise.allSettled([
                task.save(),
                project.save()
            ])
            res.send({task})
        } catch (error) {
            console.log(error)
            return res.status(500).send({error: "Error interno"})
        }
    }


    static getProjectTasks = async (req: Request, res: Response) => {
        const {projectId} = req.params
        try {
            const tasks = await Task.find({project: projectId}).populate('project')
            
            res.send(tasks)
        } catch (error) {
            console.log(error)
            return res.status(500).send({error: "Error interno"})
        }
    }
}