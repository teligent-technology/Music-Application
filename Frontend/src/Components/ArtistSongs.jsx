import React from "react";
import { useParams, Link } from "react-router-dom";
import { Songs } from "../data/song";
import { Container, Row, Col, Card } from "react-bootstrap";

const ArtistSongs = () => {
  const { name } = useParams();

  const filteredSongs = Songs.filter((song) =>
    song.artist.toLowerCase().includes(name.toLowerCase())
  );

  const artistBg = filteredSongs.length > 0 ? filteredSongs[0].artistBg : "";

  return (
    <>
      <style>{`
        /* Reset & body */
        html, body, #root {
          height: 100%;
          margin: 0; padding: 0;
          background: #0c0c22;
          font-family: 'Poppins', sans-serif;
          color: #e0e0e0;
        }
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Background container */
        .artist-background {
          min-height: 100vh;
          background-image: url('${artistBg}');
          background-size: cover;
          background-position: center;
          filter: brightness(0.6);
          position: relative;
          padding: 2rem 0;
        }

        .content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
        }

        /* Back button */
        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255 255 255 / 0.1);
          border-radius: 25px;
          padding: 8px 20px;
          font-weight: 600;
          color: #8ab4f8;
          border: 1.5px solid rgba(138,180,248,0.4);
          text-decoration: none;
          box-shadow: 0 0 8px rgba(138,180,248,0.3);
          user-select: none;
          transition: all 0.3s ease;
          margin-bottom: 2rem;
          width: max-content;
        }
        .back-button:hover {
          background: rgba(138,180,248,0.15);
          box-shadow: 0 8px 25px rgba(92,131,249,0.7);
          color: #d1dbff;
          transform: translateY(-2px);
        }
        .back-button i {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }
        .back-button:hover i {
          transform: translateX(-5px);
        }

        /* Header */
        .header {
          text-align: center;
          margin-bottom: 3rem;
          user-select: none;
        }
        .header h3 {
          font-weight: 800;
          font-size: 2.2rem;
          color: #d1dbff;
          text-shadow: 0 0 15px #5c83f9;
        }
        .header h3 span {
          color: #5c83f9;
          text-shadow: 0 0 20px #5c83f9;
        }
        .header p {
          font-style: italic;
          color: #a8b0cc;
          margin-top: 6px;
          font-size: 1rem;
          user-select: text;
        }

        /* Song cards grid */
        .song-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
          gap: 22px;
        }

        /* Song card */
        .song-card {
          position: relative;
          height: 280px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(30,50,90,0.4);
          cursor: pointer;
          background: #222a50;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: white;
          user-select: none;
          will-change: transform;
        }
        .song-card:hover {
          transform: scale(1.06) translateY(-8px);
          box-shadow: 0 25px 55px rgba(92,131,249,0.7);
          z-index: 10;
        }

        /* Background image overlay */
        .song-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--bg-img);
          background-size: cover;
          background-position: center;
          filter: brightness(0.6) saturate(1.2);
          transition: filter 0.3s ease;
          z-index: 0;
          border-radius: 24px;
        }
        .song-card:hover::before {
          filter: brightness(0.9) saturate(1.4);
        }

        /* Card content */
        .card-content {
          position: relative;
          z-index: 1;
          padding: 20px 20px 25px;
          background: rgba(15,15,40,0.55);
          backdrop-filter: blur(8px);
          border-radius: 0 0 24px 24px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .card-content h6 {
          font-weight: 700;
          font-size: 1.15rem;
          margin-bottom: 6px;
          text-shadow: 0 0 8px rgba(92,131,249,0.5);
        }
        .card-content p {
          font-size: 0.9rem;
          color: #c0c7ff;
          font-style: italic;
          text-shadow: 0 0 5px rgba(92,131,249,0.3);
          margin: 0;
        }

        @media (max-width: 768px) {
          .song-card {
            height: 230px;
          }
        }
        @media (max-width: 480px) {
          .song-card {
            height: 200px;
          }
          .back-button {
            padding: 6px 16px;
            font-size: 0.9rem;
          }
          .header h3 {
            font-size: 1.6rem;
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
