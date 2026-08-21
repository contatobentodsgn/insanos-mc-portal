"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { RadioBar } from "../components/RadioBar";
import { CampaignThermometer } from "../components/CampaignThermometer";

const ASSETS = {
  impactBg: "/images/insanos/impact_agasalho.webp",
  pcdBg: "/images/insanos/impact_pcd.webp",
  bloodBg: "/images/insanos/impact_blood.webp",
  boxingBg: "/images/insanos/impact_combat.webp",
};

const PROJECTS = [
  {
    id: "pcd",
    title: "Projeto PcD — Motociclismo Inclusivo",
    tagline: "Acessibilidade, Adaptação e Superação no Asfalto",
    desc: "O Projeto PcD do Insanos MC é pioneiro na adaptação de triciclos e motocicletas para pessoas com deficiência física e amputados. Mais do que adaptar veículos, o projeto devolve a dignidade, o prazer de pilotar em comboio e a certeza de que a estrada pertence a todos.",
    stats: "+450 Triciclos e motos adaptadas em todo o país",
    points: [
      "Adaptações de freio, embreagem e câmbio na mão ou pé adaptado",
      "Acompanhamento técnico de mecânicos experientes",
      "Inclusão integral em todos os comboios e eventos oficiais",
      "Suporte emocional e acolhimento familiar",
    ],
    image: ASSETS.pcdBg,
  },
  {
    id: "bonde",
    title: "Bonde Pela Vida — Doação de Sangue",
    tagline: "Mobilização Nacional de Salvação de Vidas",
    desc: "O Bonde Pela Vida organiza mutirões nacionais e simultâneos de doação de sangue e cadastro de medula óssea. Em datas críticas (como invernos rigorosos e feriados prolongados), centenas de integrantes comparecem em massa aos hemocentros para suprir os estoques públicos.",
    stats: "+25.000 Bolsas de sangue coletadas",
    points: [
      "Parceria com mais de 42 hemocentros estaduais e municipais",
      "Doações regulares a cada 90 dias pelos integrantes",
      "Campanhas emergenciais para atendimento a acidentados e cirurgias",
      "Conscientização da comunidade sobre doação de medula óssea",
    ],
    image: ASSETS.bloodBg,
  },
  {
    id: "combate",
    title: "Combate Insano — Esporte & Cidadania",
    tagline: "Formando Campeões Dentro e Fora dos Tatames",
    desc: "O Combate Insano mantém e patrocina centros de treinamento e oficinas de artes marciais (Jiu-Jitsu, Boxe, Muay Thai e Judô) para crianças e jovens em situação de vulnerabilidade social em periferias e comunidades.",
    stats: "+1.200 Crianças e adolescentes atendidos",
    points: [
      "Aulas gratuitas ministradas por faixas-pretas integrantes do clube",
      "Exigência de frequência escolar e bom rendimento acadêmico",
      "Fornecimento de quimonos, luvas e equipamentos de proteção",
      "Ensino de disciplina, hierarquia, respeito e autocontrole",
    ],
    image: ASSETS.boxingBg,
  },
  {
    id: "comunitario",
    title: "Ação Social Permanente",
    tagline: "Alimento, Agasalho e Dignidade Humanitária",
    desc: "Todas as facções e capítulos do Insanos MC possuem a obrigação estatutária de realizar ações sociais mensais em seus municípios. Atuamos com distribuição direta de cestas básicas, roupas, cobertores no inverno e atendimento rápido em situações de calamidade pública e enchentes.",
    stats: "+420 Toneladas de alimentos e agasalhos entregues",
    points: [
      "Campanha do Agasalho anual com distribuição noturna para pessoas em situação de rua",
      "Natal Solidário e Dia das Crianças com milhares de brinquedos novos",
      "Apoio logístico com motos em áreas atingidas por enchentes e deslizamentos",
      "Transparência absoluta e entrega direta às famílias necessitadas",
    ],
    image: ASSETS.impactBg,
  },
];

