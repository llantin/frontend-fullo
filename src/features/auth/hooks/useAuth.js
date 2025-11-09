import { useState, useEffect } from "react"
import { useNavigate } from "react-router";

export const useAuthUser = () => {
    const [user, setUser] =
        userState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, []);

    return user;
}

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("user");   // limpiar datos del usuario
        localStorage.removeItem("token");  // si guardas el token también
        navigate("/sign-in");                // redirigir al login
    };

    return logout;
};