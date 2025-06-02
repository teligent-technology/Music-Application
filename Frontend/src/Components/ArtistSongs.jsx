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
        }

        body {
          color: white !important;
        }

        .artist-background {
          min-height: 100vh;
          background-image: url('${artistBg}');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          image-rendering: auto;
          filter: brightness(0.8) contrast(1.1) saturate(1.2);
          position: relative;
        }

        .artist-background::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(270deg, rgba(0,0,0,0.6), rgba(20,20,60,0.5), rgba(0,0,0,0.7));
          animation: overlayShift 30s ease infinite;
          background-size: 600% 600%;
          z-index: 0;
        }

        @keyframes overlayShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .content {
          position: relative;
          z-index: 1;
        }

        .back-button {
          display: inline-block;
          color: #ffffff;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 8px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.2);
          margin-bottom: 20px;
          transition: 0.3s ease;
        }

        .back-button:hover {
          background-color: rgba(79, 148, 255, 0.2);
          color: #4f94ff;
          border-color: #4f94ff;
        }

        .song-card {
          background: rgba(15, 25, 60, 0.5);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(79, 148, 255, 0.2), inset 0 0 12px rgba(79, 148, 255, 0.06);
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          cursor: pointer;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          animation: fadeIn 0.8s ease forwards;
        }

        .song-card:hover {
          transform: translateY(-10px) scale(1.05);
          box-shadow: 0 30px 50px rgba(79, 148, 255, 0.4), inset 0 0 30px rgba(79, 148, 255, 0.1);
          border-color: #4f94ff;
        }

        .card-img-top {
          height: 200px;
          object-fit: cover;
          border-top-left-radius: 18px;
          border-top-right-radius: 18px;
        }

        h3 {
          text-shadow: 0 0 6px #4f94ff88;
          font-size: 1.8rem;
        }

        .text-primary {
          color: #4f94ff !important;
          text-shadow: 0 0 8px #4f94ffaa;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .frosted-header {
          background: rgba(0, 0, 0, 0.3);
          padding: 20px;
          border-radius: 16px;
          margin-bottom: 24px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>

      <div className="artist-background">
        <div className="content px-3 pt-4">
          <Link to="/home" className="back-button">
            <i className="bi bi-arrow-left"></i> Go to Home
          </Link>

          <div className="frosted-header">
            <h3 className="fw-bold text-white mb-1">
              Songs by <span className="text-primary">{name}</span>
            </h3>
            <p className="text-white-50 small">Curated tracks by your favorite artist</p>
          </div>

          <Container fluid className="pb-5">
            <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-4 px-3">
              {filteredSongs.map((song) => (
                <Col key={song.Id}>
                  <Link
                    to={`/player/${song.artist}/${song.Id}`}
                    className="text-decoration-none"
                    aria-label={`Play song ${song.song} by ${song.artist}`}
                  >
                    <Card className="text-white border-0 song-card h-100 bg-dark">
                      <Card.Img
                        variant="top"
                        src={song.img}
                        alt={song.song}
                        className="card-img-top"
                      />
                      <Card.Body className="p-2">
                        <h6 className="mb-1 text-truncate" title={song.song}>
                          {song.song}
                        </h6>
                        <p
                          className="mb-0 small text-secondary text-truncate"
                          title={song.artist}
                        >
                          {song.artist}
                        </p>
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
