import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { fetchAppointments } from '../services/api';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const appointmentsData = await fetchAppointments();
      setAppointments(appointmentsData);
    };
    loadAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Admin Dashboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Data</th>
            <th>Barbeiro</th>
            <th>Especialidade</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Ação</th>
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
    </div>
  );
};

export default AdminDashboard;
