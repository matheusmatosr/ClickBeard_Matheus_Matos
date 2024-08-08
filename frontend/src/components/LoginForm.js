import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { loginClient } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginClient({ email, password });
      setMessage('Login efeituado com sucesso!');
      navigate('/'); // Redirect to home after successful login
    } catch (error) {
      setMessage('Login falhou. Por favor cheque o seu email ou a senha.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {message && <Alert variant="info">{message}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
