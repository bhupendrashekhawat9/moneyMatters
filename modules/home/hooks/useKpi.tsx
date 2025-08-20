import { homeServices } from '@/api/service'
import { useAuth } from '@/hooks/useAuth'
import React from 'react'
import { StyleSheet } from 'react-native'

const useKpi = () => {
    const [kpiList, setKpiList] = React.useState([])
    const [categoryKpiList, setCategoryKpiList] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const {user} = useAuth()
    const [kpiFilter,setKpiFilter] = React.useState({category:"",fromDate:"01-01-2020",toDate:"01-01-2025"})
    const getKpiList = async() => {
        setLoading(true)
        try {
            const response = await homeServices.getSecondaryKpi({userId:user?.userId || "",startDate:kpiFilter.fromDate,endDate:kpiFilter.toDate})
            if(response.status == "SUCCESS"){
                setKpiList(response.data)
            }else{
                setError(response.message)
            }
        } catch (error) {
            setError(error)
        }finally{
            setLoading(false)
        }
    }

    const getSecondaryKpi = async() => {
        setLoading(true)
        try {

            const response = await homeServices.getSecondaryKpi({userId:user?.userId || "",startDate:kpiFilter.fromDate,endDate:kpiFilter.toDate})
            if(response.status == "SUCCESS"){
              setKpiList(response.data)
            }else{
                setError(response.message)
            }
        } catch (error) {
            setLoading(false)
            setError(error)
        }finally{
            setLoading(false)
        }
    }
    const getCategoryKpiList = async()=>{
        setLoading(true)
        try {
            const response = await homeServices.getCategoryKpi({userId:user?.userId || "",startDate:kpiFilter.fromDate,endDate:kpiFilter.toDate})
            if(response.status == "SUCCESS"){
              setCategoryKpiList(response.data)
            }else{
                setError(response.message)
            }
        } catch (error) {
            setLoading(false)
            setError(error)
        }finally{
            setLoading(false)
        }
    }
    const updateKpiFilter = (filter: {category: string, fromDate: string,toDate: string}) => {
        setKpiFilter((prev)=>({...prev,...filter}))
    }
    React.useEffect(() => {
        if(user?.userId){
            getSecondaryKpi()
            getCategoryKpiList()
        }
    }, [kpiFilter,user])

    return {
        kpiList,
        loading,
        error,
        kpiFilter,
        updateKpiFilter,
        categoryKpiList,
    }
}

export default useKpi

const styles = StyleSheet.create({})