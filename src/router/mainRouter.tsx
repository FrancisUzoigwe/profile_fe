import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import Signin from "../pages/auth/Signin";
import Register from "../pages/auth/Register";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/home/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Settings from "../pages/home/Settings";



export const mainRouter = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Signin />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {
        path: "/auth",
        element: <PrivateRoute><MainLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "/auth/settings",
                element: <Settings />
            }
        ]
    }
])