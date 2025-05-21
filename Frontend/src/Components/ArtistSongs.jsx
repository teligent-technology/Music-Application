import React from "react";
import { useParams, Link } from "react-router-dom";
import { Songs } from "../data/song";
import { Container, Row, Col, Card } from "react-bootstrap";

const ArtistSongs = () => {
  const { name } = useParams();
  const filteredSongs = Songs.filter((song) =>
    song.artist.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <Container fluid className="mt-4 text-white" style={{ minHeight: "80vh" }}>
      <h3 className="mb-4 fw-bold text-center">
        Songs by <span className="text-primary">{name}</span>
      </h3>

      {filteredSongs.length === 0 ? (
        <p className="text-center text-muted">No songs found for this artist.</p>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredSongs.map((song) => (
            <Col key={song.Id}>
              {/* Link to player page with songId */}
              <Link to={`/player/${song.artist}/${song.Id}`} className="text-decoration-none">
                <Card className="bg-secondary text-white h-100 shadow-sm border-0 rounded">
                  <Card.Img
                    variant="top"
                    src={song.img}
                  
                    height={180}
                    style={{ objectFit: "cover", borderTopLeftRadius: ".25rem", borderTopRightRadius: ".25rem" }}
                    alt={song.title}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="h6 mb-2">{song.title}</Card.Title>
                    <Card.Text className="text-muted small mb-0">{song.artist}</Card.Text>
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
