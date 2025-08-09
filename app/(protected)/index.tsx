import { useAuthContext } from "@/utils/AuthContext";
import { Redirect } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
const { user ,logout} = useAuthContext();
  

  if(!user) {
    console.log("User not authenticated, redirecting to login");
    return <Redirect href="/login" />
  }
  return (
    <View
    className="flex-1 items-center justify-center"
    >
      <Button
        title="Logout"
        onPress={() => {
          logout();
        }}
      />

      <Text>Welcome to the Budget App</Text>
      <Text>Click a link to navigate</Text>
    </View>
  );
}
