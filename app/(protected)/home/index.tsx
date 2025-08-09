import { expenseServices } from '@/api/service'
import ExpenseForm from '@/components/forms/ExpenseForm'
import KpiContainer from '@/components/home/KpiContainer'
import { BUDGETOPTIONS, CATEGORYOPTIONS, KPIDATA } from '@/constants/data'

import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



const HomeScreen = () => {
  const kpiList = KPIDATA

  const handleSubmitExp = async(formData)=>{
    
   const response = await expenseServices.create(formData)
   console.log(response)
  }
  return (
    <SafeAreaView style={styles.container}>

        <KpiContainer kpiList={kpiList} onKpiPress={() => {}} />
         <ExpenseForm budgets={BUDGETOPTIONS} categories={CATEGORYOPTIONS} onSubmit={handleSubmitExp} />
  
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
       flex: 1,
    }
})