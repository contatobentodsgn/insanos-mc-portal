"use client";

import React, { useEffect, useState } from "react";

interface TireTrackTimelineLineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function TireTrackTimelineLine({ containerRef, className = "" }: TireTrackTimelineLineProps) {
  const [trackHeight, setTrackHeight] = useState<number | null>(null);

  useEffect(() => {
    const updateHeight = () => {
      const container = containerRef.current;
      if (!container) return;

      const items = container.querySelectorAll(".timeline-item");
      if (items.length > 1) {
        const lastItem = items[items.length - 1] as HTMLElement;
        // The distance from the center of the first dot (28px) to the center of the last dot (lastItem.offsetTop + 28px) is exactly lastItem.offsetTop
        const height = lastItem.offsetTop;
        if (height > 0) {
          setTrackHeight(height);
        }
      }
    };

    updateHeight();
    const t1 = setTimeout(updateHeight, 50);
    const t2 = setTimeout(updateHeight, 250);
    const t3 = setTimeout(updateHeight, 600);
    window.addEventListener("resize", updateHeight);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("resize", updateHeight);
    };
  }, [containerRef]);

  const heightStyle = trackHeight ? `${trackHeight}px` : "calc(100% - 200px)";

  return (
    <div
      style={{ top: "28px", height: heightStyle }}
      className={`absolute left-3 sm:left-4 -translate-x-1/2 w-6 pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* SVG Definitions for Discrete Tire Tread Pattern (Zero center line, 100% symmetric 24px) */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          {/* Base Inactive Asphalt/Grey Pattern */}
          <pattern
            id="tire-tread-base"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            {/* Left discrete chevrons */}
            <path
              d="M 3 4 L 10 10 L 10 14 L 3 8 Z M 3 16 L 10 22 L 10 26 L 3 20 Z"
              fill="#363A48"
            />
            {/* Right discrete chevrons */}
            <path
              d="M 21 4 L 14 10 L 14 14 L 21 8 Z M 21 16 L 14 22 L 14 26 L 21 20 Z"
              fill="#363A48"
            />
          </pattern>

          {/* Active Gold Tread Pattern */}
          <pattern
            id="tire-tread-gold"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            {/* Left gold chevrons */}
            <path
              d="M 3 4 L 10 10 L 10 14 L 3 8 Z M 3 16 L 10 22 L 10 26 L 3 20 Z"
              fill="#F2C21B"
            />
            {/* Right gold chevrons */}
            <path
              d="M 21 4 L 14 10 L 14 14 L 21 8 Z M 21 16 L 14 22 L 14 26 L 21 20 Z"
              fill="#F2C21B"
            />
          </pattern>
        </defs>
      </svg>

      {/* Layer 1: Static Base Grey Tread (Never moves, never scales, exact 24px width) */}
      <svg className="w-full h-full" width="24" preserveAspectRatio="none">
        <rect width="24" height="100%" fill="url(#tire-tread-base)" />
      </svg>

      {/* Layer 2: Gold Active Tread Revealed Progressively via clip-path (Zero distortion, single continuous journey) */}
      <div
        className="timeline-track-gold absolute inset-0 overflow-hidden filter drop-shadow-[0_0_8px_rgba(242,194,27,0.75)]"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <svg className="w-full h-full" width="24" preserveAspectRatio="none">
          <rect width="24" height="100%" fill="url(#tire-tread-gold)" />
        </svg>
      </div>
    </div>
  );
}
