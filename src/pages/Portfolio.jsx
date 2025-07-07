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

const sidebarBtnStyle = (active) => ({
  background: 'none',
  border: 'none',
  borderRadius: 0,
  color: active ? '#111' : '#aaa',
  fontWeight: 500,
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  fontSize: 16,
  outline: 'none',
  transition: 'color 0.15s',
});

const Portfolio = () => {
  const [selected, setSelected] = useState("videos");
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ display: 'flex', maxWidth: 1000, margin: '2rem auto', minHeight: 500 }}>
      {/* Sidebar */}
      <aside style={{ minWidth: 160, borderRight: '1px solid #eee', padding: '1.5rem 1rem 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {['videos', 'photos'].map((type) => (
          <button
            key={type}
            onClick={() => setSelected(type)}
            onMouseEnter={() => setHovered(type)}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...sidebarBtnStyle(selected === type),
              color: hovered === type || selected === type ? '#111' : '#aaa',
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </aside>
      {/* Main content */}
      <section style={{ flex: 1, padding: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>{selected.charAt(0).toUpperCase() + selected.slice(1)}</h2>
        {selected === "videos" && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {videos.map((video, idx) => (
              <div key={idx} style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', background: '#fff' }}>
                <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                  <iframe
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  ></iframe>
                </div>
                <div style={{ padding: '0.5rem', textAlign: 'center', fontSize: 16, color: '#333' }}>{video.title}</div>
              </div>
            ))}
          </div>
        )}
        {selected === "photos" && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {photos.map((photo, idx) => (
              <div key={idx} style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', background: '#fff' }}>
                <img src={photo.url} alt={photo.title} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
                <div style={{ padding: '0.5rem', textAlign: 'center', fontSize: 16, color: '#333' }}>{photo.title}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio; 