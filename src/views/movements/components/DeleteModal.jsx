import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteModal = ({ open, toggle, onConfirm }) => {
  return (
    <Modal show={open} onHide={toggle} centered>
      <Modal.Header>
        <Modal.Title>Eliminar movimiento</Modal.Title>
        <button type="button" className="btn-close" onClick={toggle}></button>
      </Modal.Header>

      <Modal.Body>
        <p>¿Seguro que deseas eliminar este movimiento?</p>
        <div className="d-flex justify-content-end gap-2 mt-3">
          <Button variant="light" onClick={toggle}>Cancelar</Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              toggle();
            }}
          >
            Eliminar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
