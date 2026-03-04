import { get, post, put } from "../client"
import { PROFILE_APIS } from "../constants"
import { ProfileResponse } from "../types"
import { PaginatedResponse } from "../types/PaginatedResponse.type"

export const getProfile: () => Promise<PaginatedResponse<ProfileResponse>> = async () => {
    return get(PROFILE_APIS.GET_ALL) as unknown as Promise<PaginatedResponse<ProfileResponse>>
}
export const getProfileById: (id: string) => Promise<ProfileResponse> = async (id) => {
    return get(PROFILE_APIS.GET_BY_ID(id)) as unknown as Promise<ProfileResponse>
}
export const createProfile: (payload: any) => Promise<ProfileResponse> = async (payload) => {
    return post(PROFILE_APIS.CREATE, {
        method: 'POST',
        body: payload,
    }) as unknown as Promise<ProfileResponse>
}   
export const updateProfile: (id: string, payload: any) => Promise<ProfileResponse> = async (id, payload) => {
    return put(PROFILE_APIS.UPDATE(id), payload) as unknown as Promise<ProfileResponse>
}
