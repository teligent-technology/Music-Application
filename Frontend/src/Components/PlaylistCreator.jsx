import React, { useState, useRef } from 'react';

const PlaylistCreator = ({ selectedSongs }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const savePlaylist = () => {
    setError('');

    if (!playlistName.trim()) {
      setError('Playlist name is required.');
      inputRef.current?.focus();
      return;
    }

    if (!selectedSongs || selectedSongs.length === 0) {
      setError('No songs selected to add.');
      return;
    }

    const playlistKey = `playlistSongs_${playlistName}`;
    const selectedFilenames = selectedSongs.map(song => ({
      name: song.name,
      src: song.src
    }));

    localStorage.setItem(playlistKey, JSON.stringify(selectedFilenames));

    const existingPlaylists = JSON.parse(localStorage.getItem('myPlaylists') || '[]');
    const exists = existingPlaylists.some(p => p.name === playlistName);

    if (!exists) {
      existingPlaylists.push({ name: playlistName, type: 'Custom' });
      localStorage.setItem('myPlaylists', JSON.stringify(existingPlaylists));
    }

    alert(`Playlist "${playlistName}" saved!`);
    setPlaylistName('');
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("playlist-updated"));
    }

    inputRef.current?.focus();
  };

  const isSaveDisabled = !playlistName.trim() || !selectedSongs || selectedSongs.length === 0;

  return (
    <div className="mb-4 bg-dark text-white rounded shadow-sm p-4">
      <h3 className="mb-4 border-bottom pb-2 fw-bold" style={{ borderColor: '#444' }}>
        Create Playlist
      </h3>

      <div
        style={{
          position: 'sticky',
          top: 0,
          background: '#121212',
          zIndex: 20,
          padding: '1rem',
          borderBottom: '1px solid #333',
          borderRadius: '0.375rem',
          boxShadow: '0 2px 10px rgb(0 0 0 / 0.5)',
        }}
      >
        <div className="mb-3">
          <label htmlFor="playlistName" className="form-label fw-semibold">
            Playlist Name
          </label>
          <input
            type="text"
            id="playlistName"
            className={`form-control bg-dark text-white border ${error ? 'border-danger is-invalid' : 'border-secondary'}`}
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            ref={inputRef}
            aria-describedby="playlistNameHelp"
            style={{ boxShadow: 'none' }}
          />
          {error && (
            <div className="invalid-feedback" id="playlistNameHelp">
              {error}
            </div>
          )}
        </div>

        <button
          onClick={savePlaylist}
          className="btn btn-success w-100 fw-bold"
          disabled={isSaveDisabled}
          aria-disabled={isSaveDisabled}
          title={isSaveDisabled ? 'Enter a playlist name and select songs to enable' : 'Save playlist'}
          style={{ fontSize: '1.1rem', padding: '0.5rem' }}
        >
          Save Playlist
        </button>
      </div>
    </div>
  );
};

export default PlaylistCreator;
