"use client";

import React from "react";

export function TireTrackTimelineDefs() {
  return (
    <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
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
  );
}

export function TireTrackTimelineSegment() {
  return (
    <div
      className="absolute top-[28px] bottom-[-28px] left-3 sm:left-4 -translate-x-1/2 w-6 pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Base Grey Pattern */}
      <svg className="w-full h-full" width="24" preserveAspectRatio="none">
        <rect width="24" height="100%" fill="url(#tire-tread-base)" />
      </svg>

      {/* Active Gold Pattern */}
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
