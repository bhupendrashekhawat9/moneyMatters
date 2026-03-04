import { getApiResponse } from "@/utils/functions"
import { authControllers } from "../controller"

export const login =   async(userData:{userEmail: string, userPassword: string}) => {
        const response = await authControllers.login(userData)
        if(response.status == "SUCCESS"){
            
            return getApiResponse(response.data, "SUCCESS", "Login successful")
        }
        return getApiResponse(null, "FAILURE", "Login failed")
}
    
    
export const register = async (userData: { userEmail: string, userPassword: string }) => {
        const response = await authControllers.register(userData)
        if(response.status == "SUCCESS"){
            
            return getApiResponse(response.data, "SUCCESS", "Login successful")
        }
        return getApiResponse(null, "FAILURE", "Login failed")
    }