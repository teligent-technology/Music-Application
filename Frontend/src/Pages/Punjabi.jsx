import React from "react";
import { Link } from "react-router-dom";
import { Songs } from "../data/song";
import AudioPlayer from "../Components/AudioPlayer";

const Punjabi = () => {
  console.log("Songs in Punjabi component:", Songs);

  return (
    <div
      className="bg-dark text-white"
      style={{
        // backgroundImage: "url('/background.jpg')", // Uncomment and use correct path if needed
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <div className="text-center mb-4">
        <Link
          to="/home"
          className="btn btn-lg btn-outline-light px-4 py-2 fw-bold rounded-pill shadow-lg"
          style={{
            fontSize: "1.2rem",
            background: "linear-gradient(135deg, #00c6ff, #0072ff)",
            color: "#fff",
            border: "none",
            transition: "all 0.4s ease",
            boxShadow: "0 4px 15px rgba(0, 114, 255, 0.4)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 6px 20px rgba(0, 114, 255, 0.6)";
            e.target.style.background = "linear-gradient(135deg, #0072ff, #00c6ff)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 15px rgba(0, 114, 255, 0.4)";
            e.target.style.background = "linear-gradient(135deg, #00c6ff, #0072ff)";
          }}
        >
          <i className="bi bi-house-door me-2"></i>
          Go to Home
        </Link>
      </div>

      <nav style={{ marginBottom: "20px" }}>
        <div className="d-flex justify-content-center gap-5 mt-4">
          {/* Add any additional navigation elements here if needed */}
        </div>
      </nav>

      <AudioPlayer songsList={Songs} />


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
                <Link to="/punjabi" className="text-white text-center text-decoration-none">
                  <i className="bi bi-music-note-list fs-4 d-block" />
                  <small>Library</small>
      
                              {/* <Link to="/punjabi" className="btn btn-sm btn-dark rounded-pill px-4">Songs</Link> */}
      
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

export default Punjabi;
