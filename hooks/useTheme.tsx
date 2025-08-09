
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Appearance } from 'react-native';
import { darkTheme, lightTheme, ThemeType } from '../constants/theme';
export const themeVariable = "preferredTheme";
const useTheme = () => {
    const [mode, setMode] = React.useState('light');
    const deviceTheme = Appearance.getColorScheme()??"light";
    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
    const getStoredTheme = async () => {
        let storedMode = await AsyncStorage.getItem(themeVariable);
        if (!storedMode) {
            storedMode = deviceTheme;
        }
        if (storedMode) {
            setMode(storedMode);
        }
    };
    useEffect(() => {
        getStoredTheme();
    }, []);
    const theme: ThemeType = mode === 'light' ? lightTheme : darkTheme;

    return { theme, toggleTheme, mode };
}



export default useTheme
