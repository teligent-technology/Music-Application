import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlaylistSelector = ({ selectedSongs }) => {
  const [playlists, setPlaylists] = useState({});
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadPlaylists();
    window.addEventListener('playlist-updated', loadPlaylists);
    return () => window.removeEventListener('playlist-updated', loadPlaylists);
  }, []);

  const loadPlaylists = () => {
    const stored = JSON.parse(localStorage.getItem('playlists') || '{}');
    setPlaylists(stored);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleOpenPlaylist = () => {
    if (!selected) {
      alert('Please select a playlist first!');
      return;
    }
    navigate(`/playlist/${encodeURIComponent(selected)}`);
  };

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

    const selectedFilenames = selectedSongs.map(song => song.src.split('/').pop());

    const updatedSongs = [...new Set([...existingSongs, ...selectedFilenames])];

    stored[selected] = updatedSongs;
    localStorage.setItem('playlists', JSON.stringify(stored));
    setPlaylists({ ...stored });

    alert(`Added ${selectedFilenames.length} songs to "${selected}" playlist.`);
    window.dispatchEvent(new Event('playlist-updated'));
  };

  const playlistNames = Object.keys(playlists);

  return (
    <div className="container mt-4 bg-dark text-white rounded shadow-sm p-4">
      <h4 className="mb-4 fw-bold border-bottom pb-2" style={{ borderColor: '#444' }}>
        Select Playlist to View
      </h4>

      {playlistNames.length === 0 ? (
        <p className="text-muted fst-italic">No playlists available. Create one first!</p>
      ) : (
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <select
              value={selected}
              onChange={handleSelect}
              className="form-select bg-dark text-white border-secondary"
              aria-label="Select Playlist"
              style={{ boxShadow: 'none' }}
            >
              <option value="">-- Select Playlist --</option>
              {playlistNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-3 d-grid">
            <button
              className="btn btn-primary fw-semibold"
              onClick={handleOpenPlaylist}
              disabled={!selected}
              aria-disabled={!selected}
              title={!selected ? 'Select a playlist first' : 'Open selected playlist'}
            >
              <span className="me-1" role="img" aria-hidden="true">📂</span>
              Open Playlist
            </button>
          </div>

          <div className="col-6 col-md-3 d-grid">
            <button
              className="btn btn-success fw-semibold"
              onClick={handleSave}
              disabled={!selected || !selectedSongs.length}
              aria-disabled={!selected || !selectedSongs.length}
              title={
                !selected
                  ? 'Select a playlist first'
                  : !selectedSongs.length
                    ? 'No songs selected to add'
                    : 'Save selected songs to playlist'
              }
            >
              <span className="me-1" role="img" aria-hidden="true">💾</span>
              Save Selected Songs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistSelector;
