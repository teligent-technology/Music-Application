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

// Extract unique artist names from Songs array
const uniqueArtists = Array.from(
  new Set(Songs.map((song) => song.artist))
).slice(0, 7);


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

const chunkArray = (arr, n) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += n) {
    chunks.push(arr.slice(i, i + n));
  }
  return chunks;
};

const HomePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");

  const uniqueArtists = getUniqueArtists(Songs);
  const topArtists = getTopArtists(Songs);
  const genres = getGenres(Songs);

  const filteredArtists = uniqueArtists.filter(artist => {
    if (!genreFilter) return true;
    return Songs.some(song => song.artist === artist && song.genre === genreFilter);
  });

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
    .slice()
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 5);

  const topArtistChunks = chunkArray(topArtists, 3);

  // Dummy jump back in items (you can replace these with your dynamic data)
  const jumpBackInItems = [
    {
      img: "https://i.pravatar.cc/150?img=10",
      title: "Notes",
      artist: "Laddi Chahal",
    },
    {
      img: "https://i.pravatar.cc/150?img=11",
      title: "Reflections",
      artist: "Gurdeep Singh",
    },
    {
      img: "https://i.pravatar.cc/150?img=12",
      title: "Waves",
      artist: "Simran Kaur",
    },
  ];

   const jumpMoveInItems = [
    {
      img: "/Images/image1.jpg",
      title: "Heat",
      artist: "Diljit Dosjanj"
    },
    {
      img: "/Images/image2.jpg",
      title: "wavy",
      artist: "Karan Aujla",
    },
    {
      img: "/Images/image3.jpg",
      title: "safar",
      artist: "karun nair",
    },
  ];

   const jumpRightInItems = [
    {
      img: "/Images/image4.jpg",
      title: "Notes",
      artist: "Laddi Chahal",
    },
    {
      img: "/Images/image5.jpg",
      title: "Reflections",
      artist: "Gurdeep Singh",
    },
    {
      img: "/Images/image6.jpg",
      title: "Waves",
      artist: "Simran Kaur",
    },
  ];

   const jumpLeftInItems = [
    {
      img: "/Images/image7.jpg",
      title: "Notes",
      artist: "Laddi Chahal",
    },
    {
      img: "/Images/image8.jpg",
      title: "Reflections",
      artist: "Gurdeep Singh",
    },
    {
      img: "/Images/image9.jpg",
      title: "Waves",
      artist: "Simran Kaur",
    },
  ];

  return (
    
    <div className="bg-dark text-white min-vh-100 pb-5">
      {/* "bg-dark text-white min-vh-100 pb-5" */}
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

      {/* Filter by Genre */}
      
             

      {/* Top Artists */}
     {/* All Artists / Moods Section */}
<Container className="mt-4">
  <h5 className="text-info fw-bold mb-3">
    <i className="bi bi-music-note-list me-2" />
    Top 7 Artists
  </h5>
  <Row xs={2} sm={3} md={4} lg={4} className="g-3">
    {uniqueArtists.map((artist, index) => (
      <Col key={index}>
        <Link
          to={`/artist/${encodeURIComponent(artist)}`}
          className="d-flex align-items-center bg-secondary rounded p-2 shadow-sm hover-shadow text-white text-decoration-none"
          style={{ cursor: "pointer" }}
          title={artist}
        >
          {/* Find one image for this artist from Songs */}
          <img
            src={Songs.find(song => song.artist === artist)?.img || "/default-img.jpg"}
            alt={artist}
            className="rounded-circle"
            style={{ width: 48, height: 48, objectFit: "cover" }}
          />
          <span className="ms-3 fw-medium flex-grow-1">{artist}</span>
        </Link>
      </Col>
    ))}
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
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {newReleases.map((song, idx) => (
            <Col key={idx}>
              <Card
                className="bg-black text-white shadow-sm h-100 border-0 card-hover text-center"
                style={{ cursor: "pointer", overflow: "hidden" }}
                aria-label={`New release: ${song.name} by ${song.artist}`}
              >
                <Card.Img
                  variant="top"
                  src={song.img}
                  alt={song.name}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Card.Body className="py-3">
                  <Card.Title className="fw-bold fs-6 text-truncate">{song.name}</Card.Title>
                  <Card.Text className="text-muted text-truncate">{song.artist}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>     

      {/* Jump Back In Section */}
      <Container className="mt-5 mb-5">
        <h5 className="text-light fw-bold mb-3">Jump back in</h5>
        <Row className="flex-row flex-nowrap overflow-auto gx-3">
          {jumpBackInItems.map((item, idx) => (
            <Col key={idx} xs="auto" style={{ minWidth: 150 }}>
              <Card
                bg="dark"
                text="white"
                className="shadow-sm rounded-lg card-hover p-3"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                aria-label={`Jump back in: ${item.title} by ${item.artist}`}
              >
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={item.title}
                  className="rounded mb-2"
                  style={{ objectFit: "cover", height: 120 }}
                />
                <Card.Body className="p-0">
                  <Card.Title className="fs-6 fw-semibold text-truncate mb-1">{item.title}</Card.Title>
                  <Card.Text className="text-muted fs-7 mb-0 text-truncate">{item.artist}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
         <Container className="mt-5 mb-5">
        <h5 className="text-light fw-bold mb-3">Recents</h5>
        <Row className="flex-row flex-nowrap overflow-auto gx-3">
          {jumpMoveInItems.map((item, idx) => (
            <Col key={idx} xs="auto" style={{ minWidth: 150 }}>
              <Card
                bg="dark"
                text="white"
                className="shadow-sm rounded-lg card-hover p-3"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                aria-label={`Jump back in: ${item.title} by ${item.artist}`}
              >
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={item.title}
                  className="rounded mb-2"
                  style={{ objectFit: "cover", height: 120 }}
                />
                <Card.Body className="p-0">
                  <Card.Title className="fs-6 fw-semibold text-truncate mb-1">{item.title}</Card.Title>
                  <Card.Text className="text-muted fs-7 mb-0 text-truncate">{item.artist}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
         <Container className="mt-5 mb-5">
        <h5 className="text-light fw-bold mb-3">Recommandations Stations</h5>
        <Row className="flex-row flex-nowrap overflow-auto gx-3">
          {jumpMoveInItems.map((item, idx) => (
            <Col key={idx} xs="auto" style={{ minWidth: 150 }}>
              <Card
                bg="dark"
                text="white"
                className="shadow-sm rounded-lg card-hover p-3"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                aria-label={`Jump back in: ${item.title} by ${item.artist}`}
              >
                <Card.Img
                  variant="top"
                  src={"Images/image3.jpg"}
                  alt={item.title}
                  className="rounded mb-2"
                  style={{ objectFit: "cover", height: 120 }}
                />
                <Card.Body className="p-0">
                  <Card.Title className="fs-6 fw-semibold text-truncate mb-1">{item.title}</Card.Title>
                  <Card.Text className="text-muted fs-7 mb-0 text-truncate">{item.artist}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
        <Container className="mt-5 mb-5">
        <h5 className="text-light fw-bold mb-3">Your favourite artists</h5>
        <Row className="flex-row flex-nowrap overflow-auto gx-3">
          {jumpMoveInItems.map((item, idx) => (
            <Col key={idx} xs="auto" style={{ minWidth: 150 }}>
              <Card
                bg="dark"
                text="white"
                className="shadow-sm rounded-lg card-hover p-3"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                aria-label={`Jump back in: ${item.title} by ${item.artist}`}
              >
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={item.title}
                  className="rounded mb-2"
                  style={{ objectFit: "cover", height: 120 }}
                />
                <Card.Body className="p-0">
                  <Card.Title className="fs-6 fw-semibold text-truncate mb-1">{item.title}</Card.Title>
                  <Card.Text className="text-muted fs-7 mb-0 text-truncate">{item.artist}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

        <Container className="mt-5 mb-5">
        <h5 className="text-light fw-bold mb-3">India Best</h5>
        <Row className="flex-row flex-nowrap overflow-auto gx-3">
          {jumpRightInItems.map((item, idx) => (
            <Col key={idx} xs="auto" style={{ minWidth: 150 }}>
              <Card
                bg="dark"
                text="white"
                className="shadow-sm rounded-lg card-hover p-3"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                aria-label={`Jump back in: ${item.title} by ${item.artist}`}
              >
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={item.title}
                  className="rounded mb-2"
                  style={{ objectFit: "cover", height: 120 }}
                />
                <Card.Body className="p-0">
                  <Card.Title className="fs-6 fw-semibold text-truncate mb-1">{item.title}</Card.Title>
                  <Card.Text className="text-muted fs-7 mb-0 text-truncate">{item.artist}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

        <Container className="mt-5 mb-5">
        <h5 className="text-light fw-bold mb-3">Recommandation today</h5>
        <Row className="flex-row flex-nowrap overflow-auto gx-3">
          {jumpRightInItems.map((item, idx) => (
            <Col key={idx} xs="auto" style={{ minWidth: 150 }}>
              <Card
                bg="dark"
                text="white"
                className="shadow-sm rounded-lg card-hover p-3"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                aria-label={`Jump back in: ${item.title} by ${item.artist}`}
              >
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={item.title}
                  className="rounded mb-2"
                  style={{ objectFit: "cover", height: 120 }}
                />
                <Card.Body className="p-0">
                  <Card.Title className="fs-6 fw-semibold text-truncate mb-1">{item.title}</Card.Title>
                  <Card.Text className="text-muted fs-7 mb-0 text-truncate">{item.artist}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

        <Container className="mt-5 mb-5">
        <h5 className="text-light fw-bold mb-3">Made for Aditya Kumar</h5>
        <Row className="flex-row flex-nowrap overflow-auto gx-3">
          {jumpBackInItems.map((item, idx) => (
            <Col key={idx} xs="auto" style={{ minWidth: 150 }}>
              <Card
                bg="dark"
                text="white"
                className="shadow-sm rounded-lg card-hover p-3"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                aria-label={`Jump back in: ${item.title} by ${item.artist}`}
              >
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={item.title}
                  className="rounded mb-2"
                  style={{ objectFit: "cover", height: 120 }}
                />
                <Card.Body className="p-0">
                  <Card.Title className="fs-6 fw-semibold text-truncate mb-1">{item.title}</Card.Title>
                  <Card.Text className="text-muted fs-7 mb-0 text-truncate">{item.artist}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

        <Container className="mt-5 mb-5">
        <h5 className="text-light fw-bold mb-3">Made for Garry Sandhu</h5>
        <Row className="flex-row flex-nowrap overflow-auto gx-3">
          {jumpBackInItems.map((item, idx) => (
            <Col key={idx} xs="auto" style={{ minWidth: 150 }}>
              <Card
                bg="dark"
                text="white"
                className="shadow-sm rounded-lg card-hover p-3"
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                aria-label={`Jump back in: ${item.title} by ${item.artist}`}
              >
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={item.title}
                  className="rounded mb-2"
                  style={{ objectFit: "cover", height: 120 }}
                />
                <Card.Body className="p-0">
                  <Card.Title className="fs-6 fw-semibold text-truncate mb-1">{item.title}</Card.Title>
                  <Card.Text className="text-muted fs-7 mb-0 text-truncate">{item.artist}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

       (
    <Container className="bg-dark text-white rounded p-4 my-4 mx-2">
      {/* Header Row */}
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <img
            src="Jass.jpeg"
            alt="Punjabi Gaming"
            className="rounded"
            style={{ width: 64, height: 64 }}
          />
        </Col>
        <Col>
          <h5 className="mb-0 fw-bold">Punjabi Gaming</h5>
          <small className="text-muted">Playlist • Spotify</small>
        </Col>
        <Col xs="auto">
          <Button
            variant="light"
            className="rounded-circle p-0 d-flex align-items-center justify-content-center"
            style={{ width: 28, height: 28, fontSize: "1.1rem", fontWeight: "bold" }}
            aria-label="Add playlist"
          >
            +
          </Button>
        </Col>
      </Row>

      {/* Playlist Art with Arrows */}
      <div className="position-relative mb-4">
        <img
          src="Jass.jpeg"
          alt="Playlist Art"
          className="img-fluid rounded"
        />
        <Button
          variant="dark"
          className="position-absolute top-50 start-0 translate-middle-y opacity-75 rounded-circle"
          style={{ width: 32, height: 32, left: "10px" }}
          aria-label="Previous"
        >
          &#8592;
        </Button>
        <Button
          variant="dark"
          className="position-absolute top-50 end-0 translate-middle-y opacity-75 rounded-circle"
          style={{ width: 32, height: 32, right: "10px" }}
          aria-label="Next"
        >
          &#8594;
        </Button>
      </div>

      {/* Artist Names */}
      <p className="fw-semibold mb-2">
        Diljit Dosanjh, Sidhu Moose Wala, Shubh, Cheema Y, Arjan Dhillon
      </p>

      {/* Action Buttons */}
      <div className="d-flex align-items-center gap-3">
        <Button
          variant="dark"
          className="d-flex align-items-center gap-2 py-1 px-3 rounded-pill text-white border border-secondary"
          style={{ fontSize: "0.85rem" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M16 6l-6 6 6 6" />
          </svg>
          <span>Preview playlist</span>
        </Button>

        <Button
          variant="light"
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: 40, height: 40, fontSize: "1.2rem", fontWeight: "bold" }}
          aria-label="Play"
        >
          ▶
        </Button>

        <Button
          variant="link"
          className="text-white fs-4 fw-bold ms-auto p-0"
          aria-label="More options"
        >
          ...
        </Button>
      </div>
    </Container>

    <div className="position-relative px-3 py-4">
      {/* Image with rounded corners */}
      <div className="rounded overflow-hidden position-relative">
        <img
          src="Jass.jpeg"
          alt="The Four"
          className="img-fluid w-100 rounded"
          style={{ objectFit: "cover" }}
        />

        {/* Left Arrow */}
        <Button
          variant="dark"
          className="position-absolute top-50 start-0 translate-middle-y opacity-75 rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: 32, height: 32, left: "16px" }}
          aria-label="Previous"
        >
          &#8592;
        </Button>

        {/* Right Arrow */}
        <Button
          variant="dark"
          className="position-absolute top-50 end-0 translate-middle-y opacity-75 rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: 32, height: 32, right: "16px" }}
          aria-label="Next"
        >
          &#8594;
        </Button>

        {/* Text and Preview Button */}
        <div
          className="position-absolute bottom-0 start-0 end-0 text-white d-flex justify-between align-items-center px-3 py-2"
          style={{ fontSize: "0.9rem", fontWeight: "600", background: "rgba(0,0,0,0.4)" }}
        >
          <span>
            Balle Jatta • Surme Di Dabbi • Fallin For You • Bimbo
          </span>

          <Button
            variant="dark"
            className="d-flex align-items-center gap-2 rounded-pill px-3 py-1 text-white border-0"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", fontSize: "0.8rem" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M16 6l-6 6 6 6" />
            </svg>
            <span>Preview EP</span>
          </Button>
        </div>
      </div>
    </div>

      <div
      className="position-absolute d-flex align-items-center gap-3"
      style={{ bottom: "1rem", right: "1rem" }}
    >
      {/* Ellipsis Button */}
      <Button
        variant="link"
        className="text-white fw-bold fs-3 p-0 m-0"
        style={{ lineHeight: 1, textDecoration: "none" }}
      >
        ...
      </Button>

      {/* Play Button */}
      <Button
        variant="light"
        className="rounded-circle d-flex align-items-center justify-content-center p-0"
        style={{ width: "40px", height: "40px", fontSize: "1.25rem", fontWeight: "bold" }}
        aria-label="Play"
      >
        ▶
      </Button>
    </div>
<section className="px-4 py-3" style={{ marginBottom: "80px" }}>
      <div
        className="bg-dark rounded-4 overflow-hidden position-relative mx-auto"
        style={{ maxWidth: "28rem" }} // ~max-w-md
      >
        {/* Background/Main Image */}
        <img
          src="Jass.jpeg"
          alt="Dil Te Na Laeen"
          className="w-100"
          style={{ height: "12rem", objectFit: "cover" }}
        />

        {/* Top-left Album Thumbnail */}
        <div
          className="position-absolute shadow border border-white rounded overflow-hidden"
          style={{ top: "0.75rem", left: "0.75rem", width: "5rem", height: "5rem" }}
        >
          <img
            src="Jass.jpeg"
            alt="Dil Te Na Laeen Album"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Content */}
        <div className="p-4 pt-5">
          <h2 className="text-white fs-4 fw-bold mb-1">Dil Te Na Laeen</h2>
          <p className="text-secondary fw-semibold mb-2">Album • Manmohan Waris</p>

          {/* Add Button (top-right) */}
          <Button
            variant="outline-light"
            className="position-absolute d-flex align-items-center justify-content-center fw-bold"
            style={{
              top: "1rem",
              right: "1rem",
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              padding: 0,
              lineHeight: 1,
              transition: "0.3s",
            }}
            aria-label="Add Album"
          >
            +
          </Button>
        </div>
      </div>
    </section>
      {/* Sticky Footer (mobile only) */}
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
          <Link to="/library" className="text-white text-center text-decoration-none">
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
    </div>
  );
};

export default HomePage;
