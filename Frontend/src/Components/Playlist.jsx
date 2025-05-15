import React, { useState } from "react";
import { Songs } from "../data/song";

const Playlist = ({ selectedSongs, setSelectedSongs }) => {
  const [searchQuery, setSearchQuery] = useState("");

  if (!Array.isArray(selectedSongs)) {
    return <p>Error: Playlist component expects selectedSongs prop.</p>;
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
    <div>
      <h3>All Songs</h3>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search songs"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />

      {/* Scrollable container for song list */}
      <div
        style={{
          maxHeight: "300px", // Set max height for scrollable area
          overflowY: "auto", // Enable vertical scrolling
          border: "1px solid #ccc", // Optional: to add a border around the list
          padding: "10px",
          backgroundColor: "#f9f9f9", // Optional: background color for the list area
          borderRadius: "5px", // Optional: rounded corners
        }}
      >
        {/* List filtered songs */}
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                type="checkbox"
checked={selectedSongs.some((s) => s.src === song.src)}
                onChange={() => toggleSelect(song)}
              />
              {song.song} - {song.artist}
            </div>
          ))
        ) : (
          <p>No songs found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
