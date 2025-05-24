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

    setTimeout(() => setIsPlaying(true), 300);

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
    <>

        <Link
      to="/home"
      className="btn btn-outline-light"
      style={{ fontSize: "1.1rem" }}
    >
      Go to Home
    </Link>
      <style>{`
        html, body, #root {
          background-color: #000000 !important;
          color: white !important;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        a {
          color: white;
        }
        a:hover, a:focus {
          color: #0d6efd; /* bootstrap primary blue */
          text-decoration: underline;
        }
        /* Override default bootstrap dark btn text for play/pause buttons */
        button.btn.btn-light.rounded-circle {
          color: black !important;
        }
      `}</style>

      <div
        className="bg-dark text-white d-flex flex-column"
        style={{ minHeight: "100vh" }}
      >

     
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom border-secondary">
          <Link
            to={`/artist/${artistName}`}
            className="text-white text-decoration-none"
          >
            <FaChevronDown size={20} />
          </Link>
          <span className="fw-bold">{song.artist}</span>
          <FaEllipsisH size={20} />
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 overflow-auto px-3 py-3 pb-5 text-center">
          <img
            src={song.img}
            alt={song.title}
            className="img-fluid rounded shadow mb-3 mx-auto"
            style={{ maxHeight: 300, objectFit: "contain" }}
          />
          <h5 className="fw-bold mb-1">{song.title}</h5>
          <p className="text-light small">{song.artist}</p>

          <audio
            ref={audioRef}
            src={song.audioUrl || song.audio || song.url || song.src || ""}
            preload="metadata"
          />
        </div>

        {/* Fixed Footer with Controls + Seekbar */}
        <footer
          className="fixed-bottom bg-dark border-top border-secondary py-3 px-3"
          style={{ zIndex: 1050 }}
        >
          {/* Seekbar */}
          <div className="mb-2">
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
          <div className="d-flex justify-content-center align-items-center gap-3">
            <FaMagic className="text-success fs-4" />
            <button
              onClick={handlePrev}
              className="btn btn-link text-white p-0 fs-4"
              disabled={filteredSongs.length < 2}
              aria-label="Previous Song"
            >
              <FaBackward />
            </button>

            <button
              onClick={togglePlayPause}
              className="btn btn-light rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: 56, height: 56 }}
              aria-label={isPlaying ? "Pause" : "Play"}
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
              className="btn btn-link text-white p-0 fs-4"
              disabled={currentIndex >= filteredSongs.length - 1}
              aria-label="Next Song"
            >
              <FaForward />
            </button>

            <FaClock className="fs-4" />
          </div>
        </footer>

        {/* Error Message */}
        {error && (
          <div
            className="text-danger text-center small position-fixed w-100"
            style={{ bottom: "110px", zIndex: 1060 }}
            role="alert"
          >
            ⚠️ Failed to load audio. Try again later.
          </div>
        )}
      </div>
    </>
  );
};

export default SpotifyPlayer;
