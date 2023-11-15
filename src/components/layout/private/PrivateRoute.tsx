import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

function PrivateRoute() {
    const {user}=useContext(AuthContext);
    if (user==null) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />
}

export default PrivateRoute;