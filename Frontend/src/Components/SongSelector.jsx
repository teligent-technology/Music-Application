import React, { useState } from 'react';
import { Songs } from '../data/song';

const SongSelector = ({ onSelectionChange }) => {
  const [selectedSongs, setSelectedSongs] = useState([]);

  const toggleSong = (song) => {
    setSelectedSongs(prev => {
      const exists = prev.find(s => s.src === song.src);
      let updated;
      if (exists) {
        updated = prev.filter(s => s.src !== song.src);
      } else {
        updated = [...prev, song];
      }
      onSelectionChange(updated);
      return updated;
    });
  };

  return (
    <div className="container mt-4">
      <h4>Select Songs</h4>
      <ul className="list-group">
        {Songs.map((song, index) => (
          <li 
            key={index} 
            className={`list-group-item ${selectedSongs.find(s => s.src === song.src) ? 'active' : ''}`}
            onClick={() => toggleSong(song)}
            style={{ cursor: 'pointer' }}
          >
            {song.song} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongSelector;
