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
} from "react-icons/fa";

const SpotifyPlayer = () => {
  const { songId, artistName } = useParams();
  const navigate = useNavigate();

  const filteredSongs = Songs.filter((s) =>
    s.artist.toLowerCase().includes(artistName.toLowerCase())
  );

  const currentIndex = filteredSongs.findIndex(
    (s) => s.Id.toString() === songId
  );
  const song = filteredSongs[currentIndex];

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!song) return;

    setIsPlaying(false);
    setProgress(0);

    const audio = audioRef.current;
    audio.load();

    const handleLoadedMetadata = () => setDuration(audio.duration);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    // ✅ Save song to recentSongs in localStorage
    const stored = JSON.parse(localStorage.getItem("recentSongs")) || [];
    const filtered = stored.filter((id) => id !== song.Id); // Remove duplicate
    const updated = [song.Id, ...filtered].slice(0, 20); // Add to top
    localStorage.setItem("recentSongs", JSON.stringify(updated));

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
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
      audio.play();
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
    if (prevIndex < 0) {
      prevIndex = filteredSongs.length - 1;
    }
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

  if (!song) {
    return <div className="text-white p-4">Song not found.</div>;
  }

  return (
    <div
      className="bg-dark text-white min-vh-100 d-flex flex-column font-sans"
      style={{ backgroundColor: "#652e23" }}
    >
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between px-3 pt-3">
        <Link to={`/artist/${artistName}`} className="text-white">
          <FaChevronDown size={18} />
        </Link>
        <span className="fw-semibold">{song.artist}</span>
        <FaEllipsisH size={18} />
      </div>

      {/* Album Cover */}
      <div className="mt-4 px-3">
        <img src={song.img} alt={song.title} className="img-fluid rounded" />
      </div>

      {/* Song Info */}
      <div className="mt-4 px-3">
        <h1 className="h4 fw-bold">{song.title}</h1>
        <p className="text-light small">{song.artist}</p>
      </div>

      <audio
        ref={audioRef}
        src={song.audioUrl || song.audio || song.url || song.src || ""}
        preload="metadata"
      />

      {/* Progress Bar */}
      <div className="mt-3 px-3">
        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleSeek}
          className="form-range"
          style={{ accentColor: "white" }}
        />
        <div className="d-flex justify-content-between text-white-50 small">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration - progress)}</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="mt-4 px-4 d-flex justify-content-between align-items-center fs-3">
        <FaMagic className="text-success" />
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="btn btn-link text-white fs-3"
          title="Previous"
        >
          <FaBackward />
        </button>
        <button
          onClick={togglePlayPause}
          className="btn btn-light rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "64px", height: "64px" }}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <FaPause className="text-dark" /> : <FaPlay className="text-dark" />}
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === filteredSongs.length - 1}
          className="btn btn-link text-white fs-3"
          title="Next"
        >
          <FaForward />
        </button>
        <FaClock />
      </div>

      {/* Bottom Controls */}
      <div className="mt-4 px-4 d-flex justify-content-between fs-4">
        <FaTv />
        <FaShareAlt />
      </div>
    </div>
  );
};

export default SpotifyPlayer;
