import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUnitConversions, createUnitConversion, updateUnitConversion, deleteUnitConversion } from "../services/unitConversionService";

export const useUnitConversions = () => {
    const queryClient = useQueryClient();

    const { data: unitConversions = [], isLoading } = useQuery({
        queryKey: ['unitConversions'],
        queryFn: getUnitConversions,
        staleTime: 5 * 60 * 1000,
    });

    const addUnitConversionMutation = useMutation({
        mutationFn: createUnitConversion,
        onSuccess: (newUnitConversion) => {
            queryClient.setQueryData(['unitConversions'], (old = []) => [...old, newUnitConversion.unit_conversion]);
        },
    });

    const editUnitConversionMutation = useMutation({
        mutationFn: ({ id, data }) => updateUnitConversion(id, data),
        onSuccess: (updatedUnitConversion) => {
            queryClient.setQueryData(['unitConversions'], (old = []) =>
                old.map(c => c.id === updatedUnitConversion.unit_conversion.id ? updatedUnitConversion.unit_conversion : c)
            );
        },
    });

    const removeUnitConversionMutation = useMutation({
        mutationFn: deleteUnitConversion,
        onSuccess: (_, id) => {
            queryClient.setQueryData(['unitConversions'], (old = []) =>
                old.filter(c => c.id !== id)
            );
        },
    });

    return {
        unitConversions,
        loading: isLoading,
        addUnitConversion: (data) => addUnitConversionMutation.mutateAsync(data),
        editUnitConversion: (id, data) => editUnitConversionMutation.mutateAsync({ id, data }),
        removeUnitConversion: (id) => removeUnitConversionMutation.mutateAsync(id),
    };
};