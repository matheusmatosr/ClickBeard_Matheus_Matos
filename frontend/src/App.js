import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import RegisterClient from './pages/RegisterClient';
import Login from './pages/Login';
import BookAppointment from './pages/BookAppointment';
import ViewAppointments from './pages/ViewAppointments';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterClient />} />
            <Route 
              path="/book-appointment" 
              element={
                <ProtectedRoute>
                  <BookAppointment />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/view-appointments" 
              element={
                <ProtectedRoute>
                  <ViewAppointments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
