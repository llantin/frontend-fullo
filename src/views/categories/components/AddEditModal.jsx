// components/AddEditCategoryModal.jsx
import React, { useEffect } from 'react';
import { Modal, Button, Form, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const AddEditCategoryModal = ({ open, toggle, categoryData, isEditable, onSave }) => {
  const schema = yup.object({
    name: yup.string().required('Por favor ingrese el nombre de la categoría'),
    description: yup.string().required('Por favor ingrese la descripción'),
  });

  const { handleSubmit, reset, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  useEffect(() => {
    if (categoryData) {
      reset({
        name: categoryData.name || "",
        description: categoryData.description || "",
      });
    } else {
      reset({
        name: "",
        description: "",
      });
    }
  }, [categoryData, reset, open]);

  return (
    <Modal show={open} onHide={toggle} centered>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>{isEditable ? 'Editar' : 'Crear'} categoría</Modal.Title>
          <button type="button" className="btn-close" onClick={toggle}></button>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col sm={12}>
              <FormGroup className="mb-3">
                <FormLabel>Nombre</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Nombre de la categoría"
                  {...register('name')}
                  isInvalid={!!errors.name}
                />
                <Feedback type="invalid">{errors.name?.message}</Feedback>
              </FormGroup>

              <FormGroup className="mb-3">
                <FormLabel>Descripción</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Descripción"
                  {...register('description')}
                  isInvalid={!!errors.description}
                />
                <Feedback type="invalid">{errors.description?.message}</Feedback>
              </FormGroup>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="light" onClick={toggle}>Cancelar</Button>
            <Button type="submit" variant="primary">Guardar</Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddEditCategoryModal;
