// components/AddEditModal.jsx
import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { Modal, Button, Form, Row, Col, FormGroup, FormLabel, FormControl, FormSelect } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getUnits } from '../../../features/units/services/unitService';


const AddEditModal = ({ open, toggle, unitConversionData, isEditable, onSave }) => {
    const [units, setUnits] = useState([]);

    const schema = yup.object({
        comercial_unit: yup.string().required('Por favor ingrese el valor de la unidad comercial'),
        base_unit: yup.string().required('Por favor seleccione la unidad de medida base'),
        conversion_factor: yup.string().required('Por favor ingrese el valor de factor de conversión')
    });

    const { handleSubmit, setValue, reset, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        onSave(data);
    };

    useEffect(() => {
        getUnits().then(res => setUnits(res));
    }, []);

    useEffect(() => {
        if (unitConversionData) {
            setValue('comercial_unit', unitConversionData.comercial_unit);
            setValue('base_unit', unitConversionData.base_unit);
            setValue('conversion_factor', unitConversionData.conversion_factor);
        }
    }, [unitConversionData]);

    useEffect(() => {
        if (!open) reset();
    }, [open]);

    return (
        <Modal show={open} onHide={toggle} centered>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>{isEditable ? 'Editar' : 'Crear'} conversión de unidad</Modal.Title>
                    <button type="button" className="btn-close" onClick={toggle}></button>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <FormLabel>Unidad de medida base</FormLabel>
                                <FormSelect {...register('base_unit')} isInvalid={!!errors.base_unit}>
                                    <option value="" hidden>Seleccionar</option>
                                    {units.map(unit => (
                                        <option key={unit.id} value={unit.symbol}>
                                            {unit.symbol}
                                        </option>
                                    ))}
                                </FormSelect>
                                <Feedback type="invalid">{errors.base_unit?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup className="mb-3">
                                <FormLabel>Unidad comercial</FormLabel>
                                <FormSelect {...register('comercial_unit')} isInvalid={!!errors.comercial_unit}>
                                    <option value="" hidden>Seleccionar</option>
                                    {units.map(unit => (
                                        <option key={unit.id} value={unit.symbol}>
                                            {unit.symbol}
                                        </option>
                                    ))}
                                </FormSelect>
                                <Feedback type="invalid">{errors.comercial_unit?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        <FormGroup className="mb-3">
                            <FormLabel>Factor de conversión</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Valor de factor de conversión"
                                {...register('conversion_factor')}
                                isInvalid={!!errors.conversion_factor}
                            />
                            <Feedback type="invalid">{errors.conversion_factor?.message}</Feedback>
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
