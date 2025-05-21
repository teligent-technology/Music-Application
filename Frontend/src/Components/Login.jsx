import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const shouldClear = location.state?.clearForm;
    if (shouldClear) {
      setForm({ username: '', password: '' });

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/person/login', form, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        alert(res.data.message || "Login successful");
        navigate('/home');
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
            <div className="input-group">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                className="input-group-text"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
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
