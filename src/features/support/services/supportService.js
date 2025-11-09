import api from "@/services/api";

export const sendSupport = async (payload) => {
    try {
        const response = await api.post("/support/send", payload);
        return response.data;
    } catch (error) {
        console.error("Error al enviar soporte:", error);
        throw error.response?.data || error;
    }
};
