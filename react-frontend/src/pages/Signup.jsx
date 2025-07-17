import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await axios.post('http://192.168.0.44/api/signup', formData);
      navigate('/login');
    } catch (err) {
      setErrorMsg(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p style={{ marginTop: 10 }}>
        Already have an account? <a href="/login">Login</a>
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

export default Signup;
