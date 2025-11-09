// components/AddEditModal.jsx
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getPeople } from '../../../features/people/services/personService';
import { getUsers } from '../../../features/users/services/userService';
import { getItems } from "../../../features/items/services/itemService";
import { getUnitConversionsByBaseUnit } from '../../../features/unit_conversions/services/unitConversionService';

const AddEditModal = ({ open, toggle, receiptData, isEditable, onSave }) => {
    const [people, setPeople] = useState([]);
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [unitConversions, setUnitConversions] = useState({});
    const [selectedItemId, setSelectedItemId] = useState('');

    const schema = yup.object({
        receipt_code: yup.string().required('Por favor ingrese el código de comprobante'),
        type: yup.string().required('Por favor ingrese el tipo de comprobante'),
        person_id: yup.string().required('Por favor ingrese la persona asociada al comprobante'),
        user_id: yup.string().required('Por favor ingrese el usuario que registra el comprobante'),
        description: yup.string().required('Por favor ingrese la descripción del comprobante'),
        created_at: yup.date().required('Por favor ingrese la fecha de registro'),
    });

    const {
        handleSubmit,
        setValue,
        reset,
        register,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'articulos',
    });

    useEffect(() => {
        getPeople().then(setPeople);
        getUsers().then(setUsers);
        getItems().then(setItems);
    }, []);

    useEffect(() => {
        if (receiptData) {
            setValue('receipt_code', receiptData.receipt_code);
            setValue('type', receiptData.type);
            setValue('person_id', receiptData.person_id);
            setValue('user_id', receiptData.user_id);
            setValue('description', receiptData.description);
            setValue('created_at', receiptData.created_at ? receiptData.created_at.split('T')[0] : '');
        } else {
            // Si no es edición, reseteamos todo para que quede vacío
            reset({
                receipt_code: '',
                type: '',
                person_id: '',
                user_id: '',
                description: '',
                created_at: '',
                articulos: [],  // vaciar array de artículos
            });
            setUnitConversions({}); // limpiar conversiones si quieres
        }
    }, [receiptData, reset, setValue]);

    useEffect(() => {
        if (!open) reset();
    }, [open, reset]);

    const handleAddItem = async () => {
        const selectedItem = items.find((item) => item.id === Number(selectedItemId));
        if (selectedItem) {
            append({
                item_id: selectedItem.id,
                name: selectedItem.name,
                quantity: 1,
                unit: selectedItem.unit_measurement,
                price: 0,
            });
            const conversions = await getUnitConversionsByBaseUnit(selectedItem.unit_measurement);
            setUnitConversions((prev) => ({
                ...prev,
                [fields.length]: conversions,
            }));
            setSelectedItemId('');
        }
    };

    const onSubmit = (data) => {
        onSave(data);
    };

    return (
        <Modal show={open} onHide={toggle} centered size="lg" scrollable={true} dialogClassName="modal-dialog-scrollable">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>{isEditable ? 'Editar' : 'Crear'} comprobante</Modal.Title>
                    <button type="button" className="btn-close" onClick={toggle}></button>
                </Modal.Header>

                <Modal.Body style={{ maxHeight: 'calc(100vh - 220px)', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    {/* CABECERA */}
                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group>
                                <Form.Label>Código de comprobante</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese código de compr."
                                    {...register('receipt_code')}
                                    isInvalid={!!errors.receipt_code}
                                />
                                <Feedback type="invalid">{errors.receipt_code?.message}</Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group>
                                <Form.Label>Tipo de movimiento</Form.Label>
                                <Form.Select {...register('type')} isInvalid={!!errors.type}>
                                    <option value="" hidden>Seleccionar</option>
                                    <option value="Compra">Compra</option>
                                    <option value="Venta">Venta</option>
                                    <option value="Ajuste">Ajuste</option>
                                </Form.Select>
                                <Feedback type="invalid">{errors.type?.message}</Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group>
                                <Form.Label>Tipo de comprobante</Form.Label>
                                <Form.Select {...register('description')} isInvalid={!!errors.description}>
                                    <option value="" hidden>Seleccionar</option>
                                    <option value="Boleta">Boleta</option>
                                    <option value="Factura">Factura</option>
                                    <option value="Liquidación de compra">Liquidación de compra</option>
                                    <option value="Nota de crédito">Nota de crédito</option>
                                    <option value="Nota de débito">Nota de débito</option>
                                    <option value="Guía de remisión">Guía de remisión</option>
                                    <option value="Acta de regularización">Acta de regularización</option>
                                    <option value="Saldo inicial">Saldo inicial</option>
                                </Form.Select>
                                <Feedback type="invalid">{errors.description?.message}</Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4} className="mb-3">
                            <Form.Group>
                                <Form.Label>Registrado por</Form.Label>
                                <Form.Select {...register('user_id')} isInvalid={!!errors.user_id}>
                                    <option value="" hidden>Seleccionar</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.person.name} {user.person.last_name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Feedback type="invalid">{errors.user_id?.message}</Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group>
                                <Form.Label>Cliente o proveedor</Form.Label>
                                <Form.Select {...register('person_id')} isInvalid={!!errors.person_id}>
                                    <option value="" hidden>Seleccionar</option>
                                    {people.map((person) => (
                                        <option key={person.id} value={person.id}>
                                            {person.name} {person.last_name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Feedback type="invalid">{errors.person_id?.message}</Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="mb-3">
                            <Form.Group>
                                <Form.Label>Fecha de registro</Form.Label>
                                <Form.Control
                                    type="date"
                                    {...register('created_at')}
                                    isInvalid={!!errors.created_at}
                                />
                                <Feedback type="invalid">{errors.created_at?.message}</Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* SECCIÓN DETALLE DE COMPROBANTE */}
                    <hr className="mb-3" />
                    <h6 className="fw-bold text-secondary mb-3">Detalle de comprobante</h6>

                    <Row className="align-items-end mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Seleccionar artículo</Form.Label>
                                <Form.Select
                                    value={selectedItemId}
                                    onChange={(e) => setSelectedItemId(e.target.value)}
                                >
                                    <option hidden>Seleccionar</option>
                                    {items.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Button
                                type="button"
                                variant="light"
                                className="w-100"
                                onClick={handleAddItem}
                            >
                                Añadir artículo
                            </Button>
                        </Col>
                    </Row>


                    {/* TABLA DE ARTÍCULOS */}
                    {fields.length > 0 && (
                        <div className="table-responsive border rounded shadow-sm mt-3">
                            <Table hover className="align-middle mb-0">
                                <thead className="table-light text-center align-middle">
                                    <tr>
                                        <th style={{ width: '35%' }}>Artículo</th>
                                        <th style={{ width: '10%' }}>Cantidad</th>
                                        <th style={{ width: '18%' }}>Unidad comercial</th>
                                        <th style={{ width: '16%' }}>Precio unitario</th>
                                        <th style={{ width: '20%' }}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fields.map((articulo, index) => (
                                        <tr key={articulo.id || index} className="bg-white">
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={articulo.name}
                                                    readOnly
                                                    size="sm"
                                                    className="bg-light border-0 fw-semibold"
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="number"
                                                    step="0.01"
                                                    min="1"
                                                    {...register(`articulos.${index}.quantity`, {
                                                        valueAsNumber: true,
                                                    })}
                                                    size="sm"
                                                    className="text-center"
                                                />
                                            </td>
                                            <td>
                                                <Form.Select
                                                    size="sm"
                                                    {...register(`articulos.${index}.unit`, {
                                                        required: true,
                                                    })}
                                                    defaultValue={articulo.unit}
                                                >
                                                    <option value={articulo.unit}>{articulo.unit}</option>

                                                    {(unitConversions[index] || [])
                                                        .filter((conv) => conv.unit !== articulo.unit)
                                                        .map((conversion) => (
                                                            <option key={conversion.id} value={conversion.comercial_unit}>
                                                                {conversion.comercial_unit}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Select>
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    placeholder="S/ 0.00"
                                                    {...register(`articulos.${index}.price`, {
                                                        valueAsNumber: true,
                                                    })}
                                                    size="sm"
                                                    className="text-center"
                                                />
                                            </td>
                                            <td className="text-center">
                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    className="rounded-pill px-3 py-1"
                                                    onClick={() => remove(index)}
                                                >
                                                    Quitar
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}


                    {/* BOTONES FINALES */}
                    <div className="d-flex justify-content-end gap-2 mt-3">
                        <Button variant="light" onClick={toggle}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="primary">
                            Guardar
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
};

export default AddEditModal;
