import React from "react";
import ScrollAnimation from "../components/ScrollAnimation";

const About = () => (
  <div className="about">
    <ScrollAnimation direction="up" duration={0.8}>
      <h2 className="about-title">About</h2>
    </ScrollAnimation>
    <ScrollAnimation direction="up" delay={0.2} duration={0.8}>
      <p className="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget vestibulum turpis. Quisque facilisis risus in magna ultricies semper. Suspendisse ultrices ipsum ac urna iaculis pharetra. Sed blandit dolor lectus, in malesuada turpis tincidunt sit amet. Aenean malesuada nec dui sed vehicula. Pellentesque interdum tincidunt eros. Cras auctor lobortis cursus. Nullam sem eros, porttitor eget aliquet non, tempus vitae mi. Morbi ultrices nec lectus a gravida. Donec consectetur elementum sem quis consequat.</p>
    </ScrollAnimation>
  </div>
);

export default About; 
