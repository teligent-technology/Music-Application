// src/components/PlaylistViewer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Songs } from '../data/song';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col, Image } from 'react-bootstrap';
import './Playlist.css';

const generateAccentColor = (index) => {
  const hues = [180, 210, 240, 300, 330];
  return `hsl(${hues[index % hues.length]}, 85%, 55%)`;
};

const PlaylistViewer = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState({});
  const [matchedSongs, setMatchedSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('playlists') || '{}');
    setPlaylists(stored);
  }, []);

  useEffect(() => {
    if (name && playlists[name]) {
      const savedFilenames = playlists[name];
      const matched = Songs.filter(song =>
        savedFilenames.includes(song.src.split('/').pop())
      );
      setMatchedSongs(matched);
      setCurrentIndex(null);
    }
  }, [name, playlists]);

  useEffect(() => {
    if (audioRef.current && currentIndex !== null) {
      audioRef.current.load();
      audioRef.current.play();
      document.getElementById("audio-player")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex]);

  const handlePlay = (index) => setCurrentIndex(index);
  const handleNext = () => currentIndex < matchedSongs.length - 1 && setCurrentIndex(i => i + 1);
  const handlePrev = () => currentIndex > 0 && setCurrentIndex(i => i - 1);

  const handleDeletePlaylist = () => {
    if (!name) return;
    if (window.confirm(`Delete "${name}" playlist?`)) {
      const updated = { ...playlists };
      delete updated[name];
      localStorage.setItem('playlists', JSON.stringify(updated));
      navigate('/playlist');
    }
  };

  const removeSong = (songToRemove) => {
    const filename = songToRemove.src.split('/').pop();
    const updatedList = playlists[name].filter(f => f !== filename);
    const updatedPlaylists = { ...playlists, [name]: updatedList };
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);

    const updatedSongs = matchedSongs.filter(song => song.src !== songToRemove.src);
    setMatchedSongs(updatedSongs);
    if (updatedSongs.length === 0) setCurrentIndex(null);
    else if (currentIndex >= updatedSongs.length) setCurrentIndex(updatedSongs.length - 1);
  };

  return (
    <Container className="playlist-viewer py-5 text-white">
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Button variant="outline-light" onClick={() => navigate('/playlist')}>
          ← Back
        </Button>
        <h2 className="text-capitalize mb-0">{name} Playlist</h2>
        <Button variant="danger" onClick={handleDeletePlaylist}>
          🗑 Delete Playlist
        </Button>
      </div>

      <Row className="g-4">
        {matchedSongs.length > 0 ? (
          matchedSongs.map((song, index) => {
            const accentColor = generateAccentColor(index);
            return (
              <Col xs={12} md={6} lg={4} key={index}>
                <Card
                  className="playlist-song-card h-100"
                  style={{ '--accent-color': accentColor }}
                >
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div onClick={() => handlePlay(index)} className="cursor-pointer">
                      <Image
                        src={song.img || "/default-img.jpg"}
                        roundedCircle
                        className="song-thumbnail mb-3"
                        alt={song.song}
                      />
                      <Card.Title className="fw-bold">{song.song}</Card.Title>
                      <Card.Text className="text-muted">{song.artist}</Card.Text>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        variant="outline-light"
                        onClick={() => handlePlay(index)}
                      >
                        ▶ Play
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => removeSong(song)}
                      >
                        ✖ Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <p className="text-muted">No songs in this playlist.</p>
        )}
      </Row>

      {currentIndex !== null && matchedSongs[currentIndex] && (
        <div id="audio-player" className="mt-5 p-4 rounded bg-light text-dark shadow-lg">
          <h5>
            Now Playing: <span className="text-primary">{matchedSongs[currentIndex].song}</span>
          </h5>
          <audio ref={audioRef} controls autoPlay onEnded={handleNext} className="w-100">
            <source src={matchedSongs[currentIndex].src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="mt-3 d-flex gap-2">
            <Button variant="secondary" onClick={handlePrev} disabled={currentIndex === 0}>
              ⏮ Previous
            </Button>
            <Button
              variant="secondary"
              onClick={handleNext}
              disabled={currentIndex === matchedSongs.length - 1}
            >
              ⏭ Next
            </Button>
          </div>
        </div>
      )}

      {/* Optional: Add mobile footer for consistency */}
      <nav className="mobile-footer d-md-none mt-5">
        <FooterIcon to="/home" icon="bi-house-door-fill" label="Home" />
        <FooterIcon to="/search" icon="bi-search" label="Search" />
        <FooterIcon to="/library" icon="bi-music-note-list" label="Library" />
        <FooterIcon to="/create" icon="bi-plus-circle-fill" label="Create" />
        <FooterIcon to="/premium" icon="bi-gem" label="Premium" />
      </nav>
    </Container>
  );
};

const FooterIcon = ({ to, icon, label }) => (
  <Link to={to} className="footer-icon" aria-label={label}>
    <i className={`bi ${icon}`} />
    <span>{label}</span>
  </Link>
);

export default PlaylistViewer;
