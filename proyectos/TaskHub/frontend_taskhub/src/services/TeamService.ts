import { isAxiosError } from "axios";
import api from "@/lib/axios"
import { UserSchema, UsersSchema, type ProjectType, type TeamMemberForm, type UserId } from "@/types/index";
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
        const response = await api.post(url, {id});
        return response.data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function getMembersTeam(projectId: ProjectType['_id']){
    try {
        const url = `/projects/${projectId}/team/`
        const response = await api.get(url);
        const result = z.safeParse(UsersSchema, response.data.team)

        if(result.success){
            return result.data;
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteMemberFromTeam({id, projectId}: {id: UserId, projectId: ProjectType['_id']}) {
    try {
        const url = `/projects/${projectId}/team/deleteMember`
        const response = await api.post(url, {id});
        return response.data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
