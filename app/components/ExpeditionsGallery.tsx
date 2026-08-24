"use client";

import React, { useState, useRef } from "react";
import { IconArrowRight } from "./ui/Icons";

interface Expedition {
  id: string;
  title: React.ReactNode;
  rawTitle: string;
  destination: string;
  distance: string;
  year: string;
  image: string;
  tag: string;
  story: string;
  altitude?: string;
  participants: string;
}

const EXPEDITIONS_DATA: Expedition[] = [
  {
    id: "patagonia",
    title: (
      <>
        Expedição Patagônia<br className="hidden sm:inline" /> & Rota 40
      </>
    ),
    rawTitle: "Expedição Patagônia & Rota 40",
    destination: "Ushuaia, Argentina — Fim do Mundo",
    distance: "7.200 km",
    year: "2024 / 2025",
    image: "/images/insanos/history_today.webp",
    tag: "Extremo Sul",
    story: "Ventos cruzados de mais de 90 km/h, trechos de rípio intermináveis e temperaturas próximas a zero grau. O comboio Insanos provou mais uma vez que a disciplina e o espírito de equipe vencem qualquer intempérie climática.",
    participants: "38 Pilotos em Comboio",
  },
  {
    id: "atacama",
    title: (
      <>
        Travessia do Deserto<br className="hidden sm:inline" /> do Atacama
      </>
    ),
    rawTitle: "Travessia do Deserto do Atacama",
    destination: "Paso de Jama & San Pedro de Atacama",
    distance: "5.800 km",
    year: "2024",
    image: "/images/insanos/hero_biker.webp",
    tag: "Altitude Extrema",
    altitude: "4.800m altitude",
    story: "Cruzando a Cordilheira dos Andes em altitudes onde o oxigênio é rarefeito e o motor exige o máximo da mecânica. Solidariedade mútua a cada parada de abastecimento nos povoados andinos.",
    participants: "52 Motocicletas",
  },
  {
    id: "serra-rio-rastro",
    title: (
      <>
        Expedição Serra<br className="hidden sm:inline" /> do Rio do Rastro
      </>
    ),
    rawTitle: "Expedição Serra do Rio do Rastro",
    destination: "Lauro Müller / Bom Jardim da Serra — SC",
    distance: "2.400 km",
    year: "2025",
    image: "/images/insanos/pillar_04_estrada_motoclube.webp",
    tag: "Serra & Curvas",
    story: "Uma das estradas mais espetaculares do planeta. 284 curvas cravadas no paredão rochoso de Santa Catarina, desafiando a perícia dos pilotos sob neblina densa e asfalto molhado.",
    participants: "180 Integrantes",
  },
  {
    id: "encontro-matriz",
    title: (
      <>
        Mega Encontro Nacional<br className="hidden sm:inline" /> em Osasco
      </>
    ),
    rawTitle: "Mega Encontro Nacional em Osasco",
    destination: "Matriz Original de OZ — Osasco / SP",
    distance: "Brasil Inteiro",
    year: "2026",
    image: "/images/insanos/news_featured_aniversario.webp",
    tag: "Tradição & Força",
    story: "A celebração máxima da irmandade. Comboios vindos de todos os 26 estados brasileiros e delegações de Portugal e EUA reunidos no berço do motoclube, com arrecadação recorde de toneladas de alimentos.",
    participants: "6.000+ Motos",
  },
];

