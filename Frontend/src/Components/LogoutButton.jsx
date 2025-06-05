import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await fetch('https://music-application-backend.onrender.com/person/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }

    // Clear all login related data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');  // Clear this as well

    document.activeElement?.blur();

    navigate('/login', { state: { clearForm: true } });
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-danger fw-semibold shadow"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
