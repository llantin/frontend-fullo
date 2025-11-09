import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/features/categories/services/categoryService';

export const useCategories = () => {
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });

  const addCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (newCategory) => {
      queryClient.setQueryData(['categories'], (old = []) => [...old, newCategory.category]);
    },
  });

  const editCategoryMutation = useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: (updatedCategory) => {
      queryClient.setQueryData(['categories'], (old = []) =>
        old.map(c => c.id === updatedCategory.category.id ? updatedCategory.category : c)
      );
    },
  });

  const removeCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['categories'], (old = []) =>
        old.filter(c => c.id !== id)
      );
    },
  });

  return {
    categories,
    loading: isLoading,
    addCategory: (data) => addCategoryMutation.mutateAsync(data),
    editCategory: (id, data) => editCategoryMutation.mutateAsync({ id, data }),
    removeCategory: (id) => removeCategoryMutation.mutateAsync(id),
  };
};