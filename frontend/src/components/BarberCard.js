import React from 'react';
import { Card } from 'react-bootstrap';

const BarberCard = ({ barber }) => {
  return (
    <Card className="m-2">
      <Card.Body>
        <Card.Title>{barber.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Idade: {barber.age}</Card.Subtitle>
        <Card.Text>
          Especialidades: {barber.specialties && barber.specialties.length > 0
            ? barber.specialties.join(', ')
            : 'Nenhuma especialidade'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BarberCard;
