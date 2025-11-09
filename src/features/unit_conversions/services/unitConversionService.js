import api from "@/services/api";

export const getUnitConversions = async () => {
    const { data } = await api.get("/unit-conversions");
    return data.unit_conversions;
};

export const createUnitConversion = async (unitConversionData) => {
    const { data } = await api.post("/unit-conversions", unitConversionData);
    return data;
};

export const updateUnitConversion = async (id, updatedData) => {
    const { data } = await api.put(`/unit-conversions/${id}`, updatedData);
    return data;
};

export const deleteUnitConversion = async (id) => {
    const { data } = await api.delete(`/unit-conversions/${id}`);
    return data;
};

export const getUnitConversionsByBaseUnit = async (baseUnit) => {
    const { data } = await api.get(`/get-units/${baseUnit}`);
    return data.units;
}