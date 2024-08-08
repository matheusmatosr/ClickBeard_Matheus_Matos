import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchBarbers = async () => {
  const response = await axios.get(`${API_URL}/barbers`);
  return response.data;
};

export const fetchSpecialties = async () => {
  const response = await axios.get(`${API_URL}/specialties`);
  return response.data;
};

export const registerClient = async (clientData) => {
  await axios.post(`${API_URL}/clients/register`, clientData);
};

export const fetchAppointments = async () => {
  const response = await axios.get(`${API_URL}/appointments`);
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  await axios.post(`${API_URL}/appointments`, appointmentData);
};

export const fetchClients = async () => {
  const response = await axios.get(`${API_URL}/clients`);
  return response.data;
};

export const createBarber = async (barberData) => {
  await axios.post(`${API_URL}/barbers`, barberData);
};
