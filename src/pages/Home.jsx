import React, { Suspense, lazy, useState } from "react";
import { motion } from "framer-motion";
import { heroVideo } from "../data/videos";
import CursorLines from "../components/CursorLines";

// Lazy load Mux Player for better performance
const MuxPlayer = lazy(() => import("@mux/mux-player-react"));

const Home = () => {
  // Check if hero video is configured
  const hasValidHeroVideo = heroVideo.playbackId && heroVideo.playbackId !== "YOUR_MUX_PLAYBACK_ID_HERO";
  
  // State to track video loading
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Remove unused scroll transforms to improve performance

  return (
    <div className="home">
      {/* Title positioned at the very top with cursor-following lines */}
      <div className="home-title-wrapper">
        <CursorLines side="left" count={14} spacing={6} />
        <h1 className="home-title">Darien Golden</h1>
        <CursorLines side="right" count={14} spacing={6} />
      </div>
      
      {/* Video positioned below the title */}
      <div className="home-video-wrapper">
        <div className="home-video-container">
            {hasValidHeroVideo ? (
              <Suspense fallback={
                <div className="home-video-loading" style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 2
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div className="loading-spinner" style={{ margin: "0 auto 1rem" }}></div>
                    Loading...
                  </div>
                </div>
              }>
                <MuxPlayer
                  playbackId={heroVideo.playbackId}
                  streamType="on-demand"
                  autoPlay="muted"
                  loop
                  muted
                  preload="auto"
                  playsInline
                  onLoadStart={() => setVideoLoaded(false)}
                  onLoadedData={() => setVideoLoaded(true)}
                  onCanPlay={() => setVideoLoaded(true)} // Additional event for better loading detection
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Changed from 'contain' to 'cover' to fill container
                    opacity: videoLoaded ? 1 : 0,
                    transition: "opacity 0.2s ease-out"
                  }}
                  className="home-video"
                />
              </Suspense>
            ) : (
              // Fallback to local video if Mux not configured
              <video
                src="/Portfolio cover.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadStart={() => setVideoLoaded(false)}
                onLoadedData={() => setVideoLoaded(true)}
                onCanPlay={() => setVideoLoaded(true)} // Additional event for better loading detection
                style={{
                  opacity: videoLoaded ? 1 : 0,
                  transition: "opacity 0.2s ease-out"
                }}
                className="home-video"
              />
            )}
          </div>
        </div>
    </div>
  );
};

export default Home; 