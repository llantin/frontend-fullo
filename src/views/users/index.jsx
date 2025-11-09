import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Button } from 'react-bootstrap';
import { TbPlus } from 'react-icons/tb';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import UserTable from '@/views/users/components/UserTable';
import AddEditModal from '@/views/users/components/AddEditModal';
import DeleteModal from '@/views/users/components/DeleteModal';
import { useUsers } from '@/features/users/hooks/useUsers';

const Index = () => {
    const { users, loading, addUser, editUser, removeUser } = useUsers();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    const handleCreateUser = () => {
        setSelectedUser(null);
        setShowModal(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDelete(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setSelectedUser(null);
    };

    const handleSaveUser = async (userData) => {
        try {
            if (selectedUser) {
                if (!userData.password) delete userData.password;
                await editUser(selectedUser.id, userData);
            } else {
                await addUser(userData);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error al guardar usuario:', error);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedUser) {
            try {
                await removeUser(selectedUser.id);
                handleCloseDelete();
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
            }
        }
    };

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <Container fluid>
            <PageBreadcrumb title="Usuarios" subtitle="Gestionar" />

            <Card className="mb-3">
                <CardBody>
                    <Button variant="primary" className="mb-3" onClick={handleCreateUser}>
                        <TbPlus className="me-2" />
                        Registrar usuario
                    </Button>

                    <UserTable
                        users={users}
                        onEditUser={handleEditUser}
                        onDeleteUser={handleDeleteUser}
                    />
                </CardBody>
            </Card>

            <AddEditModal
                open={showModal}
                toggle={handleCloseModal}
                userData={selectedUser}
                isEditable={!!selectedUser}
                onSave={handleSaveUser}
            />

            <DeleteModal
                open={showDelete}
                toggle={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                userName={selectedUser?.fullname}
            />
        </Container>
    );
};

export default Index;