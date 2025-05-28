import React, { useState } from "react";
import { Songs } from "../data/song";
import { Link } from "react-router-dom";

const Playlist = ({ selectedSongs, setSelectedSongs }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!Array.isArray(selectedSongs)) {
    return <p className="text-danger">Error: Playlist component expects selectedSongs prop.</p>;
  }

  // Filter songs based on search query
  const filteredSongs = Songs.filter(
    (song) =>
      song.song.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (song) => {
    const isSelected = selectedSongs.some((s) => s.src === song.src);

    if (isSelected) {
      setSelectedSongs(selectedSongs.filter((s) => s.src !== song.src));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  return (
    <div className="container my-5 p-4 bg-white rounded shadow-lg">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary fw-bold">All Songs</h3>
        <Link
          to="/home"
          className="btn btn-outline-primary fw-semibold"
          style={{ fontSize: "1.1rem" }}
          aria-label="Go to Home"
        >
          Home
        </Link>
      </div>

      {/* Search Input with icon */}
      <div className="input-group mb-4">
        <span className="input-group-text bg-primary text-white">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="search"
          placeholder="Search songs or artists"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control"
          aria-label="Search songs or artists"
        />
      </div>

      {/* Scrollable container for song list */}
      <div
        className="border rounded bg-light"
        style={{ maxHeight: "320px", overflowY: "auto", padding: "10px" }}
        aria-live="polite"
      >
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => {
            const isChecked = selectedSongs.some((s) => s.src === song.src);
            return (
              <div
                key={index}
                className={`form-check d-flex align-items-center justify-content-between p-2 mb-2 rounded cursor-pointer ${
                  isChecked ? "bg-primary bg-opacity-10" : "hover-bg-light"
                }`}
                onClick={() => toggleSelect(song)}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleSelect(song);
                }}
                style={{ userSelect: "none", cursor: "pointer" }}
              >
                <div>
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSelect(song)}
                    id={`songCheck${index}`}
                    aria-labelledby={`songLabel${index}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <label
                    className="form-check-label fw-semibold"
                    htmlFor={`songCheck${index}`}
                    id={`songLabel${index}`}
                    style={{ cursor: "pointer" }}
                  >
                    {song.song} <small className="text-muted">- {song.artist}</small>
                  </label>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-muted fst-italic text-center my-4">No songs found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
