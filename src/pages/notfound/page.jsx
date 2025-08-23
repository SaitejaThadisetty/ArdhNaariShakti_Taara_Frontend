import React from "react";
import "./notfound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-glow"></div>
      <div className="notfound-content">
        <h1>404</h1>
        <h2>Lost in Space</h2>
        <p>
          Looks like you’ve drifted away from the right orbit.  
          The page you’re seeking has vanished into another galaxy!
        </p>
        <a href="/" className="home-btn">🚀 Back to Home</a>
      </div>
    </div>
  );
}
