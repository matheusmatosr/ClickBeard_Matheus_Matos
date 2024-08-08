import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { fetchBarbers, createAppointment } from '../services/api';

const AppointmentForm = () => {
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [message, setMessage] = useState([]);
  const [availableSpecialties, setAvailableSpecialties] = useState([]);

  useEffect(() => {
    const loadBarbers = async () => {
      const barbersData = await fetchBarbers();
      setBarbers(barbersData);
    };
    loadBarbers();
  }, []);

  const handleBarberChange = (e) => {
    const barberId = e.target.value;
    const barber = barbers.find(b => b.id === parseInt(barberId));
    setSelectedBarber(barberId);
    setAvailableSpecialties(barber ? barber.specialties : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment({
        barberId: selectedBarber,
        clientId: 1,  // ajustar para o cliente autenticado
        specialty: selectedSpecialty,
        date: appointmentDate
      });
      setMessage('Appointment booked successfully!');
    } catch (error) {
      setMessage('Error booking appointment.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {message && <Alert variant="info">{message}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Barbeiro</Form.Label>
        <Form.Select value={selectedBarber} onChange={handleBarberChange}>
          <option value="">Selecione o barbeiro</option>
          {barbers.map(barber => (
            <option key={barber.id} value={barber.id}>{barber.name}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Especialidades</Form.Label>
        <Form.Select value={selectedSpecialty} onChange={(e) => setSelectedSpecialty(e.target.value)}>
          <option value="">Selecione a especialidade</option>
          {availableSpecialties.map((specialty, index) => (
            <option key={index} value={specialty}>{specialty}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Dia e Hora</Form.Label>
        <Form.Control
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Realizar Agendamento</Button>
    </Form>
  );
};

export default AppointmentForm;
