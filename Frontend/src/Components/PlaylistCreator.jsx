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

    const playlists = JSON.parse(localStorage.getItem('playlists') || '{}');

    if (playlists[playlistName]) {
      const confirmOverwrite = window.confirm(
        `Playlist "${playlistName}" already exists. Overwrite?`
      );
      if (!confirmOverwrite) {
        inputRef.current?.focus();
        return;
      }
    }

    const selectedFilenames = selectedSongs.map(song =>
      song.src.split('/').pop()
    );

    playlists[playlistName] = selectedFilenames;
    localStorage.setItem('playlists', JSON.stringify(playlists));
    alert(`Playlist "${playlistName}" saved!`);
    setPlaylistName('');
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("playlist-updated"));
    }
    inputRef.current?.focus();
  };

  const isSaveDisabled = !playlistName.trim() || !selectedSongs || selectedSongs.length === 0;

  return (
    <div className="mb-4">
      <h3>Create Playlist</h3>

      <div
        style={{
          position: 'sticky',
          top: 0,
          background: '#fff',
          zIndex: 10,
          padding: '15px',
          borderBottom: '2px solid #dee2e6',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
        <div className="mb-3">
          <label htmlFor="playlistName" className="form-label">
            Playlist Name
          </label>
          <input
            type="text"
            id="playlistName"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            ref={inputRef}
            aria-describedby="playlistNameHelp"
          />
          {error && (
            <div className="invalid-feedback" id="playlistNameHelp">
              {error}
            </div>
          )}
        </div>

        <button
          onClick={savePlaylist}
          className="btn btn-success w-100"
          disabled={isSaveDisabled}
          aria-disabled={isSaveDisabled}
          title={isSaveDisabled ? 'Enter a playlist name and select songs to enable' : 'Save playlist'}
        >
          Save Playlist
        </button>
      </div>
    </div>
  );
};

export default PlaylistCreator;
