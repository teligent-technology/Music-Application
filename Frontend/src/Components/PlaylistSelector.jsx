import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaylistSelector = ({ selectedSongs }) => {
  const [playlists, setPlaylists] = useState({});
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  // Load playlists from localStorage and listen for updates
  useEffect(() => {
    loadPlaylists();
    window.addEventListener('playlist-updated', loadPlaylists);
    return () => window.removeEventListener('playlist-updated', loadPlaylists);
  }, []);

  const loadPlaylists = () => {
    const stored = JSON.parse(localStorage.getItem('playlists') || '{}');
    setPlaylists(stored);
  };

  // Handle dropdown selection change
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  // Navigate to selected playlist page
  const handleOpenPlaylist = () => {
    if (!selected) {
      alert('Please select a playlist first!');
      return;
    }
    navigate(`/playlist/${encodeURIComponent(selected)}`);
  };

  // Save selected songs to chosen playlist
 const handleSave = () => {
  if (!selected) {
    alert('Please select a playlist first!');
    return;
  }
  if (!Array.isArray(selectedSongs) || selectedSongs.length === 0) {
    alert('No songs selected to add!');
    return;
  }

  const stored = JSON.parse(localStorage.getItem('playlists') || '{}');
  const existingSongs = stored[selected] || [];

  // Use filenames for consistency with PlaylistViewer
  const selectedFilenames = selectedSongs.map(song => song.src.split('/').pop());

  // Combine unique filenames
  const updatedSongs = [...new Set([...existingSongs, ...selectedFilenames])];

  stored[selected] = updatedSongs;
  localStorage.setItem('playlists', JSON.stringify(stored));
  setPlaylists({ ...stored });

  alert(`Added ${selectedFilenames.length} songs to "${selected}" playlist.`);
  window.dispatchEvent(new Event('playlist-updated'));

  console.log('Playlists after save:', stored);
};


  return (
    <div className="container mt-4 d-flex align-items-center gap-2">
      <div className="flex-grow-1">
        <h4 className="mb-3">Select Playlist to View</h4>
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

      <button className="btn btn-primary mt-4" onClick={handleOpenPlaylist}>
        📂 Open Playlist
      </button>

      <button className="btn btn-success mt-4" onClick={handleSave}>
        💾 Save Selected Songs
      </button>
    </div>
  );
};

export default PlaylistSelector;
