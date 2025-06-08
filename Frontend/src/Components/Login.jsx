// Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css'; // Shared CSS

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.clearForm) {
      setForm({ username: '', password: '' });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://music-application-backend.onrender.com/person/login', form);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("isLoggedIn", "true");
        alert(res.data.message || "Login successful");
        navigate('/home');
      } else {
        console.warn("Non-200 response:", res.status);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in">
        <h2 className="text-center mb-4 fw-bold text-white">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 animated-input">
            <label className="form-label text-white">Username</label>
            <input name="username" type="text" className="form-control input-glow" placeholder="Enter username" value={form.username} onChange={handleChange} required />
          </div>
          <div className="mb-3 animated-input">
            <label className="form-label text-white">Password</label>
            <div className="input-group">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="form-control input-glow"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span className="input-group-text password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="btn auth-btn w-100">Login</button>
        </form>
        <p className="text-center mt-4 text-white-50">
          Don't have an account? <Link to="/" className="text-light fw-bold">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
