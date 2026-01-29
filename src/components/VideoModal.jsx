import React, { useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

const VideoModal = ({ video, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    
    // Close on Escape key
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleEscape);
    
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!video) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="video-modal-player">
          <VideoPlayer 
            playbackId={video.playbackId}
            title={video.title}
            autoPlay={true}
          />
        </div>
        <div className="video-modal-info">
          <h2 className="video-modal-title">{video.title}</h2>
          <div className="video-modal-meta">
            <span className="video-modal-duration">{video.duration}</span>
            {video.metadata?.client && (
              <span className="video-modal-client">{video.metadata.client}</span>
            )}
            {video.metadata?.year && (
              <span className="video-modal-year">{video.metadata.year}</span>
            )}
          </div>
          {video.metadata?.tags && (
            <div className="video-modal-tags">
              {video.metadata.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
