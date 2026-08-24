"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconRadio, IconArrowRight, IconPlay, IconPause, IconVolumeUp, IconVolumeMute, IconClose } from "./ui/Icons";
import { useRadio } from "../context/RadioContext";
import { INSTITUTIONAL_METRICS } from "../data/institutional";

const ASSETS = {
  logo: "/images/insanos/insanos_mc_logo.svg",
};

interface NavbarProps {
  isPlayingRadio?: boolean;
  onToggleRadio?: () => void;
}

const navLinks = [
  { label: "História", href: "/historia" },
  { label: "Impacto", href: "/impacto" },
  { label: "Comando", href: "/comando" },
  { label: "Eventos", href: "/eventos" },
  { label: "18News", href: "/18news" },
  { label: "Ecossistema", href: "/ecossistema" },
];

export function Navbar({}: NavbarProps) {
  const pathname = usePathname();
  const {
    isPlaying: isPlayingRadio,
    isMuted,
    volume,
    isLoading,
    pauseRadio,
    toggleMute,
    setVolume,
    toggleRadio,
  } = useRadio();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const currentVolume = isMuted ? 0 : volume;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (window.location.hash) {
          window.history.pushState(null, "", "/");
        }
      }
      return;
    }

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", `#${targetId}`);
        }
      }
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false);
    if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (window.location.hash) {
          window.history.pushState(null, "", "/");
        }
      }
      return;
    }

    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (pathname === "/") {
        e.preventDefault();
        setTimeout(() => {
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            window.history.pushState(null, "", `#${targetId}`);
          }
        }, 100);
      }
    }
  };

  return (
    <>
      {/* Accessible Skip to Content Link */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#F2C21B] focus:text-black focus:font-extrabold focus:rounded-lg focus:shadow-2xl"
      >
        Pular para o conteúdo principal
      </a>      {/* Top Banner / Ticker */}
      <div className="bg-[#0E0F11] border-b border-white/5 py-1.5 px-4 sm:px-8 text-xs text-[#AAA8A1] flex justify-between items-center select-none overflow-hidden relative w-full max-w-full">
        {/* Mobile Horizontal Auto-scrolling Marquee */}
        <div className="md:hidden flex overflow-hidden w-full max-w-full min-w-0">
          <div className="animate-marquee-track flex items-center gap-6 text-[#AAA8A1] shrink-0">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              <span className="font-mono text-xs text-[#F2C21B] font-bold uppercase tracking-wider">
                Impacto Global:
              </span>
              <span className="text-[#E0DDD8] font-bold">
                +{INSTITUTIONAL_METRICS.members} Integrantes
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[#E0DDD8] font-bold">
                {INSTITUTIONAL_METRICS.countries} Países
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[#E0DDD8] font-bold">
                {INSTITUTIONAL_METRICS.chapters} Capítulos
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-white/30">•</span>
              <span className="font-mono text-xs text-[#F2C21B] font-bold uppercase tracking-wider">
                #SomosDeVerdade
              </span>
              <span className="text-white/30">•</span>
              <button
                type="button"
                onClick={toggleRadio}
                className="text-[#E0DDD8] hover:text-[#F2C21B] font-mono text-xs flex items-center gap-1 underline underline-offset-2 cursor-pointer"
              >
                <span>Rádio Insanos 24h {isPlayingRadio ? "(Ao Vivo)" : ""}</span>
              </button>
              <span className="text-white/30">•</span>
              <span className="font-mono text-xs text-[#F2C21B]">{INSTITUTIONAL_METRICS.slogan}</span>
            </div>
          </div>
        </div>

        {/* Desktop Ticker Content */}
        <div className="hidden md:flex items-center gap-3 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span className="font-mono text-xs text-[#F2C21B] font-bold uppercase tracking-wider">
            Impacto Global Consolidado:
          </span>
          <span className="text-[#E0DDD8] font-semibold">
            {INSTITUTIONAL_METRICS.members} Integrantes Ativos
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[#E0DDD8] font-semibold">
            {INSTITUTIONAL_METRICS.countries} Países
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[#E0DDD8] font-semibold">
            {INSTITUTIONAL_METRICS.chapters} Capítulos Oficiais
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[#E0DDD8] font-semibold">
            {INSTITUTIONAL_METRICS.familiesAssisted} Famílias Atendidas
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <span className="font-mono text-xs text-[#F2C21B] font-bold uppercase tracking-wider">
            #SomosDeVerdade
          </span>
          <span className="text-white/20">|</span>
          <button
            type="button"
            onClick={toggleRadio}
            className="text-xs text-[#AAA8A1] hover:text-[#F2C21B] transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
            title={isPlayingRadio ? "Pausar transmissão" : "Sintonizar Rádio Insanos Web"}
          >
            <span className={`w-2 h-2 rounded-full ${isPlayingRadio ? "bg-red-500 animate-ping" : "bg-[#F2C21B]"}`} />
            <span className="font-mono text-xs">
              Rádio Insanos 24h {isPlayingRadio ? "(Ao Vivo)" : ""}
            </span>
          </button>
          <span className="text-white/20">|</span>
          <span className="font-mono text-xs text-[#F2C21B]">{INSTITUTIONAL_METRICS.slogan}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b transition-all duration-300 w-full max-w-full overflow-hidden ${
          scrolled ? "border-[#F2C21B]/30 shadow-2xl py-2" : "border-white/10 py-3"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-3 sm:px-8 flex items-center justify-between gap-2 w-full min-w-0">
          {/* Logo Solo Oficial */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center group focus:outline-none shrink-0"
            aria-label="Insanos MC — Início"
          >
            <img
              src={ASSETS.logo}
              alt="Insanos Moto Clube"
              width={125}
              height={24}
              className="h-[20px] sm:h-[28px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_14px_rgba(242,194,27,0.35)]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs uppercase font-bold tracking-[0.14em]"
            aria-label="Menu Principal"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`py-1.5 transition-colors duration-200 relative ${
                    isActive ? "text-[#F2C21B]" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#F2C21B] shadow-[0_0_8px_#F2C21B] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Tactical Radio Button (Industrial Mechanical Placa de Aço) */}
            <button
              onClick={toggleRadio}
              className={`hidden sm:inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-[2px] border text-xs font-bold transition-all duration-200 min-w-[122px] ${
                isPlayingRadio
                  ? "bg-[#F2C21B]/15 border-[#F2C21B] text-[#F2C21B] shadow-[0_0_15px_rgba(242,194,27,0.25)]"
                  : "bg-[#141517] border-white/20 text-[#F4F1E8] hover:border-[#F2C21B]/60 hover:text-white"
              }`}
              title={isPlayingRadio ? "Pausar Rádio" : "Ouvir Rádio Insanos Web"}
            >
              {isPlayingRadio ? (
                <div className="flex items-end gap-0.5 h-3 w-3 shrink-0" aria-hidden="true">
                  <span className="w-0.5 bg-[#F2C21B] h-full animate-[bounce_0.8s_infinite] rounded-none" />
                  <span className="w-0.5 bg-[#F2C21B] h-2/3 animate-[bounce_1.1s_infinite] rounded-none" />
                  <span className="w-0.5 bg-[#F2C21B] h-4/5 animate-[bounce_0.9s_infinite] rounded-none" />
                </div>
              ) : (
                <span className="w-1.5 h-1.5 bg-[#F2C21B] shrink-0 rounded-none" />
              )}
              <span className="font-mono text-xs tracking-wider uppercase whitespace-nowrap">
                {isPlayingRadio ? "NO AR" : "RÁDIO 24H"}
              </span>
            </button>

            {/* CTA Faça Parte (Industrial Mechanical Placa de Aço) */}
            <Link
              href="/faca-parte"
              className="inline-flex items-center gap-1 px-3 sm:px-5 py-1.5 sm:py-2 rounded-[2px] border border-[#F2C21B] bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider text-xs sm:text-sm uppercase transition-all shadow-[0_2px_12px_rgba(242,194,27,0.35)] hover:shadow-[0_4px_20px_rgba(242,194,27,0.6)] transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <span>Faça Parte</span>
              <IconArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" strokeWidth={2.5} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 p-1.5 sm:p-2 rounded-[2px] border border-white/20 bg-[#121314] text-white hover:border-[#F2C21B] focus:outline-none flex items-center justify-center active:scale-95 transition-transform shrink-0"
              aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={menuOpen}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Attached Radio Sub-Bar (Opens seamlessly right below the menu, fixed as you scroll) */}
        {isPlayingRadio && (
          <div className="hidden sm:block border-t border-[#F2C21B]/30 bg-[#101215]/95 backdrop-blur-xl px-4 sm:px-8 py-2 text-xs transition-all duration-300 mt-2.5 shadow-2xl">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
              {/* Equalizer & Station Info */}
              <div className="flex items-center gap-3">
                <div className="flex items-end gap-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true">
                  <span className="w-0.5 bg-[#F2C21B] h-full animate-[bounce_0.8s_infinite] rounded-t-sm" />
                  <span className="w-0.5 bg-[#F2C21B] h-2/3 animate-[bounce_1.1s_infinite] rounded-t-sm" />
                  <span className="w-0.5 bg-[#F2C21B] h-4/5 animate-[bounce_0.9s_infinite] rounded-t-sm" />
                  <span className="w-0.5 bg-[#F2C21B] h-1/2 animate-[bounce_1.3s_infinite] rounded-t-sm" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#F2C21B] font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                    RÁDIO AO VIVO:
                  </span>
                  <span className="text-white font-medium text-xs">
                    {isLoading ? "Sintonizando transmissão..." : "Rádio Insanos Web 24h · O som que embala o comboio"}
                  </span>
                </div>
              </div>

              {/* Volume & Actions */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-[#AAA8A1] hover:text-[#F2C21B] text-xs transition-colors focus:outline-none flex items-center justify-center w-5 h-5"
                    title={isMuted ? "Desmutar rádio" : "Mutar rádio"}
                    aria-label={isMuted ? "Desmutar áudio" : "Mutar áudio"}
                  >
                    {isMuted || volume === 0 ? (
                      <IconVolumeMute className="w-3.5 h-3.5 text-[#AAA8A1]" />
                    ) : (
                      <IconVolumeUp className="w-3.5 h-3.5 text-[#F2C21B]" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentVolume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-20 lg:w-28 accent-[#F2C21B] h-1 bg-white/20 rounded cursor-pointer focus:outline-none"
                    aria-label="Controle de volume da rádio"
                  />
                  <span className="text-xs font-mono text-[#AAA8A1] w-7 text-right">
                    {currentVolume}%
                  </span>
                </div>

                <button
                  onClick={pauseRadio}
                  className="px-3 py-1 bg-[#F2C21B] hover:bg-[#ffe053] text-black rounded-[2px] text-xs font-['Anton'] tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md hover-lift cursor-pointer"
                  aria-label="Pausar rádio"
                >
                  <span>Pausar</span>
                  <IconClose className="w-3 h-3 text-black" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0D0E10] border-b border-white/10 px-5 py-5 transition-all duration-300">
            <nav className="flex flex-col gap-2 text-sm font-bold uppercase tracking-wider">
              {/* Mobile Radio Button */}
              <button
                onClick={() => {
                  toggleRadio();
                  setMenuOpen(false);
                }}
                className="w-full min-h-[48px] py-3 px-4 rounded-[2px] bg-[#141518] border border-[#F2C21B]/40 text-[#F2C21B] flex items-center justify-between font-mono text-xs mb-2 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <IconRadio className="w-4 h-4" />
                  <span>Rádio Insanos 24h</span>
                </div>
                <span className="flex items-center gap-1.5 font-bold">
                  {isPlayingRadio ? (
                    <>
                      <span>Pausar</span>
                      <IconPause className="w-3 h-3 text-[#F2C21B]" />
                    </>
                  ) : (
                    <>
                      <span>Tocar</span>
                      <IconPlay className="w-3 h-3 text-[#F2C21B]" />
                    </>
                  )}
                </span>
              </button>

              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleMobileNavClick(e, link.href)}
                    className={`min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-[2px] transition-all duration-150 active:scale-[0.98] ${
                      isActive
                        ? "bg-[#F2C21B]/15 text-[#F2C21B] border border-[#F2C21B]/30 font-extrabold"
                        : "text-[#E0DDD8] hover:text-[#F2C21B] hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className={`text-xs ${isActive ? "text-[#F2C21B]" : "text-white/30"}`}>→</span>
                  </Link>
                );
              })}

              <Link
                href="/faca-parte"
                onClick={() => setMenuOpen(false)}
                className="mt-3 min-h-[50px] text-center py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider rounded-[2px] uppercase shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform border border-[#F2C21B]"
              >
                <span>Faça Parte Agora</span>
                <IconArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
              </Link>

              {/* Mobile Social Shortcuts */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-around text-xs text-[#AAA8A1] font-mono">
                <a
                  href="https://www.instagram.com/insanosmc_oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F2C21B] transition-colors py-2 px-3 flex items-center"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href="https://www.youtube.com/@InsanosMC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F2C21B] transition-colors py-2 px-3 flex items-center"
                >
                  YouTube 18Cast
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
