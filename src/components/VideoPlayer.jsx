import React, { Suspense, lazy } from "react";

// Lazy load Mux Player for better performance
const MuxPlayer = lazy(() => import("@mux/mux-player-react"));

const VideoPlayer = ({ playbackId, src, poster, title, onClose, autoPlay = false }) => {
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

  // Use native HTML5 video for local files
  if (isLocalVideo) {
    return (
      <div className="mux-video-container">
        <video
          src={src}
          poster={poster}
          controls
          autoPlay={autoPlay}
          muted={autoPlay}
          playsInline
          style={{
            width: "100%",
            aspectRatio: "16/9",
            backgroundColor: "var(--video-bg)"
          }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Use Mux Player for Mux videos
  return (
    <div className="mux-video-container">
      <Suspense fallback={
        <div style={{ 
          aspectRatio: "16/9", 
          background: "var(--video-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-muted)"
        }}>
          Loading player...
        </div>
      }>
        <MuxPlayer
          playbackId={playbackId}
          poster={poster}
          title={title}
          streamType="on-demand"
          autoPlay={autoPlay ? "muted" : false}
          preload="metadata"
          style={{
            width: "100%",
            aspectRatio: "16/9"
          }}
        />
      </Suspense>
    </div>
  );
};

export default VideoPlayer;
