import { isAxiosError } from "axios";
import type { RequestConfirmationCodeForm, TokenConfirmation, UserLoginForm, UserRegistrationForm } from "../types";
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

export async function confirmAccount(token: TokenConfirmation){
    try {
        const url = '/auth/confirm-account'
        const { data } = await api.post<string>(url, token)
        return data
    } catch (error){
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm){
    try {
        const url = '/auth/request-code'
        const {data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function loginAccount(formData: UserLoginForm){
    try {
        const url = '/auth/login'
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}