import React, { useState, useEffect } from "react";
import PortfolioSidebar from "../components/PortfolioSidebar";
import VideoPlayer from "../components/VideoPlayer";
import ScrollAnimation from "../components/ScrollAnimation";
import { getVideosByCategory, getAllVideos } from "../data/videos";

// Legacy details object - previously used for category-based descriptions
// Now individual videos have their own descriptions in videos.js
// This could be repurposed for Photo and Design categories in the future
const details = {
  "Social Media Reel": {
    title: "Summer Vibes Collection",
    description:
      "A vibrant social media series capturing the essence of summer adventures. This collection features dynamic transitions, trending music, and engaging storytelling that increased engagement by 300% across platforms.",
  },
  Corporate: {
    title: "Tech Startup Brand Video",
    description: "Professional corporate video for a leading tech startup, showcasing their innovative solutions and company culture. Features clean animations, executive interviews, and a compelling narrative arc.",
  },
  "Short Film": {
    title: "The Last Journey",
    description: "An emotional short film exploring themes of loss and redemption. Winner of the Independent Film Festival award for Best Narrative Short, featuring stunning cinematography and powerful performances.",
  },
  Campaign: {
    title: "Environmental Awareness Campaign",
    description: "Multi-platform campaign video for a non-profit organization focused on climate action. Includes powerful visuals, impactful messaging, and calls-to-action that drove 50K+ petition signatures.",
  },
  "Passion Project": {
    title: "Urban Exploration Documentary",
    description: "Personal documentary project exploring hidden gems in the city. A labor of love combining travel footage, local interviews, and original music to showcase the beauty of urban discovery.",
  },
  Advertisement: {
    title: "Luxury Watch Commercial",
    description: "High-end product advertisement for a premium watch brand. Features cinematic storytelling, premium production values, and sophisticated editing that highlights the product's elegance and craftsmanship.",
  },
  "Portrait Session": {
    title: "Executive Headshots",
    description: "Professional portrait photography session for corporate executives. Clean, modern aesthetic with perfect lighting and composition that conveys confidence and professionalism.",
  },
  "Event Photography": {
    title: "Corporate Gala",
    description: "Dynamic event photography capturing the energy and atmosphere of a corporate gala. Includes candid moments, group shots, and key speeches that tell the complete story of the evening.",
  },
  "Product Shots": {
    title: "E-commerce Product Photography",
    description: "High-quality product photography for an online fashion retailer. Clean, professional shots with consistent lighting and styling that showcase products in their best light.",
  },
  Landscape: {
    title: "Mountain Sunrise",
    description: "Breathtaking landscape photography capturing the beauty of nature at dawn. Features dramatic lighting, stunning compositions, and the raw power of natural landscapes.",
  },
  "Street Photography": {
    title: "Urban Life Series",
    description: "Candid street photography capturing the essence of city life. Raw, authentic moments that tell stories about people, places, and the human experience in urban environments.",
  },
  "Brand Identity": {
    title: "Tech Startup Rebrand",
    description: "Complete brand identity design for a growing tech company. Includes logo design, color palette, typography, and brand guidelines that establish a modern, innovative identity.",
  },
  "Web Design": {
    title: "E-commerce Website",
    description: "Modern, responsive web design for an online marketplace. Clean interface, intuitive navigation, and optimized user experience that drives conversions and customer satisfaction.",
  },
  "Print Materials": {
    title: "Annual Report Design",
    description: "Professional print design for corporate annual reports. Sophisticated layouts, data visualization, and compelling storytelling that effectively communicates business achievements.",
  },
  "Logo Design": {
    title: "Minimalist Logo Collection",
    description: "Clean, modern logo designs for various clients. Minimalist approach with strong visual impact, scalability, and versatility across different media and applications.",
  },
  "UI/UX": {
    title: "Mobile App Interface",
    description: "User-centered design for a productivity mobile app. Intuitive interface, smooth interactions, and thoughtful user experience that makes complex tasks feel simple and enjoyable.",
  },
};

const defaultCategory = "Corporate";

