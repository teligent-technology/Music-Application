// src/components/PlaylistViewer.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Image } from 'react-bootstrap';
import './Playlist.css';

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
      setMatchedSongs(playlists[name]);
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
    if (window.confirm(`"${name}" playlist delete karna hai?`)) {
      const updated = { ...playlists };
      delete updated[name];
      localStorage.setItem('playlists', JSON.stringify(updated));
      navigate('/playlist');
    }
  };

  const removeSong = (songToRemove) => {
    const updatedList = playlists[name].filter(s => s.src !== songToRemove.src);
    const updatedPlaylists = { ...playlists, [name]: updatedList };
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);

    const updatedSongs = matchedSongs.filter(s => s.src !== songToRemove.src);
    setMatchedSongs(updatedSongs);
    if (updatedSongs.length === 0) setCurrentIndex(null);
    else if (currentIndex >= updatedSongs.length) setCurrentIndex(updatedSongs.length - 1);
  };

  return (
    <Container className="playlist-container glass-box animate-fade-in text-white my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="outline-light" onClick={() => navigate('/playlist')}>← Back</Button>
        <h3 className="text-capitalize neon-text glow">{name} Playlist</h3>
        <Button variant="outline-danger" onClick={handleDeletePlaylist}>🗑 Delete</Button>
      </div>

      <div className="song-list">
        {matchedSongs.length > 0 ? (
          matchedSongs.map((song, index) => (
            <Card
              key={index}
              className={`song-card-glass mb-3 ${currentIndex === index ? 'selected-song' : ''}`}
              onClick={() => handlePlay(index)}
            >
              <div className="d-flex align-items-center p-2">
                <Image
                  src={song.img || '/default-img.jpg'}
                  alt={song.song}
                  className="song-thumbnail me-3"
                  roundedCircle
                />
                <div className="flex-grow-1 text-white">
                  <div className="fw-bold" style={{ color: 'white' }}>{song.song}</div>
                  <div className="text-white-50 small">{song.artist}</div>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSong(song);
                  }}
                >
                  ✖
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-light fst-italic mt-4">
            This playlist has no songs yet.
          </p>
        )}
      </div>

      {currentIndex !== null && matchedSongs[currentIndex] && (
        <div id="audio-player" className="glass-player-box mt-5 p-4 rounded text-white">
          <h5 className="text-info mb-3">
            <i className="bi bi-soundwave me-2"></i> Now Playing: {matchedSongs[currentIndex].song}
          </h5>
          <audio ref={audioRef} controls autoPlay className="w-100" onEnded={handleNext}>
            <source src={matchedSongs[currentIndex].src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button variant="outline-info" onClick={handlePrev} disabled={currentIndex === 0}>
              ⏮ Prev
            </Button>
            <Button variant="outline-info" onClick={handleNext} disabled={currentIndex === matchedSongs.length - 1}>
              Next ⏭
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PlaylistViewer;
