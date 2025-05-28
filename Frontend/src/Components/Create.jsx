import React from 'react';
import { Link } from 'react-router-dom';

const CreatePlaylistPage = () => {
  return (
    <div className="bg-black text-white position-relative min-vh-100" style={{ paddingBottom: '120px' }}>
      {/* Background image with gradient overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
        <img
          src="your-hero-image.jpg"
          alt="Hero"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: 'brightness(40%) blur(4px)', objectPosition: 'center' }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.95))',
          }}
        />
      </div>

      {/* Hero content */}
      <div className="position-relative z-1 p-4 pt-5 text-center">
        <div className="d-flex justify-content-center align-items-center text-secondary mb-2">
          <i className="fab fa-spotify text-success me-2 fs-5" />
          <span className="fw-semibold small text-light">Premium</span>
        </div>

        <div className="mx-auto" style={{ maxWidth: "480px" }}>
          <h1 className="fw-bold display-6 mb-3">
            Create your vibe.<br />Listen without limits.
          </h1>

          <div className="bg-white bg-opacity-10 text-white px-4 py-2 rounded-3 d-inline-flex align-items-center mb-3 fw-semibold small shadow-sm" style={{ backdropFilter: 'blur(5px)' }}>
            <i className="fas fa-bell text-warning me-2" />
            Limited time offer — 4 months Premium free
          </div>

          <p className="text-muted small mb-4 text-white">
            You can’t upgrade to Premium in the app. We know, it’s not ideal. But you can still create your perfect playlist!
          </p>
        </div>
      </div>

      {/* Create Playlist CTA */}
      <div
        className="position-fixed start-0 end-0 bg-dark text-white rounded-top px-4 py-4 shadow-lg"
        style={{ bottom: '70px', margin: '0 20px', zIndex: 20 }}
      >
        <div className="text-center">
          <Link
            to="/playlist"
            className="btn btn-warning text-dark px-5 py-2 fw-bold rounded-pill"
            style={{ fontSize: "1.2rem" }}
          >
            🎵 Create Custom Playlist
          </Link>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="d-md-none position-fixed bottom-0 start-0 end-0 bg-dark text-white border-top border-secondary z-3">
        <div className="d-flex justify-content-around py-2">
          {[
            { to: "/home", icon: "bi-house-door-fill", label: "Home" },
            { to: "/search", icon: "bi-search", label: "Search" },
            { to: "/punjabi", icon: "bi-music-note-list", label: "Library" },
            { to: "/create", icon: "bi-plus-circle-fill", label: "Create" },
            { to: "/premium", icon: "bi-gem", label: "Premium" },
          ].map((item, idx) => (
            <Link key={idx} to={item.to} className="text-white text-center text-decoration-none">
              <i className={`bi ${item.icon} fs-4 d-block`} />
              <small>{item.label}</small>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistPage;
