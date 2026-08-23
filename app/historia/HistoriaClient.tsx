"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { RadioBar } from "../components/RadioBar";
import { IconArrowRight } from "../components/ui/Icons";

const ASSETS = {
  heroBg: "/images/insanos/hero_biker.webp",
  badge: "/images/insanos/insanos_mc_logo.svg",
  roadBg: "/images/insanos/history_today.webp",
};

const TIMELINE_EXPANDED: Array<{
  year: string;
  title: string;
  subtitle: string;
  text: React.ReactNode;
  badge: string;
}> = [
  {
    year: "1922",
    title: "A Bravura dos 18 do Forte",
    subtitle: "O Símbolo da Lealdade Inabalável",
    text: (
      <>
        Em 5 de julho de 1922, dezoito militares marcharam pela Praia de Copacabana<br className="hidden sm:inline" />{" "}
        dispostos a defender seus ideais mesmo contra forças esmagadoramente superiores.<br className="hidden sm:inline" />{" "}
        Essa coragem lendária, o espírito de sacrifício e a lealdade incondicional inspiraram<br className="hidden sm:inline" />{" "}
        o numeral 18 gravado com orgulho no peito de cada integrante do Insanos MC.
      </>
    ),
    badge: "Raiz Histórica",
  },
  {
    year: "2015",
    title: "Fundação: Original de OZ",
    subtitle: "Osasco / SP — O Berço da Irmandade",
    text: "Um grupo de homens experientes na estrada reuniu-se em Osasco/SP decididos a fundar um motoclube de conduta exemplar. O objetivo era romper com os velhos vícios do meio motociclístico, estabelecendo uma hierarquia rigorosa, quatro pilares claros e uma vocação inegociável para a ajuda humanitária direta.",
    badge: "Marco Zero",
  },
  {
    year: "2018",
    title: "Conquista do Território Nacional",
    subtitle: "Dos 26 Estados ao Distrito Federal",
    text: "Com uma padronização rigorosa de estatuto, conduta em comboio e criação de diretorias regionais, o clube estabeleceu facções em todas as capitais e nas principais cidades do Brasil. As campanhas sociais ganharam escala simultânea nacional.",
    badge: "Expansão Brasil",
  },
  {
    year: "2021",
    title: "Travessia de Fronteiras",
    subtitle: "América Latina, Europa e Estados Unidos",
    text: "A bandeira Insanos cruzou oceanos. Capítulos oficiais foram fundados em Portugal, Espanha, Estados Unidos, Argentina, Paraguai e outros países, levando a mesma doutrina de respeito, trabalho e disciplina a milhares de motociclistas pelo mundo.",
    badge: "Internacionalização",
  },
  {
    year: "2026",
    title: "O Maior Motoclube do Mundo",
    subtitle: "Mais de 12.000 Integrantes em 65 Países",
    text: (
      <>
        Consagrado globalmente como a maior força do motociclismo de conduta.<br className="hidden sm:inline" />{" "}
        Uma organização unida que realiza mensalmente dezenas de expedições<br className="hidden sm:inline" />{" "}
        e arrecada centenas de toneladas de alimentos e milhares de bolsas de sangue.
      </>
    ),
    badge: "Presente & Futuro",
  },
];

