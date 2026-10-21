import React from 'react';
import { motion } from 'framer-motion';

export default function DoodleHeart({ 
  className = "w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10", 
  color = "#e11d48", // Vibrant rose/crimson red
  fill = "rgba(225, 29, 72, 0.14)",
  animated = true 
}) {
  const heartContent = (
    <svg
      viewBox="0 0 44 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-sm overflow-visible"
    >
      {/* Hand-drawn sketchy doodle heart path with playful, slightly imperfect curves */}
      <path
        d="M22 36.8C19.8 35.1 4.5 23.8 4.2 13.9C3.9 6.8 9.6 3 16.2 3.8C19.2 4.2 21.2 6.2 22 7.2C22.8 6.2 24.8 4.2 27.8 3.8C34.4 3 40.1 6.8 39.8 13.9C39.5 23.8 24.2 35.1 22 36.8Z"
        fill={fill}
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Subtle whimsical doodle highlight stroke inside left lobe */}
      <path
        d="M10.5 12.5C11.8 9.2 14.5 7.8 17.5 8.2"
        stroke={color === "#e11d48" ? "#fb7185" : "#e8c86d"}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Tiny playful doodle sparkle/tail dot */}
      <circle
        cx="34"
        cy="9.5"
        r="1.2"
        fill={color}
      />
    </svg>
  );

  if (!animated) {
    return <span className={`inline-flex items-center justify-center ${className}`}>{heartContent}</span>;
  }

  return (
    <motion.span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      animate={{
        scale: [1, 1.18, 1.02, 1.14, 1],
        rotate: [-3, 3, -1, 2, 0],
      }}
      transition={{
        duration: 2.2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
      title="Love"
    >
      {heartContent}
    </motion.span>
  );
}
