import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/Home';
import PlaylistSelector from './Components/PlaylistSelector';
import Playlist from './Components/Playlist';
import PlaylistCreator from './Components/PlaylistCreator';
import PlaylistViewer from './Components/PlaylistViewer';

import Signup from './Signup';
import Login from './Login';
import Punjabi from './Pages/Punjabi';

function App() {
  const [selectedSongs, setSelectedSongs] = useState([]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/punjabi" element={<Punjabi />} />

          {/* Playlist Selection Page */}
          <Route
            path="/playlist"
            element={
              <div className="container">
                <h2>🎵 Music App with Playlist</h2>
                {/* Pass selectedSongs and setter to Playlist */}
                <Playlist selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs} />

                {/* Pass selectedSongs to PlaylistCreator */}
                <PlaylistCreator selectedSongs={selectedSongs} />

                {/* Pass selectedSongs to PlaylistSelector */}
                <PlaylistSelector selectedSongs={selectedSongs} />
              </div>
            }
          />

          {/* Show songs from selected playlist on dynamic route */}
          <Route path="/playlist/:name" element={<PlaylistViewer />} />
                    <Route path="/home" element={<HomePage />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
