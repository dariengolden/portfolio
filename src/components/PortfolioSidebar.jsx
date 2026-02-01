import React, { useMemo } from "react";
import { videoData } from "../data/videos";

const sections = [
  {
    title: "VIDEO",
    categories: [
      "Corporate",
      "Reels",
      "Short Film",
      "Personal",
    ],
  },
  {
    title: "PHOTO",
    categories: [
      "Portrait",
      "Street",
    ],
  },
  {
    title: "DESIGN",
    categories: [
      "UI/UX",
      "Print",
    ],
  },
];

const sidebarWidth = 110;

const PortfolioSidebar = ({ selected, onSelect, hovered, onHover }) => {
  // Calculate which categories have videos
  const categoriesWithContent = useMemo(() => {
    return new Set(Object.keys(videoData));
  }, []);

  return (
    <aside className="portfolio-sidebar">
      {sections.map((section) => (
        <div key={section.title} className="sidebar-section">
          <div className="sidebar-section-title">
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
                  cursor: hasContent ? 'pointer' : 'not-allowed',
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
