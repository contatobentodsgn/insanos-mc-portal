"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useRadio } from "../context/RadioContext";
import {
  IconBolt,
  IconFilm,
  IconPin,
  IconStar,
  IconCalendar,
  IconPodcast,
  IconCheck,
  IconChat,
  IconLock,
  IconPlay,
  IconPause,
  IconArrowRight,
} from "../components/ui/Icons";

// High-Definition Assets for Version 2 (Cinema Edition)
const ASSETS_V2 = {
  // Hero Biker POV with authentic backpatch and convoy ahead
  heroBiker: "/images/insanos/hero_biker.webp",
  
  // World Map & Global Faces
  worldMapBg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
  faces: [
    { country: "Brasil", flag: "🇧🇷", role: "Divisão Sudeste / Matriz", image: "/images/insanos/leader_presidencia.webp" },
    { country: "Portugal", flag: "🇵🇹", role: "Divisão Europa Ocidental", image: "/images/insanos/leader_exterior.webp" },
    { country: "África do Sul", flag: "🇿🇦", role: "Divisão Cape Town", image: "/images/insanos/leader_executiva.webp" },
    { country: "Estados Unidos", flag: "🇺🇸", role: "Divisão Miami / Florida", image: "/images/insanos/leader_disciplina.webp" },
    { country: "Tailândia", flag: "🇹🇭", role: "Divisão Sudeste Asiático", image: "/images/insanos/leader_social.webp" },
    { country: "Austrália", flag: "🇦🇺", role: "Divisão Sydney / Oceania", image: "/images/insanos/leader_midia.webp" },
  ],

  // 4 Pillars Visual Columns
  pillars: [
    {
      num: "01",
      title: "Deus",
      subtitle: "Família",
      desc: "A fé que guia cada curva e o respeito inegociável ao lar e aos filhos.",
      image: "/images/insanos/pillar_01_deus_familia.webp",
      bgPosition: "center 18%",
    },
    {
      num: "02",
      title: "Comunidade",
      subtitle: "Ajuda",
      desc: "Nosso destino é fazer o bem. Ação humanitária contínua e auxílio direto.",
      image: "/images/insanos/pillar_02_comunidade_ajuda.webp",
      bgPosition: "center 22%",
    },
    {
      num: "03",
      title: "Caráter",
      subtitle: "Trabalho",
      desc: "A dignidade que sustenta o homem e a disciplina que forja o respeito.",
      image: "/images/insanos/pillar_03_carater_trabalho.webp",
      bgPosition: "center 20%",
    },
    {
      num: "04",
      title: "Estrada",
      subtitle: "Motoclube",
      desc: "Colete não cria irmão. Atitude cria. União e lealdade na rodovia.",
      image: "/images/insanos/pillar_04_estrada_motoclube.webp",
      bgPosition: "center 24%",
    },
  ],

  // History Archival Cards
  historyCards: [
    {
      year: "1922",
      badge: "18 do Forte",
      title: "A Bravura Histórica",
      desc: "Da força e da união de homens que desafiaram seu tempo, nasceu o espírito e o número 18 gravado no peito.",
      tag: "Imagem Histórica",
      image: "/images/insanos/history_1922.webp",
    },
    {
      year: "2015",
      badge: "Fundação OZ",
      title: "O Início da Irmandade",
      desc: "Na cidade de Osasco/SP, os primeiros irmãos uniram propósito, lealdade e a missão de transformar o motociclismo.",
      tag: "Imagem Histórica",
      image: "/images/insanos/history_2015.webp",
    },
    {
      year: "Hoje",
      desc: "Hoje somos a maior força do motociclismo mundial. Uma só causa, um só ideal. Sempre Insanos, sempre irmãos.",
      tag: "Comboio Global",
      image: "/images/insanos/history_today.webp",
    },
  ],

  // Social Impact Bento Photos
  impactPcd: "/images/insanos/impact_pcd.png",
  impactBlood: "/images/insanos/impact_blood.png",
  impactBoxing: "/images/insanos/impact_combat.png",

  // Leadership Portraits
  leaders: [
    { name: "Comando Central", role: "Presidência Mundial", patch: "PRESIDENTE / 18 DO FORTE", image: "/images/insanos/leader_portrait.png" },
    { name: "Diretoria Regional", role: "Coordenação de Comboios", patch: "CMD REGIONAL / 18 DO FORTE", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
    { name: "Diretoria de Disciplina", role: "Conselho Geral", patch: "DIRETOR / INSANOS M.C.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop" },
  ],
  memorialLeader: {
    name: "Edson Lopes",
    role: "Cofundador & Ícone da Disciplina (1965 – 2024)",
    tag: "Acervo Oficial · In Memoriam",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },

  // Sunset Sunset Horizon for Section 8
  sunsetBg: "/images/insanos/sunset_horizon.png",
};

export function HomeV2Client() {
  const root = useRef<HTMLDivElement>(null);
  const { isPlaying: isPlayingRadio, toggleRadio } = useRadio();
  const [activePillarHover, setActivePillarHover] = useState<number | null>(0);
  const [searchCity, setSearchCity] = useState("");
  const [fastFormData, setFastFormData] = useState({ cityState: "", contact: "", agree: false });
  const [fastFormSent, setFastFormSent] = useState(false);

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const handleFastFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fastFormData.cityState || !fastFormData.contact || !fastFormData.agree) {
      alert("Por favor, preencha cidade/estado, contato e aceite a política de privacidade.");
      return;
    }
    setFastFormSent(true);
  };

  return (
    <div ref={root} className="min-h-screen bg-[#080809] text-[#F4F1E8] overflow-x-hidden font-sans selection:bg-[#F2C21B] selection:text-black">
      {/* Version Switcher Sticky Pill */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1.5 p-1 rounded-full bg-black/80 backdrop-blur-md border border-[#F2C21B]/40 shadow-2xl">
        <Link
          href="/"
          className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <IconBolt className="w-3.5 h-3.5" />
          <span>V1 (Interativo)</span>
        </Link>
        <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#F2C21B] text-black shadow-md flex items-center gap-1.5">
          <IconFilm className="w-3.5 h-3.5" />
          <span>V2 (Cinema Cut)</span>
        </span>
      </div>

      <Navbar />

      <main id="conteudo">
        {/* =========================================================================
            SEÇÃO 01: HERO CINEMATOGRÁFICO COM BIKER EM PRIMEIRO PLANO
        ========================================================================= */}
        <section className="relative min-h-[95vh] flex items-center justify-between overflow-hidden border-b border-white/10">
          {/* Background image of the highway convoy */}
          <div
            className="absolute inset-0 bg-cover bg-center will-change-transform scale-105"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(8,8,9,0.94) 0%, rgba(8,8,9,0.7) 45%, rgba(8,8,9,0.3) 100%), url(${ASSETS_V2.heroBiker})`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 py-24 lg:py-36 w-full">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-[#F2C21B]" />
                <p className="text-xs sm:text-sm uppercase font-extrabold tracking-[0.25em] text-[#F2C21B]">
                  Original de OZ · Desde 2015
                </p>
              </div>

              <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-9xl leading-[1.08] sm:leading-[1.06] tracking-tight text-white mb-6">
                Nosso combustível<br />
                é a <span className="text-[#F2C21B]">irmandade.</span>
              </h1>

              <div className="inline-block mb-8 bg-[#F2C21B] text-black px-4 py-2 font-['Anton'] uppercase text-lg sm:text-2xl tracking-wide shadow-lg transform -skew-x-6">
                Nosso destino é fazer o bem.
              </div>

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
        </section>

        {/* =========================================================================
            SEÇÃO 02: UMA IRMANDADE EM MOVIMENTO (MAPA GLOBAL + 6 ROSTOS)
        ========================================================================= */}
        <section className="py-24 sm:py-32 bg-[#0A0A0C] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center mb-16" data-reveal>
              {/* Left Text & Search */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#F2C21B]" />
                  <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#AAA8A1]">
                    Uma Irmandade em Movimento
                  </span>
                </div>
                <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white">
                  Irmandade que<br />
                  <span className="text-[#F2C21B]">transforma vidas.</span>
                </h2>
                <div className="space-y-2 text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#AAA8A1]">
                  <p>Não somos apenas um moto clube.</p>
                  <p>Somos uma <strong className="text-[#F2C21B]">família global</strong> unida por valores, propósito e respeito.</p>
                  <p>Onde há um insano, há <strong className="text-white">apoio</strong>.</p>
                  <p>Onde há estrada, há <strong className="text-white">missão</strong>.</p>
                  <p>Onde há gente, há <strong className="text-[#F2C21B]">transformação</strong>.</p>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div>
                    <strong className="block font-['Anton'] text-4xl sm:text-5xl text-white">12 MIL+</strong>
                    <span className="text-[10px] text-[#AAA8A1] uppercase font-bold tracking-widest">Integrantes</span>
                  </div>
                  <div className="w-[1px] h-12 bg-white/20" />
                  <div>
                    <strong className="block font-['Anton'] text-4xl sm:text-5xl text-[#F2C21B]">65</strong>
                    <span className="text-[10px] text-[#AAA8A1] uppercase font-bold tracking-widest">Países</span>
                  </div>
                </div>

                {/* Direct Search Bar */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Digite sua cidade ou país..."
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="w-full bg-[#121316] border border-white/20 rounded-lg px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#F2C21B]"
                    />
                  </div>
                  <Link
                    href="/faca-parte"
                    className="px-6 py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-sm rounded transition-colors duration-200 hover-lift inline-flex items-center justify-center gap-2"
                  >
                    <span>Encontre o Insanos Perto de Você</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Right Global Connected Map Image */}
              <div className="lg:col-span-6 relative">
                <div className="p-4 rounded-2xl bg-[#121316] border border-white/10 shadow-2xl relative overflow-hidden">
                  <div
                    className="h-80 sm:h-96 rounded-xl bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${ASSETS_V2.worldMapBg})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-80" />
                    {/* Glowing Golden Route Hub Dots */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-full relative">
                        {/* Golden Arc Lines & Pulsing Nodes */}
                        <div className="absolute top-[50%] left-[32%] w-3 h-3 rounded-full bg-[#F2C21B] shadow-[0_0_15px_#F2C21B] animate-ping" />
                        <div className="absolute top-[35%] left-[52%] w-3 h-3 rounded-full bg-[#F2C21B] shadow-[0_0_15px_#F2C21B]" />
                        <div className="absolute top-[65%] left-[55%] w-3 h-3 rounded-full bg-[#F2C21B] shadow-[0_0_15px_#F2C21B]" />
                        <div className="absolute top-[28%] left-[24%] w-3 h-3 rounded-full bg-[#F2C21B] shadow-[0_0_15px_#F2C21B]" />
                        <div className="absolute top-[42%] left-[78%] w-3 h-3 rounded-full bg-[#F2C21B] shadow-[0_0_15px_#F2C21B]" />
                        <div className="absolute top-[72%] left-[86%] w-3 h-3 rounded-full bg-[#F2C21B] shadow-[0_0_15px_#F2C21B]" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-lg border border-white/15 flex items-center justify-between text-xs font-mono">
                      <span className="text-[#F2C21B]">● Rotas Oficiais Conectadas</span>
                      <span className="text-white/60">480+ Facções Ativas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Ribbon: 6 Faces of the Global Brotherhood */}
            <div data-reveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {ASSETS_V2.faces.map((face, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-xl overflow-hidden bg-[#141518] border border-white/10 hover:border-[#F2C21B] transition-colors duration-200 hover-lift shadow-lg"
                  >
                    <div
                      className="h-44 sm:h-52 bg-cover bg-center relative transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${face.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/20 to-transparent opacity-90" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="flex items-center gap-1 text-xs font-bold text-white mb-0.5">
                          <IconPin className="w-3 h-3 text-[#F2C21B]" />
                          <span>{face.country}</span>
                        </div>
                        <span className="text-[10px] text-[#AAA8A1] block font-mono leading-tight">
                          {face.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SEÇÃO 03: QUATRO PILARES (4 COLUNAS VERTICAIS EXPANSÍVEIS)
        ========================================================================= */}
        <section className="py-24 sm:py-32 bg-[#0D0E10] border-b border-white/10 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center" data-reveal>
              {/* 4 Interactive Vertical Image Columns (Accordion on hover) */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3 h-[480px] sm:h-[540px]">
                {ASSETS_V2.pillars.map((pillar, idx) => {
                  const isHovered = activePillarHover === idx;
                  return (
                    <div
                      key={pillar.num}
                      onMouseEnter={() => setActivePillarHover(idx)}
                      onClick={() => setActivePillarHover(idx)}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out bg-cover border ${
                        isHovered
                          ? "min-h-[290px] sm:min-h-0 sm:flex-[2.6] border-[#F2C21B] shadow-[0_0_30px_rgba(242,194,27,0.2)]"
                          : "min-h-[145px] sm:min-h-0 sm:flex-1 border-white/10 opacity-80 hover:opacity-100"
                      }`}
                      style={{
                        backgroundImage: `url(${pillar.image})`,
                        backgroundPosition: pillar.bgPosition || "center center",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="font-['Anton'] text-4xl sm:text-5xl text-[#F2C21B] block mb-1">
                          {pillar.num}
                        </span>
                        <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white leading-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-xs font-bold uppercase text-[#F2C21B] mb-2">{pillar.subtitle}</p>
                        {isHovered && (
                          <p className="text-xs text-[#D0CECB] leading-relaxed hidden sm:block animate-in fade-in duration-300">
                            {pillar.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Editorial Text & Banner */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[#F2C21B]" />
                  <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#AAA8A1]">
                    O Que Nos Move
                  </span>
                </div>
                <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl leading-tight text-white">
                  Quatro Pilares.<br />
                  <span className="text-[#F2C21B]">Uma Só Irmandade.</span>
                </h2>

                <div className="flex items-center justify-between text-[9.5px] min-[370px]:text-[11px] sm:text-xs font-mono font-bold text-white/80 py-2 border-y border-white/10 whitespace-nowrap">
                  <span>01 DEUS</span>
                  <span className="text-[#F2C21B]">•</span>
                  <span>02 FAMÍLIA</span>
                  <span className="text-[#F2C21B]">•</span>
                  <span>03 TRABALHO</span>
                  <span className="text-[#F2C21B]">•</span>
                  <span>04 MOTOCLUBE</span>
                </div>

                <div className="inline-block w-fit px-6 py-3.5 rounded-xl bg-[#F2C21B] text-black font-['Anton'] text-lg sm:text-2xl uppercase tracking-wider shadow-lg transform -skew-x-3">
                  "Colete não cria irmão. Atitude cria."
                </div>

                <p className="text-sm text-[#AAA8A1] leading-relaxed">
                  Para vestir nosso escudo, cada integrante honra esses quatro princípios sagrados.
                  Não há espaço para vaidade ou deslealdade: a conduta na estrada e na vida define quem somos.
                </p>

                <div className="pt-2">
                  <Link
                    href="/historia"
                    className="px-6 py-3.5 bg-white/10 hover:bg-[#F2C21B] hover:text-black rounded text-xs font-['Anton'] uppercase tracking-wider transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    <span>Conheça Nossa Essência</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SEÇÃO 04: HISTÓRIA (CARDS DE ACERVO + MARCA D'ÁGUA 18 GIGANTE)
        ========================================================================= */}
        <section className="py-24 sm:py-32 bg-[#090A0C] border-b border-white/10 relative overflow-hidden">
          {/* Giant Outline Watermark "18" in the Background */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none font-['Anton'] text-[320px] sm:text-[460px] text-white leading-none">
            18
          </div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
            <div className="max-w-3xl mb-16" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#F2C21B]" />
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#AAA8A1]">
                  4 • História
                </span>
              </div>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white mb-3">
                Rompendo<br />
                paradigmas<br />
                <span className="text-[#F2C21B]">desde 2015.</span>
              </h2>
              <p className="text-sm uppercase tracking-widest text-[#AAA8A1] font-bold">
                Coragem para romper. Disciplina para construir.
              </p>
            </div>

            {/* 3 Archival Vintage Frame Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-12" data-reveal>
              {ASSETS_V2.historyCards.map((card) => (
                <div
                  key={card.year}
                  className="bg-[#121316] border border-white/15 hover:border-[#F2C21B] rounded-2xl overflow-hidden p-6 transition-colors duration-200 hover-lift shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Archival Badge Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-[#F2C21B] text-black font-['Anton'] text-sm tracking-wider uppercase rounded">
                        {card.year} • {card.badge}
                      </span>
                    </div>

                    {/* Vintage Framed Photo */}
                    <div
                      className="h-52 rounded-xl bg-cover bg-center mb-4 border border-white/10 relative overflow-hidden"
                      style={{ backgroundImage: `url(${card.image})` }}
                    >
                      <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#F2C21B] uppercase font-bold">
                        {card.tag}
                      </div>
                    </div>

                    <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2">{card.title}</h3>
                    <p className="text-xs sm:text-sm text-[#AAA8A1] leading-relaxed mb-6">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-white/40">
                    Acervo Histórico Insanos MC
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4" data-reveal>
              <Link
                href="/historia"
                className="px-8 py-4 bg-[#141518] hover:bg-[#F2C21B] hover:text-black border border-white/20 text-white font-['Anton'] tracking-wider uppercase text-sm rounded transition-colors duration-200 inline-flex items-center gap-3"
              >
                <span>Conheça a História Completa</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SEÇÃO 05: IMPACTO SOCIAL (GRID ASSIMÉTRICO PCD + BONDE + COMBATE)
        ========================================================================= */}
        <section className="py-24 sm:py-32 bg-[#0D0E10] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-start mb-12" data-reveal>
              {/* Left Column Text */}
              <div className="lg:col-span-4 space-y-6">
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B] block">
                  Insanos MC — O Maior Moto Clube do Mundo
                </span>
                <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl leading-tight text-white">
                  Ninguém<br />
                  <span className="text-[#F2C21B]">fica para trás.</span>
                </h2>
                <div className="p-4 border-l-2 border-[#F2C21B] bg-white/5">
                  <p className="text-xs font-bold uppercase tracking-wider text-white">
                    | Nosso destino é fazer o bem.
                  </p>
                </div>
                <p className="text-sm text-[#AAA8A1] leading-relaxed">
                  Acreditamos que irmandade se prova na estrada e, principalmente, fora dela.
                  Apoiamos causas que transformam realidades, com respeito, presença e atitude.
                </p>
                <div className="pt-2">
                  <Link
                    href="/impacto"
                    className="px-6 py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-sm rounded transition-colors duration-200 inline-flex items-center gap-2 hover-lift"
                  >
                    <span>Conheça Nossas Ações</span>
                    <IconArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>

              {/* Center Big Card: Projeto PcD */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-[#121316] border border-white/15 shadow-2xl hover-lift">
                <div
                  className="h-80 sm:h-96 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${ASSETS_V2.impactPcd})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[#F2C21B] font-mono text-xs uppercase font-bold">
                    Iniciativa Humanitária
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-[#F2C21B] rounded-sm" />
                    <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white">
                      Projeto PcD
                    </h3>
                  </div>
                  <p className="text-sm text-[#C7C5BF] leading-relaxed">
                    Apoiamos e promovemos inclusão, mobilidade e respeito no motociclismo.
                    Porque liberdade também é poder ir e vir sobre duas ou três rodas.
                  </p>
                </div>
              </div>

              {/* Right Stacked 2 Cards: Bonde Pela Vida & Combate Insano */}
              <div className="lg:col-span-3 space-y-6">
                <div className="p-6 rounded-2xl bg-[#121316] border border-white/10 hover:border-[#F2C21B]/50 transition-colors duration-200">
                  <div
                    className="h-32 rounded-xl bg-cover bg-center mb-4"
                    style={{ backgroundImage: `url(${ASSETS_V2.impactBlood})` }}
                  />
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 bg-[#F2C21B] rounded-sm" />
                    <h4 className="font-['Anton'] text-xl uppercase text-white">Bonde Pela Vida</h4>
                  </div>
                  <p className="text-xs text-[#AAA8A1] leading-relaxed">
                    Conscientização no trânsito, doação de sangue e responsabilidade social em todo o país.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#121316] border border-white/10 hover:border-[#F2C21B]/50 transition-colors duration-200">
                  <div
                    className="h-32 rounded-xl bg-cover bg-center mb-4"
                    style={{ backgroundImage: `url(${ASSETS_V2.impactBoxing})` }}
                  />
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 bg-[#F2C21B] rounded-sm" />
                    <h4 className="font-['Anton'] text-xl uppercase text-white">Combate Insano</h4>
                  </div>
                  <p className="text-xs text-[#AAA8A1] leading-relaxed">
                    Ações de inclusão através de artes marciais para jovens em áreas de vulnerabilidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SEÇÃO 06: LIDERANÇA E LEGADO (RETRATOS OFICIAIS + IN MEMORIAM)
        ========================================================================= */}
        <section className="py-24 sm:py-32 bg-[#090A0C] border-b border-white/10 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-12" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#F2C21B]" />
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#AAA8A1]">
                  Seção 6 • Liderança e Legado
                </span>
              </div>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white mb-3">
                Quem carrega a<br />
                <span className="text-[#F2C21B]">história</span> adiante.
              </h2>
              <p className="text-base italic text-[#F2C21B] font-serif">
                “ Liderar é não deixar ninguém para trás. ”
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start" data-reveal>
              {/* Left 3 Leadership Cards */}
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-mono uppercase font-bold text-white/60 tracking-wider block">
                  —— Comando Mundial Ativo
                </span>
                <div className="grid sm:grid-cols-3 gap-4">
                  {ASSETS_V2.leaders.map((ldr, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-[#121316] border border-white/10 hover:border-[#F2C21B] transition-colors duration-200 flex flex-col justify-between"
                    >
                      <div
                        className="h-60 rounded-xl bg-cover bg-center mb-4 border border-white/10 relative overflow-hidden"
                        style={{ backgroundImage: `url(${ldr.image})` }}
                      >
                        <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-[#F2C21B] font-bold text-center">
                          {ldr.patch}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-['Anton'] text-xl uppercase text-white mb-1">{ldr.name}</h4>
                        <span className="text-[11px] text-[#AAA8A1] uppercase font-mono block">{ldr.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right In Memoriam Card */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs font-mono uppercase font-bold text-white/60 tracking-wider block">
                  —— Fundadores • Legado • In Memoriam
                </span>
                <div className="p-6 rounded-2xl bg-[#121316] border border-[#F2C21B]/40 shadow-2xl flex flex-col justify-between min-h-[380px]">
                  <div
                    className="h-60 rounded-xl bg-cover bg-center mb-4 grayscale border border-white/20 relative"
                    style={{ backgroundImage: `url(${ASSETS_V2.memorialLeader.image})` }}
                  >
                    <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#F2C21B] font-bold">
                      IN MEMORIAM
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#F2C21B] uppercase tracking-widest block mb-1">
                      {ASSETS_V2.memorialLeader.tag}
                    </span>
                    <h4 className="font-['Anton'] text-2xl uppercase text-white mb-1">
                      {ASSETS_V2.memorialLeader.name}
                    </h4>
                    <p className="text-xs text-[#AAA8A1] leading-relaxed mb-4">
                      {ASSETS_V2.memorialLeader.role}
                    </p>
                    <Link
                      href="/comando"
                      className="px-4 py-2 bg-white/10 hover:bg-[#F2C21B] hover:text-black rounded text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                    >
                      <span>Fundadores & Legado</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SEÇÃO 07: CONTENT HUB (18NEWS + AGENDA DE EVENTOS + RÁDIO + PODCAST)
        ========================================================================= */}
        <section className="py-24 sm:py-32 bg-[#0B0C0E] border-b border-white/10 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-12" data-reveal>
              <span className="px-2.5 sm:px-3 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] text-[9.5px] min-[360px]:text-[10.5px] sm:text-xs font-mono font-bold uppercase tracking-wider block w-fit mb-3 whitespace-nowrap border border-[#F2C21B]/30">
                (07) Content Hub — Notícias, Eventos e Conteúdos
              </span>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white mb-2">
                <span className="text-[#F2C21B]">18NEWS.</span><br />
                A IRMANDADE<br />
                EM MOVIMENTO.
              </h2>
              <p className="text-xs sm:text-sm uppercase tracking-wider text-[#AAA8A1] font-semibold">
                Notícias, eventos e vozes que mantêm a irmandade conectada e em movimento.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start" data-reveal>
              {/* Left Big Highlight Story */}
              <div className="lg:col-span-5 bg-[#121316] border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
                <div
                  className="h-64 sm:h-80 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${ASSETS_V2.heroBiker})` }}
                >
                  <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#F2C21B] text-black font-extrabold text-xs uppercase flex items-center gap-1.5">
                    <IconStar className="w-3.5 h-3.5 fill-black" />
                    <span>Reportagem em Destaque</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white mb-3">
                    Nosso combustível é a irmandade.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#AAA8A1] leading-relaxed mb-6">
                    Uma reportagem sobre o que nos move todos os dias: propósito, lealdade e atitudes que transformam.
                  </p>
                  <Link
                    href="/18news"
                    className="px-6 py-3 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-xs rounded transition-colors inline-flex items-center gap-2"
                  >
                    <span>Todas as Notícias</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>

              {/* Center Column: Upcoming Events Agenda */}
              <div className="lg:col-span-4 p-8 rounded-2xl bg-[#121316] border border-white/15 space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
                  <IconCalendar className="w-5 h-5 text-[#F2C21B]" />
                  <h4 className="font-['Anton'] text-2xl uppercase text-white">Próximos Eventos</h4>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Encontro Nacional em Osasco", date: "Julho 2026", desc: "Berço Oficial de OZ" },
                    { title: "Bonde Pela Vida — Etapa Inverno", date: "Agosto 2026", desc: "Hemocentros Nacionais" },
                    { title: "Expedição Serra do Rio do Rastro", date: "Setembro 2026", desc: "Santa Catarina" },
                    { title: "Aniversário Oficial de Fundação", date: "Novembro 2026", desc: "Mega Celebração" },
                  ].map((evt, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#090A0B] border border-white/10 flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-xs text-white mb-0.5">{evt.title}</h5>
                        <span className="text-[10px] text-[#AAA8A1] font-mono">{evt.desc}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#F2C21B] bg-[#F2C21B]/10 px-2 py-1 rounded">
                        {evt.date}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/18news"
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors block text-center"
                  >
                    Ver Agenda Completa →
                  </Link>
                </div>
              </div>

              {/* Right Stacked 3 Mini-Cards: Expeditions, Live Radio, Podcast */}
              <div className="lg:col-span-3 space-y-4">
                {/* Expeditions */}
                <div className="p-5 rounded-xl bg-[#121316] border border-white/10">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#F2C21B] flex items-center gap-1 mb-1">
                    <IconPin className="w-3 h-3 text-[#F2C21B]" />
                    <span>Expedições</span>
                  </span>
                  <h5 className="font-['Anton'] text-lg uppercase text-white mb-1">Estradas & Destinos</h5>
                  <p className="text-[11px] text-[#AAA8A1] mb-3">Grandes travessias documentadas pelos pilotos.</p>
                  <Link href="/18news" className="text-xs font-bold text-[#F2C21B] hover:underline">Ver Expedições →</Link>
                </div>

                {/* Radio Live */}
                <div className="p-5 rounded-xl bg-gradient-to-r from-[#17191E] to-[#121316] border border-[#F2C21B]/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#F2C21B]">((•)) Rádio 24h</span>
                    <span className={`w-2 h-2 rounded-full ${isPlayingRadio ? "bg-emerald-400 animate-ping" : "bg-emerald-500"}`} />
                  </div>
                  <h5 className="font-['Anton'] text-lg uppercase text-white mb-2">A Voz da Irmandade</h5>
                  <button
                    onClick={toggleRadio}
                    className="w-full py-2.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase text-xs rounded transition-colors flex items-center justify-center gap-2 shadow-md hover-lift"
                  >
                    <span>{isPlayingRadio ? "Pausar" : "Ouvir Ao Vivo"}</span>
                    {isPlayingRadio ? <IconPause className="w-3.5 h-3.5" /> : <IconPlay className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Podcast */}
                <div className="p-5 rounded-xl bg-[#121316] border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#F2C21B] flex items-center gap-1">
                        <IconPodcast className="w-3.5 h-3.5 text-[#F2C21B]" />
                        <span>Podcast 18Cast</span>
                      </span>
                      <span className="text-[9px] font-mono text-red-400 uppercase font-bold tracking-wider">YouTube</span>
                    </div>
                    <h5 className="font-['Anton'] text-lg uppercase text-white mb-1">Falando de Irmandade</h5>
                    <p className="text-[11px] text-[#AAA8A1] mb-3">Relatos de veteranos e conduta na estrada.</p>
                  </div>
                  <a
                    href="https://www.youtube.com/@18cast"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase text-xs rounded transition-colors flex items-center justify-center gap-2 shadow-md hover-lift"
                  >
                    <span>Acessar</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SEÇÃO 08: A ESTRADA COMEÇA AQUI (PÔR DO SOL + FORMULÁRIO EM LINHA + SELO)
        ========================================================================= */}
        <section
          className="py-24 sm:py-36 bg-cover bg-center relative overflow-hidden text-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(8,8,9,0.9) 0%, rgba(8,8,9,0.7) 50%, rgba(8,8,9,0.95) 100%), url(${ASSETS_V2.sunsetBg})`,
          }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10" data-reveal>
            <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-[#F2C21B] block mb-3">
              Insanos MC Sempre, Sempre, Sempre
            </span>
            <h2 className="font-['Anton'] uppercase text-5xl sm:text-8xl text-white leading-tight mb-4">
              A estrada começa aqui.<br />
              <span className="text-[#F2C21B]">Faça parte.</span>
            </h2>
            <p className="text-sm sm:text-lg text-[#C7C5BF] max-w-xl mx-auto leading-relaxed mb-10 font-normal">
              Diga onde você está. Nós conectamos você ao capítulo mais próximo.
            </p>

            {fastFormSent ? (
              <div className="p-8 rounded-2xl bg-black/80 backdrop-blur-md border border-[#F2C21B] max-w-lg mx-auto text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F2C21B] text-black font-bold text-2xl flex items-center justify-center mx-auto">
                  <IconCheck className="w-8 h-8 text-black" />
                </div>
                <h3 className="font-['Anton'] text-2xl uppercase text-white">Solicitação Recebida!</h3>
                <p className="text-xs text-[#AAA8A1]">
                  A diretoria regional entrará em contato via WhatsApp para orientar sobre o primeiro encontro.
                </p>
                <button
                  onClick={() => setFastFormSent(false)}
                  className="text-xs text-[#F2C21B] underline hover:text-white"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleFastFormSubmit} className="max-w-2xl mx-auto space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Cidade / Estado ou País"
                    value={fastFormData.cityState}
                    onChange={(e) => setFastFormData({ ...fastFormData, cityState: e.target.value })}
                    className="w-full bg-black/70 backdrop-blur-md border border-white/25 rounded-xl px-4 py-4 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#F2C21B]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="WhatsApp ou E-mail"
                    value={fastFormData.contact}
                    onChange={(e) => setFastFormData({ ...fastFormData, contact: e.target.value })}
                    className="w-full bg-black/70 backdrop-blur-md border border-white/25 rounded-xl px-4 py-4 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#F2C21B]"
                  />
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-[#AAA8A1]">
                  <input
                    type="checkbox"
                    id="privacy-agree"
                    required
                    checked={fastFormData.agree}
                    onChange={(e) => setFastFormData({ ...fastFormData, agree: e.target.checked })}
                    className="w-4 h-4 accent-[#F2C21B] rounded cursor-pointer"
                  />
                  <label htmlFor="privacy-agree" className="cursor-pointer">
                    Li e concordo com a <Link href="/faca-parte" className="text-[#F2C21B] underline">política de privacidade</Link> e doutrina dos 4 Pilares.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-base rounded-xl transition-colors duration-200 hover-lift shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Faça Parte</span>
                    <IconArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
                  </button>
                  <a
                    href="https://wa.me/5511988881818?text=Ola%2C%20gostaria%20de%20saber%20como%20ingressar%20no%20Insanos%20MC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <IconChat className="w-4 h-4" />
                    <span>Falar pelo WhatsApp</span>
                  </a>
                </div>

                <p className="text-[11px] text-white/50 pt-2 flex items-center justify-center gap-1.5">
                  <IconLock className="w-3.5 h-3.5 text-[#AAA8A1]" />
                  <span>Você saberá o próximo passo antes de enviar.</span>
                </p>
              </form>
            )}

            {/* Rotating Official Seal Badge */}
            <div className="mt-16 flex justify-center">
              <div className="relative w-28 h-28 rounded-full border border-white/20 flex items-center justify-center p-2 group">
                <div className="w-full h-full rounded-full border border-dashed border-[#F2C21B]/60 animate-spin [animation-duration:20s]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[8px] font-mono uppercase font-bold text-[#F2C21B] tracking-tighter text-center">
                  <span>RESERVE</span>
                  <span className="font-['Anton'] text-xs text-white">OFICIAL</span>
                  <span>18 DO FORTE</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
