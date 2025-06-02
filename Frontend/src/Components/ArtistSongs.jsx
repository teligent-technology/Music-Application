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
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #0c0c22; /* fallback bg */
          font-family: 'Poppins', sans-serif;
        }

        body {
          color: #e0e0e0 !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .artist-background {
          min-height: 100vh;
          background-image: url('${artistBg}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          filter: brightness(0.75) contrast(1.15) saturate(1.3);
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .artist-background::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(270deg, rgba(10,10,30,0.8), rgba(15,15,45,0.7), rgba(10,10,30,0.85));
          animation: overlayShift 35s ease infinite;
          background-size: 600% 600%;
          z-index: 0;
          pointer-events: none;
        }

        @keyframes overlayShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .content {
          position: relative;
          z-index: 1;
          padding: 2rem 1.5rem 3rem;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #8ab4f8;
          text-decoration: none;
          padding: 10px 18px;
          border-radius: 30px;
          background: rgba(255 255 255 / 0.1);
          border: 1.5px solid rgba(138, 180, 248, 0.4);
          font-weight: 600;
          font-size: 0.95rem;
          box-shadow: 0 0 10px rgba(138, 180, 248, 0.25);
          transition: background-color 0.35s ease, color 0.35s ease, box-shadow 0.35s ease, transform 0.3s ease;
          user-select: none;
          will-change: transform, box-shadow;
        }

        .back-button:hover, .back-button:focus {
          background-color: rgba(138, 180, 248, 0.15);
          color: #d1dbff;
          border-color: #5c83f9;
          box-shadow: 0 8px 25px rgba(92, 131, 249, 0.7);
          transform: translateY(-3px) scale(1.05);
          outline: none;
        }

        .back-button i {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }
        .back-button:hover i {
          transform: translateX(-4px);
        }

        .frosted-header {
          background: rgba(15, 15, 40, 0.45);
          padding: 26px 24px 22px;
          border-radius: 24px;
          margin-bottom: 28px;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(138, 180, 248, 0.15);
          box-shadow: 0 0 20px rgba(92, 131, 249, 0.15);
          text-align: center;
          user-select: none;
          will-change: transform;
          transition: box-shadow 0.4s ease;
        }
        .frosted-header:hover {
          box-shadow: 0 0 35px rgba(92, 131, 249, 0.35);
          transform: translateY(-3px);
        }

        .frosted-header h3 {
          text-shadow: 0 0 14px #5c83f9bb;
          font-size: 2.1rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
          color: #d1dbff;
          user-select: text;
        }

        .text-primary {
          color: #5c83f9 !important;
          text-shadow: 0 0 14px #5c83f9ee;
          font-weight: 700;
        }

        .frosted-header p {
          font-size: 1rem;
          color: #a8b0cc;
          font-style: italic;
          letter-spacing: 0.02em;
          user-select: text;
        }

        /* Card grid spacing */
        .row.g-4 > [class*="col-"] {
          display: flex;
          align-items: stretch;
        }

        .song-card {
          background: rgba(30, 30, 60, 0.7);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(92, 131, 249, 0.3), inset 0 0 15px rgba(92, 131, 249, 0.1);
          transition:
            transform 0.45s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.45s cubic-bezier(0.4, 0, 0.2, 1),
            border-color 0.3s ease;
          cursor: pointer;
          backdrop-filter: blur(15px);
          border: 1.5px solid rgba(92, 131, 249, 0.15);
          display: flex;
          flex-direction: column;
          will-change: transform, box-shadow;
          animation: fadeInUp 0.7s ease forwards;
        }

        .song-card:hover, .song-card:focus-within {
          transform: translateY(-12px) scale(1.07);
          box-shadow:
            0 38px 60px rgba(92, 131, 249, 0.5),
            inset 0 0 35px rgba(92, 131, 249, 0.15);
          border-color: #5c83f9;
          outline: none;
          z-index: 1;
        }

        .card-img-top {
          height: 210px;
          object-fit: cover;
          border-top-left-radius: 24px;
          border-top-right-radius: 24px;
          filter: drop-shadow(0 4px 5px rgba(30, 50, 90, 0.3));
          transition: filter 0.35s ease;
        }
        .song-card:hover .card-img-top {
          filter: drop-shadow(0 8px 12px rgba(92, 131, 249, 0.5));
        }

        .card-body {
          flex-grow: 1;
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          user-select: none;
        }

        h6.mb-1 {
          font-weight: 700;
          font-size: 1.15rem;
          color: #d1dbff;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.015em;
          user-select: text;
          text-shadow: 0 0 8px rgba(92, 131, 249, 0.7);
          transition: color 0.3s ease;
        }

        p.mb-0 {
          font-size: 0.9rem;
          color: #a0a8ce;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: 0.02em;
          user-select: text;
          text-shadow: 0 0 6px rgba(92, 131, 249, 0.3);
          transition: color 0.3s ease;
        }

        .song-card:hover h6.mb-1,
        .song-card:hover p.mb-0 {
          color: #9bb7ff;
          text-shadow: 0 0 14px #8fa8ff;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive tweaks */
        @media (max-width: 768px) {
          .frosted-header h3 {
            font-size: 1.6rem;
          }
          .card-img-top {
            height: 160px;
          }
          h6.mb-1 {
            font-size: 1rem;
          }
          p.mb-0 {
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .content {
            padding: 1.2rem 1rem 2rem;
          }
          .back-button {
            padding: 8px 14px;
            font-size: 0.9rem;
          }
          .frosted-header {
            padding: 18px 16px 14px;
            border-radius: 18px;
          }
        }
      `}</style>

      <div className="artist-background">
        <div className="content">
          <Link to="/home" className="back-button" aria-label="Go back to home">
            <i className="bi bi-arrow-left"></i> Go to Home
          </Link>

          <div className="frosted-header" role="banner">
            <h3 className="fw-bold text-white mb-1">
              Songs by <span className="text-primary">{name}</span>
            </h3>
            <p className="text-white-50 small">
              Curated tracks by your favorite artist
            </p>
          </div>

          <Container fluid className="pb-5">
            <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-4 px-3">
              {filteredSongs.map((song) => (
                <Col key={song.Id}>
                  <Link
                    to={`/player/${song.artist}/${song.Id}`}
                    className="text-decoration-none"
                    aria-label={`Play song ${song.song} by ${song.artist}`}
                    tabIndex={0}
                  >
                    <Card className="text-white border-0 song-card h-100 bg-dark">
                      <Card.Img
                        variant="top"
                        src={song.img}
                        alt={`${song.song} cover art`}
                        className="card-img-top"
                        loading="lazy"
                      />
                      <Card.Body>
                        <h6 className="mb-1">{song.song}</h6>
                        <p className="mb-0 text-muted">{song.artist}</p>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default ArtistSongs;
