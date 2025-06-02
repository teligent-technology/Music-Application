import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay, FaPause, FaDownload, FaStepForward,
  FaStepBackward, FaSlideshare, FaPlus
} from "react-icons/fa";
// import "./AudioPlayer.css"; // Custom CSS file for scrollbar styles

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

  const updateRecentSongs = (songId) => {
    const stored = JSON.parse(localStorage.getItem("recentSongs")) || [];
    const updated = [songId, ...stored.filter(id => id !== songId)].slice(0, 20);
    localStorage.setItem("recentSongs", JSON.stringify(updated));
  };

  useEffect(() => {
    if (!songsList || songsList.length === 0) return;

    const savedIds = JSON.parse(localStorage.getItem("playlistIds"));
    if (Array.isArray(savedIds)) {
      const reconstructed = savedIds
        .map(id => songsList.find(song => song.Id === id))
        .filter(Boolean);
      setPlaylist(reconstructed);
    }

    setFilteredSongs(songsList);
    setCurrentIndex(0);
    setSearchTerm('');
    setCurrentTime(0);
    setIsPlaying(false);
  }, [songsList]);

  useEffect(() => {
    const ids = playlist.map(song => song.Id);
    localStorage.setItem("playlistIds", JSON.stringify(ids));
  }, [playlist]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.src;
    audio.load();
    setCurrentTime(0);

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Auto-play failed:", error);
        setIsPlaying(false);
      });
    }
  }, [currentIndex, currentSong]);

  useEffect(() => {
    const handleKeyControls = (e) => {
      const audio = audioRef.current;
      if (!audio) return;

      switch (e.code) {
        case 'ArrowRight':
          audio.currentTime = Math.min(audio.currentTime + 5, duration);
          setCurrentTime(audio.currentTime);
          break;
        case 'ArrowLeft':
          audio.currentTime = Math.max(audio.currentTime - 5, 0);
          setCurrentTime(audio.currentTime);
          break;
        case 'ArrowUp':
          if (currentList.length) {
            const prevIndex = (currentIndex - 1 + currentList.length) % currentList.length;
            setCurrentIndex(prevIndex);
            updateRecentSongs(currentList[prevIndex].Id);
            setCurrentTime(0);
            setIsPlaying(true);
          }
          break;
        case 'ArrowDown':
          if (currentList.length) {
            const nextIndex = (currentIndex + 1) % currentList.length;
            setCurrentIndex(nextIndex);
            updateRecentSongs(currentList[nextIndex].Id);
            setCurrentTime(0);
            setIsPlaying(true);
          }
          break;
        case 'Enter':
          e.preventDefault();
          isPlaying ? audio.pause() : audio.play().then(() => setIsPlaying(true));
          setIsPlaying(!audio.paused);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyControls);
    return () => window.removeEventListener('keydown', handleKeyControls);
  }, [duration, playlist, filteredSongs, showPlaylist, currentIndex]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchClick = () => {
    const term = searchTerm.toLowerCase();
    const filtered = songsList.filter(song =>
      song.song.toLowerCase().includes(term) ||
      song.artist.toLowerCase().includes(term)
    );
    setFilteredSongs(filtered);
    setCurrentIndex(0);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchClick();
  };

  const togglePlaylist = () => setShowPlaylist(prev => !prev);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch((error) => console.error("Playback error:", error));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = Number(e.target.value);
    if (audio && !isNaN(audio.duration)) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
      if (isPlaying) {
        audio.play().catch((err) => console.error("Seek play error:", err));
      }
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio && !isNaN(audio.duration)) {
      setDuration(audio.duration);
    }
  };

  const handleEnded = () => {
    if (currentList.length === 0) return;
    if (currentIndex < currentList.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      updateRecentSongs(currentList[nextIndex].Id);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleNext = () => {
    if (currentList.length === 0) return;
    const nextIndex = (currentIndex + 1) % currentList.length;
    setCurrentIndex(nextIndex);
    updateRecentSongs(currentList[nextIndex].Id);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (currentList.length === 0) return;
    const prevIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    setCurrentIndex(prevIndex);
    updateRecentSongs(currentList[prevIndex].Id);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSongClick = (Id) => {
    const audio = audioRef.current;
    if (audio) audio.pause();
    const list = showPlaylist ? playlist : filteredSongs;
    const index = list.findIndex(song => song.Id === Id);
    if (index !== -1) {
      setCurrentIndex(index);
      setCurrentTime(0);
      setIsPlaying(true);
      updateRecentSongs(Id);
    }
  };

  const handleAddToPlaylist = (song) => {
    if (!playlist.some(s => s.Id === song.Id)) {
      setPlaylist([...playlist, song]);
    }
  };

  const handleDeleteSong = (idToDelete) => {
    const audio = audioRef.current;
    if (audio && currentSong?.Id === idToDelete) {
      audio.pause();
      setIsPlaying(false);
    }

    const updated = playlist.filter(song => song.Id !== idToDelete);
    setPlaylist(updated);

    if (currentIndex >= updated.length) {
      setCurrentIndex(updated.length - 1);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div
    className="d-flex flex-column justify-content-center align-items-center p-3"
    style={{
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(to bottom, #1e1e1e, #121212)",
      color: "white",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      transition: "all 0.4s ease-in-out",
    }}
  >
    {/* Search */}
    <div className="d-flex flex-column flex-sm-row gap-2 w-100" style={{ maxWidth: "700px" }}>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by song or artist"
        className="form-control shadow-sm"
        style={{ height: "45px", borderRadius: "10px" }}
      />
      <button
        className="btn btn-primary px-4 py-2 rounded shadow"
        style={{ transition: "all 0.3s ease" }}
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>

    {/* Song Image */}
    {currentSong?.img && (
      <div className="mt-4 text-center animate__animated animate__fadeIn">
        <img
          src={currentSong.img}
          alt={currentSong.song}
          className={`img-fluid rounded shadow-lg ${isPlaying ? "animate__pulse animate__infinite" : ""}`}
          style={{
            maxWidth: "300px",
            maxHeight: "300px",
            objectFit: "cover",
            transition: "transform 0.4s ease-in-out",
            transform: isPlaying ? "scale(1.05)" : "scale(1)",
          }}
        />
        <h5 className="mt-3 fw-bold text-glow">{currentSong.song}</h5>
        <p className="text-secondary mb-0">{currentSong.artist}</p>
      </div>
    )}

    {/* Song List / Playlist */}
    <div
      className="custom-scrollbar mt-4"
      style={{
        maxHeight: "250px",
        overflowY: "auto",
        width: "100%",
        maxWidth: "700px",
        borderRadius: "10px",
        backgroundColor: "#1a1a1a",
        padding: "15px",
      }}
    >
      {showPlaylist ? (
        <div className="text-white">
          <h5 className="mb-3">🎵 Your Playlist</h5>
          {playlist.length === 0 ? (
            <p className="text-muted">No songs in playlist.</p>
          ) : (
            playlist.map(song => (
              <div
                key={song.Id}
                className={`d-flex justify-content-between align-items-center mb-2 p-2 rounded transition-all ${
                  currentSong?.Id === song.Id ? "bg-primary text-white" : "bg-dark text-light"
                }`}
                style={{
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              >
                <span
                  onClick={() => handleSongClick(song.Id)}
                  className="flex-grow-1"
                >
                  {song.song}
                </span>
                <span
                  onClick={() => handleDeleteSong(song.Id)}
                  className="text-danger fw-bold ms-3"
                >
                  &times;
                </span>
              </div>
            ))
          )}
        </div>
      ) : (
        filteredSongs.map(song => (
          <div
            key={song.Id}
            className="d-flex align-items-center justify-content-between gap-2 rounded px-3 py-2 mb-2 bg-dark text-white shadow-sm transition-all"
            style={{ cursor: "pointer", transition: "all 0.3s ease" }}
          >
            <span
              onClick={() => handleSongClick(song.Id)}
              className={currentSong?.Id === song.Id ? "text-primary fw-bold" : ""}
              style={{ flexGrow: 1 }}
            >
              {song.song}
            </span>
            <button
              className="btn btn-sm btn-outline-primary rounded-circle"
              onClick={() => handleAddToPlaylist(song)}
              title="Add to Playlist"
            >
              <FaPlus />
            </button>
          </div>
        ))
      )}
    </div>

    {/* Playback Controls */}
    <div
      className="d-flex align-items-center gap-3 mt-4 px-3 w-100 flex-wrap justify-content-center"
      style={{ maxWidth: "700px" }}
    >
      <button
        onClick={handlePrevious}
        className="btn btn-outline-light rounded-circle shadow-sm px-3 py-2"
        title="Previous"
        style={{ transition: "all 0.3s ease" }}
      >
        <FaStepBackward />
      </button>

      <button
        onClick={handlePlayPause}
        className="btn btn-primary rounded-pill shadow px-4 py-2 d-flex align-items-center gap-2"
        title={isPlaying ? "Pause" : "Play"}
        style={{ fontWeight: "bold", fontSize: "1rem", transition: "background 0.3s ease" }}
      >
        {isPlaying ? <FaPause /> : <FaPlay />} {isPlaying ? "Pause" : "Play"}
      </button>

      <button
        onClick={handleNext}
        className="btn btn-outline-light rounded-circle shadow-sm px-3 py-2"
        title="Next"
        style={{ transition: "all 0.3s ease" }}
      >
        <FaStepForward />
      </button>

      <a
        href={currentSong?.src || "#"}
        download={currentSong?.song}
        className={`btn btn-outline-success shadow-sm px-3 py-2 rounded-pill ${
          !currentSong ? "disabled" : ""
        }`}
        title="Download Song"
      >
        <FaDownload className="me-1" /> Download
      </a>
    </div>

    {/* Seekbar */}
    <div
      className="d-flex align-items-center gap-2 w-100 mt-3 px-3"
      style={{ maxWidth: "700px" }}
    >
      <span style={{ width: "45px", textAlign: "center" }}>{formatTime(currentTime)}</span>
      <input
        type="range"
        className="form-range flex-grow-1"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        style={{ accentColor: "#1db954", height: "5px" }}
      />
      <span style={{ width: "45px", textAlign: "center" }}>{formatTime(duration)}</span>
    </div>

    {/* Audio Element */}
    <audio
      ref={audioRef}
      onTimeUpdate={handleTimeUpdate}
      onLoadedMetadata={handleLoadedMetadata}
      onEnded={handleEnded}
    />

    {/* Toggle Button */}
    <button
      className="btn btn-outline-secondary mt-4 px-4 py-2 rounded-pill"
      onClick={togglePlaylist}
    >
      {showPlaylist ? "Show All Songs" : "Show Playlist"}
    </button>
  </div>
  );
};

export default AudioPlayer;