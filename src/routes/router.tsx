import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LogInPage from "../pages/LogInPage";
import RegisterPage from "../pages/RegisterPage";
import LandingPage from "../pages/LandingPage";
import UserProfilePage from "../pages/UserProfilePage";
import MainLayout from "../components/layout/main/MainLayout";
import PrivateRoute from "../components/layout/private/PrivateRoute";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/profile",
            element: <UserProfilePage />,
          },
        ],
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
    ],
  },
]);

export default router;
