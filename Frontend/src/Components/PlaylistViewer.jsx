import React, { useState, useEffect, useRef } from 'react';
import { Songs } from '../data/song';
import { useParams, useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    if (currentIndex === null && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  const handlePlay = (index) => setCurrentIndex(index);
  const handleNext = () => currentIndex < matchedSongs.length - 1 && setCurrentIndex(i => i + 1);
  const handlePrev = () => currentIndex > 0 && setCurrentIndex(i => i - 1);

  const handleDeletePlaylist = () => {
    if (!name) return;
    if (window.confirm(`Are you sure you want to delete "${name}" playlist?`)) {
      const updated = { ...playlists };
      delete updated[name];
      localStorage.setItem('playlists', JSON.stringify(updated));
      setPlaylists(updated);
      setMatchedSongs([]);
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
    <div className="container-fluid py-4 px-3 px-md-5" style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
      {/* Back */}
      <div className="mb-4">
        <button className="btn btn-outline-light" onClick={() => navigate('/playlist')}>
          ← Back to Playlists
        </button>
      </div>

      {/* Playlist Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h3 className="m-0 text-capitalize">{name} Playlist</h3>
        <button onClick={handleDeletePlaylist} className="btn btn-danger">
          🗑 Delete Playlist
        </button>
      </div>

      {/* Song List */}
      {matchedSongs.length > 0 ? (
        <div className="list-group">
          {matchedSongs.map((song, index) => (
            <div
              key={index}
              className={`list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 ${
                index === currentIndex ? 'active' : ''
              }`}
              style={{
                backgroundColor: index === currentIndex ? '#0d6efd' : '#1e1e1e',
                borderColor: '#333',
                color: index === currentIndex ? '#fff' : '#ccc',
                transition: 'background 0.3s ease',
              }}
              onClick={() => handlePlay(index)}
            >
              <div className="flex-grow-1">
                <strong>{song.song}</strong> <span className="text-muted">by {song.artist}</span>
              </div>
              <div className="d-flex gap-2">
                <button
                  className={`btn btn-sm ${index === currentIndex ? 'btn-light text-primary' : 'btn-outline-light'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay(index);
                  }}
                >
                  ▶ Play
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSong(song);
                  }}
                >
                  ✖ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted fst-italic">No songs found in this playlist.</p>
      )}

      {/* Audio Player */}
      {currentIndex !== null && matchedSongs[currentIndex] && (
        <div
          id="audio-player"
          className="mt-5 p-4 bg-light text-dark rounded shadow"
        >
          <h5 className="mb-3">
            Now Playing: <span className="text-primary">{matchedSongs[currentIndex].song}</span>
          </h5>
          <audio
            ref={audioRef}
            controls
            autoPlay
            onEnded={handleNext}
            className="w-100"
          >
            <source src={matchedSongs[currentIndex].src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              ⏮ Previous
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleNext}
              disabled={currentIndex === matchedSongs.length - 1}
            >
              ⏭ Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistViewer;
