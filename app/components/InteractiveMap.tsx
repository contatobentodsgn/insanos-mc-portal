import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import * as d3 from "d3";
import {
  IconPlus,
  IconMinus,
  IconRefresh,
  IconPlay,
  IconPause,
  IconGlobe,
} from "./ui/Icons";

export interface SedeHub {
  id: string;
  name: string;
  state: string;
  country: string;
  badge: string;
  faccoesCount: number;
  membersCount: string;
  address: string;
  leader: string;
  meetingDay: string;
  coords: [number, number]; // [longitude, latitude]
  isMatriz?: boolean;
}

export const SEDES_DATA: SedeHub[] = [
  {
    id: "sp-matriz",
    name: "Matriz Original de OZ",
    state: "SP",
    country: "Brasil",
    badge: "Berço Oficial · Matriz Mundial",
    faccoesCount: 84,
    membersCount: "2.800+",
    address: "Av. dos Autonomistas — Osasco / SP",
    leader: "Comando Central Mundial",
    meetingDay: "Quartas e Sábados às 20h",
    coords: [-46.7917, -23.5329],
    isMatriz: true,
  },
  {
    id: "rj-divisao",
    name: "Divisão Guanabara",
    state: "RJ",
    country: "Brasil",
    badge: "Regional Sudeste",
    faccoesCount: 42,
    membersCount: "1.400+",
    address: "Av. Brasil / Barra da Tijuca — Rio de Janeiro / RJ",
    leader: "Dir. Regional RJ",
    meetingDay: "Quintas às 19h30",
    coords: [-43.1729, -22.9068],
  },
  {
    id: "mg-divisao",
    name: "Divisão Minas Gerais",
    state: "MG",
    country: "Brasil",
    badge: "Regional Sudeste",
    faccoesCount: 38,
    membersCount: "1.100+",
    address: "Av. do Contorno — Belo Horizonte / MG",
    leader: "Dir. Regional MG",
    meetingDay: "Terças e Sábados às 20h",
    coords: [-43.9378, -19.9208],
  },
  {
    id: "sul-curitiba",
    name: "Divisão Sul / Paraná",
    state: "PR",
    country: "Brasil",
    badge: "Regional Sul",
    faccoesCount: 32,
    membersCount: "950+",
    address: "Curitiba / PR",
    leader: "Dir. Regional Sul",
    meetingDay: "Quartas às 20h",
    coords: [-49.2731, -25.4284],
  },
  {
    id: "sul-poa",
    name: "Divisão Rio Grande do Sul",
    state: "RS",
    country: "Brasil",
    badge: "Regional Sul",
    faccoesCount: 26,
    membersCount: "820+",
    address: "Porto Alegre / RS",
    leader: "Dir. Regional RS",
    meetingDay: "Sextas às 20h",
    coords: [-51.2177, -30.0346],
  },
  {
    id: "nordeste-salvador",
    name: "Divisão Bahia & Nordeste",
    state: "BA",
    country: "Brasil",
    badge: "Regional Nordeste",
    faccoesCount: 45,
    membersCount: "1.300+",
    address: "Salvador / BA",
    leader: "Dir. Regional Nordeste",
    meetingDay: "Sábados às 18h",
    coords: [-38.5016, -12.9777],
  },
  {
    id: "centro-brasilia",
    name: "Divisão Distrito Federal & Centro",
    state: "DF",
    country: "Brasil",
    badge: "Regional Centro-Oeste",
    faccoesCount: 28,
    membersCount: "750+",
    address: "Brasília / DF",
    leader: "Dir. Regional DF/GO",
    meetingDay: "Quintas às 20h",
    coords: [-47.9292, -15.7801],
  },
  {
    id: "norte-manaus",
    name: "Divisão Norte / Amazônia",
    state: "AM",
    country: "Brasil",
    badge: "Regional Norte",
    faccoesCount: 18,
    membersCount: "480+",
    address: "Manaus / AM",
    leader: "Dir. Regional Norte",
    meetingDay: "Sábados às 19h",
    coords: [-60.0217, -3.119],
  },
  {
    id: "europa-lisboa",
    name: "Divisão Europa Ocidental",
    state: "PT",
    country: "Portugal",
    badge: "Divisão Internacional",
    faccoesCount: 16,
    membersCount: "450+",
    address: "Lisboa / Porto — Portugal",
    leader: "Dir. Regional Europa",
    meetingDay: "Sábados às 17h",
    coords: [-9.1393, 38.7223],
  },
  {
    id: "usa-miami",
    name: "Divisão North America",
    state: "US",
    country: "Estados Unidos",
    badge: "Divisão Internacional",
    faccoesCount: 14,
    membersCount: "420+",
    address: "Miami, Florida — USA",
    leader: "Dir. North America",
    meetingDay: "Domingos às 11h",
    coords: [-80.1918, 25.7617],
  },
  {
    id: "africa-capetown",
    name: "Divisão África do Sul",
    state: "ZA",
    country: "África do Sul",
    badge: "Divisão Internacional",
    faccoesCount: 10,
    membersCount: "290+",
    address: "Cape Town — África do Sul",
    leader: "Dir. África do Sul",
    meetingDay: "Sábados às 16h",
    coords: [18.4241, -33.9249],
  },
  {
    id: "oceania-sydney",
    name: "Divisão Oceania",
    state: "AU",
    country: "Austrália",
    badge: "Divisão Internacional",
    faccoesCount: 8,
    membersCount: "210+",
    address: "Sydney — Austrália",
    leader: "Dir. Oceania",
    meetingDay: "Domingos às 10h",
    coords: [151.2093, -33.8688],
  },
];

