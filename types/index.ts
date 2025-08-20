export interface ApiResponse <T> {
    data: T;
    status: "SUCCESS" | "FAILURE";
    message: string;
}
export interface ExpenseResponse {
    id: string;
    name: string;
    amount: number;
    category: string;
    date: string;
    refId:string|null
}
export interface ExpenseType {
    id: string;
    name: string;
    amount: number;
    category: string;
    date: string;
    refId:string|null
}
export interface TransactionResponse {
    id: string;
    name: string;
    amount: number;
    category: string;
    date: string;
    refId:string|null
}
export interface UserResponse {
   userEmail: string;
   userId: string;
   token: string;
   userName: string;
}
export interface ExpenseResponseType {
    __v: number;
    _id: string;
    amount: string;
    category: string;
    createdDate: string;
    description: string;
    expenseDate: string;
    id: string;
    notes: string;
    refToId: string;
    userId: string;
}
export interface KpiResponse {
   title:string;
   value:number;
   icon:string;
   color?:string;
   type?:string;
   size?:string;
}

export interface UserProfileResponse {
    theme:string,
    language:string,
    currency:string,
    currencySymbol:string,
}
export interface ExpenseCategoryResponse {
    _id: string;
    user_id: string;
    name: string;
    icon: string;
    color: string;
    usage_count: number;
    order_index: number;
    created_at: string;
    updated_at: string;
    __v: number;
}
export interface ExpenseCategoryType {
    id: string;
    label: string;
    icon: string;
    color: string;
    usageCount: string;
}
