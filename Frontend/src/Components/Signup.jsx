import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
      const res = await axios.post('http://localhost:3000/person/', form);
      if (res.status === 200) {
        const user = {
          name: form.name,
          username: form.username,
          Mobile: form.Mobile,
        };
        localStorage.setItem("user", JSON.stringify(user));

        alert(res.data.message || "Signup successful");
        navigate('/login', { state: { clearForm: true } });
      } else {
        console.warn("Non-200 response:", res.status);
      }
    } catch (err) {
      console.error('Error:', err);
      const error = err.response?.data?.error || 'Signup failed';
      alert(error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ff512f, #dd2476)"
      }}
    >
      <div className="card p-4 shadow-lg" style={{ width: "100%", maxWidth: "500px", borderRadius: "20px" }}>
        <h2 className="text-center mb-4 fw-bold text-dark">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              name="name"
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile Number</label>
            <input
              name="Mobile"
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter mobile number"
              value={form.Mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              className="form-control form-control-lg"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control form-control-lg"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 btn-lg">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-muted">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
