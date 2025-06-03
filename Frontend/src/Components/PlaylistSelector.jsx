// src/components/PlaylistSelector.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Playlist.css";

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

    // Get existing songs in the selected playlist or default to empty
    const existingSongs = stored[selected] || [];

    // Combine and remove duplicates by `src`
    const updated = [...existingSongs, ...selectedSongs].filter(
      (song, index, self) =>
        index === self.findIndex((s) => s.src === song.src)
    );

    stored[selected] = updated;
    localStorage.setItem("playlists", JSON.stringify(stored));
    setPlaylists({ ...stored });

    alert(`Added songs to "${selected}" playlist.`);
    window.dispatchEvent(new Event("playlist-updated"));
  };

  return (
    <div className="container glass-box text-white my-5">
      <h4 className="mb-4 border-bottom pb-2">Manage Playlist</h4>

      {Object.keys(playlists).length === 0 ? (
        <p className="fst-italic">No playlists available.</p>
      ) : (
        <div className="row g-3">
          <div className="col-md-6">
            <select
              className="form-select"
              value={selected}
              onChange={handleSelect}
            >
              <option value="">-- Select Playlist --</option>
              {Object.keys(playlists).map((name, i) => (
                <option key={i} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3 d-grid">
            <button
              className="btn btn-primary"
              onClick={handleOpenPlaylist}
              disabled={!selected}
            >
              <i className="bi bi-folder2-open"></i> Open
            </button>
          </div>
          <div className="col-md-3 d-grid">
            <button
              className="btn btn-success"
              onClick={handleSave}
              disabled={!selected || selectedSongs.length === 0}
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
