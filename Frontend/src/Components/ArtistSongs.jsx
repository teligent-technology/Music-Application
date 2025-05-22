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
    <Container
      fluid
      className="py-4 text-white"
      style={{ minHeight: "85vh", backgroundColor: "#121212" }}
    >
      <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-3">
        {filteredSongs.map((song) => (
          <Col key={song.Id}>
            <Link
              to={`/player/${song.artist}/${song.Id}`}
              className="text-decoration-none text-white"
            >
              <Card className="bg-dark border-0 h-100">
                <Card.Img
                  variant="top"
                  src={song.img}
                  alt={song.song}   
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <Card.Body className="p-2">
                  <h6 className="mb-1 text-truncate">{song.song}</h6> {/* song name */}
                  <p className="mb-0 small text-muted">{song.artist}</p> {/* artist name */}
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
