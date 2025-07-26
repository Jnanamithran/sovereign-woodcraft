// /frontend/src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // ✅ For navigation after register

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const userData = { name, email, password };

      const { data } = await axios.post(
        'http://localhost:5001/api/auth/register',
        userData,
        config
      );

      setLoading(false);

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/'); // ✅ Redirect after registration

    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'An error occurred during registration.');
      console.error('Registration error:', err.response?.data || err.message);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h1>Sign Up</h1>

      {error && (
        <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red', borderRadius: '5px' }}>
          {error}
        </div>
      )}

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

        <button type="submit" disabled={loading} style={{ padding: '10px 20px', width: '100%', cursor: 'pointer' }}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
