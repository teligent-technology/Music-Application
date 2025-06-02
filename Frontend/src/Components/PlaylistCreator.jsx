// src/components/PlaylistCreator.jsx
import React, { useState } from "react";
import "./Playlist.css";

const PlaylistCreator = ({ selectedSongs = [] }) => {
  const [playlistName, setPlaylistName] = useState("");

  const savePlaylist = () => {
    if (!playlistName || selectedSongs.length === 0) {
      alert("Please enter a name and select at least one song.");
      return;
    }

    const filenames = selectedSongs.map(song => song.src.split("/").pop());

    const existing = JSON.parse(localStorage.getItem("playlists") || "{}");
    existing[playlistName] = filenames;
    localStorage.setItem("playlists", JSON.stringify(existing));

    alert("Playlist saved!");
    setPlaylistName("");

    // Notify PlaylistSelector to refresh
    window.dispatchEvent(new Event("playlist-updated"));
  };

  return (
    <div className="playlist-container animate-fade-in text-white mb-5"
      style={{
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(10px)",
        maxWidth: 600,
        margin: "2rem auto",
        padding: "2rem",
        borderRadius: "1rem",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      }}
    >
      <h4 className="mb-3 fw-bold text-white">Create a New Playlist</h4>
      <input
        type="text"
        className="form-control mb-3 bg-dark text-white border-0"
        placeholder="Enter playlist name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button
        className="btn btn-success w-100 fw-semibold"
        onClick={savePlaylist}
      >
        <i className="bi bi-plus-circle me-2"></i>Save Playlist
      </button>
    </div>
  );
};

export default PlaylistCreator;
