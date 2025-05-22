import React, { useEffect, useState, useRef, useCallback } from "react";
import { Songs } from "../data/song";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

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
      .map(id => Songs.find(song => song.Id === id))
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

  const playSongAtIndex = useCallback((index) => {
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
  }, [recentSongs]);

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
    <div className="min-vh-100 py-4" style={{ backgroundColor: "#000", color: "#fff" }}>
      <div className="container">
        <h3 className="mb-4">Recently Played</h3>
        {recentSongs.length === 0 ? (
          <p className="text-muted" style={{color: "#fff"}}>No recently played songs yet.</p>
        ) : (
          <>
            <div className="mb-4 p-3 bg-dark text-white rounded shadow d-flex flex-column align-items-center">
              <div className="mb-2">
                <strong>
                  {currentIndex !== null
                    ? recentSongs[currentIndex].song + " - " + recentSongs[currentIndex].artist
                    : "Select a song to play"}
                </strong>
              </div>

              <div
                ref={progressRef}
                onClick={handleSeek}
                style={{
                  width: "100%",
                  height: 10,
                  backgroundColor: "#444",
                  borderRadius: 5,
                  cursor: "pointer",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: `${progress * 100}%`,
                    height: "100%",
                    backgroundColor: "#0d6efd",
                    borderRadius: 5,
                  }}
                />
              </div>

              <div>
                <button className="btn btn-secondary me-3" onClick={playPrevious} disabled={currentIndex === 0 || currentIndex === null}>
                  <FaStepBackward />
                </button>
                <button className="btn btn-primary me-3" onClick={togglePlayPause} disabled={currentIndex === null && recentSongs.length === 0}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="btn btn-secondary" onClick={playNext} disabled={currentIndex === recentSongs.length - 1 || currentIndex === null}>
                  <FaStepForward />
                </button>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4">
              {recentSongs.map((song, index) => (
                <div key={song.Id} className="col">
                  <div
                    className={`card h-100 bg-dark text-white ${currentIndex === index ? "border border-primary" : ""}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => playSongAtIndex(index)}
                  >
                    <img src={song.img} className="card-img-top" alt={song.song} />
                    <div className="card-body">
                      <h5 className="card-title">{song.song}</h5>
                      <p className="card-text">{song.artist}</p>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSongAtIndex(index);
                        }}
                      >
                        <FaPlay className="me-2" />
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
