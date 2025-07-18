import type { ProjectFormType } from "@/types/index";
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