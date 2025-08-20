import { expenseServices } from '@/api/service'
import AppButton from '@/components/AppButton'
import ExpenseFormDrawer from '@/components/forms/expenseForm'

import Header from '@/components/home/Header'
import KpiContainer from '@/components/home/KpiContainer'
import { BUDGETOPTIONS, CATEGORYOPTIONS } from '@/constants/data'
import { ExpenseType,IncomeType } from '@/types'
import React, { useMemo } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import useKpi from '../../../modules/home/hooks/useKpi'
import { IncomeDrawer } from '@/components/forms/incomeForm'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import useTheme from '@/hooks/useTheme'
import { ThemeType } from '@/constants/theme'
import useMasterProfileStore from '@/store/useMasterProfile'


const HomeScreen = () => {
  const {kpiList,categoryKpiList} = useKpi()
  const {theme} = useTheme()
  const {expenseCategories} = useMasterProfileStore()
  const [homeFilter,setHomeFilter] = React.useState({category:"",fromDate:"",toDate:""})
  const [AddExpenseVisible, setAddExpenseVisible] = React.useState(false);
  const [AddIncomeVisible, setAddIncomeVisible] = React.useState(false);
  const handleSubmitExp = async(formData:ExpenseType)=>{
   const response = await expenseServices.create(formData)
  }
  const handleSubmitInc = async(formData:IncomeType)=>{
    // const response = await incomeServices.create(formData)
   }
  const handleKpiPress = (kpi: any) => {
  }
  const handleFilterChange = (date: Date) => {
    setHomeFilter((prev)=>({...prev,fromDate:date.toISOString()}))
  }
  const styles = useMemo(()=>generateStyle(theme),[theme])
  console.log(expenseCategories,"expenseCategories")
  return (
    <SafeAreaView style={styles.container} > 
    <ScrollView >

      <Header onChange={handleFilterChange}/>
        <KpiContainer kpiList={kpiList} onKpiPress={handleKpiPress} />
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button,{backgroundColor:"green",flex:1}]} onPress={()=>setAddIncomeVisible(true)}>
            <MaterialCommunityIcons name="plus" size={24} color="white" />
            <Text style={{color:"white"}}>Add Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{backgroundColor:"red",flex:1,alignItems:"center" }]} onPress={()=>setAddExpenseVisible(true)}>
            <MaterialCommunityIcons name="plus" size={24} color="white" />
            <Text style={{color:"white"}}>Add Expense</Text>
        </TouchableOpacity>

        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.title}>
            Category Expenses
          </Text>
        <KpiContainer kpiList={categoryKpiList} onKpiPress={handleKpiPress} />
        </View>
         <ExpenseFormDrawer visible={AddExpenseVisible} onClose={()=>{setAddExpenseVisible(false)}} budgets={BUDGETOPTIONS} categories={expenseCategories} onSubmit={handleSubmitExp} />
         <IncomeDrawer visible={AddIncomeVisible} onClose={()=>{setAddIncomeVisible(false)}} title='Add Income' subtitle='Please enter your income details' categories={CATEGORYOPTIONS} onSubmit={handleSubmitInc} />
         </ScrollView>
  
    </SafeAreaView> 
  )
}

export default HomeScreen

const generateStyle = (theme:ThemeType) =>  StyleSheet.create({
    container:{
       flex: 1,
       padding:10
    },
    buttonContainer:{
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
 
    },
    button:{
        padding:10,
        borderRadius:5,
        alignItems:'center',
        margin:1,
        flex:1
        },
    title:{
        fontSize:20,
        fontWeight:"bold",
        margin:10
    },
    categoryContainer:{
      
      borderRadius:5,
      backgroundColor:theme.colors.background,
  
    }
})