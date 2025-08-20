import AuthProvider from '@/utils/AuthContext';
import { Slot } from 'expo-router';
import React from 'react';
import "./globals.css";
const Layout = () => {
    
  return (
    <AuthProvider>
  <Slot />
    </AuthProvider>
  )
}

export default Layout