import { useAuth } from '@/hooks/useAuth'
import { router } from 'expo-router'
import { useCallback } from 'react'



const useSettings = () => {
    const { logout } = useAuth()
    const onLogout = useCallback(() => {
        logout()
        router.replace("/login")
    }, [])
    const settingsList = [
        {
            title: "Profile",
            icon: "account",
            screen: "profile",
            onPress: () => router.push("/settings/Profile")
        },
        {
            title: "Notifications",
            icon: "bell",
            screen: "notifications",
            onPress: () => router.push("/settings/Notifications")
        },
        {
            title: "Privacy",
            icon: "lock",
            screen: "privacy",
            onPress: () => router.push("/settings/Privacy")
        },
        {
            title: "Help",
            icon: "help",
            screen: "help",
            onPress: () => router.push("/settings/Help")
        },
        {
            title: "Logout",
            icon: "logout",
            screen: "logout",
            onPress: onLogout
        }
    ]
    return {
        settingsList,
        onLogout
    }
}

export default useSettings
