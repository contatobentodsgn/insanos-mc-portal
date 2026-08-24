"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import * as d3 from "d3";
import {
  IconGlobe,
  IconArrowRight,
  IconPlus,
  IconMinus,
  IconRefresh,
  IconPause,
  IconPlay,
  IconRoute,
  IconPin,
} from "./ui/Icons";

interface SedeHub {
  id: string;
  name: string;
  badge: string;
  coords: [number, number]; // [Longitude, Latitude]
  country: string;
  state: string;
  address: string;
  meetingDay: string;
  faccoesNum: string;
  faccoesLabel: string;
  membersNum: string;
  membersLabel: string;
  leader: string;
  isMatriz?: boolean;
}

const SEDES_DATA: SedeHub[] = [
  {
    id: "osasco",
    name: "Sede Matriz Mundial — Osasco",
    badge: "Matriz Original de OZ",
    coords: [-46.7917, -23.5329],
    country: "Brasil",
    state: "SP",
    address: "Av. dos Autonomistas, 1818 — Osasco/SP",
    meetingDay: "Quintas-feiras às 20h00",
    faccoesNum: "480+",
    faccoesLabel: "Facções Globais",
    membersNum: "12.000+",
    membersLabel: "Integrantes",
    leader: "Comando Nacional",
    isMatriz: true,
  },
  {
    id: "sp-zl",
    name: "Sub-Sede Zona Leste — São Paulo",
    badge: "Divisão Capital Z/L",
    coords: [-46.5422, -23.5412],
    country: "Brasil",
    state: "SP",
    address: "Rua Tuiuti, 1200 — Tatuapé, São Paulo/SP",
    meetingDay: "Terças-feiras às 19h30",
    faccoesNum: "42",
    faccoesLabel: "Facções Regionais",
    membersNum: "850+",
    membersLabel: "Integrantes",
    leader: "Diretoria Regional Z/L",
  },
  {
    id: "rio-guanabara",
    name: "Sede Regional Rio de Janeiro",
    badge: "Divisão Guanabara",
    coords: [-43.1729, -22.9068],
    country: "Brasil",
    state: "RJ",
    address: "Av. das Américas, 4500 — Barra da Tijuca, Rio de Janeiro/RJ",
    meetingDay: "Quartas-feiras às 20h00",
    faccoesNum: "38",
    faccoesLabel: "Facções no RJ",
    membersNum: "680+",
    membersLabel: "Integrantes",
    leader: "Diretoria Estadual RJ",
  },
  {
    id: "bh-savassi",
    name: "Sede Regional Minas Gerais",
    badge: "Divisão Minas",
    coords: [-43.9378, -19.9208],
    country: "Brasil",
    state: "MG",
    address: "Rua Fernandes Tourinho, 300 — Savassi, Belo Horizonte/MG",
    meetingDay: "Quintas-feiras às 20h00",
    faccoesNum: "29",
    faccoesLabel: "Facções em MG",
    membersNum: "520+",
    membersLabel: "Integrantes",
    leader: "Diretoria Estadual MG",
  },
  {
    id: "curitiba-batel",
    name: "Sede Regional Paraná",
    badge: "Divisão Paraná",
    coords: [-49.2731, -25.4284],
    country: "Brasil",
    state: "PR",
    address: "Av. do Batel, 1500 — Batel, Curitiba/PR",
    meetingDay: "Sextas-feiras às 19h30",
    faccoesNum: "24",
    faccoesLabel: "Facções no Sul",
    membersNum: "410+",
    membersLabel: "Integrantes",
    leader: "Diretoria Regional Sul",
  },
  {
    id: "salvador-bahia",
    name: "Sede Regional Bahia",
    badge: "Divisão Bahia",
    coords: [-38.5108, -12.9714],
    country: "Brasil",
    state: "BA",
    address: "Av. Octávio Mangabeira, 2200 — Pituba, Salvador/BA",
    meetingDay: "Sábados às 18h00",
    faccoesNum: "19",
    faccoesLabel: "Facções Nordeste",
    membersNum: "340+",
    membersLabel: "Integrantes",
    leader: "Diretoria Regional Nordeste",
  },
  {
    id: "brasilia-df",
    name: "Sede Regional Distrito Federal",
    badge: "Divisão Planalto",
    coords: [-47.9292, -15.7801],
    country: "Brasil",
    state: "DF",
    address: "SIA Trecho 3, Lote 620 — Brasília/DF",
    meetingDay: "Quintas-feiras às 20h00",
    faccoesNum: "16",
    faccoesLabel: "Facções no DF",
    membersNum: "290+",
    membersLabel: "Integrantes",
    leader: "Diretoria Regional Centro-Oeste",
  },
  {
    id: "manaus-am",
    name: "Sede Regional Amazonas",
    badge: "Divisão Amazônia",
    coords: [-60.025, -3.1019],
    country: "Brasil",
    state: "AM",
    address: "Av. Coronel Teixeira, 1400 — Ponta Negra, Manaus/AM",
    meetingDay: "Sábados às 19h00",
    faccoesNum: "12",
    faccoesLabel: "Facções no Norte",
    membersNum: "220+",
    membersLabel: "Integrantes",
    leader: "Diretoria Regional Norte",
  },
  {
    id: "porto-alegre",
    name: "Sede Regional Rio Grande do Sul",
    badge: "Divisão Pampa",
    coords: [-51.2177, -30.0346],
    country: "Brasil",
    state: "RS",
    address: "Av. Ipiranga, 5200 — Porto Alegre/RS",
    meetingDay: "Sextas-feiras às 20h00",
    faccoesNum: "22",
    faccoesLabel: "Facções no RS",
    membersNum: "380+",
    membersLabel: "Integrantes",
    leader: "Diretoria Regional Sul",
  },
  // International Hubs
  {
    id: "lisboa-pt",
    name: "Sede Internacional Portugal",
    badge: "Divisão Lusitana",
    coords: [-9.1393, 38.7223],
    country: "Portugal",
    state: "PT",
    address: "Av. da Liberdade, 245 — Lisboa, Portugal",
    meetingDay: "Sextas-feiras às 20h00 (Hora Local)",
    faccoesNum: "8",
    faccoesLabel: "Facções na Europa",
    membersNum: "180+",
    membersLabel: "Integrantes",
    leader: "Comando Europa",
  },
  {
    id: "orlando-usa",
    name: "Sede Internacional Estados Unidos",
    badge: "Divisão North America",
    coords: [-81.3792, 28.5383],
    country: "Estados Unidos",
    state: "US",
    address: "International Dr, 8000 — Orlando, FL / USA",
    meetingDay: "Sábados às 19h00 (EST)",
    faccoesNum: "6",
    faccoesLabel: "Facções nos EUA",
    membersNum: "140+",
    membersLabel: "Integrantes",
    leader: "Comando América do Norte",
  },
  {
    id: "luanda-ao",
    name: "Sede Internacional Angola",
    badge: "Divisão África",
    coords: [13.2343, -8.839],
    country: "Angola",
    state: "AO",
    address: "Marginal de Luanda, Baía — Luanda, Angola",
    meetingDay: "Sábados às 17h00",
    faccoesNum: "4",
    faccoesLabel: "Facções em África",
    membersNum: "95+",
    membersLabel: "Integrantes",
    leader: "Comando África",
  },
  {
    id: "johannesburg-za",
    name: "Sede Internacional África do Sul",
    badge: "Divisão Rainbow",
    coords: [28.0473, -26.2041],
    country: "África do Sul",
    state: "ZA",
    address: "Sandton City, Rivonia Rd — Joanesburgo, África do Sul",
    meetingDay: "Domingos às 16h00",
    faccoesNum: "3",
    faccoesLabel: "Facções na África",
    membersNum: "70+",
    membersLabel: "Integrantes",
    leader: "Diretoria África do Sul",
  },
];

