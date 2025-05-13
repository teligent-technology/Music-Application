import React, { useState } from 'react';

const PlaylistCreator = ({ selectedSongs }) => {
  const [playlistName, setPlaylistName] = useState('');

  const savePlaylist = () => {
    if (!playlistName || selectedSongs.length === 0) {
      alert('Playlist name or songs missing');
      return;
    }

    const playlists = JSON.parse(localStorage.getItem('playlists') || '{}');

    const selectedFilenames = selectedSongs.map(song =>
      song.src.split('/').pop()
    );
    playlists[playlistName] = selectedFilenames;
    localStorage.setItem('playlists', JSON.stringify(playlists));
    alert('Playlist saved!');
    setPlaylistName('');
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("playlist-updated"));
    }
  };

  return (
    <div>
      <h3>Create Playlist</h3>
      <div
        style={{
          position: 'sticky',
          top: '0',
          background: '#fff',
          zIndex: '10',
          padding: '10px',
          borderBottom: '2px solid #ccc',
        }}
      >
        <div className="mb-3">
          <label htmlFor="playlistName" className="form-label">Playlist Name</label>
          <input
            type="text"
            id="playlistName"
            className="form-control"
            placeholder="Enter playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
        </div>

        <button
          onClick={savePlaylist}
          className="btn btn-success w-100"
        >
          Save Playlist
        </button>
      </div>
    </div>
  );
};

export default PlaylistCreator;
