// src/views/movements/index.jsx
import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, Button } from "react-bootstrap";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import MovementTable from "@/views/movements/components/MovementTable";
import DeleteModal from "@/views/movements/components/DeleteModal";
import { useMovements } from "@/features/movements/hooks/useMovements";

const Index = () => {
  const { movements, loading, removeMovement } = useMovements();
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteMovement = (movement) => {
    setSelectedMovement(movement);
    setShowDelete(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
    setSelectedMovement(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedMovement) {
      try {
        await removeMovement(selectedMovement.id);
        handleCloseDelete();
      } catch (error) {
        console.error("Error al eliminar movimiento:", error);
      }
    }
  };

  if (loading) return <p>Cargando movimientos...</p>;

  return (
    <Container fluid>
      <PageBreadcrumb title="Movimientos" subtitle="Gestionar" />

      <Card className="mb-3">
        <CardBody>
          <MovementTable
            movements={movements}
            onDeleteMovement={handleDeleteMovement}
          />
        </CardBody>
      </Card>

      <DeleteModal
        open={showDelete}
        toggle={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default Index;
