import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLoginCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/'); 
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Eseguo l'accesso...</h1>
    </div>
  );
};

export default GoogleLoginCallback;
