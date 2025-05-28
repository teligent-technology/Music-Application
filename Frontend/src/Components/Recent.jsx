import React, { useEffect, useState, useRef, useCallback } from "react";
import { Songs } from "../data/song";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaMusic,
} from "react-icons/fa";

const Recents = () => {
  const [recentSongs, setRecentSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentSongs")) || [];
    const mapped = stored
      .map((id) => Songs.find((song) => song.Id === id))
      .filter(Boolean);
    setRecentSongs(mapped);
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSongAtIndex = useCallback(
    (index) => {
      if (index < 0 || index >= recentSongs.length) return;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      const song = recentSongs[index];
      const audio = new Audio(song.src);
      audioRef.current = audio;

      audio.play();
      setIsPlaying(true);
      setCurrentIndex(index);
      setProgress(0);

      audio.ontimeupdate = () => {
        setProgress(audio.currentTime / audio.duration || 0);
      };

      audio.onended = () => {
        if (index + 1 < recentSongs.length) {
          playSongAtIndex(index + 1);
        } else {
          setIsPlaying(false);
          setCurrentIndex(null);
          setProgress(0);
        }
      };
    },
    [recentSongs]
  );

  const togglePlayPause = () => {
    if (!audioRef.current) {
      if (recentSongs.length > 0) playSongAtIndex(0);
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (currentIndex === null) {
      if (recentSongs.length > 0) playSongAtIndex(0);
    } else if (currentIndex + 1 < recentSongs.length) {
      playSongAtIndex(currentIndex + 1);
    }
  };

  const playPrevious = () => {
    if (currentIndex === null) {
      if (recentSongs.length > 0) playSongAtIndex(0);
    } else if (currentIndex > 0) {
      playSongAtIndex(currentIndex - 1);
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newProgress = clickX / width;
    audioRef.current.currentTime = newProgress * audioRef.current.duration;
    setProgress(newProgress);
  };

  return (
    <div className="min-vh-100 py-4" style={{ backgroundColor: "#121212", color: "#fff" }}>
      <div className="container">
        <h3 className="mb-4 d-flex align-items-center gap-2">
          <FaMusic />
          Recently Played
        </h3>

        {recentSongs.length === 0 ? (
          <p className="text-muted">No recently played songs yet.</p>
        ) : (
          <>
            <div className="mb-4 p-4 bg-dark rounded shadow text-center">
              <div className="mb-2 fs-5 fw-semibold">
                {currentIndex !== null ? (
                  <>
                    <span className="text-primary">{recentSongs[currentIndex].song}</span>{" "}
                    by {recentSongs[currentIndex].artist}
                  </>
                ) : (
                  "Select a song to play"
                )}
              </div>

              <div
                ref={progressRef}
                onClick={handleSeek}
                className="w-100 bg-secondary rounded-pill position-relative mb-3"
                style={{ height: 8, cursor: "pointer" }}
              >
                <div
                  style={{
                    width: `${progress * 100}%`,
                    height: "100%",
                    backgroundColor: "#0d6efd",
                    borderRadius: 8,
                  }}
                />
              </div>

              <div className="d-flex justify-content-center align-items-center gap-3">
                <button
                  className="btn btn-outline-light rounded-circle"
                  onClick={playPrevious}
                  disabled={currentIndex <= 0}
                  title="Previous"
                >
                  <FaStepBackward />
                </button>
                <button
                  className="btn btn-primary rounded-circle"
                  style={{ width: 50, height: 50 }}
                  onClick={togglePlayPause}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  className="btn btn-outline-light rounded-circle"
                  onClick={playNext}
                  disabled={currentIndex === recentSongs.length - 1}
                  title="Next"
                >
                  <FaStepForward />
                </button>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4">
              {recentSongs.map((song, index) => (
                <div key={song.Id} className="col">
                  <div
                    className={`card h-100 bg-dark text-white border-0 shadow-sm ${
                      currentIndex === index ? "border border-primary" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onClick={() => playSongAtIndex(index)}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <img
                      src={song.img}
                      className="card-img-top"
                      alt={song.song}
                      style={{ height: 200, objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title text-truncate">{song.song}</h5>
                      <p className="card-text text-muted text-truncate">{song.artist}</p>
                      <button
                        className="btn btn-sm btn-outline-light mt-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSongAtIndex(index);
                        }}
                      >
                        <FaPlay className="me-1" />
                        Play
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recents;
