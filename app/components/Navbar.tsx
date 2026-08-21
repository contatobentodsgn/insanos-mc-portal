"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconRadio } from "./ui/Icons";

const ASSETS = {
  logo: "/images/insanos/insanos_mc_logo.svg",
};

interface NavbarProps {
  isPlayingRadio?: boolean;
  onToggleRadio?: () => void;
}

const navLinks = [
  { label: "Início", href: "/" },
  { label: "História", href: "/historia" },
  { label: "Escala", href: "/#escala" },
  { label: "Pilares", href: "/#pilares" },
  { label: "Impacto", href: "/impacto" },
  { label: "Comando", href: "/comando" },
  { label: "18News", href: "/18news" },
  { label: "Ecossistema", href: "/ecossistema" },
];

export function Navbar({ isPlayingRadio = false, onToggleRadio }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Banner / Ticker */}
      <div className="bg-[#0E0F11] border-b border-white/5 py-1.5 px-4 sm:px-8 text-[10.5px] sm:text-[11px] text-[#AAA8A1] flex justify-between items-center select-none overflow-hidden">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#F2C21B] animate-pulse shrink-0" />
          <span className="truncate">
            Presença Global: <strong>+12.000 Integrantes</strong> · <strong>65 Países</strong> · <strong>480+ Capítulos</strong>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <button
            onClick={onToggleRadio}
            className="hover:text-[#F2C21B] transition-colors flex items-center gap-1.5 text-xs font-semibold focus:outline-none"
          >
            <IconRadio className="w-3.5 h-3.5 text-[#F2C21B]" />
            <span>Rádio Insanos 24h</span>
          </button>
          <span className="text-white/20">|</span>
          <span className="font-mono text-[11px] text-[#F2C21B]">#SomosDeVerdade</span>
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
            className="flex items-center group focus:outline-none shrink-0"
            aria-label="Insanos MC — Início"
          >
            <img
              src={ASSETS.logo}
              alt="Insanos Moto Clube"
              className="h-[25px] sm:h-[28px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_14px_rgba(242,194,27,0.35)]"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden xl:flex items-center gap-7 text-[11.5px] uppercase font-bold tracking-[0.14em]"
            aria-label="Menu Principal"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1.5 transition-colors duration-200 relative ${
                    isActive ? "text-[#F2C21B]" : "text-white/75 hover:text-white"
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
            {/* Tactical Radio Button */}
            <button
              onClick={onToggleRadio}
              className={`hidden sm:inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg border text-xs font-bold transition-all duration-200 ${
                isPlayingRadio
                  ? "bg-[#F2C21B]/15 border-[#F2C21B] text-[#F2C21B] shadow-[0_0_15px_rgba(242,194,27,0.25)]"
                  : "bg-[#141517] border-white/15 text-[#F4F1E8] hover:border-[#F2C21B]/60 hover:text-white"
              }`}
              title="Ouvir Rádio Insanos Web"
            >
              <span className="relative flex h-2 w-2">
                {isPlayingRadio && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isPlayingRadio ? "bg-emerald-500" : "bg-[#F2C21B]"
                  }`}
                />
              </span>
              <span className="font-mono text-[11px] tracking-wider uppercase">
                {isPlayingRadio ? "Pausar Rádio" : "Rádio 24h"}
              </span>
            </button>

            {/* CTA Faça Parte */}
            <Link
              href="/faca-parte"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider text-xs sm:text-sm uppercase transition-all shadow-[0_0_20px_rgba(242,194,27,0.35)] hover:shadow-[0_0_30px_rgba(242,194,27,0.6)] transform hover:-translate-y-0.5"
            >
              <span>Faça Parte</span>
              <span className="text-black font-sans font-bold">↘</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden p-2.5 rounded-lg border border-white/20 bg-[#121314] text-white hover:border-[#F2C21B] focus:outline-none"
              aria-label="Abrir menu de navegação"
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

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className="xl:hidden bg-[#0D0E10] border-b border-white/10 px-6 py-6 transition-all duration-300">
            <nav className="flex flex-col gap-4 text-sm font-bold uppercase tracking-wider">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-2 border-b border-white/5 ${
                    pathname === link.href ? "text-[#F2C21B]" : "hover:text-[#F2C21B]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/faca-parte"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center py-3 bg-[#F2C21B] text-black font-['Anton'] tracking-wider rounded-lg uppercase"
              >
                Faça Parte Agora ↘
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
