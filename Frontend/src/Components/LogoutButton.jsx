import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      // Call backend logout API
      await fetch('http://localhost:3000/person/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }

    // Remove token and user from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Blur active element to remove browser suggestions
    document.activeElement?.blur();

    // Redirect to login page with form reset flag
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
