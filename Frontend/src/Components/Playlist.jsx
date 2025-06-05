// src/components/Playlist.jsx
import React, { useState } from "react";
import { Songs } from "../data/song";
import { Link } from "react-router-dom";
import "./Playlist.css";

const Playlist = ({ selectedSongs, setSelectedSongs }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSongs = Songs.filter(
    (song) =>
      song.song.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (song) => {
    const isSelected = selectedSongs.some((s) => s.src === song.src);
    setSelectedSongs(
      isSelected
        ? selectedSongs.filter((s) => s.src !== song.src)
        : [...selectedSongs, song]
    );
  };

  return (
    <div className="container playlist-container neon-glow animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="glow-text">✨ Curate Your Vibe</h2>
        <Link to="/home" className="btn btn-glow">
          <i className="bi bi-house-door-fill me-1"></i> Home
        </Link>
      </div>

      <div className="input-group search-box mb-4">
        <span className="input-group-text search-icon">
          <i className="bi bi-search-heart-fill"></i>
        </span>
        <input
          type="search"
          className="form-control search-input"
          placeholder="Search your sonic universe..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="song-list">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => {
            const isChecked = selectedSongs.some((s) => s.src === song.src);
            return (
              <div
                key={index}
                className={`song-card ${isChecked ? "selected" : ""}`}
                onClick={() => toggleSelect(song)}
              >
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input me-3"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSelect(song)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="song-meta">
                    <div className="song-title">{song.song}</div>
                    <small className="song-artist">by {song.artist}</small>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center empty-msg">
            😔 No sonic matches found. Try something else!
          </p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
