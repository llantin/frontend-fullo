// components/AddEditModal.jsx
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, FormGroup, FormLabel, FormControl, FormSelect } from 'react-bootstrap';
import Feedback from 'react-bootstrap/Feedback';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getPersonUsers } from '../../../features/people/services/personService';
import { getRoles } from '../../../features/roles/services/roleService';

const AddEditModal = ({ open, toggle, userData, isEditable, onSave }) => {
    const [people, setPeople] = useState([]);
    const [roles, setRoles] = useState([]);

    const schema = yup.object({
        person_id: yup.string().required('Por favor seleccione a la persona tipo usuario'),
        username: yup.string().required('Por favor ingrese el nombre de usuario'),
        ...(isEditable ? {} : {
            password: yup.string().required('Por favor ingrese la contraseña'),
        }),
        role_id: yup.string().required('Por favor seleccione el rol de usuario'),
    });

    const { handleSubmit, setValue, reset, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        onSave(data);
    };

    useEffect(() => {
        getPersonUsers().then(res => setPeople(res));
        getRoles().then(res => setRoles(res));
    }, []);

    useEffect(() => {
        if (userData) {
            setValue('person_id', userData.person_id);
            setValue('username', userData.username);
            setValue('role_id', userData.role_id);
        }
    }, [userData]);

    useEffect(() => {
        if (!open) reset();
    }, [open]);

    return (
        <Modal show={open} onHide={toggle} centered>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Header>
                    <Modal.Title>{isEditable ? 'Editar' : 'Crear'} usuario</Modal.Title>
                    <button type="button" className="btn-close" onClick={toggle}></button>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col md={12} className="mb-3">
                            <FormGroup>
                                <FormLabel>Persona de tipo usuario</FormLabel>
                                <FormSelect {...register('person_id')} isInvalid={!!errors.person_id}>
                                    <option value="" hidden>Seleccionar</option>
                                    {people.map(person => (
                                        <option key={person.id} value={person.id}>
                                            {person.name} {person.last_name}
                                        </option>
                                    ))}
                                </FormSelect>
                                <Feedback type="invalid">{errors.person_id?.message}</Feedback>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={!isEditable ? 6 : 12} className="mb-3">
                            <FormGroup>
                                <FormLabel>Nombre de usuario</FormLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Ingrese nombre de usuario"
                                    autoComplete="new-username"
                                    {...register('username')}
                                    isInvalid={!!errors.username}
                                />
                                <Feedback type="invalid">{errors.username?.message}</Feedback>
                            </FormGroup>
                        </Col>
                        {!isEditable && (
                            <Col md={6} className="mb-3">
                                <FormGroup>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl
                                        type="password"
                                        placeholder="Ingrese contraseña"
                                        autoComplete="new-password"
                                        {...register('password')}
                                        isInvalid={!!errors.password}
                                    />
                                    <Feedback type="invalid">{errors.password?.message}</Feedback>
                                </FormGroup>
                            </Col>
                        )}
                    </Row>
                    <Row>
                        <Col md={12} className="mb-3">
                            <FormGroup>
                                <FormLabel>Rol asignado</FormLabel>
                                <FormSelect {...register('role_id')} isInvalid={!!errors.role_id}>
                                    <option value="" hidden>Seleccionar</option>
                                    {roles.map(role => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                </FormSelect>
                                <Feedback type="invalid">{errors.role_id?.message}</Feedback>
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