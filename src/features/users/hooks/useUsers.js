import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";

export const useUsers = () => {
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        staleTime: 5 * 60 * 1000,
    });

    const addUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: (newUser) => {
            queryClient.setQueryData(['users'], (old = []) => [...old, newUser.user]);
        },
    });

    const editUserMutation = useMutation({
        mutationFn: ({ id, data }) => updateUser(id, data),
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['users'], (old = []) =>
                old.map(c => c.id === updatedUser.user.id ? updatedUser.user : c)
            );
        },
    });

    const removeUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: (_, id) => {
            queryClient.setQueryData(['users'], (old = []) =>
                old.filter(c => c.id !== id)
            );
        },
    });

    return {
        users,
        loading: isLoading,
        addUser: (data) => addUserMutation.mutateAsync(data),
        editUser: (id, data) => editUserMutation.mutateAsync({ id, data }),
        removeUser: (id) => removeUserMutation.mutateAsync(id),
    };
};