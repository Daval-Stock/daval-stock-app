import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutUI() {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    // Redirigez l'utilisateur vers la page de connexion
    navigate('/ConnexionUI'); 
  };

  return (
    <div>
      <h1>Déconnexion en cours...</h1>
    </div>
  );
}

export default LogoutUI;
