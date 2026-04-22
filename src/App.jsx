import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";
import "./App.css";

const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5V21a1 1 0 01-1 1H4a1 1 0 01-1-1V10.5z"/>
        <path d="M9 22V13h6v9"/>
      </svg>
    ),
  },
  {
    id: "portfolio",
    label: "Work",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
  },
  {
    id: "about",
    label: "About",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.582-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
];

function NavBar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "portfolio", "about"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="nav">
      {NAV_ITEMS.map((link) => (
        <button
          key={link.id}
          onClick={() => scrollToSection(link.id)}
          className={`nav-link ${activeSection === link.id ? "active" : ""}`}
        >
          <span className="nav-icon" aria-hidden="true">{link.icon}</span>
          <span className="nav-label">{link.label}</span>
        </button>
      ))}
      <ThemeToggle />
    </nav>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="noise-overlay" aria-hidden="true" />
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
