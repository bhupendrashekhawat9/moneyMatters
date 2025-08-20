import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { expenseServices } from '@/api/service'
import { ExpenseType } from '@/types'

const useTransactions = () => {
    const [transactions, setTransactions] = React.useState<ExpenseType[]>([])
    const fetchTransactions = async() => {
        const response = await expenseServices.getAll()
        if(response.status == "SUCCESS"){
            setTransactions(response.data as ExpenseType[])
        }
        return response
    }
      const refresh = async() => {
        await fetchTransactions()
      }
    React.useEffect(() => {
        fetchTransactions()
    }, [])
    return {
        transactions,
        refresh
    }
}

export default useTransactions