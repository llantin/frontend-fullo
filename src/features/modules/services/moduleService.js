import api from "@/services/api";

export const getModules = async () => {
    const { data } = await api.get("/modules");
    return data.modules;
};

export const getUserModules = async (roleId) => {
    const { data } = await api.get(`/get-modules/${roleId}`);
    return data.modules;
}