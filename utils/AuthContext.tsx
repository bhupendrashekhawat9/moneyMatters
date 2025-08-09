import { useAuth } from '@/hooks/useAuth';
import React, { createContext } from 'react';


type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
};

const Ctx = createContext<AuthContextType>({
    user: null,
    loading: false,
    login: () => {},
    logout: () => {}
});

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const { user, loading, login, logout } = useAuth();
    
  return (
   <Ctx.Provider value={{ user, loading, login, logout }}>
        {children}
   </Ctx.Provider>
  )
}

export default AuthProvider

export const AuthContext = Ctx;

export const useAuthContext = () => React.useContext(Ctx);