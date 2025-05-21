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
    <div className={`container py-4 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}>
      <h3 className="mb-4">Settings & Privacy</h3>

      <div className="mb-3">
        <label className="form-label">User</label>
        <div className="form-control">{user ? user.name : "Guest"}</div>
      </div>

      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={darkMode}
          onChange={handleThemeToggle}
          id="themeSwitch"
        />
        <label className="form-check-label" htmlFor="themeSwitch">
          {darkMode ? "Dark Mode" : "Light Mode"}
        </label>
      </div>

      <button className="btn btn-outline-danger" onClick={clearRecents}>
        Clear Recently Played
      </button>
    </div>
  );
};

export default Settings;