export function InteractiveMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedHub, setSelectedHub] = useState<SedeHub>(SEDES_DATA[0]);
  const [activeFilter, setActiveFilter] = useState<"todos" | "brasil" | "internacional">("todos");
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredHub, setHoveredHub] = useState<SedeHub | null>(null);

  // References for animation loop and d3 objects
  const projectionRef = useRef<d3.GeoProjection | null>(null);
  const rotationRef = useRef<[number, number]>([48, 15]); // Focus Brazil initial view
  const targetRotationRef = useRef<[number, number] | null>(null);
  const targetScaleRef = useRef<number | null>(null);
  const landFeaturesRef = useRef<any>(null);
  const allDotsRef = useRef<[number, number][]>([]);
  const baseRadiusRef = useRef<number>(200);
  const isDraggingRef = useRef<boolean>(false);
  const hoveredHubRef = useRef<SedeHub | null>(null);
  const selectedHubRef = useRef<SedeHub>(SEDES_DATA[0]);

  // Keep refs in sync for requestAnimationFrame
  useEffect(() => {
    selectedHubRef.current = selectedHub;
  }, [selectedHub]);

  useEffect(() => {
    hoveredHubRef.current = hoveredHub;
  }, [hoveredHub]);

  // Focus and rotate to a specific sede smoothly
  const focusOnSede = useCallback((sede: SedeHub, targetZoom = 2.0) => {
    setSelectedHub(sede);
    setIsAutoRotating(false);

    // Target rotation is negative coords to bring to center
    const targetLng = -sede.coords[0];
    const targetLat = -sede.coords[1];

    targetRotationRef.current = [targetLng, targetLat];
    if (baseRadiusRef.current) {
      targetScaleRef.current = baseRadiusRef.current * targetZoom;
    }
  }, []);

  const handleZoom = (delta: number) => {
    if (!projectionRef.current || !baseRadiusRef.current) return;
    const currentScale = projectionRef.current.scale();
    const newScale = Math.max(
      baseRadiusRef.current * 0.7,
      Math.min(baseRadiusRef.current * 4.5, currentScale + delta * baseRadiusRef.current * 0.4)
    );
    targetScaleRef.current = newScale;
  };

  const handleReset = () => {
    focusOnSede(SEDES_DATA[0], 1.2);
    setTimeout(() => {
      setIsAutoRotating(true);
    }, 1200);
  };

  // Filter button handlers
  const handleFilterClick = (filter: "todos" | "brasil" | "internacional") => {
    setActiveFilter(filter);
    if (filter === "brasil") {
      focusOnSede(SEDES_DATA[0], 1.5);
    } else if (filter === "internacional") {
      focusOnSede(SEDES_DATA[8], 1.4); // Focus Lisbon/Europe
    } else {
      handleReset();
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 640;
    const height = 480;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    context.scale(dpr, dpr);

    const radius = Math.min(width, height) / 2.3;
    baseRadiusRef.current = radius;

    const projection = d3
      .geoOrthographic()
      .scale(radius * 1.1)
      .translate([width / 2, height / 2])
      .rotate(rotationRef.current)
      .clipAngle(90);

    projectionRef.current = projection;
    const path = d3.geoPath().projection(projection).context(context);

    // Helper: Point in polygon for halftone land dots
    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === "Polygon") {
        if (!pointInPolygon(point, geometry.coordinates[0])) return false;
        for (let i = 1; i < geometry.coordinates.length; i++) {
          if (pointInPolygon(point, geometry.coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
      }
      return false;
    };

    const generateDots = (features: any[]) => {
      const dots: [number, number][] = [];
      features.forEach((feature) => {
        const bounds = d3.geoBounds(feature);
        const [[minLng, minLat], [maxLng, maxLat]] = bounds;
        const step = 1.6;
        for (let lng = minLng; lng <= maxLng; lng += step) {
          for (let lat = minLat; lat <= maxLat; lat += step) {
            const p: [number, number] = [lng, lat];
            if (pointInFeature(p, feature)) {
              dots.push(p);
            }
          }
        }
      });
      return dots;
    };

    // Load Natural Earth vector land data
    const loadGeoData = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json"
        );
        if (!res.ok) throw new Error("Network error");
        const json = await res.json();
        landFeaturesRef.current = json;
        allDotsRef.current = generateDots(json.features);
        setIsLoading(false);
      } catch (err) {
        console.warn("Using offline geometric fallback for globe:", err);
        setIsLoading(false);
      }
    };
    loadGeoData();

    // Render loop
    let animFrame: number;
    let pulseStep = 0;

    const render = () => {
      pulseStep += 0.05;
      context.clearRect(0, 0, width, height);

      // Smooth interpolation to target rotation / scale
      if (targetRotationRef.current) {
        const [targetX, targetY] = targetRotationRef.current;
        const [currX, currY] = rotationRef.current;
        const dx = targetX - currX;
        const dy = targetY - currY;

        rotationRef.current[0] += dx * 0.08;
        rotationRef.current[1] += dy * 0.08;

        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          targetRotationRef.current = null;
        }
        projection.rotate(rotationRef.current);
      } else if (isAutoRotating && !isDraggingRef.current) {
        rotationRef.current[0] += 0.2;
        projection.rotate(rotationRef.current);
      }

      if (targetScaleRef.current) {
        const currScale = projection.scale();
        const dScale = targetScaleRef.current - currScale;
        projection.scale(currScale + dScale * 0.1);
        if (Math.abs(dScale) < 0.5) {
          targetScaleRef.current = null;
        }
        setZoomLevel(projection.scale() / radius);
      }

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;
      const center = projection.translate();

      // 1. Globe Ambient Atmospheric Halo
      const haloGrad = context.createRadialGradient(
        center[0],
        center[1],
        currentScale * 0.85,
        center[0],
        center[1],
        currentScale * 1.2
      );
      haloGrad.addColorStop(0, "rgba(242, 194, 27, 0.15)");
      haloGrad.addColorStop(0.4, "rgba(242, 194, 27, 0.03)");
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      context.fillStyle = haloGrad;
      context.beginPath();
      context.arc(center[0], center[1], currentScale * 1.2, 0, 2 * Math.PI);
      context.fill();

      // 2. Dark Globe Background Body
      context.beginPath();
      context.arc(center[0], center[1], currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#0A0A0C";
      context.fill();
      context.strokeStyle = "rgba(242, 194, 27, 0.4)";
      context.lineWidth = 1.5 * Math.min(1.5, scaleFactor);
      context.stroke();

      // 3. Graticule
      const graticule = d3.geoGraticule().step([20, 20]);
      context.beginPath();
      path(graticule());
      context.strokeStyle = "rgba(255, 255, 255, 0.07)";
      context.lineWidth = 1;
      context.stroke();

      // 4. Land Features Outline & Halftone Dots
      if (landFeaturesRef.current) {
        context.beginPath();
        landFeaturesRef.current.features.forEach((feature: any) => {
          path(feature);
        });
        context.strokeStyle = "rgba(242, 194, 27, 0.35)";
        context.lineWidth = 1.2 * Math.min(1.5, scaleFactor);
        context.stroke();

        // Render Halftone dots
        allDotsRef.current.forEach(([lng, lat]) => {
          const pt = projection([lng, lat]);
          if (
            pt &&
            pt[0] >= 0 &&
            pt[0] <= width &&
            pt[1] >= 0 &&
            pt[1] <= height
          ) {
            context.beginPath();
            context.arc(pt[0], pt[1], 1.1 * Math.min(2, scaleFactor), 0, 2 * Math.PI);
            context.fillStyle = "rgba(180, 180, 185, 0.55)";
            context.fill();
          }
        });
      }

      // 5. Great-Circle Golden Arcs from Matriz in Osasco to International Hubs
      const matriz = SEDES_DATA[0];
      SEDES_DATA.filter((s) => s.country !== "Brasil").forEach((dest) => {
        const interpolator = d3.geoInterpolate(matriz.coords, dest.coords);
        const arcPoints: [number, number][] = [];
        for (let t = 0; t <= 1; t += 0.04) {
          arcPoints.push(interpolator(t));
        }

        context.beginPath();
        let started = false;
        arcPoints.forEach((p) => {
          const pt = projection(p);
          if (pt) {
            if (!started) {
              context.moveTo(pt[0], pt[1]);
              started = true;
            } else {
              context.lineTo(pt[0], pt[1]);
            }
          }
        });
        context.strokeStyle = "rgba(242, 194, 27, 0.35)";
        context.lineWidth = 1.5;
        context.setLineDash([4, 4]);
        context.stroke();
        context.setLineDash([]);
      });

      // 6. Georreferenced Sede Pins (Directly Clickable & Interactive)
      const centerCoords: [number, number] = [-rotationRef.current[0], -rotationRef.current[1]];

      SEDES_DATA.forEach((sede) => {
        const distance = d3.geoDistance(sede.coords, centerCoords);
        const isVisible = distance < Math.PI / 2;
        if (!isVisible) return;

        const pt = projection(sede.coords);
        if (!pt) return;

        const isSelected = selectedHubRef.current?.id === sede.id;
        const isHovered = hoveredHubRef.current?.id === sede.id;
        const [px, py] = pt;

        // Animated Golden Pulsing Rings
        if (sede.isMatriz || isSelected || isHovered) {
          const pulseRadius = 14 + Math.sin(pulseStep) * 6;
          context.beginPath();
          context.arc(px, py, pulseRadius, 0, 2 * Math.PI);
          context.strokeStyle = isSelected
            ? "rgba(242, 194, 27, 0.9)"
            : isHovered
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(242, 194, 27, 0.4)";
          context.lineWidth = 1.8;
          context.stroke();
        }

        // Pin Body Badge
        const pinSize = isSelected ? 14 : isHovered ? 13 : sede.isMatriz ? 11 : 9.5;
        context.beginPath();
        context.arc(px, py, pinSize, 0, 2 * Math.PI);
        context.fillStyle = isSelected
          ? "#F2C21B"
          : isHovered
          ? "#FFE053"
          : sede.isMatriz
          ? "#F2C21B"
          : "rgba(20, 22, 26, 0.95)";
        context.fill();
        context.strokeStyle = isSelected ? "#FFFFFF" : isHovered ? "#FFFFFF" : "#F2C21B";
        context.lineWidth = isSelected ? 2.5 : isHovered ? 2.0 : 1.5;
        context.stroke();

        // Pin Code Text (e.g. SP, RJ, PT, US)
        context.font = `bold ${pinSize > 11 ? 9.5 : 8.5}px 'Anton', sans-serif`;
        context.fillStyle = isSelected || isHovered || sede.isMatriz ? "#000000" : "#F2C21B";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(sede.state, px, py + 0.5);

        // Tooltip Label for Selected Hub, Hovered Hub, or on High Zoom
        if (
          isSelected ||
          isHovered ||
          (scaleFactor > 2.2 && (sede.isMatriz || sede.country !== "Brasil"))
        ) {
          const label = `${sede.name} ${isHovered && !isSelected ? "👆" : ""}`;
          context.font = "bold 10.5px monospace";
          const textWidth = context.measureText(label).width;

          context.fillStyle = isSelected
            ? "rgba(242, 194, 27, 0.95)"
            : isHovered
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(0, 0, 0, 0.85)";
          context.fillRect(px - textWidth / 2 - 8, py - pinSize - 22, textWidth + 16, 18);
          context.strokeStyle = isSelected ? "rgba(0, 0, 0, 0.3)" : "rgba(242, 194, 27, 0.5)";
          context.lineWidth = 1;
          context.strokeRect(px - textWidth / 2 - 8, py - pinSize - 22, textWidth + 16, 18);

          context.fillStyle = isSelected ? "#000000" : isHovered ? "#000000" : "#FFFFFF";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(label, px, py - pinSize - 13);
        }
      });

      animFrame = requestAnimationFrame(render);
    };

    animFrame = requestAnimationFrame(render);

    // Mouse drag & click interaction
    let startX = 0;
    let startY = 0;
    let startRot: [number, number] = [0, 0];
    let isMouseDown = false;

    // Helper: Find pin under mouse cursor
    const getPinUnderCursor = (clientX: number, clientY: number): SedeHub | null => {
      const rect = canvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;
      const centerCoords: [number, number] = [-rotationRef.current[0], -rotationRef.current[1]];

      for (const sede of SEDES_DATA) {
        if (d3.geoDistance(sede.coords, centerCoords) < Math.PI / 2) {
          const pt = projection(sede.coords);
          if (pt) {
            const dist = Math.hypot(pt[0] - clickX, pt[1] - clickY);
            if (dist < 22) {
              return sede;
            }
          }
        }
      }
      return null;
    };

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      isDraggingRef.current = false;
      setIsAutoRotating(false);
      startX = e.clientX;
      startY = e.clientY;
      startRot = [...rotationRef.current];
    };

    const onMouseMove = (e: MouseEvent) => {
      const hovered = getPinUnderCursor(e.clientX, e.clientY);
      setHoveredHub(hovered);
      canvas.style.cursor = hovered ? "pointer" : isMouseDown ? "grabbing" : "grab";

      if (!isMouseDown) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (Math.hypot(dx, dy) > 4) {
        isDraggingRef.current = true;
      }

      if (isDraggingRef.current) {
        const sensitivity = 0.35;
        rotationRef.current[0] = startRot[0] + dx * sensitivity;
        rotationRef.current[1] = Math.max(-85, Math.min(85, startRot[1] - dy * sensitivity));
        projection.rotate(rotationRef.current);
      }
    };

    const onMouseUp = (e: MouseEvent) => {
      if (isMouseDown && !isDraggingRef.current) {
        // Pure click without dragging: check if clicked on a pin
        const clicked = getPinUnderCursor(e.clientX, e.clientY);
        if (clicked) {
          focusOnSede(clicked, 2.2);
        }
      }
      isMouseDown = false;
      isDraggingRef.current = false;
      canvas.style.cursor = "grab";
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.3 : 0.3;
      handleZoom(delta);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animFrame);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [focusOnSede, isAutoRotating]);

  return (
    <div className="bg-[#111215] border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
      {/* Map Header & Filter Controls */}
      <div className="p-6 sm:p-8 bg-[#16171B] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2C21B] animate-pulse" />
            <span className="text-xs font-mono text-[#F2C21B] uppercase tracking-wider">
              Rede Geográfica Global · 3D Dotted Globe
            </span>
          </div>
          <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white">
            Globo Interativo de Sedes & Facções
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-[#0A0A0B] p-1 rounded-lg border border-white/10">
          <button
            onClick={() => handleFilterClick("todos")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-colors duration-150 ${
              activeFilter === "todos" ? "bg-[#F2C21B] text-black" : "text-white/60 hover:text-white"
            }`}
          >
            Todas as Sedes ({SEDES_DATA.length})
          </button>
          <button
            onClick={() => handleFilterClick("brasil")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-colors duration-150 ${
              activeFilter === "brasil" ? "bg-[#F2C21B] text-black" : "text-white/60 hover:text-white"
            }`}
          >
            Brasil (8)
          </button>
          <button
            onClick={() => handleFilterClick("internacional")}
            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-colors duration-150 ${
              activeFilter === "internacional" ? "bg-[#F2C21B] text-black" : "text-white/60 hover:text-white"
            }`}
          >
            Mundo (4)
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Dotted Canvas Earth + Right Drawer */}
      <div className="grid lg:grid-cols-12 min-h-[520px]">
        {/* 3D Canvas Earth Container */}
        <div className="lg:col-span-7 p-6 sm:p-8 bg-[#0C0D0F] relative flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          {/* Compass & Coordinates HUD */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#AAA8A1] bg-black/80 px-2.5 py-1 rounded border border-white/10 flex items-center gap-1.5">
              <IconGlobe className="w-3 h-3 text-[#F2C21B]" />
              <span>3D ORTHOGRAPHIC PROJECTION</span>
            </span>
          </div>

          {/* Floating Zoom & Rotation Controls HUD */}
          <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
            <button
              onClick={() => handleZoom(0.5)}
              title="Aproximar Zoom (Cidades)"
              className="w-8 h-8 rounded-lg bg-black/80 hover:bg-[#F2C21B] hover:text-black border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg"
            >
              <IconPlus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(-0.5)}
              title="Afastar Zoom (Mundo)"
              className="w-8 h-8 rounded-lg bg-black/80 hover:bg-[#F2C21B] hover:text-black border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg"
            >
              <IconMinus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              title="Centralizar na Matriz de Osasco/Brasil"
              className="w-8 h-8 rounded-lg bg-black/80 hover:bg-[#F2C21B] hover:text-black border border-white/20 text-white flex items-center justify-center transition-colors shadow-lg"
            >
              <IconRefresh className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              title={isAutoRotating ? "Pausar Rotação" : "Iniciar Rotação"}
              className={`w-8 h-8 rounded-lg border text-xs flex items-center justify-center transition-colors shadow-lg ${
                isAutoRotating
                  ? "bg-[#F2C21B] text-black border-[#F2C21B]"
                  : "bg-black/80 text-white border-white/20 hover:bg-white/20"
              }`}
            >
              {isAutoRotating ? <IconPause className="w-3.5 h-3.5" /> : <IconPlay className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
              <div className="flex items-center gap-3 text-xs font-mono text-[#F2C21B]">
                <span className="w-3 h-3 rounded-full bg-[#F2C21B] animate-ping" />
                <span>Carregando malha cartográfica 3D...</span>
              </div>
            </div>
          )}

          {/* Canvas */}
          <div className="relative w-full h-[390px] sm:h-[450px] rounded-xl bg-[#090A0C] flex items-center justify-center overflow-hidden border border-white/10">
            <canvas
              ref={canvasRef}
              className="w-full h-full select-none"
            />
          </div>

          {/* Clean HUD Instructions Footer (Pills removed for maximal clarity) */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#AAA8A1]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2C21B] shadow-[0_0_8px_#F2C21B]" />
              <span className="font-semibold text-white/90">
                Clique diretamente em qualquer pin dourado no globo para ver os detalhes da sede
              </span>
            </div>
            <span className="font-mono text-[#F2C21B] text-[11px]">
              Zoom: {zoomLevel.toFixed(1)}x • 480+ Facções
            </span>
          </div>
        </div>

        {/* Selected Hub Detail Drawer */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[#141519] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] text-xs font-mono font-bold uppercase tracking-wider">
                {selectedHub.badge}
              </span>
              <span className="text-xs font-mono text-[#AAA8A1]">{selectedHub.country}</span>
            </div>

            <h4 className="font-['Anton'] text-2xl sm:text-4xl uppercase text-white mb-2 leading-tight">
              {selectedHub.name}
            </h4>
            <p className="text-xs text-[#F2C21B] font-bold uppercase tracking-wider mb-6">
              Liderança: {selectedHub.leader}
            </p>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/10">
                <span className="text-[11px] text-[#AAA8A1] uppercase font-bold tracking-wider block mb-1">
                  Endereço / Sede Regional
                </span>
                <p className="text-sm font-semibold text-white">{selectedHub.address}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/10">
                <span className="text-[11px] text-[#AAA8A1] uppercase font-bold tracking-wider block mb-1">
                  Encontros & Reuniões de Comboio
                </span>
                <p className="text-sm font-semibold text-white">{selectedHub.meetingDay}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/10 text-center">
                  <strong className="block font-['Anton'] text-2xl text-[#F2C21B] tracking-[0.06em]">
                    {selectedHub.faccoesCount}
                  </strong>
                  <span className="text-[10px] text-[#AAA8A1] uppercase font-bold">Sub-Divisões</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/10 text-center">
                  <strong className="block font-['Anton'] text-2xl text-[#F2C21B] tracking-[0.06em]">
                    {selectedHub.membersCount}
                  </strong>
                  <span className="text-[10px] text-[#AAA8A1] uppercase font-bold">Integrantes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
            <Link
              href="/faca-parte"
              className="flex-1 py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-center text-sm rounded transition-colors duration-200 hover-lift shadow-lg"
            >
              Filiar-se a Esta Região ↘
            </Link>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `Insanos Moto Clube ${selectedHub.address}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors duration-150 flex items-center justify-center gap-1.5"
            >
              <span>Traçar Rota</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
