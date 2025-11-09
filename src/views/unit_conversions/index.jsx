import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Button } from 'react-bootstrap';
import { TbPlus } from 'react-icons/tb';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import UnitConversionTable from '@/views/unit_conversions/components/UnitConversionTable';
import AddEditModal from '@/views/unit_conversions/components/AddEditModal';
import DeleteModal from '@/views/unit_conversions/components/DeleteModal';
import { useUnitConversions } from '@/features/unit_conversions/hooks/useUnitConversions';

const Index = () => {
    const { unitConversions, loading, addUnitConversion, editUnitConversion, removeUnitConversion } = useUnitConversions();
    const [showModal, setShowModal] = useState(false);
    const [selectedUnitConversion, setSelectedUnitConversion] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    const handleCreateUnitConversion = () => {
        setSelectedUnitConversion(null);
        setShowModal(true);
    };

    const handleEditUnitConversion = (unit) => {
        setSelectedUnitConversion(unit);
        setShowModal(true);
    };

    const handleDeleteUnitConversion = (unit) => {
        setSelectedUnitConversion(unit);
        setShowDelete(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUnitConversion(null);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setSelectedUnitConversion(null);
    };

    const handleSaveUnitConversion = async (unitData) => {
        try {
            if (selectedUnitConversion) {
                await editUnitConversion(selectedUnitConversion.id, unitData);
            } else {
                await addUnitConversion(unitData);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error al guardar unidad de medida:', error);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedUnitConversion) {
            try {
                await removeUnitConversion(selectedUnitConversion.id);
                handleCloseDelete();
            } catch (error) {
                console.error('Error al eliminar unidad de medida:', error);
            }
        }
    };

    if (loading) return <p>Cargando unidades de medida...</p>;

    return (
        <Container fluid>
            <PageBreadcrumb title="Conversión de unidades" subtitle="Gestionar" />

            <Card className="mb-3">
                <CardBody>
                    <Button variant="primary" className="mb-3" onClick={handleCreateUnitConversion}>
                        <TbPlus className="me-2" />
                        Registrar conversión de unidad
                    </Button>

                    <UnitConversionTable
                        unitConversions={unitConversions}
                        onEditUnitConversion={handleEditUnitConversion}
                        onDeleteUnitConversion={handleDeleteUnitConversion}
                    />
                </CardBody>
            </Card>

            <AddEditModal
                open={showModal}
                toggle={handleCloseModal}
                unitConversionData={selectedUnitConversion}
                isEditable={!!selectedUnitConversion}
                onSave={handleSaveUnitConversion}
            />

            <DeleteModal
                open={showDelete}
                toggle={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                unitConversionName={selectedUnitConversion?.name}
            />
        </Container>
    );
};

export default Index;