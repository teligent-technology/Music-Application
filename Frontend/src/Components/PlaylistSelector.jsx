// src/components/PlaylistSelector.jsx
import React, { useEffect, useState } from "react";
import "./Playlist.css";

const PlaylistSelector = ({ onSelect }) => {
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    const update = () => {
      const data = JSON.parse(localStorage.getItem("playlists") || "{}");
      setPlaylists(data);
    };

    update();
    window.addEventListener("playlist-updated", update);
    return () => window.removeEventListener("playlist-updated", update);
  }, []);

  return (
    <div className="playlist-selector-glass p-3 mb-4">
      <h5 className="text-white">Your Playlists</h5>
      <select
        className="form-select playlist-dropdown mt-2"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select Playlist</option>
        {Object.keys(playlists).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlaylistSelector;
