import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Layout and Route Components
// Using absolute paths from the /src directory to ensure resolution.
import AdminLayout from '/src/components/AdminLayout.jsx';
import AdminRoute from '/src/components/AdminRoute.jsx';

// Import Page Components
import AdminLoginPage from '/src/pages/AdminLoginPage.jsx';
import DashboardPage from '/src/pages/DashboardPage.jsx';
import AddProductPage from '/src/pages/AddProductPage.jsx';
import OrderListPage from '/src/pages/OrderListPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public login route */}
        <Route path="/login" element={<AdminLoginPage />} />

        {/* Protected Admin Routes */}
        <Route path="/" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="orders" element={<OrderListPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
