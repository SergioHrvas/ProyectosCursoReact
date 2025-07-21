import { ProjectDeletedSchema, ProjectSchema, ProjectsSchema, type ProjectFormType, type ProjectType } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createProject (formData : ProjectFormType) {
    try {
        const {data} = await api.post('/projects', formData)
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
} 

export async function getProjects () {
    try {
        const {data} = await api.get('/projects')

        const result = ProjectsSchema.safeParse(data)
        if(result.success){
            return result.data
        }
        else{
            throw new Error(result.error.message)
        }

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getProject (projectId: ProjectType['_id']){
    try {
        const {data} = await api.get(`/projects/${projectId}`)
        const result = ProjectSchema.safeParse(data)
        if(result.success){
            return result.data
        }
        else{
            throw new Error(result.error.message)
        }

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function updateProject ({formData, projectId} : {formData: ProjectFormType, projectId: ProjectType['_id']}){
    try {
        const {data} = await api.put(`/projects/${projectId}`, formData)

        const result = ProjectSchema.safeParse(data)

        if(result.success){
            return result.data
        }
        else{
            throw new Error(result.error.message)
        }

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function deleteProject (projectId: ProjectType['_id']){
    try {
        const {data} = await api.delete(`/projects/${projectId}`)
        console.log(data)
        const result = ProjectDeletedSchema.safeParse(data)

        if(result.success){
            return result.data
        }
        else{
            throw new Error(result.error.message)
        }

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
