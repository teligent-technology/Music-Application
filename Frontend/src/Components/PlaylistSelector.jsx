// src/components/PlaylistSelector.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaylistSelector.css";

const PlaylistSelector = ({ selectedSongs = [] }) => {
  const [playlists, setPlaylists] = useState({});
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadPlaylists();
    window.addEventListener("playlist-updated", loadPlaylists);
    return () => window.removeEventListener("playlist-updated", loadPlaylists);
  }, []);

  const loadPlaylists = () => {
    const stored = JSON.parse(localStorage.getItem("playlists") || "{}");
    setPlaylists(stored);
  };

  const handleSelect = (e) => setSelected(e.target.value);

  const handleOpenPlaylist = () => {
    if (!selected) return alert("Please select a playlist!");
    navigate(`/playlist/${encodeURIComponent(selected)}`);
  };

  const handleSave = () => {
    if (!selected) return alert("Select a playlist to save into!");
    if (!Array.isArray(selectedSongs) || selectedSongs.length === 0)
      return alert("No songs selected!");

    const stored = JSON.parse(localStorage.getItem("playlists") || "{}");
    const existingSongs = stored[selected] || [];
    const newSongs = selectedSongs.map((s) => s.src.split("/").pop());

    const updated = [...new Set([...existingSongs, ...newSongs])];
    stored[selected] = updated;
    localStorage.setItem("playlists", JSON.stringify(stored));

    setPlaylists({ ...stored });
    alert(`Added songs to "${selected}" playlist.`);
    window.dispatchEvent(new Event("playlist-updated"));
  };

  const playlistNames = Object.keys(playlists);

  return (
    <div className="playlist-selector-glass container my-5 p-4 text-white rounded shadow-lg">
      <h4 className="mb-4 fw-bold border-bottom pb-2">Select Playlist to View</h4>

      {playlistNames.length === 0 ? (
        <p className="text-light fst-italic">No playlists yet.</p>
      ) : (
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <select
              value={selected}
              onChange={handleSelect}
              className="form-select playlist-dropdown"
            >
              <option value="">-- Select Playlist --</option>
              {playlistNames.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-3 d-grid">
            <button
              className="btn btn-primary"
              onClick={handleOpenPlaylist}
              disabled={!selected}
            >
              <i className="bi bi-folder2-open"></i> Open
            </button>
          </div>

          <div className="col-6 col-md-3 d-grid">
            <button
              className="btn btn-success"
              onClick={handleSave}
              disabled={!selected || !selectedSongs.length}
            >
              <i className="bi bi-save"></i> Save Songs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistSelector;
