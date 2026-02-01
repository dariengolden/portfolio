import React, { Suspense, lazy } from "react";

// Lazy load Mux Player for better performance
const MuxPlayer = lazy(() => import("@mux/mux-player-react"));

const VideoPlayer = ({ playbackId, src, poster, title, onClose, autoPlay = false, staticSize = false, adaptiveSize = false }) => {
  // Check if using local file (src prop) or Mux (playbackId)
  const isLocalVideo = src && !playbackId;
  
  if (!playbackId && !src) {
    return (
      <div style={{ 
        padding: "2rem", 
        textAlign: "center",
        color: "var(--text-muted)" 
      }}>
        No video available
      </div>
    );
  }

  // Enhanced container styles for better video fitting
  const containerStyles = staticSize ? {
    width: "100%",
    height: "100%", // Will be controlled by parent container
    backgroundColor: "black", // Letterbox background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden" // Prevent any overflow issues
  } : {
    width: "100%",
    position: "relative"
  };

  // Improved video styles for better vertical video support
  const videoStyles = staticSize ? {
    width: "100%",
    height: "100%",
    objectFit: adaptiveSize ? "cover" : "contain", // Use cover for better vertical video fill
    objectPosition: "center"
  } : {
    width: "100%",
    aspectRatio: "16/9"
  };

  // Use native HTML5 video for local files
  if (isLocalVideo) {
    return (
      <div className="mux-video-container" style={containerStyles}>
        <video
          src={src}
          poster={poster}
          controls
          autoPlay={autoPlay}
          muted={autoPlay}
          playsInline
          style={{
            ...videoStyles,
            backgroundColor: staticSize ? "transparent" : "var(--video-bg)"
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Use Mux Player for Mux videos
  return (
    <div className="mux-video-container" style={containerStyles}>
      <Suspense fallback={
        <div style={{ 
          width: "100%",
          height: "100%",
          background: "var(--video-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)",
          fontSize: "1rem",
          borderRadius: "8px"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem"
          }}>
            <div className="loading-spinner"></div>
            Loading video...
          </div>
        </div>
      }>
        <MuxPlayer
          playbackId={playbackId}
          poster={poster}
          streamType="on-demand"
          autoPlay={autoPlay ? "muted" : false}
          preload="metadata"
          style={staticSize ? {
            width: "100%",
            height: "100%",
            objectFit: adaptiveSize ? "cover" : "contain",
            objectPosition: "center"
          } : {
            width: "100%",
            aspectRatio: "16/9"
          }}
        />
      </Suspense>
    </div>
  );
};

export default VideoPlayer;
