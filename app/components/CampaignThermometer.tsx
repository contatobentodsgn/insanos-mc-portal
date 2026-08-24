"use client";

import React, { useState } from "react";
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
  const [selectedFilter, setSelectedFilter] = useState("");
  const [mobileTranslateY, setMobileTranslateY] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("campaign_mobile_translate_y");
      if (saved) return parseInt(saved, 10);
    }
    return -14;
  });
  const [showCalibrator, setShowCalibrator] = useState(true);

  const updateTranslateY = (val: number) => {
    setMobileTranslateY(val);
    if (typeof window !== "undefined") {
      localStorage.setItem("campaign_mobile_translate_y", String(val));
    }
  };

  const goalTotal = 50000;
  const currentTotal = 42850;
  const percentage = Math.round((currentTotal / goalTotal) * 100);

  const filteredPoints = DROP_POINTS.filter((p) =>
    selectedFilter === "" ? true : p.state.toLowerCase() === selectedFilter.toLowerCase()
  );

  return (
    <div className="space-y-4 relative">
      {/* Painel de Ajuste Manual da Linha Mobile */}
      {showCalibrator && (
        <div className="p-3.5 bg-[#12141A]/95 border-2 border-[#F2C21B] rounded-[2px] shadow-[0_0_30px_rgba(242,194,27,0.35)] flex flex-col gap-2.5 z-30">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-[#F2C21B] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>🛠️ Ajuste Manual da Pista:</span>
              <span className="text-white font-['Anton'] text-lg px-2 py-0.5 bg-black border border-[#F2C21B]/40 rounded-[2px]">
                {mobileTranslateY}px
              </span>
            </span>
            <button
              onClick={() => setShowCalibrator(false)}
              className="text-xs text-white/70 hover:text-white px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-[2px] cursor-pointer"
            >
              Fechar Painel ✕
            </button>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="range"
              min="-60"
              max="40"
              value={mobileTranslateY}
              onChange={(e) => updateTranslateY(parseInt(e.target.value, 10))}
              className="w-full accent-[#F2C21B] cursor-pointer h-2 bg-black rounded-[2px]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => updateTranslateY(mobileTranslateY - 5)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white rounded-[2px] border border-white/20 active:scale-95 cursor-pointer"
            >
              -5px
            </button>
            <button
              onClick={() => updateTranslateY(mobileTranslateY - 1)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white rounded-[2px] border border-white/20 active:scale-95 cursor-pointer"
            >
              -1px
            </button>
            <button
              onClick={() => updateTranslateY(mobileTranslateY + 1)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white rounded-[2px] border border-white/20 active:scale-95 cursor-pointer"
            >
              +1px
            </button>
            <button
              onClick={() => updateTranslateY(mobileTranslateY + 5)}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white rounded-[2px] border border-white/20 active:scale-95 cursor-pointer"
            >
              +5px
            </button>
            <button
              onClick={() => updateTranslateY(-14)}
              className="px-3 py-1.5 bg-[#F2C21B]/20 hover:bg-[#F2C21B]/30 text-xs font-mono font-bold text-[#F2C21B] rounded-[2px] border border-[#F2C21B]/50 active:scale-95 cursor-pointer"
            >
              Padrão (-14px)
            </button>
            <span className="text-xs font-mono text-emerald-400 ml-auto font-bold">
              ✓ Valor Salvo: {mobileTranslateY}px
            </span>
          </div>
        </div>
      )}

      {/* =========================================================================
          ESTRUTURA OFICIAL: CINEMATOGRÁFICA (ESTRADA REAL)
      ========================================================================= */}
      <div className="rounded-3xl bg-[#090A0D] border border-[#F2C21B]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden relative transition-all duration-300">
        {/* Fundo Master 4K Oficial para Desktop e Versão Vertical para Mobile */}
        <div
          className="hidden sm:block absolute inset-0 bg-cover bg-no-repeat pointer-events-none opacity-95 transition-all duration-150"
          style={{
            backgroundImage: `url('/images/insanos/campanha.webp')`,
            backgroundPosition: "50% 0%",
            backgroundSize: "cover",
          }}
        />
        <div
          className="block sm:hidden absolute inset-0 bg-no-repeat pointer-events-none opacity-95 transition-all duration-150"
          style={{
            backgroundImage: `url('/images/insanos/campanha_mobile.webp')`,
            backgroundPosition: "50% -6px",
            backgroundSize: "102% auto",
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
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded bg-black/70 border border-[#F2C21B]/40 text-[#F2C21B] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-tight sm:tracking-wider mb-3 backdrop-blur-sm shadow-md max-w-full">
                <IconFire className="w-3.5 h-3.5 text-[#F2C21B] shrink-0" />
                <span className="truncate">Campanha Nacional Ativa · Inverno 2026</span>
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
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2C21B] block mt-1 drop-shadow-md">
                Meta Consolidada
              </span>
              <span className="text-xs sm:text-sm font-mono text-white/90 drop-shadow-md">
                {currentTotal.toLocaleString("pt-BR")} / {goalTotal.toLocaleString("pt-BR")} itens
              </span>
            </div>
          </div>

          {/* 2. THE ROAD STAGE */}
          {/* Desktop Road View */}
          <div className="hidden sm:block relative w-full max-w-5xl mx-auto my-4 sm:my-6">
            <svg
              viewBox="225 275 895 152"
              className="w-full h-auto overflow-visible select-none pointer-events-none"
            >
              <defs>
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

                <pattern id="checkered-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
                  <rect width="3" height="3" fill="#FFFFFF" />
                  <rect x="3" width="3" height="3" fill="#111111" />
                  <rect y="3" width="3" height="3" fill="#111111" />
                  <rect x="3" y="3" width="3" height="3" fill="#FFFFFF" />
                </pattern>
              </defs>

              {/* Inactive Trail Ahead */}
              <path
                d="M238 411 C284 408.081 289.747 406.367 351 416.086 C446 431.16 434.52 438.618 517 408.081 C557.5 393.088 580 387.835 696.5 389.083 C773.996 389.913 810.824 389.492 851.324 391.992 C923.5 394.5 941.678 408.757 989.324 433.485 C1028.82 453.985 1066.32 460.485 1086.82 463.985 L1099 464.062"
                fill="none"
                stroke="#4A4E5C"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                strokeLinecap="round"
                opacity="0.4"
              />

              {/* Active Glowing Highway Yellow Line (86%) */}
              <path
                d="M238 411 C284 408.081 289.747 406.367 351 416.086 C446 431.16 434.52 438.618 517 408.081 C557.5 393.088 580 387.835 696.5 389.083 C773.996 389.913 810.824 389.492 851.324 391.992 C923.5 394.5 941.678 408.757 989.324 433.485 C1028.82 453.985 1066.32 460.485 1086.82 463.985 L1099 464.062"
                fill="none"
                stroke="url(#road-highway-gold-final)"
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray="920"
                strokeDashoffset="128"
                filter="url(#road-center-glow-final)"
              />

              {/* Milestones on Desktop Road */}
              <g transform="translate(238, 411)">
                <circle r="6" fill="#090A0D" stroke="#F2C21B" strokeWidth="2.5" />
                <text x="0" y="24" textAnchor="middle" fill="#AAA8A1" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  0% (Início)
                </text>
              </g>

              <g transform="translate(517, 408)">
                <circle r="5" fill="#F2C21B" stroke="#090A0D" strokeWidth="2" />
                <text x="0" y="-14" textAnchor="middle" fill="#AAA8A1" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  25.000 (50%)
                </text>
              </g>

              <g transform="translate(851, 392)">
                <circle r="5" fill="#F2C21B" stroke="#090A0D" strokeWidth="2" />
                <text x="0" y="-14" textAnchor="middle" fill="#AAA8A1" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  37.500 (75%)
                </text>
              </g>

              {/* Dynamic Floating Location Pin on Road Center at 86% */}
              <g transform="translate(989, 433)">
                <g transform="translate(0, -32)">
                  <rect x="-54" y="-32" width="108" height="36" rx="4" fill="#090A0D" stroke="#F2C21B" strokeWidth="2" filter="drop-shadow(0 0 15px rgba(242,194,27,0.9))" />
                  <text x="0" y="-14" textAnchor="middle" fill="#F2C21B" fontSize="18" fontFamily="Anton, sans-serif" fontWeight="bold">
                    42.850
                  </text>
                  <text x="0" y="-2" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
                    ITENS ARRECADADOS
                  </text>
                  <polygon points="-5,4 5,4 0,10" fill="#F2C21B" />
                </g>
              </g>

              {/* 100% Meta Final Milestone Node on Desktop Road */}
              <g transform="translate(1099, 464)">
                <circle r="7" fill="#090A0D" stroke="#F2C21B" strokeWidth="3" />
                <text x="0" y="25" textAnchor="middle" fill="#F2C21B" fontSize="11" fontFamily="monospace" fontWeight="bold">
                  50.000 (100% Meta)
                </text>
              </g>

              {/* Vector Checkered Flag at Goal */}
              <g transform="translate(1099, 464)" className="animate-bounce" style={{ transformOrigin: "1099px 464px" }}>
                <line x1="0" y1="0" x2="0" y2="-44" stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="0" cy="-44" r="3" fill="#F2C21B" />
                <path
                  d="M 0,-43 Q 12,-46 24,-42 Q 36,-38 40,-43 L 40,-25 Q 36,-20 24,-24 Q 12,-28 0,-25 Z"
                  fill="url(#checkered-pattern)"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  filter="drop-shadow(0 2px 5px rgba(0,0,0,0.85))"
                />
              </g>
            </svg>
          </div>

          {/* Mobile Road View */}
          <div className="block sm:hidden relative w-full my-1 overflow-visible">
            <div className="w-full relative" style={{ transform: `translateY(${mobileTranslateY}px)` }}>
              <svg
                viewBox="176 277 935 80"
                className="w-full h-auto overflow-visible select-none"
              >
                <defs>
                  <filter id="road-center-glow-mob" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <linearGradient id="road-highway-gold-mob" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A6820C" />
                    <stop offset="60%" stopColor="#F2C21B" />
                    <stop offset="100%" stopColor="#FFF27A" />
                  </linearGradient>

                  <pattern id="checkered-pattern-mob" width="6" height="6" patternUnits="userSpaceOnUse">
                    <rect width="3" height="3" fill="#FFFFFF" />
                    <rect x="3" width="3" height="3" fill="#111111" />
                    <rect y="3" width="3" height="3" fill="#111111" />
                    <rect x="3" width="3" height="3" fill="#FFFFFF" />
                  </pattern>
                </defs>

                {/* Inactive Trail Ahead */}
                <path
                  d={getCatmullRomSVG(DEFAULT_MOBILE_POINTS)}
                  fill="none"
                  stroke="#4A4E5C"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  opacity="0.4"
                />

                {/* Active Glowing Highway Yellow Line */}
                <path
                  d={getCatmullRomSVG(DEFAULT_MOBILE_POINTS)}
                  fill="none"
                  stroke="url(#road-highway-gold-mob)"
                  strokeWidth={8}
                  strokeLinecap="round"
                  strokeDasharray="920"
                  strokeDashoffset="128"
                  filter="url(#road-center-glow-mob)"
                />

                {/* Milestones on Mobile Road */}
                <g transform={`translate(${DEFAULT_MOBILE_POINTS[0].x}, ${DEFAULT_MOBILE_POINTS[0].y})`}>
                  <circle r="6" fill="#090A0D" stroke="#F2C21B" strokeWidth="2.5" />
                  <text x="0" y="20" textAnchor="middle" fill="#AAA8A1" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                    0%
                  </text>
                </g>

                <g transform={`translate(${DEFAULT_MOBILE_POINTS[3].x}, ${DEFAULT_MOBILE_POINTS[3].y})`}>
                  <circle r="5" fill="#F2C21B" stroke="#090A0D" strokeWidth="2" />
                  <text x="0" y="-12" textAnchor="middle" fill="#AAA8A1" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                    50%
                  </text>
                </g>

                <g transform={`translate(${DEFAULT_MOBILE_POINTS[5].x}, ${DEFAULT_MOBILE_POINTS[5].y})`}>
                  <circle r="5" fill="#F2C21B" stroke="#090A0D" strokeWidth="2" />
                  <text x="0" y="-12" textAnchor="middle" fill="#AAA8A1" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                    75%
                  </text>
                </g>

                {/* Dynamic Floating Location Pin on Road Center at 86% */}
                <g transform={`translate(${DEFAULT_MOBILE_POINTS[6].x}, ${DEFAULT_MOBILE_POINTS[6].y})`}>
                  <g transform="translate(0, -28)">
                    <rect x="-48" y="-28" width="96" height="32" rx="4" fill="#090A0D" stroke="#F2C21B" strokeWidth="2" filter="drop-shadow(0 0 15px rgba(242,194,27,0.9))" />
                    <text x="0" y="-12" textAnchor="middle" fill="#F2C21B" fontSize="16" fontFamily="Anton, sans-serif" fontWeight="bold">
                      42.850
                    </text>
                    <text x="0" y="-2" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
                      ITENS ARRECADADOS
                    </text>
                    <polygon points="-4,4 4,4 0,9" fill="#F2C21B" />
                  </g>
                </g>

                {/* 100% Meta Final Milestone Node on Mobile Road */}
                <g transform={`translate(${DEFAULT_MOBILE_POINTS[7].x}, ${DEFAULT_MOBILE_POINTS[7].y})`}>
                  <circle r="6" fill="#090A0D" stroke="#F2C21B" strokeWidth="2.5" />
                  <text x="0" y="22" textAnchor="middle" fill="#F2C21B" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                    100% (50k)
                  </text>
                </g>

                {/* Bandeira Quadriculada Vetorial HD */}
                <g className="animate-bounce" style={{ transformOrigin: `${DEFAULT_MOBILE_POINTS[7].x}px ${DEFAULT_MOBILE_POINTS[7].y}px` }}>
                  <line x1={DEFAULT_MOBILE_POINTS[7].x} y1={DEFAULT_MOBILE_POINTS[7].y} x2={DEFAULT_MOBILE_POINTS[7].x} y2={DEFAULT_MOBILE_POINTS[7].y - 42} stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
                  <circle cx={DEFAULT_MOBILE_POINTS[7].x} cy={DEFAULT_MOBILE_POINTS[7].y - 42} r="2.5" fill="#F2C21B" />
                  <path
                    d={`M ${DEFAULT_MOBILE_POINTS[7].x},${DEFAULT_MOBILE_POINTS[7].y - 41} Q ${DEFAULT_MOBILE_POINTS[7].x + 10},${DEFAULT_MOBILE_POINTS[7].y - 44} ${DEFAULT_MOBILE_POINTS[7].x + 20},${DEFAULT_MOBILE_POINTS[7].y - 40} Q ${DEFAULT_MOBILE_POINTS[7].x + 30},${DEFAULT_MOBILE_POINTS[7].y - 36} ${DEFAULT_MOBILE_POINTS[7].x + 32},${DEFAULT_MOBILE_POINTS[7].y - 41} L ${DEFAULT_MOBILE_POINTS[7].x + 32},${DEFAULT_MOBILE_POINTS[7].y - 24} Q ${DEFAULT_MOBILE_POINTS[7].x + 30},${DEFAULT_MOBILE_POINTS[7].y - 19} ${DEFAULT_MOBILE_POINTS[7].x + 20},${DEFAULT_MOBILE_POINTS[7].y - 23} Q ${DEFAULT_MOBILE_POINTS[7].x + 10},${DEFAULT_MOBILE_POINTS[7].y - 27} ${DEFAULT_MOBILE_POINTS[7].x},${DEFAULT_MOBILE_POINTS[7].y - 24} Z`}
                    fill="url(#checkered-pattern-mob)"
                    stroke="#FFFFFF"
                    strokeWidth="0.75"
                    filter="drop-shadow(0 2px 5px rgba(0,0,0,0.85))"
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* 3. REGIONAL DROP POINTS */}
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
              <div className="w-full sm:w-auto flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0 pt-1 -mx-1 px-1" role="group" aria-label="Filtrar pontos de coleta por estado">
                {["", "SP", "RJ", "MG", "PR", "BA"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedFilter(st)}
                    aria-pressed={selectedFilter === st}
                    className={`min-h-[40px] px-4 sm:px-5 py-2 rounded-[2px] text-xs font-mono font-bold uppercase transition-all duration-150 whitespace-nowrap active:scale-95 flex items-center justify-center cursor-pointer border ${selectedFilter === st
                        ? "bg-[#F2C21B] text-black border-[#F2C21B] shadow-md font-extrabold"
                        : "bg-[#14161D]/90 backdrop-blur-md text-white/75 hover:text-white border-white/10"
                      }`}
                  >
                    {st === "" ? "Todos" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Drop Points Cards — Industrial Mechanical */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredPoints.map((dp, i) => (
                <div
                  key={i}
                  className="p-5 rounded-[2px] bg-[#0D0F14]/90 backdrop-blur-md border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/60 transition-all duration-200 group hover-lift shadow-xl"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <IconPin className="w-4 h-4 text-[#F2C21B] group-hover:scale-110 transition-transform shrink-0" />
                      <span className="text-xs font-mono font-bold text-[#F2C21B] truncate">[{dp.state}] {dp.city}</span>
                    </div>
                    <span className="text-xs font-mono text-white/70 whitespace-nowrap shrink-0 ml-2">{dp.phone}</span>
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
                className="w-full sm:w-auto px-4 sm:px-8 py-3.5 sm:py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider text-xs sm:text-base uppercase rounded-[2px] border-2 border-[#F2C21B] transition-all shadow-[0_2px_15px_rgba(242,194,27,0.4)] hover:shadow-[0_4px_25px_rgba(242,194,27,0.7)] flex items-center justify-center gap-2 sm:gap-3 hover-lift cursor-pointer whitespace-nowrap"
              >
                <IconChat className="w-4 h-4 sm:w-5 sm:h-5 text-black shrink-0" />
                <span className="whitespace-nowrap">Entregar Doação via WhatsApp</span>
                <span className="font-sans font-bold">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
