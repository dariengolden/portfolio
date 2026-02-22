import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ScrollAnimation = ({ children, delay = 0, duration = 0.8, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, // Animation triggers once to prevent stutter at scroll boundaries
    margin: "-100px" // Trigger animation when element is 100px into viewport
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.4, 0.25, 1] // Custom easing
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
