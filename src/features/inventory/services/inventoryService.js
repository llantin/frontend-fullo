import api from "@/services/api";

export const getInventory = async () => {
    const { data } = await api.get("/inventory");
    return data.inventory;
};
export const exportInventory = async () => {
    const response = await api.get('/export-inventory', {
        responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;

    const contentDisposition = response.headers['content-disposition'];
    let fechaHoy = new Date();
    let fileName = `Inventario Fullo ${fechaHoy.toISOString().split('T')[0]}.xlsx`;
    if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match && match[1]) fileName = match[1];
    }

    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

export const exportKardexItem = async (exportData) => {
    const response = await api.get(`/export-kardex/${exportData.item_id}/${exportData.init_date}/${exportData.end_date}`, {
        responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    const contentDisposition = response.headers['content-disposition'];
    let fileName = `Kardex - ${exportData.item_name}.xlsx`;
    if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match && match[1]) fileName = match[1];
    }
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};