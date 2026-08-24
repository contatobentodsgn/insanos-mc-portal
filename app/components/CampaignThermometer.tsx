"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconFire, IconChat, IconPin } from "./ui/Icons";

interface DropPoint {
  city: string;
  state: string;
  location: string;
  responsible: string;
  phone: string;
}

export interface DragPoint {
  x: number;
  y: number;
  label?: string;
}

const DEFAULT_MOBILE_POINTS: DragPoint[] = [
  { x: 238, y: 411, label: "01" },
  { x: 337, y: 412, label: "02" },
  { x: 452, y: 429, label: "03" },
  { x: 578, y: 389, label: "04" },
  { x: 699, y: 371, label: "05" },
  { x: 860, y: 385, label: "06" },
  { x: 991, y: 429, label: "07" },
  { x: 1099, y: 464, label: "08" },
];

function getCatmullRomSVG(pts: DragPoint[], k = 0.5): string {
  if (!pts || pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * k * 2;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * k * 2;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * k * 2;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * k * 2;

    d += ` C ${Math.round(cp1x * 10) / 10} ${Math.round(cp1y * 10) / 10}, ${Math.round(cp2x * 10) / 10} ${Math.round(cp2y * 10) / 10}, ${p2.x} ${p2.y}`;
  }
  return d;
}

const DROP_POINTS: DropPoint[] = [
  { city: "Osasco", state: "SP", location: "Sede Matriz — Av. dos Autonomistas", responsible: "Diretoria Social Matriz", phone: "(11) 98888-1818" },
  { city: "São Paulo", state: "SP", location: "Sub-Sede Z/L — Tatuapé / Mooca", responsible: "Dir. Social Capital", phone: "(11) 97777-1818" },
  { city: "Rio de Janeiro", state: "RJ", location: "Divisão Guanabara — Barra da Tijuca", responsible: "Dir. Social RJ", phone: "(21) 99999-1818" },
  { city: "Belo Horizonte", state: "MG", location: "Divisão Minas Gerais — Savassi", responsible: "Dir. Social MG", phone: "(31) 98888-1818" },
  { city: "Curitiba", state: "PR", location: "Divisão Paraná — Batel", responsible: "Dir. Social Sul", phone: "(41) 99999-1818" },
  { city: "Salvador", state: "BA", location: "Divisão Bahia — Pituba", responsible: "Dir. Social Nordeste", phone: "(71) 98888-1818" },
];

