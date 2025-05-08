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
    <>
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>    
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label className="form-label">Username</label>

      <input name="username" type="text" placeholder="username" onChange={handleChange} value={form.username} />
      </div>
      <div className="mb-3">
      <label className="form-label">Password</label>
      <input name="password" type="password" placeholder="Password" onChange={handleChange}   value={form.password}
 />
      </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>
    <p>
        Don't have an account? <Link to="/">Signup</Link>
      </p>
      </div>
      </div>
    </>

  );
}

export default Login;
