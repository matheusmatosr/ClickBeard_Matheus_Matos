import React from 'react';
import { Container } from 'react-bootstrap';
import BarberCard from '../components/BarberCard';
import { fetchBarbers } from '../services/api';
import { useState, useEffect } from 'react';

const Home = () => {
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    const loadBarbers = async () => {
      const barbersData = await fetchBarbers();
      setBarbers(barbersData);
    };
    loadBarbers();
  }, []);

  return (
    <Container>
      <div className="p-5 mb-4 bg-light rounded-3 shadow mb-4">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Bem-vindo a Barbearia Mestre dos Penteados</h1>
          <p className="col-md-8 fs-4">Agende seu horário com os melhores barbeiros da cidade!</p>
        </div>
      </div>
      <h2>Nossos barbeiros.</h2>
      <div className="d-flex flex-wrap mb-4">
        {barbers.map(barber => (
          <div key={barber.id} className="col-md-4">
            <BarberCard barber={barber} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
