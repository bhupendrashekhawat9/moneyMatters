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
}

export interface TransactionResponse {
    id: string;
    name: string;
    amount: number;
    category: string;
    date: string;
}
