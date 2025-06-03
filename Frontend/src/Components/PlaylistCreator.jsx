import React, { useState } from "react";
import "./Playlist.css";

const PlaylistCreator = ({ selectedSongs = [] }) => {
  const [playlistName, setPlaylistName] = useState("");

  const savePlaylist = () => {
    if (!playlistName.trim() || selectedSongs.length === 0) {
      alert("Please enter a name and select at least one song.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("playlists") || "{}");
    existing[playlistName.trim()] = selectedSongs;
    localStorage.setItem("playlists", JSON.stringify(existing));

    alert("Playlist saved!");
    setPlaylistName("");
    window.dispatchEvent(new Event("playlist-updated"));
  };

  return (
    <div className="container playlist-creator glass-box text-white my-5 p-4 rounded">
      <h4 className="mb-4 fw-bold playlist-creator-title">
        <i className="bi bi-music-note-list me-2 text-info"></i>Create New Playlist
      </h4>
      <input
        type="text"
        className="form-control playlist-input mb-4"
        placeholder="Enter playlist name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        aria-label="Playlist name input"
      />
      <button
        className="btn btn-gradient w-100 fw-semibold playlist-save-btn"
        onClick={savePlaylist}
        aria-label="Save playlist button"
      >
        <i className="bi bi-plus-circle me-2"></i> Save Playlist
      </button>
    </div>
  );
};

export default PlaylistCreator;
