import { create } from "zustand"

interface ExpenseCategoryType {
    id: string
    label: string
    icon: string
    color: string
    usageCount: string
}

interface MasterProfileState {
    expenseCategories: ExpenseCategoryType[]
    settings: {
        currency: string
        language: string
        theme: string
        currencySymbol: string
    }
    setExpenseCategories: (expenseCategories: ExpenseCategoryType[]) => void
}

const useMasterProfileStore = create<MasterProfileState>((set) => ({
    expenseCategories: [],
    settings: {
        currency: "",
        language: "",
        theme: "",
        currencySymbol: "",
    },
    setExpenseCategories: (expenseCategories) => set({ expenseCategories }),
}))

export default useMasterProfileStore
