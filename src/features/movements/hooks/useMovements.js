import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMovements, deleteMovement } from "@/features/movements/services/movementsService";

export const useMovements = () => {
  const queryClient = useQueryClient();

  const { data: movements = [], isLoading } = useQuery({
    queryKey: ['movements'],
    queryFn: getMovements,
    staleTime: 5 * 60 * 1000,
  });


  const removeMovementMutation = useMutation({
    mutationFn: deleteMovement,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['movements'], (old = []) =>
        old.filter(c => c.id !== id)
      );
    },
  });

  return {
    movements,
    loading: isLoading,
    removeMovement: (id) => removeMovementMutation.mutateAsync(id),
  };
};
