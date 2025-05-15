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
      const res = await axios.post('https://music-application-1-7n3i.onrender.com/person/login', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token); // Store token
        alert(res.data.message || "Login successful");
        navigate('/punjabi'); // Redirect after login
      } else {
        console.warn("Received non-200 response:", res.status);
      }
    } catch (err) {
      console.error(err.response?.data);
      const error = err.response?.data?.error || 'Login failed';
      alert(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
