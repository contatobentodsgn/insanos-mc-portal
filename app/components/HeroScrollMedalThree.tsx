"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowRight } from "./ui/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FALLBACK_FRAMES = 60;
const FALLBACK_FRAME_PATHS = Array.from(
  { length: TOTAL_FALLBACK_FRAMES },
  (_, i) => `/images/medal-sequence/frame_${String(i).padStart(2, "0")}.webp`
);

export default function HeroScrollMedalThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const fallbackCanvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [useFallback2D, setUseFallback2D] = useState(false);

  // Dynamic ambient spotlight position following mouse
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMoveGlow = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect WebGL capability and low-power hardware
    const checkWebGLSupport = (): boolean => {
      try {
        const testCanvas = document.createElement("canvas");
        const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
        if (!gl) return false;
        // Check for reduced motion preference
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    };

    const hasWebGL = checkWebGLSupport();

    if (!hasWebGL) {
      setUseFallback2D(true);
      setLoading(false);
      return;
    }

    if (!canvasMountRef.current) return;

    const mount = canvasMountRef.current;
    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // 1. WebGL Renderer with High Precision & ACES Tone Mapping
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch (err) {
      console.warn("WebGL initialization failed, falling back to 2D canvas:", err);
      setUseFallback2D(true);
      setLoading(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mount.appendChild(renderer.domElement);

    // 2. Scene & PBR Studio Environment
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // 3. Camera with calibrated distance (4.6 for balanced, elegant medal scale)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    // 4. Studio 3-Point Lighting
    scene.add(new THREE.AmbientLight(0xe8edf7, 0.9));

    const keyLight = new THREE.DirectionalLight(0xffc387, 4.2);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xbdd6ff, 2.8);
    fillLight.position.set(3, 2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffdfae, 2.5);
    rimLight.position.set(0, 4, -2.5);
    scene.add(rimLight);

    // 5. Load Master 3D GLTF Medal
    const medalGroup = new THREE.Group();
    scene.add(medalGroup);

    let targetRotationY = 0;
    let currentRotationY = 0;
    let mouseTiltX = 0;
    let mouseTiltY = 0;

    const loader = new GLTFLoader();
    loader.load(
      "/models/medalha_insanos_web_final.glb",
      (gltf) => {
        const root = gltf.scene;

        // Center geometry to pivot
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        root.position.sub(center);

        // Reduce side thickness by half (50% depth on Z axis) for a sleek, realistic challenge coin profile
        root.scale.set(1, 1, 0.48);

        // Ensure double-sided metallic rendering
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((mat) => {
                  mat.side = THREE.DoubleSide;
                });
              } else {
                mesh.material.side = THREE.DoubleSide;
              }
            }
          }
        });

        medalGroup.add(root);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.warn("Failed to load GLB, activating 2D fallback:", err);
        setUseFallback2D(true);
        setLoading(false);
      }
    );

    // Interactive mouse tilt parallax
    const handleMouseTilt = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseTiltX = x * 0.18;
      mouseTiltY = y * 0.14;
    };
    window.addEventListener("mousemove", handleMouseTilt);

    // 6. GSAP ScrollTrigger Setup
    const scrollObj = { scale: 1, opacity: 1, yOffset: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // 2 full turns (4 * PI) up to 72% of scroll
            if (p <= 0.72) {
              targetRotationY = (p / 0.72) * (Math.PI * 4);
            } else {
              targetRotationY = Math.PI * 4;
            }
          },
        },
      });

      // Scroll hint fades out immediately
      tl.to(
        hintRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.08,
          ease: "power1.out",
        },
        0
      );

      // Darken background overlay smoothly
      tl.to(
        overlayRef.current,
        {
          opacity: 0.88,
          duration: 0.65,
          ease: "none",
        },
        0.08
      );

      // Medal exit: scale down and fade out (p: 0.68 -> 0.88)
      tl.to(
        scrollObj,
        {
          scale: 0.15,
          opacity: 0,
          yOffset: -0.8,
          duration: 0.22,
          ease: "power2.inOut",
        },
        0.68
      );

      // Hero Content Reveal: Exactly matches official homepage styling
      tl.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 40,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.24,
          ease: "power3.out",
        },
        0.74
      );
    }, containerRef);

    // 7. Render Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      currentRotationY += (targetRotationY - currentRotationY) * 0.12;
      medalGroup.rotation.y = currentRotationY + mouseTiltX;
      medalGroup.rotation.x = mouseTiltY;

      medalGroup.scale.set(scrollObj.scale, scrollObj.scale, scrollObj.scale);
      medalGroup.position.y = scrollObj.yOffset;
      renderer.domElement.style.opacity = String(scrollObj.opacity);

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!mount) return;
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseTilt);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pmrem.dispose();
    };
  }, []);

  // Fallback 2D Image Sequence Loader (if WebGL is disabled or unavailable)
  useEffect(() => {
    if (!useFallback2D || !containerRef.current || !fallbackCanvasRef.current) return;

    const canvas = fallbackCanvasRef.current;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const imgs: HTMLImageElement[] = [];
    FALLBACK_FRAME_PATHS.forEach((path) => {
      const img = new Image();
      img.src = path;
      imgs.push(img);
    });

    const render2D = (idx: number) => {
      const img = imgs[idx];
      if (img && img.complete) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        ctx2d.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            let frameIdx = 0;
            if (p < 0.36) {
              frameIdx = Math.floor((p / 0.36) * (TOTAL_FALLBACK_FRAMES - 1));
            } else if (p < 0.72) {
              frameIdx = Math.floor(((p - 0.36) / 0.36) * (TOTAL_FALLBACK_FRAMES - 1));
            } else {
              frameIdx = 0;
            }
            render2D(Math.max(0, Math.min(TOTAL_FALLBACK_FRAMES - 1, frameIdx)));
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [useFallback2D]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMoveGlow}
      className="hero-section relative h-screen w-full overflow-hidden bg-[#0A0A0A] flex items-center border-b border-white/10"
    >
      {/* Background Video with bleed to prevent any border gap */}
      <div className="absolute -top-10 -bottom-10 -left-6 -right-6 scale-105 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/insanos/hero_biker.webp"
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        >
          <source src="/videos/hero-video-720p.webm" type="video/webm" media="(max-width: 768px)" />
          <source src="/videos/hero-video-720p.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/hero-video-1080p.webm" type="video/webm" />
          <source src="/videos/hero-video-1080p.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Gradient Overlays */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/75 to-[#080808]/35 transition-opacity duration-300 opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/50" />
      </div>

      {/* Ambient Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(circle 450px at ${mousePos.x}% ${mousePos.y}%, rgba(242,194,27,0.12), transparent 70%)`,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

      {/* 3D MEDAL (Three.js WebGL or Adaptive 2D Fallback) */}
      {!useFallback2D ? (
        <div
          ref={canvasMountRef}
          className="absolute inset-0 z-20 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden"
        >
          <div className="absolute w-[400px] sm:w-[540px] h-[400px] sm:h-[540px] rounded-full bg-gradient-to-r from-[#F2C21B]/15 via-white/10 to-[#F2C21B]/15 blur-3xl -z-10 animate-pulse" />
        </div>
      ) : (
        <div className="absolute inset-0 z-20 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="relative w-[340px] h-[340px] sm:w-[460px] sm:h-[460px]">
            <canvas
              ref={fallbackCanvasRef}
              width={540}
              height={540}
              className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>
      )}

      {/* INITIAL SCROLL HINT */}
      <div
        ref={hintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
      >
        <span className="text-[11px] font-mono tracking-widest text-[#F2C21B] uppercase bg-black/60 px-3.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
          {loading ? "Carregando Medalha 3D…" : "Role para navegar"}
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-[#F2C21B] rounded-full animate-bounce" />
        </div>
      </div>

      {/* FINAL HERO REVEAL CONTENT (EXACT MATCH OF OFFICIAL HOMEPAGE) */}
      <div
        ref={contentRef}
        className="relative z-30 max-w-[1400px] mx-auto px-4 sm:px-8 py-20 lg:py-32 w-full opacity-0 pointer-events-none"
      >
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[2px] bg-[#F2C21B]" />
            <p className="text-xs sm:text-sm uppercase font-extrabold tracking-[0.25em] text-[#F2C21B]">
              Original de OZ · Desde 2015 · 18 do Forte
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-9xl leading-[1.08] sm:leading-[1.06] tracking-tight text-white mb-6">
            Nosso combustível<br />
            é a <span className="text-[#F2C21B] underline decoration-[#F2C21B]/40 underline-offset-8">irmandade.</span>
          </h1>

          {/* Slogan Pill */}
          <div className="inline-block mb-8 bg-[#F2C21B] text-black px-4 py-2 font-['Anton'] uppercase text-lg sm:text-2xl tracking-wide shadow-lg transform -skew-x-6">
            Nosso destino é fazer o bem.
          </div>

          {/* Subtitle Paragraph */}
          <p className="text-base sm:text-xl text-[#C7C5BF] leading-relaxed max-w-3xl lg:max-w-4xl mb-10 font-normal">
            O maior motoclube do Brasil e do mundo. Forjados na disciplina, lealdade e respeito mútuo.<br className="hidden sm:inline" />{" "}
            Nas ruas, na estrada ou na ação social: <strong>#SomosDeVerdade</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6">
            <Link
              href="/faca-parte"
              className="w-full sm:w-auto min-h-[52px] px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider text-base sm:text-lg uppercase rounded-xl shadow-[0_0_30px_rgba(242,194,27,0.35)] transition-all duration-200 inline-flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <span>Faça Parte da Irmandade</span>
              <IconArrowRight className="w-5 h-5 text-black shrink-0" strokeWidth={2.5} />
            </Link>

            <Link
              href="/historia"
              className="w-full sm:w-auto min-h-[52px] px-6 py-4 border border-white/30 hover:border-[#F2C21B] bg-[#121314]/80 text-white hover:text-[#F2C21B] font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>Conheça Nossa História</span>
              <IconArrowRight className="w-4 h-4 text-inherit" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right Vertical Scroll Label */}
      <div className="absolute right-8 bottom-8 hidden lg:flex flex-col items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#AAA8A1] z-30 pointer-events-none">
        <span className="writing-mode-vertical">Rolar Para Conhecer</span>
        <span className="text-[#F2C21B] text-lg animate-bounce">↓</span>
      </div>
    </div>
  );
}