export function ImpactoClient() {
  const [activeTab, setActiveTab] = useState("pcd");

  const currentProject = PROJECTS.find((p) => p.id === activeTab) || PROJECTS[0];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans">
      <Navbar />

      <main>
        {/* Header Hero */}
        <section className="relative py-24 sm:py-32 bg-[#0E0F12] border-b border-white/10 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${ASSETS.impactBg})` }}
          />
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#F2C21B]" />
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  Ações Sociais & Propósito
                </span>
              </div>
              <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6">
                <span className="text-[#F2C21B]">Ninguém</span><br />
                fica para trás.
              </h1>
              <p className="text-base sm:text-xl text-[#C7C5BF] leading-relaxed">
                Nosso destino é fazer o bem. O motociclismo é a nossa paixão, mas a ajuda humanitária e a inclusão social são a nossa verdadeira missão perante Deus e a sociedade.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Numbers Transparency Hub */}
        <section className="py-16 bg-[#121316] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <strong className="block font-['Anton'] text-4xl sm:text-6xl text-[#F2C21B] mb-1">+450</strong>
                <span className="text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Motos Adaptadas PcD</span>
              </div>
              <div>
                <strong className="block font-['Anton'] text-4xl sm:text-6xl text-[#F2C21B] mb-1">+25.000</strong>
                <span className="text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Bolsas de Sangue Doadas</span>
              </div>
              <div>
                <strong className="block font-['Anton'] text-4xl sm:text-6xl text-[#F2C21B] mb-1">+420t</strong>
                <span className="text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Alimentos Distribuídos</span>
              </div>
              <div>
                <strong className="block font-['Anton'] text-4xl sm:text-6xl text-[#F2C21B] mb-1">+1.200</strong>
                <span className="text-xs text-[#AAA8A1] uppercase font-bold tracking-wider">Jovens nos Tatames</span>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details & Campaign Thermometer */}
        <section className="py-20 sm:py-32 bg-[#0A0A0B]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-20">
            {/* Live Campaign Thermometer */}
            <div>
              <CampaignThermometer />
            </div>

            {/* Tabs Selector */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B] block mb-2">
                  Projetos Sociais Estruturados
                </span>
                <h2 className="font-['Anton'] uppercase text-3xl sm:text-5xl text-white">
                  Quatro Frentes de Ajuda Humanitária
                </h2>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {PROJECTS.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveTab(proj.id)}
                    className={`px-6 py-3.5 rounded-lg font-['Anton'] text-base sm:text-xl uppercase tracking-wider transition-colors duration-150 ${
                      activeTab === proj.id
                        ? "bg-[#F2C21B] text-black shadow-lg"
                        : "bg-[#141517] text-white/70 hover:text-white border border-white/10"
                    }`}
                  >
                    {proj.title.split("—")[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Project Card Showcase */}
            <div className="max-w-5xl mx-auto bg-[#141519] border border-white/15 rounded-2xl overflow-hidden shadow-2xl transition-opacity duration-300">
              <div
                className="h-64 sm:h-96 bg-cover bg-center relative"
                style={{
                  backgroundImage: `linear-gradient(180deg, transparent 0%, rgba(20,21,25,0.95) 100%), url(${currentProject.image})`,
                }}
              >
                <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded border border-white/20 text-xs font-mono text-[#F2C21B] uppercase">
                  Iniciativa Oficial Insanos MC
                </div>
              </div>

              <div className="p-8 sm:p-14">
                <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-wider block mb-2">
                  {currentProject.tagline}
                </span>
                <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white mb-6">
                  {currentProject.title}
                </h2>
                <p className="text-base sm:text-lg text-[#C7C5BF] leading-relaxed mb-8">
                  {currentProject.desc}
                </p>

                {/* Key Points */}
                <div className="space-y-3 mb-10 p-6 rounded-xl bg-[#0E0F12] border border-white/10">
                  <h4 className="text-xs uppercase font-bold text-[#F2C21B] tracking-wider mb-3">
                    Como atua na prática:
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#AAA8A1]">
                    {currentProject.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#F2C21B] font-bold">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-r from-[#17191E] to-[#121316] border border-[#F2C21B]/30 flex flex-wrap items-center justify-between gap-6">
                  <div>
                    <span className="text-xs text-[#AAA8A1] uppercase font-bold tracking-wider block">
                      Resultado Auditado
                    </span>
                    <strong className="font-['Anton'] text-2xl sm:text-3xl text-[#F2C21B]">
                      {currentProject.stats}
                    </strong>
                  </div>
                  <Link
                    href="/faca-parte"
                    className="px-8 py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-sm rounded shadow-lg transition-colors duration-200 hover-lift"
                  >
                    Quero Participar / Apoiar ↘
                  </Link>
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
