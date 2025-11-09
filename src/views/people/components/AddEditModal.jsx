// components/AddEditModal.jsx
import React, { useEffect } from 'react';
import { Modal, Button, Form, Row, Col, FormGroup, FormLabel, FormControl, FormSelect } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const AddEditModal = ({ open, toggle, personData, isEditable, onSave }) => {
    const schema = yup.object({
        name: yup.string().required('Por favor ingrese el nombre de la persona'),
        last_name: yup.string().required('Por favor ingrese el apellido de la persona'),
        email: yup.string().required('Por favor ingrese el correo de la persona'),
        phone: yup.string().required('Por favor ingrese el telefono de la persona'),
        identification_type: yup.string().required('Por favor seleccione el tipo de identificacion de la persona'),
        identification_number: yup.string().required('Por favor ingrese el numero de identificacion de la persona'),
        type: yup.string().required('Por favor seleccione el tipo de persona'),
    });

    const { handleSubmit, setValue, reset, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        onSave(data);
    };

    useEffect(() => {
        if (personData) {
            setValue('name', personData.name);
            setValue('last_name', personData.last_name);
            setValue('email', personData.email);
            setValue('phone', personData.phone);
            setValue('identification_type', personData.identification_type);
            setValue('identification_number', personData.identification_number);
            setValue('type', personData.type);
        }
    }, [personData]);

    useEffect(() => {
        if (!open) reset();
    }, [open]);

    return (
        <Modal show={open} onHide={toggle} centered>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>{isEditable ? 'Editar' : 'Crear'} persona</Modal.Title>
                    <button type="button" className="btn-close" onClick={toggle}></button>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6} className="mb-3">
                            <FormGroup>
                                <FormLabel>Nombres</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese nombres"
                                    {...register('name')}
                                    isInvalid={!!errors.name}
                                />
                                <Feedback type="invalid">{errors.name?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        <Col md={6} className="mb-3">
                            <FormGroup>
                                <FormLabel>Apellidos</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese apellidos"
                                    {...register('last_name')}
                                    isInvalid={!!errors.last_name}
                                />
                                <Feedback type="invalid">{errors.last_name?.message}</Feedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <FormGroup>
                                <FormLabel>Correo electrónico</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese correo"
                                    {...register('email')}
                                    isInvalid={!!errors.email}
                                />
                                <Feedback type="invalid">{errors.email?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        <Col md={6} className="mb-3">
                            <FormGroup>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese teléfono"
                                    {...register('phone')}
                                    isInvalid={!!errors.phone}
                                />
                                <Feedback type="invalid">{errors.phone?.message}</Feedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <FormGroup>
                                <FormLabel>Tipo de identificación</FormLabel>
                                <FormSelect
                                    {...register('identification_type')}
                                    isInvalid={!!errors.identification_type}
                                >
                                    <option value="" hidden>Seleccionar</option>
                                    <option value="DNI">DNI</option>
                                    <option value="RUC">RUC</option>
                                </FormSelect>
                                <Feedback type="invalid">{errors.identification_type?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        <Col md={6} className="mb-3">
                            <FormGroup>
                                <FormLabel>Numero de identificación</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese el número de ident."
                                    {...register('identification_number')}
                                    isInvalid={!!errors.identification_number}
                                />
                                <Feedback type="invalid">{errors.identification_number?.message}</Feedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}  className="mb-3">
                            <FormGroup>
                                <FormLabel>Tipo de persona</FormLabel>
                                <FormSelect
                                    {...register('type')}
                                    isInvalid={!!errors.type}
                                >
                                    <option value="" hidden>Seleccionar</option>
                                    <option value="Cliente">Cliente</option>
                                    <option value="Proveedor">Proveedor</option>
                                    <option value="Usuario">Usuario</option>
                                </FormSelect>
                                <Feedback type="invalid">{errors.type?.message}</Feedback>
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


export default AddEditModal;
