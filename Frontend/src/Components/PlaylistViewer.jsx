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
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
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
    }
  }, [currentIndex]);

  return (
    <div className="container mt-4">
      <h3>{name} Playlist</h3>

      <button 
        onClick={handleDeletePlaylist} 
        className="btn btn-danger mb-3"
      >
        🗑 Delete Playlist
      </button>

      {matchedSongs.length > 0 ? (
        <ul className="list-group">
          {matchedSongs.map((song, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {song.song} by {song.artist}
              </span>
              <div>
                <button 
                  onClick={() => handlePlay(index)} 
                  className="btn btn-primary btn-sm me-2"
                >
                  ▶ Play
                </button>
                <button 
                  onClick={() => removeSongFromPlaylist(song)} 
                  className="btn btn-danger btn-sm"
                >
                  ❌ Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs found in this playlist.</p>
      )}

      {currentIndex !== null && (
        <div className="mt-4">
          <h4>Now Playing: {matchedSongs[currentIndex]?.song}</h4>
          <audio
            ref={audioRef}
            controls
            autoPlay
            onEnded={handleNext}
            className="w-100"
          >
            <source src={matchedSongs[currentIndex]?.src} type="audio/mpeg" />
          </audio>
          <div className="mt-2">
            <button 
              onClick={handlePrev} 
              className="btn btn-secondary me-2" 
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
