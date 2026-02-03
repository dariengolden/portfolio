import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import "./App.css";

function NavBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [navTop, setNavTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate navbar position
      // With new layout: title (approx 60px) + video (calc(100vh / 1.6)) + top margin (2rem = 32px) + spacing
      // The nav should start below the video content, then move up with scroll
      const titleHeight = 60; // Approximate height of title + margins
      const videoHeight = windowHeight / 1.6; // Height of video (updated aspect ratio)
      const videoTopMargin = 32; // 2rem top margin added to video
      const homeContentHeight = titleHeight + videoHeight + videoTopMargin + 32; // Add video margin and spacing
      
      // Start navbar below the home content, move up with scroll, stick at top (2rem = 32px for higher position)
      const initialBottom = homeContentHeight + 60; // Starting position from top of viewport
      const finalTop = 20; // 2rem in pixels - higher position
      
      // Calculate new position based on scroll
      let newTop = initialBottom - scrollPosition;
      
      // Clamp to stick at top
      if (newTop < finalTop) {
        newTop = finalTop;
      }
      
      setNavTop(newTop);

      // Detect which section is in view
      const sections = ["home", "portfolio", "about"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="nav" style={{ top: `${navTop}px` }}>
      {[
        { id: "home", label: "Home" },
        { id: "portfolio", label: "Portfolio" },
        { id: "about", label: "About" }
      ].map(link => (
        <button
          key={link.id}
          onClick={() => scrollToSection(link.id)}
          className={`nav-link ${activeSection === link.id ? "active" : ""}`}
        >
          {link.label}
        </button>
      ))}
      <ThemeToggle />
    </nav>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="single-page-container">
        <NavBar />
        <main className="scroll-container">
          <section id="home" className="section section-home">
            <Home />
          </section>
          <section id="portfolio" className="section section-portfolio">
            <Portfolio />
          </section>
          <section id="about" className="section section-about">
            <About />
          </section>
          <section id="footer" className="section section-footer">
            <Footer />
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
