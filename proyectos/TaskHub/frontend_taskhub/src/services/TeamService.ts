import { isAxiosError } from "axios";
import api from "@/lib/axios"
import { UserSchema, type ProjectType, type TeamMemberForm, type UserId } from "@/types/index";
import z from "zod";

export async function findUser({data, projectId}: {data: TeamMemberForm, projectId: ProjectType['_id'] }) {
    try {
        const url = `/projects/${projectId}/team/find`
        const response = await api.post(url, data);
        const result = z.safeParse(UserSchema, response.data.user); 
        return result.data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export async function addMemberToTeam({id, projectId}: {id: UserId, projectId: ProjectType['_id']}){
    try {
        const url = `/projects/${projectId}/team/`
        console.log(id)
        const response = await api.post(url, {id});
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error)
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}