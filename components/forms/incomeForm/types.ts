

export interface IncomeCategory {
    id: string;
    name: string;
    color: string;
    icon: string;

}
export interface IncomeFormData {
    category: string;
    amount: number;
    date: Date;
    note: string;
}
export interface IncomeDrawerProps {
    visible: boolean;
    onClose: () => void;
    categories?: IncomeCategory[];
    onSubmit: (incomeData: IncomeFormData) => Promise<void> | void;
    initialData?: Partial<IncomeFormData >;
    title?: string;
    subtitle?: string;
}