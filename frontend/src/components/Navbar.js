import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import '../styles/navbar.css'; 

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar mb-5">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="m-2" style={{color:"#fff"}}>Mestre dos Penteados</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} style={{color:"#fff"}} to="/book-appointment">Agendar</Nav.Link>
                <Nav.Link as={Link} style={{color:"#fff"}} to="/view-appointments">Meus Agendamentos</Nav.Link>
                <Nav.Link as={Link} style={{color:"#fff"}} to="/admin-dashboard">Admin Dashboard</Nav.Link>
                <Nav.Link onClick={handleLogout} style={{color:"#fff"}}>Sair</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} style={{color:"#fff"}} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} style={{color:"#fff"}} to="/register">Registrar</Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
