import React, { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Songs } from "../data/song";
import { Container, Row, Col, Card, Button, Breadcrumb } from "react-bootstrap";

const ArtistSongs = () => {
  const { name } = useParams();
  const filteredSongs = Songs.filter((song) =>
    song.artist.toLowerCase().includes(name.toLowerCase())
  );

  // Track play state per song
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});
  const [progressMap, setProgressMap] = useState({});
  const [durationMap, setDurationMap] = useState({});

  const togglePlayPause = (songId) => {
    const currentAudio = audioRefs.current[songId];

    if (!currentAudio) return;

    if (playingId === songId) {
      currentAudio.pause();
      setPlayingId(null);
    } else {
      // Pause others
      Object.keys(audioRefs.current).forEach((id) => {
        if (id !== songId && audioRefs.current[id]) {
          audioRefs.current[id].pause();
        }
      });

      currentAudio.play();
      setPlayingId(songId);
    }
  };

  const handleSeek = (songId, value) => {
    const audio = audioRefs.current[songId];
    if (audio) {
      audio.currentTime = value;
      setProgressMap((prev) => ({ ...prev, [songId]: value }));
    }
  };

  useEffect(() => {
    // Attach timeupdate and metadata events
    filteredSongs.forEach((song) => {
      const audio = audioRefs.current[song.Id];
      if (!audio) return;

      const handleTimeUpdate = () => {
        setProgressMap((prev) => ({
          ...prev,
          [song.Id]: audio.currentTime,
        }));
      };

      const handleLoadedMetadata = () => {
        setDurationMap((prev) => ({
          ...prev,
          [song.Id]: audio.duration,
        }));
      };

      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    });
  }, [filteredSongs]);

  const formatTime = (sec) => {
    if (isNaN(sec)) return "0:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Container
      fluid
      className="py-4 text-white"
      style={{ minHeight: "85vh", backgroundColor: "#121212" }}
    >
      <Breadcrumb className="bg-dark px-3 py-2 rounded mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/home" }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Songs by {name}</Breadcrumb.Item>
      </Breadcrumb>

      <h3 className="text-center fw-bold mb-4 text-light">
        Songs by <span className="text-info">{name}</span>
      </h3>

      {filteredSongs.length === 0 ? (
        <div className="text-center text-muted">
          <p>No songs found for this artist.</p>
          <Button as={Link} to="/" variant="outline-light" size="sm" className="mt-2">
            ⬅ Back to Home
          </Button>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredSongs.map((song) => (
            <Col key={song.Id}>
              <Card
                className="bg-dark text-white h-100 shadow-sm border-0 d-flex flex-column"
                style={{ minHeight: "280px" }}
              >
                <div style={{ height: "140px", overflow: "hidden", backgroundColor: "#000" }}>
                  <Card.Img
                    variant="top"
                    src={song.img}
                    alt={song.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="h6 mb-1 text-truncate">{song.title}</Card.Title>
                    <Card.Text className="text-muted small mb-2">{song.artist}</Card.Text>
                  </div>

                  {/* Audio Player */}
                  <audio
                    ref={(el) => (audioRefs.current[song.Id] = el)}
                    src={song.audioUrl || song.audio || song.url || song.src || ""}
                    preload="metadata"
                  />

                  <div>
                    <Button
                      onClick={() => togglePlayPause(song.Id)}
                      variant="light"
                      size="sm"
                      className="me-2"
                    >
                      {playingId === song.Id ? "⏸ Pause" : "▶️ Play"}
                    </Button>
                    <div className="d-flex align-items-center mt-2">
                      <input
                        type="range"
                        className="form-range"
                        min="0"
                        max={durationMap[song.Id] || 0}
                        value={progressMap[song.Id] || 0}
                        onChange={(e) => handleSeek(song.Id, parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="d-flex justify-content-between small text-white-50">
                      <span>{formatTime(progressMap[song.Id] || 0)}</span>
                      <span>{formatTime(durationMap[song.Id] || 0)}</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ArtistSongs;
