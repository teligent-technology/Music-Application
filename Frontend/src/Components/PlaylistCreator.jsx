// src/components/PlaylistCreator.jsx
import React, { useState } from "react";
import "./Playlist.css";

const PlaylistCreator = ({ selectedSongs = [] }) => {
  const [playlistName, setPlaylistName] = useState("");

  const savePlaylist = () => {
    if (!playlistName.trim() || selectedSongs.length === 0) {
      alert("🎧 Please enter a playlist name and select songs.");
      return;
    }

    const playlists = JSON.parse(localStorage.getItem("playlists") || "{}");
    playlists[playlistName] = selectedSongs;
    localStorage.setItem("playlists", JSON.stringify(playlists));

    alert("✅ Playlist saved successfully!");
    setPlaylistName("");
    window.dispatchEvent(new Event("playlist-updated"));
  };

  return (
    <div className="container playlist-container glassy-box glow-shadow text-white p-4 my-5 animate-fade-in">
      <h3 className="mb-4 fancy-heading text-center">
        <i className="bi bi-stars me-2 text-warning"></i>
        Craft Your Sonic Journey
      </h3>

      <input
        type="text"
        className="form-control form-control-lg mb-4 input-glow text-white"
        placeholder="🎵 Name your playlist..."
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />

      <button className="btn btn-glow-pulse w-100 fw-bold" onClick={savePlaylist}>
        <i className="bi bi-rocket-takeoff me-2"></i>Save My Playlist
      </button>

      <p className="text-center mt-4 small text-muted">
        <i className="bi bi-info-circle me-1"></i>
        Selected songs: <strong>{selectedSongs.length}</strong>
      </p>
    </div>
  );
};

export default PlaylistCreator;
