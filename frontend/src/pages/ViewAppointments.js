import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchAppointments } from '../services/api';

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const appointmentsData = await fetchAppointments();
      setAppointments(appointmentsData);
    };
    loadAppointments();
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4">Meus Agendamentos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Barber</th>
            <th>Specialty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{new Date(appointment.date).toLocaleString()}</td>
              <td>{appointment.barber.name}</td>
              <td>{appointment.specialty}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewAppointments;
