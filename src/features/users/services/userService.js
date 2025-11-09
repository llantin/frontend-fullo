import api from "@/services/api";

export const getUsers = async () => {
    const { data } = await api.get("/users");
    return data.users;
};

export const createUser = async (userData) => {
    const { data } = await api.post("/users", userData);
    return data;
};

export const updateUser = async (id, updatedData) => {
    const { data } = await api.put(`/users/${id}`, updatedData);
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
};