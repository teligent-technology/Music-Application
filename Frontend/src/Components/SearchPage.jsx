import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";  // Import
import { Songs } from "../data/song";

const colors = [
  "#e74c3c", "#e67e22", "#3498db", "#2ecc71", "#9b59b6",
  "#f1c40f", "#1abc9c", "#e84393", "#34495e", "#d35400",
  "#16a085", "#8e44ad", "#27ae60", "#c0392b", "#2980b9"
];
const SearchCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const filteredSongs = Songs.slice(0, 15).filter(
    (song) =>
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.song.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // When user clicks on a song/card, navigate to /artist/:name
  const handleClick = (artistName) => {
    navigate(`/artist/${encodeURIComponent(artistName)}`);
  };

  return (
    <>   
      <h6 className="text-white">Search</h6>
      <Container className="pt-4 pb-5">
        <Form className="mb-4">
          <Form.Control
            type="search"
            placeholder="Search songs or artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        </Form>
        <h6 className="text-white">Start Browsing</h6>

        <Row className="g-4">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, idx) => (
              <Col xs={12} md={6} key={song.Id}>
                <Card
                  onClick={() => handleClick(song.artist)}
                  className="text-white d-flex flex-row align-items-center"
                  style={{
                    backgroundColor: colors[idx % colors.length],
                    height: "200px",
                    padding: "20px",
                    cursor: "pointer",
                  }}
                >
                  {idx >= 4 && (
                    <Image
                      src={song.img}
                      alt={song.artist}
                      rounded
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        marginRight: "20px",
                      }}
                    />
                  )}
                  <div>
                    <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      {song.artist}
                    </Card.Title>
                    <Card.Text style={{ fontSize: "1.1rem" }}>{song.song}</Card.Text>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-muted">No songs found.</p>
          )}
        </Row>
      </Container>

      <div className="d-md-none position-fixed bottom-0 start-0 end-0 bg-dark text-white border-top border-secondary z-3">
              <div className="d-flex justify-content-around py-2">
                <Link to="/home" className="text-white text-center text-decoration-none">
                  <i className="bi bi-house-door-fill fs-4 d-block" />
                  <small>Home</small>
                </Link>
                <Link to="/search" className="text-white text-center text-decoration-none">
                  <i className="bi bi-search fs-4 d-block" />
                  <small>Search</small>
                </Link>
                <Link to="/pubjabi" className="text-white text-center text-decoration-none">
                  <i className="bi bi-music-note-list fs-4 d-block" />
                  <small>Library</small>
                </Link>
                <Link to="/create" className="text-white text-center text-decoration-none">
                  <i className="bi bi-plus-circle-fill fs-4 d-block" />
                  <small>Create</small>
                </Link>
                <Link to="/premium" className="text-white text-center text-decoration-none">
                  <i className="bi bi-gem fs-4 d-block" />
                  <small>Premium</small>
                </Link>
      
      
      
              </div>
            </div>
    </>
  );
};

export default SearchCategories;
