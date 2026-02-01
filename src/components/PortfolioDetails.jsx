import React from "react";

const PortfolioDetails = ({ title, description, metadata }) => (
  <div className="portfolio-details">
    <h2 className="portfolio-details-title">{title}</h2>
    <p className="portfolio-details-desc">{description}</p>
    {metadata && (
      <>
        <div className="portfolio-details-meta">
          {metadata.client && (
            <div className="meta-item">
              <span className="meta-label">Client:</span>
              <span className="meta-value">{metadata.client}</span>
            </div>
          )}
          {metadata.year && (
            <div className="meta-item">
              <span className="meta-label">Year:</span>
              <span className="meta-value">{metadata.year}</span>
            </div>
          )}
        </div>

      </>
    )}
  </div>
);

export default PortfolioDetails; 