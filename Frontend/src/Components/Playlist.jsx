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
    <div className="container playlist-container glass-box text-white my-5 p-4 rounded animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="playlist-title">All Songs</h3>
        <Link to="/home" className="btn btn-outline-info btn-sm">
          <i className="bi bi-house-door-fill me-1"></i> Home
        </Link>
      </div>

      <div className="input-group mb-4 playlist-search">
        <span className="input-group-text bg-info text-white">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="search"
          className="form-control playlist-search-input"
          placeholder="Search songs or artists"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search songs or artists"
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
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleSelect(song);
                }}
                role="button"
                aria-pressed={isChecked}
              >
                <div className="form-check d-flex align-items-center">
                  <input
                    className="form-check-input me-3"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSelect(song)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Select song ${song.song} by ${song.artist}`}
                  />
                  <div>
                    <div className="fw-bold song-title">{song.song}</div>
                    <small className="text-info song-artist"> — {song.artist}</small>
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
