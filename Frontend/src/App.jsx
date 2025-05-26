import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Auth Pages
import Signup from './Components/Signup';
import Login from './Components/Login';

// Core Pages
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
import Punjabi from './Pages/Punjabi';
import AudioPlayer from './Components/AudioPlayer';
import SpotifyPlayer from './Components/SpotifyPlayer'; 
import ArtistSongs from './Components/ArtistSongs';
import SearchPage from './Components/SearchPage';
// Playlist Components
import Playlist from './Components/Playlist';
import PlaylistCreator from './Components/PlaylistCreator';
import PlaylistSelector from './Components/PlaylistSelector';
import PlaylistViewer from './Components/PlaylistViewer';
import CreatePlaylistPage from './Components/CreatePlaylistPage';
import Recents from './Components/Recent';
import Settings from './Components/Setting'
import PremiumPage from './Components/PremiumPage';
import Create from './Components/Create'
function App() {
  const [selectedSongs, setSelectedSongs] = useState([]);

  return (

    <Router>
      
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />

        {/* Core Pages */}
        <Route path="/home" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/punjabi" element={<Punjabi />} />
        <Route path="/player/:artistName/:songId" element={<SpotifyPlayer />} />
        <Route path="/artist/:name" element={<ArtistSongs />} />
        <Route path="/recents" element={<Recents />} />
        <Route path="/settings" element={<Settings />} />

        {/* Audio Player Page */}
        <Route path="/audio" element={<AudioPlayer />} />

        {/* Playlist Pages */}
        <Route
          path="/playlist"
          element={
            <div className="container">
              <h2 style={{color:  "#fff"}}>🎵 Music App with Playlist</h2>
              <Playlist selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs} />
              <PlaylistCreator selectedSongs={selectedSongs} />
              <PlaylistSelector selectedSongs={selectedSongs} />
            </div>
          }
        />
        <Route path="/playlist/:name" element={<PlaylistViewer />} />
        <Route path="/CreatePlaylistPage" element={<CreatePlaylistPage />} />
                <Route path="/premium" element={<PremiumPage />} />
                <Route path="/create" element={<Create />} />

      </Routes>
    </Router>

  );
}

export default App;
