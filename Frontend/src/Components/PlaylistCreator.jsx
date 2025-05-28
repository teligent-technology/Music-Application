import React, { useState, useRef } from "react";

const PlaylistCreator = ({ selectedSongs }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const savePlaylist = () => {
    setError("");

    if (!playlistName.trim()) {
      setError("Playlist name is required.");
      inputRef.current?.focus();
      return;
    }

    if (!selectedSongs || selectedSongs.length === 0) {
      setError("No songs selected to add.");
      return;
    }

    const playlists = JSON.parse(localStorage.getItem("playlists") || "{}");

    if (playlists[playlistName]) {
      const confirmOverwrite = window.confirm(
        `Playlist "${playlistName}" already exists. Overwrite?`
      );
      if (!confirmOverwrite) {
        inputRef.current?.focus();
        return;
      }
    }

    const selectedFilenames = selectedSongs.map((song) =>
      song.src.split("/").pop()
    );

    playlists[playlistName] = selectedFilenames;
    localStorage.setItem("playlists", JSON.stringify(playlists));
    alert(`Playlist "${playlistName}" saved!`);
    setPlaylistName("");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("playlist-updated"));
    }
    inputRef.current?.focus();
  };

  const isSaveDisabled =
    !playlistName.trim() || !selectedSongs || selectedSongs.length === 0;

  return (
    <div className="bg-dark text-white rounded shadow-lg p-4 my-4 mx-auto" style={{ maxWidth: 500 }}>
      <h3
        className="mb-4 border-bottom pb-2 fw-bold"
        style={{ borderColor: "#444" }}
      >
        Create Playlist
      </h3>

      <div
        style={{
          position: "sticky",
          top: 0,
          background: "#121212",
          zIndex: 20,
          padding: "1rem 0",
          borderBottom: "1px solid #333",
          marginBottom: "1.5rem",
        }}
      >
        <label htmlFor="playlistName" className="form-label fw-semibold mb-2">
          Playlist Name
        </label>
        <input
          type="text"
          id="playlistName"
          className={`form-control bg-dark text-white border ${
            error ? "border-danger is-invalid" : "border-secondary"
          }`}
          placeholder="Enter playlist name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          ref={inputRef}
          aria-describedby="playlistNameHelp"
          style={{ boxShadow: "none" }}
          autoComplete="off"
        />
        {error && (
          <div className="invalid-feedback" id="playlistNameHelp">
            {error}
          </div>
        )}
      </div>

      <button
        onClick={savePlaylist}
        className="btn btn-success w-100 fw-bold d-flex align-items-center justify-content-center gap-2"
        disabled={isSaveDisabled}
        aria-disabled={isSaveDisabled}
        title={
          isSaveDisabled
            ? "Enter a playlist name and select songs to enable"
            : "Save playlist"
        }
        style={{ fontSize: "1.15rem", padding: "0.6rem" }}
      >
        <i className="bi bi-check-circle-fill"></i> Save Playlist
      </button>
    </div>
  );
};

export default PlaylistCreator;
