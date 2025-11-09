// components/AddEditModal.jsx
import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { Modal, Button, Form, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getModules } from '../../../features/modules/services/moduleService';

const AddEditModal = ({ open, toggle, roleData, isEditable, onSave }) => {
  const schema = yup.object({
    name: yup.string().required('Por favor ingrese el nombre del rol'),
    description: yup.string().required('Por favor ingrese la descripción del rol'),
    modules: yup.array().min(1, 'Seleccione al menos un módulo')
  });

  const { handleSubmit, setValue, reset, register, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const [modules, setModules] = useState([]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      modules: data.modules.map(m => m.value),
    };
    onSave(payload);
  };

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await getModules();
        if (res) {
          setModules(
            res.map(m => ({
              value: m.id,
              label: m.name
            }))
          );
        }
      } catch (error) {
        console.error("Error cargando módulos:", error);
      }
    };

    if (open) fetchModules();
  }, [open]);

  useEffect(() => {
    if (roleData) {
      reset({
        name: roleData.name || "",
        description: roleData.description || "",
        modules: roleData.modules
          ? roleData.modules.map(m => ({ value: m.id, label: m.name }))
          : [],
      });
    } else {
      reset({
        name: "",
        description: "",
        modules: [],
      });
    }
  }, [roleData, reset, open]);

  return (
    <Modal show={open} onHide={toggle} centered>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Modal.Title>{isEditable ? 'Editar' : 'Crear'} rol</Modal.Title>
          <button type="button" className="btn-close" onClick={toggle}></button>
        </Modal.Header>

        <Modal.Body>
          <Row>

            <FormGroup className="mb-3">
              <FormLabel>Nombre</FormLabel>
              <FormControl
                type="text"
                placeholder="Nombre del rol"
                {...register('name')}
                isInvalid={!!errors.name}
              />
              <Feedback type="invalid">{errors.name?.message}</Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Descripción</FormLabel>
              <FormControl
                type="text"
                placeholder="Descripción del rol"
                {...register('description')}
                isInvalid={!!errors.description}
              />
              <Feedback type="invalid">{errors.description?.message}</Feedback>
            </FormGroup>



              <FormGroup className="mb-3">
                <FormLabel>Modulos permitidos</FormLabel>
                <Select
                  options={modules}
                  isMulti
                  placeholder="Seleccione"
                  value={watch('modules')}
                  onChange={(selected) => setValue('modules', selected)}
                />
                <Feedback type="invalid">{errors.modules?.message}</Feedback>
              </FormGroup>

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

export default AddEditModal;
