import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Songs } from "../data/song";
import {
  FaChevronDown,
  FaEllipsisH,
  FaMagic,
  FaBackward,
  FaPlay,
  FaPause,
  FaForward,
  FaClock,
  FaTv,
  FaSpinner,
} from "react-icons/fa";

const SpotifyPlayer = () => {
  const { songId, artistName } = useParams();
  const navigate = useNavigate();

  const filteredSongs = Songs.filter((s) =>
    s.artist.toLowerCase().includes(artistName.toLowerCase())
  );

  const currentIndex = filteredSongs.findIndex((s) => s.Id.toString() === songId);
  const song = filteredSongs[currentIndex];

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!song) return;

    setIsPlaying(false);
    setProgress(0);
    setIsLoading(true);
    setError(false);

    const audio = audioRef.current;
    audio.load();

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleError = () => {
      setError(true);
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError);

    // Save to recent songs in localStorage
    const stored = JSON.parse(localStorage.getItem("recentSongs")) || [];
    const filtered = stored.filter((id) => id !== song.Id);
    const updated = [song.Id, ...filtered].slice(0, 20);
    localStorage.setItem("recentSongs", JSON.stringify(updated));

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
    };
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setProgress(audio.currentTime);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setProgress(time);
  };

  const handlePrev = () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = filteredSongs.length - 1;
    const prevSong = filteredSongs[prevIndex];
    navigate(`/player/${artistName}/${prevSong.Id}`);
  };

  const handleNext = () => {
    if (currentIndex < filteredSongs.length - 1) {
      const nextSong = filteredSongs[currentIndex + 1];
      navigate(`/player/${artistName}/${nextSong.Id}`);
    }
  };

  const formatTime = (sec) => {
    if (isNaN(sec)) return "0:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!song) return <div className="text-white p-4">Song not found.</div>;

  return (
    <div
      className="bg-dark text-white d-flex flex-column"
      style={{ minHeight: "100vh", position: "relative" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom border-secondary">
        <Link to={`/artist/${artistName}`} className="text-white text-decoration-none">
          <FaChevronDown size={20} />
        </Link>
        <span className="fw-bold">{song.artist}</span>
        <FaEllipsisH size={20} />
      </div>

      {/* Main content scrollable area */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "1rem 1rem 120px 1rem", // bottom padding for fixed controls
          textAlign: "center",
        }}
      >
        {/* Cover Art */}
        <img
          src={song.img}
          alt={song.title}
          className="img-fluid rounded shadow mb-3"
          style={{ maxHeight: "300px", objectFit: "cover", margin: "0 auto" }}
        />

        {/* Song Info */}
        <h5 className="fw-bold mb-1">{song.title}</h5>
        <p className="text-light small">{song.artist}</p>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          src={song.audioUrl || song.audio || song.url || song.src || ""}
          preload="metadata"
        />
      </div>

      {/* Controls - Fixed at bottom */}
      <div
        style={{
          position: "fixed",
          bottom: 40,
          left: 0,
          right: 0,
          backgroundColor: "#121212",
          borderTop: "1px solid #333",
          padding: "0.75rem 1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1.5rem",
          zIndex: 9999,
        }}
      >
        <FaMagic className="text-success" />
        <button
          onClick={handlePrev}
          className="btn btn-link text-white p-0"
          disabled={filteredSongs.length < 2}
          style={{ fontSize: "1.5rem" }}
        >
          <FaBackward />
        </button>
        <button
          onClick={togglePlayPause}
          className="btn btn-light rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: 56, height: 56 }}
        >
          {isLoading ? (
            <FaSpinner className="text-dark fa-spin" />
          ) : isPlaying ? (
            <FaPause className="text-dark" />
          ) : (
            <FaPlay className="text-dark" />
          )}
        </button>
        <button
          onClick={handleNext}
          className="btn btn-link text-white p-0"
          disabled={currentIndex >= filteredSongs.length - 1}
          style={{ fontSize: "1.5rem" }}
        >
          <FaForward />
        </button>
        <FaClock />
      </div>

      {/* Removed Bottom Controls (share & save) */}

      {/* Seekbar moved below the fixed controls */}
      {/* Seekbar moved above the fixed controls */}
<div
  style={{
    position: "fixed",
    bottom: 80, // 80px upar kiya from bottom (jo buttons se thoda upar ho)
    left: 0,
    right: 0,
    backgroundColor: "#121212",
    borderTop: "1px solid #333",
    padding: "0.5rem 1rem",
    zIndex: 9998,
  }}
>
  <input
    type="range"
    min="0"
    max={duration}
    value={progress}
    onChange={handleSeek}
    className="form-range"
    style={{ accentColor: "#fff", marginBottom: 0 }}
  />
  <div className="d-flex justify-content-between small text-white-50">
    <span>{formatTime(progress)}</span>
    <span>{formatTime(duration)}</span>
  </div>
</div>


      {/* Error Message */}
      {error && (
        <div className="text-danger text-center mt-2 small" style={{ marginBottom: "140px" }}>
          ⚠️ Failed to load audio. Try again later.
        </div>
      )}
    </div>
  );
};

export default SpotifyPlayer;
