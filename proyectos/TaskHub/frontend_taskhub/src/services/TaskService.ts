import { isAxiosError } from "axios";
import { TaskDeletedSchema, TaskSchema, type ProjectType, type TaskFormType, type TaskType } from "@/types/index";
import api from "@/lib/axios";
import z from "zod";

export async function createTask({formData, projectId} : {formData: TaskFormType, projectId: ProjectType['_id']}){
    try {
        await api.post(`/projects/${projectId}/tasks`, formData)
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTask({projectId, taskId} : {projectId: ProjectType['_id'], taskId: TaskType['_id']}){
    try {
        const {data} = await api.get(`/projects/${projectId}/tasks/${taskId}`)
        const result = z.safeParse(TaskSchema, data)
        if(result.success){
            return result.data
        } else{
            throw new Error(result.error.message)
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateTask({formData, projectId, taskId} : {formData: TaskFormType, projectId: ProjectType['_id'], taskId: TaskType['_id']}){
    try {
        await api.put(`/projects/${projectId}/tasks/${taskId}`, formData)
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function deleteTask({projectId, taskId} : {projectId: ProjectType['_id'], taskId: TaskType['_id']}){
    try {
        const {data} = await api.delete(`/projects/${projectId}/tasks/${taskId}`)
        const result = z.safeParse(TaskDeletedSchema, data)

        if(result.success){
            if(!result.data.deleted){
                throw new Error("No se ha podido eliminar la tarea")
            }
        }
        else {
            throw new Error(result.error.message)
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateStatus({projectId, taskId, status} : {projectId: ProjectType['_id'], taskId: TaskType['_id'], status: TaskType['status']}){
    try {
        const {data} = await api.patch(`/projects/${projectId}/tasks/${taskId}`, {status})
        z.safeParse(TaskSchema, data)
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