function TiltExpeditionCard({
  exp,
  onSelect,
}: {
  exp: Expedition;
  onSelect: (exp: Expedition) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const rx = ((y - height / 2) / height) * -8;
    const ry = ((x - width / 2) / width) * 8;
    const mx = (x / width) * 100;
    const my = (y / height) * 100;

    setTilt({ rx, ry, mx, my, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, mx: 50, my: 50, isHovered: false });
  };

  const handleClick = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(12);
      } catch {
        // ignore
      }
    }
    onSelect(exp);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: tilt.isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
      }}
      className="group cursor-pointer rounded-[2px] overflow-hidden bg-[#131417] border border-white/10 hover:border-[#F2C21B] flex flex-col justify-between shadow-xl relative select-none will-change-transform"
    >
      {/* Specular Ambient Glow that follows mouse */}
      {tilt.isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 opacity-40"
          style={{
            background: `radial-gradient(circle 200px at ${tilt.mx}% ${tilt.my}%, rgba(242,194,27,0.25), transparent 70%)`,
          }}
        />
      )}

      <div
        className="h-56 bg-cover bg-center relative transition-transform duration-500 group-hover:scale-[1.04]"
        style={{ backgroundImage: `url(${exp.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#131417] via-transparent to-transparent opacity-80" />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-[2px] bg-black/70 backdrop-blur-md border border-white/20 text-[#F2C21B] font-mono text-xs uppercase font-bold">
          {exp.tag}
        </span>
        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-[2px] bg-[#F2C21B] text-black font-mono text-xs font-extrabold">
          {exp.distance}
        </span>
      </div>

      <div className="p-6 relative z-10">
        <span className="text-xs font-mono text-[#AAA8A1] block mb-1">{exp.year}</span>
        <h4 className="font-['Anton'] text-xl uppercase text-white group-hover:text-[#F2C21B] transition-colors duration-200 mb-2">
          {exp.title}
        </h4>
        <p className="text-xs text-[#AAA8A1] line-clamp-2 mb-4">{exp.destination}</p>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#F2C21B] font-bold">
          <span>Ver Relato Completo</span>
          <IconArrowRight className="w-3.5 h-3.5 text-[#F2C21B] group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </div>
  );
}

export function ExpeditionsGallery() {
  const [selectedExpedition, setSelectedExpedition] = useState<Expedition | null>(null);

  React.useEffect(() => {
    if (!selectedExpedition) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedExpedition(null);
      } else if (e.key === "ArrowRight") {
        const currentIndex = EXPEDITIONS_DATA.findIndex((exp) => exp.id === selectedExpedition.id);
        const nextIndex = (currentIndex + 1) % EXPEDITIONS_DATA.length;
        setSelectedExpedition(EXPEDITIONS_DATA[nextIndex]);
      } else if (e.key === "ArrowLeft") {
        const currentIndex = EXPEDITIONS_DATA.findIndex((exp) => exp.id === selectedExpedition.id);
        const prevIndex = (currentIndex - 1 + EXPEDITIONS_DATA.length) % EXPEDITIONS_DATA.length;
        setSelectedExpedition(EXPEDITIONS_DATA[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedExpedition]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[#F2C21B]" />
            <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
              Grandes Travessias Documentadas
            </span>
          </div>
          <h3 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white">
            Galeria de Expedições & Asfalto
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#AAA8A1] max-w-xl">
          Clique nas expedições para abrir o relato oficial,<br className="hidden sm:inline" />{" "}
          quilometragem percorrida e galeria em alta resolução.
        </p>
      </div>

      {/* Grid of 3D Tilt Expedition Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {EXPEDITIONS_DATA.map((exp) => (
          <TiltExpeditionCard
            key={exp.id}
            exp={exp}
            onSelect={(selected) => setSelectedExpedition(selected)}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedExpedition && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedExpedition(null)}
        >
          <div
            className="bg-[#121316] border border-[#F2C21B]/50 rounded-[2px] max-w-4xl w-[95%] sm:w-full max-h-[90vh] overflow-y-auto shadow-2xl relative custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div
              className="h-64 sm:h-96 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${selectedExpedition.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-black/40 to-transparent" />
              <button
                onClick={() => setSelectedExpedition(null)}
                aria-label="Fechar visualizador de expedição"
                className="absolute top-4 right-4 w-10 h-10 rounded-[2px] bg-black/80 text-white hover:text-[#F2C21B] border border-white/20 flex items-center justify-center font-bold text-lg transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="px-3 py-1 bg-[#F2C21B] text-black font-extrabold text-xs uppercase rounded-[2px] mb-2 inline-block">
                    {selectedExpedition.tag} · {selectedExpedition.year}
                  </span>
                  <h3 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white">
                    {selectedExpedition.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-[2px] bg-[#090A0B] border border-white/10 text-center">
                <div>
                  <span className="text-xs uppercase font-bold text-[#AAA8A1] block">Distância Total</span>
                  <strong className="font-['Anton'] text-xl sm:text-2xl text-[#F2C21B]">
                    {selectedExpedition.distance}
                  </strong>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-[#AAA8A1] block">Destino Final</span>
                  <strong className="text-xs sm:text-sm font-bold text-white block mt-1">
                    {selectedExpedition.destination.split("—")[0]}
                  </strong>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-xs uppercase font-bold text-[#AAA8A1] block">Comboio</span>
                  <strong className="text-xs sm:text-sm font-bold text-white block mt-1">
                    {selectedExpedition.participants}
                  </strong>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-wider mb-2">
                  Diário de Bordo Oficial:
                </h4>
                <p className="text-sm sm:text-base text-[#D0CECB] leading-relaxed">
                  {selectedExpedition.story}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedExpedition(null)}
                  className="px-6 py-3 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-xs rounded-[2px] transition-colors duration-150"
                >
                  Fechar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
