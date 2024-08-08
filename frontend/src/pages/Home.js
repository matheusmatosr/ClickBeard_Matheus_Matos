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
      <div className="p-5 mb-4 rounded-3 shadow mb-4" style={{backgroundColor:"#134647"}}>
        <div className="container-fluid py-5" style={{color:"#fff"}}>
          <h1 className="display-5 fw-bold">Bem-vindo a barbearia Mestre dos Penteados</h1>
          <p className="col-md-8 fs-4">Agende seu horário com os melhores barbeiros da cidade!</p>
        </div>
      </div>
      <h2 className="mt-5 mb-3 text-center">Nossos barbeiros</h2>
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
