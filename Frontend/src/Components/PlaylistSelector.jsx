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
    const existingSongs = stored[selected] || [];

    const updated = [...existingSongs, ...selectedSongs].filter(
      (song, index, self) => index === self.findIndex((s) => s.src === song.src)
    );

    stored[selected] = updated;
    localStorage.setItem("playlists", JSON.stringify(stored));
    setPlaylists({ ...stored });

    alert(`Added songs to "${selected}" playlist.`);
    window.dispatchEvent(new Event("playlist-updated"));
  };

  const createDemoPlaylist = () => {
    const demo = {
      "My Favorite Songs": [
        { title: "Demo Song 1", artist: "Demo Artist", src: "/demo/song1.mp3" },
        { title: "Demo Song 2", artist: "Demo Artist", src: "/demo/song2.mp3" },
      ],
    };
    localStorage.setItem("playlists", JSON.stringify(demo));
    loadPlaylists();
  };

  return (
    <div className="container playlist-container glass-box text-white my-5">
      <h4 className="mb-4 fw-bold text-info">
        <i className="bi bi-folder-symlink-fill me-2"></i>Manage Playlists
      </h4>

      {Object.keys(playlists).length === 0 ? (
        <>
          <p className="fst-italic">No playlists available.</p>
          <button className="btn btn-outline-light" onClick={createDemoPlaylist}>
            Create Demo Playlist
          </button>
        </>
      ) : (
        <div className="row g-3 align-items-end">
          <div className="col-md-6">
            <select
              className="form-select input-glow text-white bg-dark border-info"
              value={selected}
              onChange={handleSelect}
            >
              <option value="">-- Select Playlist --</option>
              {Object.keys(playlists).map((name) => (
                <option key={name} value={name} className="text-white">
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3 d-grid">
            <button
              className="btn btn-outline-info neon-button"
              onClick={handleOpenPlaylist}
              disabled={!selected}
            >
              <i className="bi bi-folder2-open me-1"></i> Open
            </button>
          </div>

          <div className="col-md-3 d-grid">
            <button
              className="btn btn-success neon-button"
              onClick={handleSave}
              disabled={!selected || selectedSongs.length === 0}
            >
              <i className="bi bi-save me-1"></i> Save Songs
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaylistSelector;
