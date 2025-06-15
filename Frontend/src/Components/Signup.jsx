// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // Shared CSS

function Signup() {
  const [form, setForm] = useState({ name: '', Mobile: '', username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/person/', form);
      if (res.status >= 200 && res.status < 300) {
        const user = { name: form.name, username: form.username, Mobile: form.Mobile };
        localStorage.setItem("user", JSON.stringify(user));
        alert(res.data.message || "Signup successful");
        navigate('/login', { state: { clearForm: true } });
      } else {
        console.warn("Non-2xx response:", res.status);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate-fade-in">
        <h2 className="text-center mb-4 fw-bold text-white">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 animated-input">
            <label className="form-label text-white">Full Name</label>
            <input type="text" name="name" className="form-control input-glow" placeholder="Your name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3 animated-input">
            <label className="form-label text-white">Mobile Number</label>
            <input type="number" name="Mobile" className="form-control input-glow" placeholder="Your mobile" value={form.Mobile} onChange={handleChange} required />
          </div>
          <div className="mb-3 animated-input">
            <label className="form-label text-white">Username</label>
            <input type="text" name="username" className="form-control input-glow" placeholder="Choose username" value={form.username} onChange={handleChange} required />
          </div>
          <div className="mb-4 animated-input">
            <label className="form-label text-white">Password</label>
            <input type="password" name="password" className="form-control input-glow" placeholder="Create password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn auth-btn w-100">Sign Up</button>
        </form>
        <p className="text-center mt-4 text-white-50">
          Already have an account? <Link to="/login" className="text-light fw-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
