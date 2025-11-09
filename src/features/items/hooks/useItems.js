import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getItems, createItem, updateItem, deleteItem } from "../services/itemService";

export const useItems = () => {
    const queryClient = useQueryClient();

    const { data: items = [], isLoading } = useQuery({
        queryKey: ['items'],
        queryFn: getItems,
        staleTime: 5 * 60 * 1000,
    });

    const addItemMutation = useMutation({
        mutationFn: createItem,
        onSuccess: (newItem) => {
            queryClient.setQueryData(['items'], (old = []) => [...old, newItem.item]);
        },
    });

    const editItemMutation = useMutation({
        mutationFn: ({ id, data }) => updateItem(id, data),
        onSuccess: (updatedItem) => {
            queryClient.setQueryData(['items'], (old = []) =>
                old.map(c => c.id === updatedItem.item.id ? updatedItem.item : c)
            );
        },
    });

    const removeItemMutation = useMutation({
        mutationFn: deleteItem,
        onSuccess: (_, id) => {
            queryClient.setQueryData(['items'], (old = []) =>
                old.filter(c => c.id !== id)
            );
        },
    });

    return {
        items,
        loading: isLoading,
        addItem: (data) => addItemMutation.mutateAsync(data),
        editItem: (id, data) => editItemMutation.mutateAsync({ id, data }),
        removeItem: (id) => removeItemMutation.mutateAsync(id),
    };
};