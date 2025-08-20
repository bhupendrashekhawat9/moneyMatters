import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { Text } from "react-native";


export default function Index() {
    const { user, loading, login, logout } = useAuth();
    if (loading) {
        return <Text>Loading...</Text>
    }
    if (!user) {
        return <Redirect href="/login" />
    }
    return <Redirect href="/home" />
}