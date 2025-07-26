// /frontend/src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

const App = () => {
  // We still check for userInfo to protect certain routes
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <Routes>
      {/* ROUTE LOGIC EXPLANATION:
        - The Homepage ('/') is now public and accessible to everyone.
        - Login & Register pages are only for logged-out users. If a logged-in user
          tries to visit them, they are redirected to the homepage.
      */}

      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      {/* You would add other public routes like product pages here */}
      {/* Example: <Route path="/product/:id" element={<ProductPage />} /> */}


      {/* Routes for Logged-Out Users Only */}
      <Route 
        path="/login" 
        element={!userInfo ? <LoginPage /> : <Navigate to="/" />} 
      />
      <Route 
        path="/register" 
        element={!userInfo ? <RegisterPage /> : <Navigate to="/" />} 
      />

      {/* Protected Routes for Logged-In Users Only would go here */}
      {/* Example: <Route path="/profile" element={userInfo ? <ProfilePage /> : <Navigate to="/login" />} /> */}


      {/* A catch-all for any other route can redirect to the homepage */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
