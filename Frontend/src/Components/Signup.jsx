// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // ✅ Make sure this is imported

function Signup() {
  const [form, setForm] = useState({
    name: '',
    Mobile: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://music-application-backend.onrender.com/person/', form);
      if (res.status >= 200 && res.status < 300) {
        const user = {
          name: form.name,
          username: form.username,
          Mobile: form.Mobile,
        };
        localStorage.setItem("user", JSON.stringify(user));

        alert(res.data.message || "Signup successful");
        navigate('/login', { state: { clearForm: true } });
      } else {
        console.warn("Non-2xx response:", res.status);
      }
    } catch (err) {
      console.error('Error:', err);
      const error = err.response?.data?.error || 'Signup failed';
      alert(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card glass-box animate-fade-in">
        <h2 className="text-center mb-4 fw-bold text-white">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 animated-input">
            <label className="form-label text-white">Full Name</label>
            <input
              name="name"
              type="text"
              className="form-control form-control-lg input-glow"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 animated-input">
            <label className="form-label text-white">Mobile Number</label>
            <input
              name="Mobile"
              type="number"
              className="form-control form-control-lg input-glow"
              placeholder="Enter mobile number"
              value={form.Mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 animated-input">
            <label className="form-label text-white">Username</label>
            <input
              name="username"
              type="text"
              className="form-control form-control-lg input-glow"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 animated-input">
            <label className="form-label text-white">Password</label>
            <input
              name="password"
              type="password"
              className="form-control form-control-lg input-glow"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn signup-btn w-100 btn-lg">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-white-50">
          Already have an account? <Link to="/login" className="text-light fw-bold">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
