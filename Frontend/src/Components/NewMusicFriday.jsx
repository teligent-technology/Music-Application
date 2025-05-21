// src/pages/NewMusicFriday.jsx

import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const NewMusicFriday = () => {
  return (
    <div className="bg-dark text-white min-vh-100 font-sans">
      {/* Top Bar */}
      <header className="d-flex align-items-center justify-content-between px-3 pt-3 pb-2">
        <div className="d-flex align-items-center gap-3">
          <div className="rounded-circle bg-primary d-flex justify-content-center align-items-center fw-bold fs-5 text-white" style={{ width: "40px", height: "40px" }}>
            <Link to="/profile" className="text-white text-decoration-none">D</Link>
          </div>
          <nav className="d-flex gap-2 bg-secondary rounded-pill px-2 py-1 fw-semibold">
            <Link to="/home" className="btn btn-sm btn-outline-light rounded-pill">Home</Link>
            <Link to="/music" className="btn btn-sm btn-outline-light rounded-pill">New Music Friday</Link>
            <Link to="/punjabi" className="btn btn-sm btn-outline-light rounded-pill">Songs</Link>
          </nav>
        </div>
      </header>

      {/* Header */}
      <section className="mt-4 px-3">
        <h2 className="text-success fw-bold display-5">NEW MUSIC FRIDAY</h2>
        <p className="text-muted mt-2">Catch all the latest music from artists you follow, plus new singles picked for you. Updates every Friday.</p>
      </section>

      {/* Friday Picks */}
      <section className="px-3 mt-4">
        <h3 className="fs-4 fw-bold mb-3">Friday drops picked for you</h3>
        <div className="row g-3">
          {[
            { title: "Santna Gunde", artist: "Masoom Sharma, Komal Chaudhary" },
            { title: "Meri Maa 2", artist: "Mehtab Virk" },
            { title: "Dieti...", artist: "Nimrat Khaira" }
          ].map((song, i) => (
            <div className="col-12 col-md-4" key={i}>
              <img src="https://i.pravatar.cc/60?img=26" alt={song.title} className="img-fluid rounded" />
              <p className="fw-semibold mt-2 mb-0">{song.title}</p>
              <p className="text-muted small">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Top Picks */}
      <section className="px-3 mt-5 mb-5">
        <h3 className="fs-4 fw-bold mb-3">Top picks in new music</h3>
        <div className="row g-3">
          {[
            { title: "Jamoora", artist: "Ek Pahadi Ladka" },
            { title: "Enchanted", artist: "Neha Kakkar" }
          ].map((song, i) => (
            <div className="col-12 col-md-4" key={i}>
              <img src="https://i.pravatar.cc/60?img=26" alt={song.title} className="img-fluid rounded" />
              <p className="fw-semibold mt-2 mb-0">{song.title}</p>
              <p className="text-muted small">{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Music Player Bar */}
      <footer className="bg-black px-3 py-2 d-flex justify-content-between align-items-center fixed-bottom">
        <div className="d-flex align-items-center gap-2">
          <img src="https://i.pravatar.cc/60?img=26" alt="Fuego" className="rounded" width="48" height="48" />
          <div>
            <p className="small fw-semibold mb-0">Fuego • Harnoor, Ilam, Gaby Fuego</p>
            <p className="text-success mb-0 small">chiku❤️</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" className="text-success" viewBox="0 0 16 16">
          <path d="M5.5 3.5A.5.5 0 0 1 6 4v8a.5.5 0 0 1-.777.416L2.5 9.972V6.028l2.723-2.444A.5.5 0 0 1 5.5 3.5z"/>
          <path d="M10.5 3.5A.5.5 0 0 1 11 4v8a.5.5 0 0 1-.777.416L7.5 9.972V6.028l2.723-2.444A.5.5 0 0 1 10.5 3.5z"/>
        </svg>
      </footer>
    </div>
  );
};

export default NewMusicFriday;
