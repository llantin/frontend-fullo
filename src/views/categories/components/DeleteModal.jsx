// components/DeleteCategoryModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteCategoryModal = ({ open, toggle, onConfirm, categoryName }) => {
    return (
        <Modal show={open} onHide={toggle} centered>
            <Modal.Header>
                <Modal.Title>Eliminar categoría</Modal.Title>
                <button type="button" className="btn-close" onClick={toggle}></button>
            </Modal.Header>

            <Modal.Body>
                <p>¿Estás seguro que deseas eliminar la categoría <strong>{categoryName}</strong>?</p>
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

export default DeleteCategoryModal;