export function InteractiveMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedHub, setSelectedHub] = useState<SedeHub>(SEDES_DATA[0]);
  const [activeFilter, setActiveFilter] = useState<"todos" | "brasil" | "internacional">("todos");
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const isAutoRotatingRef = useRef<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredHub, setHoveredHub] = useState<SedeHub | null>(null);

  // Sync ref for smooth animation loop without tearing down canvas
  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

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
    isAutoRotatingRef.current = false;

    // Target rotation is negative coords to bring to center
    const targetLng = -sede.coords[0];
    const targetLat = -sede.coords[1];

    targetRotationRef.current = [targetLng, targetLat];
    if (baseRadiusRef.current) {
      targetScaleRef.current = baseRadiusRef.current * targetZoom;
    }
  }, []);

  const handleZoom = (delta: number) => {
    setIsAutoRotating(false);
    isAutoRotatingRef.current = false;
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
  };

  // Filter button handlers
  const handleFilterClick = (filter: "todos" | "brasil" | "internacional") => {
    setActiveFilter(filter);
    if (filter === "brasil") {
      focusOnSede(SEDES_DATA[0], 1.5);
    } else if (filter === "internacional") {
      focusOnSede(SEDES_DATA[9], 1.4); // Focus Lisbon/Europe
    } else {
      handleReset();
    }
  };

  const filteredHubs = SEDES_DATA.filter((s) => {
    if (activeFilter === "brasil") return s.country === "Brasil";
    if (activeFilter === "internacional") return s.country !== "Brasil";
    return true;
  });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 640;
    const height = Math.max(380, rect.height || 460);
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    context.scale(dpr, dpr);

    const radius = Math.min(width, height) / 2.3;
    baseRadiusRef.current = radius;
    let isTouchActive = false;

    // Inertia & momentum physics variables
    let velocityX = 0;
    let velocityY = 0;
    let lastTime = 0;
    let lastX = 0;
    let lastY = 0;

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
      } else if (!isDraggingRef.current && !isTouchActive) {
        // Natural Inertia / Momentum Decay with physics friction (0.93)
        if (Math.abs(velocityX) > 0.02 || Math.abs(velocityY) > 0.02) {
          rotationRef.current[0] += velocityX;
          rotationRef.current[1] = Math.max(-85, Math.min(85, rotationRef.current[1] - velocityY));
          velocityX *= 0.93;
          velocityY *= 0.93;
          projection.rotate(rotationRef.current);
        } else if (isAutoRotatingRef.current) {
          rotationRef.current[0] += 0.18;
          projection.rotate(rotationRef.current);
        }
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
        currentScale * 1.25
      );
      haloGrad.addColorStop(0, "rgba(242, 194, 27, 0.16)");
      haloGrad.addColorStop(0.4, "rgba(242, 194, 27, 0.03)");
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      context.fillStyle = haloGrad;
      context.beginPath();
      context.arc(center[0], center[1], currentScale * 1.25, 0, 2 * Math.PI);
      context.fill();

      // 2. Base Ocean Sphere (Night Dark Metal)
      context.beginPath();
      context.arc(center[0], center[1], currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#08090C";
      context.fill();
      context.strokeStyle = "rgba(242, 194, 27, 0.45)";
      context.lineWidth = 1.5;
      context.stroke();

      // 3. Grid Graticules
      const graticule = d3.geoGraticule();
      context.beginPath();
      path(graticule());
      context.strokeStyle = "rgba(255, 255, 255, 0.06)";
      context.lineWidth = 0.8;
      context.stroke();

      // 4. Landmass Outlines & Halftone Dotted Matrix
      if (landFeaturesRef.current) {
        context.beginPath();
        landFeaturesRef.current.features.forEach((feature: any) => {
          path(feature);
        });
        context.strokeStyle = "rgba(242, 194, 27, 0.35)";
        context.lineWidth = 1.0;
        context.stroke();

        // Draw Halftone Dotted Matrix
        allDotsRef.current.forEach((dot) => {
          const projected = projection(dot);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= width &&
            projected[1] >= 0 &&
            projected[1] <= height
          ) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.15, 0, 2 * Math.PI);
            context.fillStyle = "rgba(220, 220, 220, 0.65)";
            context.fill();
          }
        });
      }

      // 5. Inter-Continental Route Curves (Osasco Hub to World)
      const osasco = SEDES_DATA[0];
      SEDES_DATA.slice(1).forEach((dest) => {
        const link: any = { type: "LineString", coordinates: [osasco.coords, dest.coords] };
        context.beginPath();
        path(link);
        context.strokeStyle =
          dest.country === "Brasil"
            ? "rgba(242, 194, 27, 0.35)"
            : "rgba(255, 255, 255, 0.25)";
        context.lineWidth = dest.country === "Brasil" ? 1.4 : 1.0;
        context.setLineDash([4, 4]);
        context.stroke();
        context.setLineDash([]);
      });

      // 6. Georreferenced Sede Pins (Directly Clickable & Interactive with Enhanced Touch Hit Area)
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

        // Animated Golden Pulsing Ripple on Active Sede
        if (sede.isMatriz || isSelected || isHovered) {
          const pulseRadius = (isSelected ? 16 : 14) + Math.sin(pulseStep) * 6;
          context.beginPath();
          context.arc(px, py, pulseRadius, 0, 2 * Math.PI);
          context.strokeStyle = isSelected
            ? "rgba(242, 194, 27, 0.95)"
            : isHovered
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(242, 194, 27, 0.4)";
          context.lineWidth = isSelected ? 2.2 : 1.6;
          context.stroke();
        }

        // Pin Body Badge (Larger and clearer for mobile screens)
        const pinSize = isSelected ? 15 : isHovered ? 13.5 : sede.isMatriz ? 12 : 10;
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
        context.font = `bold ${pinSize > 11 ? 10 : 8.5}px 'Anton', sans-serif`;
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
          context.font = "bold 11px monospace";
          const textWidth = context.measureText(label).width;

          context.fillStyle = isSelected
            ? "rgba(242, 194, 27, 0.96)"
            : isHovered
            ? "rgba(255, 255, 255, 0.96)"
            : "rgba(0, 0, 0, 0.88)";
          context.fillRect(px - textWidth / 2 - 8, py - pinSize - 24, textWidth + 16, 20);
          context.strokeStyle = isSelected ? "rgba(0, 0, 0, 0.3)" : "rgba(242, 194, 27, 0.6)";
          context.lineWidth = 1.2;
          context.strokeRect(px - textWidth / 2 - 8, py - pinSize - 24, textWidth + 16, 20);

          context.fillStyle = isSelected ? "#000000" : isHovered ? "#000000" : "#FFFFFF";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(label, px, py - pinSize - 14);
        }
      });

      animFrame = requestAnimationFrame(render);
    };

    animFrame = requestAnimationFrame(render);

    // Mouse & Touch Drag Interaction
    let startX = 0;
    let startY = 0;
    let startRot: [number, number] = [0, 0];
    let isMouseDown = false;

    // Helper: Find pin under mouse/touch cursor with inflated hit target for mobile fingers (36px)
    const getPinUnderCursor = (clientX: number, clientY: number, isTouch = false): SedeHub | null => {
      const rect = canvas.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const clickY = clientY - rect.top;
      const centerCoords: [number, number] = [-rotationRef.current[0], -rotationRef.current[1]];

      // Inflated hitbox: 36px on touch, 24px on mouse
      const hitRadius = isTouch ? 36 : 24;
      let closest: SedeHub | null = null;
      let minDistance = hitRadius;

      for (const sede of SEDES_DATA) {
        if (d3.geoDistance(sede.coords, centerCoords) < Math.PI / 2) {
          const pt = projection(sede.coords);
          if (pt) {
            const dist = Math.hypot(pt[0] - clickX, pt[1] - clickY);
            if (dist < minDistance) {
              minDistance = dist;
              closest = sede;
            }
          }
        }
      }
      return closest;
    };

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      isDraggingRef.current = false;
      isAutoRotatingRef.current = false;
      setIsAutoRotating(false);
      targetRotationRef.current = null;
      velocityX = 0;
      velocityY = 0;
      startX = e.clientX;
      startY = e.clientY;
      startRot = [...rotationRef.current];
    };

    const onMouseMove = (e: MouseEvent) => {
      const hovered = getPinUnderCursor(e.clientX, e.clientY, false);
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
        const clicked = getPinUnderCursor(e.clientX, e.clientY, false);
        if (clicked) {
          focusOnSede(clicked, 2.2);
        }
      }
      isMouseDown = false;
      isDraggingRef.current = false;
      canvas.style.cursor = "grab";
    };

    // Touch Drag, Momentum and Pinch-to-Zoom with high precision for mobile smartphones
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let initialPinchDist = 0;
    let initialPinchScale = 0;

    const onTouchStart = (e: TouchEvent) => {
      isTouchActive = true;
      isAutoRotatingRef.current = false;
      setIsAutoRotating(false);
      velocityX = 0;
      velocityY = 0;
      targetRotationRef.current = null;

      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        lastX = touchStartX;
        lastY = touchStartY;
        lastTime = performance.now();
        touchStartTime = Date.now();
        startRot = [...rotationRef.current];
        isDraggingRef.current = false;
      } else if (e.touches.length === 2) {
        initialPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialPinchScale = projection.scale();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isTouchActive) return;
      if (e.touches.length === 1) {
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        const dx = clientX - touchStartX;
        const dy = clientY - touchStartY;

        if (Math.hypot(dx, dy) > 6) {
          isDraggingRef.current = true;
          if (e.cancelable) e.preventDefault();
        }

        if (isDraggingRef.current) {
          const sensitivity = 0.42;
          rotationRef.current[0] = startRot[0] + dx * sensitivity;
          rotationRef.current[1] = Math.max(-85, Math.min(85, startRot[1] - dy * sensitivity));
          projection.rotate(rotationRef.current);

          // Calculate velocity for natural momentum release
          const now = performance.now();
          const dt = Math.max(8, now - lastTime);
          velocityX = ((clientX - lastX) / dt) * 7.5;
          velocityY = ((clientY - lastY) / dt) * 7.5;
          lastX = clientX;
          lastY = clientY;
          lastTime = now;
        }
      } else if (e.touches.length === 2 && initialPinchDist > 0) {
        if (e.cancelable) e.preventDefault();
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = currentDist / initialPinchDist;
        const newScale = Math.max(radius * 0.75, Math.min(radius * 4.2, initialPinchScale * factor));
        projection.scale(newScale);
        setZoomLevel(newScale / radius);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        const tapDuration = Date.now() - touchStartTime;
        if (!isDraggingRef.current && tapDuration < 350) {
          // Precise mobile finger tap
          const clicked = getPinUnderCursor(touchStartX, touchStartY, true);
          if (clicked) {
            focusOnSede(clicked, 2.2);
          }
        }
        isTouchActive = false;
        isDraggingRef.current = false;

        // Clamp momentum speed to avoid extreme spins
        const maxV = 1.6;
        velocityX = Math.max(-maxV, Math.min(maxV, velocityX));
        velocityY = Math.max(-maxV, Math.min(maxV, velocityY));
      }
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
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(animFrame);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [focusOnSede]);

  return (
    <div className="bg-[#111215] border border-white/15 rounded-3xl overflow-hidden shadow-2xl">
      {/* Map Header & Clean Filter Controls */}
      <div className="p-5 sm:p-7 bg-[#16171B] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F2C21B] animate-pulse shrink-0" />
          <div>
            <span className="text-[11px] font-mono text-[#F2C21B] uppercase tracking-wider block font-bold">
              Malha Cartográfica Oficial
            </span>
            <h3 className="font-['Anton'] text-xl sm:text-2xl uppercase text-white tracking-wide">
              Sedes Regionais & Pontos de Apoio
            </h3>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-[#0A0A0B] p-1.5 rounded-xl border border-white/15 shadow-inner">
          <button
            onClick={() => handleFilterClick("todos")}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
              activeFilter === "todos"
                ? "bg-[#F2C21B] text-black shadow-[0_0_15px_rgba(242,194,27,0.3)] font-extrabold scale-[1.02]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Todas as Sedes ({SEDES_DATA.length})
          </button>
          <button
            onClick={() => handleFilterClick("brasil")}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
              activeFilter === "brasil"
                ? "bg-[#F2C21B] text-black shadow-[0_0_15px_rgba(242,194,27,0.3)] font-extrabold scale-[1.02]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Brasil (9)
          </button>
          <button
            onClick={() => handleFilterClick("internacional")}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
              activeFilter === "internacional"
                ? "bg-[#F2C21B] text-black shadow-[0_0_15px_rgba(242,194,27,0.3)] font-extrabold scale-[1.02]"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            Mundo (4)
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Dotted Canvas Earth + Detail Drawer */}
      <div className="grid lg:grid-cols-12 min-h-[500px]">
        {/* 3D Canvas Earth Container */}
        <div className="lg:col-span-7 p-4 sm:p-7 bg-[#0C0D0F] relative flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
          {/* Subtle Reset Button in Corner */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={handleReset}
              title="Centralizar na Matriz de Osasco/Brasil"
              className="px-3.5 py-2 rounded-lg bg-black/80 hover:bg-[#F2C21B] hover:text-black border border-white/20 text-white text-xs font-mono font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2 backdrop-blur-md cursor-pointer"
            >
              <IconRefresh className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Recentralizar Matriz</span>
            </button>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
              <div className="flex items-center gap-3 text-xs font-mono text-[#F2C21B]">
                <span className="w-3 h-3 rounded-full bg-[#F2C21B] animate-ping" />
                <span>Carregando mapa 3D...</span>
              </div>
            </div>
          )}

          {/* Canvas Container */}
          <div className="relative w-full h-[380px] sm:h-[430px] rounded-2xl bg-[#08090C] flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
            <canvas
              ref={canvasRef}
              className="w-full h-full select-none cursor-grab active:cursor-grabbing"
              style={{ touchAction: "none" }}
            />
          </div>

          {/* Quick-Access Horizontal Sede Carousel */}
          <div className="mt-3 block">
            <div className="text-[11px] font-mono text-[#AAA8A1] mb-1.5 flex items-center justify-between">
              <span>LOCALIZAR RAPIDAMENTE POR CIDADE:</span>
              <span className="text-[#F2C21B] font-bold">Arraste para girar</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none snap-x snap-mandatory">
              {filteredHubs.map((sede) => {
                const isSelected = selectedHub.id === sede.id;
                return (
                  <button
                    key={sede.id}
                    onClick={() => focusOnSede(sede, 2.2)}
                    className={`flex-shrink-0 snap-start min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all duration-150 flex items-center gap-1.5 border active:scale-95 whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-[#F2C21B] text-black border-[#F2C21B] shadow-[0_0_12px_rgba(242,194,27,0.6)] font-extrabold"
                        : "bg-[#14161D] text-white/80 border-white/10 hover:border-[#F2C21B]/40 hover:text-white"
                    }`}
                  >
                    <IconPin className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? "text-black" : "text-[#F2C21B]"}`} />
                    <span>[{sede.state}] {sede.name.split("—")[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Hub Detail Drawer */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-[#141519] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="px-3 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] text-xs font-mono font-bold uppercase tracking-wider border border-[#F2C21B]/30">
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

            <div className="space-y-3 mb-8">
              <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/10">
                <span className="text-[11px] text-[#AAA8A1] uppercase font-bold tracking-wider block mb-1">
                  Endereço / Sede Regional
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white">
                  {selectedHub.address}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/10">
                <span className="text-[11px] text-[#AAA8A1] uppercase font-bold tracking-wider block mb-1">
                  Encontros & Reuniões de Comboio
                </span>
                <p className="text-sm font-semibold text-white">{selectedHub.meetingDay}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs text-[#C7C5BF]">
                <div className="flex items-center gap-2 text-white">
                  <span className="text-[#F2C21B]">✓</span>
                  <span>Ponto de apoio e parada de abastecimento de comboios</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-[#F2C21B]">✓</span>
                  <span>Recepção de novos candidatos e visitantes de passagem</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `Insanos Moto Clube ${selectedHub.address}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-2 bg-white/10 hover:bg-white/20 text-white font-['Anton'] tracking-wider uppercase text-center text-xs sm:text-sm rounded-xl transition-colors duration-150 flex items-center justify-center gap-2 whitespace-nowrap border border-white/10"
            >
              <IconRoute className="w-4 h-4 text-[#F2C21B] flex-shrink-0" />
              <span>Traçar Rota</span>
            </a>
            <Link
              href="/faca-parte"
              className="w-full py-3.5 px-2 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-center text-xs sm:text-sm rounded-xl transition-all duration-200 hover-lift shadow-lg flex items-center justify-center gap-1.5 whitespace-nowrap"
            >
              <span>Visitar Sede</span>
              <IconArrowRight className="w-3.5 h-3.5 text-black flex-shrink-0" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* Network Coverage Footnote */}
      <div className="p-4 bg-[#0A0A0C] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#AAA8A1]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>13 sedes regionais com ponto de apoio fixo em destaque. Mais de <strong>480 capítulos</strong> presentes em <strong>65 países</strong>.</span>
        </div>
        <Link
          href="/faca-parte"
          className="text-[#F2C21B] font-bold hover:underline whitespace-nowrap"
        >
          Não encontrou sua cidade? Encontre seu capítulo regional →
        </Link>
      </div>
    </div>
  );
}
