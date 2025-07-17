import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome! Infosprint</h1>
      <p>You have successfully logged in or signed up.</p>
      <Link to="/login">Logout</Link>
    </div>

  );
};

export default Welcome;
