import React, { useState } from "react";

const videos = [
  {
    title: "Showreel 2024",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Travel Film",
    url: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },
];

const photos = [
  {
    title: "Sunset Beach",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    title: "City Lights",
    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
];

const Portfolio = () => {
  const [selected, setSelected] = useState("videos");
  const [hovered, setHovered] = useState(null);

  return (
    <div className="portfolio-container">
      {/* Sidebar */}
      <aside className="portfolio-sidebar">
        {['videos', 'photos'].map((type) => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            onMouseEnter={() => setHovered(type)}
            onMouseLeave={() => setHovered(null)}
            className={`sidebar-btn ${selected === type ? 'active' : ''} ${hovered === type ? 'hovered' : ''}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </aside>
      {/* Main content */}
      <section className="portfolio-content">
        <h2 className="portfolio-title">{selected.charAt(0).toUpperCase() + selected.slice(1)}</h2>
        {selected === "videos" && (
          <div className="portfolio-grid">
            {videos.map((video, idx) => (
              <div key={idx} className="portfolio-card">
                <div className="video-container">
                  <iframe
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="card-title">{video.title}</div>
              </div>
            ))}
          </div>
        )}
        {selected === "photos" && (
          <div className="portfolio-grid">
            {photos.map((photo, idx) => (
              <div key={idx} className="portfolio-card">
                <img src={photo.url} alt={photo.title} className="photo-image" />
                <div className="card-title">{photo.title}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio; 