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
          padding: 0 0 4rem;
          background-image: url('${artistBg}');
          background-size: cover;
          background-position: center center;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-x: hidden;
          overscroll-behavior-y: contain;
        }

        /* Dark blur overlay */
        .page-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(7,7,26,0.88);
          backdrop-filter: saturate(150%) blur(8px);
          z-index: 0;
          pointer-events: none;
        }

        .content {
          position: relative;
          width: 100%;
          max-width: 480px;
          padding: 1rem 1.2rem 3rem;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Sticky back button at top-left */
        .back-btn {
          position: sticky;
          top: 8px;
          left: 12px;
          z-index: 50;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(40,40,80,0.22);
          color: #8ab4f8;
          border: 1.8px solid rgba(138,180,248,0.55);
          padding: 8px 22px;
          border-radius: 28px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 0 15px rgba(92,131,249,0.65);
          user-select: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          margin-bottom: 1.8rem;
        }
        .back-btn:hover, .back-btn:focus-visible {
          color: #d1dbff;
          background: rgba(92,131,249,0.3);
          box-shadow: 0 0 30px #5c83f9cc;
          transform: translateY(-2px);
          outline: none;
        }
        .back-btn i {
          font-size: 1.4rem;
          transition: transform 0.3s ease;
        }
        .back-btn:hover i, .back-btn:focus-visible i {
          transform: translateX(-6px);
        }

        /* Header */
        .header {
          width: 100%;
          margin-bottom: 2.8rem;
          user-select: none;
          text-align: left;
          padding-left: 4px;
        }
        .header h3 {
          font-weight: 900;
          font-size: 2.4rem;
          color: #d4d9ff;
          letter-spacing: 0.02em;
          text-shadow:
            0 0 10px #8aa2ff88,
            0 0 22px #5c83f9cc;
          margin-bottom: 0.2rem;
        }
        .header h3 span {
          color: #5c83f9;
          text-shadow:
            0 0 18px #5c83f9cc,
            0 0 35px #7387f9ff;
        }
        .header p {
          font-style: italic;
          font-weight: 500;
          color: #a8b2d8cc;
          font-size: 1.05rem;
          margin-top: 0;
          padding-left: 2px;
        }

        /* Horizontal scroll container for cards */
        .song-carousel {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-padding-left: 16px;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 12px;
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
          scrollbar-color: #5c83f9 transparent;
          user-select: none;
        }
        .song-carousel::-webkit-scrollbar {
          height: 6px;
        }
        .song-carousel::-webkit-scrollbar-thumb {
          background-color: #5c83f9cc;
          border-radius: 20px;
        }

        /* Each card inside horizontal scroll */
        .song-card {
          flex: 0 0 180px;
          scroll-snap-align: center;
          border-radius: 22px;
          overflow: hidden;
          background: linear-gradient(145deg, #12173c, #1c2370);
          box-shadow:
            0 5px 14px rgba(40, 55, 110, 0.7),
            0 0 10px #4a66d0cc;
          cursor: pointer;
          transition:
            transform 0.35s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.35s cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
          position: relative;
          user-select: none;
          outline-offset: 5px;
        }

        /* Scale and glow on hover/focus */
        .song-card:hover, .song-card:focus-visible {
          transform: scale(1.15);
          box-shadow:
            0 20px 45px rgba(50, 70, 150, 0.9),
            0 0 40px #7387f9cc,
            0 0 65px #5c83f9ff;
          outline: none;
          z-index: 10;
        }

        /* Image fills entire card */
        .img-container {
          position: relative;
          width: 100%;
          height: 180px;
          border-radius: 22px 22px 0 0;
          overflow: hidden;
          box-shadow:
            inset 0 0 30px #5c83f9bb;
          transition: box-shadow 0.3s ease;
          background: #222b5e;
        }
        .song-card:hover .img-container {
          box-shadow:
            inset 0 0 50px #7a94ffcc;
        }
        .img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
          border-radius: 22px 22px 0 0;
          will-change: transform;
          user-select: none;
          pointer-events: none;
        }
        .song-card:hover .img-container img {
          transform: scale(1.07);
        }

        /* Info panel overlays bottom part of image with blur */
        .info-panel {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 12px 14px;
          background: rgba(15, 20, 55, 0.75);
          backdrop-filter: blur(16px);
          border-radius: 0 0 22px 22px;
          box-shadow:
            inset 0 0 14px #5c83f9aa;
          display: flex;
          flex-direction: column;
          gap: 2px;
          user-select: text;
          color: #d6d9ff;
          animation: pulseGlow 2.8s ease-in-out infinite alternate;
          will-change: opacity, box-shadow;
        }
        @keyframes pulseGlow {
          0% {
            box-shadow: inset 0 0 12px #5575eeaa;
            opacity: 0.92;
          }
          100% {
            box-shadow: inset 0 0 20px #a1b2ffcc;
            opacity: 1;
          }
        }
        .info-panel h6 {
          font-weight: 800;
          font-size: 1.15rem;
          margin: 0;
          text-shadow:
            0 0 8px #7a94ffcc,
            0 0 16px #5c83f9cc;
          line-height: 1.2;
          user-select: text;
        }
        .info-panel p {
          margin: 0;
          font-style: italic;
          font-weight: 600;
          color: #b0b7e0cc;
          font-size: 0.92rem;
          letter-spacing: 0.01em;
          user-select: text;
          text-shadow: 0 0 5px #5c83f933;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Keyboard accessibility */
        .song-card:focus-visible {
          outline: 3px solid #7a94ffcc;
          outline-offset: 5px;
          z-index: 20;
        }

        /* Mobile only tweaks */
        @media (min-width: 481px) {
          .song-carousel {
            flex-wrap: wrap;
            overflow-x: visible;
            justify-content: center;
            gap: 32px;
            scroll-snap-type: none;
          }
          .song-card {
            flex: 1 1 220px;
            height: auto;
            scroll-snap-align: none;
            transform: none !important;
          }
          .img-container {
            height: 220px;
          }
          .info-panel {
            position: relative;
            animation: none;
            padding: 18px 22px;
            border-radius: 0 0 20px 20px;
            background: rgba(10, 10, 30, 0.85);
            box-shadow:
              0 0 14px #5c83f9aa,
              inset 0 -1px 3px rgba(255,255,255,0.1);
            user-select: none;
            color: #d4d9ff;
          }
          .info-panel h6 {
            font-size: 1.3rem;
          }
          .info-panel p {
            font-size: 1rem;
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
          }
        }
      `}</style>

      <main className="page-wrapper" role="main" aria-label={`Songs by ${name}`}>
        <div className="content">
          <Link to="/home" className="back-btn" aria-label="Go back to Home page">
            <i className="bi bi-arrow-left"></i> Home
          </Link>

          <header className="header">
            <h3>
              Songs by <span>{name}</span>
            </h3>
            <p>Your handpicked collection of amazing tracks</p>
          </header>

          <section className="song-carousel" aria-live="polite" aria-relevant="additions">
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
                    <img src={song.img} alt={`Cover art of ${song.song}`} loading="lazy" />
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
