import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the Layout component which contains the Header and Footer
// Removed the .jsx extension as some bundlers handle this automatically
import Layout from './components/Layout';

// Import all the page components
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailPage from './pages/ProductDetailPage';

/**
 * The main App component that sets up the application's routing.
 * It uses BrowserRouter to enable routing and defines all the
 * possible paths for the application.
 * NOTE: The <BrowserRouter> has been removed from this file.
 * It should wrap the <App /> component in your main.jsx or index.jsx file.
 */
function App() {
  return (
      <Routes>
        {/* The Layout component wraps all other routes. 
            This ensures that every page will have the consistent Header and Footer.
            The actual page component (e.g., HomePage) is rendered where <Outlet /> 
            is placed within the Layout component.
        */}
        <Route path="/" element={<Layout />}>
          {/* The 'index' route renders the HomePage at the root URL ('/') */}
          <Route index element={<HomePage />} />
          
          {/* Defines the routes for all other static pages */}
          <Route path="shop" element={<ShopPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* This is a dynamic route for product details.
              The ':id' part is a URL parameter that can be used to fetch
              and display a specific product. For example: /product/123
          */}
          <Route path="product/:id" element={<ProductDetailPage />} />
          
          {/* A catch-all route that displays a 404 message
              if the user navigates to a URL that doesn't match any other route.
          */}
          <Route path="*" element={<div className="text-center py-20"><h1 className="text-4xl font-bold">404 - Page Not Found</h1></div>} />
        </Route>
      </Routes>
  );
}

export default App;
