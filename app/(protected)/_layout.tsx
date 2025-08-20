import { useAuth } from "@/hooks/useAuth";
import useMasterProfileStore from "@/store/useMasterProfile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { masterProfileServices } from "@/api/service";
export default function RootLayout() {

  const {user}= useAuth()

  const {setExpenseCategories}= useMasterProfileStore()
  const fetchExpCategories = ()=>{
      masterProfileServices.getAllCategories(user?.userId??"").then((res)=>{
        console.log(res,"resExpenseCategory resssssssssssssssssssssssssss")
          if(res.status == "SUCCESS"){
              setExpenseCategories(res.data??[])
          }
      })
  }
  useEffect(()=>{
    if(user){
      fetchExpCategories()
    }
  },[user])

  return <>
    <Tabs initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{
        title: "Home",
        href:null,
        tabBarLabel: "Home",
        tabBarIcon: () => {
          return <MaterialCommunityIcons name="home" size={24} color="black" />
        }
      }} />

      <Tabs.Screen name="home" 
      options={{
        title: "Home Screen",
        tabBarLabel: "Home",
         tabBarIcon: () => {
          return <MaterialCommunityIcons name="home" size={24} color="black" />
        }
      }} />
      <Tabs.Screen 
      name="transactions"
      options={{
        title: "Transactions", 
        tabBarIcon: () => {
          return <MaterialCommunityIcons name="receipt" size={24} color="black" />
        }
      }} />
      <Tabs.Screen 
      name="settings"
      
      options={{
      
        tabBarIcon: () => {
          return <MaterialCommunityIcons name="cog" size={24} color="black" />
        }
      }} />
    </Tabs>
  </>
}
