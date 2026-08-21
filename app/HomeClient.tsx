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
import {
  IconStar,
  IconCalendar,
  IconPin,
  IconPodcast,
  IconShield,
  IconPlay,
  IconPause,
} from "./components/ui/Icons";

// Assets & Imagery
const ASSETS = {
  logo: "/images/insanos/insanos_mc_logo.svg",
  heroBg: "/images/insanos/hero_biker.webp",
  heroVideo: "/videos/hero-video-1080p.webm",
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

// 4 Pillars Data
const PILLARS_DATA: Array<{
  num: string;
  title: string;
  subtitle: string;
  tagline: string;
  desc: React.ReactNode;
  quote: string;
  image: string;
}> = [
  {
    num: "01",
    title: "Deus",
    subtitle: "Família",
    tagline: "Convicção & Fé",
    desc: (
      <>
        A fé que guia cada curva e o respeito<br className="hidden sm:inline" />{" "}
        inegociável ao lar e aos filhos. O alicerce<br className="hidden sm:inline" />{" "}
        que nos mantém firmes na estrada.
      </>
    ),
    quote: "A estrada é longa, mas a proteção divina guia o comboio.",
    image: "/images/insanos/pillar_01_deus_familia.webp",
  },
  {
    num: "02",
    title: "Comunidade",
    subtitle: "Ajuda",
    tagline: "Nosso Destino é Fazer o Bem",
    desc: (
      <>
        Nosso destino é fazer o bem. Ação<br className="hidden sm:inline" />{" "}
        humanitária contínua e apoio direto para<br className="hidden sm:inline" />{" "}
        quem mais precisa em cada cidade.
      </>
    ),
    quote: "Ninguém fica para trás, em casa ou no asfalto.",
    image: "/images/insanos/pillar_02_comunidade_ajuda.webp",
  },
  {
    num: "03",
    title: "Caráter",
    subtitle: "Trabalho",
    tagline: "Honra & Dignidade",
    desc: (
      <>
        A dignidade que sustenta o homem e a<br className="hidden sm:inline" />{" "}
        disciplina que forja o respeito. O clube é<br className="hidden sm:inline" />{" "}
        composto por trabalhadores honrados.
      </>
    ),
    quote: "O suor do trabalho sustenta a liberdade na estrada.",
    image: "/images/insanos/pillar_03_carater_trabalho.webp",
  },
  {
    num: "04",
    title: "Estrada",
    subtitle: "Motoclube",
    tagline: "Irmandade & Lealdade",
    desc: (
      <>
        Colete não cria irmão, atitude cria.<br className="hidden sm:inline" />{" "}
        Hierarquia inabalável, união na<br className="hidden sm:inline" />{" "}
        rodovia e lealdade gravada no peito.
      </>
    ),
    quote: "Colete não cria irmão. Atitude cria.",
    image: "/images/insanos/pillar_04_estrada_motoclube.webp",
  },
];


// Timeline Milestones Data
const TIMELINE_DATA: Array<{
  year: string;
  badge: string;
  title: string;
  desc: React.ReactNode;
  highlight: string;
}> = [
  {
    year: "1922",
    badge: "Raízes Históricas",
    title: "Os 18 do Forte",
    desc: (
      <>
        A bravura dos 18 militares de Copacabana que inspirou o símbolo adotado pelo clube:<br className="hidden sm:inline" />{" "}
        coragem inabalável, lealdade à causa e marcha unida mesmo contra todas as adversidades.
      </>
    ),
    highlight: "Símbolo perpétuo bordado no peito.",
  },
  {
    year: "2015",
    badge: "Fundação Oficial",
    title: "Original de OZ (Osasco/SP)",
    desc: (
      <>
        Fundação do Insanos Moto Clube em Osasco/SP. Um grupo de homens decididos a romper<br className="hidden sm:inline" />{" "}
        os velhos paradigmas do motociclismo tradicional, unindo disciplina militar e ação social direta.
      </>
    ),
    highlight: "O início da maior irmandade do país.",
  },
  {
    year: "2018",
    badge: "Consolidação",
    title: "Expansão Nacional",
    desc: (
      <>
        O Insanos alcança todos os 26 estados brasileiros e o Distrito Federal, estruturando<br className="hidden sm:inline" />{" "}
        diretorias regionais, padronização de conduta e fortalecendo as frentes sociais.
      </>
    ),
    highlight: "Presença em 100% dos estados brasileiros.",
  },
  {
    year: "2021",
    badge: "Travessia de Fronteiras",
    title: "Presença Internacional",
    desc: (
      <>
        Abertura oficial de capítulos na América Latina, Europa e Estados Unidos,<br className="hidden sm:inline" />{" "}
        consolidando a doutrina e a ação beneficente além das fronteiras brasileiras.
      </>
    ),
    highlight: "Mais de 30 países com bandeira Insanos.",
  },
  {
    year: "Hoje",
    badge: "O Maior do Mundo",
    title: "12 Mil Integrantes · 65 Países",
    desc: (
      <>
        Consolidado como a maior força do motociclismo mundial. Mais de 480 facções<br className="hidden sm:inline" />{" "}
        ativas e centenas de toneladas de doações entregues todos os meses.
      </>
    ),
    highlight: "#SomosDeVerdade em escala global.",
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
  const { isPlaying: isPlayingRadio, toggleRadio } = useRadio();
  const [activePillar, setActivePillar] = useState(0);
  const [activePillarHover, setActivePillarHover] = useState<number | null>(0);
  const [activeProject, setActiveProject] = useState("pcd");
  const [activeLeaderTab, setActiveLeaderTab] = useState<"comando" | "memorial">("comando");
  const [activeAdmissionTab, setActiveAdmissionTab] = useState<"direto" | "simulador">("direto");

  // Mouse Ambient Spotlight on Hero
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

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

      // History Progress Line: starts when the first milestone is reached and draws downwards
      gsap.to(".timeline-progress-bar", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 60%",
          end: "bottom 75%",
          scrub: 0.4,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] overflow-x-hidden font-sans">
      <Navbar />


      <main id="conteudo">
        {/* =========================================================================
            CAPÍTULO 01: HERO CINEMATOGRÁFICO COM AMBIENT SPOTLIGHT
        ========================================================================= */}
        <section
          id="inicio"
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          className="hero-section relative min-h-[92vh] flex items-center overflow-hidden border-b border-white/10"
        >
          {/* Cinematic Video Background with Parallax Scale */}
          <div className="hero-parallax-bg absolute inset-0 will-change-transform scale-105 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={ASSETS.heroBg}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            >
              <source src={ASSETS.heroVideo} type="video/webm" />
            </video>
            {/* Cinematic Gradient Overlays for readability and depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/75 to-[#080808]/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/50" />
          </div>

          {/* Dynamic Ambient Headlight / Flashlight Glow */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60"
            style={{
              background: `radial-gradient(circle 450px at ${mousePos.x}% ${mousePos.y}%, rgba(242,194,27,0.12), transparent 70%)`,
            }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 py-20 lg:py-32 w-full">
            <div className="max-w-3xl">
              <div className="hero-stagger flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-[#F2C21B]" />
                <p className="text-xs sm:text-sm uppercase font-extrabold tracking-[0.25em] text-[#F2C21B]">
                  Original de OZ · Desde 2015 · 18 do Forte
                </p>
              </div>

              <h1 className="hero-stagger font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-9xl leading-[1.08] sm:leading-[1.06] tracking-tight text-white mb-6">
                Nosso combustível<br />
                é a <span className="text-[#F2C21B] underline decoration-[#F2C21B]/40 underline-offset-8">irmandade.</span>
              </h1>

              <div className="hero-stagger inline-block mb-8 bg-[#F2C21B] text-black px-4 py-2 font-['Anton'] uppercase text-lg sm:text-2xl tracking-wide shadow-lg transform -skew-x-6">
                Nosso destino é fazer o bem.
              </div>

              <p className="hero-stagger text-base sm:text-xl text-[#C7C5BF] leading-relaxed max-w-2xl mb-10 font-normal">
                O maior motoclube do Brasil e do mundo. Forjados na disciplina,<br className="hidden sm:inline" />{" "}
                lealdade e respeito mútuo. Nas ruas, na estrada ou na ação social: <strong>#SomosDeVerdade</strong>.
              </p>

              <div className="hero-stagger flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  href="/faca-parte"
                  className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider text-lg uppercase rounded shadow-[0_0_30px_rgba(242,194,27,0.35)] transition-colors duration-200 inline-flex items-center gap-3 hover-lift"
                >
                  <span>Faça Parte da Irmandade</span>
                  <span className="font-sans font-extrabold text-xl">↘</span>
                </Link>

                <Link
                  href="/historia"
                  className="px-6 py-4 border border-white/30 hover:border-[#F2C21B] bg-[#121314]/80 text-white hover:text-[#F2C21B] font-bold text-sm uppercase tracking-wider rounded transition-colors duration-200 flex items-center gap-2"
                >
                  <span>Conheça Nossa História</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute right-8 bottom-8 hidden lg:flex flex-col items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#AAA8A1]">
            <span className="writing-mode-vertical">Rolar Para Conhecer</span>
            <span className="text-[#F2C21B] text-lg animate-bounce">↓</span>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 02: ESCALA MUNDIAL & MAPA INTERATIVO DE SEDES
        ========================================================================= */}
        <section id="escala" className="py-24 sm:py-32 bg-[#0C0D0E] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-16" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#F2C21B]" />
                <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  Presença Global & Território
                </p>
              </div>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white mb-6">
                Uma irmandade que<br />
                <span className="text-[#F2C21B]">transforma vidas.</span>
              </h2>
              <p className="text-[#C7C5BF] text-base sm:text-lg leading-relaxed">
                Nascido em Osasco em 2015, o Insanos Moto Clube rompeu fronteiras territoriais e culturais. Hoje somos milhares de irmãos conectados pelo mesmo estatuto,<br className="hidden sm:inline" />{" "}
                disciplina rigorosa e compromisso com o próximo.
              </p>
            </div>

            {/* Interactive Vector Map Hub */}
            <div className="mb-16" data-reveal>
              <InteractiveMap />
            </div>

            {/* Global Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-white/10" data-reveal>
              <div>
                <strong className="block font-['Anton'] text-3xl sm:text-6xl text-[#F2C21B] tracking-[0.06em]">+12.000</strong>
                <span className="text-[11px] sm:text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Integrantes Ativos</span>
              </div>
              <div>
                <strong className="block font-['Anton'] text-3xl sm:text-6xl text-[#F2C21B] tracking-[0.06em]">65</strong>
                <span className="text-[11px] sm:text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Países Presentes</span>
              </div>
              <div>
                <strong className="block font-['Anton'] text-3xl sm:text-6xl text-[#F2C21B] tracking-[0.06em]">+10.000</strong>
                <span className="text-[11px] sm:text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Famílias Atendidas</span>
              </div>
              <div>
                <strong className="block font-['Anton'] text-3xl sm:text-6xl text-[#F2C21B] tracking-[0.06em]">480+</strong>
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
              {/* 4 Interactive Vertical Image Columns (Accordion on hover / Stack on mobile) */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3 h-auto sm:h-[540px]">
                {PILLARS_DATA.map((pillar, idx) => {
                  const isHovered = activePillarHover === idx;
                  return (
                    <div
                      key={pillar.num}
                      onMouseEnter={() => setActivePillarHover(idx)}
                      onClick={() => setActivePillarHover(idx)}
                      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] bg-cover bg-center border min-h-[160px] sm:min-h-0 ${
                        isHovered
                          ? "sm:flex-[2.5] border-[#F2C21B] shadow-[0_0_30px_rgba(242,194,27,0.25)]"
                          : "sm:flex-1 border-white/10 opacity-70 hover:opacity-90"
                      }`}
                      style={{ backgroundImage: `url(${pillar.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                      <div className="absolute bottom-6 left-5 right-5 sm:left-6 sm:right-6">
                        <span className="font-['Anton'] text-4xl sm:text-5xl text-[#F2C21B] block mb-1">
                          {pillar.num}
                        </span>
                        <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white leading-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-xs font-bold uppercase text-[#F2C21B] mb-2">{pillar.subtitle}</p>

                        <div
                          className={`overflow-hidden transition-all duration-400 ease-out ${
                            isHovered
                              ? "max-h-28 opacity-100 translate-y-0"
                              : "max-h-0 opacity-0 translate-y-3 pointer-events-none"
                          }`}
                        >
                          <p className="text-xs sm:text-[13px] text-[#E0DDD8] leading-relaxed max-w-[280px]">
                            {pillar.desc}
                          </p>
                        </div>
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

                <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-white/80 py-2 border-y border-white/10">
                  <span>01 DEUS</span>
                  <span>•</span>
                  <span>02 FAMÍLIA</span>
                  <span>•</span>
                  <span>03 TRABALHO</span>
                  <span>•</span>
                  <span>04 MOTOCLUBE</span>
                </div>

                <div className="inline-block w-fit px-6 py-3.5 rounded-xl bg-[#F2C21B] text-black font-['Anton'] text-lg sm:text-2xl uppercase tracking-wider shadow-lg transform -skew-x-3">
                  "Colete não cria irmão. Atitude cria."
                </div>

                <p className="text-sm text-[#AAA8A1] leading-relaxed">
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
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 04: HISTÓRIA, 18 DO FORTE & ORIGEM EM OSASCO
        ========================================================================= */}
        <section id="historia" className="history-section py-24 sm:py-32 bg-[#0A0A0B] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-20" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#F2C21B]" />
                <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  História & Tradição
                </p>
              </div>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white mb-6">
                Rompendo paradigmas<br />
                <span className="text-[#F2C21B]">desde 2015.</span>
              </h2>
              <p className="text-[#C7C5BF] text-base sm:text-lg leading-relaxed">
                Nossa história foi escrita no asfalto com coragem, união e compromisso irrevogável.<br className="hidden sm:inline" />{" "}
                Da bravura histórica de 1922 à fundação em Osasco<br className="hidden sm:inline" />{" "}
                e à consagração como o maior motoclube do planeta.
              </p>
            </div>

            <div className="timeline-container relative space-y-12 sm:space-y-16">
              {/* Central Background Track Line: starts at center of first circle (28px) and ends at center of last circle */}
              <div className="absolute top-[28px] bottom-[28px] left-3 sm:left-4 w-[2px] bg-white/15 -translate-x-1/2 rounded-full overflow-hidden">
                {/* Animated Yellow GSAP Progress Bar: scales down from first circle */}
                <div className="timeline-progress-bar w-full h-full bg-[#F2C21B] origin-top scale-y-0 shadow-[0_0_12px_rgba(242,194,27,0.9)]" />
              </div>

              {TIMELINE_DATA.map((item, idx) => (
                <div key={item.year} className="relative pl-10 sm:pl-14 group" data-reveal>
                  {/* Timeline Pin Dot: 100% centered on vertical axis */}
                  <div
                    className={`absolute left-3 sm:left-4 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-[#0A0A0B] border-4 border-[#F2C21B] z-10 transition-transform duration-200 ease-out group-hover:scale-110 ${
                      idx === 0
                        ? "shadow-[0_0_20px_rgba(242,194,27,0.9)] ring-2 ring-[#F2C21B]/40 ring-offset-2 ring-offset-[#0A0A0A]"
                        : "shadow-[0_0_12px_rgba(242,194,27,0.5)]"
                    }`}
                  />

                  <div className="bg-[#141517] border border-white/10 hover:border-[#F2C21B]/50 p-6 sm:p-8 rounded-xl transition-colors duration-200 max-w-4xl shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-['Anton'] text-3xl sm:text-4xl text-[#F2C21B]">{item.year}</span>
                        <span className="text-xs uppercase font-extrabold px-3 py-1 bg-white/10 rounded text-white tracking-wider">
                          {item.badge}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#F2C21B] bg-[#F2C21B]/10 px-3 py-1 rounded">
                        {item.highlight}
                      </span>
                    </div>
                    <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white mb-3">{item.title}</h3>
                    <p className="text-sm sm:text-base text-[#AAA8A1] leading-relaxed">{item.desc}</p>
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
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CAPÍTULO 05: AÇÕES SOCIAIS (BENTO GRID ASSIMÉTRICO + TERMÔMETRO)
        ========================================================================= */}
        <section id="impacto" className="py-24 sm:py-32 bg-[#0D0E10] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            {/* Campaign Live Goal Thermometer */}
            <div className="mb-20" data-reveal>
              <CampaignThermometer />
            </div>

            {/* Asymmetric Social Impact Bento Grid */}
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
                    <span>↘</span>
                  </Link>
                </div>
              </div>

              {/* Center Big Card: Projeto PcD */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-[#121316] border border-white/15 shadow-2xl hover-lift">
                <div
                  className="h-80 sm:h-96 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(/images/insanos/impact_pcd.webp)` }}
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
                    Apoiamos e promovemos inclusão, mobilidade<br className="hidden sm:inline" />{" "}
                    e respeito no motociclismo. Porque liberdade<br className="hidden sm:inline" />{" "}
                    também é poder ir e vir sobre duas ou três rodas.
                  </p>
                </div>
              </div>

              {/* Right Stacked 2 Cards: Bonde Pela Vida & Combate Insano */}
              <div className="lg:col-span-3 space-y-6">
                <div className="p-6 rounded-2xl bg-[#121316] border border-white/10 hover:border-[#F2C21B]/50 transition-colors duration-200">
                  <div
                    className="h-32 rounded-xl bg-cover bg-center mb-4"
                    style={{ backgroundImage: `url(/images/insanos/impact_blood.webp)` }}
                  />
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 bg-[#F2C21B] rounded-sm" />
                    <h4 className="font-['Anton'] text-xl uppercase text-white">Bonde Pela Vida</h4>
                  </div>
                  <p className="text-xs text-[#AAA8A1] leading-relaxed">
                    Conscientização no trânsito, doação<br className="hidden sm:inline" />{" "}
                    de sangue e responsabilidade social<br className="hidden sm:inline" />{" "}
                    em todo o país.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#121316] border border-white/10 hover:border-[#F2C21B]/50 transition-colors duration-200">
                  <div
                    className="h-32 rounded-xl bg-cover bg-center mb-4"
                    style={{ backgroundImage: `url(/images/insanos/impact_combat.webp)` }}
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
            CAPÍTULO 06: COMANDO MUNDIAL, FUNDADORES & IN MEMORIAM
        ========================================================================= */}
        <section id="comando" className="py-24 sm:py-32 bg-[#0A0A0A] border-b border-white/10 relative">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-12" data-reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#F2C21B]" />
                <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  Liderança & Legado
                </p>
              </div>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white mb-6">
                Quem carrega a<br />
                <span className="text-[#F2C21B]">história</span> adiante.
              </h2>
              <p className="text-[#C7C5BF] text-base sm:text-lg leading-relaxed">
                Uma organização mundial com hierarquia clara, disciplina<br className="hidden sm:inline" />{" "}
                inegociável e respeito solene àqueles que abriram a estrada.
              </p>
            </div>

            <div className="flex gap-4 mb-10 border-b border-white/10 pb-4" data-reveal>
              <button
                onClick={() => setActiveLeaderTab("comando")}
                className={`pb-2 text-sm sm:text-base font-['Anton'] uppercase tracking-wider transition-colors duration-200 border-b-2 ${
                  activeLeaderTab === "comando"
                    ? "border-[#F2C21B] text-[#F2C21B]"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                Comando Mundial Ativo
              </button>
              <button
                onClick={() => setActiveLeaderTab("memorial")}
                className={`pb-2 text-sm sm:text-base font-['Anton'] uppercase tracking-wider transition-colors duration-200 border-b-2 ${
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
                    className="group relative rounded-2xl bg-[#121316] border border-white/10 hover:border-[#F2C21B]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl hover-lift"
                  >
                    {/* Leader Portrait Image */}
                    <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#0A0A0C]">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/50 to-transparent" />
                      
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
                        <p className="text-xs text-[#C7C5BF] leading-relaxed mb-4">
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
                <div className="p-8 sm:p-12 rounded-2xl bg-[#111215] border border-white/15 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,194,27,0.08),transparent_70%)] pointer-events-none" />
                  <span className="font-['Anton'] text-4xl sm:text-6xl text-[#F2C21B] mb-2 block tracking-tight">
                    HONRA ETERNA
                  </span>
                  <h3 className="font-['Anton'] text-2xl sm:text-4xl uppercase text-white mb-4">
                    Àqueles que abriram a estrada
                  </h3>
                  <p className="text-[#C7C5BF] text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
                    A história do Insanos Moto Clube é sustentada pela coragem dos irmãos pioneiros que ergueram este escudo e daqueles que continuam acelerando na estrada celestial. A memória e o legado de cada irmão jamais serão esquecidos.
                  </p>
                  <div className="inline-block px-6 py-2 rounded-full border border-[#F2C21B]/40 bg-[#F2C21B]/10 text-[#F2C21B] font-mono text-xs uppercase tracking-widest">
                    Insanos Sempre, Sempre Insano · In Memoriam
                  </div>
                </div>

                {/* Memorial Photographic Grid */}
                <div className="grid sm:grid-cols-3 gap-6">
                  {MEMORIAL_MEMBERS.map((mem, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-2xl bg-[#121316] border border-white/10 hover:border-[#F2C21B]/40 transition-all duration-300 overflow-hidden shadow-xl"
                    >
                      <div
                        className="h-56 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-125"
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
                        <span className="text-xs text-[#F2C21B] font-mono uppercase block mb-3 font-bold">
                          {mem.role}
                        </span>
                        <p className="text-xs text-[#AAA8A1] leading-relaxed">
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
              <span className="px-3 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] text-xs font-mono font-bold uppercase tracking-wider block w-fit mb-3">
                (07) Content Hub — Notícias, Eventos e Conteúdos
              </span>
              <h2 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight text-white mb-2">
                18News. A Irmandade<br />
                <span className="text-[#F2C21B]">em Movimento.</span>
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
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/faca-parte"
                    className="px-10 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-lg rounded shadow-xl inline-flex items-center gap-3 transition-colors duration-200 hover-lift"
                  >
                    <span>Acessar Ficha de Cadastro</span>
                    <span>↘</span>
                  </Link>
                  <Link
                    href="/ecossistema"
                    className="px-8 py-4 bg-[#141517] hover:border-[#F2C21B] border border-white/20 text-white font-bold uppercase text-sm rounded transition-colors duration-200"
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
