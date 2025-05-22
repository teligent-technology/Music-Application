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
          color: #0d6efd; /* bootstrap primary blue for hover */
          text-decoration: underline;
        }
      `}</style>

      <Container
        fluid
        className="py-4"
        style={{
          minHeight: "85vh",
          backgroundColor: "#000000",
          color: "white",
          borderBottom: "none",
          boxShadow: "none",
        }}
      >
        <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-3">
          {filteredSongs.map((song) => (
            <Col key={song.Id}>
              <Link
                to={`/player/${song.artist}/${song.Id}`}
                className="text-decoration-none"
              >
                <Card className="bg-black border-0 h-100">
                  <div
                    style={{
                      height: "160px",
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
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <Card.Body className="p-2">
                    <h6 className="mb-1 text-truncate" style={{ color: "white" }}>
                      {song.song}
                    </h6>
                    <p className="mb-0 small" style={{ color: "lightgray" }}>
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
