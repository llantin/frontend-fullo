// components/AddEditModal.jsx
import React, { useEffect } from 'react';
import Select from 'react-select'
import { Modal, Button, Form, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const AddEditModal = ({ open, toggle, unitData, isEditable, onSave }) => {
    const schema = yup.object({
        name: yup.string().required('Por favor ingrese el nombre de la unidad de medida'),
        symbol: yup.string().required('Por favor ingrese el simbolo de la unidad de medida'),
        type: yup.string().required('Por favor ingrese el tipo de unidad de medida')
    });

    const { handleSubmit, setValue, reset, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        onSave(data);
    };

    useEffect(() => {
        if (unitData) {
            setValue('name', unitData.name);
            setValue('symbol', unitData.symbol);
            setValue('type', unitData.type);
        }
    }, [unitData]);

    useEffect(() => {
        if (!open) reset();
    }, [open]);

    return (
        <Modal show={open} onHide={toggle} centered>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>{isEditable ? 'Editar' : 'Crear'} unidad de medida</Modal.Title>
                    <button type="button" className="btn-close" onClick={toggle}></button>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <FormGroup className="mb-3">
                            <FormLabel>Nombre</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Nombre de la unidad de medida"
                                {...register('name')}
                                isInvalid={!!errors.name}
                            />
                            <Feedback type="invalid">{errors.name?.message}</Feedback>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Simbolo</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Simbolo de la unidad de medida"
                                {...register('symbol')}
                                isInvalid={!!errors.symbol}
                            />
                            <Feedback type="invalid">{errors.symbol?.message}</Feedback>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Tipo</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Tipo de la unidad de medida"
                                {...register('type')}
                                isInvalid={!!errors.type}
                            />
                            <Feedback type="invalid">{errors.type?.message}</Feedback>
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
