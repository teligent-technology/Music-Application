import React from "react";
import { Link } from "react-router-dom";
import { Songs } from "../data/song";
import AudioPlayer from "../Components/AudioPlayer";

const Punjabi = () => {
  console.log("Songs in Punjabi component:", Songs);

  return (
    <div
      className="bg-dark text-white"
      
      style={{
        // backgroundImage: "url(''/public/background.jpg'cd')", // Make sure this path is correct
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // minHeight: "100vh",
        // paddingTop: "40px",
        // paddingBottom: "40px"
      }} >
     
      <Link
      to="/home"
      className="btn btn-outline-light"
      style={{ fontSize: "1.1rem" }}
    >
      Go to Home
    </Link>
      <nav style={{ marginBottom: "20px" }}>
      <div 
      style={{ marginTop: 60 }} className="d-flex justify-content-center gap-5"
      >
<Link
              to="/playlist"
              className="btn btn-light text-dark"
              style={{ fontSize: "1.1rem" }}
            >
              Create Custom Playlist
            </Link>  
    </div>
    
          </nav>

      <AudioPlayer songsList={Songs} />
  
    </div>
  );
};

export default Punjabi;
