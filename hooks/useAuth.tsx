
import { authControllers } from "@/api/controller/auth";
import { LoginResponse } from "@/api/types";
import { appStorage } from "@/constants/appStorage";
import useUserStore from "@/store/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";

type User = {
  username: string;
  userId: string;
  email: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const loadUser = async () => {
    setLoading(true)
    try {
      const userData: User = await AsyncStorage.getItem(appStorage.USER_DATA).then((data) => JSON.parse(data ?? ""));
      if (userData) {
        setLoading(false)
        setUser(userData);
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
    const response: LoginResponse = await authControllers.login({ email: username, password })
    setLoading(false)
    const userObj: User = {
      username: response.name,
      email: response.email,
      userId: response._id
    };
    await AsyncStorage.setItem(appStorage.USER_DATA, JSON.stringify(userObj));
    await AsyncStorage.setItem(appStorage.SSID, response.token);
    setUser(userObj);
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  }, []);

  const register = useCallback(async (email: string, username: string, password: string) => {
    setLoading(true)
    const userObj = { username };
    const response = await authControllers.register({ userEmail: email, userPassword: password, userName: username })

    if (response.status == "SUCCESS") {
      setLoading(false)
      await AsyncStorage.setItem("user", JSON.stringify(userObj));
      await AsyncStorage.setItem("ssid", response.data.token);

      userStoreSetUser(userObj)
      setUser(userObj);
      // router.replace("/");
    } else {
      setLoading(false)
    }

  }, []);
  return { user, loading, login, logout, register };
}
