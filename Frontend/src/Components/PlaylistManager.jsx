import React, { useState } from 'react';
import PlaylistSelector from './PlaylistSelector';
import Playlist from './Playlist'; // Yeh component checkbox based selection hai

const PlaylistManager = () => {
  const [selectedSongs, setSelectedSongs] = useState([]);

  return (
    <div>
      <Playlist selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs} />
      <PlaylistSelector selectedSongs={selectedSongs} />
    </div>
  );
};

export default PlaylistManager;
