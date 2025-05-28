import React, { useEffect, useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
  }, []);

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const clearRecents = () => {
    localStorage.removeItem("recentSongs");
    alert("Recently played songs cleared.");
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#121212", color: "#fff" }}>
      <div className="container">
        <div className="card bg-dark border-secondary shadow-lg text-white">
          <div className="card-body p-4">
            <h3 className="card-title mb-4">
              ⚙️ Settings & Privacy
            </h3>

            {/* User Info */}
            <div className="mb-4">
              <h6 className="text-muted">👤 User</h6>
              <div className="form-control bg-black text-white border-0">
                {user ? user.name : "Guest"}
              </div>
            </div>

            {/* Theme Switch */}
            <div className="form-check form-switch d-flex align-items-center mb-4 ps-0">
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={darkMode}
                onChange={handleThemeToggle}
                id="themeSwitch"
              />
              <label className="form-check-label fs-6" htmlFor="themeSwitch">
                {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </label>
            </div>

            {/* Clear Recently Played */}
            <div className="mb-4">
              <h6 className="text-muted">🕒 Playback History</h6>
              <button className="btn btn-outline-danger w-100" onClick={clearRecents}>
                Clear Recently Played
              </button>
            </div>

            <hr className="border-secondary my-4" />

            <div className="text-muted small text-center">
              Music App © {new Date().getFullYear()} — Built with ❤️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
