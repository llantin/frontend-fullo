import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Button } from 'react-bootstrap';
import { TbPlus } from 'react-icons/tb';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import UnitTable from '@/views/units/components/UnitTable';
import AddEditModal from '@/views/units/components/AddEditModal';
import DeleteModal from '@/views/units/components/DeleteModal';
import { useUnits } from '@/features/units/hooks/useUnits';

const Index = () => {
    const { units, loading, addUnit, editUnit, removeUnit } = useUnits();
    const [showModal, setShowModal] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    const handleCreateUnit = () => {
        setSelectedUnit(null);
        setShowModal(true);
    };

    const handleEditUnit = (unit) => {
        setSelectedUnit(unit);
        setShowModal(true);
    };

    const handleDeleteUnit = (unit) => {
        setSelectedUnit(unit);
        setShowDelete(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUnit(null);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setSelectedUnit(null);
    };

    const handleSaveUnit = async (unitData) => {
        try {
            if (selectedUnit) {
                await editUnit(selectedUnit.id, unitData);
            } else {
                await addUnit(unitData);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error al guardar unidad de medida:', error);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedUnit) {
            try {
                await removeUnit(selectedUnit.id);
                handleCloseDelete();
            } catch (error) {
                console.error('Error al eliminar unidad de medida:', error);
            }
        }
    };

    if (loading) return <p>Cargando unidades de medida...</p>;

    return (
        <Container fluid>
            <PageBreadcrumb title="Unidades de medida" subtitle="Gestionar" />

            <Card className="mb-3">
                <CardBody>
                    <Button variant="primary" className="mb-3" onClick={handleCreateUnit}>
                        <TbPlus className="me-2" />
                        Registrar unidad de medida
                    </Button>

                    <UnitTable
                        units={units}
                        onEditUnit={handleEditUnit}
                        onDeleteUnit={handleDeleteUnit}
                    />
                </CardBody>
            </Card>

            <AddEditModal
                open={showModal}
                toggle={handleCloseModal}
                unitData={selectedUnit}
                isEditable={!!selectedUnit}
                onSave={handleSaveUnit}
            />

            <DeleteModal
                open={showDelete}
                toggle={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                unitName={selectedUnit?.name}
            />
        </Container>
    );
};

export default Index;