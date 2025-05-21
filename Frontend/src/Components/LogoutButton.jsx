import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem('token');

    try {
      await fetch('http://localhost:3000/person/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }

    // Remove token and redirect with form reset flag
    localStorage.removeItem('token');
    navigate('/login', { state: { clearForm: true } });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-700 transition duration-200 !bg-red-600 !text-white"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
