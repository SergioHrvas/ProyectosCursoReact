import type { ProjectFormType } from "@/types/index";
import api from "@/lib/axios";

export async function createProject (formData : ProjectFormType) {
    try {
        const {data} = await api.post('/projects', formData)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
} 