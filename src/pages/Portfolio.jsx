import React, { useState } from "react";

import PortfolioSidebar from "../components/PortfolioSidebar";
import PortfolioGrid from "../components/PortfolioGrid";
import PortfolioDetails from "../components/PortfolioDetails";

const details = {
  "Social Media Reel": {
    title: "Graduation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit augue nibh. Nulla facilisis libero lacinia neque vestibulum, vel lacinia.",
  },
  Corporate: {
    title: "Corporate Video",
    description: "Description for Corporate Video.",
  },
  "Short Film": {
    title: "Short Film",
    description: "Description for Short Film.",
  },
  Campaign: {
    title: "Campaign",
    description: "Description for Campaign.",
  },
  "Passion Project": {
    title: "Passion Project",
    description: "Description for Passion Project.",
  },
  Advertisement: {
    title: "Advertisement",
    description: "Description for Advertisement.",
  },
};

const defaultCategory = "Social Media Reel";

const Portfolio = () => {
  const [selected, setSelected] = useState(defaultCategory);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="portfolio-container">
      <PortfolioSidebar
        selected={selected}
        onSelect={setSelected}
        hovered={hovered}
        onHover={setHovered}
      />
      <section className="portfolio-content">
        <div className="portfolio-main-grid">
          <PortfolioGrid type="video" />
          <PortfolioDetails
            title={details[selected]?.title || "Title"}
            description={details[selected]?.description || "Description."}
          />
        </div>
      </section>
    </div>
  );
};

export default Portfolio; 