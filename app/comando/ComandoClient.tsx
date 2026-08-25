"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { RadioBar } from "../components/RadioBar";

const ASSETS = {
  heroBg: "/images/insanos/hero_biker.webp",
  badge: "/images/insanos/insanos_mc_logo.svg",
};

const COMMAND_ROLES = [
  {
    name: "Jonatas Kiss",
    role: "Presidente Mundial",
    division: "Original de OZ · Fundação 2015",
    responsibilities: "Líder fundador e Presidente da Associação. Direção geral, representação institucional, preservação dos 4 Pilares e coordenação da expansão internacional.",
    image: "/images/insanos/leader_presidencia.webp",
    founder: true,
  },
  {
    name: "Bugdam Nunes · Bug",
    role: "Vice-Presidente",
    division: "Comando Central",
    responsibilities: "Cofundador e Vice-Presidente. Coordenação executiva das diretorias regionais, supervisão de eventos nacionais e alinhamento de conduta entre os continentes.",
    image: "/images/insanos/leader_executiva.webp",
    founder: true,
  },
  {
    name: "Diego Faster",
    role: "Social Mundial",
    division: "Divisão Nacional",
    responsibilities: "Planejamento e execução de campanhas beneficentes, Bonde Pela Vida, Projeto PcD e resposta rápida a calamidades públicas em todo o território.",
    image: "/images/insanos/leader_social.webp",
    founder: false,
  },
  {
    name: "Bin",
    role: "Comunicação Mundial",
    division: "Núcleo de Mídia",
    responsibilities: "Cofundador. Gestão editorial da 18News, podcast 18Cast, Rádio Insanos Web, padronização visual e canais oficiais de distribuição digital.",
    image: "/images/insanos/leader_midia.webp",
    founder: true,
  },
  {
    name: "Monge",
    role: "Disciplina Mundial",
    division: "Comando Mundial",
    responsibilities: "Garantia do cumprimento do estatuto e regimento interno, conduta em comboio, mediação de assuntos éticos e orientação de segurança nas estradas.",
    image: "/images/insanos/leader_monge.png",
    founder: false,
  },
  {
    name: "Kefir",
    role: "Disciplina Mundial",
    division: "Comando Mundial",
    responsibilities: "Acompanhamento do estatuto, supervisão de conduta nos capítulos e apoio à segurança nos comboios e eventos oficiais em território nacional e internacional.",
    image: "/images/insanos/leader_kefir.png",
    founder: false,
  },
  {
    name: "Jonas",
    role: "Financeiro Mundial",
    division: "Comando Mundial",
    responsibilities: "Administração financeira da associação, gestão de recursos para campanhas sociais, transparência contábil e planejamento orçamentário dos capítulos.",
    image: "/images/insanos/leader_jonas.png",
    founder: false,
  },
  {
    name: "Baptista",
    role: "Expansão Mundial",
    division: "América, Europa & Ásia",
    responsibilities: "Abertura e acompanhamento de novos capítulos fora do território brasileiro, integrando novos integrantes às diretrizes e cultura do clube.",
    image: "/images/insanos/leader_baptista.png",
    founder: false,
  },
  {
    name: "Roney",
    role: "Operacional Mundial",
    division: "Comando Mundial",
    responsibilities: "Logística operacional de comboios, eventos, estrutura de segurança em rodovias e coordenação de equipes de apoio em todo o território.",
    image: "/images/insanos/leader_roney.png",
    founder: false,
  },
];

