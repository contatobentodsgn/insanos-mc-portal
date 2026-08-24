"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowRight, IconFire } from "./ui/Icons";
import { INSTITUTIONAL_METRICS } from "../data/institutional";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 60;
const FRAME_PATHS = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/images/medal-sequence/frame_${String(i).padStart(2, "0")}.webp`
);

export default function HeroScrollMedal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const medalWrapperRef = useRef<HTMLDivElement>(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload frames
  useEffect(() => {
    let count = 0;
    const imgs: HTMLImageElement[] = [];

    FRAME_PATHS.forEach((path, idx) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (idx === 0) {
          // Render initial frame immediately
          renderFrame(0);
        }
        if (count === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      imgs.push(img);
    });

    imagesRef.current = imgs;

    function renderFrame(index: number) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = imgs[index];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, []);

  // GSAP ScrollTrigger timeline setup
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const ctx = gsap.context(() => {
      const canvas = canvasRef.current!;
      const canvasCtx = canvas.getContext("2d");
      const imgs = imagesRef.current;

      const render = (frameIdx: number) => {
        if (!canvasCtx || !imgs[frameIdx] || !imgs[frameIdx].complete) return;
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        canvasCtx.drawImage(imgs[frameIdx], 0, 0, canvas.width, canvas.height);
      };

      const scrollState = { frame: 0 };

      // Master ScrollTrigger timeline pinned for 2000px of scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // 2 Full rotations (0 -> 1 progress maps to 2 cycles of 60 frames)
            // Cycle 1: p from 0 to 0.38 (frames 0 -> 59)
            // Cycle 2: p from 0.38 to 0.75 (frames 0 -> 59)
            let frameIndex = 0;
            if (p < 0.38) {
              frameIndex = Math.floor((p / 0.38) * (TOTAL_FRAMES - 1));
            } else if (p < 0.75) {
              frameIndex = Math.floor(((p - 0.38) / 0.37) * (TOTAL_FRAMES - 1));
            } else {
              frameIndex = 0; // facing front on exit
            }

            frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
            render(frameIndex);
          },
        },
      });

      // Scroll hint fades out immediately
      tl.to(
        hintRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.1,
          ease: "power1.out",
        },
        0
      );

      // Darken background overlay as scroll deepens
      tl.to(
        overlayRef.current,
        {
          opacity: 0.85,
          duration: 0.7,
          ease: "none",
        },
        0.1
      );

      // Medal exit: scale down and fade out near end of second turn (p: 0.65 -> 0.85)
      tl.to(
        medalWrapperRef.current,
        {
          scale: 0.25,
          opacity: 0,
          y: -100,
          duration: 0.25,
          ease: "power2.inOut",
        },
        0.65
      );

      // Content reveal: headline and buttons fade & slide up (p: 0.75 -> 1.0)
      tl.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: "auto",
          duration: 0.25,
          ease: "power3.out",
        },
        0.75
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden bg-[#0A0A0A] flex items-center justify-center border-b border-white/10"
    >
      {/* Background Video (Muted, Autoplay, Loop) */}
      <div className="absolute inset-0 scale-105 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/insanos/hero_biker.webp"
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-video-720p.webm" type="video/webm" media="(max-width: 768px)" />
          <source src="/videos/hero-video-720p.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/hero-video-1080p.webm" type="video/webm" />
          <source src="/videos/hero-video-1080p.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Dark Gradient Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/45 transition-opacity duration-300 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/60" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      {/* CENTERED 3D MEDAL CANVAS (Interactive on scroll) */}
      <div
        ref={medalWrapperRef}
        className="absolute z-20 flex flex-col items-center justify-center pointer-events-none transition-transform will-change-transform"
      >
        {/* Ambient Halo Glow */}
        <div className="absolute w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full bg-gradient-to-r from-[#F2C21B]/15 via-white/10 to-[#F2C21B]/15 blur-3xl -z-10 animate-pulse" />

        <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]">
          <canvas
            ref={canvasRef}
            width={480}
            height={480}
            role="img"
            aria-label="Medalha tridimensional com acabamento em relevo e brasão dos 18 do Forte"
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
          />
        </div>
      </div>

      {/* INITIAL SCROLL HINT (Disappears as user scrolls) */}
      <div
        ref={hintRef}
        className="absolute bottom-10 z-30 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
      >
        <span className="text-xs font-mono tracking-widest text-[#F2C21B] uppercase bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          Role para navegar
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-[#F2C21B] rounded-full animate-bounce" />
        </div>
      </div>

      {/* FINAL HERO REVEAL CONTENT (Headline, Badges, CTAs) */}
      <div
        ref={contentRef}
        className="relative z-30 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 opacity-0 pointer-events-none"
      >
        <div className="max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/70 border border-white/15 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#F2C21B] animate-pulse" />
            <span className="text-xs font-mono tracking-wider uppercase text-[#E0DDD8]">
              Original de OZ · Desde 2015 · 18 do Forte
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="font-['Anton'] text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] text-white">
              Nosso Combustível <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2C21B] via-yellow-200 to-[#F2C21B]">
                É A Irmandade.
              </span>
            </h1>
            <div className="inline-block bg-[#F2C21B] text-black px-3 py-1 font-['Anton'] text-xl sm:text-2xl uppercase tracking-wide transform -skew-x-6">
              Nosso destino é fazer o bem.
            </div>
          </div>

          {/* Subtitle / Pitch */}
          <p className="text-base sm:text-lg text-[#E0DDD8] leading-relaxed max-w-2xl font-light">
            O maior motoclube do Brasil e do mundo. Mais de {INSTITUTIONAL_METRICS.members} integrantes unidos pela honra,
            disciplina e o compromisso real com a caridade em {INSTITUTIONAL_METRICS.countries} países.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
            <a
              href="/faca-parte"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#F2C21B] hover:bg-[#ffe066] text-black font-['Anton'] uppercase text-base px-7 py-3.5 rounded-[2px] border-2 border-[#F2C21B] transition-all duration-300 shadow-[0_0_30px_rgba(242,194,27,0.4)] hover:scale-105 active:scale-95"
            >
              <IconFire className="w-5 h-5 text-black" />
              <span>Quero Fazer Parte</span>
              <IconArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/historia"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-['Anton'] uppercase text-base px-6 py-3.5 rounded-[2px] transition-all duration-300 backdrop-blur-md"
            >
              <span>Conheça Nossa História</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
