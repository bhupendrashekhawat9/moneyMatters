// store/useUserStore.js
import { TRNXDATA } from '@/constants/data';
import { ExpenseType } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useExpenseStore = create(
  persist(
    (set) => ({
      expenses: [...TRNXDATA],
      setExpenses: (expenses:ExpenseType[]) => set({ expenses }),
      addExpense: (expense:ExpenseType) => set((state)=>{ expenses: [...state.expenses, expense] }),
      removeExpense: (expenseId:string) => set((state) =>{ expenses: state.expenses.filter(exp => exp.id !== expenseId) }),
      updateExpense: (expense:ExpenseType) => set((state)=>{ expenses: state.expenses.map(exp => exp.id === expense.id ? expense : exp) }),
    }),
    {
      name: 'expense-storage', // storage key
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useExpenseStore;
