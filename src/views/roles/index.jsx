import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Button } from 'react-bootstrap';
import { TbPlus } from 'react-icons/tb';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import RoleTable from '@/views/roles/components/RoleTable';
import AddEditModal from '@/views/roles/components/AddEditModal';
import DeleteModal from '@/views/roles/components/DeleteModal';
import { useRoles } from '@/features/roles/hooks/useRoles';

const Index = () => {
  const { roles, loading, addRole, editRole, removeRole } = useRoles();
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const handleCreateRole = () => {
    setSelectedRole(null);
    setShowModal(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleDeleteRole = (role) => {
    setSelectedRole(role);
    setShowDelete(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRole(null);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    setSelectedRole(null);
  };

  const handleSaveRole = async (roleData) => {
    try {
      if (selectedRole) {
        await editRole(selectedRole.id, roleData);
      } else {
        await addRole(roleData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar rol:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedRole) {
      try {
        await removeRole(selectedRole.id);
        handleCloseDelete();
      } catch (error) {
        console.error('Error al eliminar rol:', error);
      }
    }
  };

  if (loading) return <p>Cargando roles...</p>;

  return (
    <Container fluid>
      <PageBreadcrumb title="Roles" subtitle="Gestionar" />

      <Card className="mb-3">
        <CardBody>
          <Button variant="primary" className="mb-3" onClick={handleCreateRole}>
            <TbPlus className="me-2" />
            Registrar rol
          </Button>

          <RoleTable
            roles={roles}
            onEditRole={handleEditRole}
            onDeleteRole={handleDeleteRole}
          />
        </CardBody>
      </Card>

      <AddEditModal
        open={showModal}
        toggle={handleCloseModal}
        roleData={selectedRole}
        isEditable={!!selectedRole}
        onSave={handleSaveRole}
      />

      <DeleteModal
        open={showDelete}
        toggle={handleCloseDelete}
        onConfirm={handleConfirmDelete}
        roleName={selectedRole?.name}
      />
    </Container>
  );
};

export default Index;