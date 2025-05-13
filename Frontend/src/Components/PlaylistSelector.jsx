import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaylistSelector = () => {
  const [playlists, setPlaylists] = useState({});
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('playlists') || '{}');
    setPlaylists(stored);
    window.addEventListener('playlist-updated', loadPlaylists);
    return () => window.removeEventListener('playlist-updated', loadPlaylists);
  }, []);

  const loadPlaylists = () => {
    const stored = JSON.parse(localStorage.getItem('playlists') || '{}');
    setPlaylists(stored);
  };

  const handleSelect = (e) => {
    const playlistName = e.target.value;
    setSelected(playlistName);
    if (playlistName) {
      navigate(`/playlist/${encodeURIComponent(playlistName)}`);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Select Playlist to View</h4>
      <div className="mb-3">
        <select
          value={selected}
          onChange={handleSelect}
          className="form-select"
          aria-label="Select Playlist"
        >
          <option value="">-- Select Playlist --</option>
          {Object.keys(playlists).map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PlaylistSelector;
