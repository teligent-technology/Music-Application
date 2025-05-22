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
  FaShareAlt,
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
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom border-secondary">
        <Link to={`/artist/${artistName}`} className="text-white text-decoration-none">
          <FaChevronDown size={20} />
        </Link>
        <span className="fw-bold">{song.artist}</span>
        <FaEllipsisH size={20} />
      </div>

      {/* Cover Art */}
      <div className="px-3 text-center mt-4">
        <img
          src={song.img}
          alt={song.title}
          className="img-fluid rounded shadow"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />
      </div>

      {/* Song Info */}
      <div className="px-3 mt-3 text-center">
        <h5 className="fw-bold mb-1">{song.title}</h5>
        <p className="text-light small">{song.artist}</p>
      </div>

      {/* Audio */}
      <audio
        ref={audioRef}
        src={song.audioUrl || song.audio || song.url || song.src || ""}
        preload="metadata"
      />

      {/* Progress Bar */}
      <div className="px-4 mt-3">
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleSeek}
          className="form-range"
          style={{ accentColor: "#fff" }}
        />
        <div className="d-flex justify-content-between small text-white-50">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 d-flex justify-content-center align-items-center gap-4 fs-3">
        <FaMagic className="text-success" />
        <button
          onClick={handlePrev}
          className="btn btn-link text-white"
          disabled={filteredSongs.length < 2}
        >
          <FaBackward />
        </button>
        <button
          onClick={togglePlayPause}
          className="btn btn-light rounded-circle"
          style={{ width: 64, height: 64 }}
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
          className="btn btn-link text-white"
          disabled={currentIndex >= filteredSongs.length - 1}
        >
          <FaForward />
        </button>
        <FaClock />
      </div>

      {/* Bottom Controls */}
      <div className="mt-4 mb-3 d-flex justify-content-around fs-4">
        <FaTv />
        <FaShareAlt />
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-danger text-center mt-2 small">
          ⚠️ Failed to load audio. Try again later.
        </div>
      )}
    </div>
  );
};

export default SpotifyPlayer;
