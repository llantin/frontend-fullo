import api from "@/services/api";

export const getMovements = async () => {
  const { data } = await api.get("/movements");
  return data.movements;
};

export const deleteMovement = async (id) => {
  await api.delete(`/movements/${id}`);
};
