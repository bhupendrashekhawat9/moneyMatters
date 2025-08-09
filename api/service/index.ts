import { ExpenseFormData } from "@/components/forms/ExpenseForm"
import { expenseControllers } from "@controller"

export const expenseServices = {
    create: (expenseData:ExpenseFormData) => {
        return expenseControllers.create(expenseData)
    },

    getAll: () => {
        return expenseControllers.getAll()
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