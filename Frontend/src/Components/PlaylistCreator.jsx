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

    const filenames = selectedSongs.map((song) => song.src.split("/").pop());
    const existing = JSON.parse(localStorage.getItem("playlists") || "{}");

    existing[playlistName] = filenames;
    localStorage.setItem("playlists", JSON.stringify(existing));

    alert("Playlist saved!");
    setPlaylistName("");
    window.dispatchEvent(new Event("playlist-updated"));
  };

  return (
    <div className="container playlist-container glass-box text-white my-5">
      <h4 className="mb-3 fw-bold">
        <i className="bi bi-music-note-list me-2 text-info"></i>Create New Playlist
      </h4>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter playlist name"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      <button className="btn btn-success w-100 fw-semibold" onClick={savePlaylist}>
        <i className="bi bi-plus-circle me-2"></i> Save Playlist
      </button>
    </div>
  );
};

export default PlaylistCreator;
