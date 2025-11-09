import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
const DeleteConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  selectedCount,
  itemName = 'row',
  confirmButtonVariant = 'danger',
  cancelButtonVariant = 'light',
  modalTitle = 'Confirmar eliminación',
  confirmButtonText = 'Eliminar',
  cancelButtonText = 'Cancelar',
  children
}) => {
  const getConfirmationMessage = () => {
    if (children) return children;
    if (selectedCount > 1) {
      return `Estas seguro que deseas eliminar ${selectedCount} ${itemName}s?`;
    }
    return `Estas seguro que deseas eliminar este ${itemName}?`;
  };
  return <Modal show={show} onHide={onHide} centered>
            <ModalHeader closeButton>
                <ModalTitle>{modalTitle}</ModalTitle>
            </ModalHeader>
            <ModalBody>{getConfirmationMessage()}</ModalBody>
            <ModalFooter>
                <Button variant={cancelButtonVariant} onClick={onHide}>
                    {cancelButtonText}
                </Button>
                <Button variant={confirmButtonVariant} onClick={onConfirm}>
                    {confirmButtonText}
                </Button>
            </ModalFooter>
        </Modal>;
};
export default DeleteConfirmationModal;