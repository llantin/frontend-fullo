import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPeople, createPerson, updatePerson, deletePerson } from "../services/personService";

export const usePeople = () => {
    const queryClient = useQueryClient();

    const { data: people = [], isLoading } = useQuery({
        queryKey: ['people'],
        queryFn: getPeople,
        staleTime: 5 * 60 * 1000,
    });

    const addPersonMutation = useMutation({
        mutationFn: createPerson,
        onSuccess: (newPerson) => {
            queryClient.setQueryData(['people'], (old = []) => [...old, newPerson.person]);
        },
    });

    const editPersonMutation = useMutation({
        mutationFn: ({ id, data }) => updatePerson(id, data),
        onSuccess: (updatedPerson) => {
            queryClient.setQueryData(['people'], (old = []) =>
                old.map(c => c.id === updatedPerson.person.id ? updatedPerson.person : c)
            );
        },
    });

    const removePersonMutation = useMutation({
        mutationFn: deletePerson,
        onSuccess: (_, id) => {
            queryClient.setQueryData(['people'], (old = []) =>
                old.filter(c => c.id !== id)
            );
        },
    });

    return {
        people,
        loading: isLoading,
        addPerson: (data) => addPersonMutation.mutateAsync(data),
        editPerson: (id, data) => editPersonMutation.mutateAsync({ id, data }),
        removePerson: (id) => removePersonMutation.mutateAsync(id),
    };
};