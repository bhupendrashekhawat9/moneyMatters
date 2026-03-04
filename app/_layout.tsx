import { Slot } from 'expo-router';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import AuthProvider from '@/utils/AuthContext';
import { queryClient } from '@/api/client.config';

import "./globals.css";

const Layout = () => {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default Layout