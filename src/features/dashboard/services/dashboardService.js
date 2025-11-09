import api from "@/services/api";

export const getStats = async () => {
    const { data } = await api.get("/dashboard/stats");
    return data.stats;
};
export const getChartStats = async () => {
    const { data } = await api.get("/dashboard/chart-stats");
    return data.chart_stats;
};
export const getCircleStats = async () => {
    const { data } = await api.get("/dashboard/circle-stats");
    return data.circle_stats;
};

export const getLastMovements = async () => {
    const { data } = await api.get("/dashboard/last-movements");
    return data.last_movements;
};

export const getItemsWithMostMovements = async () => {
    const { data } = await api.get("/dashboard/items-most-movements");
    return data.items_with_most_movements;
};

export const getMovementFlow = async () => {
    const { data } = await api.get("/dashboard/movement-flow");
    return data.movement_flow;
};

