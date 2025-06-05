import React, { useEffect, useState } from "react";
import {
  Container, Row, Col, Form, Button, Card
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Songs } from "../data/song";
import { motion } from "framer-motion";
import "./HomePage.css";

const getUniqueArtists = (songs) => {
  const artistSet = new Set();
  songs.forEach(song => artistSet.add(song.artist.trim()));
  return Array.from(artistSet);
};

const allArtists = [...new Set(Songs.map(song => song.artist))].slice(0, 30);

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
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loaded, setLoaded] = useState(false);


    const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const saveToRecent = (value, username) => {
  console.log("saveToRecent called with:", value, username);
  if (!username || value.trim().length < 2) {
    console.log("Invalid username or value, returning");
    return;
  }
  let recent = JSON.parse(localStorage.getItem(`recentSearches_${username}`) || "[]");
  console.log("Current recent searches:", recent);
  if (!recent.includes(value)) {
    recent.unshift(value);
    if (recent.length > 10) recent = recent.slice(0, 10);
    localStorage.setItem(`recentSearches_${username}`, JSON.stringify(recent));
    console.log("Updated recent searches saved:", recent);
  }
};

const handleSearchClick = () => {
  console.log("handleSearchClick called with searchTerm:", searchTerm);
  saveToRecent(searchTerm, username);
  // navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
};





  const uniqueArtists = getUniqueArtists(Songs);
  const topArtists = Array.from(new Set(Songs.map(song => song.artist))).slice(0, 7);
  const genres = getGenres(Songs);

  const filteredResults = Songs.filter(song =>
    song.artist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.song?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const jumpBackInItems = [
    { img: "https://i.pravatar.cc/150?img=10", title: "Notes", artist: "Laddi Chahal" },
    { img: "https://i.pravatar.cc/150?img=11", title: "Reflections", artist: "Gurdeep Singh" },
    { img: "https://i.pravatar.cc/150?img=12", title: "Waves", artist: "Simran Kaur" },
  ];

  const jumpMoveInItems = [
    { img: "/Images/image1.jpg", title: "Rich & Famous ", artist: "Diljit Dosjanj" },
    { img: "/Images/image2.jpg", title: "Harnoor All songs", artist: "Karan Aujla" },
    { img: "/Images/image3.jpg", title: "Jass Manak", artist: "karun nair" },
  ];

  const jumpRightInItems = [
    { img: "/Images/image4.jpg", title: "Diljit Dosanjh, Shubh, Badshah, Jasleen Roy...", artist: "Laddi Chahal" },
    { img: "/Images/image5.jpg", title: "Pritam, Anirudh Ravichandra, Sachet Tandon", artist: "Gurdeep Singh" },
    { img: "/Images/image6.jpg", title: "Diljit Dosanjh", artist: "Simran Kaur" },
  ];

  const jumpLeftInItems = [
    { img: "/Images/image7.jpg", title: "Lekh (Original Motion Picture)", artist: "Laddi Chahal" },
    { img: "/Images/image8.jpg", title: "Roi na (From Siddhat)", artist: "Gurdeep Singh" },
    { img: "/Images/image9.jpg", title: "Karan Aujla , Dj & Snake -P&D", artist: "Simran Kaur" },
  ];

  return (
    <div className="bg-dark text-white w-100 min-vh-100 app-root" style={{ color: "white" }}>
      <motion.div
        className="bg-dark text-white w-100 app-root"
        style={{ color: "white" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container
          fluid
          className="py-3 px-4 border-bottom border-secondary sticky-top bg-black z-3 animated-header"
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <Link to="/profile" aria-label="Profile">
              <motion.div
                className="profile-circle"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                D
              </motion.div>
            </Link>

            <div className="btn-group animated-nav rounded-pill p-1 shadow-sm">
              <motion.button
                className="btn btn-sm btn-dark rounded-pill px-4"
                onClick={() => setShowSearch(false)}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                All
              </motion.button>
              <motion.button
                className="btn btn-sm btn-dark rounded-pill px-4"
                onClick={() => setShowSearch(true)}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                Search
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to="/recent-search"
                  className="btn btn-sm btn-dark rounded-pill px-4"
                >
                  View Recent Searches
                </Link>
              </motion.div>
            </div>
          </div>
        </Container>
      </motion.div>

      {showSearch && (
        <Container className="mt-4">
      <Form
  className="d-flex gap-2"
  onSubmit={e => {
    e.preventDefault();
    handleSearchClick();
  }}
>
  <Form.Control
    type="text"
    placeholder="Search songs, artists..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      backgroundColor: "#121212",
      color: "#fff",
      border: "1px solid #444",
      borderRadius: "30px",
      padding: "12px 20px",
      fontSize: "1rem",
    }}
  />
  <Button variant="primary" type="submit">
    Search
  </Button>
</Form>

      {/* </Form> */}
    {/* Search Results */}
    <h5 className="text-info mb-3 animate-fade-slide-up">Search Results</h5>
    {filteredResults.length === 0 ? (
      <p className="text-muted fst-italic">No matching songs or artists found.</p>
    ) : (
      <Row className="g-3">
        {filteredResults.map((song, index) => (
          <Col
            key={index}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            className="animate-fade-scale-up"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Link
              to={`/player/${song.artist}/${song.Id}`}
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <div
                className="bg-black text-white p-3 rounded shadow-sm h-100 search-card d-flex flex-column align-items-center"
                style={{ cursor: "pointer", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(29,185,84,0.7)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
                }}
              >
                <img
                  src={song.img || "/default.jpg"}
                  alt={song.title}
                  className="img-fluid rounded mb-3"
                  style={{ height: "160px", objectFit: "cover", width: "100%", borderRadius: "12px" }}
                />
                <div
                  className="text-center w-100"
                  style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
                >
                  <div
                    className="song-title text-truncate"
                    title={song.title}
                    style={{
                      fontWeight: "700",
                      fontSize: "1.1rem",
                      letterSpacing: "0.03em",
                      marginBottom: "0.3rem",
                      color: "#1DB954",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {song.title}
                  </div>
                  <div
                    className="song-artist text-truncate"
                    title={song.artist}
                    style={{
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    {song.artist}
                  </div>
                  <div
                    className="song-type text-truncate"
                    title={song.song}
                    style={{
                      fontSize: "0.8rem",
                      fontStyle: "italic",
                      color: "rgba(255,255,255,0.5)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {song.song}
                  </div>
                </div>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    )}

    {/* Animations and Hover Styles */}
    <style>{`
      .animate-fade-slide-up {
        animation: fadeSlideUp 0.6s ease forwards;
      }

      .animate-fade-scale-up {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        animation: fadeScaleUp 0.5s forwards;
      }

      @keyframes fadeSlideUp {
        0% { opacity: 0; transform: translateY(15px); }
        100% { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeScaleUp {
        0% { opacity: 0; transform: translateY(20px) scale(0.95); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      .search-card:hover .song-title {
        color: #1ed760;
        text-decoration: underline;
      }
    `}</style>
  </Container>
)}





      {/* Top 7 Artists Section */}
     {!showSearch && (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
  >
    <Container className="mt-3 all-artists-container">
      <h5 className="text-info fw-bold mb-3">
        <i className="bi bi-music-note-list me-2" />
        All Artists
      </h5>

      <div className="d-flex overflow-auto gap-3 pb-2 px-1 position-relative artist-scroll-wrapper">
        {allArtists.map((artist, index) => {
          const artistImage =
            Songs.find(song => song.artist === artist)?.artistBg || "/default-img.jpg";

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Link
                to={`/artist/${encodeURIComponent(artist)}`}
                className="text-decoration-none text-white"
                style={{ flex: "0 0 auto", width: "200px" }}
              >
                <div className="artist-card d-flex align-items-center rounded-pill px-3 py-2 shadow-sm glass-effect">
                  <div className="artist-img-ring">
                    <img
                      src={artistImage}
                      alt={artist}
                      className="rounded-circle artist-img"
                    />
                  </div>
                  <span className="ms-3 fw-semibold text-truncate artist-name">
                    {artist}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </Container>
  </motion.div>
)}



      {/* New Releases */}
     <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  <Container className="mt-5">
    <h5 className="text-primary fw-bold mb-3">
      <i className="bi bi-megaphone me-2" />
      New Releases
    </h5>

    <div className="d-flex overflow-auto gap-3 pb-2 px-1 new-release-scroll">
      {newReleases.map((song, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 250 }}
        >
          <Link
            to={`/song/${encodeURIComponent(song.name)}`}
            className="text-decoration-none text-white"
            style={{ flex: "0 0 auto", width: "140px" }}
          >
            <div className="new-release-card" aria-label={`New release: ${song.name} by ${song.artist}`}>
              <img
                src={song.img || "/default.jpg"}
                alt={song.name}
                className="release-img"
              />
              <div className="w-100 mt-2">
                <div className="release-artist text-truncate">{song.artist}</div>
                <div className="release-title text-truncate">{song.song}</div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </Container>
</motion.div>


      {/* Jump Back In Section */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  <Container className="mt-5 mb-5">
    <h5 className="text-light fw-bold mb-4">
      <i className="bi bi-arrow-repeat me-2" />
      Jump back in
    </h5>

    <Row className="flex-row flex-nowrap overflow-auto gx-4 jumpback-scroll">
      {jumpBackInItems.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.12, rotateY: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          style={{ minWidth: 220, cursor: "pointer" }}
          aria-label={`Jump back in: ${item.title} by ${item.artist}`}
        >
          <Col xs="auto">
            <Card
              className="jumpback-card p-3 rounded-lg"
              style={{
                height: 320,
                background: "rgba(10,10,10,0.9)",
                border: "1px solid rgba(0, 255, 255, 0.3)",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 8px 24px rgba(0, 255, 255, 0.5)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: 220,
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0, 255, 255, 0.7)",
                  position: "relative",
                  perspective: "1000px",
                  cursor: "pointer",
                }}
              >
                <motion.img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "15px",
                    transformOrigin: "center",
                  }}
                  whileHover={{ scale: 1.1, rotateY: 5 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, rgba(0, 255, 255, 0.3) 0%, transparent 80%)",
                    pointerEvents: "none",
                    borderRadius: "15px",
                  }}
                />
              </div>
              <Card.Body className="p-0 mt-3">
                <Card.Title className="fs-5 fw-bold text-truncate text-white mb-1">
                  {item.title}
                </Card.Title>
                <Card.Text className="fs-6 text-info text-truncate">
                  {item.artist}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </motion.div>
      ))}
    </Row>
  </Container>
</motion.div>;

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <Container
    className="mt-5 mb-5"
    style={{ maxWidth: "720px", margin: "0 auto" }} // Smaller container
  >
    <h5 className="text-light fw-bold mb-4">
      <i className="bi bi-clock-history me-2 text-info" />
      Recent
    </h5>

    <Row className="flex-row flex-nowrap overflow-auto gx-4">
      {jumpMoveInItems.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 12px 40px rgba(0, 255, 255, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          style={{ minWidth: 200, cursor: "pointer" }}
          aria-label={`Recent: ${item.title} by ${item.artist}`}
        >
          <Card
            className="p-3 rounded-4 shadow"
            style={{
              height: 280,
              background: "rgba(20, 20, 20, 0.9)",
              border: "1px solid rgba(0,255,255,0.3)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 180, // 💡 image height reduced
                overflow: "hidden",
                borderRadius: "12px",
                marginBottom: "0.75rem",
                boxShadow: "0 4px 18px rgba(0, 255, 255, 0.4)",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="img-fluid"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <Card.Body className="p-0">
              <Card.Title className="fs-6 fw-semibold text-truncate text-white mb-1">
                {item.title}
              </Card.Title>
              <Card.Text className="fs-7 text-truncate text-info">
                {item.artist}
              </Card.Text>
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </Row>
  </Container>
</motion.div>


<Container 
  className="mt-5 mb-5" 
  style={{ maxWidth: "700px", marginLeft: "auto", marginRight: "auto" }}
>
  <h5 className="text-light fw-bold mb-4">
    <i className="bi bi-stars me-2" />
    Recommendation Stations
  </h5>

  <Row className="flex-row flex-nowrap overflow-auto gx-4">
    {jumpRightInItems.map((item, idx) => (
      <motion.div
        key={idx}
        whileHover={{ scale: 1.12, rotateY: 8, boxShadow: "0 12px 30px rgba(0, 255, 255, 0.6)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{ minWidth: 180, cursor: "pointer" }}
        aria-label={`Recommendation station: ${item.title} by ${item.artist}`}
      >
        <Col xs="auto">
          <Card
            bg="dark"
            text="white"
            className="shadow-lg rounded-lg p-3"
            style={{
              border: "2px solid transparent",
              transition: "border-color 0.3s ease",
              position: "relative",
            }}
          >
            <div
              className="d-flex justify-content-center"
              style={{
                position: "relative",
                width: 140,
                height: 140,
                margin: "0 auto 1rem auto",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 0 15px rgba(0, 255, 255, 0.4)",
                border: "3px solid #0dcaf0",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <motion.img
                src={item.img}
                alt={item.title}
                className="rounded-circle"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
                whileHover={{ scale: 1.15, rotateZ: 3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at center, rgba(13, 202, 240, 0.4), transparent 80%)",
                  pointerEvents: "none",
                  mixBlendMode: "screen",
                }}
              />
            </div>
            <Card.Body className="p-0 text-center">
              <Card.Title
                className="fs-6 fw-semibold text-truncate mb-1"
                style={{ color: "#0dcaf0" }}
              >
                {item.title}
              </Card.Title>
              <Card.Text className="fs-7 mb-0 text-truncate text-light">
                {item.artist}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </motion.div>
    ))}
  </Row>
</Container>


<Container
  className="mt-5 mb-5"
  style={{
    maxWidth: "720px", // Wider container for image fit
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  <h5 className="text-light fw-bold mb-4">
    <i className="bi bi-heart-fill me-2 text-danger" />
    Your Favourite Artists
  </h5>

  <Row className="flex-row flex-nowrap overflow-auto gx-4">
    {jumpLeftInItems.map((item, idx) => (
      <motion.div
        key={idx}
        whileHover={{ scale: 1.1, rotateZ: 1 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        style={{ minWidth: 160 }}
      >
        <Col xs="auto">
          <Card
            bg="dark"
            text="white"
            className="rounded-4 p-3 shadow-lg"
            style={{
              border: "1px solid #dc3545",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <div
              style={{
                width: "100%",
                aspectRatio: "1 / 1", // Square container for image
                overflow: "hidden",
                borderRadius: "12px",
                marginBottom: "0.75rem",
                boxShadow: "0 0 10px rgba(255, 0, 0, 0.3)",
              }}
            >
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-100 h-100"
                style={{ objectFit: "cover", display: "block" }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <Card.Body className="p-0 text-center">
              <Card.Title className="fs-6 fw-semibold text-truncate text-danger mb-1">
                {item.title}
              </Card.Title>
              <Card.Text className="fs-7 mb-0 text-truncate text-light">
                {item.artist}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </motion.div>
    ))}
  </Row>
</Container>

       
       
       
       
      
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <Container className="mt-5 mb-5" style={{ maxWidth: "720px" }}>
    <h5 className="text-light fw-bold mb-4">
      <i className="bi bi-fire me-2 text-warning" />
      India Best
    </h5>

    <Row className="flex-row flex-nowrap overflow-auto gx-4">
      {jumpMoveInItems.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{
            scale: 1.12,
            rotateZ: 1,
            boxShadow: "0 12px 25px rgba(255, 165, 0, 0.5)",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          style={{ minWidth: 170, cursor: "pointer" }}
        >
          <Card
            className="p-3 rounded-4 shadow"
            style={{
              background: "linear-gradient(145deg, #1a1a1a, #111)",
              border: "1px solid rgba(255,165,0,0.4)",
              height: 270,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 160,
                overflow: "hidden",
                borderRadius: "12px",
                marginBottom: "0.75rem",
                boxShadow: "0 4px 18px rgba(255,165,0,0.3)",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
            <Card.Body className="p-0">
              <Card.Title className="fs-6 fw-semibold text-truncate text-light mb-1">
                {item.title}
              </Card.Title>
              <Card.Text className="fs-7 text-truncate text-warning">
                {item.artist}
              </Card.Text>
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </Row>
  </Container>
</motion.div>

        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <Container className="mt-5 mb-5" style={{ maxWidth: "720px" }}>
    <h5 className="text-light fw-bold mb-4">
      <i className="bi bi-magic me-2 text-info" />
      Recommendation for Today
    </h5>

    <Row className="flex-row flex-nowrap overflow-auto gx-4">
      {jumpRightInItems.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{
            scale: 1.1,
            rotateZ: 1,
            boxShadow: "0 12px 30px rgba(0, 255, 255, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{ minWidth: 170, cursor: "pointer" }}
        >
          <Card
            className="p-3 rounded-4 shadow"
            style={{
              background: "linear-gradient(145deg, #1a1a1a, #111)",
              border: "1px solid rgba(0,255,255,0.4)",
              height: 260,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 150,
                overflow: "hidden",
                borderRadius: "12px",
                marginBottom: "0.75rem",
                boxShadow: "0 4px 18px rgba(0, 255, 255, 0.4)",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="img-fluid"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
            <Card.Body className="p-0">
              <Card.Title className="fs-6 fw-semibold text-truncate text-light mb-1">
                {item.title}
              </Card.Title>
              <Card.Text className="fs-7 mb-0 text-truncate text-info">
                {item.artist}
              </Card.Text>
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </Row>
  </Container>
</motion.div>


     <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <Container className="mt-5 mb-5" style={{ maxWidth: "720px" }}>
    <h5 className="text-light fw-bold mb-4">
      <i className="bi bi-person-heart me-2 text-warning" />
      Made For Aditya Kumar
    </h5>

    <Row className="flex-row flex-nowrap overflow-auto gx-4">
      {jumpLeftInItems.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{
            scale: 1.12,
            rotateY: 6,
            boxShadow: "0 12px 30px rgba(255, 215, 0, 0.6)",
          }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          style={{ minWidth: 170, cursor: "pointer" }}
        >
          <Card
            className="p-3 rounded-4 shadow-lg text-center"
            style={{
              background: "linear-gradient(145deg, #1a1a1a, #0e0e0e)",
              border: "1px solid rgba(255, 215, 0, 0.4)",
              height: 250,
            }}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: 100,
                height: 100,
                margin: "0 auto 1rem auto",
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)",
                border: "3px solid gold",
              }}
            >
              <motion.img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
                whileHover={{ scale: 1.1, rotateZ: 3 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <Card.Body className="p-0">
              <Card.Title className="fs-6 fw-semibold text-truncate text-light mb-1">
                {item.title}
              </Card.Title>
              <Card.Text className="fs-7 mb-0 text-truncate text-warning">
                {item.artist}
              </Card.Text>
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </Row>
  </Container>
</motion.div>




       <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  <Container className="mt-5 mb-5" style={{ maxWidth: "720px" }}>
    <h5 className="text-light fw-bold mb-4">
      <i className="bi bi-music-note-beamed me-2 text-info" />
      Garry Sandhu
    </h5>

    <Row className="flex-row flex-nowrap overflow-auto gx-4">
      {jumpBackInItems.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{
            scale: 1.1,
            rotateY: 5,
            boxShadow: "0 10px 30px rgba(0, 255, 255, 0.6)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          style={{ minWidth: 170, cursor: "pointer" }}
        >
          <Card
            className="p-3 rounded-4 shadow-lg"
            style={{
              height: 270,
              background: "linear-gradient(135deg, #111, #000)",
              border: "1px solid rgba(0,255,255,0.4)",
              transition: "all 0.3s ease",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 150,
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 18px rgba(0,255,255,0.5)",
                marginBottom: "12px",
              }}
            >
              <motion.img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <Card.Body className="p-0 text-center">
              <Card.Title className="fs-6 fw-semibold text-light text-truncate mb-1">
                {item.title}
              </Card.Title>
              <Card.Text className="fs-7 mb-0 text-info text-truncate">
                {item.artist}
              </Card.Text>
            </Card.Body>
          </Card>
        </motion.div>
      ))}
    </Row>
  </Container>
</motion.div>


       
   <Container
      className={`bg-dark text-white rounded p-4 my-4 mx-2 shadow-lg animated-container ${
        loaded ? "fade-slide-in" : "opacity-0"
      }`}
      style={{ transition: "transform 0.4s ease, box-shadow 0.4s ease" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow =
          "0 12px 30px rgba(29, 185, 84, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
      }}
    >
      {/* Header Row */}
      <Row className="align-items-center mb-3">
        <Col xs="auto">
          <img
            src="Jass.jpeg"
            alt="Punjabi Gaming"
            className="rounded"
            style={{
              width: 64,
              height: 64,
              objectFit: "cover",
              filter: "drop-shadow(0 0 4px #1db954)",
              transition: "transform 0.3s ease",
            }}
          />
        </Col>
        <Col>
          <h5
            className="mb-0 fw-bold"
            style={{ letterSpacing: "0.05em", userSelect: "none" }}
          >
            Punjabi Gaming
          </h5>
          <small
            className="text-muted"
            style={{ fontWeight: "500", letterSpacing: "0.04em" }}
          >
            Playlist • Spotify
          </small>
        </Col>
        <Col xs="auto">
          <Button
            variant="light"
            className="rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm"
            style={{
              width: 28,
              height: 28,
              fontSize: "1.2rem",
              fontWeight: "bold",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              userSelect: "none",
            }}
            aria-label="Add playlist"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1db954";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "";
              e.currentTarget.style.color = "";
              e.currentTarget.style.transform = "scale(1)";
            }}
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
          className="img-fluid rounded shadow-lg"
          style={{ transition: "transform 0.4s ease" }}
        />
        <Button
          variant="dark"
          className="position-absolute top-50 start-0 translate-middle-y opacity-75 rounded-circle shadow-sm"
          style={{
            width: 32,
            height: 32,
            left: "10px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            userSelect: "none",
          }}
          aria-label="Previous"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.boxShadow = "0 0 10px #1db954";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "";
          }}
        >
          &#8592;
        </Button>
        <Button
          variant="dark"
          className="position-absolute top-50 end-0 translate-middle-y opacity-75 rounded-circle shadow-sm"
          style={{
            width: 32,
            height: 32,
            right: "10px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            userSelect: "none",
          }}
          aria-label="Next"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.boxShadow = "0 0 10px #1db954";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "";
          }}
        >
          &#8594;
        </Button>
      </div>

      {/* Artist Names */}
      <p
        className="fw-semibold mb-2"
        style={{ letterSpacing: "0.04em", fontSize: "0.95rem", userSelect: "none" }}
      >
        Diljit Dosanjh, Sidhu Moose Wala, Shubh, Cheema Y, Arjan Dhillon
      </p>

      {/* Action Buttons */}
      <div className="d-flex align-items-center gap-3">
        <Button
          variant="dark"
          className="d-flex align-items-center gap-2 py-1 px-3 rounded-pill text-white border border-secondary shadow-sm"
          style={{
            fontSize: "0.85rem",
            userSelect: "none",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#1db954";
            e.currentTarget.style.borderColor = "#1db954";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "";
            e.currentTarget.style.borderColor = "rgba(108, 117, 125, 1)";
            e.currentTarget.style.color = "";
          }}
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
          className="rounded-circle d-flex align-items-center justify-content-center shadow-lg"
          style={{
            width: 40,
            height: 40,
            fontSize: "1.2rem",
            fontWeight: "bold",
            userSelect: "none",
            boxShadow:
              "0 0 12px #1db954, 0 0 24px #1db954, 0 0 32px #1db954",
            transition: "box-shadow 1.5s ease-in-out infinite alternate",
            animation: "pulseGlow 2s infinite alternate",
          }}
          aria-label="Play"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.boxShadow =
              "0 0 16px #1db954, 0 0 32px #1db954, 0 0 48px #1db954";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow =
              "0 0 12px #1db954, 0 0 24px #1db954, 0 0 32px #1db954";
          }}
        >
          ▶
        </Button>

        <Button
          variant="link"
          className="text-white fs-4 fw-bold ms-auto p-0"
          aria-label="More options"
          style={{ userSelect: "none", cursor: "pointer" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#1db954";
            e.currentTarget.style.textShadow = "0 0 4px #1db954";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "white";
            e.currentTarget.style.textShadow = "none";
          }}
        >
          ...
        </Button>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0% {
            box-shadow:
              0 0 12px #1db954,
              0 0 24px #1db954,
              0 0 32px #1db954;
          }
          100% {
            box-shadow:
              0 0 20px #1db954,
              0 0 40px #1db954,
              0 0 56px #1db954;
          }
        }
        .fade-slide-in {
          animation: fadeSlideIn 0.6s ease forwards;
        }
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
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
          <Link to="/punjabi" className="text-white text-center text-decoration-none">
            <i className="bi bi-music-note-list fs-4 d-block" />
            <small>Library</small>

                        {/* <Link to="/punjabi" className="btn btn-sm btn-dark rounded-pill px-4">Songs</Link> */}

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