export function HistoriaClient() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans">
      <Navbar />

      <main>
        {/* Header Hero */}
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
                  Nossa História & Tradição
                </span>
              </div>
              <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6">
                Rompendo<br />
                paradigmas<br />
                <span className="text-[#F2C21B]">desde 2015.</span>
              </h1>
              <p className="text-base sm:text-xl text-[#C7C5BF] leading-relaxed">
                Nascemos da coragem, da disciplina e da vontade de criar uma<br className="hidden sm:inline" />{" "}
                verdadeira família na estrada. Conheça as origens, os valores<br className="hidden sm:inline" />{" "}
                e a evolução da maior irmandade de motociclistas do planeta.
              </p>
            </div>
          </div>
        </section>

        {/* Section 01: 18 do Forte */}
        <section className="py-20 sm:py-28 bg-[#111215] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-xs font-mono font-bold uppercase text-[#F2C21B] tracking-widest block mb-2">
                  Origem do Símbolo "18"
                </span>
                <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-[1.2] mb-6">
                  A Bravura Histórica<br className="hidden sm:inline" /> dos 18 do Forte
                </h2>
                <p className="text-sm sm:text-base text-[#AAA8A1] leading-relaxed mb-6">
                  O numeral <strong>18</strong> gravado em nossos coletes não é um simples detalhe estético. Ele homenageia o episódio histórico de 1922, onde 18 homens marcharam juntos pelo asfalto de Copacabana sem recuar, leais aos seus princípios até o último suspiro.
                </p>
                <p className="text-sm sm:text-base text-[#AAA8A1] leading-relaxed mb-8">
                  Para o Insanos MC, esse número sintetiza nossa essência: <strong>lealdade inegociável,<br className="hidden sm:inline" />{" "}
                  união na adversidade e a certeza de que nenhum irmão é deixado para trás.</strong>
                </p>
                <div className="p-6 bg-[#17181C] border-l-4 border-[#F2C21B] rounded-r-lg">
                  <p className="font-['Anton'] text-xl uppercase text-white tracking-wide">
                    "Na estrada da vida, o verdadeiro valor de um homem<br className="hidden sm:inline" />{" "}
                    é medido pela sua lealdade aos seus irmãos."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-8 sm:p-12 rounded-2xl bg-[#16171B] border border-white/15 text-center shadow-2xl relative">
                  <span className="font-['Anton'] text-8xl sm:text-9xl text-[#F2C21B] block opacity-80 mb-2">
                    18
                  </span>
                  <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2">O Símbolo do Forte</h3>
                  <p className="text-xs text-[#AAA8A1] max-w-md mx-auto">
                    Honra · Lealdade · Disciplina Militar · Bravura no Asfalto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Interactive Detailed Timeline */}
        <section className="py-20 sm:py-32 bg-[#0A0A0B] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B] block mb-2">
                Linha do Tempo
              </span>
              <h2 className="font-['Anton'] uppercase text-3xl sm:text-5xl text-white">
                Os Marcos da Nossa Conquista
              </h2>
            </div>

            {/* Timeline Milestones Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {TIMELINE_EXPANDED.map((item, idx) => (
                <button
                  key={item.year}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`px-5 py-3 rounded-lg font-['Anton'] text-lg sm:text-xl uppercase tracking-wider transition-colors duration-150 ${
                    selectedMilestone === idx
                      ? "bg-[#F2C21B] text-black shadow-lg"
                      : "bg-[#141517] text-white/70 hover:text-white border border-white/10"
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>

            {/* Selected Milestone Card */}
            {(() => {
              const current = TIMELINE_EXPANDED[selectedMilestone];
              return (
                <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-2xl bg-[#141518] border border-[#F2C21B]/40 shadow-2xl transition-opacity duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-['Anton'] text-5xl text-[#F2C21B]">{current.year}</span>
                      <span className="px-3 py-1 bg-[#F2C21B]/15 text-[#F2C21B] text-xs font-mono font-bold uppercase rounded">
                        {current.badge}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-['Anton'] text-3xl sm:text-4xl uppercase text-white mb-2">{current.title}</h3>
                  <p className="text-xs uppercase font-bold text-[#F2C21B] tracking-wider mb-6">{current.subtitle}</p>
                  <p className="text-base sm:text-lg text-[#C7C5BF] leading-relaxed">{current.text}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* CTA Bottom */}
        <section className="py-20 bg-gradient-to-r from-[#17181C] via-[#212328] to-[#17181C] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-8">
            <h2 className="font-['Anton'] uppercase text-3xl sm:text-5xl text-white leading-[1.2] sm:leading-[1.2] mb-6">
              Escreva os próximos<br className="hidden sm:inline" /> capítulos conosco
            </h2>
            <p className="text-sm sm:text-base text-[#AAA8A1] mb-8">
              A estrada está aberta para homens e mulheres que<br className="hidden sm:inline" /> vivem com honra, disciplina e respeito ao próximo.
            </p>
            <Link
              href="/faca-parte"
              className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-lg rounded shadow-xl inline-flex items-center gap-2.5 transition-colors duration-200 hover-lift whitespace-nowrap"
            >
              <span>Solicitar Ingresso</span>
              <IconArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
