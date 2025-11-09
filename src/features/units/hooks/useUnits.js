import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUnits, createUnit, updateUnit, deleteUnit } from "../services/unitService";

export const useUnits = () => {
    const queryClient = useQueryClient();

    const { data: units = [], isLoading } = useQuery({
        queryKey: ['units'],
        queryFn: getUnits,
        staleTime: 5 * 60 * 1000,
    });

    const addUnitMutation = useMutation({
        mutationFn: createUnit,
        onSuccess: (newUnit) => {
            queryClient.setQueryData(['units'], (old = []) => [...old, newUnit.unit]);
        },
    });

    const editUnitMutation = useMutation({
        mutationFn: ({ id, data }) => updateUnit(id, data),
        onSuccess: (updatedUnit) => {
            queryClient.setQueryData(['units'], (old = []) =>
                old.map(c => c.id === updatedUnit.unit.id ? updatedUnit.unit : c)
            );
        },
    });

    const removeUnitMutation = useMutation({
        mutationFn: deleteUnit,
        onSuccess: (_, id) => {
            queryClient.setQueryData(['units'], (old = []) =>
                old.filter(c => c.id !== id)
            );
        },
    });

    return {
        units,
        loading: isLoading,
        addUnit: (data) => addUnitMutation.mutateAsync(data),
        editUnit: (id, data) => editUnitMutation.mutateAsync({ id, data }),
        removeUnit: (id) => removeUnitMutation.mutateAsync(id),
    };
};