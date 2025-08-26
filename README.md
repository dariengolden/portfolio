# Darien Golden - Creative Portfolio

A modern, responsive portfolio website showcasing creative work in video production, photography, and design. Built with React 19, Vite, and featuring a dynamic video gallery, interactive portfolio grid, and dark/light theme toggle.

## Features

- **Video Production Showcase**: Social media reels, corporate videos, short films, and advertising content
- **Photography Portfolio**: Portrait, event, product, landscape, and street photography
- **Design Work**: Brand identity, web design, print materials, logo design, and UI/UX projects
- **Interactive Gallery**: Dynamic portfolio grid with detailed project descriptions
- **Video Gallery**: Custom video player with autoplay and loop functionality
- **Responsive Design**: Mobile-first approach with smooth animations
- **Theme Toggle**: Dark and light mode support
- **Modern Tech Stack**: React 19, React Router, Video.js, and Vite

## Tech Stack

- **Frontend**: React 19 with React Router DOM
- **Build Tool**: Vite
- **Video Player**: Video.js
- **Styling**: Custom CSS with CSS modules
- **Development**: ESLint for code quality

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── PortfolioDetails.jsx
│   ├── PortfolioGrid.jsx
│   ├── PortfolioSidebar.jsx
│   ├── ThemeToggle.jsx
│   ├── VideoGallery.jsx
│   └── VideoPlayer.jsx
├── contexts/           # React contexts
│   └── ThemeContext.jsx
├── pages/              # Route components
│   ├── Home.jsx
│   ├── About.jsx
│   └── Portfolio.jsx
├── assets/             # Static assets
└── App.jsx            # Main application component
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Portfolio Content

The portfolio showcases a diverse range of creative work including:
- Social media content and brand campaigns
- Corporate and commercial video production
- Professional photography services
- Graphic design and branding projects
- Web and UI/UX design work

Each portfolio item includes detailed descriptions and can be filtered by category for easy navigation.
