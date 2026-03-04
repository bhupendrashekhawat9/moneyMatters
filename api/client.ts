import axios from 'axios'
import CONSTANTS from '../constants/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appStorage } from '@/constants/appStorage';


export const API_CLIENT = axios.create({
    baseURL: CONSTANTS.API_URL as string,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
})

API_CLIENT.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem(appStorage.SSID);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
// Response Interceptor (handle errors globally)
API_CLIENT.interceptors.response.use(
    async (response) => {
        return await response.data;
  },
    (error) => {
      console.error('API Error:', error.response || error.message);
    if (error.response?.status === 401) {
        // handle unauthorized (logout, refresh token, etc.)
        AsyncStorage.removeItem(appStorage.SSID);
       
        
    }
    return Promise.reject(error);
  }
);

export const get = (url: string) => API_CLIENT.get(url);
export const post = (url: string, data?: any) => API_CLIENT.post(url, data);
export const put = (url: string, data?: any) => API_CLIENT.put(url,data );
export const del = (url: string) => API_CLIENT.delete(url);
export const patch = (url: string, data?: any) => API_CLIENT.patch(url, data);
export const head = (url: string) => API_CLIENT.head(url);
export const options = (url: string) => API_CLIENT.options(url);
export const request = (config: any) => API_CLIENT.request(config);