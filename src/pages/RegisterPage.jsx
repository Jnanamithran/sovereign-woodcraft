// /frontend/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  // 1. STATE MANAGEMENT: Create state variables to hold the form input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for handling loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. FORM SUBMISSION HANDLER
  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true); // Show a loading indicator
      setError(null);   // Clear previous errors

      // Configuration for the API request
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // The data we are sending to the backend
      const userData = {
        name,
        email,
        password,
      };

      // 3. API REQUEST: Send the POST request to the backend
      const { data } = await axios.post(
        'http://localhost:5001/api/auth/register', // Your backend's register endpoint
        userData,
        config
      );

      setLoading(false); // Turn off loading indicator

      // SUCCESS! Handle the response data
      console.log('Registration successful:', data);
      // You would typically save the user info and token here
      // For example, save to localStorage:
      localStorage.setItem('userInfo', JSON.stringify(data));
      // And then redirect the user, e.g., to the homepage
      // window.location.href = '/';

    } catch (err) {
      setLoading(false); // Turn off loading indicator
      // Set an error message from the backend response, or a generic one
      setError(err.response?.data?.message || 'An error occurred during registration.');
      console.error('Registration error:', err.response?.data || err.message);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h1>Sign Up</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
