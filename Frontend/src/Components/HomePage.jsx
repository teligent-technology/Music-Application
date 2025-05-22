// src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import {
  Container, Row, Col, Form, Button, Badge, Card
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Songs } from "../data/song";

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
      <Container fluid className="py-2 px-3 border-bottom border-secondary sticky-top bg-dark z-3">
        <div className="d-flex justify-content-between align-items-center gap-2 header-flex">
          <Link to="/profile">
            <div
              className="bg-primary rounded-circle d-flex justify-content-center align-items-center text-white fw-bold profile-icon"
              style={{ width: 36, height: 36 }}
            >
              D
            </div>
          </Link>
          <div className="btn-group bg-secondary rounded-pill p-1 flex-shrink-0">
            <Link to="/home" className="btn btn-sm btn-dark rounded-pill">All</Link>
            <Link to="/punjabi" className="btn btn-sm btn-dark rounded-pill">Songs</Link>
          </div>
        </div>
      </Container>

      {/* Search and Filters */}
      <Container className="mt-3 px-2">
        <Row className="g-2 align-items-center">
          <Col xs={12} md={4} className="search-col">
            <Form.Control
              type="text"
              placeholder="Search artists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col xs={12} md={3} className="filter-col">
            <Form.Select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
              <option value="">Filter by Genre</option>
              {genres.map((genre, idx) => (
                <option key={idx} value={genre}>{genre}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={2} className="sort-col">
            <Button variant="outline-light" onClick={() => setSortAZ(!sortAZ)}>
              Sort A-Z
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Top Artists */}
      <Container className="mt-4 px-2">
        <h6 className="text-info"><i className="bi bi-stars me-2" />Top Artists</h6>
        <Row xs={2} sm={3} md={4} lg={5} className="g-2">
          {topArtists.map((artist, index) => {
            const songWithArtist = Songs.find(song => song.artist === artist);
            return (
              <Col key={index}>
                <Card bg="secondary" text="white" className="shadow-sm card-hover p-2">
                  <Card.Body className="d-flex align-items-center">
                    <img
                      src={songWithArtist?.img}
                      alt={artist}
                      className="me-2 rounded-circle"
                      style={{ width: 32, height: 32, objectFit: 'cover' }}
                    />
                    <Link to={`/artist/${encodeURIComponent(artist)}`} className="text-white text-decoration-none text-truncate w-100">
                      {artist}
                    </Link>
                    <Badge bg="warning" className="ms-2">Top</Badge>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && (
        <Container className="mt-4 px-2">
          <h6 className="text-success"><i className="bi bi-clock-history me-2" />Recently Played</h6>
          <Row xs={1} sm={2} md={3} lg={5} className="g-2">
            {recentlyPlayed.map((song, idx) => (
              <Col key={idx}>
                <Card bg="secondary" text="white" className="shadow-sm card-hover p-2">
                  <Card.Body>
                    <Card.Title className="text-truncate">{song.name}</Card.Title>
                    <Card.Subtitle className="text-muted text-truncate">{song.artist}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* New Releases */}
      <Container className="mt-4 px-2">
        <h6 className="text-primary"><i className="bi bi-megaphone me-2" />New Releases</h6>
        <Row xs={1} sm={2} md={3} lg={5} className="g-2">
          {newReleases.map((song, idx) => (
            <Col key={idx}>
              <Card bg="secondary" text="white" className="shadow-sm card-hover p-2">
                <Card.Body>
                  <Card.Title className="text-truncate">{song.name}</Card.Title>
                  <Card.Subtitle className="text-muted text-truncate">{song.artist}</Card.Subtitle>
                  <small>Released: {song.releaseDate}</small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* All Artists Slider */}
      <Container className="mt-4 px-2">
        <h6 className="text-warning mb-2"><i className="bi bi-mic me-2" />All Artists</h6>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "0.75rem",
            paddingBottom: "1rem",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 transparent"
          }}
          className="hide-scrollbar px-2"
        >
          {sortedArtists.map((artist, index) => {
            const songWithArtist = Songs.find(song => song.artist === artist);
            return (
              <Card
                key={index}
                bg="secondary"
                text="white"
                className="shadow-sm card-hover d-flex flex-row align-items-center p-2"
                style={{ minWidth: 140, flexShrink: 0 }}
              >
                <Link to={`/artist/${encodeURIComponent(artist)}`} className="d-flex align-items-center text-decoration-none text-white w-100">
                  <img
                    src={songWithArtist?.img}
                    alt={artist}
                    className="me-2 rounded-circle"
                    style={{ width: 32, height: 32, objectFit: 'cover' }}
                  />
                  <span className="text-truncate">{artist}</span>
                </Link>
                <Button
                  size="sm"
                  variant="link"
                  className="text-danger ms-auto"
                  onClick={(e) => {
                    e.preventDefault();
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

      {/* Scrollbar & Mobile Tweaks */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            height: 6px;
          }
          .hide-scrollbar::-webkit-scrollbar-thumb {
            background-color: #888;
            border-radius: 3px;
          }
          .hide-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #888 transparent;
          }

          /* Mobile responsiveness tweaks */
          @media (max-width: 576px) {
            .container, .container-fluid {
              padding-left: 0.5rem !important;
              padding-right: 0.5rem !important;
            }
            .header-flex {
              flex-wrap: nowrap !important;
              gap: 0.5rem !important;
            }
            .search-col, .filter-col, .sort-col {
              flex: 0 0 100% !important;
              max-width: 100% !important;
              margin-bottom: 0.5rem;
            }
            .profile-icon {
              width: 36px !important;
              height: 36px !important;
              font-size: 1.1rem !important;
            }
          }
          /* Card hover effect */
          .card-hover:hover {
            filter: brightness(1.15);
            cursor: pointer;
            transition: filter 0.2s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
