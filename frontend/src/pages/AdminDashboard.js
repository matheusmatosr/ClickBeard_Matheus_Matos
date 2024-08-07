import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { fetchAppointments, fetchClients, fetchBarbers, createBarber } from '../services/api';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [show, setShow] = useState(false);
  const [newBarber, setNewBarber] = useState({
    name: '',
    age: '',
    specialties: '',
    hireDate: '',
  });

  useEffect(() => {
    const loadAppointments = async () => {
      const appointmentsData = await fetchAppointments();
      setAppointments(appointmentsData);
    };
    const loadClients = async () => {
      const clientsData = await fetchClients();
      setClients(clientsData);
    };
    const loadBarbers = async () => {
      const barbersData = await fetchBarbers();
      setBarbers(barbersData);
    };

    loadAppointments();
    loadClients();
    loadBarbers();
  }, []);

  const handleCancel = async (id) => {
    try {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setNewBarber({
      ...newBarber,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const specialtiesArray = newBarber.specialties.split(',').map(s => s.trim());
      const barberData = { ...newBarber, specialties: specialtiesArray };
      await createBarber(barberData);
      setBarbers([...barbers, barberData]);
      handleClose();
    } catch (error) {
      console.error('Error creating barber:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Admin Dashboard</h2>
      <Button variant="primary" onClick={handleShow} className="mb-4">Adicionar barbeiro</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar novo barbeiro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newBarber.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Idade</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={newBarber.age}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Especialiades</Form.Label>
              <Form.Control
                type="text"
                name="specialties"
                value={newBarber.specialties}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="date"
                name="hireDate"
                value={newBarber.hireDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Adicionar barbeiro
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <h3 className="mb-3 text-center">Agendamentos</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Barber</th>
            <th>Specialty</th>
            <th>Client</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{new Date(appointment.date).toLocaleString()}</td>
              <td>{appointment.barber.name}</td>
              <td>{appointment.specialty}</td>
              <td>{appointment.client.name}</td>
              <td>{appointment.status}</td>
              <td>
                <Button variant="danger" onClick={() => handleCancel(appointment.id)}>
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="mt-5 mb-3 text-center">Clientes</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="mt-5 mb-3 text-center">Barbeiros</h3>
      <Table striped bordered hover className="mb-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Specialties</th>
            <th>Hire Date</th>
          </tr>
        </thead>
        <tbody>
          {barbers.map((barber) => (
            <tr key={barber.id}>
              <td>{barber.name}</td>
              <td>{barber.age}</td>
              <td>{barber.specialties.join(', ')}</td>
              <td>{new Date(barber.hireDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
