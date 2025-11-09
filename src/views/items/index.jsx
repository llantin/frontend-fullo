import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Button } from 'react-bootstrap';
import { TbPlus } from 'react-icons/tb';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import ItemTable from '@/views/items/components/ItemTable';
import AddEditModal from '@/views/items/components/AddEditModal';
import DeleteModal from '@/views/items/components/DeleteModal';
import { useItems } from '@/features/items/hooks/useItems';

const Index = () => {
    const { items, loading, addItem, editItem, removeItem } = useItems();
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    const handleCreateItem = () => {
        setSelectedItem(null);
        setShowModal(true);
    };

    const handleEditItem = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleDeleteItem = (item) => {
        setSelectedItem(item);
        setShowDelete(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setSelectedItem(null);
    };

    const handleSaveItem = async (itemData) => {
        try {
            if (selectedItem) {
                await editItem(selectedItem.id, itemData);
            } else {
                await addItem(itemData);
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error al guardar artículo:', error);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedItem) {
            try {
                await removeItem(selectedItem.id);
                handleCloseDelete();
            } catch (error) {
                console.error('Error al eliminar artículo:', error);
            }
        }
    };

    if (loading) return <p>Cargando artículos...</p>;

    return (
        <Container fluid>
            <PageBreadcrumb title="Artículos" subtitle="Gestionar" />

            <Card className="mb-3">
                <CardBody>
                    <Button variant="primary" className="mb-3" onClick={handleCreateItem}>
                        <TbPlus className="me-2" />
                        Registrar articulo
                    </Button>

                    <ItemTable
                        items={items}
                        onEditItem={handleEditItem}
                        onDeleteItem={handleDeleteItem}
                    />
                </CardBody>
            </Card>

            <AddEditModal
                open={showModal}
                toggle={handleCloseModal}
                itemData={selectedItem}
                isEditable={!!selectedItem}
                onSave={handleSaveItem}
            />

            <DeleteModal
                open={showDelete}
                toggle={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                itemName={selectedItem?.name}
            />
        </Container>
    );
};

export default Index;