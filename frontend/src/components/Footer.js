import React from 'react';
import { Container, Typography } from '@mui/material';
import '../styles/navbar.css'; 

const Footer = () => (
  <footer className="footer">
    <Container>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} by Matheus Matos
      </Typography>
    </Container>
  </footer>
);

export default Footer;
