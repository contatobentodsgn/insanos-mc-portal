"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { RadioBar } from "./components/RadioBar";
import { InteractiveMap } from "./components/InteractiveMap";
import { DnaQuiz } from "./components/DnaQuiz";
import { CampaignThermometer } from "./components/CampaignThermometer";
import { useRadio } from "./context/RadioContext";
import { ExpeditionsGallery } from "./components/ExpeditionsGallery";
import { TireTrackTimelineLine } from "./components/TireTrackTimelineLine";
import HeroScrollMedalThree from "./components/HeroScrollMedalThree";
import {
  IconStar,
  IconCalendar,
  IconPin,
  IconPodcast,
  IconShield,
  IconPlay,
  IconPause,
  IconArrowRight,
  IconArrowUpRight,
} from "./components/ui/Icons";

// Assets & Imagery
const ASSETS = {
  logo: "/images/insanos/insanos_mc_logo.svg",
  heroBg: "/images/insanos/hero_biker.webp",
  heroVideo1080Webm: "/videos/hero-video-1080p.webm",
  heroVideo1080Mp4: "/videos/hero-video-1080p.mp4",
  heroVideo720Webm: "/videos/hero-video-720p.webm",
  heroVideo720Mp4: "/videos/hero-video-720p.mp4",
  impactBg: "/images/insanos/impact_agasalho.webp",
  newsBg: "/images/insanos/news_featured_aniversario.webp",
  pcdBg: "/images/insanos/impact_pcd.webp",
  bloodBg: "/images/insanos/impact_blood.webp",
  boxingBg: "/images/insanos/impact_combat.webp",
  sunsetBg: "/images/insanos/join_biker_sunset.webp",
};

// Leadership Members with Authentic Portrait Imagery
const LEADERSHIP_MEMBERS = [
  {
    name: "Comando Geral",
    role: "Presidência Mundial",
    loc: "Matriz Original de OZ",
    desc: (
      <>
        Direção geral, preservação da doutrina, expansão<br className="hidden sm:inline" />{" "}
        global e representação institucional do clube.
      </>
    ),
    tag: "Berço Oficial 2015",
    image: "/images/insanos/leader_presidencia.webp",
  },
  {
    name: "Diretoria Executiva",
    role: "Vice-Presidência Mundial",
    loc: "Comando Central",
    desc: (
      <>
        Coordenação estratégica das diretorias regionais,<br className="hidden sm:inline" />{" "}
        eventos internacionais e relações institucionais.
      </>
    ),
    tag: "Expansão & Gestão",
    image: "/images/insanos/leader_executiva.webp",
  },
  {
    name: "Conselho de Honra",
    role: "Diretoria de Disciplina",
    loc: "Conselho Geral",
    desc: (
      <>
        Garantia do cumprimento do estatuto, conduta em<br className="hidden sm:inline" />{" "}
        comboio e mediação de assuntos éticos internos.
      </>
    ),
    tag: "Estatuto & Conduta",
    image: "/images/insanos/leader_disciplina.webp",
  },
  {
    name: "Diretoria Humanitária",
    role: "Diretoria de Ação Social",
    loc: "Divisão Nacional",
    desc: (
      <>
        Gestão das campanhas beneficentes, Bonde Pela Vida,<br className="hidden sm:inline" />{" "}
        Projeto PcD e apoio emergencial comunitário.
      </>
    ),
    tag: "Solidariedade & Vida",
    image: "/images/insanos/leader_social.webp",
  },
  {
    name: "Comando Exterior",
    role: "Diretoria de Expansão Internacional",
    loc: "América & Europa",
    desc: (
      <>
        Estruturação de novos capítulos fora do Brasil<br className="hidden sm:inline" />{" "}
        e padronização doutrinária internacional em 65 países.
      </>
    ),
    tag: "65 Países Conectados",
    image: "/images/insanos/leader_exterior.webp",
  },
  {
    name: "Núcleo de Mídia",
    role: "Diretoria de Comunicação & 18News",
    loc: "Núcleo Digital",
    desc: (
      <>
        Gestão de notícias oficiais, podcast 18Cast no YouTube,<br className="hidden sm:inline" />{" "}
        Rádio Insanos e canais oficiais de distribuição.
      </>
    ),
    tag: "Voz Oficial da Irmandade",
    image: "/images/insanos/leader_midia.webp",
  },
];

// Memorial & Pioneers
const MEMORIAL_MEMBERS = [
  {
    name: "Irmãos Pioneiros de 2015",
    role: "Fundadores Originais de OZ",
    desc: "Os primeiros motociclistas que deram início à irmandade na Av. dos Autonomistas em Osasco.",
    image: "/images/insanos/memorial_fundadores_oz.webp",
    badge: "Raiz Histórica",
  },
  {
    name: "Heróis do 18 do Forte",
    role: "Inspiração Moral Perpétua (1922)",
    desc: "A bravura histórica de Copacabana que forjou a determinação e lealdade bordadas no colete.",
    image: "/images/insanos/history_1922.webp",
    badge: "Legado Eterno",
  },
  {
    name: "Comboio Celestial",
    role: "Irmãos In Memoriam",
    desc: "Homenagem perpétua a cada irmão que partiu e continuará acelerando eternamente ao nosso lado.",
    image: "/images/insanos/memorial_comboio_celestial.webp",
    badge: "Honra Eterna",
  },
];

