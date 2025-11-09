import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Button } from 'react-bootstrap';
import { TbDownload } from 'react-icons/tb';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import InventoryTable from '@/views/inventory/components/InventoryTable';
import KardexModal from '@/views/inventory/components/KardexModal';
import { useInventory } from '@/features/inventory/hooks/useInventory';

const Index = () => {
    const { inventory, loading, exportInventory, exportKardexItem } = useInventory();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleExportInventory = async () => {
        try {
            await exportInventory();
        } catch (error) {
            console.error('Error al exportar inventario:', error);
        }
    };

    const handleExportKardex = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const handleSaveItem = async (exportData) => {
        try {
            await exportKardexItem(exportData);
            handleCloseModal();
        } catch (error) {
            console.error('Error al exportar kardex de artículo:', error);
        }
    };

    if (loading) return <p>Cargando inventario...</p>;

    return (
        <Container fluid>
            <PageBreadcrumb title="Inventario" subtitle="Gestionar" />

            <Card className="mb-3">
                <CardBody>
                    <Button variant="secondary" className="mb-3" onClick={handleExportInventory}>
                        <TbDownload className="me-2" />
                        Exportar inventario
                    </Button>

                    <InventoryTable
                        inventory={inventory}
                        onExportKardexItem={handleExportKardex}
                    />
                </CardBody>
            </Card>

            <KardexModal
                open={showModal}
                itemData={selectedItem}
                toggle={handleCloseModal}
                onSave={handleSaveItem}
            />

        </Container>
    );
};

export default Index;