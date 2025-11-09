import React, { useState, useEffect } from 'react';
import { Container, Card, CardBody, Button } from 'react-bootstrap';
import { TbPlus } from 'react-icons/tb';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import ReceiptTable from '@/views/receipts/components/ReceiptTable';
import AddEditModal from '@/views/receipts/components/AddEditModal';
import DeleteModal from '@/views/receipts/components/DeleteModal';
import { useReceipts } from '@/features/receipts/hooks/useReceipts';

const Index = () => {
    const { receipts, loading, addReceipt, editReceipt, removeReceipt } = useReceipts();
    const [showModal, setShowModal] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [showDelete, setShowDelete] = useState(false);

    const handleCreateReceipt = () => {
        setSelectedReceipt(null);
        setShowModal(true);
    };

    const handleEditReceipt = (receipt) => {
        setSelectedReceipt(receipt);
        setShowModal(true);
    };

    const handleDeleteReceipt = (receipt) => {
        setSelectedReceipt(receipt);
        setShowDelete(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReceipt(null);
    };

    const handleCloseDelete = () => {
        setShowDelete(false);
        setSelectedReceipt(null);
    };

    const handleSaveReceipt = async (receiptData) => {
        try {
            if (selectedReceipt) {
                await editReceipt(selectedReceipt.id, receiptData);
                
            } else {
                await addReceipt(receiptData);
                console.log(JSON.stringify(receiptData));
            }
            handleCloseModal();
        } catch (error) {
            console.error('Error al guardar comprobante:', error);
        }
    };

    const handleConfirmDelete = async () => {
        if (selectedReceipt) {
            try {
                await removeReceipt(selectedReceipt.id);
                handleCloseDelete();
            } catch (error) {
                console.error('Error al eliminar comprobante:', error);
            }
        }
    };

    if (loading) return <p>Cargando comprobantes...</p>;

    return (
        <Container fluid>
            <PageBreadcrumb title="Comprobantes" subtitle="Gestionar" />

            <Card className="mb-3">
                <CardBody>
                    <Button variant="primary" className="mb-3" onClick={handleCreateReceipt}>
                        <TbPlus className="me-2" />
                        Registrar comprobante
                    </Button>

                    <ReceiptTable
                        receipts={receipts}
                        onEditReceipt={handleEditReceipt}
                        onDeleteReceipt={handleDeleteReceipt}
                    />
                </CardBody>
            </Card>

            <AddEditModal
                open={showModal}
                toggle={handleCloseModal}
                receiptData={selectedReceipt}
                isEditable={!!selectedReceipt}
                onSave={handleSaveReceipt}
            />

            <DeleteModal
                open={showDelete}
                toggle={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                receiptCode={selectedReceipt?.receipt_code}
            />
        </Container>
    );
};

export default Index;