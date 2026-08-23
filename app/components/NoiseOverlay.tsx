"use client";

import React, { useRef, useEffect, useState } from "react";

interface NoiseProps {
  patternRefreshInterval?: number;
  patternAlpha?: number; // 0-255 (e.g. 16 for subtle, 25 for heavy vintage grain)
}

export function NoiseOverlay({
  patternRefreshInterval = 2,
  patternAlpha = 16,
}: NoiseProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check initial preference
    const checkState = () => {
      const stored = localStorage.getItem("insanos_noise_overlay");
      setIsEnabled(stored === "true");
    };

    checkState();

    // Listen for real-time toggle events from Admin Panel / Visual Editor
    const handleToggle = (e: CustomEvent<{ enabled: boolean }>) => {
      setIsEnabled(e.detail.enabled);
    };

    window.addEventListener("insanos_noise_change" as any, handleToggle as any);
    window.addEventListener("storage", checkState);

    return () => {
      window.removeEventListener("insanos_noise_change" as any, handleToggle as any);
      window.removeEventListener("storage", checkState);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;
    const canvasSize = 1024;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      canvas.style.width = "100vw";
      canvas.style.height = "100vh";
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [isEnabled, patternRefreshInterval, patternAlpha]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={grainRef}
      className="pointer-events-none fixed inset-0 z-40 w-screen h-screen opacity-90"
      style={{ imageRendering: "pixelated" }}
      aria-hidden="true"
    />
  );
}
