import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay, FaPause, FaDownload, FaStepForward,
  FaStepBackward, FaPlus
} from "react-icons/fa";

const AudioPlayer = ({ songsList = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(songsList);
  const [playlist, setPlaylist] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const currentList = showPlaylist ? playlist : filteredSongs;
  const currentSong = currentList.length > 0 ? currentList[currentIndex] : null;

  // Update filtered songs on search term change
  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = songsList.filter(song =>
      song.song.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term)
    );
    setFilteredSongs(filtered);
    setCurrentIndex(0);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Play/pause toggle
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Play selected song by index
  const playSongAtIndex = (index) => {
    if (index < 0 || index >= currentList.length) return;
    setCurrentIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Effect to play audio when currentIndex or isPlaying changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.pause();
    audioRef.current.load();

    // Reset currentTime state to 0 before play
    setCurrentTime(0);

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentIndex, isPlaying, currentSong]);

  // When audio time updates
  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  // When audio metadata loads
  const onLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // When audio ends - auto play next or stop
  const onEnded = () => {
    if (!currentList.length) return;

    if (currentIndex < currentList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  // Format time in mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="container my-5" style={{ maxWidth: '720px' }}>
      <h2 className="text-center mb-4 fw-bold">🎵 My Awesome Audio Player</h2>

      {/* Search */}
      <div className="input-group mb-4 shadow-sm rounded">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search by song or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          style={{ borderRadius: '0.375rem 0 0 0.375rem' }}
        />
        <button
          className="btn btn-primary btn-lg"
          onClick={handleSearch}
          style={{ borderRadius: '0 0.375rem 0.375rem 0' }}
        >
          Search
        </button>
      </div>

      {/* Songs / Playlist List */}
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

        {(showPlaylist ? playlist : filteredSongs).map((song, i) => (
          <div
            key={song.Id}
            className={`d-flex justify-content-between align-items-center p-2 mb-2 rounded cursor-pointer
              ${currentSong?.Id === song.Id ? "bg-primary text-white" : "bg-white"}`}
            onClick={() => playSongAtIndex(i)}
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
                  // Adjust currentIndex if needed
                  if (currentIndex >= playlist.length - 1) {
                    setCurrentIndex(Math.max(playlist.length - 2, 0));
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

      {/* Now Playing */}
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
            if (!currentList.length) return;
            const prevIndex = (currentIndex - 1 + currentList.length) % currentList.length;
            playSongAtIndex(prevIndex);
          }}
          className="btn btn-outline-primary btn-lg rounded-circle p-3 shadow"
          title="Previous"
        >
          <FaStepBackward size={20} />
        </button>

        <button
          onClick={togglePlayPause}
          className="btn btn-primary btn-lg rounded-circle p-4 shadow"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FaPause size={22} /> : <FaPlay size={22} />}
        </button>

        <button
          onClick={() => {
            if (!currentList.length) return;
            const nextIndex = (currentIndex + 1) % currentList.length;
            playSongAtIndex(nextIndex);
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
          max={duration > 0 ? duration : 0}
          step="0.01"
          value={currentTime}
          onChange={e => {
            if (!audioRef.current) return;
            const val = Number(e.target.value);
            audioRef.current.currentTime = val;
            setCurrentTime(val);
            if (isPlaying) {
              audioRef.current.play().catch(() => {});
            }
          }}
        />
        <small className="text-muted">{formatTime(duration)}</small>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      >
        {currentSong && <source src={currentSong.src} type="audio/mpeg" />}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
