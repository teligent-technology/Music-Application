import React from "react";
import { useParams, Link } from "react-router-dom";
import { Songs } from "../data/song";
import { Container, Row, Col, Card, Button, Breadcrumb } from "react-bootstrap";

const ArtistSongs = () => {
  const { name } = useParams();
  const filteredSongs = Songs.filter((song) =>
    song.artist.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <Container fluid className="py-4 text-white" style={{ minHeight: "85vh" }}>
      {/* Breadcrumb navigation */}
      <Breadcrumb className="bg-dark px-3 py-2 rounded mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Songs by {name}</Breadcrumb.Item>
      </Breadcrumb>

      <h3 className="text-center fw-bold mb-4 text-light">
        Songs by <span className="text-info">{name}</span>
      </h3>

      {filteredSongs.length === 0 ? (
        <div className="text-center text-muted">
          <p>No songs found for this artist.</p>
          <Button as={Link} to="/" variant="outline-light" size="sm" className="mt-2">
            ⬅ Back to Home
          </Button>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredSongs.map((song) => (
            <Col key={song.Id}>
              <Link
                to={`/player/${song.artist}/${song.Id}`}
                className="text-decoration-none"
              >
                <Card
                  className="bg-dark text-white h-100 shadow-sm border-0 d-flex flex-column hover-shadow transition"
                  style={{ minHeight: "320px" }}
                >
                  {/* Fixed image container */}
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    <Card.Img
                      variant="top"
                      src={song.img}
                      alt={song.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderTopLeftRadius: ".5rem",
                        borderTopRightRadius: ".5rem",
                      }}
                    />
                  </div>

                  {/* Card content with consistent spacing */}
                  <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                      <Card.Title className="h6 mb-1 text-truncate">{song.title}</Card.Title>
                      <Card.Text className="text-muted small mb-2">{song.artist}</Card.Text>
                    </div>
                    <div className="text-end mt-auto">
                      {song.duration ? (
                        <small className="text-light">⏱ {song.duration}</small>
                      ) : (
                        <div style={{ height: "1rem" }}></div> // placeholder
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ArtistSongs;
