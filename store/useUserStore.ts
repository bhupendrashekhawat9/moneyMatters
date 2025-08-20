import { createStore } from "zustand"


interface settingsType{
    currency:string,
    language:string,
    theme:string,
    currencySymbol:string,
}
const useUserStore = createStore((set)=>{
    return {
        user:{
            userName:"",
            email:"",
        },
        settings:{
            currency:"",
            language:"",
            theme:"",
            currencySymbol:"",
        },
        setUser: (user:{userName:string,email:string}) => set({ user }),
        setSettings: (settings:settingsType) => set({ settings }),
        updateSettings: (settings:settingsType) => set((state)=>{
             return {settings: {
                ...state.settings,
                ...settings
             }} 
            
            })
    }
})

export default useUserStore
