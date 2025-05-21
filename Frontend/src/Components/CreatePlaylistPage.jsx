import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';
import {
  faMusic,
  faUserFriends,
  faBell,
  faRing,
  faHome,
  faBars,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

const CreatePlaylistPage = () => {
  return (
    <div className="text-white bg-black position-relative min-vh-100 font-sans">

      {/* Background Hero Image */}
      <div className="position-absolute top-0 start-0 w-100 h-100 z-n1">
        <img
          src="your-hero-image.jpg"
          alt="Hero"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: 'blur(5px) brightness(50%)' }}
        />
      </div>

      {/* Foreground Content */}
      <div className="position-relative p-4 pt-5">
        {/* Spotify Premium */}
        <div className="d-flex align-items-center text-secondary mb-2">
          <FontAwesomeIcon icon={faSpotify} className="text-white me-2" />
          <span className="fw-semibold small">Premium</span>
        </div>

        {/* Headline */}
        <h1 className="fs-3 fw-bold">
          Listen without limits. Try 4 months of Premium Individual for free.
        </h1>

        {/* Limited Offer Box */}
        <div className="bg-opacity-10 bg-white text-white px-3 py-2 rounded w-auto d-inline-flex align-items-center gap-2 fw-semibold small mt-3">
          <FontAwesomeIcon icon={faBell} className="text-primary" />
          <span>Limited time offer</span>
        </div>

        {/* Subtext */}
        <p className="text-muted small mt-2">
          You can’t upgrade to Premium in the app. We know, it's not ideal.
        </p>
      </div>

      {/* Bottom Sheet Modal */}
      <div
        className="position-fixed start-0 end-0 bg-dark px-4 py-4 rounded-top z-3"
        style={{ bottom: '70px', margin: '0 20px', height: '300px' }}
      >
        <div className="d-flex flex-column gap-4">
          {/* Playlist Option */}
          <div className="d-flex align-items-center gap-3">
            <div className="bg-secondary p-3 rounded-circle">
              <FontAwesomeIcon icon={faMusic} className="text-white fs-5" />
            </div>
            <div>
              <h5 className="fw-semibold text-white mb-0">Playlist</h5>
              <small className="text-muted">Build a playlist with songs, or episodes</small>
            </div>
          </div>

          {/* Collaborative Playlist */}
          <div className="d-flex align-items-center gap-3">
            <div className="bg-secondary p-3 rounded-circle">
              <FontAwesomeIcon icon={faUserFriends} className="text-white fs-5" />
            </div>
            <div>
              <h5 className="fw-semibold text-white mb-0">Collaborative Playlist</h5>
              <small className="text-muted">Invite friends and create something together</small>
            </div>
          </div>

          {/* Blend */}
          <div className="d-flex align-items-center gap-3 mb-5">
            <div className="bg-secondary p-3 rounded-circle">
              <FontAwesomeIcon icon={faRing} className="text-white fs-5" />
            </div>
            <div>
              <h5 className="fw-semibold text-white mb-0">Blend</h5>
              <small className="text-muted">Combine tastes in a shared playlist with friends</small>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="position-fixed bottom-0 start-0 end-0 bg-black border-top border-secondary text-white py-2 px-4 d-flex justify-content-between text-center">
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faHome} className="fs-5" />
          <a href="index.html" className="text-white text-decoration-none small">Home</a>
        </div>
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faSearch} className="fs-5" />
          <a href="search.html" className="text-white text-decoration-none small">Search</a>
        </div>
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faBars} className="fs-5" />
          <a href="library.html" className="text-white text-decoration-none small">Your Library</a>
        </div>
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faSpotify} className="fs-5" />
          <a href="premium.html" className="text-white text-decoration-none small">Premium</a>
        </div>
        <div className="d-flex flex-column align-items-center">
          <FontAwesomeIcon icon={faPlus} className="fs-5" />
          <a href="create.html" className="text-white text-decoration-none small">Create</a>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistPage;
