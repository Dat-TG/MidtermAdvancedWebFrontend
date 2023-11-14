import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LogInPage from "../pages/LogInPage";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";
import UserProfilePage from "../pages/UserProfilePage";
import MainLayout from "../components/layout/MainLayout";

const router = createBrowserRouter([{
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LogInPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/landing",
      element: <LandingPage />,
    },
    {
      path: "/profile",
      element: <UserProfilePage />,
    },
  ]
}
  
]);

export default router;
