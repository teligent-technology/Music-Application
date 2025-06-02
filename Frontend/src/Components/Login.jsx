import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Clear form on navigation if location.state.clearForm is true
  useEffect(() => {
    if (location.state?.clearForm) {
      setForm({ username: '', password: '' });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Form input change handler
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Form submit handler - login
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://music-application-backend.onrender.com/person/login', form, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200) {
        // Save auth token
        localStorage.setItem("token", res.data.token);

        // Save user details including premium status
        const user = {
          name: res.data.name,
          username: res.data.username,
          Mobile: res.data.Mobile,
          isPremium: res.data.isPremium, // ✅ save premium status
        };
        localStorage.setItem("user", JSON.stringify(user));

        alert(res.data.message || "Login successful");

        // Redirect to home or dashboard
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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "20px" }}
      >
        <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#343a40" }}>
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              type="text"
              autoComplete="new-password"
              className="form-control form-control-lg"
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
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <span
                className="input-group-text bg-white border-start-0"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash color="#6c757d" /> : <FaEye color="#6c757d" />}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 btn-lg mt-3">
            Login
          </button>
        </form>

        <p className="text-center mt-4 mb-0 text-muted">
          Don't have an account? <Link to="/" className="text-primary">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
