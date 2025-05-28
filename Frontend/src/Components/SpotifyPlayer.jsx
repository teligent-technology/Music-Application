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

    // Save recent songs in localStorage
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
          background: linear-gradient(135deg, #1c1c1c, #121212);
          color: white !important;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        a {
          color: white;
          transition: color 0.3s ease;
        }
        a:hover, a:focus {
          color: #0d6efd; /* bootstrap primary blue */
          text-decoration: underline;
        }
        button.btn.btn-light.rounded-circle {
          color: black !important;
          transition: transform 0.2s ease;
        }
        button.btn.btn-light.rounded-circle:hover {
          transform: scale(1.1);
          box-shadow: 0 0 10px #0d6efd88;
        }
        /* Progress bar */
        input[type="range"].form-range {
          -webkit-appearance: none;
          width: 100%;
          height: 10px;
          border-radius: 5px;
          background: #333;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        input[type="range"].form-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0d6efd;
          cursor: pointer;
          box-shadow: 0 0 8px #0d6efdcc;
          transition: background 0.3s ease;
          margin-top: -5px;
        }
        input[type="range"].form-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0d6efd;
          cursor: pointer;
          box-shadow: 0 0 8px #0d6efdcc;
          transition: background 0.3s ease;
        }
        input[type="range"].form-range:hover {
          background: #444;
        }
        input[type="range"].form-range:active::-webkit-slider-thumb {
          background: #0b5ed7;
          box-shadow: 0 0 12px #0b5ed7dd;
        }
        /* Spinner Animation */
        .fa-spin {
          animation: fa-spin 1s infinite linear;
        }
        @keyframes fa-spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        /* Fade in song info */
        .fade-in {
          animation: fadeIn 0.7s ease forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to {opacity: 1;}
        }
        /* Error Alert */
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

      <div className="bg-dark text-white d-flex flex-column" style={{ minHeight: "100vh" }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom border-secondary">
          <Link
            to={`/artist/${artistName}`}
            className="text-white text-decoration-none"
            aria-label="Back to artist"
          >
            <FaChevronDown size={24} />
          </Link>
          <span className="fw-bold fs-5 text-truncate" title={song.artist}>
            {song.artist}
          </span>
          <FaEllipsisH size={24} className="cursor-pointer" />
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 overflow-auto px-4 py-4 pb-5 text-center d-flex flex-column align-items-center justify-content-center fade-in">
          <img
            src={song.img}
            alt={song.title}
            className="img-fluid rounded shadow-lg mb-4"
            style={{ maxHeight: 320, objectFit: "cover", boxShadow: "0 0 20px #0d6efd88" }}
          />
          <h4 className="fw-bold mb-1 text-break">{song.title}</h4>
          <p className="text-secondary small mb-0">{song.artist}</p>

          <audio
            ref={audioRef}
            src={song.audioUrl || song.audio || song.url || song.src || ""}
            preload="metadata"
          />
        </div>

        {/* Fixed Footer with Controls + Seekbar */}
        <footer
          className="fixed-bottom bg-dark border-top border-secondary py-3 px-4"
          style={{ zIndex: 1050 }}
        >
          {/* Seekbar */}
          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={handleSeek}
              className="form-range"
              aria-label="Seek audio"
            />
            <div className="d-flex justify-content-between small text-white-50 px-2">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="d-flex justify-content-center align-items-center gap-4">
            <FaMagic className="text-success fs-4" title="Magic feature" />
            <button
              onClick={handlePrev}
              className="btn btn-link text-white p-0 fs-4"
              disabled={filteredSongs.length < 2}
              aria-label="Previous Song"
              title="Previous"
            >
              <FaBackward />
            </button>

            <button
              onClick={togglePlayPause}
              className="btn btn-light rounded-circle d-flex justify-content-center align-items-center shadow"
              style={{ width: 64, height: 64 }}
              aria-label={isPlaying ? "Pause" : "Play"}
              title={isPlaying ? "Pause" : "Play"}
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
              aria-label="Next Song"
              title="Next"
            >
              <FaForward />
            </button>

            <FaClock className="fs-4" title="Duration" />
          </div>
        </footer>

        {/* Error Message */}
        {error && (
          <div
            className="error-alert position-fixed bottom-0 start-50 translate-middle-x mb-5"
            role="alert"
            onClick={dismissError}
            title="Click to dismiss"
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
