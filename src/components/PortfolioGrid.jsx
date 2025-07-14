import React from "react";

const PortfolioGrid = ({ type }) => {
  // Layout based on screenshot: 2 large, 2 medium, 3 small boxes
  return (
    <div className="portfolio-grid">
      <div className="placeholder large" />
      <div className="placeholder medium" />
      <div className="placeholder medium" />
      <div className="placeholder small" />
      <div className="placeholder small" />
      <div className="placeholder small" />
    </div>
  );
};

export default PortfolioGrid; 