import React, { useMemo } from "react";
import { videoData } from "../data/videos";

const sections = [
  {
    title: "VIDEO",
    categories: [
      "Social Media Reel",
      "Corporate",
      "Short Film",
      "Campaign",
      "Passion Project",
      "Advertisement",
    ],
  },
  {
    title: "PHOTO",
    categories: [
      "Portrait Session",
      "Event Photography",
      "Product Shots",
      "Landscape",
      "Street Photography",
    ],
  },
  {
    title: "DESIGN",
    categories: [
      "Brand Identity",
      "Web Design",
      "Print Materials",
      "Logo Design",
      "UI/UX",
    ],
  },
];

const sidebarWidth = 200;

const PortfolioSidebar = ({ selected, onSelect, hovered, onHover }) => {
  // Calculate which categories have videos
  const categoriesWithContent = useMemo(() => {
    return new Set(Object.keys(videoData));
  }, []);

  return (
    <aside
      className="portfolio-sidebar"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        textAlign: 'right',
        height: '100%',
        justifyContent: 'center',
        width: sidebarWidth,
        minWidth: sidebarWidth,
        maxWidth: sidebarWidth,
      }}
    >
      {sections.map((section) => (
        <div key={section.title} className="sidebar-section" style={{ marginBottom: '2rem', width: '100%' }}>
          <div
            className="sidebar-section-title"
            style={{ marginBottom: '0.5rem', textAlign: 'right', width: '100%' }}
          >
            {section.title}
          </div>
          {section.categories.map((cat) => {
            const hasContent = categoriesWithContent.has(cat);
            return (
              <button
                key={cat}
                className={`sidebar-btn ${selected === cat ? "active" : ""} ${hovered === cat ? "hovered" : ""} ${!hasContent ? "disabled" : ""}`}
                onClick={() => hasContent && onSelect(cat)}
                onMouseEnter={() => hasContent && onHover(cat)}
                onMouseLeave={() => onHover(null)}
                disabled={!hasContent}
                style={{
                  display: 'block',
                  background: 'none',
                  border: 'none',
                  fontWeight: 'normal',
                  fontSize: '1.05rem',
                  marginBottom: '1rem',
                  cursor: hasContent ? 'pointer' : 'not-allowed',
                  textAlign: 'right',
                  padding: 0,
                  width: '100%',
                  opacity: hasContent ? 1 : 0.3,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
};

export default PortfolioSidebar; 