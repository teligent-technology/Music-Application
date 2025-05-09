import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaDownload, FaStepForward, FaStepBackward, FaSlideshare } from "react-icons/fa";

const AudioPlayer = ({ songsList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [filteredSongs, setFilteredSongs] = useState(songsList);
  const audioRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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

  const currentSong = filteredSongs.length > 0 ? filteredSongs[currentIndex] : null;

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Playback error:", error));
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSongClick = (Id) => {
    const index = songsList.findIndex(song => song.Id === Id);
    setCurrentIndex(index);  

    setCurrentTime(0);       
    setIsPlaying(true);     
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
    if (filteredSongs.length === 0) return;

    if (currentIndex < filteredSongs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const handleNext = () => {
    if (filteredSongs.length === 0) return;

    const nextIndex = (currentIndex + 1) % filteredSongs.length;
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
    setCurrentTime(0);
  };




  const handlePrevious = () => {
    if (filteredSongs.length === 0) return;

    const prevIndex = (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
    setCurrentIndex(prevIndex);
    setIsPlaying(true);
    setCurrentTime(0);
  };



  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.src; // force re-assign
    audio.load();                // important: reload audio
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

  useEffect(() => {
    // When category changes (i.e., songsList prop changes)
    setFilteredSongs(songsList); // Reset to full category song list
    setCurrentIndex(0);          // Start from first song
    setSearchTerm("");           // Clear search input
    setCurrentTime(0);
    setIsPlaying(false);         // Stop auto playback
  }, [songsList]);



  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };


  useEffect(() => {
  if (currentSong && currentSong.img) {
    document.body.style.backgroundImage = `url(${currentSong.img})`;
    document.body.style.backgroundSize = "contain";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.transition = "background-image 0.5s ease-in-out";
  }

  return () => {
    document.body.style.backgroundImage = "";
  };
}, [currentSong]);


  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center" >
        <div className="d-flex mt-3">
          
          <input onKeyDown={handleKeyDown}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by song or artist"
            style={{width: "500px", height: "45px"}}
            className="form-control W-75"
            
          />
            
          <button   className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded shadow-sm"
          onClick={handleSearchClick} 
          style={{ position: 'fixed', top: '200px', right: '515px' }}>Search</button>
          

        </div>

        {filteredSongs.length === 0 || !currentSong ? (
          <p style={{ color: "red", fontWeight: "bold" }}>No songs found.</p>
        ) : (
          <div>
            <div>
            <br />

            {filteredSongs.map((item)=>(
                <div key={item.Id} onClick={() => handleSongClick(item.Id)} style={{cursor: "pointer"}}>
                    <div className="d-flex align-items-center gap-2">


<h5  className={`fs-6 mb-0 fw-bold ${currentSong.Id === item.Id ? 'text-primary' : 'text-white'}`}

              >{item.Id}. {item.song}</h5>
<small className="text-white">{item.artist}</small>
</div>

              </div>


              ))}
            </div>
            <div style={{ marginTop: "40px" }} className="text-center">
              <h3 className="text-white">{currentSong.song}</h3>
              <h4 className="text-white">Artist: {currentSong.artist}</h4>
            </div>



            <audio
              ref={audioRef}
              src={currentSong.src}
              onEnded={handleEnded}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              preload="metadata" />
            <div className="my-3">
              <button onClick={handlePrevious} title="Previous" className="btn btn-secondary me-2">
                <FaStepBackward />
              </button>

              <button onClick={handlePlayPause} title={isPlaying ? "Pause" : "Play"} className="btn btn-secondary me-2">
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>

              <button
                onClick={handleNext}
                title="Next"
                className="btn btn-secondary me-2"
              >
                <FaStepForward />
              </button>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="text-white">{formatTime(currentTime)}</span>
              <input
                type="range"
                className="form-range flex-grow-1"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                style={{  height: "8px",           
                    }}
                
              />
              <span>{formatTime(duration)}</span>

              <a href={currentSong.src} download title="Download" className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 rounded">
                <FaDownload />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AudioPlayer;
