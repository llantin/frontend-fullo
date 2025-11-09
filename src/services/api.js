import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-fullo.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true, // 🔥 CRÍTICO para CORS con credenciales
    timeout: 30000, // 30 segundos (Render puede tardar si está dormido)
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

export default api;