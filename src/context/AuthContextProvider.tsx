import { useState } from "react";
import { IUser } from '@/types';
import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface ContextProviderProps {
    children: React.ReactNode;
  }

export const AuthProvider: React.FC<ContextProviderProps> = ({children}) => {
    const {getItem} = useLocalStorage();
    const [user, setUser] = useState<IUser | null>(() => {
      const userFromLocalStorage = getItem('user');
      if (userFromLocalStorage) {
        return JSON.parse(userFromLocalStorage);
      }
    });
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
  };