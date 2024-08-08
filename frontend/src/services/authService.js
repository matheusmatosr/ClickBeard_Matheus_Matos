import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const loginClient = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  localStorage.setItem('token', response.data.token); // Save JWT in localStorage
};
