import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

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
      const res = await axios.post('https://music-application-backend.onrender.com/person/login', form, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify({
          name: res.data.name,
          username: res.data.username,
          Mobile: res.data.Mobile,
          isPremium: res.data.isPremium,
        }));
        localStorage.setItem("isLoggedIn", "true");  // Add this line

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
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card animate__animated animate__fadeInDown">
        <h2 className="text-center mb-4 login-title">Welcome Back</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              autoComplete="new-password"
              className="form-control form-control-lg login-input"
              placeholder="Enter your username"
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
                className="form-control form-control-lg login-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                className="input-group-text password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg login-btn">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-muted">
          Don't have an account? <Link to="/" className="text-decoration-none text-primary fw-bold">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
