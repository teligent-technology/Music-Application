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

  if (!user) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100 text-white bg-dark">
        <p>Loading profile...</p>
      </div>
    );
  }

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

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
        `}
      </style>

      <div
        className={`profile-container d-flex flex-column justify-content-between p-4 ${
          darkMode ? "text-white" : "text-dark"
        }`}
        style={{
          backgroundColor: darkMode ? "black" : "white",
          minHeight: "100vh"
        }}
      >
        {/* Profile Info */}
        <div>
          <div className="d-flex align-items-center gap-3 mb-4">
            <div
              className={`rounded-circle d-flex align-items-center justify-content-center profile-initial ${
                darkMode ? "bg-success text-dark" : "bg-warning text-dark"
              }`}
              style={{
                width: "48px",
                height: "48px",
                fontSize: "1.2rem",
                fontWeight: "bold"
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <div className="fw-bold fs-5">{user.name}</div>
              {user.isPremium && (
                <div className="badge bg-warning text-dark mt-1">
                  🌟 Premium User
                </div>
              )}
              <div className="text-secondary" style={{ fontSize: "0.85rem" }}>
                View profile
              </div>
            </div>
          </div>

          <hr className={darkMode ? "border-secondary" : "border-dark"} />

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

            {/* Go Premium (Link) */}
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

        {/* Footer & Logout */}
        <div className="text-center mt-5">
          <div className="text-secondary small mb-2">
            Spotify Clone UI – Menu Screen
          </div>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default Profile;
