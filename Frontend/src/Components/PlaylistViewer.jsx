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
    loadPlaylists();
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

  const loadPlaylists = () => {
    const storedPlaylists = JSON.parse(localStorage.getItem('playlists') || '{}');
    setPlaylists(storedPlaylists);
  };

  const handlePlay = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < matchedSongs.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleDeletePlaylist = () => {
    if (!name) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete the "${name}" playlist?`);
    if (confirmDelete) {
      const updatedPlaylists = { ...playlists };
      delete updatedPlaylists[name];
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
      setPlaylists(updatedPlaylists);
      setMatchedSongs([]);
      navigate('/playlist');
      alert(`"${name}" playlist has been deleted.`);
    }
  };

  const removeSongFromPlaylist = (songToRemove) => {
    const filename = songToRemove.src.split('/').pop();
    const updatedFilenames = playlists[name].filter(f => f !== filename);

    const updatedPlaylists = {
      ...playlists,
      [name]: updatedFilenames
    };

    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);

    const updatedMatchedSongs = matchedSongs.filter(song => song.src !== songToRemove.src);
    setMatchedSongs(updatedMatchedSongs);

    if (updatedMatchedSongs.length === 0) {
      setCurrentIndex(null);
    } else if (currentIndex >= updatedMatchedSongs.length) {
      setCurrentIndex(updatedMatchedSongs.length - 1);
    }
  };

  useEffect(() => {
    if (audioRef.current && currentIndex !== null) {
      audioRef.current.load();
      audioRef.current.play();

      // Smooth scroll to audio player on play
      document.getElementById("audio-player")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex]);

  // Pause audio if no song selected
  useEffect(() => {
    if (currentIndex === null && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  return (
    <div className="container mt-4">
      {/* Back button to playlists */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => navigate('/playlist')}
      >
        ← Back to Playlists
      </button>

      {/* Header with playlist name and delete button */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
        <h3 className="mb-2 mb-md-0">{name} Playlist</h3>
        <button
          onClick={handleDeletePlaylist}
          className="btn btn-danger"
          aria-label="Delete Playlist"
        >
          🗑 Delete Playlist
        </button>
      </div>

      {/* Song list */}
      {matchedSongs.length > 0 ? (
        <ul className="list-group">
          {matchedSongs.map((song, index) => (
            <li
              key={index}
              className={`list-group-item ${index === currentIndex ? 'active text-white bg-primary' : ''}`}
            >
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
                <span className="mb-2 mb-sm-0">
                  {song.song} by {song.artist}
                </span>
                <div className="d-flex gap-2">
                  <button
                    onClick={() => handlePlay(index)}
                    className="btn btn-primary btn-sm"
                    aria-label={`Play ${song.song}`}
                  >
                    ▶ Play
                  </button>
                  <button
                    onClick={() => removeSongFromPlaylist(song)}
                    className="btn btn-danger btn-sm"
                    aria-label={`Remove ${song.song}`}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No songs found in this playlist.</p>
      )}

      {/* Audio Player */}
      {currentIndex !== null && (
        <div id="audio-player" className="mt-4">
          <h5 className="mb-3">
            Now Playing: <span className="text-primary">{matchedSongs[currentIndex]?.song}</span>
          </h5>
          <audio
            ref={audioRef}
            controls
            autoPlay
            onEnded={handleNext}
            onError={() => alert("Failed to load audio.")}
            className="w-100"
          >
            <source src={matchedSongs[currentIndex]?.src} type="audio/mpeg" />
          </audio>

          <div className="mt-3 d-flex flex-column flex-sm-row gap-2">
            <button
              onClick={handlePrev}
              className="btn btn-secondary"
              disabled={currentIndex === 0}
              aria-label="Previous Song"
            >
              ⏮ Previous
            </button>
            <button
              onClick={handleNext}
              className="btn btn-secondary"
              disabled={currentIndex === matchedSongs.length - 1}
              aria-label="Next Song"
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
