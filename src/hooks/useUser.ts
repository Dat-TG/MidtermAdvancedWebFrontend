import { useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AuthContext } from "../context/AuthContext";

// NOTE: optimally move this into a separate file
export interface User {
  name: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
}

export const useUser = () => {
  const { setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const changeUser = (newUser: User | null) => {
    console.log("addUser", newUser);
    setItem("user", newUser != null ? JSON.stringify(newUser) : "");
    setUser(newUser);
  };

  const login = (user: User) => {
    changeUser(user);
  }

  const logout = () => {
    changeUser(null);
  }

  return { changeUser, login, logout };
};
