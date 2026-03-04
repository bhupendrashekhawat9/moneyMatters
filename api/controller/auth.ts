import { getApiResponse } from "@/utils/functions"
import { post } from "../client"
import { AUTH_APIS } from "../constants"
import { LoginResponse } from "../types"

export const authControllers = {
    login: async (arg: { email: string, password: string }): Promise<LoginResponse> => {
        
        return ( post(AUTH_APIS.LOGIN, arg)) as unknown as Promise<LoginResponse>
    },
    register: async(arg: {email: string, password: string, name: string}) => {
        return post(AUTH_APIS.REGISTER, arg)
    },
    
}