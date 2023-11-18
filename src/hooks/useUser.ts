import { useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AuthContext } from "../context/AuthContext";
import {
  loginUser,
  registerUser,
  verifyAccessToken,
} from "../axios/api_services";
import { toast } from "react-toastify";

// NOTE: optimally move this into a separate file
export interface User {
  firstname: string;
  lastname: string;
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
    firstname,
    lastname,
  }: {
    emailAddress: string;
    password: string;
    firstname: string;
    lastname: string;
  }) => {
    registerUser({
      emailAddress: emailAddress,
      password: password,
      firstname: firstname,
      lastname: lastname,
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
          firstname: firstname,
          lastname: lastname,
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

  const login = async ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => {
    loginUser({
      emailAddress: emailAddress,
      password: password,
    })
      .then((response) => {
        console.log(response.data);
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        verifyAccessToken({ accessToken: response.data.accessToken })
          .then((response) => {
            toast("Login successful!", {
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
              firstname: response.data.name,
              lastname: response.data.surname,
              email: emailAddress,
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          })
          .catch((error) => {
            console.log("error haha: ", error.response.data);
            toast(error.response.data.detail.message, {
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
      })
      .catch((error) => {
        console.log("error haha: ", error.response.data);
        toast(
          error.response.status == 500
            ? error.response.data.message
            : error.response.data.detail,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "error",
          }
        );
      });
  };

  const logout = () => {
    changeUser(null);
  };

  return { changeUser, login, logout, register };
};
