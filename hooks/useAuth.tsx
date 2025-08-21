import { authControllers } from "@/api/controller";
import useUserStore from "@/store/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";

type User = {
  username: string;
  userId: string;
  email:string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const {setUser:userStoreSetUser} = useUserStore()
  const loadUser = async () => {
    setLoading(true)
    try {
      const userData = await AsyncStorage.getItem("user");
      console.log(JSON.parse(userData),"userData")
      if (userData) {
        setLoading(false)
        setUser(JSON.parse(userData));
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true)
    const response = await authControllers.login({userEmail: username, userPassword: password})
    
    if(response.status == "SUCCESS"){
      const userObj = response.data;
      setLoading(false)
        await AsyncStorage.setItem("user", JSON.stringify(userObj));
        await AsyncStorage.setItem("ssid", response.data.token);
        userStoreSetUser(userObj)
        setUser(userObj);
        router.replace("/");
    }else{
      setLoading(false)
    }
    
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  }, []);

  const register = useCallback(async (email: string,username: string, password: string) => {
    setLoading(true)
    const userObj = { username };
    const response = await authControllers.register({userEmail:email, userPassword: password,userName: username})

    if(response.status == "SUCCESS"){
      setLoading(false)
        await AsyncStorage.setItem("user", JSON.stringify(userObj));
        await AsyncStorage.setItem("ssid", response.data.token);

        userStoreSetUser(userObj)
        setUser(userObj);
        router.replace("/");
    }else{
      setLoading(false)
    }
    
  }, []);
  return { user, loading, login, logout, register };
}
