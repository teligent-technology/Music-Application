import React from "react";
import { useParams, Link } from "react-router-dom";
import { Songs } from "../data/song";
import { Container, Row, Col, Card } from "react-bootstrap";

const ArtistSongs = () => {
  const { name } = useParams();

  // Filter songs where artist matches the URL param (case insensitive)
  const filteredSongs = Songs.filter((song) =>
    song.artist.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <>
      <style>{`
        html, body, #root {
          background-color: #000000 !important;
          color: white !important;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        a {
          color: white;
        }
        a:hover, a:focus {
          color: #0d6efd;
          text-decoration: none;
        }
        .song-card {
          transition: transform 0.2s ease, box-shadow 0.3s ease;
          border-radius: 12px;
          overflow: hidden;
        }
        .song-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(13, 110, 253, 0.4);
        }
        .card-img-top {
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }
      `}</style>

      <div className="px-3 pt-4">
        <Link
  to="/home"
  className="btn btn-outline-light d-inline-flex align-items-center gap-2 mb-4 px-4 py-2"
  style={{
    fontSize: "1rem",
    borderRadius: "30px",
    borderWidth: "2px",
    transition: "all 0.3s ease",
  }}
>
  <i className="bi bi-arrow-left"></i> Go to Home
</Link>

        <h3 className="mb-4 fw-bold text-white">
          Songs by <span className="text-primary">{name}</span>
        </h3>
      </div>

      <Container fluid className="pb-5">
        <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-4 px-3">
          {filteredSongs.map((song) => (
            <Col key={song.Id}>
              <Link
                to={`/player/${song.artist}/${song.Id}`}
                className="text-decoration-none"
              >
                <Card className="bg-dark text-white border-0 song-card h-100">
                  <div
                    style={{
                      height: "200px",
                      backgroundColor: "#1e1e1e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={song.img}
                      alt={song.song}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <Card.Body className="p-2">
                    <h6 className="mb-1 text-truncate text-white">
                      {song.song}
                    </h6>
                    <p className="mb-0 small text-secondary text-truncate">
                      {song.artist}
                    </p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ArtistSongs;
