import React, { useState } from "react";
import PlaylistSelector from "./PlaylistSelector";
import PlaylistCreator from "./PlaylistCreator";
import Playlist from "./Playlist";

const PlaylistManager = () => {
  const [selectedSongs, setSelectedSongs] = useState([]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage:
          'url("https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1470&q=80")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "2rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <Playlist selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs} />
        <PlaylistCreator selectedSongs={selectedSongs} />
        <PlaylistSelector selectedSongs={selectedSongs} />
      </div>
    </div>
  );
};

export default PlaylistManager;
