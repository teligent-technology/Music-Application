import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaDownload, FaStepForward, FaStepBackward, FaSlideshare, FaPlus } from "react-icons/fa";

const AudioPlayer = ({ songsList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [filteredSongs, setFilteredSongs] = useState(songsList);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  const audioRef = useRef(null);

  useEffect(() => {
    const ids = playlist.map(song => song.Id);
    localStorage.setItem("playlistIds", JSON.stringify(ids));
  }, [playlist]);

  useEffect(() => {
    if (!songsList || songsList.length === 0) return;

    const savedIds = JSON.parse(localStorage.getItem("playlistIds"));
    if (savedIds && Array.isArray(savedIds)) {
      const reconstructed = savedIds
        .map(id => songsList.find(song => song.Id === id))
        .filter(Boolean);
      setPlaylist(reconstructed);
    }

    setFilteredSongs(songsList);
    setCurrentIndex(0);
    setSearchTerm("");
    setCurrentTime(0);
    setIsPlaying(false);
  }, [songsList]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const togglePlaylist = () => {
    setShowPlaylist((prev) => !prev);
  };

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

  const currentList = showPlaylist ? playlist : filteredSongs;
  const currentSong = currentList.length > 0 ? currentList[currentIndex] : null;

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

  const handleDeleteSong = (idToDelete) => {
    const audio = audioRef.current;
    if (audio && currentSong && currentSong.Id === idToDelete) {
      audio.pause();
      setIsPlaying(false);
    }

    const updatedPlaylist = playlist.filter(song => song.Id !== idToDelete);
    setPlaylist(updatedPlaylist);

    if (currentIndex >= updatedPlaylist.length) {
      setCurrentIndex(updatedPlaylist.length - 1);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleSongClick = (Id) => {
    const audio = audioRef.current;
    if (audio) audio.pause(); 

    const listToUse = showPlaylist ? playlist : filteredSongs;
    const index = listToUse.findIndex(song => song.Id === Id);
    if (index !== -1) {
      setCurrentIndex(index);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handleAddToPlaylist = (song) => {
    if (!playlist.some(s => s.Id === song.Id)) {
      setPlaylist([...playlist, song]);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = e.target.value;
      setCurrentTime(audio.currentTime);
    }
  };

  const handleEnded = () => {
    const currentList = showPlaylist ? playlist : filteredSongs;
    if (currentList.length === 0) return;

    if (currentIndex < currentList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleNext = () => {
    const currentList = showPlaylist ? playlist : filteredSongs;
    if (currentList.length === 0) return;

    const nextIndex = (currentIndex + 1) % currentList.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    const currentList = showPlaylist ? playlist : filteredSongs;
    if (currentList.length === 0) return;

    const prevIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.src;
    audio.load();
    setCurrentTime(0);

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Auto-play failed:", error);
        setIsPlaying(true);
      });
    }
  }, [currentIndex, currentSong]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (currentSong?.img) {
      const isMobile = window.innerWidth < 576;
      document.body.style.backgroundImage = `url(${currentSong.img})`;
      document.body.style.backgroundSize = isMobile ? "cover" : "contain";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.transition = "background-image 0.5s ease-in-out";
    }

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, [currentSong]);

  useEffect(() => {
    const handleKeyControls = (e) => {
      const audio = audioRef.current;
      if (!audio) return;

      const currentList = showPlaylist ? playlist : filteredSongs;

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
          if (currentList.length === 0) return;
          setCurrentIndex((prevIndex) => (prevIndex - 1 + currentList.length) % currentList.length);
          setCurrentTime(0);
          setIsPlaying(true);
          break;

        case 'ArrowDown':
          if (currentList.length === 0) return;
          setCurrentIndex((prevIndex) => (prevIndex + 1) % currentList.length);
          setCurrentTime(0);
          setIsPlaying(true);
          break;

        case 'Enter':
          e.preventDefault();
          if (audio.paused) {
            audio.play().then(() => setIsPlaying(true));
          } else {
            audio.pause();
            setIsPlaying(false);
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyControls);
    return () => {
      window.removeEventListener('keydown', handleKeyControls);
    };
  }, [duration, playlist, filteredSongs, showPlaylist, currentIndex]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="d-flex flex-column flex-sm-row gap-2 mt-3 w-100 px-3">
        <input
          onKeyDown={handleKeyDown}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by song or artist"
          className="form-control w-100"
          style={{ height: "45px" }}
        />
        <button
          className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded shadow-sm"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      {/* Scrollable Song List */}
      <div style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto", width: "100%", marginTop: "20px" }}>
        {showPlaylist && (
          <div className="mt-4 bg-dark text-white p-3 rounded" style={{ maxHeight: "250px", overflowY: "auto", width: "300px" }}>
            <h5 className="mb-3">Playlist</h5>
            {playlist.length === 0 ? (
              <p>No songs in playlist.</p>
            ) : (
              playlist.map((song) => (
                <div key={song.Id} className="d-flex justify-content-between align-items-center mb-2">
                  <span
                    onClick={() => handleSongClick(song.Id)}
                    style={{ cursor: "pointer" }}
                    className={currentSong?.Id === song.Id ? "text-primary fw-bold" : ""}
                  >
                    {song.song}
                  </span>
                  <span
                    onClick={() => handleDeleteSong(song.Id)}
                    style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                    title="Remove from playlist"
                  >
                    ❌
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {!showPlaylist && filteredSongs.length === 0 || !currentSong ? (
          <p style={{ color: "red", fontWeight: "bold" }}>No songs found.</p>
        ) : (
          !showPlaylist && (
            <div>
              <br />
              {filteredSongs.map((item) => (
                <div key={item.Id} className="d-flex align-items-center justify-content-between" style={{ cursor: "pointer" }}>
                  <div className="d-flex align-items-center gap-2" onClick={() => handleSongClick(item.Id)}>
                    <h5 className={`fs-6 mb-0 fw-bold ${currentSong.Id === item.Id ? 'text-primary' : 'text-white'}`}>
                      {item.Id}. {item.song}
                    </h5>
                    <small className="text-white">{item.artist}</small>
                  </div>
                  <button onClick={() => handleAddToPlaylist(item)} className="btn btn-sm text-success" title="Add to Playlist">
                    <FaPlus />
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {currentSong && (
        <div style={{ marginTop: "40px" }} className="text-center">
          <h3 className="text-white">{currentSong.song}</h3>
          <h4 className="text-white">Artist: {currentSong.artist}</h4>
        </div>
      )}

      <audio
        ref={audioRef}
        src={currentSong?.src}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />

      {/* Sticky Seekbar */}
      <div className="my-3 sticky-bottom d-flex justify-content-center align-items-center" style={{ width: "100%", position: "fixed", bottom: "0", backgroundColor: "#222" }}>
        <button onClick={handlePrevious} className="btn btn-secondary me-2" title="Previous">
          <FaStepBackward />
        </button>
        <button onClick={handlePlayPause} className="btn btn-secondary me-2" title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={handleNext} className="btn btn-secondary me-2" title="Next">
          <FaStepForward />
        </button>

        <div className="d-flex align-items-center gap-2">
          <span className="text-white">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="form-range flex-grow-1"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            style={{ height: "8px" }}
          />
          <span>{formatTime(duration)}</span>

          <a
            href={currentSong?.src}
            download
            title="Download"
            className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded"
          >
            <FaDownload />
          </a>

          <button
            onClick={togglePlaylist}
            title="Toggle Playlist"
            className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded"
          >
            <FaSlideshare />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
