import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Songs } from "../data/song";
import "./SearchCategories.css";

const generateAccentColor = (index) => {
  const hues = [190, 240, 280, 320, 360];
  return `hsl(${hues[index % hues.length]}, 85%, 55%)`;
};

const SearchCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredSongs = Songs.slice(0, 20).filter((song) =>
    song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.song.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (artistName) => {
    navigate(`/artist/${encodeURIComponent(artistName)}`);
  };

  return (
    <>
      <Container className="pt-5 pb-5 search-page">
        <h1 className="search-title">Discover Your Sound</h1>

        <Form className="search-form mb-5">
          <Form.Control
            type="search"
            placeholder="Type artist or song name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="search-input"
          />
        </Form>

        <Row className="g-4">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, idx) => {
              const accentColor = generateAccentColor(idx);

              return (
                <Col xs={12} md={6} lg={4} key={song.Id}>
                  <Card
                    onClick={() => handleClick(song.artist)}
                    className="search-card"
                    style={{ "--accent-color": accentColor }}
                    tabIndex={0}
                    aria-label={`View songs by ${song.artist}`}
                  >
                    <div className="img-container">
                      <Image
                        src={song.artistBg}
                        alt={song.artist}
                        className="artist-image"
                        roundedCircle
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="card-title">{song.artist}</Card.Title>
                      <Card.Text className="card-subtitle">{song.song}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <div className="no-results">
              <p>😔 Sorry, no matches found!</p>
            </div>
          )}
        </Row>

      {/* Mobile Footer */}
      <nav className="mobile-footer d-md-none">
        <FooterIcon to="/home" icon="bi-house-door-fill" label="Home" />
        <FooterIcon to="/search" icon="bi-search" label="Search" />
        <FooterIcon to="/library" icon="bi-music-note-list" label="Library" />
        <FooterIcon to="/create" icon="bi-plus-circle-fill" label="Create" />
        <FooterIcon to="/premium" icon="bi-gem" label="Premium" />
      </nav>
      </Container>
    </>
  );
};

const FooterIcon = ({ to, icon, label }) => (
  <Link to={to} className="footer-icon" aria-label={label}>
    <i className={`bi ${icon}`} />
    <span>{label}</span>
  </Link>
);

export default SearchCategories;
