

import { CategoriesType, ExpenseCategoryResponse, ExpenseCategoryType, KpiResponse, TransactionType, TransactionTypeResponse } from "@/types"
import { getApiResponse } from "@/utils/functions"
import { authControllers, expenseControllers, homeControllers, userProfileControllers } from "@controller"


export const expenseServices = {
    create: async(expenseData:TransactionType) => {
        const payload = {
            "description": expenseData.description,
            "amount": expenseData.amount,
            "createdDate": new Date().toISOString(),
            "transactionDate": expenseData.transactionDate,
            "userId": expenseData.userId,
            "category": expenseData.category,
            "transactionType": "DEBIT",
            "transactionMode": "CASH",
            extREfId:expenseData.refToId,
            extREfType:expenseData.refToType
        }
              
        const response = await expenseControllers.create(payload)
        if(response.status == "SUCCESS"){
            return getApiResponse(response.data, "SUCCESS", "Expense added successfully")
        }
        return getApiResponse(null, "FAILURE", "Expense failed")
     
    },

    getAll: async(args:{userId:string,startDate:string,endDate:string}) => {
       
        const response = await expenseControllers.getAll(args)
        if(response.status == "SUCCESS"){
            let data = response.data?.map((item:TransactionTypeResponse) => {
                return {
                    id: item.id,
                    description: item.description,
                    amount: item.amount,
                    transactionDate: item.transactionDate,
                    userId: item.userId,
                    category: item.category,

                    createdDate: item.createdDate,
                    transactionType: item.transactionType,
                    transactionMode: item.transactionMode,
                    extRefId: item.extRefId,
                    extRefType: item.extRefType
        
                }
            })

            return getApiResponse(data, "SUCCESS", "Transactions fetched successfully")
        }
        return getApiResponse(null, "FAILURE", "Transactions failed")
    },

    getById: (id:string) => {
        return expenseControllers.getById(id)
    },

    update: (id:string, updatedData:TransactionType) => {
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
    saveCategories: async(userId:string,arg:CategoriesType[]) => {
        const payload:CategoriesType[]= arg.map((item:CategoriesType) => {
            return {
                label:item.label,
                icon:item.icon,
                color:item.color,
                usageCount:0,
            }
        })
        const response = await userProfileControllers.saveCategories(payload)
        if(response.status == "SUCCESS"){
            return getApiResponse(response.data, "SUCCESS", "Categories saved successfully")
        }
        return getApiResponse(null, "FAILURE", "Categories failed")
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
    },
    saveCategories: async(userId:string,categories:ExpenseCategoryType[]) => {
        const response = await userProfileControllers.saveCategories(userId,categories)
        if(response.status == "SUCCESS"){
            return getApiResponse(response.data, "SUCCESS", "Categories saved successfully")
        }
        return getApiResponse(null, "FAILURE", "Categories failed")
    }
}
