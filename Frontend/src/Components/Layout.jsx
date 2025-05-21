// src/components/Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
  return (
    <div className="bg-dark text-white min-vh-100 pb-5">
      {/* Navbar/Header */}
      <header className="d-flex justify-content-between align-items-center px-3 pt-3 pb-2 border-bottom border-secondary sticky-top bg-dark z-3">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle bg-primary d-flex justify-content-center align-items-center fw-bold fs-5 text-white" style={{ width: "40px", height: "40px" }}>
            <Link to="/profile" className="text-white text-decoration-none">D</Link>
          </div>
          <nav className="btn-group bg-secondary rounded-pill p-1">
            <Link to="/home" className="btn btn-sm btn-dark rounded-pill">Home</Link>
            <Link to="/music" className="btn btn-sm btn-dark rounded-pill">New Music Friday</Link>
            <Link to="/punjabi" className="btn btn-sm btn-dark rounded-pill">Songs</Link>
          </nav>
        </div>
      </header>

      {/* Render child routes here */}
      <Outlet />
    </div>
  );
};

export default Layout;
