import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Image } from "react-bootstrap";
import "./Playlist.css";

const accentColors = [
  "hsl(190, 85%, 55%)",
  "hsl(240, 85%, 55%)",
  "hsl(280, 85%, 55%)",
  "hsl(320, 85%, 55%)",
  "hsl(360, 85%, 55%)",
];

const PlaylistViewer = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState({});
  const [matchedSongs, setMatchedSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("playlists") || "{}");
    setPlaylists(stored);
  }, []);

  useEffect(() => {
    if (name && playlists[name]) {
      setMatchedSongs(playlists[name]);
      setCurrentIndex(null);
    }
  }, [name, playlists]);

  useEffect(() => {
    if (audioRef.current && currentIndex !== null) {
      audioRef.current.load();
      audioRef.current.play();
      document.getElementById("audio-player")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex]);

  const handlePlay = (index) => setCurrentIndex(index);
  const handleNext = () =>
    currentIndex < matchedSongs.length - 1 && setCurrentIndex((i) => i + 1);
  const handlePrev = () =>
    currentIndex > 0 && setCurrentIndex((i) => i - 1);

  const handleDeletePlaylist = () => {
    if (!name) return;
    if (window.confirm(`"${name}" playlist delete karna hai?`)) {
      const updated = { ...playlists };
      delete updated[name];
      localStorage.setItem("playlists", JSON.stringify(updated));
      navigate("/playlist");
    }
  };

  const removeSong = (songToRemove) => {
    const updatedList = playlists[name].filter((s) => s.src !== songToRemove.src);
    const updatedPlaylists = { ...playlists, [name]: updatedList };
    localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
    setPlaylists(updatedPlaylists);

    const updatedSongs = matchedSongs.filter((s) => s.src !== songToRemove.src);
    setMatchedSongs(updatedSongs);
    if (updatedSongs.length === 0) setCurrentIndex(null);
    else if (currentIndex >= updatedSongs.length) setCurrentIndex(updatedSongs.length - 1);
  };

  return (
    <Container className="playlist-container pt-5 pb-5">
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <Button
          variant="outline-primary"
          onClick={() => navigate("/playlist")}
          className="btn-back"
        >
          ← Back
        </Button>
        <h2 className="playlist-title" style={{ color: accentColors[2] }}>
          {decodeURIComponent(name)} Playlist
        </h2>
        <Button variant="outline-danger" onClick={handleDeletePlaylist}>
          🗑 Delete
        </Button>
      </div>

      <div className="song-list">
        {matchedSongs.length > 0 ? (
          matchedSongs.map((song, index) => (
            <Card
              key={index}
              className={`song-card ${
                currentIndex === index ? "selected" : ""
              }`}
              style={{
                borderLeft: `6px solid ${
                  accentColors[index % accentColors.length]
                }`,
              }}
              onClick={() => handlePlay(index)}
              tabIndex={0}
              aria-label={`Play ${song.song} by ${song.artist}`}
            >
              <div className="d-flex align-items-center">
                <Image
                  src={song.img || "/default-img.jpg"}
                  alt={song.song}
                  className="song-thumbnail me-3"
                  rounded
                />
                <div className="song-card-content">
                  <div className="song-title">{song.song}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-auto remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSong(song);
                  }}
                  aria-label={`Remove ${song.song} from playlist`}
                >
                  ✖
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="no-songs-msg text-center text-muted mt-4">
            Is playlist mein abhi koi gaane nahi hain.
          </p>
        )}
      </div>

      {currentIndex !== null && matchedSongs[currentIndex] && (
        <div
          id="audio-player"
          className="audio-player p-4 rounded mt-4 shadow-lg"
          style={{ background: "rgba(30, 215, 96, 0.15)", backdropFilter: "blur(10px)" }}
        >
          <h5 style={{ color: accentColors[2], marginBottom: "0.5rem" }}>
            Playing: {matchedSongs[currentIndex].song}
          </h5>
          <audio
            ref={audioRef}
            controls
            autoPlay
            className="w-100"
            onEnded={handleNext}
          >
            <source src={matchedSongs[currentIndex].src} type="audio/mpeg" />
            Aapka browser audio support nahi karta.
          </audio>
          <div className="d-flex justify-content-center gap-2 mt-3">
            <Button
              variant="outline-primary"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="btn-control"
            >
              ⏮ Previous
            </Button>
            <Button
              variant="outline-primary"
              onClick={handleNext}
              disabled={currentIndex === matchedSongs.length - 1}
              className="btn-control"
            >
              ⏭ Next
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default PlaylistViewer;
