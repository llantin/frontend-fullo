import React from 'react';
import AppLogo from '@/components/AppLogo';
import { currentYear } from '@/helpers';
import { Link } from "react-router";
import { Button, Card, Col, Container, Form, FormControl, FormLabel, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sendPasswordReset } from '@/features/auth/services/authService';

const Index = () => {
  const schema = yup.object().shape({
    email: yup.string().email("Correo inválido").required("El correo es obligatorio"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // 👇 Aquí defines el enlace de reset
      const payload = {
        email: data.email,
        reset_link: `${window.location.origin}/new-password`,
      };

      const response = await sendPasswordReset(payload);
      console.log("✅ Reset enviado:", response);

      alert("Se enviaron las instrucciones a tu correo");
      reset();
    } catch (error) {
      console.error("❌ Error al enviar reset:", error);
      alert("Hubo un problema al enviar el correo");
    }
  };

  return (
    <div className="auth-box overflow-hidden align-items-center d-flex">
      <Container>
        <Row className="justify-content-center">
          <Col xxl={4} md={6} sm={8}>

            <Card className="p-4">
              {/* Marca de agua */}
              <div className="position-absolute top-0 end-0" style={{ width: 180 }}>
                {/* SVG que ya tenías */}
              </div>

              <div className="auth-brand text-center mb-4">
                <AppLogo />
                <p className="text-muted w-lg-75 mt-3 mx-auto">
                  Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                </p>
              </div>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 form-group">
                  <FormLabel>
                    Correo electrónico <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    isInvalid={!!errors.email}
                  />
                  <FormControl.Feedback type="invalid">
                    {errors.email?.message}
                  </FormControl.Feedback>
                </div>

                <div className="d-grid">
                  <Button type="submit" className="btn btn-primary fw-semibold py-2">
                    Enviar instrucciones
                  </Button>
                </div>
              </Form>

              <p className="text-muted text-center mt-4 mb-0">
                Regresar a{" "}
                <Link to="/sign-in" className="text-decoration-underline link-offset-3 fw-semibold">
                  Iniciar sesión
                </Link>
              </p>
            </Card>

            <p className="text-center text-muted mt-4 mb-0">
              © {currentYear} Fullo
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
