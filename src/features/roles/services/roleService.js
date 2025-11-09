import api from "@/services/api";

export const getRoles = async () => {
    const { data } = await api.get("/roles");
    return data.roles;
};

export const createRole = async (roleData) => {
    const { data } = await api.post("/roles", roleData);
    return data;
};

export const updateRole = async (id, updatedData) => {
    const { data } = await api.put(`/roles/${id}`, updatedData);
    return data;
};

export const deleteRole = async (id) => {
    const { data } = await api.delete(`/roles/${id}`);
    return data;
};