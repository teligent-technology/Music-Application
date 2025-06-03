import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Image } from "react-bootstrap";
import Songs from "../data/Songs";

const PlaylistViewer = () => {
  const { name } = useParams();
  const [playlists, setPlaylists] = useState({});
  const [matchedSongs, setMatchedSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedPlaylists = JSON.parse(localStorage.getItem("playlists")) || {};
    setPlaylists(storedPlaylists);
    const currentPlaylist = storedPlaylists[name] || [];
    const fullSongs = currentPlaylist
      .map((savedSong) => Songs.find((s) => s.src === savedSong.src))
      .filter((s) => s);
    setMatchedSongs(fullSongs);
  }, [name]);

  const handlePlay = (index) => {
    setCurrentIndex(index);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handlePlay(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < matchedSongs.length - 1) {
      handlePlay(currentIndex + 1);
    }
  };

  const handleDeletePlaylist = () => {
    const updated = { ...playlists };
    delete updated[name];
    localStorage.setItem("playlists", JSON.stringify(updated));
    setPlaylists(updated);
    setMatchedSongs([]);
  };

  const removeSong = (songToRemove) => {
    const updatedList = matchedSongs.filter((song) => song.src !== songToRemove.src);
    const updatedPlaylists = { ...playlists, [name]: updatedList };
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);
    setMatchedSongs(updatedList);
    if (currentIndex !== null && updatedList.length <= currentIndex) {
      setCurrentIndex(updatedList.length - 1);
    }
  };

  return (
    <Container className="playlist-container my-5 text-white glass-box">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-music-note-list me-2 text-info"></i>
          {decodeURIComponent(name)} Playlist
        </h2>
        <Button variant="danger" onClick={handleDeletePlaylist}>
          <i className="bi bi-trash3-fill me-1"></i> Delete Playlist
        </Button>
      </div>

      {matchedSongs.length === 0 ? (
        <p className="fst-italic text-muted">No songs in this playlist.</p>
      ) : (
        matchedSongs.map((song, index) => (
          <Card
            key={index}
            className={`mb-3 song-card ${currentIndex === index ? 'playing' : ''}`}
            onClick={() => handlePlay(index)}
          >
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <Image
                  src={song.img || "/default-img.jpg"}
                  alt={song.song}
                  width={60}
                  height={60}
                  rounded
                />
                <div>
                  <div className="fw-bold">{song.song}</div>
                  <small className="text-light"> — {song.artist}</small>
                </div>
              </div>
              <Button
                variant="outline-light"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeSong(song);
                }}
              >
                <i className="bi bi-x-circle-fill"></i>
              </Button>
            </Card.Body>
          </Card>
        ))
      )}

      {currentIndex !== null && matchedSongs[currentIndex] && (
        <div id="audio-player" className="mt-5">
          <Card className="bg-dark text-white p-3">
            <div className="d-flex align-items-center gap-4">
              <Image
                src={matchedSongs[currentIndex].img || "/default-img.jpg"}
                alt="Now Playing"
                width={80}
                height={80}
                rounded
              />
              <div className="flex-grow-1">
                <h5>{matchedSongs[currentIndex].song}</h5>
                <p className="mb-1">{matchedSongs[currentIndex].artist}</p>
                <audio controls ref={audioRef} className="w-100">
                  <source src={matchedSongs[currentIndex].src} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
              <div className="d-flex flex-column gap-2">
                <Button variant="secondary" onClick={handlePrev} disabled={currentIndex === 0}>
                  <i className="bi bi-skip-start-fill"></i>
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleNext}
                  disabled={currentIndex === matchedSongs.length - 1}
                >
                  <i className="bi bi-skip-end-fill"></i>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default PlaylistViewer;
