import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    Mobile: '',
    Song: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/person/', form);
      if (res.status === 200) {
        alert(res.data.message || "Signup successful");
        navigate('/login');
      } else {
        console.warn("Received non-200 response:", res.status);
      }
    } catch (err) {
      console.error('Error:', err);
      const error = err.response?.data?.error || 'Signup failed';
      alert(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile</label>
            <input
              name="Mobile"
              type="number"
              className="form-control"
              placeholder="Enter mobile number"
              value={form.Mobile}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Favorite Song Type</label>
            <select
              name="Song"
              className="form-select"
              value={form.Song}
              onChange={handleChange}
              required
            >
              <option value="">Select Song</option>
              <option value="Punjabi">Punjabi</option>
              <option value="bhojpuri">Bhojpuri</option>
              <option value="Haryanvi">Haryanvi</option>
            </select>
          </div>

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

          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
