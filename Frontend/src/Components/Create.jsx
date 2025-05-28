import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CreatePlaylistPage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [playlistName, setPlaylistName] = useState('');
  const [message, setMessage] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('myPlaylists')) || [];
    setPlaylists(existing);
  }, []);

  const handleCreate = () => {
    if (!playlistName.trim()) {
      setMessage('Playlist name cannot be empty');
      return;
    }

    const newPlaylist = {
      name: playlistName,
      type: selectedType,
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('myPlaylists')) || [];
    const updated = [...existing, newPlaylist];

    localStorage.setItem('myPlaylists', JSON.stringify(updated));
    setPlaylists(updated);

    setMessage(`${selectedType} "${playlistName}" created!`);
    setPlaylistName('');
    setSelectedType(null);

    setTimeout(() => setMessage(''), 3000);
  };

  const toggleSongs = (playlistName) => {
    setExpandedPlaylist(prev => (prev === playlistName ? null : playlistName));
  };

  const getSongs = (playlistName) => {
    return JSON.parse(localStorage.getItem(`playlistSongs_${playlistName}`)) || [];
  };

  return (
    <div className="bg-black text-white position-relative min-vh-100" style={{ paddingBottom: '120px' }}>
      <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
        <img
          src="your-hero-image.jpg"
          alt="Hero"
          className="w-100 h-100 object-fit-cover"
          style={{ filter: 'blur(5px) brightness(50%)' }}
        />
      </div>

      <div className="position-relative z-1 p-4 pt-5">
        <div className="d-flex align-items-center text-secondary mb-2">
          <i className="fab fa-spotify text-white me-2" />
          <span className="fw-semibold small">Premium</span>
        </div>
        <h1 className="fw-bold fs-3 mb-3">
          Listen without limits. Try 4 months of Premium Individual for free.
        </h1>
        <div className="bg-secondary bg-opacity-25 text-white px-3 py-2 rounded d-inline-flex align-items-center mb-2 fw-semibold small">
          <i className="fas fa-bell text-primary me-2" />
          Limited time offer
        </div>
        <p className="text-muted small">You can’t upgrade to Premium in the app. We know, it's not ideal.</p>
      </div>

      {/* Playlist Creation Section */}
      <div
        className="position-fixed start-0 end-0 bg-dark text-white rounded-top px-4 py-4"
        style={{ bottom: '70px', margin: '0 20px', zIndex: 20 }}
      >
        {message && (
          <div className="alert alert-success py-2 px-3 small" role="alert">
            {message}
          </div>
        )}

        {[{
          icon: 'fas fa-music',
          title: 'Playlist',
          desc: 'Build a playlist with songs or episodes',
          type: 'Regular Playlist'
        }, {
          icon: 'fas fa-user-friends',
          title: 'Collaborative Playlist',
          desc: 'Invite friends and create something together',
          type: 'Collaborative'
        }, {
          icon: 'fas fa-ring',
          title: 'Blend',
          desc: 'Combine tastes in a shared playlist with friends',
          type: 'Blend'
        }].map((item, index) => (
          <div key={index} className="mb-3 d-flex align-items-center" role="button" onClick={() => setSelectedType(item.type)}>
            <div className="bg-secondary p-3 rounded-circle me-3">
              <i className={`${item.icon} text-white fs-5`} />
            </div>
            <div>
              <h5 className="mb-1">{item.title}</h5>
              <p className="text-muted small mb-0">{item.desc}</p>
            </div>
          </div>
        ))}

        {selectedType && (
          <div className="mt-3">
            <input
              type="text"
              className="form-control mb-2"
              placeholder={`Enter ${selectedType} name`}
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
            <div className="d-flex gap-2">
              <button className="btn btn-success btn-sm" onClick={handleCreate}>Create</button>
              <button className="btn btn-outline-light btn-sm" onClick={() => {
                setSelectedType(null);
                setPlaylistName('');
              }}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Playlist Viewer */}
      <div className="px-4 pt-2 position-relative z-1">
        <h5 className="text-white mt-4">Your Playlists</h5>
        {playlists.map((playlist, idx) => (
          <div key={idx} className="bg-dark rounded my-2 p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{playlist.name}</strong> <span className="text-muted small">({playlist.type})</span>
              </div>
              <button className="btn btn-sm btn-outline-light" onClick={() => toggleSongs(playlist.name)}>
                {expandedPlaylist === playlist.name ? 'Hide Songs' : 'Show Songs'}
              </button>
            </div>
            {expandedPlaylist === playlist.name && (
              <ul className="mt-2 mb-0 ps-3">
                {getSongs(playlist.name).length > 0 ? (
                  getSongs(playlist.name).map((song, i) => (
                    <li key={i}>{song.name}</li>
                  ))
                ) : (
                  <li className="text-muted small">No songs added yet.</li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Footer */}
      <div className="d-md-none position-fixed bottom-0 start-0 end-0 bg-dark text-white border-top border-secondary z-3">
        <div className="d-flex justify-content-around py-2">
          <Link to="/home" className="text-white text-center text-decoration-none">
            <i className="bi bi-house-door-fill fs-4 d-block" />
            <small>Home</small>
          </Link>
          <Link to="/search" className="text-white text-center text-decoration-none">
            <i className="bi bi-search fs-4 d-block" />
            <small>Search</small>
          </Link>
          <Link to="/punjabi" className="text-white text-center text-decoration-none">
            <i className="bi bi-music-note-list fs-4 d-block" />
            <small>Library</small>
          </Link>
          <Link to="/create" className="text-white text-center text-decoration-none">
            <i className="bi bi-plus-circle-fill fs-4 d-block" />
            <small>Create</small>
          </Link>
          <Link to="/premium" className="text-white text-center text-decoration-none">
            <i className="bi bi-gem fs-4 d-block" />
            <small>Premium</small>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistPage;
