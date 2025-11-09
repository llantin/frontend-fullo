import api from "@/services/api";

export const getUnits = async () => {
    const { data } = await api.get("/units");
    return data.units;
};

export const createUnit = async (unitData) => {
    const { data } = await api.post("/units", unitData);
    return data;
};

export const updateUnit = async (id, updatedData) => {
    const { data } = await api.put(`/units/${id}`, updatedData);
    return data;
};

export const deleteUnit = async (id) => {
    const { data } = await api.delete(`/units/${id}`);
    return data;
};