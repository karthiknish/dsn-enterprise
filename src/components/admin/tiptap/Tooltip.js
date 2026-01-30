"use client";

import { useState, useRef } from "react";

export default function Tooltip({ children, content }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 8,
        left: rect.left + rect.width / 2,
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="group/tooltip relative inline-block"
      onMouseEnter={updatePosition}
    >
      {children}
      <div
        className="fixed px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity duration-200 z-[99999] shadow-lg"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: "translate(-50%, -100%)",
        }}
      >
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}
