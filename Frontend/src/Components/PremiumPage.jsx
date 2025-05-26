import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './PremiumPage.css'; // For any custom styles if needed
import { Link } from 'react-router-dom';

const PremiumPage = () => {
  return (
    <div className="bg-black text-white pb-5" style={{ paddingBottom: '120px' }}>
      {/* Hero Image Grid */}
      <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
        <div
          className="position-absolute w-100 h-100"
          style={{
            transform: 'rotate(-3deg) scale(1.1)',
            top: 0,
            left: 0,
          }}
        >
          <div className="container-fluid p-0">
            <div className="row g-1">
              {[...Array(3)].map((_, i) => (
                <div className="col" key={`top-${i}`}>
                  <img src="Jass.jpeg" className="img-fluid" style={{ height: '112px', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <div className="row g-1 mt-1">
              {[...Array(3)].map((_, i) => (
                <div className="col" key={`bottom-${i}`}>
                  <img src="Jass.jpeg" className="img-fluid" style={{ height: '112px', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Section */}
      <div className="container mt-4 position-relative" style={{ zIndex: 10 }}>
        <div className="d-flex align-items-center gap-2 mb-3">
          <img src="Jass.jpeg" alt="Premium" width={20} height={20} />
          <span className="text-white-50 small fw-medium">Premium</span>
        </div>

        <h1 className="fs-3 fw-bold mb-4">
          Listen without limits. Try<br />
          4 months of Premium<br />
          Individual for free.
        </h1>

        <div className="d-inline-flex align-items-center gap-2 bg-secondary text-white px-3 py-2 rounded mb-2 small fw-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-info-circle text-primary"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 .877-.252 1.002-.598l.088-.416c.076-.347.223-.494.53-.551l.088-.01.082-.38-.45-.083c-.294-.07-.352-.176-.288-.469l.738-3.468c.194-.897-.105-1.319-.808-1.319-.545 0-.877.252-1.002.598l-.088.416z" />
            <circle cx="8" cy="4.5" r="1" />
          </svg>
          Limited time offer
        </div>

        <p className="text-muted small mb-5">
          You can't upgrade to Premium in the app. We know, it's not ideal.
        </p>

        {/* Why Join Premium */}
        <div className="bg-dark rounded p-4">
          <h2 className="fs-5 fw-bold mb-4">Why join Premium?</h2>
          <ul className="list-unstyled small">
            <li className="d-flex align-items-center mb-3">
              <img src="https://img.icons8.com/ios-filled/20/ffffff/no-audio--v1.png" alt="" className="me-3" />
              Ad-free music listening
            </li>
            <li className="d-flex align-items-center mb-3">
              <img src="https://img.icons8.com/ios-filled/20/ffffff/download--v1.png" alt="" className="me-3" />
              Download to listen offline
            </li>
            <li className="d-flex align-items-center mb-3">
              <img src="https://img.icons8.com/ios-filled/20/ffffff/shuffle.png" alt="" className="me-3" />
              Play songs in any order
            </li>
            <li className="d-flex align-items-center mb-3">
              <img src="https://img.icons8.com/ios-filled/20/ffffff/high-volume--v1.png" alt="" className="me-3" />
              High audio quality
            </li>
            <li className="d-flex align-items-center mb-3">
              <img src="https://img.icons8.com/ios-filled/20/ffffff/group-foreground-selected.png" alt="" className="me-3" />
              Listen with friends in real time
            </li>
          </ul>
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

export default PremiumPage;
