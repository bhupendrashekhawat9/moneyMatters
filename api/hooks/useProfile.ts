import { useQuery } from "@tanstack/react-query"
import { getProfile } from "../controller/profile"

export const useGetProfile = () => {
    return useQuery({
        queryKey: ['profiles'],
        queryFn: getProfile,
    })
}
export const useGetProfileById = (id: string) => {
    return useQuery({
        queryKey: ['profiles', id],
        queryFn: () => getProfile(id),
    })
}
