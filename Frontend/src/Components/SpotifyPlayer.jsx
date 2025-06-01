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
  FaSpinner,
  FaTimes,
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
      setIsPlaying(true);
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

  const togglePlayPause = () => setIsPlaying((prev) => !prev);
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

  const dismissError = () => setError(false);

  if (!song)
    return (
      <div className="text-white p-4 text-center">
        <h4>Song not found.</h4>
        <Link to="/home" className="btn btn-primary mt-3">
          Go to Home
        </Link>
      </div>
    );

  return (
    <>
      <style>{`
        html, body, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
          font-family: 'Segoe UI', sans-serif;
        }
        .bg-cover {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-image: url('${song.img}');
          background-size: cover;
          background-position: center;
          z-index: -1;
          filter: blur(20px) brightness(0.7);
        }
        .player-overlay {
          backdrop-filter: blur(10px);
          background-color: rgba(0, 0, 0, 0.5);
          min-height: 100vh;
          color: white;
        }
        .form-range::-webkit-slider-thumb {
          background: #0d6efd;
        }
        .form-range::-moz-range-thumb {
          background: #0d6efd;
        }
        .fa-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        .error-alert {
          background: rgba(220, 53, 69, 0.95);
          padding: 8px 16px;
          border-radius: 6px;
          box-shadow: 0 0 10px #dc3545aa;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>

      <div className="bg-cover"></div>

      <div className="player-overlay d-flex flex-column justify-content-between">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3">
          <Link
            to={`/artist/${artistName}`}
            className="text-white"
            aria-label="Back"
          >
            <FaChevronDown size={24} />
          </Link>
          <span className="fw-bold fs-5 text-truncate">{song.artist}</span>
          <FaEllipsisH size={24} />
        </div>

        {/* Song Info */}
        <div className="text-center px-4 d-flex flex-column align-items-center">
          <img
            src={song.img}
            alt={song.title}
            className="img-fluid rounded shadow-lg mb-4"
            style={{ maxHeight: "300px", width: "auto", objectFit: "cover", boxShadow: "0 0 20px #0d6efd88" }}
          />
          <h4 className="fw-bold mb-1">{song.title}</h4>
          <p className="text-secondary">{song.artist}</p>
          <audio
            ref={audioRef}
            src={song.audioUrl || song.audio || song.url || song.src || ""}
            preload="metadata"
          />
        </div>

        {/* Controls */}
        <div className="px-4 pb-4">
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleSeek}
            className="form-range"
          />
          <div className="d-flex justify-content-between text-white-50 mb-3">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="d-flex justify-content-center align-items-center gap-4">
            <FaMagic className="text-success fs-4" />
            <button
              onClick={handlePrev}
              className="btn btn-link text-white p-0 fs-4"
              disabled={filteredSongs.length < 2}
            >
              <FaBackward />
            </button>
            <button
              onClick={togglePlayPause}
              className="btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow"
              style={{ width: 64, height: 64 }}
            >
              {isLoading ? (
                <FaSpinner className="text-dark fa-spin fs-4" />
              ) : isPlaying ? (
                <FaPause className="text-dark fs-4" />
              ) : (
                <FaPlay className="text-dark fs-4 ms-1" />
              )}
            </button>
            <button
              onClick={handleNext}
              className="btn btn-link text-white p-0 fs-4"
              disabled={currentIndex >= filteredSongs.length - 1}
            >
              <FaForward />
            </button>
            <FaClock className="fs-4" />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="error-alert position-fixed bottom-0 start-50 translate-middle-x mb-5"
            role="alert"
            onClick={dismissError}
          >
            <span>⚠️ Failed to load audio. Try again later.</span>
            <FaTimes />
          </div>
        )}
      </div>
    </>
  );
};

export default SpotifyPlayer;
