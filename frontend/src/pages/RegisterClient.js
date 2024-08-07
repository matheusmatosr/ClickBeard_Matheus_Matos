import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { registerClient } from '../services/api';

const RegisterClient = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerClient({ name, email, password });
      setMessage('Client registered successfully!');
      // Redirect or update UI after successful registration
    } catch (error) {
      setMessage('Error registering client.');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        {message && <Alert variant="info">{message}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
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
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default RegisterClient;
