import React from "react";

const PortfolioGrid = ({ type }) => {
  // Sample portfolio items with placeholder content
  const portfolioItems = [
    {
      id: 1,
      title: "Project Alpha",
      size: "large",
      type: "video",
      thumbnail: "🎬",
      duration: "2:30"
    },
    {
      id: 2,
      title: "Brand Story",
      size: "medium",
      type: "video",
      thumbnail: "📹",
      duration: "1:45"
    },
    {
      id: 3,
      title: "Product Demo",
      size: "medium",
      type: "video",
      thumbnail: "🎥",
      duration: "3:15"
    },
    {
      id: 4,
      title: "Quick Edit",
      size: "small",
      type: "video",
      thumbnail: "✂️",
      duration: "0:30"
    },
    {
      id: 5,
      title: "Behind Scenes",
      size: "small",
      type: "video",
      thumbnail: "🎭",
      duration: "1:20"
    },
    {
      id: 6,
      title: "Testimonial",
      size: "small",
      type: "video",
      thumbnail: "💬",
      duration: "0:45"
    }
  ];

  return (
    <div className="portfolio-grid">
      {portfolioItems.map((item) => (
        <div key={item.id} className={`portfolio-item ${item.size}`}>
          <div className="item-container">
            <div className="item-thumbnail">
              <span className="thumbnail-icon">{item.thumbnail}</span>
              <div className="play-overlay">
                <span className="play-icon">▶️</span>
              </div>
            </div>
            <div className="item-info">
              <h4 className="item-title">{item.title}</h4>
              <span className="item-duration">{item.duration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioGrid; 