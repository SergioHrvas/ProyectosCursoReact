import { isAxiosError } from "axios";
import type { UserRegistrationForm } from "../types";
import api from '@/lib/axios'

export async function registerAccount(formData: UserRegistrationForm){
    try {
        const url = '/auth/create-account'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}