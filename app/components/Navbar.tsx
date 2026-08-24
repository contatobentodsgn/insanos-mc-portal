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
      </a>

      {/* Top Banner / Ticker */}
      <div className="bg-[#0E0F11] border-b border-white/5 py-1.5 px-4 sm:px-8 text-[10.5px] sm:text-[11px] text-[#AAA8A1] flex justify-between items-center select-none overflow-hidden relative">
        {/* Mobile Horizontal Auto-scrolling Marquee */}
        <div className="md:hidden flex overflow-hidden w-full">
          <div className="animate-marquee-track flex items-center gap-6 text-[#AAA8A1]">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#F2C21B] animate-pulse shrink-0" />
              <span>
                Presença Global: <strong className="text-white">+12.000 Integrantes</strong> · <strong className="text-white">65 Países</strong> · <strong className="text-white">480+ Capítulos</strong>
              </span>
            </div>
            <span className="text-[#F2C21B]">•</span>
            <span className="font-mono text-[#F2C21B] shrink-0">#SomosDeVerdade</span>
            <span className="text-[#F2C21B]">•</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#F2C21B] animate-pulse shrink-0" />
              <span>
                Original de OZ · <strong className="text-white">Desde 2015</strong> · 18 do Forte
              </span>
            </div>
            <span className="text-[#F2C21B]">•</span>
            {/* Duplicated track for seamless infinite loop */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#F2C21B] animate-pulse shrink-0" />
              <span>
                Presença Global: <strong className="text-white">{INSTITUTIONAL_METRICS.members} Integrantes</strong> · <strong className="text-white">{INSTITUTIONAL_METRICS.countries} Países</strong> · <strong className="text-white">{INSTITUTIONAL_METRICS.chapters} Capítulos</strong>
              </span>
            </div>
            <span className="text-[#F2C21B]">•</span>
            <span className="font-mono text-[#F2C21B] shrink-0">{INSTITUTIONAL_METRICS.slogan}</span>
            <span className="text-[#F2C21B]">•</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#F2C21B] animate-pulse shrink-0" />
              <span>
                Original de OZ · <strong className="text-white">Desde {INSTITUTIONAL_METRICS.foundingYear}</strong> · 18 do Forte
              </span>
            </div>
            <span className="text-[#F2C21B]">•</span>
          </div>
        </div>

        {/* Desktop Static Ticker */}
        <div className="hidden md:flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#F2C21B] animate-pulse shrink-0" />
          <span className="truncate">
            Presença Global: <strong>{INSTITUTIONAL_METRICS.members} Integrantes</strong> · <strong>{INSTITUTIONAL_METRICS.countries} Países</strong> · <strong>{INSTITUTIONAL_METRICS.chapters} Capítulos</strong>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <button
            onClick={toggleRadio}
            className="hover:text-[#F2C21B] transition-colors flex items-center gap-1.5 text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <IconRadio className={`w-3.5 h-3.5 ${isPlayingRadio ? "text-[#F2C21B] animate-pulse" : "text-[#AAA8A1]"}`} />
            <span className={isPlayingRadio ? "text-[#F2C21B]" : "text-[#AAA8A1]"}>
              Rádio Insanos 24h {isPlayingRadio ? "(Ao Vivo)" : ""}
            </span>
          </button>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[11px] text-[#F2C21B]">{INSTITUTIONAL_METRICS.slogan}</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md border-b transition-all duration-300 ${
          scrolled ? "border-[#F2C21B]/30 shadow-2xl py-2.5" : "border-white/10 py-3.5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo Solo Oficial (Alinhado ao tamanho do botão Rádio 24h) */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center group focus:outline-none shrink-0"
            aria-label="Insanos MC — Início"
          >
            <img
              src={ASSETS.logo}
              alt="Insanos Moto Clube"
              width={160}
              height={28}
              className="h-[25px] sm:h-[28px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_14px_rgba(242,194,27,0.35)]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11.5px] uppercase font-bold tracking-[0.14em]"
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
          <div className="flex items-center gap-3">
            {/* Tactical Radio Button (Stable Width & Gold Equalizer) */}
            <button
              onClick={toggleRadio}
              className={`hidden sm:inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-bold transition-all duration-200 min-w-[122px] ${
                isPlayingRadio
                  ? "bg-[#F2C21B]/15 border-[#F2C21B] text-[#F2C21B] shadow-[0_0_15px_rgba(242,194,27,0.25)]"
                  : "bg-[#141517] border-white/15 text-[#F4F1E8] hover:border-[#F2C21B]/60 hover:text-white"
              }`}
              title={isPlayingRadio ? "Pausar Rádio" : "Ouvir Rádio Insanos Web"}
            >
              {isPlayingRadio ? (
                <div className="flex items-end gap-0.5 h-3 w-3 shrink-0" aria-hidden="true">
                  <span className="w-0.5 bg-[#F2C21B] h-full animate-[bounce_0.8s_infinite] rounded-t-sm" />
                  <span className="w-0.5 bg-[#F2C21B] h-2/3 animate-[bounce_1.1s_infinite] rounded-t-sm" />
                  <span className="w-0.5 bg-[#F2C21B] h-4/5 animate-[bounce_0.9s_infinite] rounded-t-sm" />
                </div>
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#F2C21B] shrink-0" />
              )}
              <span className="font-mono text-[11px] tracking-wider uppercase whitespace-nowrap">
                {isPlayingRadio ? "NO AR" : "RÁDIO 24H"}
              </span>
            </button>

            {/* CTA Faça Parte */}
            <Link
              href="/faca-parte"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider text-xs sm:text-sm uppercase transition-all shadow-[0_0_20px_rgba(242,194,27,0.35)] hover:shadow-[0_0_30px_rgba(242,194,27,0.6)] transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
            >
              <span>Faça Parte</span>
              <IconArrowRight className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden min-w-[44px] min-h-[44px] p-2.5 rounded-xl border border-white/20 bg-[#121314] text-white hover:border-[#F2C21B] focus:outline-none flex items-center justify-center active:scale-95 transition-transform"
              aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={menuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <span className="font-mono text-[#F2C21B] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
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
                  <span className="text-[10px] font-mono text-[#AAA8A1] w-7 text-right">
                    {currentVolume}%
                  </span>
                </div>

                <button
                  onClick={pauseRadio}
                  className="px-3 py-1 bg-[#F2C21B] hover:bg-[#ffe053] text-black rounded text-[10.5px] font-['Anton'] tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-md hover-lift"
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
                className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-[#141518] border border-[#F2C21B]/40 text-[#F2C21B] flex items-center justify-between font-mono text-xs mb-2 active:scale-[0.98] transition-transform"
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
                    className={`min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 active:scale-[0.98] ${
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
                className="mt-3 min-h-[50px] text-center py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider rounded-xl uppercase shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
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
                  href="https://www.youtube.com/@InsanosMCOficial"
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
