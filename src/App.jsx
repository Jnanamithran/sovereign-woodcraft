import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the Layout component which contains the Header and Footer
// Removed the .jsx extension as some bundlers handle this automatically
import Layout from './components/Layout';

// Page Components
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx'; // <-- IMPORT SHOP PAGE
import AboutPage from './pages/AboutPage.jsx'; // <-- IMPORT ABOUT PAGE
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const App = () => {
  // Check for user info to manage route access
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <Routes>
      {/* ROUTES WRAPPED IN LAYOUT (Header & Footer) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />      {/* <-- ADD SHOP ROUTE */}
        <Route path="about" element={<AboutPage />} />    {/* <-- ADD ABOUT ROUTE */}
      </Route>

      {/* STANDALONE ROUTES (No Header/Footer from Layout) */}
      <Route 
        path="/login" 
        element={!userInfo ? <LoginPage /> : <Navigate to="/" />} 
      />
      <Route 
        path="/register" 
        element={!userInfo ? <RegisterPage /> : <Navigate to="/" />} 
      />
      
      {/* Catch-all route to redirect unknown paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;