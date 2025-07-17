import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await axios.post('http://192.168.0.44/api/login', formData);
      navigate('/welcome');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: 10 }}>
        Don’t have an account? <a href="/signup">Signup</a>
      </p>
      {errorMsg && <p className="auth-message error">{errorMsg}</p>}
    </div>
  );
};

const styles = {
  container: { maxWidth: 400, margin: '100px auto', fontFamily: 'Arial' },
  input: { width: '100%', marginBottom: 10, padding: 8 },
  button: { padding: 10, width: '100%' }
};

export default Login;
