import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (!user) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 text-white bg-dark">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          @media (max-width: 576px) {
            .profile-initial {
              width: 40px !important;
              height: 40px !important;
              font-size: 1rem !important;
            }
            .menu-option {
              font-size: 1rem !important;
              padding: 0.75rem !important;
            }
            .profile-container {
              padding: 1rem !important;
            }
          }

          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(255, 255, 0, 0.5); }
            50% { box-shadow: 0 0 15px rgba(255, 255, 0, 0.8); }
            100% { box-shadow: 0 0 5px rgba(255, 255, 0, 0.5); }
          }

          .animate-glow {
            animation: glow 2s infinite ease-in-out;
          }
        `}
      </style>

      <div
        className={`profile-container position-relative d-flex flex-column justify-content-between p-4 ${
          darkMode ? "text-white" : "text-dark"
        }`}
        style={{
          backgroundColor: darkMode ? "black" : "white",
          minHeight: "100vh",
        }}
      >
        {/* Home Button Top-Right */}
        <Link
          to="/home"
          className="position-absolute top-0 end-0 m-3 btn btn-outline-warning btn-sm z-3"
          style={{ zIndex: 3 }}
        >
          🏠 Home
        </Link>

        {/* Profile Info */}
        <div>
          <div className="d-flex align-items-center gap-3 mb-4 position-relative">
            <div
              className={`rounded-circle d-flex align-items-center justify-content-center profile-initial shadow-sm ${
                darkMode ? "bg-success text-dark" : "bg-warning text-dark"
              }`}
              style={{
                width: "56px",
                height: "56px",
                fontSize: "1.4rem",
                fontWeight: "bold",
                boxShadow: "0 0 10px rgba(0,255,0,0.4)",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "?"}
            </div>

            <div>
              <div className="fw-bold fs-5">{user.name}</div>
              {user.isPremium && (
                <div className="badge bg-warning text-dark mt-1 animate-glow">
                  🌟 Premium User
                </div>
              )}
              <div className="text-secondary" style={{ fontSize: "0.85rem" }}>
                Exclusive profile
              </div>
            </div>
          </div>

          {/* 24-Hour Badge moved below profile */}
          <div
            className="text-success fw-semibold small px-3 py-2 rounded mb-3"
            style={{
              background: "rgba(0,255,0,0.05)",
              border: "1px solid #0f0",
              fontSize: "0.8rem",
              boxShadow: "0 0 6px rgba(0,255,0,0.4)",
              zIndex: 2,
              position: "relative",
              display: "inline-block",
            }}
          >
            🎧 24-Hour Exclusive Listener
          </div>

          <hr className={darkMode ? "border-secondary" : "border-dark"} />

          {/* Premium Info */}
          {user.isPremium && (
            <div
              className="p-3 mb-4 rounded"
              style={{
                backgroundColor: darkMode ? "#1a1a1a" : "#f0f0f0",
                boxShadow: darkMode
                  ? "0 0 10px 2px rgba(255, 215, 0, 0.7)"
                  : "0 0 10px 2px rgba(255, 215, 0, 0.5)",
                color: darkMode ? "#ffd700" : "#b8860b",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              🌟 <strong>Thank you for being a Premium member!</strong> 🌟
              <br />
              Enjoy ad-free, offline, and high-quality music experience.
            </div>
          )}

          {/* Menu Options */}
          <div className="d-grid gap-3 fs-5 fw-medium mt-4">
            <div
              className="d-flex align-items-center gap-2 menu-option"
              role="button"
              onClick={() => alert("Feature coming soon!")}
            >
              <span>➕</span> <span>Add account</span>
            </div>
            <div
              className="d-flex align-items-center gap-2 menu-option"
              role="button"
              onClick={() => alert("Stay tuned for updates!")}
            >
              <span>⚡</span> <span>What’s new</span>
            </div>
            <div
              className="d-flex align-items-center gap-2 menu-option"
              role="button"
              onClick={() => handleNavigate("/recents")}
            >
              <span>⏱️</span> <span>Recents</span>
            </div>
            <div
              className="d-flex align-items-center gap-2 menu-option"
              role="button"
              onClick={() => handleNavigate("/settings")}
            >
              <span>⚙️</span> <span>Settings and privacy</span>
            </div>

            {/* Go Premium */}
            {!user.isPremium && (
              <Link
                to="/premium"
                className="d-flex align-items-center gap-2 menu-option text-warning text-decoration-none"
              >
                <span>🌟</span> <span>Go Premium</span>
              </Link>
            )}
          </div>

          {/* Theme Toggle */}
          <div className="form-check form-switch mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={darkMode}
              onChange={handleThemeToggle}
              id="themeSwitch"
            />
            <label className="form-check-label" htmlFor="themeSwitch">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-5">
          <div className="text-secondary small mb-2 fst-italic">
            “This listener hasn’t touched any other app today.” ✅
          </div>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default Profile;
