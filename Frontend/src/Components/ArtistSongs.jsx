import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Songs } from "../data/song";

const ArtistSongs = () => {
  const { name } = useParams();
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    const filtered = Songs.filter((s) =>
      s.artist.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredSongs(filtered);
  }, [name]);

  return (
    <>

     <div className="text-center mb-4">
             <Link
                      to="/home"
                      className="position-absolute top-0 end-0 m-3 btn btn-outline-warning btn-sm z-3"
                      style={{ zIndex: 3 }}
                    >
                      🏠 Home
                    </Link>
          </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;800&display=swap');

        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          background: #0a0a1a;
          font-family: 'Poppins', sans-serif;
          color: #d0d7ff;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        a:focus-visible {
          outline: 3px solid #726aff;
          outline-offset: 3px;
        }

        .page-wrapper {
          min-height: 100vh;
          padding: 1.5rem 1rem 6rem;
          background:
            linear-gradient(135deg, #140033cc 10%, #020014cc 90%),
            url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80') no-repeat center/cover;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        /* Overlay blur to darken background */
        .page-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(2,2,8,0.88);
          backdrop-filter: blur(16px);
          z-index: 0;
        }

        .header {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-bottom: 2rem;
          color: #a7afff;
          text-shadow:
            0 0 8px #726affcc,
            0 0 15px #9fafffcc;
        }
        .header h1 {
          font-weight: 900;
          font-size: 2.8rem;
          margin: 0 0 0.3rem;
          color: #bbbfff;
        }
        .header p {
          font-weight: 600;
          font-style: italic;
          font-size: 1.05rem;
          letter-spacing: 0.02em;
          color: #8c92b8;
        }

        /* List container */
        .songs-list {
          position: relative;
          width: 100%;
          max-width: 480px;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        /* Each song card */
        .song-card {
          background: rgba(30, 25, 60, 0.6);
          border-radius: 28px;
          backdrop-filter: saturate(180%) blur(12px);
          box-shadow:
            0 8px 16px rgba(112, 86, 255, 0.4),
            inset 0 0 8px #726affaa;
          display: flex;
          align-items: center;
          padding: 1.6rem 1.8rem;
          cursor: pointer;
          transition:
            box-shadow 0.3s ease,
            transform 0.3s ease;
          user-select: none;
          will-change: transform;
        }
        .song-card:hover, .song-card:focus-visible {
          box-shadow:
            0 12px 30px #726affcc,
            inset 0 0 16px #a6afffcc;
          transform: scale(1.06);
          outline: none;
          z-index: 10;
        }

        /* Album art circle */
        .album-art {
          flex-shrink: 0;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          overflow: hidden;
          box-shadow:
            0 0 25px #726affaa,
            inset 0 0 12px #4a49b2cc;
          margin-right: 1.4rem;
          transition: box-shadow 0.3s ease;
          background: #25215b;
        }
        .album-art img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none;
          user-select: none;
        }
        .song-card:hover .album-art {
          box-shadow:
            0 0 40px #a29effdd,
            inset 0 0 20px #726affee;
        }

        /* Song info */
        .song-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .song-info h3 {
          font-weight: 800;
          font-size: 1.35rem;
          margin: 0 0 6px 0;
          color: #d2d7ff;
          text-shadow:
            0 0 6px #726affcc;
        }
        .song-info p {
          font-weight: 600;
          font-size: 1rem;
          color: #b1b6d7cc;
          margin: 0;
          font-style: italic;
          letter-spacing: 0.015em;
          user-select: text;
        }

        /* Play icon circle */
        .play-circle {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(145deg, #6a5aff, #4237c7);
          box-shadow:
            0 0 12px #7e6fff,
            inset 0 0 8px #a7aaff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }
        .play-circle svg {
          fill: #fff;
          width: 24px;
          height: 24px;
        }
        .song-card:hover .play-circle {
          background: linear-gradient(145deg, #908dff, #6e65ff);
          box-shadow:
            0 0 20px #908dff,
            inset 0 0 10px #c4c1ff;
        }

        /* Sticky bottom mini player placeholder */
        .mini-player {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 32px);
          max-width: 480px;
          background: rgba(50, 45, 90, 0.75);
          backdrop-filter: saturate(180%) blur(18px);
          border-radius: 30px;
          padding: 1rem 1.8rem;
          box-shadow:
            0 12px 30px rgba(112, 86, 255, 0.65),
            inset 0 0 12px #8a88ffbb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #cccfff;
          font-weight: 700;
          font-size: 1.05rem;
          user-select: none;
          z-index: 99;
          cursor: default;
          letter-spacing: 0.02em;
          text-shadow: 0 0 5px #726affaa;
        }

        /* Responsive tweaks */
        @media (max-width: 480px) {
          .page-wrapper {
            padding: 1rem 0.6rem 7rem;
          }
          .header h1 {
            font-size: 2.2rem;
          }
          .song-card {
            padding: 1.4rem 1.2rem;
          }
          .album-art {
            width: 80px;
            height: 80px;
            margin-right: 1rem;
          }
          .song-info h3 {
            font-size: 1.15rem;
          }
          .song-info p {
            font-size: 0.9rem;
          }
          .play-circle {
            width: 40px;
            height: 40px;
          }
          .play-circle svg {
            width: 20px;
            height: 20px;
          }
          .mini-player {
            font-size: 1rem;
            padding: 0.9rem 1.2rem;
            border-radius: 24px;
          }
        }
      `}</style>

      <main className="page-wrapper" role="main" aria-label={`Songs by ${name}`}>
        <header className="header">
          <h1>{name} 🎵</h1>
          <p>Enjoy your curated playlist — tap any song to play!</p>
        </header>

        <section className="songs-list" aria-live="polite" aria-relevant="additions">
          {filteredSongs.map(({ Id, song, artist, img }) => (
            <Link
              to={`/player/${artist}/${Id}`}
              key={Id}
              className="song-card"
              tabIndex={0}
              aria-label={`Play song ${song} by ${artist}`}
            >
              <div className="album-art" aria-hidden="true">
                <img src={img} alt={`Cover art for ${song}`} loading="lazy" />
              </div>
              <div className="song-info">
                <h3>{song}</h3>
                <p>{artist}</p>
              </div>
              <div className="play-circle" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="Play icon"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </Link>
          ))}
        </section>

        {/* Sticky mini player placeholder */}
        <div className="mini-player" aria-live="polite" aria-atomic="true">
          🎧 Tap a song to start playing!
        </div>
      </main>
    </>
  );
};

export default ArtistSongs;
