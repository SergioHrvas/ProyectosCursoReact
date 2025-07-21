import { isAxiosError } from "axios";
import type { ProjectType, TaskFormType } from "@/types/index";
import api from "@/lib/axios";

export async function createTask({formData, projectId} : {formData: TaskFormType, projectId: ProjectType['_id']}){
    try {
        const {data} = await api.post(`/projects/${projectId}/tasks`, formData)
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}