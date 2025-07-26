// /frontend/src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Simple protected Home Page
const HomePage = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome, {userInfo?.name || 'User'}!</h1>
      <p>You are successfully logged in.</p>
      <button onClick={logoutHandler} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
};

const App = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <Routes>
      {/* Auth Routes */}
      <Route
        path="/login"
        element={userInfo ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={userInfo ? <Navigate to="/" /> : <RegisterPage />}
      />

      {/* Protected Home Route */}
      <Route
        path="/"
        element={userInfo ? <HomePage /> : <Navigate to="/login" />}
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
