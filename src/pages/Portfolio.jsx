import React, { useState } from "react";
import PortfolioSidebar from "../components/PortfolioSidebar";
import PortfolioGrid from "../components/PortfolioGrid";
import PortfolioDetails from "../components/PortfolioDetails";
import VideoModal from "../components/VideoModal";
import ScrollAnimation from "../components/ScrollAnimation";
import { getVideosByCategory } from "../data/videos";

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

const defaultCategory = "Social Media Reel";

const Portfolio = () => {
  const [selected, setSelected] = useState(defaultCategory);
  const [hovered, setHovered] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  // Get current category videos to show metadata
  const currentVideos = getVideosByCategory(selected);
  const firstVideo = currentVideos?.[0];

  return (
    <>
      <div className="portfolio-container">
        <ScrollAnimation direction="left" duration={0.8}>
          <PortfolioSidebar
            selected={selected}
            onSelect={setSelected}
            hovered={hovered}
            onHover={setHovered}
          />
        </ScrollAnimation>
        <section className="portfolio-content">
          <div className="portfolio-main-grid">
            <ScrollAnimation direction="up" delay={0.1} duration={0.8}>
              <PortfolioGrid 
                category={selected}
                onVideoClick={handleVideoClick}
              />
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={0.3} duration={0.8}>
              <PortfolioDetails
                title={details[selected]?.title || "Title"}
                description={details[selected]?.description || "Description."}
                metadata={firstVideo?.metadata}
              />
            </ScrollAnimation>
          </div>
        </section>
      </div>
      
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Portfolio; 
