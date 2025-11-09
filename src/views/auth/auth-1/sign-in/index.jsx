// pages/AuthIndex.jsx
import React, { useState } from 'react';
import AppLogo from '@/components/AppLogo';
import { currentYear } from '@/helpers';
import { Link, useNavigate } from 'react-router';
import { Button, Card, Col, Container, Form, FormControl, FormLabel } from 'react-bootstrap';
import { login } from '@/features/auth/services/authService';

const Index = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login(form);
      if (data.status) {
        // Guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        // Redirigir a dashboard
        navigate('/dashboard');
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-box overflow-hidden align-items-center d-flex" style={{ minHeight: '100vh' }}>
      <Container>
        <Col xxl={4} md={6} sm={8} className="mx-auto">
          <Card className="p-4">

            <div className="auth-brand text-center mb-4">
              <AppLogo />
              <p className="text-muted w-lg-75 mt-3 mx-auto">Ingresa tus credenciales para acceder a tu cuenta.</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <div className="mb-3 form-group">
                <FormLabel>
                  Nombre de usuario <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Nombre de usuario"
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3 form-group">
                <FormLabel>
                  Contraseña <span className="text-danger">*</span>
                </FormLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>

              {error && <p className="text-danger">{error}</p>}

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/reset-password" className="text-decoration-underline link-offset-3 text-muted">
                  Olvidaste tu contraseña?
                </Link>
              </div>

              <div className="d-grid">
                <Button type="submit" className="btn-primary fw-semibold py-2" disabled={loading}>
                  {loading ? 'Ingresando...' : 'Iniciar sesión'}
                </Button>
              </div>
            </Form>

          </Card>

          <p className="text-center text-muted mt-4 mb-0">
            © {currentYear} Fullo
          </p>
        </Col>
      </Container>
    </div>
  );
};

export default Index;
