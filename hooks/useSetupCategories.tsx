import { masterProfileServices } from "@/api/service"
import useUserStore from "@/store/useUserStore"
import { ExpenseCategoryType } from "@/types"
import { useState } from "react"


const useSetupCategories = ()=>{
    const {user} = useUserStore()
    const [loading,setLoading] = useState(false)
    const createCategories = (categories:string[]):ExpenseCategoryType[]=>{
        const categoriesList:ExpenseCategoryType[] = categories.map((category,index)=>{
            return {
                id:null,
                label:category,
                icon:"",
                color:"",
                usageCount:0,
                userId:user.userId,
                orderIndex:index
            }
        })
        return categoriesList
    }
    const handleSubmit = async(categories:string[])=>{
        if(user){
            setLoading(true)
            const categories = createCategories(categories) as ExpenseCategoryType[];
            const response = await masterProfileServices.saveCategories(user.userId,categories)
            if(response.status == "SUCCESS"){
                setLoading(false)
            }else{
                setLoading(false)
            }
        }
    }
    return {handleSubmit,loading}
}
export default useSetupCategories;