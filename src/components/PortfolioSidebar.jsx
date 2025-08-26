import React from "react";

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
      "Advertisement"
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
      "Advertisement"
    ],
  },
];

const sidebarWidth = 200;

const PortfolioSidebar = ({ selected, onSelect, hovered, onHover }) => (
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
        {section.categories.map((cat) => (
          <button
            key={cat}
            className={`sidebar-btn ${selected === cat ? "active" : ""} ${hovered === cat ? "hovered" : ""}`}
            onClick={() => onSelect(cat)}
            onMouseEnter={() => onHover(cat)}
            onMouseLeave={() => onHover(null)}
            style={{
              display: 'block',
              background: 'none',
              border: 'none',
              fontWeight: 'normal',
              fontSize: '1.05rem',
              marginBottom: '1rem',
              cursor: 'pointer',
              textAlign: 'right',
              padding: 0,
              width: '100%',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    ))}
  </aside>
);

export default PortfolioSidebar; 