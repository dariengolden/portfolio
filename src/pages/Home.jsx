import React from "react";

const Home = () => (
  <div className="home" style={{ position: 'relative', height: '100%', minHeight: '80vh' }}>
    <h1 className="home-title">Darien Golden</h1>
    <div className="home-video-container">
      <video
        src="/elpida_01.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="home-video"
      />
    </div>
  </div>
);

export default Home; 