import React from "react";

const PortfolioDetails = ({ title, description }) => (
  <div className="portfolio-details">
    <h2 className="portfolio-details-title">{title}</h2>
    <p className="portfolio-details-desc">{description}</p>
  </div>
);

export default PortfolioDetails; 