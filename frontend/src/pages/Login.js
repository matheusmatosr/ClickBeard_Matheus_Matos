import React from 'react';
import LoginForm from '../components/LoginForm';
import { Container } from 'react-bootstrap';

const Login = () => {
  return (
    <Container>
      <h2>Login</h2>
      <LoginForm />
    </Container>
  );
};

export default Login;
