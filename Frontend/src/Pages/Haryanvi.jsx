import React, { useState } from "react";
import { Link } from "react-router-dom";
import {haryanviSongs } from '../data/song'
import AudioPlayer from "../Components/AudioPlayer";




const Haryanvi = () => {
  return <div
  className="bg-dark text-white"
  style={{
    backgroundImage: "url(''/public/background.jpg'cd')", // Make sure this path is correct
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    paddingTop: "40px",
    paddingBottom: "40px"
  }} >
     <h2 className="text-white mb-2" style={{marginLeft: "120px"}}> HARYANVI SONGS</h2>
 

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
