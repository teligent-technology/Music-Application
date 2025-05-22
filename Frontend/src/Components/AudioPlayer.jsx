import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay, FaPause, FaDownload, FaStepForward,
  FaStepBackward, FaPlus
} from "react-icons/fa";

const AudioPlayer = ({ songsList = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [filteredSongs, setFilteredSongs] = useState(songsList);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  const audioRef = useRef(null);

  const currentList = showPlaylist ? playlist : filteredSongs;
  const currentSong = currentList.length > 0 ? currentList[currentIndex] : null;

  // ... (same logic as before for localStorage, useEffect, handlers, etc.)

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="container my-5" style={{ maxWidth: '720px' }}>
      {/* Title */}
      <h2 className="text-center mb-4 fw-bold" style={{ letterSpacing: '1.5px' }}>
        🎵 My Awesome Audio Player
      </h2>

      {/* Search Section */}
      <div className="input-group mb-4 shadow-sm rounded">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search by song or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearchClick(); }}
          style={{ borderRadius: '0.375rem 0 0 0.375rem' }}
        />
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            const term = searchTerm.toLowerCase();
            const filtered = songsList.filter(song =>
              song.song.toLowerCase().includes(term) ||
              song.artist.toLowerCase().includes(term)
            );
            setFilteredSongs(filtered);
            setCurrentIndex(0);
            setCurrentTime(0);
            setIsPlaying(false);
          }}
          style={{ borderRadius: '0 0.375rem 0.375rem 0' }}
        >
          Search
        </button>
      </div>

      {/* Song List or Playlist */}
      <div className="mb-4 border rounded shadow-sm p-3" style={{ maxHeight: "300px", overflowY: "auto", backgroundColor: '#f8f9fa' }}>
        <h5 className="mb-3">
          {showPlaylist ? `Playlist (${playlist.length})` : `Songs (${filteredSongs.length})`}
          <button
            className="btn btn-sm btn-outline-secondary ms-3"
            onClick={() => setShowPlaylist(!showPlaylist)}
            title={showPlaylist ? "Show All Songs" : "Show Playlist"}
          >
            {showPlaylist ? "All Songs" : "Playlist"}
          </button>
        </h5>

        {showPlaylist && playlist.length === 0 && (
          <p className="text-muted fst-italic">No songs in playlist yet.</p>
        )}

        {(showPlaylist ? playlist : filteredSongs).map(song => (
          <div
            key={song.Id}
            className={`d-flex justify-content-between align-items-center p-2 mb-2 rounded cursor-pointer
              ${currentSong?.Id === song.Id ? "bg-primary text-white" : "bg-white"}
              `}
            onClick={() => {
              setCurrentIndex(
                (showPlaylist ? playlist : filteredSongs).findIndex(s => s.Id === song.Id)
              );
              setIsPlaying(true);
              setCurrentTime(0);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div>
              <strong>{song.song}</strong><br />
              <small className="text-muted">{song.artist}</small>
            </div>
            {!showPlaylist && (
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={e => {
                  e.stopPropagation();
                  if (!playlist.some(s => s.Id === song.Id)) {
                    setPlaylist([...playlist, song]);
                  }
                }}
                title="Add to Playlist"
              >
                <FaPlus />
              </button>
            )}
            {showPlaylist && (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={e => {
                  e.stopPropagation();
                  if (audioRef.current && currentSong?.Id === song.Id) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  }
                  setPlaylist(playlist.filter(s => s.Id !== song.Id));
                  if (currentIndex >= playlist.length - 1) {
                    setCurrentIndex(playlist.length - 2 >= 0 ? playlist.length - 2 : 0);
                    setCurrentTime(0);
                    setIsPlaying(false);
                  }
                }}
                title="Remove from Playlist"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Now Playing Info */}
      {currentSong && (
        <div className="text-center mb-3">
          <h4 className="mb-1">{currentSong.song}</h4>
          <p className="text-muted mb-0">{currentSong.artist}</p>
          {currentSong.img && (
            <img
              src={currentSong.img}
              alt={currentSong.song}
              className="rounded shadow"
              style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
            />
          )}
        </div>
      )}

      {/* Controls */}
      <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
        <button
          onClick={() => {
            if (currentList.length === 0) return;
            const prevIndex = (currentIndex - 1 + currentList.length) % currentList.length;
            setCurrentIndex(prevIndex);
            setCurrentTime(0);
            setIsPlaying(true);
          }}
          className="btn btn-outline-primary btn-lg rounded-circle p-3 shadow"
          title="Previous"
        >
          <FaStepBackward size={20} />
        </button>

        <button
          onClick={() => {
            if (!audioRef.current) return;
            if (audioRef.current.paused) {
              audioRef.current.play().then(() => setIsPlaying(true));
            } else {
              audioRef.current.pause();
              setIsPlaying(false);
            }
          }}
          className="btn btn-primary btn-lg rounded-circle p-4 shadow"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
        </button>

        <button
          onClick={() => {
            if (currentList.length === 0) return;
            const nextIndex = (currentIndex + 1) % currentList.length;
            setCurrentIndex(nextIndex);
            setCurrentTime(0);
            setIsPlaying(true);
          }}
          className="btn btn-outline-primary btn-lg rounded-circle p-3 shadow"
          title="Next"
        >
          <FaStepForward size={20} />
        </button>

        <a
          href={currentSong?.src || "#"}
          download={currentSong?.song}
          className={`btn btn-success btn-lg rounded-circle p-3 shadow ${!currentSong ? "disabled" : ""}`}
          title="Download"
        >
          <FaDownload size={18} />
        </a>
      </div>

      {/* Seekbar */}
      <div className="d-flex align-items-center gap-3">
        <small className="text-muted">{formatTime(currentTime)}</small>
        <input
          type="range"
          className="form-range flex-grow-1"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={e => {
            if (!audioRef.current) return;
            audioRef.current.currentTime = Number(e.target.value);
            setCurrentTime(Number(e.target.value));
            if (isPlaying) audioRef.current.play().catch(() => {});
          }}
        />
        <small className="text-muted">{formatTime(duration)}</small>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
        onEnded={() => {
          if (currentList.length === 0) return;
          if (currentIndex < currentList.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setIsPlaying(true);
            setCurrentTime(0);
          } else {
            setIsPlaying(false);
            setCurrentTime(0);
          }
        }}
      />
    </div>
  );
};

export default AudioPlayer;
