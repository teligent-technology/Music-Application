import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Songs } from "../data/song";
import { FaChevronDown, FaEllipsisH, FaMagic, FaBackward, FaPlay, FaPause, FaForward, FaClock, FaSpinner, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useSwipeable } from "react-swipeable";

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
  const [theme, setTheme] = useState("dark");

  const playButtonControls = useAnimation();

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

    // Update CSS variable --theme-color based on dominant color (fake here, but can be extended)
    document.documentElement.style.setProperty("--theme-color", song.themeColor || "#0d6efd");

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
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
      playButtonControls.start({
        boxShadow: [
          "0 0 8px 3px var(--theme-color)",
          "0 0 20px 10px var(--theme-color)",
          "0 0 8px 3px var(--theme-color)",
        ],
        transition: { duration: 2, repeat: Infinity, repeatType: "mirror" },
      });
    } else {
      audio.pause();
      playButtonControls.stop();
      playButtonControls.set({ boxShadow: "none" });
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
    navigate(`/player/${artistName}/${filteredSongs[prevIndex].Id}`);
  };

  const handleNext = () => {
    if (currentIndex < filteredSongs.length - 1) {
      navigate(`/player/${artistName}/${filteredSongs[currentIndex + 1].Id}`);
    }
  };

  const formatTime = (sec) => {
    if (isNaN(sec)) return "0:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const dismissError = () => setError(false);

  // Swipe handlers for mobile:
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  if (!song) {
    return (
      <div className="text-white p-4 text-center">
        <h4>Song not found.</h4>
        <Link to="/home" className="btn btn-primary mt-3">Go to Home</Link>
      </div>
    );
  }

  return (
    <>
      <style>{`
        /* Theme variables */
        :root {
          --theme-color: #0d6efd;
          --bg-color-dark: #121212;
          --bg-color-light: #f5f5f5;
          --text-color-dark: #eee;
          --text-color-light: #222;
        }
        [data-theme="dark"] {
          background-color: var(--bg-color-dark);
          color: var(--text-color-dark);
        }
        [data-theme="light"] {
          background-color: var(--bg-color-light);
          color: var(--text-color-light);
        }
        html, body, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: var(--bg-color-dark);
          color: var(--text-color-dark);
          transition: background-color 0.5s ease, color 0.5s ease;
          overflow: hidden;
        }
        .bg-cover {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background-image: url('${song.img}');
          background-size: cover;
          background-position: center;
          filter: blur(40px) brightness(0.45) saturate(150%);
          z-index: -1;
          transition: background-image 0.7s ease;
        }
        .player-overlay {
          backdrop-filter: blur(14px);
          background-color: rgba(0,0,0,0.6);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1rem 1.2rem;
          transition: background-color 0.5s ease;
        }
        .form-range {
          width: 100%;
          cursor: pointer;
        }
        .form-range::-webkit-slider-thumb, .form-range::-moz-range-thumb {
          background: var(--theme-color);
          border-radius: 50%;
          border: none;
          cursor: pointer;
        }
        .player-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .player-header .artist-name {
          flex: 1;
          text-align: center;
          font-weight: 700;
          font-size: 1.2rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          user-select: none;
        }
        .btn-icon {
          background: transparent;
          border: none;
          color: inherit;
          cursor: pointer;
          font-size: 1.5rem;
          transition: color 0.3s ease;
          user-select: none;
        }
        .btn-icon:hover {
          color: var(--theme-color);
        }
        .album-art-container {
          margin: 2rem auto 1rem;
          max-width: 90vw;
          max-height: 60vh;
          perspective: 1200px;
          touch-action: none;
        }
        .album-art {
          width: 100%;
          border-radius: 20px;
          box-shadow:
            0 0 20px var(--theme-color),
            0 8px 25px rgba(0,0,0,0.75);
          transition: transform 0.3s ease;
          user-select: none;
        }
        /* 3D tilt effect container */
        .tilt-wrapper {
          display: inline-block;
          will-change: transform;
        }
        .song-title {
          text-align: center;
          font-weight: 700;
          font-size: 1.5rem;
          margin-top: 0.7rem;
          user-select: none;
        }
        .song-artist {
          text-align: center;
          font-size: 1.1rem;
          color: #ccc;
          user-select: none;
          margin-bottom: 1.4rem;
        }
        .progress-container {
          margin: 0 1rem;
        }
        .time-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #aaa;
          user-select: none;
          margin-bottom: 0.4rem;
        }
        .controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-bottom: 1rem;
        }
        .btn-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: none;
          background-color: var(--theme-color);
          color: #121212;
          box-shadow:
            0 0 15px var(--theme-color),
            0 5px 15px rgba(0, 0, 0, 0.35);
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          user-select: none;
          transition: transform 0.25s ease, box-shadow 0.3s ease;
          will-change: transform;
          position: relative;
          overflow: visible;
        }
        .btn-circle:hover {
          transform: scale(1.1);
          box-shadow:
            0 0 25px var(--theme-color),
            0 8px 25px rgba(0, 0, 0, 0.55);
        }
        /* Pulse animation on play */
        .btn-circle.pulsing {
          animation: pulseGlow 2s infinite ease-in-out;
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow:
              0 0 15px var(--theme-color),
              0 0 30px var(--theme-color),
              0 0 40px var(--theme-color);
            transform: scale(1);
          }
          50% {
            box-shadow:
              0 0 30px var(--theme-color),
              0 0 50px var(--theme-color),
              0 0 70px var(--theme-color);
            transform: scale(1.05);
          }
        }
        /* Gradient progress bar fill */
        .form-range {
          -webkit-appearance: none;
          height: 8px;
          border-radius: 5px;
          background: linear-gradient(90deg, var(--theme-color) 0%, #444 0%);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .form-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: var(--theme-color);
          cursor: pointer;
          border-radius: 50%;
          border: none;
          margin-top: -6px;
          box-shadow: 0 0 10px var(--theme-color);
          transition: box-shadow 0.3s ease;
          position: relative;
          z-index: 1;
        }
        .form-range::-webkit-slider-thumb:hover {
          box-shadow: 0 0 18px var(--theme-color);
        }
        .form-range::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: var(--theme-color);
          border-radius: 50%;
          border: none;
          cursor: pointer;
          box-shadow: 0 0 10px var(--theme-color);
          transition: box-shadow 0.3s ease;
          position: relative;
          z-index: 1;
        }
        /* Visualizer bars */
        .visualizer {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 1rem;
          user-select: none;
        }
        .bar {
          width: 6px;
          height: 10px;
          background-color: var(--theme-color);
          border-radius: 3px;
          animation: bounce 1s infinite ease-in-out;
          transform-origin: bottom center;
        }
        .bar:nth-child(1) { animation-delay: 0s; }
        .bar:nth-child(2) { animation-delay: 0.15s; }
        .bar:nth-child(3) { animation-delay: 0.3s; }
        .bar:nth-child(4) { animation-delay: 0.45s; }
        .bar:nth-child(5) { animation-delay: 0.6s; }
        @keyframes bounce {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(2.3); }
        }
        .theme-toggle-btn {
          position: fixed;
          top: 12px;
          right: 12px;
          background: var(--theme-color);
          color: #121212;
          border-radius: 50%;
          width: 42px;
          height: 42px;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
          cursor: pointer;
          box-shadow: 0 0 10px var(--theme-color);
          user-select: none;
          transition: background-color 0.4s ease;
          z-index: 20;
        }
        .error-msg {
          background: #b71c1c;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          margin: 1rem;
          position: relative;
          user-select: none;
          box-shadow: 0 0 10px #b71c1c;
        }
        .error-msg button {
          position: absolute;
          top: 8px;
          right: 8px;
          background: transparent;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
        }
      `}</style>

      <div className="bg-cover" />

      <button
        className="theme-toggle-btn"
        aria-label="Toggle Theme"
        onClick={toggleTheme}
        title="Toggle Dark/Light Theme"
      >
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>

      <div className="player-overlay" {...swipeHandlers}>
        <div className="player-header">
          <button className="btn-icon" onClick={() => navigate(-1)} title="Go Back">
            <FaChevronDown />
          </button>
          <div className="artist-name">{artistName}</div>
          <button className="btn-icon" title="Options">
            <FaEllipsisH />
          </button>
        </div>

        <motion.div
          className="album-art-container tilt-wrapper"
          style={{ perspective: 1000 }}
          onMouseMove={(e) => {
            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (-y / rect.height) * 15;
            const rotateY = (x / rect.width) * 15;
            el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "rotateX(0) rotateY(0) scale(1)";
          }}
          onTouchMove={(e) => {
            // Optional: Add touch tilt effect for mobile if needed
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = "rotateX(0) rotateY(0) scale(1)";
          }}
        >
          <img
            src={song.img}
            alt={`${song.title} cover`}
            className="album-art"
            draggable={false}
          />
        </motion.div>

        <h2 className="song-title">{song.title}</h2>
        <p className="song-artist">{song.artist}</p>

        <div className="progress-container">
          <div className="time-labels">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            className="form-range"
            min={0}
            max={duration || 0}
            step="0.01"
            value={progress}
            onChange={handleSeek}
            style={{
              backgroundSize: `${(progress / duration) * 100 || 0}% 100%`,
            }}
            aria-label="Seek audio"
          />
        </div>

        <div className="visualizer" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bar" />
          ))}
        </div>

        <div className="controls" role="group" aria-label="Playback controls">
          <button
            onClick={handlePrev}
            className="btn-icon"
            aria-label="Previous"
            title="Previous Song"
          >
            <FaBackward />
          </button>

          <motion.button
            onClick={togglePlayPause}
            className={`btn-circle ${isPlaying ? "pulsing" : ""}`}
            aria-label={isPlaying ? "Pause" : "Play"}
            title={isPlaying ? "Pause" : "Play"}
            animate={playButtonControls}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </motion.button>

          <button
            onClick={handleNext}
            className="btn-icon"
            aria-label="Next"
            title="Next Song"
            disabled={currentIndex === filteredSongs.length - 1}
            style={{ opacity: currentIndex === filteredSongs.length - 1 ? 0.5 : 1 }}
          >
            <FaForward />
          </button>
        </div>

        <audio ref={audioRef} src={song.src} preload="auto" />
        
        {isLoading && (
          <div className="text-center my-2" aria-live="polite">
            <FaSpinner className="spinner" /> Loading...
          </div>
        )}

        {error && (
          <div className="error-msg" role="alert">
            <p>Oops! Error loading audio.</p>
            <button onClick={dismissError} aria-label="Dismiss error">
              <FaTimes />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SpotifyPlayer;
