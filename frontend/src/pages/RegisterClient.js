import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { registerClient } from '../services/api';

const RegisterClient = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    let errors = { name: '', email: '', password: '' };

    if (!name.trim()) {
      errors.name = 'O nome é obrigatório.';
      valid = false;
    }

    if (!email.trim()) {
      errors.email = 'O e-mail é obrigatório.';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'O e-mail deve ser válido.';
      valid = false;
    }

    if (!password.trim()) {
      errors.password = 'A senha é obrigatória.';
      valid = false;
    } else if (password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres.';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setMessage('');
    try {
      await registerClient({ name, email, password });
      setMessage('Cadastrado com sucesso!');
      // Redirecionar ou atualizar UI após o cadastro bem-sucedido
    } catch (error) {
      setMessage('Erro ao cadastrar');
    }
  };

  const alertVariant = typeof message === 'string' && message.startsWith('Erro') ? 'danger' : 'success';

  return (
    <div className="container">
      <h2>Registrar</h2>
      <Form onSubmit={handleSubmit}>
        {message && <Alert variant={alertVariant}>{message}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">Registrar</Button>
      </Form>
    </div>
  );
};

export default RegisterClient;
