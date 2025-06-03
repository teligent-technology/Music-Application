// src/components/Playlist.jsx
import React, { useState } from "react";
import { Songs } from "../data/song";
import { Link } from "react-router-dom";
import "./Playlist.css";

const Playlist = ({ selectedSongs, setSelectedSongs }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!Array.isArray(selectedSongs)) {
    return <p className="text-danger">Error: selectedSongs must be an array</p>;
  }

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
    <div className="playlist-container animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary fw-bold">All Songs</h3>
        <Link to="/home" className="btn btn-outline-light playlist-btn">
          <i className="bi bi-house-door-fill me-1"></i> Home
        </Link>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text bg-primary text-white">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="search"
          className="form-control"
          placeholder="Search songs or artists"
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
                  <div className="song-card-content">
                    <span className="song-title">{song.song}</span>
                    <span className="song-artist"> — {song.artist}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted text-center fst-italic mt-4">
            No songs found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
