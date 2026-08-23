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
    role: "Presidência Mundial",
    name: "Comando Geral",
    division: "Matriz Original de OZ",
    responsibilities: "Direção geral do clube, representação institucional máxima, preservação da doutrina dos 4 Pilares e comando de expansão global.",
    image: "/images/insanos/leader_presidencia.webp",
  },
  {
    role: "Vice-Presidência Mundial",
    name: "Diretoria Executiva",
    division: "Comando Central",
    responsibilities: "Coordenação executiva das diretorias regionais, supervisão de eventos nacionais e alinhamento de conduta entre os continentes.",
    image: "/images/insanos/leader_executiva.webp",
  },
  {
    role: "Diretoria Geral de Disciplina",
    name: "Conselho de Honra",
    division: "Conselho Geral",
    responsibilities: "Guardiã do estatuto e do regimento interno, julgamento de condutas e garantia da segurança e padronização dos comboios de estrada.",
    image: "/images/insanos/leader_disciplina.webp",
  },
  {
    role: "Diretoria Nacional de Ação Social",
    name: "Diretoria Humanitária",
    division: "Divisão Nacional",
    responsibilities: "Planejamento e execução de campanhas beneficentes, Bonde Pela Vida, Projeto PcD e resposta rápida a calamidades públicas.",
    image: "/images/insanos/leader_social.webp",
  },
  {
    role: "Diretoria de Expansão Internacional",
    name: "Comando Exterior",
    division: "América, Europa & Ásia",
    responsibilities: "Abertura e acompanhamento de novos capítulos fora do território brasileiro, garantindo a uniformidade da hierarquia e da honra.",
    image: "/images/insanos/leader_exterior.webp",
  },
  {
    role: "Diretoria de Comunicação & 18News",
    name: "Núcleo de Mídia",
    division: "Núcleo de Mídia & Rádio",
    responsibilities: "Gestão editorial da revista 18News, podcast 18Cast, Rádio Insanos Web e canais oficiais de distribuição digital.",
    image: "/images/insanos/leader_midia.webp",
  },
  {
    role: "Divisão Nômades",
    name: "Estrada Livre",
    division: "Estrada Permanente",
    responsibilities: "Integrantes veteranos sem capítulo fixo dedicados a rodar continuamente pelo mundo prestando suporte e união a todas as facções.",
    image: "/images/insanos/pillar_04_estrada_motoclube.webp",
  },
  {
    role: "Divisão de Apoio & Famílias",
    name: "Irmandade & Acolhimento",
    division: "Divisão de Famílias",
    responsibilities: "Coordenação de apoio logístico, integração de famílias e liderança em campanhas de acolhimento e assistência a comunidades.",
    image: "/images/insanos/pillar_01_deus_familia.webp",
  },
];

export function ComandoClient() {
  const [activeTab, setActiveTab] = useState<"comando" | "memorial">("comando");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative py-24 sm:py-32 bg-[#0E0F12] border-b border-white/10 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${ASSETS.heroBg})` }}
          />
          <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#F2C21B]" />
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  Liderança, Hierarquia & Tradição
                </span>
              </div>
              <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6">
                Quem carrega a<br />
                <span className="text-[#F2C21B]">história</span> adiante.
              </h1>
              <p className="text-base sm:text-xl text-[#C7C5BF] leading-relaxed">
                A disciplina e a hierarquia são os alicerces que sustentam mais de 12 mil integrantes em 65 países.
                Conheça a estrutura de governança e preste homenagem àqueles que construíram o legado.
              </p>
            </div>
          </div>
        </section>

        {/* Tab Switcher */}
        <section className="py-12 bg-[#111215] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab("comando")}
                className={`pb-3 text-lg sm:text-2xl font-['Anton'] uppercase tracking-wider transition-colors duration-200 border-b-2 ${
                  activeTab === "comando"
                    ? "border-[#F2C21B] text-[#F2C21B]"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                Comando Mundial Ativo (2026)
              </button>
              <button
                onClick={() => setActiveTab("memorial")}
                className={`pb-3 text-lg sm:text-2xl font-['Anton'] uppercase tracking-wider transition-colors duration-200 border-b-2 text-left sm:text-center leading-tight ${
                  activeTab === "memorial"
                    ? "border-[#F2C21B] text-[#F2C21B]"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                Fundadores, Legado<br />
                & In Memoriam
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
                  <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase text-white mb-3">
                    Estrutura de Comando & Governança
                  </h2>
                  <p className="text-sm text-[#AAA8A1]">
                    Cargos diretivos validados pelo conselho mundial para o ciclo 2026.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {COMMAND_ROLES.map((item, idx) => (
                    <div
                      key={idx}
                      className="group relative rounded-2xl bg-[#121316] border border-white/10 hover:border-[#F2C21B]/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl hover-lift"
                    >
                      <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#0A0A0C]">
                        <div
                          className="absolute inset-0 bg-cover bg-[center_top] transition-transform duration-700 group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${item.image})`,
                            backgroundPosition: "center top",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/20 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded bg-black/85 backdrop-blur-md border border-[#F2C21B]/40 text-[#F2C21B] font-mono text-[9px] font-bold uppercase tracking-wider">
                            {item.division}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <span className="text-[10px] font-mono uppercase font-bold text-[#AAA8A1] block mb-1">
                            {item.name}
                          </span>
                          <h3 className="font-['Anton'] text-xl uppercase text-white mb-2 leading-tight group-hover:text-[#F2C21B] transition-colors">
                            {item.role}
                          </h3>
                          <p className="text-xs text-[#C7C5BF] leading-relaxed mb-4">
                            {item.responsibilities}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-white/5 text-[10px] font-mono text-white/40 uppercase">
                          Corpo Diretivo Oficial
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="p-10 sm:p-14 rounded-2xl bg-[#121316] border border-[#F2C21B]/40 text-center shadow-2xl">
                  <span className="font-['Anton'] text-6xl text-[#F2C21B] mb-2 block">IN MEMORIAM</span>
                  <h2 className="font-['Anton'] text-3xl sm:text-4xl uppercase text-white mb-6">
                    Aos Irmãos Que Pilotam na Estrada Celestial
                  </h2>
                  <p className="text-base text-[#C7C5BF] leading-relaxed max-w-2xl mx-auto mb-8">
                    Prestamos tributo e solene gratidão aos irmãos que dedicaram suas vidas à construção, fortalecimento e honra do Insanos Moto Clube. Em especial ao nosso irmão e cofundador <strong>Edson Lopes</strong>, cuja conduta, bravura e espírito de fraternidade permanecem gravados para sempre em nossos corações.
                  </p>
                  <div className="inline-block px-8 py-3 rounded-full border border-[#F2C21B] bg-[#F2C21B]/10 text-[#F2C21B] font-mono text-xs uppercase tracking-widest">
                    "Insanos Sempre, Sempre Insano. Ninguém Fica Para Trás."
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="group rounded-2xl bg-[#121316] border border-white/10 overflow-hidden shadow-xl">
                    <div
                      className="h-60 bg-cover bg-center filter grayscale contrast-125 transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(/images/insanos/memorial_edson_lopes.webp)` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121316] to-transparent" />
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

                  <div className="group rounded-2xl bg-[#121316] border border-white/10 overflow-hidden shadow-xl">
                    <div
                      className="h-60 bg-cover bg-center filter grayscale contrast-125 transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(/images/insanos/memorial_fundadores_oz.webp)` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121316] to-transparent" />
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
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
