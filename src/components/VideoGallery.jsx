import React from "react";

const videos = [
  {
    title: "Showreel 2024",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Travel Film",
    url: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
  // Add more videos as needed
];

const VideoGallery = () => (
  <div className="video-gallery">
    {videos.map((video, idx) => (
      <div className="video-item" key={idx}>
        <div className="video-responsive">
          <iframe
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <p className="video-title">{video.title}</p>
      </div>
    ))}
  </div>
);

export default VideoGallery; 