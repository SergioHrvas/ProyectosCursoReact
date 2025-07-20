import { ProjectsSchema, type ProjectFormType } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createProject (formData : ProjectFormType) {
    try {
        const {data} = await api.post('/projects', formData)
        console.log(data)
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