// 4 Pillars Data (Doutrina Oficial do Insanos MC)
const PILLARS_DATA: Array<{
  num: string;
  title: string;
  subtitle: React.ReactNode;
  tagline: string;
  desc: React.ReactNode;
  quote: string;
  image: string;
  bgPosition?: string;
}> = [
  {
    num: "01",
    title: "Deus",
    subtitle: (
      <>
        <span className="block whitespace-nowrap">Fé, Propósito</span>
        <span className="block whitespace-nowrap">& Respeito</span>
      </>
    ),
    tagline: "Alicerce Espiritual",
    desc: (
      <>
        <span className="block">A fé viva que guia nossos passos,</span>
        <span className="block">o respeito a todas as convicções e</span>
        <span className="block">o alicerce que nos mantém de pé.</span>
      </>
    ),
    quote: "A estrada é longa, mas a proteção divina guia o comboio.",
    image: "/images/insanos/pillar_01_deus_familia.webp",
    bgPosition: "center 18%",
  },
  {
    num: "02",
    title: "Família",
    subtitle: (
      <>
        <span className="block whitespace-nowrap">Base</span>
        <span className="block whitespace-nowrap">Inegociável</span>
      </>
    ),
    tagline: "O Lar é Sagrado",
    desc: (
      <>
        <span className="block">O lar e os filhos são a base sagrada.</span>
        <span className="block">O clube jamais divide a nossa casa:</span>
        <span className="block">o irmão de verdade cuida dos seus.</span>
      </>
    ),
    quote: "Nenhum sucesso na estrada compensa o descuido com a família.",
    image: "/images/insanos/pillar_02_comunidade_ajuda.webp",
    bgPosition: "center 22%",
  },
  {
    num: "03",
    title: "Trabalho",
    subtitle: (
      <>
        <span className="block whitespace-nowrap">Honra &</span>
        <span className="block whitespace-nowrap">Dignidade</span>
      </>
    ),
    tagline: "Sustento Honrado",
    desc: (
      <>
        <span className="block">A dignidade de vencer pelo suor,</span>
        <span className="block">a honra na rotina profissional e</span>
        <span className="block">o sustento que garante a liberdade.</span>
      </>
    ),
    quote: "O trabalho dignifica o homem e sustenta a liberdade na estrada.",
    image: "/images/insanos/pillar_03_carater_trabalho.webp",
    bgPosition: "center 20%",
  },
  {
    num: "04",
    title: "Motoclube",
    subtitle: (
      <>
        <span className="block whitespace-nowrap">Irmandade</span>
        <span className="block whitespace-nowrap">& Ação</span>
      </>
    ),
    tagline: "Lealdade & Caridade",
    desc: (
      <>
        <span className="block">Colete não cria irmão, atitude cria.</span>
        <span className="block">Hierarquia com lealdade no peito e</span>
        <span className="block">compromisso diário com o próximo.</span>
      </>
    ),
    quote: "Colete não cria irmão. Atitude cria.",
    image: "/images/insanos/pillar_04_estrada_motoclube.webp",
    bgPosition: "center 24%",
  },
];


// Timeline Milestones Data
const TIMELINE_DATA: Array<{
  year: string;
  badge: string;
  title: string;
  desc: React.ReactNode;
  highlight: React.ReactNode;
}> = [
  {
    year: "1922",
    badge: "Raízes Históricas",
    title: "Memória dos 18 do Forte",
    desc: (
      <>
        A bravura da resistência de Copacabana que inspirou o símbolo 18 adotado pelo clube:<br className="hidden sm:inline" />{" "}
        coragem inabalável, lealdade à causa e marcha unida mesmo contra todas as adversidades.
      </>
    ),
    highlight: (
      <>
        <span>Símbolo perpétuo</span>
        <span className="block sm:inline sm:ml-1">bordado no peito.</span>
      </>
    ),
  },
  {
    year: "2015",
    badge: "03/12/2015 · Fundação",
    title: "Original de OZ (Osasco/SP)",
    desc: (
      <>
        Fundação histórica do Insanos Moto Clube em Osasco/SP por motociclistas pioneiros decididos a romper<br className="hidden sm:inline" />{" "}
        paradigmas e construir uma irmandade pautada em disciplina, respeito à família e ação social.
      </>
    ),
    highlight: (
      <>
        <span>O início da maior</span>
        <span className="block sm:inline sm:ml-1">irmandade do país.</span>
      </>
    ),
  },
  {
    year: "2018",
    badge: "Associação & Sede",
    title: "Formalização e Expansão",
    desc: (
      <>
        Formalização jurídica da Associação Civil (CNPJ 32.197.906/0001-34) e cessão municipal da sede OZ,<br className="hidden sm:inline" />{" "}
        alcançando divisões em todos os estados brasileiros com frentes sociais coordenadas.
      </>
    ),
    highlight: (
      <>
        <span>Presença em todos os</span>
        <span className="block sm:inline sm:ml-1">estados brasileiros.</span>
      </>
    ),
  },
  {
    year: "2021",
    badge: "Travessia de Fronteiras",
    title: "Presença Internacional & Sangue",
    desc: (
      <>
        Abertura oficial de capítulos na América Latina, Europa e Estados Unidos, além da consolidação<br className="hidden sm:inline" />{" "}
        da Mega Ação Mundial de Doação de Sangue e do Bonde Pela Vida.
      </>
    ),
    highlight: (
      <>
        <span>Bandeira do motoclube</span>
        <span className="block sm:inline sm:ml-1">em dezenas de países.</span>
      </>
    ),
  },
  {
    year: "Hoje",
    badge: "Mais de 70 Países",
    title: "Presença Global & Salva de Prata",
    desc: (
      <>
        Reconhecido pela Câmara de SP com a Salva de Prata, o Insanos MC reúne dezenas de milhares de integrantes,<br className="hidden sm:inline" />{" "}
        centenas de divisões e mais de 14 mil ações sociais anuais.
      </>
    ),
    highlight: (
      <>
        <span>#SomosDeVerdade</span>
        <span className="block sm:inline sm:ml-1">em escala global.</span>
      </>
    ),
  },
];

