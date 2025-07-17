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

    static getTaskByID = async (req: Request, res : Response) => {
        try {
            const task = req.task

            res.send(task)
        } catch (error) {
            console.log(error)
            return res.status(500).send({error: "Error interno"})
        }  
    }


    static updateTask = async (req: Request, res : Response) => {
        try {
            const task = req.task
        
            task.description = req.body.description
            task.name = req.body.name

            const updatedTask = await task.save()

            res.send({task: updatedTask})
        } catch (error) {
            console.log(error)
            return res.status(500).send({error: "Error interno"})
        }  
    }


    static deleteTask = async (req: Request, res : Response) => {
        const {taskId} = req.params
        try {
            const task = req.task

            req.project.tasks = req.project.tasks.filter ( task => task.toString() !== taskId)
            await Promise.allSettled([task.deleteOne(), req.project.save()])
            
            res.send({deleted: true})
        } catch (error) {
            console.log(error)
            return res.status(500).send({error: "Error interno"})
        }  
    }

    static changeStatus = async (req: Request, res: Response) => {
        const {status} = req.body
        try {
            const task = req.task

            task.status = status

            const taskUpdated = await task.save()
            
            res.send({task: taskUpdated})
        } catch (error) {
            console.log(error)
            return res.status(500).send({error: "Error interno"})
        }  
    }
}