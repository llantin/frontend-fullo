import api from "@/services/api";

export const getReceipts = async () => {
    const { data } = await api.get("/receipts");
    return data.receipts;
};

export const createReceipt = async (receiptData) => {
    const { data } = await api.post("/receipts", receiptData);
    return data;
};

export const updateReceipt = async (id, updatedData) => {
    const { data } = await api.put(`/receipts/${id}`, updatedData);
    return data;
};

export const deleteReceipt = async (id) => {
    const { data } = await api.delete(`/receipts/${id}`);
    return data;
};