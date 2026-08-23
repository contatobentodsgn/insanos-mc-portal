"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconArrowRight, IconFire } from "./ui/Icons";

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

  useEffect(() => {
    if (!containerRef.current || !canvasMountRef.current) return;

    const mount = canvasMountRef.current;
    const width = mount.clientWidth || 800;
    const height = mount.clientHeight || 800;

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
    renderer.toneMappingExposure = 1.32;
    mount.appendChild(renderer.domElement);

    // 2. Scene & PBR Environment (Studio Chrome Reflections)
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    // 3. Camera (Closer distance for 1.5x larger scale and presence)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 2.5);

    // 4. Lights (Warm Sunset Key + Cool Blue Fill + Rim Highlight)
    scene.add(new THREE.AmbientLight(0xe8edf7, 0.9));

    const keyLight = new THREE.DirectionalLight(0xffc387, 4.0);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xbdd6ff, 2.8);
    fillLight.position.set(3, 2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffdfae, 2.2);
    rimLight.position.set(0, 4, -2.5);
    scene.add(rimLight);

    // 5. Load GLTF 3D Master Model
    let medalGroup = new THREE.Group();
    scene.add(medalGroup);

    let baseScale = 1.0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let mouseTiltX = 0;
    let mouseTiltY = 0;

    const loader = new GLTFLoader();
    loader.load(
      "/models/medalha_insanos_web_final.glb",
      (gltf) => {
        const root = gltf.scene;

        // Auto center bounding box
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        root.position.sub(center);

        // Enhance material reflectivity
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

    // Mouse movement parallax tilt on medal
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseTiltX = x * 0.25;
      mouseTiltY = y * 0.2;
    };
    window.addEventListener("mousemove", handleMouseMove);

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

            // 2 full turns (4 * PI) up to 75% scroll
            if (p <= 0.75) {
              targetRotationY = (p / 0.75) * (Math.PI * 4);
            } else {
              targetRotationY = Math.PI * 4;
            }
          },
        },
      });

      // Hint fade out
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

      // Darken background overlay
      tl.to(
        overlayRef.current,
        {
          opacity: 0.88,
          duration: 0.7,
          ease: "none",
        },
        0.1
      );

      // Medal exit: scale down and fade out near end of second turn
      tl.to(
        scrollObj,
        {
          scale: 0.18,
          opacity: 0,
          yOffset: -0.6,
          duration: 0.25,
          ease: "power2.inOut",
        },
        0.7
      );

      // Hero Content Reveal
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

    // 7. Render Loop with Smooth Damping
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth lerp for rotation and mouse tilt
      currentRotationY += (targetRotationY - currentRotationY) * 0.12;
      medalGroup.rotation.y = currentRotationY + mouseTiltX;
      medalGroup.rotation.x = mouseTiltY;

      // Scale & opacity & position
      const s = baseScale * scrollObj.scale;
      medalGroup.scale.set(s, s, s);
      medalGroup.position.y = scrollObj.yOffset;
      renderer.domElement.style.opacity = String(scrollObj.opacity);

      renderer.render(scene, camera);
    };
    animate();

    // 8. Responsive Resize
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
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
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0A] flex items-center justify-center border-b border-white/10"
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

      {/* THREE.JS 3D MEDAL CANVAS (Vector 3D PBR, 1.5x scale, Chrome Lighting) */}
      <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
        {/* Ambient Halo Glow */}
        <div className="absolute w-[450px] sm:w-[680px] h-[450px] sm:h-[680px] rounded-full bg-gradient-to-r from-[#F2C21B]/15 via-white/10 to-[#F2C21B]/15 blur-3xl -z-10 animate-pulse" />

        <div
          ref={canvasMountRef}
          className="relative w-[380px] h-[380px] sm:w-[540px] sm:h-[540px] md:w-[640px] md:h-[640px] flex items-center justify-center"
        />
      </div>

      {/* INITIAL SCROLL HINT */}
      <div
        ref={hintRef}
        className="absolute bottom-10 z-30 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-300"
      >
        <span className="text-[11px] font-mono tracking-widest text-[#F2C21B] uppercase bg-black/60 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          {loading ? "Carregando Medalha 3D…" : "Role para navegar"}
        </span>
        <div className="w-5 h-9 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-[#F2C21B] rounded-full animate-bounce" />
        </div>
      </div>

      {/* FINAL HERO REVEAL CONTENT */}
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
            O maior motoclube do Brasil e do mundo. Mais de 12.000 integrantes unidos pela honra,
            disciplina e o compromisso real com a caridade em mais de 70 países.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/faca-parte"
              className="inline-flex items-center gap-3 bg-[#F2C21B] hover:bg-[#ffe066] text-black font-bold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(242,194,27,0.4)] hover:scale-105 active:scale-95"
            >
              <IconFire className="w-5 h-5 text-black" />
              <span>Quero Fazer Parte</span>
              <IconArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#historia"
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-medium px-6 py-3.5 rounded-xl transition-all duration-300 backdrop-blur-md"
            >
              <span>Conheça Nossa História</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
