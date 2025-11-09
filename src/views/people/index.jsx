import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Button } from 'react-bootstrap';
import { TbPlus } from 'react-icons/tb';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import PersonTable from '@/views/people/components/PersonTable';
import AddEditModal from '@/views/people/components/AddEditModal';
import DeleteModal from '@/views/people/components/DeleteModal';
import { usePeople } from '@/features/people/hooks/usePeople';

const Index = () => {
    const { people, loading, addPerson, editPerson, removePerson } = usePeople();
    const [showModal, setShowModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    const handleCreatePerson = () => {
        setSelectedPerson(null);
        setShowModal(true);
    };

    const handleEditPerson = (role) => {
        setSelectedPerson(role);
        setShowModal(true);
    };

    const handleDeletePerson = (role) => {
        setSelectedPerson(role);
        setShowDelete(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPerson(null);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setSelectedPerson(null);
    };

    const handleSavePerson = async (personData) => {
        try {
            if (selectedPerson) {
                await editPerson(selectedPerson.id, personData);
            } else {
                await addPerson(personData);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error al guardar persona:', error);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedPerson) {
            try {
                await removePerson(selectedPerson.id);
                handleCloseDelete();
            } catch (error) {
                console.error('Error al eliminar persona:', error);
            }
        }
    };

    if (loading) return <p>Cargando personas...</p>;

    return (
        <Container fluid>
            <PageBreadcrumb title="Personas" subtitle="Gestionar" />

            <Card className="mb-3">
                <CardBody>
                    <Button variant="primary" className="mb-3" onClick={handleCreatePerson}>
                        <TbPlus className="me-2" />
                        Registrar persona
                    </Button>

                    <PersonTable
                        people={people}
                        onEditPerson={handleEditPerson}
                        onDeletePerson={handleDeletePerson}
                    />
                </CardBody>
            </Card>

            <AddEditModal
                open={showModal}
                toggle={handleCloseModal}
                personData={selectedPerson}
                isEditable={!!selectedPerson}
                onSave={handleSavePerson}
            />

            <DeleteModal
                open={showDelete}
                toggle={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                personName={selectedPerson?.fullname}
            />
        </Container>
    );
};

export default Index;