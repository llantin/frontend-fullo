import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, FormGroup, FormLabel, FormControl, FormSelect } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const KardexModal = ({ open, toggle, itemData, onSave }) => {

    const schema = yup.object({
        init_date: yup.string().required('Por favor ingrese la fecha de inicio'),
        end_date: yup.string().required('Por favor ingrese la fecha de fin'),
    });

    const { handleSubmit, setValue, reset, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        onSave(data);
    };
    useEffect(() => {
        if (itemData) {
            setValue('item_id', itemData.id);
            setValue('item_name', itemData.name);
        }
    }, [itemData]);

    useEffect(() => {
        if (!open) reset();
    }, [open]);

    return (
        <Modal show={open} onHide={toggle} centered>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>Kardex de articulo</Modal.Title>
                    <button type="button" className="btn-close" onClick={toggle}></button>
                </Modal.Header>

                <Modal.Body>
                    <Row className="mb-3">
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Fecha de inicio</Form.Label>
                                <Form.Control
                                    type="date"
                                    {...register('init_date')}
                                    isInvalid={!!errors.init_date}
                                />
                                <Feedback type="invalid">{errors.init_date?.message}</Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Fecha de fin</Form.Label>
                                <Form.Control
                                    type="date"
                                    {...register('end_date')}
                                    isInvalid={!!errors.end_date}
                                />
                                <Feedback type="invalid">{errors.end_date?.message}</Feedback>
                            </Form.Group>
                        </Col>
                        <Form.Control
                            type="text"
                            {...register('item_id')}
                            isInvalid={!!errors.item_id}
                            hidden
                        />
                        <Form.Control
                            type="text"
                            {...register('item_name')}
                            isInvalid={!!errors.item_name}
                            hidden
                        />
                    </Row>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="light" onClick={toggle}>Cancelar</Button>
                        <Button type="submit" variant="primary">Exportar</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default KardexModal;