export function CampaignThermometer() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  
  // Live Visual Calibrator Controls (Active only for Admin)
  const [showCalibrator, setShowCalibrator] = useState(false);
  const [calibratorTab, setCalibratorTab] = useState<"background" | "road_mobile" | "road_desktop">("road_mobile");
  
  // Desktop Road SVG Controls
  const [viewBoxX, setViewBoxX] = useState(225);
  const [viewBoxY, setViewBoxY] = useState(275);
  const [viewBoxW, setViewBoxW] = useState(895);
  const [viewBoxH, setViewBoxH] = useState(152);
  const [lineWidth, setLineWidth] = useState(4);

  // Mobile Road SVG Controls (Default Calibrado Oficial)
  const [viewBoxMobileX, setViewBoxMobileX] = useState(176);
  const [viewBoxMobileY, setViewBoxMobileY] = useState(277);
  const [viewBoxMobileW, setViewBoxMobileW] = useState(935);
  const [viewBoxMobileH, setViewBoxMobileH] = useState(80);
  const [lineWidthMobile, setLineWidthMobile] = useState(8);
  const [roadMobileOffsetY, setRoadMobileOffsetY] = useState(-32);

  // Interactive Drag-and-Drop Control Points on Mobile SVG
  const [mobilePoints, setMobilePoints] = useState<DragPoint[]>(DEFAULT_MOBILE_POINTS);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [dragModeEnabled, setDragModeEnabled] = useState(true);
  const mobileSvgRef = useRef<SVGSVGElement | null>(null);
  
  // Background Image Manual Position Controls (Default Calibrado Oficial)
  const [bgMobileY, setBgMobileY] = useState(-6);
  const [bgMobileX, setBgMobileX] = useState(50);
  const [bgMobileZoom, setBgMobileZoom] = useState(102);
  const [bgDesktopY, setBgDesktopY] = useState(0);
  const [bgDesktopX, setBgDesktopX] = useState(50);
  const [bgDesktopZoom, setBgDesktopZoom] = useState(100);

  const [copied, setCopied] = useState(false);

  // Check admin session and load saved calibration from localStorage if available
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const isInsideAdminIframe = window.self !== window.top && window.location.search.includes("admin=true");
        const isOnAdminPage = window.location.pathname.startsWith("/admin");
        const hasAdmin = isOnAdminPage || isInsideAdminIframe;
        setIsAdmin(hasAdmin);
      }
      const savedRoad = localStorage.getItem("insanos_road_calib");
      if (savedRoad) {
        const parsed = JSON.parse(savedRoad);
        if (parsed.viewBoxX !== undefined) setViewBoxX(parsed.viewBoxX);
        if (parsed.viewBoxY !== undefined) setViewBoxY(parsed.viewBoxY);
        if (parsed.viewBoxW !== undefined) setViewBoxW(parsed.viewBoxW);
        if (parsed.viewBoxH !== undefined) setViewBoxH(parsed.viewBoxH);
        if (parsed.lineWidth !== undefined) setLineWidth(parsed.lineWidth);
      }
      const savedRoadMobile = localStorage.getItem("insanos_road_mobile_calib");
      if (savedRoadMobile) {
        const parsed = JSON.parse(savedRoadMobile);
        if (parsed.viewBoxMobileX !== undefined) setViewBoxMobileX(parsed.viewBoxMobileX);
        if (parsed.viewBoxMobileY !== undefined) setViewBoxMobileY(parsed.viewBoxMobileY);
        if (parsed.viewBoxMobileW !== undefined) setViewBoxMobileW(parsed.viewBoxMobileW);
        if (parsed.viewBoxMobileH !== undefined) setViewBoxMobileH(parsed.viewBoxMobileH);
        if (parsed.lineWidthMobile !== undefined) setLineWidthMobile(parsed.lineWidthMobile);
        if (parsed.roadMobileOffsetY !== undefined) setRoadMobileOffsetY(parsed.roadMobileOffsetY);
      }
      const savedPoints = localStorage.getItem("insanos_road_points_calib");
      if (savedPoints) {
        const parsed = JSON.parse(savedPoints);
        if (Array.isArray(parsed) && parsed.length === 7) {
          // Migration: insert new point between point 0 and point 1
          const upgraded: DragPoint[] = [
            { ...parsed[0], label: "01" },
            { x: Math.round((parsed[0].x + parsed[1].x) / 2), y: Math.round((parsed[0].y + parsed[1].y) / 2), label: "02" },
            { ...parsed[1], label: "03" },
            { ...parsed[2], label: "04" },
            { ...parsed[3], label: "05" },
            { ...parsed[4], label: "06" },
            { ...parsed[5], label: "07" },
            { ...parsed[6], label: "08" },
          ];
          setMobilePoints(upgraded);
          localStorage.setItem("insanos_road_points_calib", JSON.stringify(upgraded));
        } else if (Array.isArray(parsed) && parsed.length >= 2) {
          setMobilePoints(parsed);
        }
      }
      const savedBg = localStorage.getItem("insanos_campaign_bg_calib");
      if (savedBg) {
        const parsed = JSON.parse(savedBg);
        if (parsed.bgMobileY !== undefined) setBgMobileY(parsed.bgMobileY);
        if (parsed.bgMobileX !== undefined) setBgMobileX(parsed.bgMobileX);
        if (parsed.bgMobileZoom !== undefined) setBgMobileZoom(parsed.bgMobileZoom);
        if (parsed.bgDesktopY !== undefined) setBgDesktopY(parsed.bgDesktopY);
        if (parsed.bgDesktopX !== undefined) setBgDesktopX(parsed.bgDesktopX);
        if (parsed.bgDesktopZoom !== undefined) setBgDesktopZoom(parsed.bgDesktopZoom);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Pointer event handlers for visual Drag-and-Drop
  const handlePointerDownPoint = (index: number, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePointIndex(index);
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMoveSvg = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activePointIndex === null || !mobileSvgRef.current) return;
    e.preventDefault();
    const svg = mobileSvgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const svgP = pt.matrixTransform(ctm.inverse());
    if (!svgP) return;

    const newX = Math.round(svgP.x);
    const newY = Math.round(svgP.y);

    setMobilePoints((prev) => {
      const next = [...prev];
      if (next[activePointIndex]) {
        next[activePointIndex] = {
          ...next[activePointIndex],
          x: newX,
          y: newY,
        };
      }
      try {
        localStorage.setItem("insanos_road_points_calib", JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const handlePointerUpSvg = (e: React.PointerEvent) => {
    if (activePointIndex !== null) {
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch {}
      setActivePointIndex(null);
    }
  };

  // Fine-tune selected point with buttons
  const nudgePoint = (index: number, dx: number, dy: number) => {
    setMobilePoints((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = {
          ...next[index],
          x: next[index].x + dx,
          y: next[index].y + dy,
        };
      }
      try {
        localStorage.setItem("insanos_road_points_calib", JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const addPointBetween = (index: number) => {
    setMobilePoints((prev) => {
      if (index >= prev.length - 1) return prev;
      const p1 = prev[index];
      const p2 = prev[index + 1];
      const newPt: DragPoint = {
        x: Math.round((p1.x + p2.x) / 2),
        y: Math.round((p1.y + p2.y) / 2),
        label: `+`,
      };
      const next = [...prev.slice(0, index + 1), newPt, ...prev.slice(index + 1)];
      try {
        localStorage.setItem("insanos_road_points_calib", JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const removePoint = (index: number) => {
    if (mobilePoints.length <= 2) return;
    setMobilePoints((prev) => {
      const next = prev.filter((_, i) => i !== index);
      try {
        localStorage.setItem("insanos_road_points_calib", JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  // Save desktop road calibration to localStorage
  const updateCalibration = (updates: Partial<{ viewBoxX: number; viewBoxY: number; viewBoxW: number; viewBoxH: number; lineWidth: number }>) => {
    if (updates.viewBoxX !== undefined) setViewBoxX(updates.viewBoxX);
    if (updates.viewBoxY !== undefined) setViewBoxY(updates.viewBoxY);
    if (updates.viewBoxW !== undefined) setViewBoxW(updates.viewBoxW);
    if (updates.viewBoxH !== undefined) setViewBoxH(updates.viewBoxH);
    if (updates.lineWidth !== undefined) setLineWidth(updates.lineWidth);

    try {
      const current = {
        viewBoxX: updates.viewBoxX ?? viewBoxX,
        viewBoxY: updates.viewBoxY ?? viewBoxY,
        viewBoxW: updates.viewBoxW ?? viewBoxW,
        viewBoxH: updates.viewBoxH ?? viewBoxH,
        lineWidth: updates.lineWidth ?? lineWidth,
      };
      localStorage.setItem("insanos_road_calib", JSON.stringify(current));
    } catch (e) {
      console.error(e);
    }
  };

  // Save mobile road calibration to localStorage
  const updateMobileRoadCalibration = (updates: Partial<{
    viewBoxMobileX: number;
    viewBoxMobileY: number;
    viewBoxMobileW: number;
    viewBoxMobileH: number;
    lineWidthMobile: number;
    roadMobileOffsetY: number;
  }>) => {
    if (updates.viewBoxMobileX !== undefined) setViewBoxMobileX(updates.viewBoxMobileX);
    if (updates.viewBoxMobileY !== undefined) setViewBoxMobileY(updates.viewBoxMobileY);
    if (updates.viewBoxMobileW !== undefined) setViewBoxMobileW(updates.viewBoxMobileW);
    if (updates.viewBoxMobileH !== undefined) setViewBoxMobileH(updates.viewBoxMobileH);
    if (updates.lineWidthMobile !== undefined) setLineWidthMobile(updates.lineWidthMobile);
    if (updates.roadMobileOffsetY !== undefined) setRoadMobileOffsetY(updates.roadMobileOffsetY);

    try {
      const current = {
        viewBoxMobileX: updates.viewBoxMobileX ?? viewBoxMobileX,
        viewBoxMobileY: updates.viewBoxMobileY ?? viewBoxMobileY,
        viewBoxMobileW: updates.viewBoxMobileW ?? viewBoxMobileW,
        viewBoxMobileH: updates.viewBoxMobileH ?? viewBoxMobileH,
        lineWidthMobile: updates.lineWidthMobile ?? lineWidthMobile,
        roadMobileOffsetY: updates.roadMobileOffsetY ?? roadMobileOffsetY,
      };
      localStorage.setItem("insanos_road_mobile_calib", JSON.stringify(current));
    } catch (e) {
      console.error(e);
    }
  };

  // Save background image calibration to localStorage
  const updateBgCalibration = (updates: Partial<{
    bgMobileY: number;
    bgMobileX: number;
    bgMobileZoom: number;
    bgDesktopY: number;
    bgDesktopX: number;
    bgDesktopZoom: number;
  }>) => {
    if (updates.bgMobileY !== undefined) setBgMobileY(updates.bgMobileY);
    if (updates.bgMobileX !== undefined) setBgMobileX(updates.bgMobileX);
    if (updates.bgMobileZoom !== undefined) setBgMobileZoom(updates.bgMobileZoom);
    if (updates.bgDesktopY !== undefined) setBgDesktopY(updates.bgDesktopY);
    if (updates.bgDesktopX !== undefined) setBgDesktopX(updates.bgDesktopX);
    if (updates.bgDesktopZoom !== undefined) setBgDesktopZoom(updates.bgDesktopZoom);

    try {
      const current = {
        bgMobileY: updates.bgMobileY ?? bgMobileY,
        bgMobileX: updates.bgMobileX ?? bgMobileX,
        bgMobileZoom: updates.bgMobileZoom ?? bgMobileZoom,
        bgDesktopY: updates.bgDesktopY ?? bgDesktopY,
        bgDesktopX: updates.bgDesktopX ?? bgDesktopX,
        bgDesktopZoom: updates.bgDesktopZoom ?? bgDesktopZoom,
      };
      localStorage.setItem("insanos_campaign_bg_calib", JSON.stringify(current));
    } catch (e) {
      console.error(e);
    }
  };

  const resetBgCalibration = () => {
    setBgMobileY(-6);
    setBgMobileX(50);
    setBgMobileZoom(102);
    setBgDesktopY(0);
    setBgDesktopX(50);
    setBgDesktopZoom(100);
    try {
      localStorage.removeItem("insanos_campaign_bg_calib");
    } catch (e) {
      console.error(e);
    }
  };

  const resetMobileRoadCalibration = () => {
    setViewBoxMobileX(176);
    setViewBoxMobileY(277);
    setViewBoxMobileW(935);
    setViewBoxMobileH(80);
    setLineWidthMobile(8);
    setRoadMobileOffsetY(-32);
    setMobilePoints(DEFAULT_MOBILE_POINTS);
    try {
      localStorage.removeItem("insanos_road_mobile_calib");
      localStorage.removeItem("insanos_road_points_calib");
    } catch (e) {
      console.error(e);
    }
  };

  const resetCalibration = () => {
    setViewBoxX(225);
    setViewBoxY(275);
    setViewBoxW(895);
    setViewBoxH(152);
    setLineWidth(4);
    try {
      localStorage.removeItem("insanos_road_calib");
    } catch (e) {
      console.error(e);
    }
  };

  const copyConfig = () => {
    let text = "";
    if (calibratorTab === "road_mobile") {
      const generatedD = getCatmullRomSVG(mobilePoints);
      text = `Mobile Road Points:\n${JSON.stringify(mobilePoints, null, 2)}\n\nSVG Path d:\n"${generatedD}"\n\nSettings: viewBox="${viewBoxMobileX} ${viewBoxMobileY} ${viewBoxMobileW} ${viewBoxMobileH}" lineWidth=${lineWidthMobile} offsetY=${roadMobileOffsetY}px`;
    } else if (calibratorTab === "road_desktop") {
      text = `Desktop Road: viewBox="${viewBoxX} ${viewBoxY} ${viewBoxW} ${viewBoxH}" lineWidth=${lineWidth}`;
    } else {
      text = `Mobile BG: bgY=${bgMobileY}px bgX=${bgMobileX}% zoom=${bgMobileZoom}% | Desktop BG: bgY=${bgDesktopY}% bgX=${bgDesktopX}% zoom=${bgDesktopZoom}%`;
    }
    
    // Robust copy with fallback for mobile non-HTTPS
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).catch(() => {
        fallbackCopy(text);
      });
    } else {
      fallbackCopy(text);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (e) {
      console.error(e);
    }
    textArea.remove();
  };
  
  const goalTotal = 50000;
  const currentTotal = 42850;
  const percentage = Math.round((currentTotal / goalTotal) * 100);

  const filteredPoints = DROP_POINTS.filter((p) =>
    selectedFilter === "" ? true : p.state.toLowerCase() === selectedFilter.toLowerCase()
  );

  return (
    <div className="space-y-4 relative">
      {/* Botão de Calibração ao Vivo: APENAS NO PAINEL ADMIN */}
      {isAdmin && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-[#121316] rounded-xl border border-[#F2C21B]/40 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2C21B] animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#F2C21B] uppercase tracking-wider">
              Ajustes Visuais do Card (Painel Admin):
            </span>
          </div>

          <button
            onClick={() => setShowCalibrator(!showCalibrator)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 border ${
              showCalibrator
                ? "bg-[#F2C21B] text-black border-[#F2C21B] shadow-[0_0_15px_rgba(242,194,27,0.8)] font-extrabold"
                : "bg-[#1A1D24] text-[#F2C21B] border-[#F2C21B]/60 hover:bg-[#F2C21B] hover:text-black"
            }`}
          >
            <span>🛠️ {showCalibrator ? "Ocultar Painel de Ajustes" : "Ajustar Pista & Imagem de Fundo"}</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          PAINEL FLUTUANTE DE CALIBRAÇÃO AO VIVO (HUD PROFISSIONAL - SOMENTE ADMIN)
      ========================================================================= */}
      {isAdmin && showCalibrator && (
        <div className="p-5 rounded-2xl bg-[#090A0D]/95 border-2 border-[#F2C21B] shadow-[0_10px_40px_rgba(0,0,0,0.95)] backdrop-blur-xl z-50 transition-all animate-fadeIn">
          {/* Header e Abas do Calibrador */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/15 mb-4">
            <div className="flex items-center gap-3">
              <div className="inline-flex bg-black/60 p-1 rounded-lg border border-white/10 flex-wrap gap-1">
                <button
                  onClick={() => setCalibratorTab("background")}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold uppercase transition-colors ${
                    calibratorTab === "background"
                      ? "bg-[#F2C21B] text-black"
                      : "text-[#AAA8A1] hover:text-white"
                  }`}
                >
                  🖼️ Imagem de Fundo
                </button>
                <button
                  onClick={() => setCalibratorTab("road_mobile")}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold uppercase transition-colors ${
                    calibratorTab === "road_mobile"
                      ? "bg-[#F2C21B] text-black"
                      : "text-[#AAA8A1] hover:text-white"
                  }`}
                >
                  📱 Pista Mobile (SVG)
                </button>
                <button
                  onClick={() => setCalibratorTab("road_desktop")}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold uppercase transition-colors ${
                    calibratorTab === "road_desktop"
                      ? "bg-[#F2C21B] text-black"
                      : "text-[#AAA8A1] hover:text-white"
                  }`}
                >
                  💻 Pista Desktop (SVG)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyConfig}
                className="px-3 py-1 bg-[#F2C21B] hover:bg-[#ffe053] text-black text-xs font-bold font-mono rounded uppercase transition-colors"
              >
                {copied ? "✓ Copiado!" : "📋 Copiar Valores"}
              </button>
              <button
                onClick={() => {
                  if (calibratorTab === "road_mobile") resetMobileRoadCalibration();
                  else if (calibratorTab === "road_desktop") resetCalibration();
                  else resetBgCalibration();
                }}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-mono rounded uppercase transition-colors"
              >
                🔄 Resetar
              </button>
            </div>
          </div>

          {/* ABA 1: AJUSTE DA IMAGEM DE FUNDO */}
          {calibratorTab === "background" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F2C21B]">
                <span>📱</span>
                <strong>Ajuste da Imagem de Fundo no Mobile:</strong>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-white/90">
                {/* Vertical Y (Mobile) */}
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F2C21B] font-bold">↕️ Posição Vertical (Y):</span>
                    <span className="text-white font-bold">{bgMobileY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-150"
                    max="200"
                    step="2"
                    value={bgMobileY}
                    onChange={(e) => updateBgCalibration({ bgMobileY: Number(e.target.value) })}
                    className="w-full accent-[#F2C21B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/50 mt-1">
                    <span>Subir (-100px)</span>
                    <span>Descer (+100px)</span>
                  </div>
                </div>

                {/* Horizontal X (Mobile) */}
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F2C21B] font-bold">↔️ Posição Horizontal (X):</span>
                    <span className="text-white font-bold">{bgMobileX}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={bgMobileX}
                    onChange={(e) => updateBgCalibration({ bgMobileX: Number(e.target.value) })}
                    className="w-full accent-[#F2C21B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/50 mt-1">
                    <span>Esquerda (0%)</span>
                    <span>Centro (50%)</span>
                    <span>Direita (100%)</span>
                  </div>
                </div>

                {/* Zoom / Escala (Mobile) */}
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F2C21B] font-bold">🔍 Zoom / Escala da Imagem:</span>
                    <span className="text-white font-bold">{bgMobileZoom}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="220"
                    step="2"
                    value={bgMobileZoom}
                    onChange={(e) => updateBgCalibration({ bgMobileZoom: Number(e.target.value) })}
                    className="w-full accent-[#F2C21B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/50 mt-1">
                    <span>Menor (80%)</span>
                    <span>Normal (100%)</span>
                    <span>Maior (150%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 2: AJUSTE DA PISTA NO MOBILE */}
          {calibratorTab === "road_mobile" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F2C21B]">
                <span>📱</span>
                <strong>Ajuste da Pista / Traçado no Mobile:</strong>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono text-white/90">
                {/* 1. Mover Pista Mobile para Cima / Baixo (Offset Y) */}
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F2C21B] font-bold">↕️ Deslocar Pista (Y):</span>
                    <span className="text-white font-bold">{roadMobileOffsetY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-120"
                    max="150"
                    step="2"
                    value={roadMobileOffsetY}
                    onChange={(e) => updateMobileRoadCalibration({ roadMobileOffsetY: Number(e.target.value) })}
                    className="w-full accent-[#F2C21B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/50 mt-1">
                    <span>Subir (-80px)</span>
                    <span>Descer (+80px)</span>
                  </div>
                </div>

                {/* 2. Posição Vertical viewBox Y Mobile */}
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F2C21B] font-bold">📐 Curvatura / Foco Y:</span>
                    <span className="text-white font-bold">{viewBoxMobileY}px</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="400"
                    step="1"
                    value={viewBoxMobileY}
                    onChange={(e) => updateMobileRoadCalibration({ viewBoxMobileY: Number(e.target.value) })}
                    className="w-full accent-[#F2C21B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/50 mt-1">
                    <span>Baixo (200)</span>
                    <span>Alto (380)</span>
                  </div>
                </div>

                {/* 3. Posição Horizontal viewBox X Mobile */}
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F2C21B] font-bold">↔️ Posição Horizontal (X):</span>
                    <span className="text-white font-bold">{viewBoxMobileX}px</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="350"
                    step="1"
                    value={viewBoxMobileX}
                    onChange={(e) => updateMobileRoadCalibration({ viewBoxMobileX: Number(e.target.value) })}
                    className="w-full accent-[#F2C21B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/50 mt-1">
                    <span>Esquerda (100)</span>
                    <span>Direita (300)</span>
                  </div>
                </div>

                {/* 4. Largura / Escala Horizontal W Mobile */}
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F2C21B] font-bold">🔍 Escala / Largura (W):</span>
                    <span className="text-white font-bold">{viewBoxMobileW}px</span>
                  </div>
                  <input
                    type="range"
                    min="600"
                    max="1300"
                    step="5"
                    value={viewBoxMobileW}
                    onChange={(e) => updateMobileRoadCalibration({ viewBoxMobileW: Number(e.target.value) })}
                    className="w-full accent-[#F2C21B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/50 mt-1">
                    <span>Mais Curto (750)</span>
                    <span>Mais Longo (1150)</span>
                  </div>
                </div>

                {/* 5. Altura / Proporção H Mobile */}
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F2C21B] font-bold">📏 Altura da Curva (H):</span>
                    <span className="text-white font-bold">{viewBoxMobileH}px</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="280"
                    step="2"
                    value={viewBoxMobileH}
                    onChange={(e) => updateMobileRoadCalibration({ viewBoxMobileH: Number(e.target.value) })}
                    className="w-full accent-[#F2C21B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/50 mt-1">
                    <span>Achatar (100)</span>
                    <span>Alongar (200)</span>
                  </div>
                </div>

                {/* 6. Espessura da Linha Mobile */}
                <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#F2C21B] font-bold">✏️ Espessura da Linha:</span>
                    <span className="text-white font-bold">{lineWidthMobile}px</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.5"
                    value={lineWidthMobile}
                    onChange={(e) => updateMobileRoadCalibration({ lineWidthMobile: Number(e.target.value) })}
                    className="w-full accent-[#F2C21B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/50 mt-1">
                    <span>Fina (2px)</span>
                    <span>Grossa (10px)</span>
                  </div>
                </div>
              </div>

              {/* SEÇÃO ESPECIAL: ESCULTOR DE CURVA COM MOUSE/DEDO (DRAG AND DROP VISUAL) */}
              <div className="pt-4 border-t border-white/10 mt-4 space-y-3">
                <div className="p-3 bg-[#F2C21B]/10 rounded-xl border border-[#F2C21B]/30 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🖱️</span>
                    <div>
                      <h5 className="font-['Anton'] uppercase text-sm text-[#F2C21B] tracking-wide">
                        Modo Arrastar com Mouse ou Dedo: ATIVO
                      </h5>
                      <p className="text-[11px] text-[#C7C5BF] font-mono">
                        Basta clicar nos pinos circulares amarelos numerados na pista e arrastar para onde quiser!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMobilePoints(DEFAULT_MOBILE_POINTS)}
                      className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-mono font-bold transition-colors"
                    >
                      🔄 Resetar Pista Padrão
                    </button>
                  </div>
                </div>

                {/* Lista de Pontos e Ajuste Fino Pixel a Pixel */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs font-mono">
                  {mobilePoints.map((p, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border transition-all ${
                        activePointIndex === idx
                          ? "bg-[#F2C21B]/20 border-[#F2C21B] shadow-md scale-105"
                          : "bg-black/50 border-white/10 hover:border-white/25"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1 text-[11px]">
                        <span className="text-[#F2C21B] font-bold font-mono">Pino {idx + 1}:</span>
                        <span className="text-white font-bold">{p.x}, {p.y}</span>
                      </div>

                      {/* Botões de Direção / Nudge */}
                      <div className="grid grid-cols-2 gap-1 mt-1 text-[10px]">
                        <button
                          onClick={() => nudgePoint(idx, 0, -2)}
                          className="py-1 bg-white/10 hover:bg-white/25 rounded text-center active:scale-95 font-bold"
                          title="Subir (Y -2px)"
                        >
                          ▲ Subir
                        </button>
                        <button
                          onClick={() => nudgePoint(idx, 0, 2)}
                          className="py-1 bg-white/10 hover:bg-white/25 rounded text-center active:scale-95 font-bold"
                          title="Descer (Y +2px)"
                        >
                          ▼ Descer
                        </button>
                        <button
                          onClick={() => nudgePoint(idx, -3, 0)}
                          className="py-1 bg-white/10 hover:bg-white/25 rounded text-center active:scale-95 font-bold"
                          title="Esquerda (X -3px)"
                        >
                          ◀ Esq
                        </button>
                        <button
                          onClick={() => nudgePoint(idx, 3, 0)}
                          className="py-1 bg-white/10 hover:bg-white/25 rounded text-center active:scale-95 font-bold"
                          title="Direita (X +3px)"
                        >
                          Dir ▶
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: AJUSTE DA PISTA NO DESKTOP */}
          {calibratorTab === "road_desktop" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono text-white/90">
              {/* 1. Mover Linha para Cima / Baixo (Vertical Y) */}
              <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#F2C21B] font-bold">↕️ Posição Vertical (Y):</span>
                  <span className="text-white font-bold">{viewBoxY}px</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="400"
                  step="1"
                  value={viewBoxY}
                  onChange={(e) => updateCalibration({ viewBoxY: Number(e.target.value) })}
                  className="w-full accent-[#F2C21B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/50 mt-1">
                  <span>Mais Baixo (200)</span>
                  <span>Mais Alto (380)</span>
                </div>
              </div>

              {/* 2. Mover Linha para Esquerda / Direita (Horizontal X) */}
              <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#F2C21B] font-bold">↔️ Posição Horizontal (X):</span>
                  <span className="text-white font-bold">{viewBoxX}px</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="350"
                  step="1"
                  value={viewBoxX}
                  onChange={(e) => updateCalibration({ viewBoxX: Number(e.target.value) })}
                  className="w-full accent-[#F2C21B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/50 mt-1">
                  <span>Esquerda (100)</span>
                  <span>Direita (300)</span>
                </div>
              </div>

              {/* 3. Largura / Escala Horizontal */}
              <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#F2C21B] font-bold">🔍 Largura / Escala (W):</span>
                  <span className="text-white font-bold">{viewBoxW}px</span>
                </div>
                <input
                  type="range"
                  min="700"
                  max="1300"
                  step="5"
                  value={viewBoxW}
                  onChange={(e) => updateCalibration({ viewBoxW: Number(e.target.value) })}
                  className="w-full accent-[#F2C21B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/50 mt-1">
                  <span>Mais Curto (750)</span>
                  <span>Mais Longo (1150)</span>
                </div>
              </div>

              {/* 4. Altura / Proporção Vertical */}
              <div className="p-3 bg-black/60 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[#F2C21B] font-bold">📐 Altura / Curvatura (H):</span>
                  <span className="text-white font-bold">{viewBoxH}px</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="280"
                  step="2"
                  value={viewBoxH}
                  onChange={(e) => updateCalibration({ viewBoxH: Number(e.target.value) })}
                  className="w-full accent-[#F2C21B] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/50 mt-1">
                  <span>Achatar (100)</span>
                  <span>Alongar (200)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          ESTRUTURA OFICIAL: CINEMATOGRÁFICA (ESTRADA REAL)
      ========================================================================= */}
      <div className="rounded-3xl bg-[#090A0D] border border-[#F2C21B]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden relative transition-all duration-300">
          
          {/* Fundo Master 4K Oficial para Desktop e Versão Vertical com Posição Ajustável para Mobile */}
          <div
            className="hidden sm:block absolute inset-0 bg-cover bg-no-repeat pointer-events-none opacity-95 transition-all duration-150"
            style={{
              backgroundImage: `url('/images/insanos/campanha.webp')`,
              backgroundPosition: `${bgDesktopX}% ${bgDesktopY}%`,
              backgroundSize: bgDesktopZoom === 100 ? "cover" : `${bgDesktopZoom}% auto`,
            }}
          />
          <div
            className="block sm:hidden absolute inset-0 bg-no-repeat pointer-events-none opacity-95 transition-all duration-150"
            style={{
              backgroundImage: `url('/images/insanos/campanha_mobile.webp')`,
              backgroundPosition: `${bgMobileX}% ${bgMobileY}px`,
              backgroundSize: `${bgMobileZoom}% auto`,
            }}
          />

          {/* Vinhetas sutis de contraste para legibilidade */}
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/85 via-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090A0D] via-[#090A0D]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />

          {/* Estrutura de Conteúdo Unificada */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            
            {/* 1. TOP HEADER (Título + Missão + 86%) */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-4 sm:mb-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded bg-black/70 border border-[#F2C21B]/40 text-[#F2C21B] text-[10.5px] min-[380px]:text-xs font-mono font-bold uppercase tracking-wider mb-3 backdrop-blur-sm shadow-md whitespace-nowrap">
                  <IconFire className="w-3.5 h-3.5 text-[#F2C21B] shrink-0" />
                  <span>Campanha Nacional Ativa · Inverno 2026</span>
                </div>
                <h3 className="font-['Anton'] text-3xl sm:text-5xl lg:text-6xl uppercase text-white leading-[1.02] tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                  Campanha do<br />
                  <span className="text-[#F2C21B]">Agasalho & Alimentos</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#E0DED9] max-w-md mt-2 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Arrecadação simultânea em mais de 480 facções para distribuição noturna direta a famílias e pessoas em situação de vulnerabilidade.
                </p>
              </div>

              {/* 86% Big Counter */}
              <div className="text-right flex flex-col items-end">
                <span className="font-['Anton'] text-6xl sm:text-8xl lg:text-9xl text-[#F2C21B] drop-shadow-[0_0_35px_rgba(242,194,27,0.5)] leading-none">
                  {percentage}%
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#F2C21B] block mt-1 drop-shadow-md">
                  Meta Consolidada
                </span>
                <span className="text-xs sm:text-sm font-mono text-white/90 drop-shadow-md">
                  {currentTotal.toLocaleString("pt-BR")} / {goalTotal.toLocaleString("pt-BR")} itens
                </span>
              </div>
            </div>

            {/* 2. THE ROAD STAGE (Curva calibrável ao vivo com parâmetros dinâmicos) */}
            {/* Desktop Road View */}
            <div className="hidden sm:block relative w-full max-w-5xl mx-auto my-4 sm:my-6">
              <svg
                viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxW} ${viewBoxH}`}
                className="w-full h-auto overflow-visible select-none pointer-events-none"
              >
                <defs>
                  {/* Glowing beam filter */}
                  <filter id="road-center-glow-final" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <linearGradient id="road-highway-gold-final" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A6820C" />
                    <stop offset="60%" stopColor="#F2C21B" />
                    <stop offset="100%" stopColor="#FFF27A" />
                  </linearGradient>

                  {/* Pattern for High-Resolution Vector Checkered Flag */}
                  <pattern id="checkered-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
                    <rect width="3" height="3" fill="#FFFFFF" />
                    <rect x="3" width="3" height="3" fill="#111111" />
                    <rect y="3" width="3" height="3" fill="#111111" />
                    <rect x="3" y="3" width="3" height="3" fill="#FFFFFF" />
                  </pattern>
                </defs>

                {/* Inactive Trail Ahead (Linha cinza pontilhada no traçado exato do 11111.svg) */}
                <path
                  d="M238 411 C284 408.081 289.747 406.367 351 416.086 C446 431.16 434.52 438.618 517 408.081 C557.5 393.088 580 387.835 696.5 389.083 C773.996 389.913 810.824 389.492 851.324 391.992 C923.5 394.5 941.678 408.757 989.324 433.485 C1028.82 453.985 1066.32 460.485 1086.82 463.985 L1099 464.062"
                  fill="none"
                  stroke="#4A4E5C"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  opacity="0.4"
                />

                {/* Active Glowing Highway Yellow Line (86% de Progresso exatamente na rota do 11111.svg) */}
                <path
                  d="M238 411 C284 408.081 289.747 406.367 351 416.086 C446 431.16 434.52 438.618 517 408.081 C557.5 393.088 580 387.835 696.5 389.083 C773.996 389.913 810.824 389.492 851.324 391.992 C923.5 394.5 941.678 408.757 989.324 433.485 C1028.82 453.985 1066.32 460.485 1086.82 463.985 L1099 464.062"
                  fill="none"
                  stroke="url(#road-highway-gold-final)"
                  strokeWidth={lineWidth}
                  strokeLinecap="round"
                  strokeDasharray="882"
                  strokeDashoffset="126"
                  filter="url(#road-center-glow-final)"
                />

                {/* Marco Zero Dot (x=238, y=411 exato do 11111.svg) */}
                <circle cx="238" cy="411" r="7" fill="#090A0D" stroke="#F2C21B" strokeWidth="2" />
                <circle cx="238" cy="411" r="2.5" fill="#F2C21B" />

                {/* Meta Finish Circle (x=1099, y=464.062 exato do 11111.svg) */}
                <circle cx="1099" cy="464.062" r="7" fill="#090A0D" stroke="#AAA" strokeWidth="2" />
                <circle cx="1099" cy="464.062" r="2.5" fill="#AAA" />

                {/* Marco Zero Badge */}
                <g transform="translate(238, 411)">
                  <rect x="-60" y="-32" width="120" height="20" rx="4" fill="rgba(0,0,0,0.85)" stroke="#F2C21B" strokeWidth="1" />
                  <text x="0" y="-18" textAnchor="middle" fill="#F2C21B" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                    MARCO ZERO (0 ITENS)
                  </text>
                </g>

                {/* Dynamic Floating Location Pin on Road Center at 86% (x=980, y=428) */}
                <g transform="translate(980, 428)">
                  <g transform="translate(0, -28)">
                    <rect x="-46" y="-28" width="92" height="32" rx="8" fill="#090A0D" stroke="#F2C21B" strokeWidth="2" filter="drop-shadow(0 0 15px rgba(242,194,27,0.9))" />
                    <text x="0" y="-12" textAnchor="middle" fill="#F2C21B" fontSize="16" fontFamily="Anton, sans-serif" fontWeight="bold">
                      42.850
                    </text>
                    <text x="0" y="-2" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
                      ITENS ARRECADADOS
                    </text>
                    <polygon points="-4,4 4,4 0,9" fill="#F2C21B" />
                  </g>
                </g>

                {/* Bandeira Quadriculada Vetorial HD com Haste Plantada Diretamente no Centro da Meta (x=1099, y=464) */}
                <g className="animate-bounce" style={{ transformOrigin: "1099px 464px" }}>
                  <line x1="1099" y1="464.062" x2="1099" y2="422" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="1099" cy="422" r="2.5" fill="#F2C21B" />
                  <path
                    d="M 1099,423 Q 1109,420 1119,424 Q 1129,428 1131,423 L 1131,440 Q 1129,445 1119,441 Q 1109,437 1099,440 Z"
                    fill="url(#checkered-pattern)"
                    stroke="#FFFFFF"
                    strokeWidth="0.75"
                    filter="drop-shadow(0 2px 5px rgba(0,0,0,0.85))"
                  />
                </g>
              </svg>
            </div>

            {/* Mobile Road View (Interativo com Mouse & Touch Drag and Drop) */}
            <div
              className="block sm:hidden relative w-full max-w-5xl mx-auto my-3 transition-transform duration-150"
              style={{ transform: `translateY(${roadMobileOffsetY}px)` }}
            >
              <svg
                ref={mobileSvgRef}
                onPointerMove={handlePointerMoveSvg}
                onPointerUp={handlePointerUpSvg}
                onPointerLeave={handlePointerUpSvg}
                viewBox={`${viewBoxMobileX} ${viewBoxMobileY} ${viewBoxMobileW} ${viewBoxMobileH}`}
                className={`w-full h-auto overflow-visible select-none touch-none ${
                  showCalibrator ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <defs>
                  {/* Glowing beam filter */}
                  <filter id="road-center-glow-final-mob" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <linearGradient id="road-highway-gold-final-mob" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A6820C" />
                    <stop offset="60%" stopColor="#F2C21B" />
                    <stop offset="100%" stopColor="#FFF27A" />
                  </linearGradient>

                  <pattern id="checkered-pattern-mob" width="6" height="6" patternUnits="userSpaceOnUse">
                    <rect width="3" height="3" fill="#FFFFFF" />
                    <rect x="3" width="3" height="3" fill="#111111" />
                    <rect y="3" width="3" height="3" fill="#111111" />
                    <rect x="3" y="3" width="3" height="3" fill="#FFFFFF" />
                  </pattern>
                </defs>

                {/* Inactive Trail Ahead (Traçado Spline Suave) */}
                <path
                  d={getCatmullRomSVG(mobilePoints)}
                  fill="none"
                  stroke="#4A4E5C"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  opacity="0.4"
                />

                {/* Active Glowing Highway Yellow Line (86% de Progresso na curva) */}
                <path
                  d={getCatmullRomSVG(mobilePoints)}
                  fill="none"
                  stroke="url(#road-highway-gold-final-mob)"
                  strokeWidth={lineWidthMobile}
                  strokeLinecap="round"
                  strokeDasharray="882"
                  strokeDashoffset="126"
                  filter="url(#road-center-glow-final-mob)"
                />

                {/* Marco Zero Dot */}
                <circle cx={mobilePoints[0]?.x ?? 238} cy={mobilePoints[0]?.y ?? 411} r="7" fill="#090A0D" stroke="#F2C21B" strokeWidth="2" />
                <circle cx={mobilePoints[0]?.x ?? 238} cy={mobilePoints[0]?.y ?? 411} r="2.5" fill="#F2C21B" />

                {/* Meta Finish Circle */}
                <circle cx={mobilePoints[mobilePoints.length - 1]?.x ?? 1099} cy={mobilePoints[mobilePoints.length - 1]?.y ?? 464} r="7" fill="#090A0D" stroke="#AAA" strokeWidth="2" />
                <circle cx={mobilePoints[mobilePoints.length - 1]?.x ?? 1099} cy={mobilePoints[mobilePoints.length - 1]?.y ?? 464} r="2.5" fill="#AAA" />

                {/* Marco Zero Badge */}
                <g transform={`translate(${mobilePoints[0]?.x ?? 238}, ${mobilePoints[0]?.y ?? 411})`}>
                  <rect x="-60" y="-32" width="120" height="20" rx="4" fill="rgba(0,0,0,0.85)" stroke="#F2C21B" strokeWidth="1" />
                  <text x="0" y="-18" textAnchor="middle" fill="#F2C21B" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
                    MARCO ZERO (0 ITENS)
                  </text>
                </g>

                {/* Dynamic Floating Location Pin on Road Center at 86% */}
                <g transform={`translate(${mobilePoints[Math.min(mobilePoints.length - 2, 6)]?.x ?? 989}, ${mobilePoints[Math.min(mobilePoints.length - 2, 6)]?.y ?? 433})`}>
                  <g transform="translate(0, -28)">
                    <rect x="-46" y="-28" width="92" height="32" rx="8" fill="#090A0D" stroke="#F2C21B" strokeWidth="2" filter="drop-shadow(0 0 15px rgba(242,194,27,0.9))" />
                    <text x="0" y="-12" textAnchor="middle" fill="#F2C21B" fontSize="16" fontFamily="Anton, sans-serif" fontWeight="bold">
                      42.850
                    </text>
                    <text x="0" y="-2" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
                      ITENS ARRECADADOS
                    </text>
                    <polygon points="-4,4 4,4 0,9" fill="#F2C21B" />
                  </g>
                </g>

                {/* Bandeira Quadriculada Vetorial HD */}
                <g className="animate-bounce" style={{ transformOrigin: `${mobilePoints[mobilePoints.length - 1]?.x ?? 1099}px ${mobilePoints[mobilePoints.length - 1]?.y ?? 464}px` }}>
                  <line x1={mobilePoints[mobilePoints.length - 1]?.x ?? 1099} y1={mobilePoints[mobilePoints.length - 1]?.y ?? 464} x2={mobilePoints[mobilePoints.length - 1]?.x ?? 1099} y2={(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 42} stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
                  <circle cx={mobilePoints[mobilePoints.length - 1]?.x ?? 1099} cy={(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 42} r="2.5" fill="#F2C21B" />
                  <path
                    d={`M ${mobilePoints[mobilePoints.length - 1]?.x ?? 1099},${(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 41} Q ${(mobilePoints[mobilePoints.length - 1]?.x ?? 1099) + 10},${(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 44} ${(mobilePoints[mobilePoints.length - 1]?.x ?? 1099) + 20},${(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 40} Q ${(mobilePoints[mobilePoints.length - 1]?.x ?? 1099) + 30},${(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 36} ${(mobilePoints[mobilePoints.length - 1]?.x ?? 1099) + 32},${(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 41} L ${(mobilePoints[mobilePoints.length - 1]?.x ?? 1099) + 32},${(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 24} Q ${(mobilePoints[mobilePoints.length - 1]?.x ?? 1099) + 30},${(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 19} ${(mobilePoints[mobilePoints.length - 1]?.x ?? 1099) + 20},${(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 23} Q ${(mobilePoints[mobilePoints.length - 1]?.x ?? 1099) + 10},${(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 27} ${mobilePoints[mobilePoints.length - 1]?.x ?? 1099},${(mobilePoints[mobilePoints.length - 1]?.y ?? 464) - 24} Z`}
                    fill="url(#checkered-pattern-mob)"
                    stroke="#FFFFFF"
                    strokeWidth="0.75"
                    filter="drop-shadow(0 2px 5px rgba(0,0,0,0.85))"
                  />
                </g>

                {/* =========================================================================
                    PONTOS DE CONTROLE INTERATIVOS ARRASTÁVEIS COM O MOUSE / DEDO (HUD)
                ========================================================================= */}
                {showCalibrator && (
                  <g className="pointer-events-auto select-none">
                    {mobilePoints.map((p, idx) => (
                      <g
                        key={idx}
                        transform={`translate(${p.x}, ${p.y})`}
                        className="cursor-grab active:cursor-grabbing transition-transform"
                        onPointerDown={(e) => handlePointerDownPoint(idx, e)}
                      >
                        {/* Área de captura de toque invisível e grande */}
                        <circle r="36" fill="transparent" />

                        {/* Anel pulsante de destaque */}
                        <circle
                          r="18"
                          fill="rgba(242, 194, 27, 0.35)"
                          stroke="#F2C21B"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          className={activePointIndex === idx ? "animate-spin" : ""}
                        />

                        {/* Pino de centro */}
                        <circle
                          r="10"
                          fill={activePointIndex === idx ? "#FFF" : "#090A0D"}
                          stroke="#F2C21B"
                          strokeWidth="3.5"
                        />

                        {/* Número do Pino */}
                        <rect
                          x="-14"
                          y="-32"
                          width="28"
                          height="16"
                          rx="4"
                          fill="#090A0D"
                          stroke="#F2C21B"
                          strokeWidth="1.5"
                        />
                        <text
                          x="0"
                          y="-20.5"
                          textAnchor="middle"
                          fill="#F2C21B"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          {idx + 1}
                        </text>

                        {/* Tooltip de Coordenada ao vivo enquanto arrasta */}
                        {activePointIndex === idx && (
                          <g transform="translate(0, 36)">
                            <rect
                              x="-48"
                              y="-10"
                              width="96"
                              height="20"
                              rx="5"
                              fill="#F2C21B"
                              stroke="#000"
                              strokeWidth="1"
                            />
                            <text
                              x="0"
                              y="3.5"
                              textAnchor="middle"
                              fill="#000"
                              fontSize="9.5"
                              fontWeight="bold"
                              fontFamily="monospace"
                            >
                              X:{p.x} Y:{p.y}
                            </text>
                          </g>
                        )}
                      </g>
                    ))}
                  </g>
                )}
              </svg>
            </div>

            {/* 3. REGIONAL DROP POINTS (Espaçamento refinado: 80px desktop / 60px mobile) */}
            <div className="mt-[60px] sm:mt-[80px] pt-8 sm:pt-10 border-t border-white/15">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-2">
                <div>
                  <h4 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white tracking-wide drop-shadow-md">
                    Pontos de Coleta Oficiais por Região
                  </h4>
                  <p className="text-xs text-[#C7C5BF] font-mono mt-0.5">
                    Entregue diretamente na sede mais próxima da sua cidade
                  </p>
                </div>
                <div className="w-full sm:w-auto flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0 pt-1 -mx-1 px-1">
                  {["", "SP", "RJ", "MG", "PR", "BA"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedFilter(st)}
                      className={`min-h-[42px] px-4 sm:px-5 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-150 whitespace-nowrap active:scale-95 flex items-center justify-center ${
                        selectedFilter === st
                          ? "bg-[#F2C21B] text-black shadow-md font-extrabold"
                          : "bg-[#14161D]/90 backdrop-blur-md text-white/75 hover:text-white border border-white/10"
                      }`}
                    >
                      {st === "" ? "Todos" : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drop Points Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {filteredPoints.map((dp, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#0D0F14]/90 backdrop-blur-md border border-white/10 hover:border-[#F2C21B]/60 transition-all duration-200 group hover-lift shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconPin className="w-4 h-4 text-[#F2C21B] group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-mono font-bold text-[#F2C21B]">[{dp.state}] {dp.city}</span>
                      </div>
                      <span className="text-[11px] font-mono text-white/70">{dp.phone}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-white mb-1.5 leading-snug">{dp.location}</p>
                    <p className="text-xs text-[#AAA8A1]">{dp.responsible}</p>
                  </div>
                ))}
              </div>

              {/* Bottom Slogan & Textured Gold WhatsApp CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#F2C21B]" />
                  <span className="font-['Anton'] uppercase text-base sm:text-xl text-[#F2C21B] tracking-wider drop-shadow-md">
                    Ninguém enfrenta o frio sozinho.
                  </span>
                </div>

                <a
                  href="https://wa.me/5511988881818?text=Ola%2C%20gostaria%20de%20entregar%20uma%20doacao%20para%20a%20Campanha%20Insanos%20MC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider text-sm sm:text-base uppercase rounded-xl transition-all shadow-[0_0_25px_rgba(242,194,27,0.5)] hover:shadow-[0_0_40px_rgba(242,194,27,0.8)] flex items-center justify-center gap-3 hover-lift"
                >
                  <IconChat className="w-5 h-5 text-black" />
                  <span>Entregar Doação via WhatsApp</span>
                  <span className="font-sans font-bold">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
