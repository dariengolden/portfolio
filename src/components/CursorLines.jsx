import React, { useState, useEffect, useRef, useCallback } from "react";

const CursorLines = ({ side = "left", count = 12, spacing = 8 }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lineAngles, setLineAngles] = useState([]);

  const handleMouseMove = useCallback((e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const lines = container.querySelectorAll(".cursor-line");

    const angles = Array.from(lines).map((line) => {
      const lineRect = line.getBoundingClientRect();
      const lineCenterX = lineRect.left + lineRect.width / 2;
      const lineCenterY = lineRect.top + lineRect.height / 2;

      const deltaX = mousePos.x - lineCenterX;
      const deltaY = mousePos.y - lineCenterY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      // For left side, we want lines to point right generally
      // For right side, we want lines to point left generally
      // But still follow the cursor
      return angle;
    });

    setLineAngles(angles);
  }, [mousePos]);

  const lines = Array.from({ length: count }, (_, i) => i);

  return (
    <div
      ref={containerRef}
      className={`cursor-lines cursor-lines-${side}`}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: `${spacing}px`,
        padding: "0 16px",
      }}
    >
      {lines.map((_, index) => (
        <div
          key={index}
          className="cursor-line"
          style={{
            width: "16px",
            height: "2px",
            backgroundColor: "var(--text-muted)",
            borderRadius: "1px",
            transform: `rotate(${lineAngles[index] || 0}deg)`,
            transformOrigin: "center center",
            transition: "transform 0.15s ease-out",
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
};

export default CursorLines;
