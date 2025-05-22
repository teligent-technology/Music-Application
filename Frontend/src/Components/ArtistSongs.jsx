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
    <Container
      fluid
      className="py-4"
      style={{ minHeight: "85vh", backgroundColor: "#121212", color: "white" }}
    >
      <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-3">
        {filteredSongs.map((song) => (
          <Col key={song.Id}>
            <Link
              to={`/player/${song.artist}/${song.Id}`}
              className="text-decoration-none"
            >
              <Card className="bg-dark border-0 h-100">
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
                  <h6 style={{ color: "white" }} className="mb-1 text-truncate">
                    {song.song}
                  </h6>
                  <p style={{ color: "lightgray" }} className="mb-0 small">
                    {song.artist}
                  </p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ArtistSongs;
