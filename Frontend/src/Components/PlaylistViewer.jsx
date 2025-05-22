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

  const handlePlay = (index) => setCurrentIndex(index);
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
    if (window.confirm(`Are you sure you want to delete the "${name}" playlist?`)) {
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
      document.getElementById("audio-player")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex === null && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  return (
    <div 
      className="container-fluid py-4 px-3 px-md-5" 
      style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}
    >
      {/* Back button */}
      <div className="mb-4">
        <button
          className="btn btn-outline-light"
          onClick={() => navigate('/playlist')}
        >
          ← Back to Playlists
        </button>
      </div>

      {/* Playlist header with delete */}
      <div className="row align-items-center mb-4">
        <div className="col-12 col-md-8">
          <h3 className="text-truncate">{name} Playlist</h3>
        </div>
        <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
          <button
            onClick={handleDeletePlaylist}
            className="btn btn-danger w-100 w-md-auto"
          >
            🗑 Delete Playlist
          </button>
        </div>
      </div>

      {/* Song list */}
      {matchedSongs.length > 0 ? (
        <ul className="list-group mb-4">
          {matchedSongs.map((song, index) => (
            <li
              key={index}
              className={`list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center ${
                index === currentIndex ? 'active text-white' : ''
              }`}
              style={{
                backgroundColor: index === currentIndex ? '#0d6efd' : 'transparent',
                color: index === currentIndex ? 'white' : 'inherit'
              }}
            >
              <div className="flex-grow-1 me-sm-3 text-truncate mb-2 mb-sm-0">
                <strong>{song.song}</strong>{' '}
                <small className="text-light">by {song.artist}</small>
              </div>
              <div className="btn-group" role="group">
                <button
                  onClick={() => handlePlay(index)}
                  className={`btn btn-sm ${index === currentIndex ? 'btn-light text-primary' : 'btn-primary'}`}
                >
                  ▶
                </button>
                <button
                  onClick={() => removeSongFromPlaylist(song)}
                  className="btn btn-sm btn-outline-danger"
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted fst-italic">No songs found in this playlist.</p>
      )}

      {/* Audio Player */}
      {currentIndex !== null && matchedSongs[currentIndex] && (
        <div
          id="audio-player"
          className="mt-4 p-3 border rounded bg-light shadow-sm"
          style={{ color: 'black' }}
        >
          <h5 className="mb-3">
            Now Playing:{' '}
            <span className="text-primary">{matchedSongs[currentIndex].song}</span>
          </h5>
          <audio
            ref={audioRef}
            controls
            autoPlay
            onEnded={handleNext}
            onError={() => alert('Failed to load audio.')}
            className="w-100"
          >
            <source src={matchedSongs[currentIndex].src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <div className="mt-3 d-flex flex-column flex-sm-row gap-2 justify-content-center justify-content-sm-start">
            <button
              onClick={handlePrev}
              className="btn btn-secondary"
              disabled={currentIndex === 0}
            >
              ⏮ Previous
            </button>
            <button
              onClick={handleNext}
              className="btn btn-secondary"
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
