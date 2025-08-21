
import { ExpenseFormData } from "@/components/forms/expenseForm/ExpenseForm";
import DoAjax from "@/utils/ajax";
import { getApiResponse } from "@/utils/functions";

import { ApiResponse, ExpenseCategoryResponse, ExpenseResponse, ExpenseResponseType, KpiResponse, TransactionResponse, UserProfileResponse } from "@types";


export const expenseControllers = {
    create: async(arg: ExpenseFormData) => {
        const response: ApiResponse<ExpenseResponse> = await DoAjax.post("/expense/addNew").payload(arg).exec()
       if(response.status == 200){
           
           return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
       }
       return getApiResponse(null, "FAILURE", "Expense failed")
    },

    getAll: async(args:{userId:string,startDate:string,endDate:string}) => {
        const response: ApiResponse<ExpenseResponseType[]> = await DoAjax.post("/expense/getAll").payload(args).exec()
        if(response.status == 200){
           return getApiResponse(response.data, "SUCCESS", "Expense fetched successfully")
       }
       return getApiResponse(null, "FAILURE", "Expense failed")
    },

    getById: async(id: string) => {
        const response: ApiResponse<ExpenseResponse> = await DoAjax.get("/expense/getById/"+id).exec()
       if(response.status == 200){
           
           return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
       }
       return getApiResponse(null, "FAILURE", "Expense failed")
    },

    update: async(id: string, arg: ExpenseFormData) => {
        const response: ApiResponse<ExpenseResponse> = await DoAjax.put("/expense/update/"+id).payload(arg).exec()
       if(response.status == 200){
           
           return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
       }
       return getApiResponse(null, "FAILURE", "Expense failed")
    },

    delete: async(id: string) => {
        const response: ApiResponse<ExpenseResponse> = await DoAjax.delete("/expense/delete?id="+id).exec()
       if(response.status == 200){
           
           return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
       }
       return getApiResponse(null, "FAILURE", "Expense failed")
    },
    filter: async(arg: {category: string, fromDate: string,toDate: string}) => {
        const response: ApiResponse<ExpenseResponse[]> = await DoAjax.get("/expense/filter").payload(arg).exec()
       if(response.status == 200){
           
           return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
       }
       return getApiResponse(null, "FAILURE", "Expense failed")
    }
}
 
export const transactionControllers = {
    filter: async(arg: {category: string, fromDate: string,toDate: string}) => {
        const response: ApiResponse<TransactionResponse[]> = await DoAjax.get("/transaction/filter").payload(arg).exec()
        if(response.status == 200){
            
            return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
        }
        return getApiResponse(null, "FAILURE", "Expense failed")
    }
}
export const authControllers = {
    login: async(arg: {userEmail: string, userPassword: string}) => {
        const response = await DoAjax.post("/userAuth/login").payload(arg).exec()
       if(response.status == 200){
           
           return getApiResponse(response.data, "SUCCESS", "Login successful")
       }
       return getApiResponse(null, "FAILURE", "Login failed")
    },
    register: async(arg: {userEmail: string, userPassword: string,userName: string}) => {
        const response = await DoAjax.post("/userAuth/register").payload(arg).exec()
       if(response.status == 200){
           
           return getApiResponse(response.data, "SUCCESS", "Login successful")
       }
       return getApiResponse(null, "FAILURE", "Login failed")
    }
}
export const homeControllers = {
    getSecondaryKpi: async(args:{userId:string,startDate:string,endDate:string}) => {

        const response: ApiResponse<KpiResponse[]> = await DoAjax.post("/home/kpi/secondaryKpis").payload(args).exec()
       
        if(response.status == 200){
            
            return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
        }
        return getApiResponse(null, "FAILURE", "Expense failed")
    },
    getPrimaryKpi: async(args:{userId:string,startDate:string,endDate:string}) => {
        const response: ApiResponse<KpiResponse[]> = await DoAjax.post("/home/kpi/heroKpis?userId="+args.userId).payload({}).exec()
      
        if(response.status == 200){
            
            return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
        }
        return getApiResponse(null, "FAILURE", "Expense failed")
    },
    getCategoryKpi: async(args:{userId:string,startDate:string,endDate:string}) => {
        const response: ApiResponse<KpiResponse[]> = await DoAjax.post("/home/kpi/category/Kpis").payload(args).exec()
        
        if(response.status == 200){
            return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
        }
        return getApiResponse(null, "FAILURE", "Expense failed")
    }
}
export const userProfileControllers = {
    getUserProfile: async(userId:string) => {
        const response: ApiResponse<UserProfileResponse> = await DoAjax.get("/userProfile/getProfile?userId="+userId).exec()
        if(response.status == 200){
            return getApiResponse(response.data, "SUCCESS", "Profile fetched successfully")
        }
        return getApiResponse(null, "FAILURE", "Profile failed")
    },
    updateUserProfile: async(userId:string,arg: {[key:string]:string}) => {
        const response: ApiResponse<UserProfileResponse> = await DoAjax.post("/userProfile/updateProfile?userId="+userId).payload(arg).exec()
        if(response.status == 200){
            return getApiResponse(response.data, "SUCCESS", "Profile updated successfully")
        }
        return getApiResponse(null, "FAILURE", "Profile failed")
    },
    getAllCategories: async(userId:string) => {
        const response: ApiResponse<ExpenseCategoryResponse[]> = await DoAjax.post("/profile/category/getAll").payload({userId:userId}).exec()
        if(response.status == 200){
            return getApiResponse(response.data, "SUCCESS", "Categories fetched successfully")
        }
        return getApiResponse(null, "FAILURE", "Categories failed")
    }
}