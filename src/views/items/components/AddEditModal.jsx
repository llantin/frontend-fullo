import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, FormGroup, FormLabel, FormControl, FormSelect } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getCategories } from '../../../features/categories/services/categoryService';
import { getUnits } from '../../../features/units/services/unitService';

const AddEditModal = ({ open, toggle, itemData, isEditable, onSave }) => {
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);

    const schema = yup.object({
        image: yup.mixed().required('Por favor selecicone la imagen'),
        name: yup.string().required('Por favor ingrese el nombre'),
        description: yup.string().required('Por favor ingrese la descripcion'),
        price: yup.number().typeError('Por favor ingrese un precio válido').required('Por favor ingrese el precio'),
        brand: yup.string().required('Por favor ingrese la marca'),
        model: yup.string().required('Por favor ingrese el modelo'),
        unit_measurement: yup.string().required('Por favor ingrese la unidad de medida'),
        presentation: yup.string().required('Por favor ingrese la presentación'),
        minimum_stock: yup.string().required('Por favor ingrese el stock minimo'),
        maximum_stock: yup.string().required('Por favor ingrese el stock maximo'),
        category_id: yup.string().required('Por favor seleccione una categoría'),
    });

    const { handleSubmit, setValue, reset, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'image' && data[key] && data[key].length > 0) {
                formData.append(key, data[key][0]);
            } else if (key !== 'image') {
                formData.append(key, data[key]);
            }
        });
        onSave(formData);
    };

    useEffect(() => {
        getCategories().then(res => setCategories(res));
        getUnits().then(res => setUnits(res));
    }, []);

    useEffect(() => {
        if (itemData) {
            setValue('name', itemData.name);
            setValue('description', itemData.description);
            setValue('price', itemData.price);
            setValue('brand', itemData.brand);
            setValue('model', itemData.model);
            setValue('unit_measurement', itemData.unit_measurement);
            setValue('presentation', itemData.presentation);
            setValue('minimum_stock', itemData.minimum_stock);
            setValue('maximum_stock', itemData.maximum_stock);
            setValue('category_id', itemData.category_id);
        }
    }, [itemData]);

    useEffect(() => {
        if (!open) reset();
    }, [open]);

    return (
        <Modal show={open} onHide={toggle} centered>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>{isEditable ? 'Editar' : 'Crear'} articulo</Modal.Title>
                    <button type="button" className="btn-close" onClick={toggle}></button>
                </Modal.Header>

                <Modal.Body>
                    {!isEditable && (
                        <Col md={12} className="mb-3">
                            <FormGroup>
                                <FormLabel>Imagen de articulo</FormLabel>
                                <FormControl
                                    type="file"
                                    {...register('image')}
                                    isInvalid={!!errors.image}
                                />
                                <Feedback type="invalid">{errors.image?.message}</Feedback>
                            </FormGroup>
                        </Col>
                    )}
                    <Row>
                        <Col md={12} className="mb-3">
                            <FormGroup>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese nombre del articulo"
                                    {...register('name')}
                                    isInvalid={!!errors.name}
                                />
                                <Feedback type="invalid">{errors.name?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        <Col md={12} className="mb-3">
                            <FormGroup>
                                <FormLabel>Descripcion</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese descripcion del articulo"
                                    {...register('description')}
                                    isInvalid={!!errors.description}
                                />
                                <Feedback type="invalid">{errors.description?.message}</Feedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4} className="mb-3">
                            <FormGroup>
                                <FormLabel>Precio</FormLabel>
                                <FormControl
                                    type="number"
                                    placeholder="Ingrese precio"
                                    {...register('price')}
                                    isInvalid={!!errors.price}
                                    step="0.01"
                                />
                                <Feedback type="invalid">{errors.price?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        <Col md={4} className="mb-3">
                            <FormGroup>
                                <FormLabel>Marca</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese marca"
                                    {...register('brand')}
                                    isInvalid={!!errors.brand}
                                />
                                <Feedback type="invalid">{errors.brand?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        <Col md={4} className="mb-3">
                            <FormGroup>
                                <FormLabel>Modelo</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese modelo"
                                    {...register('model')}
                                    isInvalid={!!errors.model}
                                />
                                <Feedback type="invalid">{errors.model?.message}</Feedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <FormGroup>
                                <FormLabel>Unidad de medida</FormLabel>
                                <FormSelect {...register('unit_measurement')} isInvalid={!!errors.unit_measurement}>
                                    <option value="" hidden>Seleccionar</option>
                                    {units.map(unit => (
                                        <option key={unit.id} value={unit.symbol}>
                                            {unit.name} ({unit.symbol})
                                        </option>
                                    ))}
                                </FormSelect>
                                <Feedback type="invalid">{errors.unit_measurement?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        <Col md={6} className="mb-3">
                            <FormGroup>
                                <FormLabel>Presentación</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese presentación"
                                    {...register('presentation')}
                                    isInvalid={!!errors.presentation}
                                />
                                <Feedback type="invalid">{errors.presentation?.message}</Feedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className="mb-3">
                            <FormGroup>
                                <FormLabel>Stock minimo</FormLabel>
                                <FormControl
                                    type="number"
                                    placeholder="Ingrese stock minimo"
                                    {...register('minimum_stock')}
                                    isInvalid={!!errors.minimum_stock}
                                />
                                <Feedback type="invalid">{errors.minimum_stock?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        <Col md={6} className="mb-3">
                            <FormGroup>
                                <FormLabel>Stock maximo</FormLabel>
                                <FormControl
                                    type="number"
                                    placeholder="Ingrese stock maximo"
                                    {...register('maximum_stock')}
                                    isInvalid={!!errors.maximum_stock}
                                />
                                <Feedback type="invalid">{errors.maximum_stock?.message}</Feedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={12}>
                            <FormGroup>
                                <FormLabel>Categoría</FormLabel>
                                <FormSelect {...register('category_id')} isInvalid={!!errors.category_id}>
                                    <option value="" hidden>Seleccionar</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </FormSelect>
                                <Feedback type="invalid">{errors.category_id?.message}</Feedback>
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