import React, { useState } from 'react';
import { Form, Row, Col, FormGroup, FormLabel, FormControl, Container, Card, Button, Alert } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { sendSupport } from '@/features/support/services/supportService';

const Index = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false); // ✅ controlar transición

    const schema = yup.object().shape({
        subject: yup.string().required("El asunto es obligatorio"),
        description: yup.string().required("La descripción es obligatoria"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                name: `${user.person.name} ${user.person.last_name}`,
                email: user.email,
                subject: data.subject,
                description: data.description,
            };

            const response = await sendSupport(payload);
            console.log("✅ Soporte enviado:", response);

            reset();
            setSuccessMessage("Tu consulta ha sido enviada con éxito");
            setErrorMessage("");
            setShowAlert(true);

            setTimeout(() => setShowAlert(false), 5000); // ✅ desaparece con fade
        } catch (error) {
            console.error("❌ Error al enviar soporte:", error);
            setErrorMessage("Hubo un problema al enviar tu consulta");
            setSuccessMessage("");
            setShowAlert(true);

            setTimeout(() => setShowAlert(false), 5000);
        }
    };

    return (
        <Container fluid>
            <PageBreadcrumb title="Soporte y asistencia" />
            <h5>Puedes enviar tu consulta al administrador del sistema. Se encargará de resolverla lo antes posible y te contactará por correo o WhatsApp.</h5>

            <Card className="mb-3">
                <Card.Body>
                    {/* ✅ Transición con fade */}
                    {successMessage && (
                        <Alert variant="success" show={showAlert} onClose={() => setShowAlert(false)} dismissible fade>
                            {successMessage}
                        </Alert>
                    )}
                    {errorMessage && (
                        <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible fade>
                            {errorMessage}
                        </Alert>
                    )}

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col sm={12}>
                                <FormGroup className="mb-3">
                                    <FormLabel>Nombre de usuario</FormLabel>
                                    <FormControl
                                        type="text"
                                        value={`${user.person.name} ${user.person.last_name}`}
                                        readOnly
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup className="mb-3">
                            <FormLabel>Asunto</FormLabel>
                            <FormControl
                                type="text"
                                placeholder="Asunto de la consulta"
                                {...register("subject")}
                                isInvalid={!!errors.subject}
                            />
                            <FormControl.Feedback type="invalid">
                                {errors.subject?.message}
                            </FormControl.Feedback>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <FormLabel>Descripción de la consulta</FormLabel>
                            <FormControl
                                as="textarea"
                                rows={4}
                                placeholder="Escribe tu consulta aquí..."
                                {...register("description")}
                                isInvalid={!!errors.description}
                            />
                            <FormControl.Feedback type="invalid">
                                {errors.description?.message}
                            </FormControl.Feedback>
                        </FormGroup>

                        <div className="d-flex justify-content-end">
                            <Button type="submit" variant="primary">
                                Enviar soporte
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Index;