import { useState } from 'react';
import { Form, Button, CardBody, CardHeader, CardTitle, TabContainer } from 'react-bootstrap';
import PasswordInputWithStrength from '@/components/PasswordInputWithStrength';
import { changePassword } from '@/features/auth/services/authService'; // Asegúrate de importar tu función

const Account = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const token = localStorage.getItem('token');
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación simple de nueva contraseña
        if (newPassword !== confirmPassword) {
            alert("Las nuevas contraseñas no coinciden");
            return;
        }

        try {
            const payload = {
                currentPassword,
                newPassword,
                newPassword_confirmation: confirmPassword,
            };

            const data = await changePassword(payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            alert(data.message || "Contraseña actualizada correctamente!");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Error al actualizar la contraseña");
        }
    };

    return (
        <div className="card">
            <TabContainer defaultActiveKey='timeline'>
                <CardHeader className="card-tabs d-flex align-items-center">
                    <div className="flex-grow-1">
                        <CardTitle as={'h4'}>Cambiar contraseña</CardTitle>
                    </div>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        {/* Contraseña actual */}
                        <div className="mb-3 form-group">
                            <Form.Label htmlFor="currentPassword">
                                Contraseña actual <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                id="currentPassword"
                                placeholder="••••••••"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Nueva contraseña */}
                        <div className="mb-3">
                            <PasswordInputWithStrength
                                id="newPassword"
                                label="Nueva contraseña"
                                password={newPassword}
                                setPassword={setNewPassword}
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Confirmar nueva contraseña */}
                        <div className="mb-3 form-group">
                            <Form.Label htmlFor="confirmPassword">
                                Confirma la nueva contraseña <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                id="confirmPassword"
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
                </CardBody>
            </TabContainer>
        </div>
    );
};

export default Account;