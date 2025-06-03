import React, { useState, useEffect, useRef } from 'react';
import { Songs } from '../data/song';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Card, Button, Image } from 'react-bootstrap';
import './Playlist.css';  // Aapka CSS file

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
    if (window.confirm(`"${name}" playlist delete karna hai?`)) {
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
    <Container className="playlist-container animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="outline-primary" onClick={() => navigate('/playlist')}>
          ← Back
        </Button>
        <h3 className="text-capitalize" style={{ color: '#1ed760' }}>{name} Playlist</h3>
        <Button variant="outline-danger" onClick={handleDeletePlaylist}>
          🗑 Delete
        </Button>
      </div>

      <div className="song-list">
        {matchedSongs.length > 0 ? (
          matchedSongs.map((song, index) => (
            <Card
              key={index}
              className={`song-card ${currentIndex === index ? 'selected' : ''}`}
              onClick={() => handlePlay(index)}
            >
              <div className="d-flex align-items-center">
                <Image
                  src={song.img || '/default-img.jpg'}
                  alt={song.song}
                  className="song-thumbnail me-3"
                  rounded
                />
                <div className="song-card-content">
                  <div className="song-title">{song.song}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-auto"
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
          <p className="text-center text-muted mt-4">Is playlist mein abhi koi gaane nahi hain.</p>
        )}
      </div>

      {currentIndex !== null && matchedSongs[currentIndex] && (
        <div id="audio-player" className="mt-4 p-4 rounded" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(16px)' }}>
          <h5 style={{ color: '#1ed760' }}>
            Playing: {matchedSongs[currentIndex].song}
          </h5>
          <audio ref={audioRef} controls autoPlay className="w-100" onEnded={handleNext}>
            <source src={matchedSongs[currentIndex].src} type="audio/mpeg" />
            Aapka browser audio support nahi karta.
          </audio>
          <div className="d-flex justify-content-center gap-2 mt-3">
            <Button variant="outline-primary" onClick={handlePrev} disabled={currentIndex === 0}>
              ⏮ Previous
            </Button>
            <Button variant="outline-primary" onClick={handleNext} disabled={currentIndex === matchedSongs.length - 1}>
              ⏭ Next
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PlaylistViewer;
