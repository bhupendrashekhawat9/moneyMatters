import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { Text } from "react-native";


export default function Index() {
    return <Redirect href="/transactions" />
}