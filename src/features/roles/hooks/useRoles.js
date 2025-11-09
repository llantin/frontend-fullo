import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoles, createRole, updateRole, deleteRole } from "../services/roleService";

export const useRoles = () => {
    const queryClient = useQueryClient();

    const { data: roles = [], isLoading } = useQuery({
        queryKey: ['roles'],
        queryFn: getRoles,
        staleTime: 5 * 60 * 1000,
    });

    const addRoleMutation = useMutation({
        mutationFn: createRole,
        onSuccess: (newRole) => {
            queryClient.setQueryData(['roles'], (old = []) => [...old, newRole.role]);
        },
    });

    const editRoleMutation = useMutation({
        mutationFn: ({ id, data }) => updateRole(id, data),
        onSuccess: (updatedRole) => {
            queryClient.setQueryData(['roles'], (old = []) =>
                old.map(c => c.id === updatedRole.role.id ? updatedRole.role : c)
            );
        },
    });

    const removeRoleMutation = useMutation({
        mutationFn: deleteRole,
        onSuccess: (_, id) => {
            queryClient.setQueryData(['roles'], (old = []) =>
                old.filter(c => c.id !== id)
            );
        },
    });

    return {
        roles,
        loading: isLoading,
        addRole: (data) => addRoleMutation.mutateAsync(data),
        editRole: (id, data) => editRoleMutation.mutateAsync({ id, data }),
        removeRole: (id) => removeRoleMutation.mutateAsync(id),
    };
};