// Social Projects Data
const SOCIAL_PROJECTS = [
  {
    id: "pcd",
    tag: "Acessibilidade & Superação",
    title: "Projeto PcD",
    desc: "Inclusão ativa de pessoas com deficiência no motociclismo. Adaptação mecânica e ergonômica de triciclos e motocicletas, promovendo autonomia, viagens em comboio e resgate da autoestima.",
    stats: "+450 Triciclos e motos adaptadas",
    badge: "Inclusão Real",
    image: ASSETS.pcdBg,
  },
  {
    id: "bonde",
    tag: "Saúde & Solidariedade",
    title: "Bonde Pela Vida",
    desc: "Campanhas contínuas e simultâneas de doação de sangue e cadastro de medula óssea em hemocentros de todo o território nacional. Abastecimento emergencial de bancos de sangue.",
    stats: "+25.000 Bolsas de sangue doadas",
    badge: "Salvando Vidas",
    image: ASSETS.bloodBg,
  },
  {
    id: "combate",
    tag: "Esporte & Cidadania",
    title: "Combate Insano",
    desc: "Apoio a projetos comunitários de artes marciais (Jiu-Jitsu, Muay Thai e Boxe) para crianças e jovens em áreas vulneráveis, ensinando disciplina, respeito e foco no futuro.",
    stats: "+1.200 Jovens atendidos",
    badge: "Formação de Cidadãos",
    image: ASSETS.boxingBg,
  },
  {
    id: "comunitario",
    tag: "Emergência & Dignidade",
    title: "Ação Social Permanente",
    desc: "Distribuição mensal de cestas básicas, roupas, cobertores no inverno e brinquedos no Dia das Crianças e Natal. Resposta rápida a enchentes e calamidades públicas.",
    stats: "+420 Toneladas de alimentos entregues",
    badge: "Ajuda Direta",
    image: ASSETS.impactBg,
  },
];

