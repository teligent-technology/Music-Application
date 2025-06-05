import React from "react";
import { useParams, Link } from "react-router-dom";
import { Songs } from "../data/song";

const ArtistSongs = () => {
  const { name } = useParams();

  const filteredSongs = Songs.filter((song) =>
    song.artist.toLowerCase().includes(name.toLowerCase())
  );

  const artistBg = filteredSongs.length > 0 ? filteredSongs[0].artistBg : "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;800&display=swap');

        html, body, #root {
          margin: 0; padding: 0; height: 100%;
          background: #07071a;
          font-family: 'Poppins', sans-serif;
          color: #eef0ff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .page-wrapper {
          min-height: 100vh;
          padding: 2rem 1rem 4rem;
          background-image: url('${artistBg}');
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow-x: hidden;
        }

        /* Overlay to darken background */
        .page-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(7,7,26,0.9);
          backdrop-filter: blur(8px);
          z-index: 0;
        }

        .content {
          position: relative;
          max-width: 1100px;
          width: 100%;
          z-index: 1;
        }

        /* Back button with glow */
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(40,40,80,0.15);
          color: #8ab4f8;
          border: 1.8px solid rgba(138,180,248,0.5);
          padding: 10px 28px;
          border-radius: 28px;
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 0 12px rgba(92,131,249,0.6);
          user-select: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          margin-bottom: 3rem;
          width: max-content;
        }
        .back-btn:hover, .back-btn:focus-visible {
          color: #d1dbff;
          background: rgba(92,131,249,0.2);
          box-shadow: 0 0 25px #5c83f9cc;
          transform: translateY(-2px);
          outline: none;
        }
        .back-btn i {
          font-size: 1.3rem;
          transition: transform 0.3s ease;
        }
        .back-btn:hover i, .back-btn:focus-visible i {
          transform: translateX(-5px);
        }

        /* Header */
        .header {
          text-align: center;
          margin-bottom: 3.5rem;
          user-select: none;
        }
        .header h3 {
          font-weight: 900;
          font-size: 3rem;
          color: #d4d9ff;
          letter-spacing: 0.03em;
          text-shadow:
            0 0 8px #8aa2ff88,
            0 0 18px #5c83f9cc;
        }
        .header h3 span {
          color: #5c83f9;
          text-shadow:
            0 0 15px #5c83f9cc,
            0 0 30px #7387f9ff;
        }
        .header p {
          font-style: italic;
          font-weight: 500;
          color: #b0b7e0;
          margin-top: 6px;
          font-size: 1.15rem;
        }

        /* Grid container */
        .song-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(260px,1fr));
          gap: 32px;
          padding-bottom: 20px;
        }

        /* Card styling */
        .song-card {
          position: relative;
          border-radius: 20px;
          overflow: visible;
          background: linear-gradient(145deg, #11153c, #1a1f63);
          box-shadow:
            0 6px 12px rgba(30, 40, 80, 0.7),
            0 0 10px #4757d6cc;
          cursor: pointer;
          transition:
            transform 0.4s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.4s cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
          outline-offset: 5px;
        }

        /* 3D tilt hover effect */
        .song-card:hover, .song-card:focus-visible {
          transform: translateY(-15px) scale(1.08);
          box-shadow:
            0 20px 40px rgba(30, 40, 80, 0.9),
            0 0 40px #7180ffee,
            0 0 60px #5c83f9ff;
          outline: none;
          z-index: 15;
        }

        /* Image container */
        .img-container {
          width: 100%;
          aspect-ratio: 1 / 1;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          overflow: hidden;
          box-shadow:
            inset 0 0 40px #5c83f9bb;
          transition: box-shadow 0.3s ease;
        }
        .song-card:hover .img-container {
          box-shadow:
            inset 0 0 60px #7a94ffcc;
        }
        .img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          transition: transform 0.4s ease;
        }
        .song-card:hover .img-container img {
          transform: scale(1.05);
        }

        /* Info panel - frosted glass overlapping the image */
        .info-panel {
          position: relative;
          background: rgba(10,10,30,0.8);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 0 0 20px 20px;
          padding: 18px 22px 26px;
          margin-top: -26px;
          box-shadow:
            0 0 14px #5c83f9aa,
            inset 0 -1px 3px rgba(255,255,255,0.1);
          user-select: none;
          transition: background 0.3s ease;
        }
        .song-card:hover .info-panel {
          background: rgba(15,15,40,0.9);
        }

        .info-panel h6 {
          margin: 0 0 6px 0;
          font-weight: 800;
          font-size: 1.3rem;
          color: #d4d9ff;
          text-shadow:
            0 0 5px #7a94ffcc,
            0 0 10px #5c83f9cc;
          user-select: text;
        }

        .info-panel p {
          margin: 0;
          font-style: italic;
          font-weight: 500;
          color: #abb2d6cc;
          user-select: text;
          font-size: 1rem;
          letter-spacing: 0.02em;
          text-shadow: 0 0 6px #5c83f933;
        }

        /* Accessibility: keyboard focus visible */
        .song-card:focus-visible {
          outline: 3px solid #7a94ffcc;
          outline-offset: 4px;
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .header h3 {
            font-size: 2.4rem;
          }
          .song-grid {
            gap: 24px;
          }
        }
        @media (max-width: 480px) {
          .header h3 {
            font-size: 1.9rem;
          }
          .song-grid {
            grid-template-columns: repeat(auto-fit,minmax(180px,1fr));
            gap: 20px;
          }
          .info-panel h6 {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <main className="page-wrapper" role="main" aria-label={`Songs by ${name}`}>
        <div className="content">
          <Link to="/home" className="back-btn" aria-label="Go back to Home page">
            <i className="bi bi-arrow-left"></i> Go to Home
          </Link>

          <header className="header">
            <h3>
              Songs by <span>{name}</span>
            </h3>
            <p>Your handpicked collection of amazing tracks</p>
          </header>

          <section className="song-grid" aria-live="polite" aria-relevant="additions">
            {filteredSongs.map((song) => (
              <Link
                to={`/player/${song.artist}/${song.Id}`}
                key={song.Id}
                tabIndex={0}
                aria-label={`Play song ${song.song} by ${song.artist}`}
                style={{ textDecoration: "none" }}
              >
                <article className="song-card">
                  <div className="img-container" aria-hidden="true">
                    <img src={song.img} alt={`Cover art of ${song.song}`} />
                  </div>
                  <div className="info-panel">
                    <h6>{song.song}</h6>
                    <p>{song.artist}</p>
                  </div>
                </article>
              </Link>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default ArtistSongs;
