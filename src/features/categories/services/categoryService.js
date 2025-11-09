import api from "@/services/api";

export const getCategories = async () => {
  const { data } = await api.get("/categories");
  return data.categories;
};

export const createCategory = async (categoryData) => {
  const { data } = await api.post("/categories", categoryData);
  return data;
};

export const updateCategory = async (id, updatedData) => {
  const { data } = await api.put(`/categories/${id}`, updatedData);
  return data;
};

export const deleteCategory = async (id) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};