const Portfolio = () => {
  const [selected, setSelected] = useState(defaultCategory);
  const [hovered, setHovered] = useState(null);
  
  // Get videos for current category
  const currentVideos = getVideosByCategory(selected);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  
  // Get the currently selected video
  const currentVideo = currentVideos?.[selectedVideoIndex] || currentVideos?.[0];

  const handleVideoSelect = (videoIndex) => {
    setSelectedVideoIndex(videoIndex);
  };

  const handleCategoryChange = (category) => {
    setSelected(category);
    setSelectedVideoIndex(0); // Reset to first video when changing categories
  };

  if (!currentVideo) {
    return (
      <div className="portfolio-container">
        <div className="portfolio-inner-wrapper">
          <ScrollAnimation direction="left" duration={0.8}>
            <PortfolioSidebar
              selected={selected}
              onSelect={handleCategoryChange}
              hovered={hovered}
              onHover={setHovered}
            />
          </ScrollAnimation>
          <section className="portfolio-content">
            <div style={{ 
              padding: "2rem", 
              textAlign: "center",
              color: "var(--text-muted)"
            }}>
              No videos available for this category yet.
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <div className="portfolio-inner-wrapper">
        <ScrollAnimation direction="left" duration={0.8}>
          <PortfolioSidebar
            selected={selected}
            onSelect={handleCategoryChange}
            hovered={hovered}
            onHover={setHovered}
          />
        </ScrollAnimation>
        <section className="portfolio-content">
          <div className="youtube-layout">
            {/* Main Video Player Section */}
            <div className="main-video-section">
              <ScrollAnimation direction="up" delay={0.1} duration={0.8}>
                <div className="main-video-player">
                  <VideoPlayer
                    key={`${currentVideo.id}-${selectedVideoIndex}`} // Force re-render on video change
                    playbackId={currentVideo.playbackId}
                    src={currentVideo.src}
                    title={currentVideo.title}
                    autoPlay={false}
                    staticSize={true}
                    adaptiveSize={true}
                  />
                </div>
              </ScrollAnimation>
              
              {/* Video Details Below Player */}
              <ScrollAnimation direction="up" delay={0.2} duration={0.8}>
                <div className="video-details">
                  <h2 className="video-title">{currentVideo.title}</h2>
                  <div className="video-metadata">
                    {currentVideo.metadata?.client && (
                      <div className="video-client">{currentVideo.metadata.client}</div>
                    )}
                    {currentVideo.metadata?.year && (
                      <div className="video-year">{currentVideo.metadata.year}</div>
                    )}
                  </div>
                  <div className="video-description">
                    <p>{currentVideo.description || "Description not available."}</p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Playlist Sidebar */}
            <ScrollAnimation direction="right" delay={0.3} duration={0.8}>
              <div className="playlist-sidebar">
                <div className="playlist-header">
                  <h3>{selected}</h3>
                  <span className="playlist-count">{currentVideos.length} videos</span>
                </div>
                <div className="playlist-content">
                  {currentVideos.map((video, index) => {
                    // Generate thumbnail URL for playlist items
                    const muxThumbnailUrl = video.playbackId && !video.playbackId.startsWith("YOUR_MUX_PLAYBACK_ID")
                      ? `https://image.mux.com/${video.playbackId}/thumbnail.jpg?width=168&height=94&fit_mode=smartcrop&time=0`
                      : null;
                    const thumbnailUrl = video.thumbnail || muxThumbnailUrl;

                    return (
                      <div 
                        key={video.id}
                        className={`playlist-item ${index === selectedVideoIndex ? 'active' : ''}`}
                        onClick={() => handleVideoSelect(index)}
                      >
                        <div className="playlist-thumbnail">
                          {thumbnailUrl ? (
                            <img 
                              src={thumbnailUrl} 
                              alt={video.title}
                              loading="lazy"
                            />
                          ) : (
                            <div className="placeholder-thumbnail">
                              🎬
                            </div>
                          )}

                          <div className="play-overlay">
                            <div className="play-icon"></div>
                          </div>
                        </div>
                        <div className="playlist-info">
                          <h4 className="playlist-title">{video.title}</h4>
                          {video.metadata?.client && (
                            <p className="playlist-client">{video.metadata.client}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio; 
