import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import { ThemeProvider } from "./contexts/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function NavBar({ home }) {
  return (
    <nav className={"nav animated-nav " + (home ? "nav-home" : "nav-top") }>
      {[{ to: "/", label: "Home" }, { to: "/portfolio", label: "Portfolio" }, { to: "/about", label: "About" }].map(link => (
        <NavLink key={link.to} to={link.to}>{link.label}</NavLink>
      ))}
      <ThemeToggle />
    </nav>
  );
}

function NavLink({ to, children }) {
  const location = useLocation();
  return (
    <Link
      to={to}
      className={
        "nav-link" + (location.pathname === to ? " active" : "")
      }
    >
      {children}
    </Link>
  );
}

function AnimatedLayout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className={"layout-container" + (isHome ? " home-layout" : " top-layout") }>
      <NavBar home={isHome} />
      {isHome ? (
        <div className={"content-area" + (isHome ? " content-home" : " content-top") }>
          {children}
        </div>
      ) : (
        <main style={{ maxWidth: 900, margin: '6rem auto 0 auto', padding: '0 1rem', width: '100%' }}>
          {children}
        </main>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AnimatedLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatedLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
