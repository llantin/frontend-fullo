import api from "@/services/api";

export const getItems = async () => {
    const { data } = await api.get("/items");
    return data.items;
};

export const createItem = async (itemData) => {
    const { data } = await api.post("/items", itemData);
    return data;
};

export const updateItem = async (id, updatedData) => {
    const { data } = await api.put(`/items/${id}`, updatedData);
    return data;
};

export const deleteItem = async (id) => {
    const { data } = await api.delete(`/items/${id}`);
    return data;
};