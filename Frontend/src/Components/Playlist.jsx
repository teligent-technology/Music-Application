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
    <div className="container my-4 p-3 bg-light rounded shadow-sm">

       <Link
      to="/home"
      className="btn btn-outline-light"
      style={{ fontSize: "1.1rem" }}
    >
      Go to Home
    </Link>
      <h3 className="mb-4 text-primary fw-bold">All Songs</h3>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search songs"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control mb-3"
        aria-label="Search songs"
      />

      {/* Scrollable container for song list */}
      <div
        className="border rounded bg-white"
        style={{ maxHeight: "300px", overflowY: "auto", padding: "15px" }}
        aria-live="polite"
      >
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => {
            const isChecked = selectedSongs.some((s) => s.src === song.src);
            return (
              <div
                key={index}
                className="form-check mb-2"
                style={{ cursor: "pointer" }}
                onClick={() => toggleSelect(song)}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleSelect(song)}
                  id={`songCheck${index}`}
                  aria-checked={isChecked}
                />
                <label className="form-check-label" htmlFor={`songCheck${index}`}>
                  {song.song} - <em>{song.artist}</em>
                </label>
              </div>
            );
          })
        ) : (
          <p className="text-muted fst-italic">No songs found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
