import api from "@/services/api";

export const login = async (credentials) => {
    const { data } = await api.post("/login", credentials);
    return data;
};

export const sendPasswordReset = async (payload) => {
    const response = await api.post("/password/reset", payload);
    return response.data;
};
export const resetPassword = async (payload) => {
    const response = await api.post("/password/update", payload);
    return response.data;
};

export const changePassword = async (payload) => {
    const token = localStorage.getItem("token"); // token guardado después del login
    const response = await api.post("/password/change", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};