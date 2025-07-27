import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// This line is crucial. It imports the CartProvider.
// The error means this line is likely missing or incorrect in your file.
import { CartProvider } from './context/CartContext.jsx';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* For this to work, CartProvider must be imported above. */}
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
