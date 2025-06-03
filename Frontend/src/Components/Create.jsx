import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterIcon from "./FooterIcon"; // Make sure this path is correct

const CreatePlaylistPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser.isPremium) {
        alert("Only Premium users can create playlists. Please upgrade to Premium.");
        navigate("/premium");
      } else {
        setIsLoading(false);
      }
    } else {
      alert("Please login first.");
      navigate("/");
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-white bg-black">
        <h5>Checking Premium Access...</h5>
      </div>
    );
  }

  return (
    <div
      className="bg-black text-white position-relative min-vh-100"
      style={{ paddingBottom: "120px" }}
    >
      {/* Background image with gradient overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
        <img
          src="your-hero-image.jpg"
          alt="Hero"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: "brightness(40%) blur(4px)", objectPosition: "center" }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.95))",
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
            Create your vibe.
            <br />
            Listen without limits.
          </h1>

          <div
            className="bg-white bg-opacity-10 text-white px-4 py-2 rounded-3 d-inline-flex align-items-center mb-3 fw-semibold small shadow-sm"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <i className="fas fa-bell text-warning me-2" />
            Limited time offer — 4 months Premium free
          </div>

          <p className="text-muted small mb-4 text-white">
            You’ve unlocked Premium! Now create your perfect playlist.
          </p>
        </div>
      </div>

      {/* Create Playlist CTA */}
      <div
        className="position-fixed start-0 end-0 bg-dark text-white rounded-top px-4 py-4 shadow-lg"
        style={{ bottom: "70px", margin: "0 20px", zIndex: 20 }}
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

      {/* Mobile Footer using FooterIcon */}
      <div className="d-md-none position-fixed bottom-0 start-0 end-0 bg-dark text-white border-top border-secondary z-3">
        <nav className="mobile-footer d-md-none d-flex justify-content-around py-2 w-100">
          <FooterIcon to="/home" icon="bi-house-door-fill" label="Home" />
          <FooterIcon to="/search" icon="bi-search" label="Search" />
          <FooterIcon to="/punjabi" icon="bi-music-note-list" label="Library" />
          <FooterIcon to="/create" icon="bi-plus-circle-fill" label="Create" />
          <FooterIcon to="/premium" icon="bi-gem" label="Premium" />
        </nav>
      </div>
    </div>
  );
};

export default CreatePlaylistPage;
