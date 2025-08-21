import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { expenseServices } from '@/api/service'
import { ExpenseType } from '@/types'
import useUserStore from '@/store/useUserStore'


const useTransactions = () => {
    const [transactions, setTransactions] = React.useState<ExpenseType[]>([])
    const {user}= useUserStore()
    const fetchTransactions = async() => {
        console.log(user,"user")
        const response = await expenseServices.getAll({userId:user?.userId??"",startDate:"",endDate:""})
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