import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { fetchAppointments, fetchClients, fetchBarbers, deleteBarber, deleteClient, deleteAppointment } from '../services/api';
import BarberModal from '../components/BarberModal'; 

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [clients, setClients] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState(null);

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
      await deleteAppointment(id);
      setAppointments(appointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleDeleteBarber = async (id) => {
    try {
      await deleteBarber(id);
      setBarbers(barbers.filter(barber => barber.id !== id));
    } catch (error) {
      console.error('Error deleting barber:', error);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await deleteClient(id);
      setClients(clients.filter(client => client.id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleShow = (barber = null) => {
    setEditMode(!!barber);
    setSelectedBarber(barber);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  return (
    <div className="container">
      <h2 className="mb-4">Dashboard Administrador</h2>
      <Button variant="primary" onClick={() => handleShow()} className="mb-4">
        Adicionar Barbeiro
      </Button>

      <BarberModal
        show={show}
        handleClose={handleClose}
        editMode={editMode}
        selectedBarber={selectedBarber}
        barbers={barbers}
        setBarbers={setBarbers}
      />

      <h3 className="mb-3 text-center">Agendamentos</h3>
      <Table striped bordered hover className="text-center">
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
              <td>{appointment.Barber ? appointment.Barber.name : 'N/A'}</td>
              <td>{appointment.Barber && appointment.Barber.specialties ? appointment.Barber.specialties.join(', ') : 'N/A'}</td>
              <td>{appointment.Client ? appointment.Client.name : 'N/A'}</td>
              <td>{appointment.status}</td>
              <td>
                <span role="button" onClick={() => handleCancel(appointment.id)} style={{ cursor: 'pointer', margin: '0 5px' }}>
                  🗑️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="mt-5 mb-3 text-center">Clientes</h3>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>
                <span role="button" onClick={() => handleDeleteClient(client.id)} style={{ cursor: 'pointer', margin: '0 5px' }}>
                  🗑️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3 className="mt-5 mb-3 text-center">Barbeiros</h3>
      <Table striped bordered hover className="text-center mb-5">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Especialidades</th>
            <th>Data de Contratação</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {barbers.map((barber) => (
            <tr key={barber?.id || 'unknown'}>
              <td>{barber?.name || 'N/A'}</td>
              <td>{barber?.age || 'N/A'}</td>
              <td>{barber?.specialties ? barber.specialties.join(', ') : 'N/A'}</td>
              <td>{barber?.hireDate ? new Date(barber.hireDate).toLocaleDateString() : 'N/A'}</td>
              <td>
                <span role="button" onClick={() => handleShow(barber)} style={{ cursor: 'pointer', margin: '0 5px' }}>
                  ⚙️
                </span>
                <span role="button" onClick={() => handleDeleteBarber(barber?.id)} style={{ cursor: 'pointer', margin: '0 5px' }}>
                  🗑️
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
