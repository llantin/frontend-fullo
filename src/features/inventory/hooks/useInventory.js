import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getInventory, exportInventory, exportKardexItem } from "../services/inventoryService";

export const useInventory = () => {
    const queryClient = useQueryClient();

    const { data: inventory = [], isLoading } = useQuery({
        queryKey: ['inventory'],
        queryFn: getInventory,
        staleTime: 5 * 60 * 1000,
    });

    const exportInventoryMutation = useMutation({
        mutationFn: exportInventory,
    });

    const exportKardexItemMutation = useMutation({
        mutationFn: exportKardexItem,
    });

    return {
        inventory,
        loading: isLoading,
        exportInventory: () => exportInventoryMutation.mutateAsync(),
        exportKardexItem: (data) => exportKardexItemMutation.mutateAsync(data),
    };
};