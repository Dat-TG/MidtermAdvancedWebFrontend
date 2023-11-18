import { useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../axios/api_services";
import { toast } from "react-toastify";

// NOTE: optimally move this into a separate file
export interface User {
  //name: string;
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

  const register = async ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => {
    registerUser({
      emailAddress: emailAddress,
      password: password,
    })
      .then((response) => {
        console.log(response.data);
        toast("Register successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "success",
        });
        changeUser({
          email: emailAddress,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
      })
      .catch((error) => {
        console.log("error haha: ", error.response.data);
        toast(error.response.data.detail, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "error",
        });
      });
  };

  const login = (user: User) => {
    changeUser(user);
  };

  const logout = () => {
    changeUser(null);
  };

  return { changeUser, login, logout, register };
};
