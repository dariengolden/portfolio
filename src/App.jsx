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
      // Start at bottom (calc(100vh - 120px)), move up with scroll, stick at top (1.5rem = 24px)
      const initialBottom = windowHeight - 120; // Starting position from top
      const finalTop = 24; // 1.5rem in pixels
      const scrollDistance = initialBottom - finalTop;
      
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
