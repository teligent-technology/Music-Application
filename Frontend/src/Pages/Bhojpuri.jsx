import React from "react";
import { Link } from "react-router-dom";
import {bhojpuriSongs } from '../data/song'
import AudioPlayer from "../Components/AudioPlayer";




const BhojPuri = () => {
  return <div > 
     <h2 className="text-white"> BHOJPURI SONGS</h2>
   
  
    <nav style={{ marginBottom: "20px" }}>
    <div 
    style={{ marginTop: 60 }} className="d-flex justify-content-center gap-5"
    >
    <Link to="/punjabi" style={{ color: "white", textDecoration: "none" }}>PUNJABI</Link>
    <Link to="/bhojpuri" style={{ color: "white", textDecoration: "none" }}>BHOJPURI</Link>
    <Link to="/haryanvi" style={{ color: "white", textDecoration: "none" }}>HARYANVI</Link>
  </div>
  
        </nav>
  
      <AudioPlayer songsList={bhojpuriSongs} />
  

  </div>;
};

export default BhojPuri;
