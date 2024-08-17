import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createBarber, updateBarber } from '../services/api';

const BarberModal = ({ show, handleClose, editMode, selectedBarber, barbers, setBarbers }) => {
  const [newBarber, setNewBarber] = useState({
    name: '',
    age: '',
    specialties: '',
    hireDate: '',
  });

  useEffect(() => {
    if (editMode && selectedBarber) {
      setNewBarber({
        name: selectedBarber.name,
        age: selectedBarber.age,
        specialties: selectedBarber.specialties.join(', '),
        hireDate: selectedBarber.hireDate.split('T')[0], // Formatar data para input
      });
    } else {
      setNewBarber({
        name: '',
        age: '',
        specialties: '',
        hireDate: '',
      });
    }
  }, [editMode, selectedBarber]);

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
  
      if (editMode && selectedBarber) {
        await updateBarber(selectedBarber.id, barberData);
        setBarbers(barbers.map(barber => (barber.id === selectedBarber.id ? barberData : barber)));
      } else {
        const newBarberData = await createBarber(barberData);
        if (newBarberData) {
          console.log('New Barber Data:', newBarberData);
          setBarbers([...barbers, newBarberData]);
        } else {
          console.error('No data returned from createBarber');
        }
      }
  
      handleClose();
    } catch (error) {
      console.error('Error creating or updating barber:', error);
    }
  };  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? 'Editar Barbeiro' : 'Adicionar Novo Barbeiro'}</Modal.Title>
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
            <Form.Label>Especialidades</Form.Label>
            <Form.Control
              type="text"
              name="specialties"
              value={newBarber.specialties}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data de Contratação</Form.Label>
            <Form.Control
              type="date"
              name="hireDate"
              value={newBarber.hireDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {editMode ? 'Salvar Alterações' : 'Adicionar Barbeiro'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BarberModal;
