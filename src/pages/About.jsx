import React from "react";
import ScrollAnimation from "../components/ScrollAnimation";

const About = () => {
  return (
    <div className="about">
      <div className="about-content">
        <div className="about-image-section">
          <ScrollAnimation direction="up" duration={0.8}>
            <img src="/pictures/main.png" alt="Darien Golden" className="about-image" />
          </ScrollAnimation>
        </div>
        <div className="about-text-section">
          <ScrollAnimation direction="up" duration={0.8}>
            <h2 className="about-title">About</h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.2} duration={0.8}>
            <p className="about-text">Hey, I'm Darien. Making videos is among the top things I spend my time doing. Other top things include playing music on the guitar and tech. The latter mentioned is largely due to my academic foundation in Information Technology.</p>
            {/* <br></br> */}
            <p className="about-text">
              I don't think creativity is exclusive. I think all of us are creative depending on how inspired we feel.
            </p>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default About;
