import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getReceipts, createReceipt, updateReceipt, deleteReceipt } from "../services/receiptService";

export const useReceipts = () => {
    const queryClient = useQueryClient();

    const { data: receipts = [], isLoading } = useQuery({
        queryKey: ['receipts'],
        queryFn: getReceipts,
        staleTime: 5 * 60 * 1000,
    });

    const addReceiptMutation = useMutation({
        mutationFn: createReceipt,
        onSuccess: (newReceipt) => {
            queryClient.setQueryData(['receipts'], (old = []) => [...old, newReceipt.receipt]);
        },
    });

    const editReceiptMutation = useMutation({
        mutationFn: ({ id, data }) => updateReceipt(id, data),
        onSuccess: (updatedReceipt) => {
            queryClient.setQueryData(['receipts'], (old = []) =>
                old.map(c => c.id === updatedReceipt.receipt.id ? updatedReceipt.receipt : c)
            );
        },
    });

    const removeReceiptMutation = useMutation({
        mutationFn: deleteReceipt,
        onSuccess: (_, id) => {
            queryClient.setQueryData(['receipts'], (old = []) =>
                old.filter(c => c.id !== id)
            );
        },
    });

    return {
        receipts,
        loading: isLoading,
        addReceipt: (data) => addReceiptMutation.mutateAsync(data),
        editReceipt: (id, data) => editReceiptMutation.mutateAsync({ id, data }),
        removeReceipt: (id) => removeReceiptMutation.mutateAsync(id),
    };
};