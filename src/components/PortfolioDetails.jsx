import React from "react";

const PortfolioDetails = ({ title, description }) => (
  <div className="portfolio-details">
    <h2 className="portfolio-details-title">{title}</h2>
    <p className="portfolio-details-desc">{description}</p>
    <div className="portfolio-details-meta">
      <div className="meta-item">
        <span className="meta-label">Client:</span>
        <span className="meta-value">Sample Client</span>
      </div>
      <div className="meta-item">
        <span className="meta-label">Duration:</span>
        <span className="meta-value">2:30</span>
      </div>
      <div className="meta-item">
        <span className="meta-label">Year:</span>
        <span className="meta-value">2024</span>
      </div>
    </div>
    <div className="portfolio-details-tags">
      <span className="tag">Video Editing</span>
      <span className="tag">Color Grading</span>
      <span className="tag">Motion Graphics</span>
    </div>
  </div>
);

export default PortfolioDetails; 