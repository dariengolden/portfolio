import React, { Suspense, lazy, useState } from "react";
import { heroVideo } from "../data/videos";

const MuxPlayer = lazy(() => import("@mux/mux-player-react"));

const Home = () => {
  const hasValidHeroVideo =
    heroVideo.playbackId && heroVideo.playbackId !== "YOUR_MUX_PLAYBACK_ID_HERO";

  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <div className="home">
      <div className="home-title-block">
        <h1 className="home-title">Darien Golden</h1>
      </div>

      <div className="home-video-wrapper">
        <div className="home-video-container">
          {hasValidHeroVideo ? (
            <Suspense
              fallback={
                <div className="home-video-loading">
                  <div className="loading-spinner" />
                </div>
              }
            >
              <MuxPlayer
                playbackId={heroVideo.playbackId}
                streamType="on-demand"
                autoPlay="muted"
                loop
                muted
                preload="auto"
                playsInline
                onLoadStart={() => setVideoLoaded(false)}
                onLoadedData={() => setVideoLoaded(true)}
                onCanPlay={() => setVideoLoaded(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: videoLoaded ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
                className="home-video"
              />
            </Suspense>
          ) : (
            <video
              src="/Portfolio cover.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadStart={() => setVideoLoaded(false)}
              onLoadedData={() => setVideoLoaded(true)}
              onCanPlay={() => setVideoLoaded(true)}
              style={{
                opacity: videoLoaded ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}
              className="home-video"
            />
          )}
        </div>
        <div className="home-overlay" />
      </div>
    </div>
  );
};

export default Home;
