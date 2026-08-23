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

export default function HeroScrollMedalThree() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  // Mouse spotlight position for authentic ambient glow
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMoveGlow = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  useEffect(() => {
    if (!containerRef.current || !canvasMountRef.current) return;

    const mount = canvasMountRef.current;
    let width = mount.clientWidth || window.innerWidth;
    let height = mount.clientHeight || window.innerHeight;

    // 1. WebGL Renderer with ACES ToneMapping & High Precision
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    mount.appendChild(renderer.domElement);

    // 2. Scene & PBR Studio Reflection Environment
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // 3. Perspective Camera (Calculated to prevent ANY clipping at all angles)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    // 4. Lights (Warm Sunset Key + Cool Fill + Sharp Metallic Rim)
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

    // 5. Load GLTF 3D Master Model
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

        // Perfect center of geometry bounding box
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        root.position.sub(center);

        // Ensure double-sided rendering for all metallic surfaces
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
        console.error("Error loading GLB medal:", err);
      }
    );

    // Interactive mouse tilt on medal
    const handleMouseTilt = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseTiltX = x * 0.22;
      mouseTiltY = y * 0.18;
    };
    window.addEventListener("mousemove", handleMouseTilt);

    // 6. GSAP ScrollTrigger Master Timeline
    const scrollObj = { progress: 0, scale: 1, opacity: 1, yOffset: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            // 2 full turns (4 * PI) up to 72% scroll
            if (p <= 0.72) {
              targetRotationY = (p / 0.72) * (Math.PI * 4);
            } else {
              targetRotationY = Math.PI * 4;
            }
          },
        },
      });

      // Hint fade out immediately on scroll
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
          opacity: 0.88,
          duration: 0.7,
          ease: "none",
        },
        0.1
      );

      // Medal exit: scale down and fade out (p: 0.68 -> 0.88)
      tl.to(
        scrollObj,
        {
          scale: 0.15,
          opacity: 0,
          yOffset: -0.8,
          duration: 0.24,
          ease: "power2.inOut",
        },
        0.68
      );

      // Hero Content Reveal: Exactly matches official homepage styling
      tl.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 50,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.25,
          ease: "power3.out",
        },
        0.74
      );
    }, containerRef);

    // 7. Render Loop with Smooth Lerping
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

    // 8. Responsive Resize (Recalculates aspect without stretching)
    const handleResize = () => {
      if (!mount) return;
      width = mount.clientWidth || window.innerWidth;
      height = mount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseTilt);
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement.parentNode);
      }
      renderer.dispose();
      pmrem.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMoveGlow}
      className="hero-section relative min-h-screen w-full overflow-hidden bg-[#0A0A0A] flex items-center border-b border-white/10"
    >
      {/* Cinematic Video Background with Parallax Scale */}
      <div className="hero-parallax-bg absolute inset-0 will-change-transform scale-105 overflow-hidden pointer-events-none">
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

      {/* Dynamic Ambient Headlight Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60"
        style={{
          background: `radial-gradient(circle 450px at ${mousePos.x}% ${mousePos.y}%, rgba(242,194,27,0.12), transparent 70%)`,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

      {/* THREE.JS 3D MEDAL CANVAS (Full viewport, Zero-clipping) */}
      <div
        ref={canvasMountRef}
        className="absolute inset-0 z-20 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden"
      >
        {/* Ambient Halo Glow */}
        <div className="absolute w-[450px] sm:w-[680px] h-[450px] sm:h-[680px] rounded-full bg-gradient-to-r from-[#F2C21B]/15 via-white/10 to-[#F2C21B]/15 blur-3xl -z-10 animate-pulse" />
      </div>

      {/* INITIAL SCROLL HINT (Disappears on scroll) */}
      <div
        ref={hintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
      >
        <span className="text-[11px] font-mono tracking-widest text-[#F2C21B] uppercase bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          {loading ? "Carregando Medalha 3D…" : "Role para navegar"}
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-[#F2C21B] rounded-full animate-bounce" />
        </div>
      </div>

      {/* FINAL HERO REVEAL CONTENT (EXACT MATCH OF OFFICIAL HOMEPAGE PRINT 3) */}
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

      {/* Right Vertical Scroll Label (Official indicator from Print 3) */}
      <div className="absolute right-8 bottom-8 hidden lg:flex flex-col items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#AAA8A1] z-30 pointer-events-none">
        <span className="writing-mode-vertical">Rolar Para Conhecer</span>
        <span className="text-[#F2C21B] text-lg animate-bounce">↓</span>
      </div>
    </div>
  );
}
