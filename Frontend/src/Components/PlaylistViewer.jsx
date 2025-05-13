import React, { useState, useEffect, useRef } from 'react';
import { Songs } from '../data/song';
import { useParams, useNavigate } from 'react-router-dom';

const PlaylistViewer = () => {
  const { name } = useParams();  // This will get the playlist name from the URL
  const navigate = useNavigate();  // For navigation after deleting playlist
  const [playlists, setPlaylists] = useState({});
  const [matchedSongs, setMatchedSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const audioRef = useRef(null);

  // Load playlists from localStorage
  useEffect(() => {
    loadPlaylists();
  }, []);

  // Load songs based on the selected playlist
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

  // Play the selected song
  const handlePlay = (index) => {
    setCurrentIndex(index);  // Update the current song index
  };

  // Go to next song
  const handleNext = () => {
    if (currentIndex < matchedSongs.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Go to previous song
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
      navigate('/playlist');  // Redirect to the playlist selection page after deletion
      alert(`"${name}" playlist has been deleted.`);
    }
  };

  // Trigger the audio to play when currentIndex changes
  useEffect(() => {
    if (audioRef.current && currentIndex !== null) {
      audioRef.current.load();  // Reload the audio element with the new song
      audioRef.current.play();  // Play the new song
    }
  }, [currentIndex]);

  return (
    <div className="container mt-4">
      <h3>{name} Playlist</h3>

      {/* Button to delete the playlist */}
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
              {song.song} by {song.artist}
              <button 
                onClick={() => handlePlay(index)} 
                className="btn btn-primary btn-sm"
              >
                Play
              </button>
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
