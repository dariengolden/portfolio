import React, { useState, useRef, useEffect, useCallback, Suspense, lazy } from "react";
import { getVideosByCategory, videoData } from "../data/videos";

const MuxPlayer = lazy(() => import("@mux/mux-player-react"));

const PX_PER_SEC = 20;

const fmt = (s) => {
  if (!s || !isFinite(s) || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const Portfolio = () => {
  const [selected, setSelected] = useState("Corporate");
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [subVideoIndex, setSubVideoIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef(null);
  const timelineRef = useRef(null);
  const rafRef = useRef(null);

  const currentVideos = getVideosByCategory(selected);
  const currentVideo = currentVideos?.[selectedVideoIndex] || currentVideos?.[0];
  const availableCategories = Object.keys(videoData);

  const activePlaybackId = currentVideo?.subVideos
    ? currentVideo.subVideos[subVideoIndex]?.playbackId || currentVideo.playbackId
    : currentVideo?.playbackId;

  // Poll the video element for playback state
  useEffect(() => {
    const tick = () => {
      const el = playerRef.current?.media;
      if (el) {
        setCurrentTime(el.currentTime || 0);
        if (el.duration && isFinite(el.duration)) setDuration(el.duration);
        setIsPlaying(!el.paused);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activePlaybackId]);

  // Reset state on video change
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  }, [activePlaybackId]);

  // Auto-scroll timeline to keep playhead in view
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl || duration <= 0) return;
    const px = currentTime * PX_PER_SEC;
    const w = tl.clientWidth;
    const sl = tl.scrollLeft;
    if (px < sl + 60 || px > sl + w - 60) {
      tl.scrollLeft = px - w / 2;
    }
  }, [currentTime, duration]);

  const getMedia = () => playerRef.current?.media;

  const seekTo = useCallback(
    (t) => {
      const el = getMedia();
      if (el && duration > 0) el.currentTime = Math.max(0, Math.min(t, duration));
    },
    [duration]
  );

  const togglePlay = useCallback(() => {
    const el = getMedia();
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  }, []);

  const handleRulerClick = useCallback(
    (e) => {
      const tl = timelineRef.current;
      if (!tl) return;
      const rect = tl.getBoundingClientRect();
      const x = e.clientX - rect.left + tl.scrollLeft;
      seekTo(x / PX_PER_SEC);
    },
    [seekTo]
  );

  const handlePlayheadMouseDown = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      const startX = e.clientX;
      const startTime = currentTime;
      const onMove = (ev) => seekTo(startTime + (ev.clientX - startX) / PX_PER_SEC);
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    },
    [currentTime, seekTo]
  );

  // Touch support for the playhead
  const handlePlayheadTouchStart = useCallback(
    (e) => {
      e.stopPropagation();
      const touch = e.touches[0];
      const startX = touch.clientX;
      const startTime = currentTime;
      const onMove = (ev) => {
        const t = ev.touches[0];
        seekTo(startTime + (t.clientX - startX) / PX_PER_SEC);
      };
      const onEnd = () => {
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);
      };
      document.addEventListener("touchmove", onMove, { passive: true });
      document.addEventListener("touchend", onEnd);
    },
    [currentTime, seekTo]
  );

  const changeCategory = (cat) => {
    setSelected(cat);
    setSelectedVideoIndex(0);
    setSubVideoIndex(0);
  };

  const changeVideo = (idx) => {
    setSelectedVideoIndex(idx);
    setSubVideoIndex(0);
  };

  if (!currentVideo) return null;

  // Timeline geometry
  const safeDuration = duration > 0 ? duration : 60;
  const tlWidth = Math.max(safeDuration * PX_PER_SEC + 80, 500);
  const progress = currentTime * PX_PER_SEC;

  // Major tick every 5s, minor tick every 1s
  const numSeconds = Math.ceil(safeDuration) + 5;

  return (
    <>
      <div className="fp-wrapper">
        <div className="fp-container">

          {/* ── Video + floating info card ── */}
          <div className="fp-main">
            <Suspense fallback={<div className="fp-fallback" />}>
              <MuxPlayer
                ref={playerRef}
                key={activePlaybackId}
                playbackId={activePlaybackId}
                streamType="on-demand"
                preload="metadata"
                noHotKeys
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  "--controls": "none",
                  "--media-control-bar-display": "none",
                  "--media-center-controls-display": "none",
                  "--media-preview-display": "none",
                }}
              />
            </Suspense>
            <div className="fp-vignette" />

            {/* Info card — top right */}
            <div className="fp-card">
              <div className="fp-card-head">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="fp-card-ico">
                  <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.1" />
                  <path d="M6.5 5.5v3M6.5 4v.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                <span className="fp-card-name">{currentVideo.title}</span>
              </div>

              {(currentVideo.metadata?.client || currentVideo.metadata?.year) && (
                <div className="fp-card-meta">
                  {currentVideo.metadata?.client && (
                    <span className="fp-card-client">{currentVideo.metadata.client}</span>
                  )}
                  {currentVideo.metadata?.year && (
                    <span className="fp-card-year">{currentVideo.metadata.year}</span>
                  )}
                </div>
              )}

              <p className="fp-card-desc">
                {currentVideo.description || "No description available."}
              </p>

              {currentVideo.subVideos && (
                <div className="fp-sub-row">
                  {currentVideo.subVideos.map((sub, idx) => (
                    <button
                      key={idx}
                      className={`fp-sub-btn${idx === subVideoIndex ? " active" : ""}`}
                      onClick={() => setSubVideoIndex(idx)}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="fp-playlist">
                {currentVideos.map((v, i) => {
                  const pid = v.playbackId;
                  const valid = pid && !pid.startsWith("REPLACE") && !pid.startsWith("YOUR");
                  const thumb = valid
                    ? `https://image.mux.com/${pid}/thumbnail.jpg?width=180&height=101&fit_mode=smartcrop`
                    : null;
                  return (
                    <div
                      key={v.id}
                      className={`fp-pl-item${i === selectedVideoIndex ? " active" : ""}`}
                      onClick={() => changeVideo(i)}
                      title={v.title}
                    >
                      <div className="fp-pl-thumb">
                        {thumb ? (
                          <img src={thumb} alt={v.title} loading="lazy" />
                        ) : (
                          <div className="fp-pl-empty">▶</div>
                        )}
                        {i === selectedVideoIndex && <div className="fp-pl-ring" />}
                      </div>
                      <span className="fp-pl-name">{v.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Timeline panel ── */}
          <div className="fp-tl-panel">
            <div className="fp-tl-top">
              <button className="fp-play-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? (
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
                    <rect x="1" y="0" width="3.5" height="11" rx="1" />
                    <rect x="6.5" y="0" width="3.5" height="11" rx="1" />
                  </svg>
                ) : (
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor">
                    <path d="M2 1l8 4.5L2 10V1z" />
                  </svg>
                )}
              </button>
              <span className="fp-time-txt">
                {fmt(currentTime)} / {fmt(duration)}
              </span>
            </div>

            {/* Scrollable ruler */}
            <div
              className="fp-ruler"
              ref={timelineRef}
              onClick={handleRulerClick}
            >
              <div className="fp-ruler-inner" style={{ width: tlWidth }}>
                {/* Track */}
                <div className="fp-track" />
                {/* Progress fill */}
                <div className="fp-progress" style={{ width: Math.max(0, progress) }} />

                {/* Minor ticks (every 1s) */}
                {Array.from({ length: numSeconds }, (_, i) => i).map((t) => {
                  if (t % 5 === 0) return null;
                  return (
                    <div
                      key={`m${t}`}
                      className="fp-minor-tick"
                      style={{ left: t * PX_PER_SEC }}
                    />
                  );
                })}

                {/* Major ticks (every 5s) with labels */}
                {Array.from({ length: Math.ceil(numSeconds / 5) + 1 }, (_, i) => i * 5).map((t) => (
                  <div
                    key={`M${t}`}
                    className="fp-major-tick"
                    style={{ left: t * PX_PER_SEC }}
                  >
                    <span className="fp-tick-lbl">{t}s</span>
                  </div>
                ))}

                {/* Playhead */}
                <div
                  className="fp-playhead"
                  style={{ left: Math.max(0, progress) }}
                  onMouseDown={handlePlayheadMouseDown}
                  onTouchStart={handlePlayheadTouchStart}
                >
                  <div className="fp-ph-knob" />
                  <div className="fp-ph-line" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Category selector ── */}
          <div className="fp-cat-bar">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                className={`fp-cat-btn${selected === cat ? " active" : ""}`}
                onClick={() => changeCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Portfolio;
