import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-fullo.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
    timeout: 30000,
});

api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
});

export default api;