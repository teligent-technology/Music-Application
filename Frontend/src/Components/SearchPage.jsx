import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { Songs } from "../data/song";
import "./SearchCategories.css"; // ✅ Custom animation & style classes

const colors = [
  "#e74c3c", "#e67e22", "#3498db", "#2ecc71", "#9b59b6",
  "#f1c40f", "#1abc9c", "#e84393", "#34495e", "#d35400",
  "#16a085", "#8e44ad", "#27ae60", "#c0392b", "#2980b9"
];

const SearchCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredSongs = Songs.slice(0, 15).filter(
    (song) =>
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.song.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (artistName) => {
    navigate(`/artist/${encodeURIComponent(artistName)}`);
  };

  return (
    <>
      <Container className="pt-4 pb-5 search-page">
        <h2 className="text-white mb-3 animate-title">🔍 Search Music</h2>

        <Form className="mb-4">
          <Form.Control
            type="search"
            placeholder="Search songs or artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="animated-input"
          />
        </Form>

        <h5 className="text-white mb-4 animate-title">🎧 Start Browsing</h5>

        <Row className="g-4">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, idx) => (
              <Col xs={12} md={6} key={song.Id}>
                <Card
                  onClick={() => handleClick(song.artist)}
                  className="search-card"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                >
                  {idx >= 4 && (
                    <Image
                      src={song.img}
                      alt={song.artist}
                      rounded
                      className="artist-img"
                    />
                  )}
                  <div>
                    <Card.Title className="card-title-text">
                      {song.artist}
                    </Card.Title>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <div className="w-100 text-center animated-fade">
              <p className="text-muted fs-5">😔 No songs found.</p>
            </div>
          )}
        </Row>
      </Container>

      {/* Mobile Footer Bar */}
      <div className="d-md-none position-fixed bottom-0 start-0 end-0 text-white border-top border-secondary z-3 footer-bar">
        <div className="d-flex justify-content-around py-2">
          <FooterIcon to="/home" icon="bi-house-door-fill" label="Home" />
          <FooterIcon to="/search" icon="bi-search" label="Search" />
          <FooterIcon to="/punjabi" icon="bi-music-note-list" label="Library" />
          <FooterIcon to="/create" icon="bi-plus-circle-fill" label="Create" />
          <FooterIcon to="/premium" icon="bi-gem" label="Premium" />
        </div>
      </div>
    </>
  );
};

const FooterIcon = ({ to, icon, label }) => (
  <Link to={to} className="text-white text-center text-decoration-none footer-icon">
    <i className={`bi ${icon} fs-4 d-block`} />
    <small>{label}</small>
  </Link>
);

export default SearchCategories;
