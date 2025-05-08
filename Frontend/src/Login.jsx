import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();


  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/person/login', form);
      if (res.status === 200) {
        alert(res.data.message || "Login successful");
        navigate('/punjabi'); // 👈 redirect after login
      } else {
        console.warn("Received non-200 response:", res.status);
      }
    } catch (err) {
      console.error(err.response?.data); // ✅ Logs server error
      const error = err.response?.data?.error || 'Login failed';
      alert(error);
    }
  };
  

  return (
    <>    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" type="text" placeholder="username" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
    <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </>

  );
}

export default Login;
