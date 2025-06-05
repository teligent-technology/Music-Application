import React from "react";
import { useParams, Link } from "react-router-dom";
import { Songs } from "../data/song";
import { Container, Row, Col } from "react-bootstrap";

const ArtistSongs = () => {
  const { name } = useParams();

  const filteredSongs = Songs.filter((song) =>
    song.artist.toLowerCase().includes(name.toLowerCase())
  );

  const artistBg = filteredSongs.length > 0 ? filteredSongs[0].artistBg : "";

  return (
    <>
      <style>{`
        /* Global & Reset */
        html, body, #root {
          height: 100%;
          margin: 0; padding: 0;
          background: #0a0a1a;
          font-family: 'Poppins', sans-serif;
          color: #e0e0ff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Background container with subtle overlay */
        .artist-background {
          min-height: 100vh;
          background-image: url('${artistBg}');
          background-size: cover;
          background-position: center;
          position: relative;
          padding: 3rem 1rem 4rem;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .artist-background::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,10,26,0.85) 0%, rgba(10,10,26,0.95) 90%);
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          width: 100%;
          padding: 0 15px;
        }

        /* Back button */
        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(40,40,70,0.15);
          border-radius: 25px;
          padding: 10px 24px;
          font-weight: 700;
          font-size: 1rem;
          color: #8ab4f8;
          border: 1.5px solid rgba(138,180,248,0.5);
          text-decoration: none;
          box-shadow: 0 0 10px rgba(138,180,248,0.3);
          user-select: none;
          transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
          margin-bottom: 3rem;
          width: max-content;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          cursor: pointer;
        }
        .back-button:hover, .back-button:focus-visible {
          background: rgba(138,180,248,0.15);
          box-shadow: 0 8px 30px rgba(92,131,249,0.8);
          color: #d1dbff;
          transform: translateY(-2px);
          outline: none;
        }
        .back-button i {
          font-size: 1.3rem;
          transition: transform 0.35s ease;
        }
        .back-button:hover i, .back-button:focus-visible i {
          transform: translateX(-6px);
        }

        /* Header */
        .header {
          text-align: center;
          margin-bottom: 3.5rem;
          user-select: none;
        }
        .header h3 {
          font-weight: 900;
          font-size: 2.6rem;
          color: #c7d2ff;
          text-shadow: 0 0 25px #5c83f9;
          letter-spacing: 0.04em;
        }
        .header h3 span {
          color: #5c83f9;
          text-shadow: 0 0 30px #5c83f9;
        }
        .header p {
          font-style: italic;
          color: #a0a8cc;
          margin-top: 8px;
          font-size: 1.1rem;
          user-select: text;
        }

        /* Grid container */
        .song-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(220px,1fr));
          gap: 26px;
        }

        /* Each song card */
        .song-card {
          position: relative;
          height: 300px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(30,50,90,0.5);
          cursor: pointer;
          background: #1c2240;
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: #e0e0ff;
          user-select: none;
          will-change: transform;
        }
        .song-card:hover, .song-card:focus-visible {
          transform: scale(1.07) translateY(-10px);
          box-shadow: 0 28px 70px rgba(92,131,249,0.9);
          z-index: 15;
          outline: none;
        }

        /* Background image + gradient overlay */
        .song-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--bg-img);
          background-size: cover;
          background-position: center;
          filter: brightness(0.55) saturate(1.2);
          transition: filter 0.35s ease;
          z-index: 0;
          border-radius: 24px;
        }
        .song-card:hover::before, .song-card:focus-visible::before {
          filter: brightness(0.9) saturate(1.4);
        }
        .song-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: linear-gradient(180deg, transparent 50%, rgba(10,10,35,0.8) 90%);
          z-index: 1;
          pointer-events: none;
        }

        /* Card content container */
        .card-content {
          position: relative;
          z-index: 2;
          padding: 22px 24px 26px;
          background: rgba(15,15,40,0.75);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border-radius: 0 0 24px 24px;
          border-top: 1px solid rgba(255,255,255,0.15);
          user-select: none;
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.12);
          transition: background 0.3s ease;
        }
        .song-card:hover .card-content, .song-card:focus-visible .card-content {
          background: rgba(30,30,65,0.85);
        }

        /* Song title */
        .card-content h6 {
          font-weight: 800;
          font-size: 1.25rem;
          margin-bottom: 8px;
          color: #d4dbff;
          text-shadow:
            0 0 3px #758ee8,
            0 0 6px #5c83f9,
            0 0 12px #5c83f9;
        }

        /* Artist name */
        .card-content p {
          font-size: 1rem;
          font-style: italic;
          color: #aab0d6;
          text-shadow: 0 0 5px #5c83f9aa;
          margin: 0;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .song-card {
            height: 260px;
          }
          .header h3 {
            font-size: 2rem;
          }
          .back-button {
            padding: 8px 20px;
            font-size: 0.95rem;
          }
        }
        @media (max-width: 480px) {
          .song-card {
            height: 220px;
          }
          .header h3 {
            font-size: 1.6rem;
          }
          .back-button {
            padding: 6px 16px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="artist-background" role="main" aria-label={`Songs by ${name}`}>
        <div className="content">
          <Link to="/home" className="back-button" aria-label="Go back to Home page">
            <i className="bi bi-arrow-left"></i> Go to Home
          </Link>

          <header className="header">
            <h3>
              Songs by <span>{name}</span>
            </h3>
            <p>Curated tracks by your favorite artist</p>
          </header>

          <section className="song-grid" aria-live="polite">
            {filteredSongs.map((song) => (
              <Link
                to={`/player/${song.artist}/${song.Id}`}
                key={song.Id}
                style={{ textDecoration: "none" }}
                aria-label={`Play song ${song.song} by ${song.artist}`}
                tabIndex={0}
              >
                <div
                  className="song-card"
                  style={{ "--bg-img": `url(${song.img})` }}
                >
                  <div className="card-content">
                    <h6>{song.song}</h6>
                    <p>{song.artist}</p>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default ArtistSongs;
