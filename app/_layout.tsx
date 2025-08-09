import AuthProvider from '@/utils/AuthContext';
import { Stack } from 'expo-router';
import React from 'react';
import "./globals.css";
const Layout = () => {
  return (
    <AuthProvider>
    <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  )
}

export default Layout