export function ComandoClient() {
  const [activeTab, setActiveTab] = useState<"comando" | "memorial">("comando");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans">
      <Navbar />

      <main id="conteudo">
        {/* Hero */}
        <section className="relative py-24 sm:py-32 bg-[#0E0F12] border-b border-white/10 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${ASSETS.heroBg})` }}
          />
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C21B] via-[#FFD700] to-[#B88E07] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  Liderança, Hierarquia & Tradição
                </span>
              </div>
              <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6 tracking-[-0.015em] sm:tracking-[-0.02em]">
                Quem carrega a<br />
                <span className="text-[#F2C21B]">história</span> adiante.
              </h1>
              <p className="text-base sm:text-xl text-[#D4D1CA] font-medium leading-relaxed">
                Conheça os responsáveis pela administração, representação<br className="hidden sm:inline" />{" "}
                e coordenação dos capítulos no Brasil e no exterior.
              </p>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <section className="py-12 bg-[#111215] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex gap-6" role="group" aria-label="Selecione o painel de liderança">
              <button
                onClick={() => setActiveTab("comando")}
                aria-pressed={activeTab === "comando"}
                className={`pb-3 text-lg sm:text-2xl font-['Anton'] uppercase tracking-wider transition-colors duration-200 border-b-2 text-left sm:text-center whitespace-nowrap cursor-pointer ${
                  activeTab === "comando"
                    ? "border-[#F2C21B] text-[#F2C21B]"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                Comando Mundial Ativo (2026)
              </button>
              <button
                onClick={() => setActiveTab("memorial")}
                aria-pressed={activeTab === "memorial"}
                className={`pb-3 text-lg sm:text-2xl font-['Anton'] uppercase tracking-wider transition-colors duration-200 border-b-2 text-left sm:text-center whitespace-normal sm:whitespace-nowrap cursor-pointer ${
                  activeTab === "memorial"
                    ? "border-[#F2C21B] text-[#F2C21B]"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                Fundadores, Legado & In Memoriam
              </button>
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-20 sm:py-28 bg-[#0A0A0B]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            {activeTab === "comando" ? (
              <div className="transition-opacity duration-300">
                <div className="max-w-2xl mb-12">
                  <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase text-white mb-3 tracking-[-0.015em]">
                    Estrutura de Comando & Governança
                  </h2>
                  <p className="text-sm text-[#D4D1CA] font-medium">
                    Cargos diretivos validados pelo conselho mundial para o ciclo 2026.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {COMMAND_ROLES.map((item, idx) => (
                    <div
                      key={idx}
                      className={`group relative rounded-[2px] bg-[#121316] border-2 overflow-hidden flex flex-col justify-between shadow-2xl hover-lift transition-all duration-300 ${
                        item.founder
                          ? "border-t-[#F2C21B]/50 border-b-white/5 border-x-[#F2C21B]/20 hover:border-[#F2C21B]/80 hover:shadow-[0_0_40px_rgba(242,194,27,0.25)]"
                          : "border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/70 hover:shadow-[0_0_35px_rgba(242,194,27,0.2)]"
                      }`}
                    >
                      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#0A0A0C]">
                        <div
                          className="absolute inset-0 bg-cover bg-[center_top] filter grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                          style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundPosition: "center top",
                            backgroundSize: "cover",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/15 to-transparent opacity-80" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-[2px] bg-black/85 backdrop-blur-md border border-[#F2C21B]/40 text-[#F2C21B] font-mono text-[10px] font-bold uppercase tracking-wider">
                            {item.division}
                          </span>
                        </div>

                        {/* Founder Badge */}
                        {item.founder && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2.5 py-1 rounded-[2px] bg-[#F2C21B] text-black font-mono text-[10px] font-extrabold uppercase tracking-wider shadow-[0_0_12px_rgba(242,194,27,0.5)]">
                              ★ Fundador
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-['Anton'] text-xl sm:text-2xl uppercase text-white mb-0.5 leading-tight group-hover:text-[#F2C21B] transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-xs font-mono uppercase font-bold text-[#F2C21B] block mb-2">
                            {item.role}
                          </span>
                          <p className="text-xs text-[#D4D1CA] font-medium leading-relaxed mb-3">
                            {item.responsibilities}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-white/5 text-xs font-mono text-white/40 uppercase flex items-center justify-between">
                          <span>Corpo Diretivo Oficial</span>
                          <span className="text-[#F2C21B] font-bold text-[10px]">Comando Mundial</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="p-10 sm:p-14 rounded-[2px] bg-[#121316] border-2 border-[#F2C21B]/40 text-center shadow-2xl">
                  <span className="font-['Anton'] text-6xl text-[#F2C21B] mb-2 block">IN MEMORIAM</span>
                  <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase text-white mb-6">
                    Aos Irmãos Que Pilotam na Estrada Celestial
                  </h2>
                  <p className="text-base text-[#C7C5BF] leading-relaxed max-w-2xl mx-auto mb-8">
                    Prestamos tributo e solene gratidão aos irmãos que dedicaram suas vidas à construção, fortalecimento e honra do Insanos Moto Clube. Em especial ao nosso irmão e cofundador <strong>Edson Lopes</strong>, cuja conduta, bravura e espírito de fraternidade permanecem gravados para sempre em nossos corações.
                  </p>
                  <div className="inline-block px-8 py-3 rounded-[2px] border border-[#F2C21B] bg-[#F2C21B]/10 text-[#F2C21B] font-mono text-xs uppercase tracking-widest">
                    "Insanos Sempre, Sempre Insano. Ninguém Fica Para Trás."
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="group rounded-[2px] bg-[#121316] border-2 border-white/10 hover:border-[#F2C21B]/40 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between">
                    <div>
                      <div
                        className="h-72 sm:h-80 bg-cover bg-[center_top] filter grayscale contrast-125 transition-transform duration-500 group-hover:scale-105 relative"
                        style={{ backgroundImage: `url(/images/insanos/memorial_edson_lopes.webp)` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent" />
                      </div>
                      <div className="p-8">
                        <span className="text-xs font-mono text-[#F2C21B] uppercase tracking-wider block mb-2 font-bold">
                          Homenagem Solene
                        </span>
                        <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2">Edson Lopes</h3>
                        <p className="text-xs text-[#F2C21B] uppercase font-bold mb-3 font-mono">Fundador & Ícone da Disciplina (1965 – 09/11/2024)</p>
                        <p className="text-sm text-[#AAA8A1] leading-relaxed">
                          Líder exemplar cuja integridade moldou o regimento de disciplina e conduta do clube desde a fundação em 2015. Seu legado continuará guiando cada comboio pelo mundo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group rounded-[2px] bg-[#121316] border-2 border-white/10 hover:border-[#F2C21B]/40 transition-all duration-300 overflow-hidden shadow-xl flex flex-col justify-between">
                    <div>
                      <div
                        className="h-72 sm:h-80 bg-cover bg-[center_top] filter grayscale contrast-125 transition-transform duration-500 group-hover:scale-105 relative"
                        style={{ backgroundImage: `url(/images/insanos/memorial_fundadores_oz.webp)` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent" />
                      </div>
                      <div className="p-8">
                        <span className="text-xs font-mono text-[#F2C21B] uppercase tracking-wider block mb-2 font-bold">
                          Pioneirismo & Coragem
                        </span>
                        <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2">Os Fundadores de 2015</h3>
                        <p className="text-xs text-[#F2C21B] uppercase font-bold mb-3 font-mono">Original de OZ — 03 de Dezembro de 2015</p>
                        <p className="text-sm text-[#AAA8A1] leading-relaxed">
                          Aos pioneiros liderados por Jonatas Kiss Feitosa, Bugdam Alves Nunes, Edson Lopes e Bin, que tiveram a coragem de romper paradigmas e fundar em Osasco uma nova história de fraternidade e caridade.
                        </p>
                      </div>
                    </div>
                  </div>
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
