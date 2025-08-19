import { isAxiosError } from "axios";
import type { Note, NoteFormData, ProjectType, TaskType } from "../types";
import api from "@/lib/axios";

type NoteServiceType = {
    formData: NoteFormData,
    taskId: TaskType['_id'],
    projectId: ProjectType['_id'],
    noteId: Note['_id']
}

export async function createNote({formData, taskId, projectId}: Pick<NoteServiceType, 'formData' | 'projectId' | 'taskId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes`
        const response = await api.post<string>(url, formData)
        return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}


export async function deleteNote({noteId, taskId, projectId}: Pick<NoteServiceType, 'noteId' | 'projectId' | 'taskId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
        const response = await api.delete<string>(url)
        return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