export function HomeClient() {
  const root = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const { isPlaying: isPlayingRadio, toggleRadio } = useRadio();
  const [activePillar, setActivePillar] = useState(0);
  const [activePillarHover, setActivePillarHover] = useState<number | null>(0);
  const [activeProject, setActiveProject] = useState("pcd");
  const [activeLeaderTab, setActiveLeaderTab] = useState<"comando" | "memorial">("comando");
  const [activeAdmissionTab, setActiveAdmissionTab] = useState<"direto" | "simulador">("direto");

  const triggerHaptic = (ms = 12) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {
        // ignore
      }
    }
  };

  // Mouse Ambient Spotlight on Hero
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  // Hash Scroll Handler (for links like /#escala, /#pilares)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashScroll = () => {
        const hash = window.location.hash;
        if (hash) {
          const id = hash.replace("#", "");
          const el = document.getElementById(id);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 350);
          }
        }
      };

      handleHashScroll();
      window.addEventListener("hashchange", handleHashScroll);
      return () => window.removeEventListener("hashchange", handleHashScroll);
    }
  }, []);

  // GSAP Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !root.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 35,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.to(".hero-parallax-bg", {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      // History Progress Line: reveals gold tire track progressively via clip-path (zero distortion)
      gsap.to(".timeline-track-gold", {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: {
          trigger: timelineContainerRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;
            const line = document.getElementById("timeline-progress-line");
            if (line) {
              line.style.height = `${progress * 100}%`;
            }
          },
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Mobile Scroll-Driven Auto-Expansion for 4 Pillars Cards
  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      if (window.innerWidth >= 640) {
        if (observer) observer.disconnect();
        return;
      }

      const cardElements = document.querySelectorAll("[data-pillar-card]");
      if (!cardElements.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idxStr = entry.target.getAttribute("data-pillar-card");
              if (idxStr !== null) {
                const idx = parseInt(idxStr, 10);
                if (!isNaN(idx)) {
                  setActivePillarHover(idx);
                }
              }
            }
          });
        },
        {
          root: null,
          rootMargin: "-25% 0px -35% 0px",
          threshold: 0.2,
        }
      );

      cardElements.forEach((el) => observer?.observe(el));
    };

    setupObserver();
    window.addEventListener("resize", setupObserver);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", setupObserver);
    };
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] overflow-x-clip font-sans">
      <Navbar />


      <main id="conteudo">
        {/* =========================================================================
            CAPÍTULO 01: HERO CINEMATOGRÁFICO COM MEDALHA 3D INTERATIVA (SCROLL)
        ========================================================================= */}
        <section id="inicio" className="relative">
          <HeroScrollMedalThree />
        </section>

        {/* =========================================================================
            CAPÍTULO 02: ESCALA MUNDIAL & MAPA INTERATIVO DE SEDES
        ========================================================================= */}
        <section id="escala" className="scroll-mt-20 py-24 sm:py-32 bg-[#0C0D0E] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-16" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C21B] via-[#FFD700] to-[#B88E07] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
                <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  Presença Global & Território
                </p>
              </div>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white mb-6 tracking-[-0.015em] sm:tracking-[-0.02em]">
                Uma irmandade que<br />
                <span className="text-[#F2C21B]">transforma vidas.</span>
              </h2>
              <p className="text-[#D4D1CA] font-medium text-base sm:text-lg leading-relaxed">
                Nascido em Osasco em 2015, o Insanos Moto Clube rompeu fronteiras territoriais e culturais. Hoje somos milhares de irmãos conectados pelo mesmo estatuto,<br className="hidden sm:inline" />{" "}
                disciplina rigorosa e compromisso com o próximo.
              </p>
            </div>

            {/* Interactive Vector Map Hub */}
            <div id="escala-mapa" className="mb-16 scroll-mt-28" data-reveal>
              <InteractiveMap />
            </div>

            {/* Global Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-white/10" data-reveal>
              <div>
                <strong className="block font-['Anton'] text-3xl sm:text-6xl text-[#F2C21B] tracking-[0.04em]">+12.000</strong>
                <span className="text-[11px] sm:text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Integrantes Ativos</span>
              </div>
              <div>
                <strong className="block font-['Anton'] text-3xl sm:text-6xl text-[#F2C21B] tracking-[0.04em]">65</strong>
                <span className="text-[11px] sm:text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Países Presentes</span>
              </div>
              <div>
                <strong className="block font-['Anton'] text-3xl sm:text-6xl text-[#F2C21B] tracking-[0.04em]">+10.000</strong>
                <span className="text-[11px] sm:text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Famílias Atendidas</span>
              </div>
              <div>
                <strong className="block font-['Anton'] text-3xl sm:text-6xl text-[#F2C21B] tracking-[0.04em]">480+</strong>
                <span className="text-[11px] sm:text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Capítulos & Facções</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 03: OS QUATRO PILARES (4 COLUNAS VERTICAIS EXPANSÍVEIS)
        ========================================================================= */}
        <section id="pilares" className="py-24 sm:py-32 bg-[#0D0E10] border-b border-white/10 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center" data-reveal>
              {/* 4 Interactive Vertical Image Columns (Accordion on hover / Dynamic expanding cards on mobile) */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3 h-auto sm:h-[540px]">
                {PILLARS_DATA.map((pillar, idx) => {
                  const isHovered = activePillarHover === idx;
                  return (
                    <div
                      key={pillar.num}
                      data-pillar-card={idx}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isHovered}
                      aria-label={`Pilar ${pillar.num}: ${pillar.title}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          triggerHaptic(10);
                          setActivePillarHover(activePillarHover === idx ? -1 : idx);
                        }
                      }}
                      onMouseEnter={() => setActivePillarHover(idx)}
                      onClick={() => {
                        triggerHaptic(10);
                        setActivePillarHover(activePillarHover === idx ? -1 : idx);
                      }}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] bg-cover border flex flex-col justify-end p-4 sm:p-5 lg:p-6 focus:outline-none focus:ring-2 focus:ring-[#F2C21B] ${
                        isHovered
                          ? "min-h-[290px] sm:min-h-0 sm:flex-[3.2] border-[#F2C21B] shadow-[0_0_30px_rgba(242,194,27,0.25)]"
                          : "min-h-[145px] sm:min-h-0 sm:flex-1 border-t-white/20 border-b-white/5 border-x-white/10 opacity-85 hover:opacity-100"
                      }`}
                      style={{
                        backgroundImage: `url(${pillar.image})`,
                        backgroundPosition: pillar.bgPosition || "center center",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent pointer-events-none" />
                      <div className="relative z-10">
                        <span className="font-['Anton'] text-4xl sm:text-5xl text-[#F2C21B] block mb-0.5 leading-none">
                          {pillar.num}
                        </span>
                        <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white leading-tight">
                          {pillar.title}
                        </h3>
                        <div className="flex items-end justify-between mb-2">
                          <div className="text-[10.5px] min-[380px]:text-[11px] sm:text-xs font-bold uppercase text-[#F2C21B] leading-tight tracking-wide">
                            {pillar.subtitle}
                          </div>
                          <span className="sm:hidden text-[10px] font-mono text-[#F2C21B]/80 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full border border-white/10">
                            {isHovered ? "▲" : "▼ Detalhes"}
                          </span>
                        </div>

                        <div
                          className={`overflow-hidden transition-all duration-400 ease-out ${
                            isHovered
                              ? "max-h-40 opacity-100 translate-y-0 mt-1"
                              : "max-h-0 opacity-0 translate-y-2 pointer-events-none"
                          }`}
                        >
                          <div className="text-[12px] sm:text-[12.5px] lg:text-[13px] text-[#F4F1E8] font-medium leading-tight sm:leading-snug border-l-2 border-[#F2C21B] pl-2.5">
                            {pillar.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Editorial Text & Banner */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C21B] via-[#FFD700] to-[#B88E07] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
                  <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#AAA8A1]">
                    O Que Nos Move
                  </span>
                </div>
                <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl leading-tight text-white tracking-[-0.015em]">
                  Quatro Pilares.<br />
                  <span className="text-[#F2C21B]">Uma Só Irmandade.</span>
                </h2>

                <div className="flex items-center justify-between text-[9.5px] min-[370px]:text-[11px] sm:text-xs font-mono font-bold text-white/90 py-2 border-y border-white/10 whitespace-nowrap">
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

                <p className="text-sm text-[#D4D1CA] font-medium leading-relaxed">
                  Para vestir nosso escudo, cada integrante honra esses quatro<br className="hidden sm:inline" />{" "}
                  princípios sagrados. Não há espaço para vaidade ou deslealdade:<br className="hidden sm:inline" />{" "}
                  a conduta na estrada e na vida define quem somos.
                </p>

                <div className="pt-2">
                  <Link
                    href="/historia"
                    className="px-6 py-3.5 bg-white/10 hover:bg-[#F2C21B] hover:text-black rounded text-xs font-['Anton'] uppercase tracking-wider transition-colors duration-200 inline-flex items-center gap-2"
                  >
                    <span>Conheça Nossa Essência</span>
                    <IconArrowRight className="w-3.5 h-3.5 text-inherit" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 04: HISTÓRIA, 18 DO FORTE & ORIGEM EM OSASCO
        ========================================================================= */}
        <section id="origem" className="py-24 sm:py-32 bg-[#090A0C] border-b border-white/10 relative overflow-hidden">
          {/* Background Image: bordado.webp */}
          <div
            className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat pointer-events-none opacity-60"
            style={{ backgroundImage: `url('/images/insanos/bordado.webp')` }}
          />

          {/* Gradients & Vignettes for contrast & text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090A0C] via-[#090A0C]/80 sm:via-[#090A0C]/70 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#090A0C] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090A0C] to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-12" data-reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[#F2C21B]/30 backdrop-blur-sm">
                <span>Tradição & Origem · 18 do Forte</span>
              </div>
              <h2 className="font-['Anton'] uppercase text-3xl sm:text-6xl text-white leading-tight mb-4 drop-shadow-md">
                Nascido em Osasco.<br />
                <span className="text-[#F2C21B]">Forjado no asfalto.</span>
              </h2>
              <p className="text-[#C7C5BF] text-base sm:text-lg leading-relaxed">
                Em <strong>03 de dezembro de 2015</strong>, na cidade de Osasco/SP, motociclistas experientes decidiram criar algo novo.<br className="hidden sm:inline" />{" "}
                Um motoclube com disciplina inegociável, respeito sagrado à família, amor ao trabalho e<br className="hidden sm:inline" />{" "}
                uma vocação inabalável para fazer o bem a quem mais precisa.
              </p>
            </div>

            {/* Historical Origin Bento Grid */}
            <div className="grid md:grid-cols-3 gap-6" data-reveal>
              {MEMORIAL_MEMBERS.map((item) => (
                <div
                  key={item.name}
                  className="bg-[#121316]/80 border border-white/10 hover:border-[#F2C21B]/50 rounded-2xl overflow-hidden group transition-all duration-300 backdrop-blur-sm"
                >
                  <div
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/70 border border-[#F2C21B]/40 text-[#F2C21B] text-[10px] font-mono font-bold uppercase">
                      {item.badge}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Anton'] text-xl uppercase text-white mb-1">{item.name}</h3>
                    <p className="text-xs font-bold uppercase text-[#F2C21B] mb-3">{item.role}</p>
                    <p className="text-xs text-[#AAA8A1] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 04: LINHA DO TEMPO (HISTÓRICO)
        ========================================================================= */}
        <section id="historia" className="history-section py-24 sm:py-32 bg-[#0A0A0B] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-20" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C21B] via-[#FFD700] to-[#B88E07] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
                <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  História & Tradição
                </p>
              </div>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white mb-6 tracking-[-0.015em] sm:tracking-[-0.02em]">
                Rompendo<br />
                paradigmas<br />
                <span className="text-[#F2C21B]">desde 2015.</span>
              </h2>
              <p className="text-[#D4D1CA] font-medium text-base sm:text-lg leading-relaxed">
                Nossa história foi escrita no asfalto com<br className="sm:hidden" /> coragem, união e compromisso irrevogável.<br className="hidden sm:inline" />{" "}
                Da bravura histórica de 1922 à fundação<br className="sm:hidden" /> em Osasco e à consagração como<br className="sm:hidden" />{" "}
                o maior motoclube do planeta.
              </p>
            </div>

            <div ref={timelineContainerRef} className="timeline-container relative space-y-12 sm:space-y-16">
              {/* Continuous Tire Track from Dot 0 Center (top: 28px) down to Last Dot Center (lastItem.offsetTop) */}
              <TireTrackTimelineLine containerRef={timelineContainerRef} />

              {TIMELINE_DATA.map((item, idx) => (
                <div
                  key={item.year}
                  className="timeline-item relative pl-10 sm:pl-14 group"
                  data-reveal
                >
                  {/* Timeline Pin Dot: 100% centered on vertical axis, sits above track with z-10 */}
                  <div
                    className={`timeline-dot absolute left-3 sm:left-4 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-[#0A0A0B] border-4 border-[#F2C21B] z-10 transition-transform duration-200 ease-out group-hover:scale-110 ${
                      idx === 0
                        ? "shadow-[0_0_20px_rgba(242,194,27,0.9)] ring-2 ring-[#F2C21B]/40 ring-offset-2 ring-offset-[#0A0A0A]"
                        : "shadow-[0_0_12px_rgba(242,194,27,0.5)]"
                    }`}
                  />

                  <div className="bg-[#141517] border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/60 p-6 sm:p-8 rounded-xl transition-colors duration-200 max-w-4xl shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-['Anton'] text-3xl sm:text-4xl text-[#F2C21B]">{item.year}</span>
                        <span className="text-xs uppercase font-extrabold px-3 py-1 bg-white/10 rounded text-white tracking-wider">
                          {item.badge}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#F2C21B] bg-[#F2C21B]/10 px-3 py-1 rounded border border-[#F2C21B]/20">
                        {item.highlight}
                      </span>
                    </div>
                    <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-[#D4D1CA] font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center" data-reveal>
              <Link
                href="/historia"
                className="px-8 py-4 bg-[#141517] hover:bg-[#F2C21B] hover:text-black border border-white/20 text-white font-['Anton'] tracking-wider uppercase text-base rounded transition-colors duration-200 inline-flex items-center gap-3 hover-lift"
              >
                <span>Ler História Completa & Documentos</span>
                <IconArrowRight className="w-4 h-4 text-inherit" />
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 05: AÇÕES SOCIAIS (BENTO GRID ASSIMÉTRICO + TERMÔMETRO)
        ========================================================================= */}
        <section id="impacto" className="py-24 sm:py-32 bg-[#161820] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            {/* Campaign Live Goal Thermometer */}
            <div className="mb-20" data-reveal>
              <CampaignThermometer />
            </div>

            {/* Asymmetric Social Impact Bento Grid */}
            <div className="grid lg:grid-cols-12 gap-8 items-start mb-12" data-reveal>
              {/* Left Column Text */}
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C21B] via-[#FFD700] to-[#B88E07] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
                  <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B] block">
                    Insanos MC — O Maior Moto Clube do Mundo
                  </span>
                </div>
                <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl leading-tight text-white tracking-[-0.015em] sm:tracking-[-0.02em]">
                  Ninguém<br />
                  <span className="text-[#F2C21B]">fica para trás.</span>
                </h2>
                <div className="p-4 border-l-2 border-[#F2C21B] bg-white/5">
                  <p className="text-xs font-bold uppercase tracking-wider text-white">
                    | Nosso destino é fazer o bem.
                  </p>
                </div>
                <p className="text-sm text-[#D4D1CA] font-medium leading-relaxed">
                  Acreditamos que irmandade se prova na estrada e, principalmente, fora dela.
                  Apoiamos causas que transformam realidades, com respeito, presença e atitude.
                </p>
                <div className="pt-2">
                  <Link
                    href="/impacto"
                    className="px-6 py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-sm rounded transition-colors duration-200 inline-flex items-center gap-2 hover-lift"
                  >
                    <span>Conheça Nossas Ações</span>
                    <IconArrowRight className="w-4 h-4 text-black shrink-0" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>

              {/* Center Big Card: Projeto PcD */}
              <div className="lg:col-span-5 group rounded-2xl overflow-hidden bg-[#1C1F2A] border border-t-white/25 border-b-white/5 border-x-white/15 hover:border-[#F2C21B]/60 shadow-2xl hover:shadow-[0_0_30px_rgba(242,194,27,0.15)] transition-all duration-300 hover-lift">
                <div className="h-80 sm:h-96 overflow-hidden relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 filter grayscale-[10%] group-hover:grayscale-0"
                    style={{ backgroundImage: `url(/images/insanos/impact_pcd.webp)` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F2A] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[#F2C21B] font-mono text-xs uppercase font-bold border border-white/10">
                    Iniciativa Humanitária
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-[#F2C21B] rounded-sm transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white group-hover:text-[#F2C21B] transition-colors duration-200">
                      Projeto PcD
                    </h3>
                  </div>
                  <p className="text-sm text-[#F4F1E8] font-medium leading-relaxed">
                    Apoiamos e promovemos inclusão, mobilidade<br className="hidden sm:inline" />{" "}
                    e respeito no motociclismo. Porque liberdade<br className="hidden sm:inline" />{" "}
                    também é poder ir e vir sobre duas ou três rodas.
                  </p>
                </div>
              </div>

              {/* Right Stacked 2 Cards: Bonde Pela Vida & Combate Insano */}
              <div className="lg:col-span-3 space-y-6">
                <div className="group p-6 rounded-2xl bg-[#1C1F2A] border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/60 hover:shadow-[0_0_25px_rgba(242,194,27,0.15)] transition-all duration-300 hover-lift">
                  <div className="h-32 rounded-xl overflow-hidden mb-4 relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 filter grayscale-[10%] group-hover:grayscale-0"
                      style={{ backgroundImage: `url(/images/insanos/impact_blood.webp)` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 bg-[#F2C21B] rounded-sm transition-transform duration-300 group-hover:scale-110" />
                    <h4 className="font-['Anton'] text-xl uppercase text-white group-hover:text-[#F2C21B] transition-colors duration-200">
                      Bonde Pela Vida
                    </h4>
                  </div>
                  <p className="text-xs text-[#D4D1CA] font-medium leading-relaxed">
                    Conscientização no trânsito, doação<br className="hidden sm:inline" />{" "}
                    de sangue e responsabilidade social<br className="hidden sm:inline" />{" "}
                    em todo o país.
                  </p>
                </div>

                <div className="group p-6 rounded-2xl bg-[#1C1F2A] border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/60 hover:shadow-[0_0_25px_rgba(242,194,27,0.15)] transition-all duration-300 hover-lift">
                  <div className="h-32 rounded-xl overflow-hidden mb-4 relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 filter grayscale-[10%] group-hover:grayscale-0"
                      style={{ backgroundImage: `url(/images/insanos/impact_combat.webp)` }}
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 bg-[#F2C21B] rounded-sm transition-transform duration-300 group-hover:scale-110" />
                    <h4 className="font-['Anton'] text-xl uppercase text-white group-hover:text-[#F2C21B] transition-colors duration-200">
                      Combate Insano
                    </h4>
                  </div>
                  <p className="text-xs text-[#D4D1CA] font-medium leading-relaxed">
                    Ações de inclusão através de artes marciais para jovens em áreas de vulnerabilidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 06: COMANDO MUNDIAL, FUNDADORES & IN MEMORIAM
        ========================================================================= */}
        <section id="comando" className="py-24 sm:py-32 bg-[#0A0A0A] border-b border-white/10 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-12" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C21B] via-[#FFD700] to-[#B88E07] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
                <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  Liderança & Legado
                </p>
              </div>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white mb-6 tracking-[-0.015em] sm:tracking-[-0.02em]">
                Quem carrega a<br />
                <span className="text-[#F2C21B]">história</span> adiante.
              </h2>
              <p className="text-[#D4D1CA] font-medium text-base sm:text-lg leading-relaxed">
                Uma organização mundial com hierarquia clara, disciplina<br className="hidden sm:inline" />{" "}
                inegociável e respeito solene àqueles que abriram a estrada.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 mb-10 border-b border-white/10 pb-4 items-end" data-reveal>
              <button
                onClick={() => {
                  triggerHaptic(10);
                  setActiveLeaderTab("comando");
                }}
                className={`pb-2 text-sm sm:text-base font-['Anton'] uppercase tracking-wider transition-colors duration-200 border-b-2 text-left sm:text-center cursor-pointer active:scale-[0.98] whitespace-nowrap ${
                  activeLeaderTab === "comando"
                    ? "border-[#F2C21B] text-[#F2C21B]"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                Comando Mundial Ativo
              </button>
              <button
                onClick={() => {
                  triggerHaptic(10);
                  setActiveLeaderTab("memorial");
                }}
                className={`pb-2 text-sm sm:text-base font-['Anton'] uppercase tracking-wider transition-colors duration-200 border-b-2 text-left sm:text-center cursor-pointer active:scale-[0.98] whitespace-normal sm:whitespace-nowrap ${
                  activeLeaderTab === "memorial"
                    ? "border-[#F2C21B] text-[#F2C21B]"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                Fundadores, Legado & In Memoriam
              </button>
            </div>

            {activeLeaderTab === "comando" ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-reveal>
                {LEADERSHIP_MEMBERS.map((item, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl bg-[#121316] border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/70 hover:shadow-[0_0_35px_rgba(242,194,27,0.2)] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl hover-lift"
                  >
                    {/* Leader Portrait Image with Full Face Alignment */}
                    <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#0A0A0C]">
                      <div
                        className="absolute inset-0 bg-cover bg-[center_top] filter grayscale-[12%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        style={{
                          backgroundImage: `url(${item.image})`,
                          backgroundPosition: "center top",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/20 to-transparent" />
                      
                      {/* Location Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded bg-black/85 backdrop-blur-md border border-[#F2C21B]/40 text-[#F2C21B] font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg">
                          {item.loc}
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 pt-3 flex flex-col justify-between flex-1">
                      <div>
                        <span className="text-[10px] font-mono uppercase font-bold text-[#AAA8A1] block mb-1">
                          {item.name}
                        </span>
                        <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2 leading-tight group-hover:text-[#F2C21B] transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-xs text-[#D4D1CA] font-medium leading-relaxed mb-4">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#AAA8A1]">
                        <span className="font-mono">{item.tag}</span>
                        <span className="text-[#F2C21B] font-bold uppercase">Corpo Diretivo</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-10" data-reveal>
                {/* Memorial Hero Card */}
                <div className="p-8 sm:p-12 rounded-2xl bg-[#111215] border border-t-white/25 border-b-white/5 border-x-white/15 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,194,27,0.08),transparent_70%)] pointer-events-none" />
                  <span className="font-['Anton'] text-4xl sm:text-6xl text-[#F2C21B] mb-2 block tracking-tight">
                    HONRA ETERNA
                  </span>
                  <h3 className="font-['Anton'] text-2xl sm:text-4xl uppercase text-white mb-4">
                    Àqueles que abriram a estrada
                  </h3>
                  <p className="text-[#D4D1CA] font-medium text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
                    A história do Insanos Moto Clube é sustentada pela coragem dos irmãos pioneiros que ergueram este escudo e daqueles que continuam acelerando na estrada celestial. A memória e o legado de cada irmão jamais serão esquecidos.
                  </p>
                  <div className="inline-block px-6 py-2 rounded-full border border-[#F2C21B]/40 bg-[#F2C21B]/10 text-[#F2C21B] font-mono text-xs uppercase tracking-widest shadow-inner">
                    Insanos Sempre, Sempre Insano · In Memoriam
                  </div>
                </div>

                {/* Memorial Photographic Grid */}
                <div className="grid sm:grid-cols-3 gap-6">
                  {MEMORIAL_MEMBERS.map((mem, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-2xl bg-[#121316] border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/50 transition-all duration-300 overflow-hidden shadow-xl"
                    >
                      <div
                        className="h-64 bg-cover bg-[center_top] transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-125 relative"
                        style={{ backgroundImage: `url(${mem.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-black/40 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded bg-black/80 text-[#F2C21B] font-mono text-[9px] font-bold uppercase tracking-wider border border-white/10">
                            {mem.badge}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-['Anton'] text-xl uppercase text-white mb-1">
                          {mem.name}
                        </h4>
                        <p className="text-xs font-mono uppercase text-[#F2C21B] mb-3 font-bold">{mem.role}</p>
                        <p className="text-xs text-[#D4D1CA] font-medium leading-relaxed">
                          {mem.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 07: CONTENT HUB (18NEWS + AGENDA + RÁDIO + PODCAST)
        ========================================================================= */}
        <section id="noticias" className="py-24 sm:py-32 bg-[#0B0C0E] border-b border-white/10 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
            <div className="max-w-3xl" data-reveal>
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
                  style={{ backgroundImage: `url(/images/insanos/news_featured_aniversario.webp)` }}
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
                    Uma reportagem sobre o que nos move todos os dias:<br className="hidden sm:inline" />{" "}
                    propósito, lealdade e atitudes que transformam.
                  </p>
                  <Link
                    href="/18news"
                    className="px-6 py-3 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-xs rounded transition-colors inline-flex items-center gap-2"
                  >
                    <span>Todas as Notícias</span>
                    <IconArrowRight className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>

              {/* Center Column: Upcoming Events Agenda */}
              <div className="lg:col-span-4 p-8 rounded-2xl bg-[#121316] border border-white/15 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <IconCalendar className="w-5 h-5 text-[#F2C21B]" />
                    <h4 className="font-['Anton'] text-2xl uppercase text-white">Próximos Eventos</h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#F2C21B] font-bold uppercase px-2 py-0.5 rounded bg-[#F2C21B]/15">
                    2026
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Encontro Nacional em Osasco", date: "Julho 2026", desc: "Berço Oficial de OZ · 3 Dias" },
                    { title: "Bonde Pela Vida — Etapa Inverno", date: "Agosto 2026", desc: "Mega Coleta de Sangue Nacional" },
                    { title: "Expedição Serra do Rio do Rastro", date: "Setembro 2026", desc: "Travessia Alpinas Santa Catarina" },
                    { title: "Aniversário Oficial de Fundação", date: "Novembro 2026", desc: "Mega Celebração Magna" },
                  ].map((evt, idx) => (
                    <Link
                      key={idx}
                      href="/eventos"
                      className="p-3.5 rounded-xl bg-[#090A0B] border border-white/10 hover:border-[#F2C21B]/60 flex items-center justify-between transition-all group/item block"
                    >
                      <div>
                        <h5 className="font-bold text-xs text-white group-hover/item:text-[#F2C21B] transition-colors mb-0.5">{evt.title}</h5>
                        <span className="text-[10px] text-[#AAA8A1] font-mono">{evt.desc}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#F2C21B] bg-[#F2C21B]/10 px-2 py-1 rounded shrink-0">
                        {evt.date}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href="/eventos"
                    className="w-full py-3 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 text-center shadow-md hover-lift font-mono"
                  >
                    <span>Ver Agenda Completa & Sincronizar</span>
                    <IconArrowRight className="w-3.5 h-3.5 text-black" />
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
                  <Link href="/18news" className="text-xs font-bold text-[#F2C21B] hover:underline inline-flex items-center gap-1.5">
                    <span>Ver Expedições</span>
                    <IconArrowRight className="w-3 h-3 text-[#F2C21B]" />
                  </Link>
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
                    href="https://www.youtube.com/@InsanosMCOficial"
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

            {/* Cinematic Lightbox Gallery */}
            <div data-reveal className="pt-8 border-t border-white/10">
              <ExpeditionsGallery />
            </div>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 08: FAÇA PARTE & SIMULADOR DE AFINIDADE DOUTRINÁRIA
        ========================================================================= */}
        <section id="faca-parte" className="py-24 sm:py-32 bg-[#080809] relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-8" data-reveal>
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B] block mb-4">
                A Estrada Começa Com a Sua Atitude
              </span>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-7xl text-white mb-6">
                Faça parte da <span className="text-[#F2C21B]">irmandade.</span>
              </h2>
              <p className="text-base sm:text-xl text-[#C7C5BF] max-w-2xl mx-auto leading-relaxed mb-8">
                Conecte-se à maior família de motociclistas do planeta. Faça o teste de afinidade ou acesse o formulário oficial de Pré-Postulante (PP).
              </p>

              {/* Tab Selector: Direct vs Quiz */}
              <div className="inline-flex bg-[#141519] p-1.5 rounded-xl border border-white/10 mb-8">
                <button
                  onClick={() => setActiveAdmissionTab("direto")}
                  className={`px-6 py-2.5 rounded-lg font-['Anton'] uppercase text-sm tracking-wider transition-colors duration-150 ${
                    activeAdmissionTab === "direto" ? "bg-[#F2C21B] text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  Inscrição Direta
                </button>
                <button
                  onClick={() => setActiveAdmissionTab("simulador")}
                  className={`px-6 py-2.5 rounded-lg font-['Anton'] uppercase text-sm tracking-wider transition-colors duration-150 flex items-center gap-2 ${
                    activeAdmissionTab === "simulador" ? "bg-[#F2C21B] text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  <IconShield className="w-4 h-4 text-inherit" />
                  <span>Teste: Você tem o DNA Insanos?</span>
                </button>
              </div>
            </div>

            {activeAdmissionTab === "simulador" ? (
              <DnaQuiz />
            ) : (
              <div className="p-8 sm:p-12 rounded-2xl bg-[#121316] border border-white/15 text-center shadow-2xl">
                <h3 className="font-['Anton'] text-2xl sm:text-4xl uppercase text-white mb-4">
                  Portal Oficial de Ingresso
                </h3>
                <p className="text-[#AAA8A1] text-sm sm:text-base max-w-xl mx-auto mb-8">
                  Preencha seus dados de contato, região e dados de motocicleta<br className="hidden sm:inline" />{" "}
                  para que a diretoria regional do seu estado entre em contato.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/faca-parte"
                    className="w-full sm:w-auto px-6 sm:px-10 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-base sm:text-lg rounded shadow-xl inline-flex items-center justify-center gap-2.5 transition-colors duration-200 hover-lift whitespace-nowrap"
                  >
                    <span>Acessar Ficha de Cadastro</span>
                    <IconArrowRight className="w-5 h-5 text-black shrink-0" strokeWidth={2.5} />
                  </Link>
                  <Link
                    href="/ecossistema"
                    className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-[#141517] hover:border-[#F2C21B] border border-white/20 text-white font-bold uppercase text-xs sm:text-sm rounded transition-colors duration-200 inline-flex items-center justify-center whitespace-nowrap"
                  >
                    Conhecer Ecossistema 18
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
