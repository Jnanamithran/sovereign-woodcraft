import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Component
import Layout from './components/Layout.jsx';

// Page Components
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const App = () => {
  // Added a try-catch block for safer parsing from localStorage.
  // This prevents the app from crashing if the stored data is malformed.
  let userInfo = null;
  try {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      userInfo = JSON.parse(storedUserInfo);
    }
  } catch (error) {
    console.error("Failed to parse userInfo from localStorage:", error);
    // If parsing fails, it's good practice to clear the corrupted item.
    localStorage.removeItem('userInfo');
  }

  return (
    <Routes>
      {/* All pages with the main Header and Footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>

      {/* Standalone pages */}
      <Route path="/login" element={!userInfo ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/register" element={!userInfo ? <RegisterPage /> : <Navigate to="/" />} />
      
      {/* Redirect any unknown URL to the homepage */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
