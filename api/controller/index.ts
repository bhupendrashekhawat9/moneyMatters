import { ExpenseFormData } from "@/components/forms/ExpenseForm";
import DoAjax from "@/utils/ajax";
import { ApiResponse, ExpenseResponse, TransactionResponse } from "@types";


export const expenseControllers = {
    create: async(arg: ExpenseFormData) => {
        const response: ApiResponse<ExpenseResponse> = await DoAjax.post("/expense/addNew").payload(arg).exec()
        return response
    },

    getAll: async() => {
        const response: ApiResponse<ExpenseResponse[]> = await DoAjax.get("/expense/getAll").exec()
        return response
    },

    getById: async(id: string) => {
        const response: ApiResponse<ExpenseResponse> = await DoAjax.get("/expense/getById/"+id).exec()
        return response
    },

    update: async(id: string, arg: ExpenseFormData) => {
        const response: ApiResponse<ExpenseResponse> = await DoAjax.put("/expense/update/"+id).payload(arg).exec()
        return response
    },

    delete: async(id: string) => {
        const response: ApiResponse<ExpenseResponse> = await DoAjax.delete("/expense/delete/"+id).exec()
        return response
    },
    filter: async(arg: {category: string, fromDate: string,toDate: string}) => {
        const response: ApiResponse<ExpenseResponse[]> = await DoAjax.get("/expense/filter").payload(arg).exec()
        return response
    }
}
 
export const transactionControllers = {
    filter: async(arg: {category: string, fromDate: string,toDate: string}) => {
        const response: ApiResponse<TransactionResponse[]> = await DoAjax.get("/transaction/filter").payload(arg).exec()
        return response
    }
}