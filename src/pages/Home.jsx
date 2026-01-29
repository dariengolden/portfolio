import React, { Suspense, lazy, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroVideo } from "../data/videos";
import ScrollAnimation from "../components/ScrollAnimation";

// Lazy load Mux Player for better performance
const MuxPlayer = lazy(() => import("@mux/mux-player-react"));

const Home = () => {
  // Check if hero video is configured
  const hasValidHeroVideo = heroVideo.playbackId && heroVideo.playbackId !== "YOUR_MUX_PLAYBACK_ID_HERO";
  
  // Parallax effect for video
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="home">
      <ScrollAnimation direction="up" duration={1}>
        <h1 className="home-title">Darien Golden</h1>
      </ScrollAnimation>
      
      <motion.div 
        style={{ y, opacity }}
        className="home-video-wrapper"
      >
        <ScrollAnimation direction="up" delay={0.2} duration={1.2}>
          <div className="home-video-container">
            {hasValidHeroVideo ? (
              <Suspense fallback={
                <div className="home-video" style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white"
                }}>
                  Loading...
                </div>
              }>
                <MuxPlayer
                  playbackId={heroVideo.playbackId}
                  streamType="on-demand"
                  autoPlay="muted"
                  loop
                  muted
                  preload="auto"
                  style={{
                    width: "100%",
                    maxWidth: "1400px",
                    height: "600px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px var(--shadow-light)"
                  }}
                />
              </Suspense>
            ) : (
              // Fallback to local video if Mux not configured
              <video
                src="/elpida_01.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="home-video"
              />
            )}
          </div>
        </ScrollAnimation>
      </motion.div>
    </div>
  );
};

export default Home; 