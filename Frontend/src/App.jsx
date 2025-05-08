import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './Signup';
import Login from './Login';
import Punjabi from './Pages/Punjabi'; 
import Haryanvi from './Pages/Haryanvi';
import Bhojpuri from './Pages/Bhojpuri';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/punjabi" element={<Punjabi />} />
        <Route path="/Haryanvi" element={<Haryanvi />} />
        <Route path="/Bhojpuri" element={<Bhojpuri />} />

      </Routes>
    </Router>
  );
}

export default App;
