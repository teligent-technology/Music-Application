import React, { useEffect, useState } from "react";
import {
  Container, Row, Col, Form, Button, Card
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
    .slice() // clone before sort to avoid mutating original
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 5);

  return (
    <div className="bg-black text-white min-vh-100 pb-5">
      {/* Header */}
      <Container fluid className="py-3 px-4 border-bottom border-secondary sticky-top bg-black z-3">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <Link to="/profile" aria-label="Profile">
            <div
              className="bg-primary rounded-circle d-flex justify-content-center align-items-center text-white fw-bold shadow"
              style={{ width: 40, height: 40, fontSize: '1.2rem' }}
            >
              D
            </div>
          </Link>
          <div className="btn-group bg-secondary rounded-pill p-1 shadow-sm">
            <Link to="/home" className="btn btn-sm btn-dark rounded-pill px-4">All</Link>
            <Link to="/punjabi" className="btn btn-sm btn-dark rounded-pill px-4">Songs</Link>
          </div>
        </div>
      </Container>

      {/* Search, Filter, Sort */}
      <Container className="mt-4">
        <Row className="g-3 align-items-center">
          <Col xs={12} md={4}>
            <Form.Control
              type="search"
              placeholder="Search artists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="shadow-sm"
            />
          </Col>
          <Col xs={12} md={4}>
            <Form.Select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="shadow-sm"
              aria-label="Filter by Genre"
            >
              <option value="">Filter by Genre</option>
              {genres.map((genre, idx) => (
                <option key={idx} value={genre}>{genre}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} md={4}>
            <Button
              variant={sortAZ ? "light" : "outline-light"}
              className="w-100 shadow-sm"
              onClick={() => setSortAZ(!sortAZ)}
              aria-pressed={sortAZ}
            >
              Sort A-Z
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Top Artists */}
      <Container className="mt-5">
        <h5 className="text-info fw-bold mb-3"><i className="bi bi-stars me-2" />Top Artists</h5>
        <Row xs={2} sm={3} md={4} lg={5} className="g-4">
          {topArtists.map((artist, index) => {
            const songWithArtist = Songs.find(song => song.artist === artist);
            return (
              <Col key={index}>
                <Card
                  bg="black"
                  text="white"
                  className="text-center shadow-sm h-100 border-0 card-hover p-3"
                  style={{ cursor: "pointer" }}
                >
                  <Link
                    to={`/artist/${encodeURIComponent(artist)}`}
                    className="text-white text-decoration-none"
                    aria-label={`Artist details: ${artist}`}
                  >
                    <img
                      src={songWithArtist?.img}
                      alt={artist}
                      className="rounded-circle mb-3 shadow"
                      style={{ width: 120, height: 120, objectFit: "cover" }}
                    />
                    <div className="fw-semibold text-truncate fs-5">{artist}</div>
                    {/* <div className="text-muted small text-truncate">{songWithArtist?.song}</div> */}
                  </Link>
                  <Button
                    size="sm"
                    variant="link"
                    className="text-danger mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(artist);
                    }}
                    aria-pressed={favorites.includes(artist)}
                    aria-label={favorites.includes(artist) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <i className={favorites.includes(artist) ? "bi bi-heart-fill" : "bi bi-heart"} />
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && (
        <Container className="mt-5">
          <h5 className="text-success fw-bold mb-3"><i className="bi bi-clock-history me-2" />Recently Played</h5>
          <Row xs={1} sm={2} md={3} lg={5} className="g-4">
            {recentlyPlayed.map((song, idx) => (
              <Col key={idx}>
                <Card
                  bg="black"
                  text="white"
                  className="shadow-sm h-100 border-0 card-hover"
                  style={{ cursor: "pointer" }}
                  aria-label={`Recently played song: ${song.name} by ${song.artist}`}
                >
                  <Card.Body className="px-3 py-2">
                    <Card.Title className="text-truncate fw-semibold">{song.name}</Card.Title>
                    <Card.Subtitle className="text-white text-truncate">{song.artist}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}

      {/* New Releases */}
      <Container className="mt-5">
        <h5 className="text-primary fw-bold mb-3"><i className="bi bi-megaphone me-2" />New Releases</h5>
        <Row xs={1} sm={2} md={3} lg={5} className="g-4">
          {newReleases.map((song, idx) => (
            <Col key={idx}>
              <Card
                className="bg-black text-white shadow-sm h-100 border-0 card-hover"
                style={{ cursor: "pointer" }}
                aria-label={`New release: ${song.name} by ${song.artist}, released on ${song.releaseDate}`}
              >
                <Card.Body className="px-3 py-3">
                  <Card.Title
                    className="text-white fw-bold text-truncate"
                    style={{ textShadow: "0 0 5px #00bfff" }}
                  >
                    {song.name}
                  </Card.Title>
                  <Card.Subtitle
                    className="text-white fw-semibold text-truncate mb-2"
                    style={{ textShadow: "0 0 4px #00bfff" }}
                  >
                    {song.artist}
                  </Card.Subtitle>
                  <small
                    className="text-white"
                    style={{ textShadow: "0 0 3px #00bfff" }}
                  >
                    Released: {song.releaseDate}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* All Artists */}
      <Container className="mt-5 mb-5">
        <h5 className="text-warning fw-bold mb-3"><i className="bi bi-mic me-2" />All Artists</h5>
        <Row xs={2} sm={3} md={4} lg={5} xl={6} className="g-4">
          {sortedArtists.map((artist, index) => {
            const songWithArtist = Songs.find(song => song.artist === artist);
            return (
              <Col key={index}>
                <Card
                  bg="black"
                  text="white"
                  className="text-center shadow-sm h-100 border-0 card-hover"
                  style={{ cursor: "pointer", padding: 0, overflow: "hidden" }}
                >
                  <Link
                    to={`/artist/${encodeURIComponent(artist)}`}
                    className="text-white text-decoration-none d-block"
                    aria-label={`Artist details: ${artist}`}
                    style={{ height: "150px", position: "relative" }}
                  >
                    <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
                      <img
                        src={songWithArtist?.img}
                        alt={artist}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  </Link>
                  <div className="p-2 bg-black">
                    <div className="fw-semibold text-truncate fs-5">{artist}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="link"
                    className="text-danger mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(artist);
                    }}
                    aria-pressed={favorites.includes(artist)}
                    aria-label={favorites.includes(artist) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <i className={favorites.includes(artist) ? "bi bi-heart-fill" : "bi bi-heart"} />
                  </Button>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      <style>{`

html, body, #root {
  background-color: #000000 !important;
  color: white !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  overflow-y: scroll;
}
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
.card-hover:hover {
  filter: brightness(1.1);
  transition: filter 0.3s ease;
}
      `}</style>
    </div>
  );
};

export default HomePage;
