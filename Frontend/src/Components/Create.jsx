import React from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

const CreatePlaylistPage = () => {
  return (
    <div className="bg-black text-white position-relative min-vh-100" style={{ paddingBottom: '120px' }}>
      {/* Hero Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
        <img
          src="your-hero-image.jpg"
          alt="Hero"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: 'blur(5px) brightness(50%)' }}
        />
      </div>

      {/* Foreground Content */}
      <div className="position-relative z-1 p-4 pt-5">
        <div className="d-flex align-items-center text-secondary mb-2">
          <i className="fab fa-spotify text-white me-2" />
          <span className="fw-semibold small">Premium</span>
        </div>

        <h1 className="fw-bold fs-3 mb-3">
          Listen without limits. Try 4 months of Premium Individual for free.
        </h1>

        <div className="bg-secondary bg-opacity-25 text-white px-3 py-2 rounded d-inline-flex align-items-center mb-2 fw-semibold small">
          <i className="fas fa-bell text-primary me-2" />
          Limited time offer
        </div>

        <p className="text-muted small">
          You can’t upgrade to Premium in the app. We know, it's not ideal.
        </p>
      </div>

      {/* Bottom Sheet Modal */}
      <div
        className="position-fixed start-0 end-0 bg-dark text-white rounded-top px-4 py-4"
        style={{ bottom: '70px', margin: '0 20px', height: '300px', zIndex: 20 }}
      >
        <div className="mb-4 d-flex align-items-center">
          <div className="bg-secondary p-3 rounded-circle me-3">
            <i className="fas fa-music text-white fs-5" />
          </div>
          <div>
            <h5 className="mb-1">Playlist</h5>
            <p className="text-muted small mb-0">Build a playlist with songs or episodes</p>
          </div>
        </div>

        <div className="mb-4 d-flex align-items-center">
          <div className="bg-secondary p-3 rounded-circle me-3">
            <i className="fas fa-user-friends text-white fs-5" />
          </div>
          <div>
            <h5 className="mb-1">Collaborative Playlist</h5>
            <p className="text-muted small mb-0">Invite friends and create something together</p>
          </div>
        </div>

        <div className="d-flex align-items-center">
          <div className="bg-secondary p-3 rounded-circle me-3">
            <i className="fas fa-ring text-white fs-5" />
          </div>
          <div>
            <h5 className="mb-1">Blend</h5>
            <p className="text-muted small mb-0">Combine tastes in a shared playlist with friends</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
     <div className="d-md-none position-fixed bottom-0 start-0 end-0 bg-dark text-white border-top border-secondary z-3">
             <div className="d-flex justify-content-around py-2">
               <Link to="/home" className="text-white text-center text-decoration-none">
                 <i className="bi bi-house-door-fill fs-4 d-block" />
                 <small>Home</small>
               </Link>
               <Link to="/search" className="text-white text-center text-decoration-none">
                 <i className="bi bi-search fs-4 d-block" />
                 <small>Search</small>
               </Link>
               <Link to="/library" className="text-white text-center text-decoration-none">
                 <i className="bi bi-music-note-list fs-4 d-block" />
                 <small>Library</small>
               </Link>
               <Link to="/create" className="text-white text-center text-decoration-none">
                 <i className="bi bi-plus-circle-fill fs-4 d-block" />
                 <small>Create</small>
               </Link>
               <Link to="/premium" className="text-white text-center text-decoration-none">
                 <i className="bi bi-gem fs-4 d-block" />
                 <small>Premium</small>
               </Link>
     
     
     
             </div>
           </div>
    </div>
  );
};

export default CreatePlaylistPage;
