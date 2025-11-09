import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
    const token = localStorage.getItem("token"); // tu token de autenticación

    if (!token) {
        // Si no hay token, redirige al login
        return <Navigate to="/sign-in" replace />;
    }

    // Si hay token, renderiza los hijos
    return <Outlet />;
};

export default PrivateRoute;
