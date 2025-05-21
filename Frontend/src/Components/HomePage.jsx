// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import {
  Container, Row, Col, Form, Button, Badge, Card
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Songs } from "../data/song";
// import "bootstrap-icons/font/bootstrap-icons.css";

const getUniqueArtists = (songs) => {
  const artistSet = new Set();
  songs.forEach(song => artistSet.add(song.artist.trim()));
  return Array.from(artistSet);
};

const getTopArtists = (songs) => {
  const count = {};
  songs.forEach(song => {
    const artist = song.artist.trim();
    count[artist] = (count[artist] || 0) + 1;
  });
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([artist]) => artist);
};

const getGenres = (songs) => {
  const genreSet = new Set();
  songs.forEach(song => genreSet.add(song.genre?.trim()));
  return Array.from(genreSet);
};

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");
  const [sortAZ, setSortAZ] = useState(false);

  const uniqueArtists = getUniqueArtists(Songs);
  const topArtists = getTopArtists(Songs);
  const genres = getGenres(Songs);

  const filteredArtists = uniqueArtists
    .filter(artist => artist.toLowerCase().includes(search.toLowerCase()))
    .filter(artist => {
      if (!genreFilter) return true;
      return Songs.some(song => song.artist === artist && song.genre === genreFilter);
    });

  const sortedArtists = sortAZ ? [...filteredArtists].sort((a, b) => a.localeCompare(b)) : filteredArtists;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favArtists") || "[]");
    setFavorites(stored);
  }, []);

  const toggleFavorite = (artist) => {
    const updated = favorites.includes(artist)
      ? favorites.filter(a => a !== artist)
      : [...favorites, artist];
    setFavorites(updated);
    localStorage.setItem("favArtists", JSON.stringify(updated));
  };

  const recentlyPlayed = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");

  const newReleases = Songs
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 5);

  return (
    <div className="bg-dark text-white min-vh-100 pb-5">

      {/* Header */}
      <Container fluid className="py-3 px-4 border-bottom border-secondary sticky-top bg-dark z-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <Link to="/profile">
            <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center text-white fw-bold" style={{ width: 40, height: 40 }}>
              D
            </div>
          </Link>
          <div className="btn-group bg-secondary rounded-pill p-1">
            <Link to="/home" className="btn btn-sm btn-dark rounded-pill">All</Link>
            <Link to="/music" className="btn btn-sm btn-dark rounded-pill">Music</Link>
            <Link to="/punjabi" className="btn btn-sm btn-dark rounded-pill">Songs</Link>
          </div>
        </div>
      </Container>

      {/* Search and Filters */}
      <Container className="mt-4">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={4}>
            <Form.Control
              type="text"
              placeholder="Search artists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col xs={6} md={3}>
            <Form.Select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
              <option value="">Filter by Genre</option>
              {genres.map((genre, idx) => (
                <option key={idx} value={genre}>{genre}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={6} md={2}>
            <Button variant="outline-light" onClick={() => setSortAZ(!sortAZ)}>
              Sort A-Z
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Top Artists */}
      <Container className="mt-5">
        <h5 className="text-info"><i className="bi bi-stars me-2" />Top Artists</h5>
        <Row xs={2} sm={3} md={4} lg={5} className="g-3">
          {topArtists.map((artist, index) => {
            const songWithArtist = Songs.find(song => song.artist === artist);
            return (
              <Col key={index}>
                <Card bg="secondary" text="white" className="shadow-sm card-hover">
                  <Card.Body className="d-flex align-items-center">
                    <img
                      src={songWithArtist?.img}
                      alt={artist}
                      className="me-3 rounded-circle"
                      style={{ width: 40, height: 40, objectFit: 'cover' }}
                    />
                    <Link to={`/artist/${encodeURIComponent(artist)}`} className="text-white text-decoration-none">
                      {artist}
                    </Link>
                    <Badge bg="warning" className="ms-auto">Top</Badge>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && (
        <Container className="mt-5">
          <h5 className="text-success"><i className="bi bi-clock-history me-2" />Recently Played</h5>
          <Row xs={2} sm={3} md={4} lg={5} className="g-3">
            {recentlyPlayed.map((song, idx) => (
              <Col key={idx}>
                <Card bg="secondary" text="white" className="shadow-sm card-hover">
                  <Card.Body>
                    <Card.Title>{song.name}</Card.Title>
                    <Card.Subtitle className="text-muted">{song.artist}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* New Releases */}
      <Container className="mt-5">
        <h5 className="text-primary"><i className="bi bi-megaphone me-2" />New Releases</h5>
        <Row xs={2} sm={3} md={4} lg={5} className="g-3">
          {newReleases.map((song, idx) => (
            <Col key={idx}>
              <Card bg="secondary" text="white" className="shadow-sm card-hover">
                <Card.Body>
                  <Card.Title>{song.name}</Card.Title>
                  <Card.Subtitle className="text-muted">{song.artist}</Card.Subtitle>
                  <small>Released: {song.releaseDate}</small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* All Artists Slider */}
      <Container className="mt-5">
        <h5 className="text-warning mb-3"><i className="bi bi-mic me-2" />All Artists</h5>
        <div 
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "1rem",
            paddingBottom: "1rem",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 transparent"
          }}
          className="hide-scrollbar" // We can hide scrollbar via CSS below
        >
          {sortedArtists.map((artist, index) => {
            const songWithArtist = Songs.find(song => song.artist === artist);
            return (
              <Card
                key={index}
                bg="secondary"
                text="white"
                className="shadow-sm card-hover d-flex flex-row align-items-center p-2"
                style={{ minWidth: 250, flexShrink: 0 }}
              >
                <Link to={`/artist/${encodeURIComponent(artist)}`} className="d-flex align-items-center text-decoration-none text-white w-100">
                  <img
                    src={songWithArtist?.img}
                    alt={artist}
                    className="me-3 rounded-circle"
                    style={{ width: 40, height: 40, objectFit: 'cover' }}
                  />
                  <span>{artist}</span>
                </Link>
                <Button
                  size="sm"
                  variant="link"
                  className="text-danger ms-auto"
                  onClick={(e) => {
                    e.preventDefault(); // prevent navigation when clicking heart
                    toggleFavorite(artist);
                  }}
                >
                  <i className={favorites.includes(artist) ? "bi bi-heart-fill" : "bi bi-heart"} />
                </Button>
              </Card>
            );
          })}
        </div>
      </Container>

      {/* Optional CSS for hiding scrollbar on Firefox and Webkit */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            height: 6px;
          }
          .hide-scrollbar::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 3px;
          }
          .hide-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: thin;  /* Firefox */
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
