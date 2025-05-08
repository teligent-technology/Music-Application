import React, { useState } from "react";
import { Link } from "react-router-dom";
import {haryanviSongs } from '../data/song'
import AudioPlayer from "../Components/AudioPlayer";




const Haryanvi = () => {
  return <div > 
     <h2 className="text-white mb-2"> HARYANVI SONGS</h2>
 

  <nav style={{ marginBottom: "20px" }}>
  <div 
  style={{ marginTop: 60 }} className="d-flex justify-content-center gap-5"
  >
  <Link to="/punjabi" style={{ color: "white", textDecoration: "none" }}>PUNJABI</Link>
  <Link to="/bhojpuri" style={{ color: "white", textDecoration: "none" }}>BHOJPURI</Link>
  <Link to="/haryanvi" style={{ color: "white", textDecoration: "none" }}>HARYANVI</Link>
</div>

      </nav>
      
      <AudioPlayer songsList={haryanviSongs} />
        
    

  </div>;
};

export default Haryanvi;
