import AppLogo from '@/components/AppLogo';
import OTPInput from '@/components/OTPInput';
import PasswordInputWithStrength from '@/components/PasswordInputWithStrength';
import { currentYear } from '@/helpers';
import { Link } from "react-router";
import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router";
import { Button, Card, Col, Container, Form, FormControl, FormLabel, Row } from 'react-bootstrap';
import { resetPassword } from '@/features/auth/services/authService';

const Index = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("code");

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState(Array(6).fill(''));

  // Llenar OTP automáticamente si hay token
  useEffect(() => {
    if (token) {
      const tokenArray = token.split('').slice(0, 6);
      while (tokenArray.length < 6) tokenArray.push('');
      setCode(tokenArray);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación simple de contraseña
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const payload = {
        email,
        token: code.join(''),
        password
      };

      const data = await resetPassword(payload);

      // Aquí manejas la respuesta del backend
      alert(data.message || "Contraseña actualizada correctamente!");
      window.location.href = "/sign-in";

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Error al actualizar la contraseña");
    }
  };

  return (
    <div className="auth-box overflow-hidden align-items-center d-flex">
      <Container>
        <Row className="justify-content-center">
          <Col xxl={4} md={6} sm={8}>
            <Card className="p-4 position-relative">
              <div className="position-absolute top-0 end-0" style={{ width: 180, opacity: 0.075 }}>
                {/* SVG decorativo */}
                <svg width={600} height={560} viewBox="0 0 600 560" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* ... tu SVG aquí ... */}
                </svg>
              </div>

              <div className="auth-brand text-center mb-4">
                <AppLogo />
                <p className="text-muted w-lg-75 mt-3 mx-auto">
                  Te hemos enviado un código de 6 dígitos a tu correo electrónico.
                </p>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* Email */}
                <div className="mb-3 form-group">
                  <FormLabel htmlFor="userEmail">
                    Correo electrónico <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="email"
                    id="userEmail"
                    placeholder="you@example.com"
                    disabled
                    value={email || ''}
                  />
                </div>

                {/* OTP */}
                <div className="mb-3 form-group">
                  <OTPInput code={code} setCode={setCode} label="Ingresa tu código de 6 dígitos" />
                </div>

                {/* Nueva contraseña */}
                <div className="mb-3">
                  <PasswordInputWithStrength
                    id="userPassword"
                    label="Nueva contraseña"
                    name="user-password"
                    password={password}
                    setPassword={setPassword}
                    placeholder="••••••••"
                  />
                </div>

                {/* Confirmar contraseña */}
                <div className="mb-3 form-group">
                  <FormLabel htmlFor="userNewPassword">
                    Confirma la nueva contraseña <span className="text-danger">*</span>
                  </FormLabel>
                  <FormControl
                    type="password"
                    id="userNewPassword"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <Button type="submit" className="btn btn-primary fw-semibold py-2">
                    Actualizar contraseña
                  </Button>
                </div>
              </Form>

              <p className="mt-4 text-muted text-center mb-0">
                Regresar a{' '}
                <Link to="/auth-1/sign-in" className="text-decoration-underline link-offset-3 fw-semibold">
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
