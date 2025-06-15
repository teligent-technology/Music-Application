import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

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
import Settings from './Components/Setting';
import PremiumPage from './Components/PremiumPage';
import Create from './Components/Create';
import RecentSearch from "./Components/RecentSearch";

// Route wrappers
import ProtectedRoute from './Components/ProtectedRoute';
import PremiumRoute from './Components/PremiumRoute';

function App() {
  const [selectedSongs, setSelectedSongs] = useState([]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/punjabi" element={<ProtectedRoute><Punjabi /></ProtectedRoute>} />
      <Route path="/player/:artistName/:songId" element={<ProtectedRoute><SpotifyPlayer /></ProtectedRoute>} />
      <Route path="/artist/:name" element={<ProtectedRoute><ArtistSongs /></ProtectedRoute>} />
      <Route path="/recents" element={<ProtectedRoute><Recents /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/audio" element={<ProtectedRoute><AudioPlayer /></ProtectedRoute>} />
      <Route path="/CreatePlaylistPage" element={<ProtectedRoute><CreatePlaylistPage /></ProtectedRoute>} />
      <Route path="/premium" element={<ProtectedRoute><PremiumPage /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
      <Route path="/recent-search" element={<RecentSearch username={localStorage.getItem("username")} />} />

      {/* Premium-only routes */}
      <Route
        path="/playlist"
        element={
          <PremiumRoute>
            <div className="container">
              <Playlist selectedSongs={selectedSongs} setSelectedSongs={setSelectedSongs} />
              <PlaylistCreator selectedSongs={selectedSongs} />
              <PlaylistSelector selectedSongs={selectedSongs} />
            </div>
          </PremiumRoute>
        }
      />
      <Route
        path="/playlist/:name"
        element={
          <PremiumRoute>
            <PlaylistViewer />
          </PremiumRoute>
        }
      />
    </Routes>
  );
}

export default App;
