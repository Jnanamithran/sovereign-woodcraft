import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Component
import Layout from './components/Layout.jsx';

// Page Components
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import CartPage from './pages/CartPage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx'; // <-- IMPORT SEARCH PAGE
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const App = () => {
  let userInfo = null;
  try {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      userInfo = JSON.parse(storedUserInfo);
    }
  } catch (error) {
    console.error("Failed to parse userInfo from localStorage:", error);
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
        <Route path="search" element={<SearchResultsPage />} /> {/* <-- ADD SEARCH ROUTE */}
      </Route>

      {/* Standalone pages */}
      <Route path="/login" element={!userInfo ? <LoginPage /> : <Navigate to="/" />} />
      <Route path="/register" element={!userInfo ? <RegisterPage /> : <Navigate to="/" />} />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
