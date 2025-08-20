
import { ExpenseFormData } from "@/components/forms/expenseForm/ExpenseForm"
import { ExpenseCategoryResponse, ExpenseCategoryType, ExpenseResponseType, KpiResponse } from "@/types"
import { getApiResponse } from "@/utils/functions"
import { authControllers, expenseControllers, homeControllers, userProfileControllers } from "@controller"


export const expenseServices = {
    create: async(expenseData:ExpenseFormData) => {
        const payload = {
            "description": expenseData.description,
            "amount": expenseData.amount,
            "createdDate": new Date().toISOString(),
            "expenseDate": expenseData.date,
            "userId": expenseData.userId,
            "category": expenseData.category,
            "notes": expenseData.description,
        }
        console.log(payload)        
        const response = await expenseControllers.create(payload)
        if(response.status == "SUCCESS"){
            return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
        }
        return getApiResponse(null, "FAILURE", "Expense failed")
     
    },

    getAll: async() => {
        const response = await expenseControllers.getAll()
        if(response.status == "SUCCESS"){
            let data = response.data?.map((item:ExpenseResponseType) => {
                return {
                    id: item.id,
                    description: item.description,
                    amount: item.amount,
                    date: item.expenseDate,
                    userId: item.userId,
                    category: item.category,
                    notes: item.notes,
                    createdDate: item.createdDate,
                    expenseDate: item.expenseDate,
                    refToId: item.refToId
        
                }
            })

            return getApiResponse(data, "SUCCESS", "Expense added successfully")
        }
        return getApiResponse(null, "FAILURE", "Expense failed")
    },

    getById: (id:string) => {
        return expenseControllers.getById(id)
    },

    update: (id:string, updatedData:ExpenseFormData) => {
        return expenseControllers.update(id, updatedData)
    },

    delete: (id:string) => {
        return expenseControllers.delete(id)
    }
}

export const authServices = {
    login:   async(userData:{userEmail: string, userPassword: string}) => {
        const response = await authControllers.login(userData)
        if(response.status == "SUCCESS"){
            
            return getApiResponse(response.data, "SUCCESS", "Login successful")
        }
        return getApiResponse(null, "FAILURE", "Login failed")
    },
    register: async(userData:{userEmail: string, userPassword: string}) => {
        const response = await authControllers.register(userData)
        if(response.status == "SUCCESS"){
            
            return getApiResponse(response.data, "SUCCESS", "Login successful")
        }
        return getApiResponse(null, "FAILURE", "Login failed")
    }
}

export const homeServices = {
        getSecondaryKpi: async(args:{userId:string,startDate:string,endDate:string}) => {
           
        const response = await homeControllers.getSecondaryKpi(args)
        if(response.status == "SUCCESS"){
            let data = response.data?.map((item:KpiResponse) => {
                return {
                   title:item.label,
                   value:item.value,
                   size:item.size,
                   color:item.color,
                   icon:item.icon
    
                }
            })
            return getApiResponse(data, "SUCCESS", "Secondary KPI fetched successfully")
        }
        return getApiResponse(null, "FAILURE", "Secondary KPI failed")
    },
    getPrimaryKpi: async(args:{userId:string}) => {
        const response = await homeControllers.getPrimaryKpi(args)
        if(response.status == "SUCCESS"){
            let data = response.data?.map((item:KpiResponse) => {
                return {
                   title:item.title,
                   value:item.amount,
                   size:item.size,
                   color:item.color,
                   backgroundColor:item.backgroundColor,
                   borderColor:item.borderColor,
                   icon:item.icon
    
                }
            })
            return getApiResponse(data, "SUCCESS", "Primary KPI fetched successfully")
        }
        return getApiResponse(null, "FAILURE", "Primary KPI failed")
    },
    getCategoryKpi: async(args:{userId:string,startDate:string,endDate:string}) => {
        const response = await homeControllers.getCategoryKpi(args)
        if(response.status == "SUCCESS"){
            let data = response.data?.map((item:KpiResponse) => {
                return {
                   title:item.label,
                   value:item.value,
                   size:item.size,
                   color:item.color,
                   icon:item.icon
    
                }
            })
            return getApiResponse(data, "SUCCESS", "Category KPI fetched successfully")
        }
        return getApiResponse(null, "FAILURE", "Category KPI failed")
    }
}

export const userProfileServices = {
    getUserProfile: async(userId:string) => {
        const response = await userProfileControllers.getUserProfile(userId)
        if(response.status == "SUCCESS"){
            return getApiResponse(response.data, "SUCCESS", "Profile fetched successfully")
        }
        return getApiResponse(null, "FAILURE", "Profile failed")
    },
    updateUserProfile: async(userId:string,arg:{[key:string]:string}) => {
        const response = await userProfileControllers.updateUserProfile(userId,arg)
        if(response.status == "SUCCESS"){
            return getApiResponse(response.data, "SUCCESS", "Profile updated successfully")
        }
        return getApiResponse(null, "FAILURE", "Profile failed")
    },
    fetchAllCategories: async(userId:string) => {
        const response = await userProfileControllers.getAllCategories(userId)
        if(response.status == "SUCCESS"){
            return getApiResponse(response.data, "SUCCESS", "Categories fetched successfully")
        }
        return getApiResponse(null, "FAILURE", "Categories failed")
    }
}
export const masterProfileServices = {
    getAllCategories: async(userId:string) => {
        const response = await userProfileControllers.getAllCategories(userId)
        if(response.status == "SUCCESS"){
            const data = response.data??[];
            const expenseCategories: ExpenseCategoryType[] = data.map((item:ExpenseCategoryResponse) => {
                return {
                    id: item._id,
                    label: item.name,
                    icon: item.icon,
                    color: item.color,
                    usageCount: item.usage_count.toString(),
                }
            })
            return getApiResponse(expenseCategories, "SUCCESS", "Categories fetched successfully")
        }
        return getApiResponse(null, "FAILURE", "Categories failed")
    }
}
