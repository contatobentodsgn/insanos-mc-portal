"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { RadioBar } from "../components/RadioBar";
import { IconArrowRight } from "../components/ui/Icons";
import { INSTITUTIONAL_METRICS } from "../data/institutional";

const ASSETS = {
  heroBg: "/images/insanos/hero_biker.webp",
  badge: "/images/insanos/insanos_mc_logo.svg",
  roadBg: "/images/insanos/history_today.webp",
};

const TIMELINE_EXPANDED: Array<{
  year: string;
  dateBadge?: string;
  title: string;
  subtitle: string;
  text: React.ReactNode;
  badge: string;
}> = [
  {
    year: "1922",
    dateBadge: "05 de Julho de 1922",
    title: "A Bravura dos 18 do Forte",
    subtitle: "Raiz Simbólica de Resistência & União",
    text: (
      <>
        A referência ao numeral <strong>18</strong> remete ao episódio histórico da Revolta dos 18 do Forte de Copacabana, em julho de 1922. Para o Insanos MC, a memória desse acontecimento simboliza a união e a fidelidade de um grupo que permaneceu leal aos seus companheiros mesmo em momentos de grande adversidade.
      </>
    ),
    badge: "Raiz Histórica",
  },
  {
    year: "2015",
    dateBadge: "03 de Dezembro de 2015",
    title: "Fundação Histórica: Original de OZ",
    subtitle: "Osasco / SP — A Fundação do Motoclube",
    text: (
      <>
        Em <strong>03 de dezembro de 2015</strong>, na cidade de Osasco/SP, um grupo pioneiro de motociclistas experientes liderado por <strong>Jonatas Kiss Feitosa</strong>, <strong>Bugdam Alves Nunes</strong>, <strong>Edson Lopes</strong> e <strong>Bin</strong> decidiu construir uma nova irmandade baseada no respeito à família, na disciplina de estrada, no trabalho digno e na solidariedade à comunidade. Da coragem desse recomeço nasceu a expressão: <em>"Para encarar esse desafio, é preciso ser insano"</em> — dando origem ao nome <strong>Insanos Moto Clube</strong>.
      </>
    ),
    badge: "Marco Zero (03/12/2015)",
  },
  {
    year: "2017",
    dateBadge: "2017",
    title: "Expansão Regional e Primeiras Divisões",
    subtitle: "Do Interior Paulista ao Nordeste",
    text: (
      <>
        Em menos de dois anos, a irmandade ultrapassou a Grande São Paulo. Divisões históricas foram inauguradas em Cotia, ABC, Campinas, Sorocaba, Litoral Sul e Alta Floresta/MT, além da chegada ao Rio Grande do Norte. As ações sociais regulares de arrecadação de alimentos e roupas consolidaram-se como o verdadeiro combustível da entidade.
      </>
    ),
    badge: "Expansão Regional",
  },
  {
    year: "2018",
    dateBadge: "21 de Setembro de 2018",
    title: "Formalização Jurídica & Sede de Osasco",
    subtitle: "Constituição da Associação Civil (CNPJ 32.197.906/0001-34)",
    text: (
      <>
        Em 21 de setembro de 2018, a irmandade formalizou seus atos constitutivos com a fundação jurídica da <strong>Associação de Motociclistas Insanos Moto Clube</strong>, registrando em ata que a entidade já existia de fato desde 03 de dezembro de 2015. Em janeiro de 2019, a Prefeitura de Osasco publicou o Decreto nº 11.931 autorizando o uso da área municipal na Praça Laurindo de Camargo, em Presidente Altino, selando o marco de sede <em>Original de OZ</em>.
      </>
    ),
    badge: "Marco Jurídico & Sede OZ",
  },
  {
    year: "2021",
    dateBadge: "2021 – 2023",
    title: "Travessia de Fronteiras & Bonde Pela Vida",
    subtitle: "Campanhas Mundiais e Presença Internacional",
    text: (
      <>
        A bandeira do Insanos cruzou oceanos com capítulos oficiais em Portugal, Espanha, Estados Unidos, Argentina, Paraguai e diversos outros países. O clube institucionalizou a <strong>Mega Ação Mundial de Doação de Sangue</strong> e o monumental <strong>Bonde Pela Vida</strong> (em apoio ao Setembro Amarelo e à saúde mental), reunindo milhares de motociclistas em comboios organizados com apoio de concessionárias e policiamento rodoviário.
      </>
    ),
    badge: "Internacionalização & Saúde",
  },
  {
    year: "2024",
    dateBadge: "2024",
    title: "Inclusão PcD, 14 Mil Ações & In Memoriam",
    subtitle: "Ninguém Fica Para Trás",
    text: (
      <>
        Consolidação do <strong>Projeto PcD</strong> com o 2º Encontro no Parque da Uva em Jundiaí, adaptando motos e triciclos para pessoas com deficiência. Documentos públicos registram cerca de <strong>14 mil ações sociais</strong> realizadas no ano. Em <strong>09 de novembro de 2024</strong>, o clube prestou homenagem solene e despedida ao cofundador e ícone da Disciplina <strong>Edson Lopes (1965–2024)</strong>, cujo legado permanece vivo em cada divisão.
      </>
    ),
    badge: "Inclusão & Legado",
  },
  {
    year: "2026",
    dateBadge: "Presente",
    title: `Reconhecimento Oficial & ${INSTITUTIONAL_METRICS.countries} Países`,
    subtitle: "Salva de Prata e Presença Global",
    text: (
      <>
        Homenageado pela Câmara Municipal de São Paulo com a <strong>Salva de Prata</strong> por sua relevante atuação humanitária, o Insanos MC reúne mais de {INSTITUTIONAL_METRICS.members} integrantes e presença consolidada em {INSTITUTIONAL_METRICS.countries} países. Uma irmandade unida pelo respeito à família, pela disciplina na estrada e pelo lema de que colete não cria irmão: atitude cria.
      </>
    ),
    badge: "Consolidação Global",
  },
];

export function HistoriaClient() {
  const [selectedMilestone, setSelectedMilestone] = useState(1);

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
                <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C21B] via-[#FFD700] to-[#B88E07] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  Nossa História & Tradição
                </span>
              </div>
              <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6 tracking-[-0.015em] sm:tracking-[-0.02em]">
                Tradição &<br />
                irmandade<br />
                <span className="text-[#F2C21B]">desde 2015.</span>
              </h1>
              <p className="text-base sm:text-xl text-[#D4D1CA] font-medium leading-relaxed">
                Fundado em <strong>3 de dezembro de 2015</strong> em Osasco/SP (Original de OZ), o Insanos MC nasceu da união de motociclistas que buscavam companheirismo na estrada, respeito à família, valorização do trabalho e auxílio ao próximo. Conheça nossa história e documentos oficiais.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Quem começou essa história (Painel Fotográfico & Documental) */}
        <section className="py-24 sm:py-32 bg-[#0C0D0F] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2C21B] shadow-[0_0_8px_#F2C21B]" />
                <span className="text-xs font-mono text-[#F2C21B] uppercase tracking-wider font-bold">
                  Registro Histórico · 03 de Dezembro de 2015
                </span>
              </div>
              <h2 className="font-['Anton'] text-3xl sm:text-5xl lg:text-6xl uppercase text-white mb-4 tracking-[-0.015em]">
                Quem começou essa história
              </h2>
              <p className="text-sm sm:text-base text-[#D4D1CA] font-medium leading-relaxed">
                Em 03 de dezembro de 2015, motociclistas experientes reuniram-se em Osasco/SP para fundar uma irmandade baseada em quatro pilares sagrados: Deus, Família, Trabalho e Motoclube. Conheça as lideranças pioneiras que deram início à nossa caminhada no asfalto:
              </p>
            </div>

            {/* Documentary Historical Foundation Banner */}
            <div className="mb-14 rounded-3xl overflow-hidden border border-white/15 relative group shadow-2xl">
              <div
                className="h-64 sm:h-96 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                style={{ backgroundImage: `url('/images/insanos/memorial_fundadores_oz.webp')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0F] via-[#0C0D0F]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded bg-[#F2C21B] text-black font-mono text-xs font-extrabold uppercase tracking-wider mb-2 inline-block shadow-md">
                    Registro de Fundação
                  </span>
                  <h3 className="font-['Anton'] text-xl sm:text-3xl uppercase text-white drop-shadow-md">
                    O Berço de OZ · Osasco, São Paulo
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E0DDD8] max-w-2xl font-medium drop-shadow-sm">
                    Reunião inaugural que consolidou o estatuto social, o símbolo dos 18 do Forte e o compromisso permanente de fazer o bem.
                  </p>
                </div>
                <div className="shrink-0 text-right font-mono text-xs text-[#F2C21B] bg-black/70 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                  03.12.2015 · Fundação Oficial
                </div>
              </div>
            </div>

            {/* 4 Founders Photographic Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Jonatas Kiss */}
              <div className="bg-[#121316] border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/60 rounded-2xl overflow-hidden transition-all duration-300 group hover-lift shadow-xl flex flex-col justify-between">
                <div>
                  <div
                    className="h-64 bg-cover bg-[center_top] relative transition-transform duration-500 group-hover:scale-105 filter grayscale-[15%] group-hover:grayscale-0"
                    style={{ backgroundImage: `url('/images/insanos/leader_presidencia.webp')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 text-[#F2C21B] font-mono text-[9.5px] font-bold uppercase tracking-wider border border-white/10">
                      Fundador & Presidência
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Anton'] text-2xl uppercase text-white mb-1">Jonatas Kiss Feitosa</h3>
                    <p className="text-xs font-mono text-[#F2C21B] font-bold uppercase mb-3">Presidente Geral</p>
                    <p className="text-xs text-[#D4D1CA] font-medium leading-relaxed">
                      Líder fundador e Presidente da Associação, responsável pela representação institucional, alinhamento estatutário e expansão do motoclube no Brasil e no exterior.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bugdam Alves Nunes */}
              <div className="bg-[#121316] border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/60 rounded-2xl overflow-hidden transition-all duration-300 group hover-lift shadow-xl flex flex-col justify-between">
                <div>
                  <div
                    className="h-64 bg-cover bg-[center_top] relative transition-transform duration-500 group-hover:scale-105 filter grayscale-[15%] group-hover:grayscale-0"
                    style={{ backgroundImage: `url('/images/insanos/leader_executiva.webp')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 text-[#F2C21B] font-mono text-[9.5px] font-bold uppercase tracking-wider border border-white/10">
                      Cofundador & Vice-Presidência
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Anton'] text-2xl uppercase text-white mb-1">Bugdam Alves Nunes</h3>
                    <p className="text-xs font-mono text-[#F2C21B] font-bold uppercase mb-3">Vice-Presidente</p>
                    <p className="text-xs text-[#D4D1CA] font-medium leading-relaxed">
                      Cofundador e Vice-Presidente, liderança executiva central, coordenação regional e idealizador do projeto de inclusão social Combate Insano.
                    </p>
                  </div>
                </div>
              </div>

              {/* Edson Lopes (Memorial) */}
              <div className="bg-[#15161A] border border-t-[#F2C21B]/50 border-b-white/5 border-x-white/15 rounded-2xl overflow-hidden transition-all duration-300 group hover-lift shadow-2xl flex flex-col justify-between relative">
                <div>
                  <div
                    className="h-64 bg-cover bg-[center_top] relative transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-125"
                    style={{ backgroundImage: `url('/images/insanos/memorial_edson_lopes.webp')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#15161A] via-black/40 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/90 text-[#F2C21B] font-mono text-[9.5px] font-bold uppercase tracking-wider border border-[#F2C21B]/40 shadow-lg">
                      Pioneiro · In Memoriam
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Anton'] text-2xl uppercase text-white mb-1">Edson Lopes</h3>
                    <p className="text-xs font-mono text-[#F2C21B] font-bold uppercase mb-3">Honra Eterna</p>
                    <p className="text-xs text-[#D4D1CA] font-medium leading-relaxed">
                      Pilar histórico na consolidação das regras de conduta e segurança nos comboios de estrada, cujo legado de retidão e companheirismo permanece gravado na memória de todos os irmãos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bin */}
              <div className="bg-[#121316] border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/60 rounded-2xl overflow-hidden transition-all duration-300 group hover-lift shadow-xl flex flex-col justify-between">
                <div>
                  <div
                    className="h-64 bg-cover bg-center relative transition-transform duration-500 group-hover:scale-105 filter grayscale-[15%] group-hover:grayscale-0"
                    style={{ backgroundImage: `url('/images/insanos/leader_midia.webp')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 text-[#F2C21B] font-mono text-[9.5px] font-bold uppercase tracking-wider border border-white/10">
                      Cofundador & Identidade
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-['Anton'] text-2xl uppercase text-white mb-1">Bin</h3>
                    <p className="text-xs font-mono text-[#F2C21B] font-bold uppercase mb-3">Identidade & Comunicação</p>
                    <p className="text-xs text-[#D4D1CA] font-medium leading-relaxed">
                      Cofundador e responsável pela criação da simbologia visual do motoclube, padronização dos brasões dos 18 do Forte e comunicação editorial histórica.
                    </p>
                  </div>
                </div>
              </div>
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
                <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-[1.2] mb-6 tracking-[-0.015em]">
                  A Memória e Bravura<br className="hidden sm:inline" /> dos 18 do Forte
                </h2>
                <p className="text-sm sm:text-base text-[#D4D1CA] font-medium leading-relaxed mb-6">
                  O numeral <strong>18</strong> gravado com orgulho em nossos coletes homenageia o episódio histórico consagrado como a Revolta dos 18 do Forte de Copacabana (julho de 1922), quando um grupo em menor número marchou pelo asfalto sem recuar, defendendo seus princípios e a lealdade recíproca.
                </p>
                <p className="text-sm sm:text-base text-[#D4D1CA] font-medium leading-relaxed mb-8">
                  Para o Insanos MC, essa memória sintetiza a nossa própria jornada: <strong>a coragem de um grupo pequeno que, unido pela fé e pela fraternidade, enfrenta forças e desafios muito maiores sem jamais deixar um irmão para trás.</strong>
                </p>
                <div className="p-6 bg-[#17181C] border-l-4 border-[#F2C21B] rounded-r-lg shadow-inner">
                  <p className="font-['Anton'] text-xl uppercase text-white tracking-wide">
                    "Colete não cria irmão. Atitude cria."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-8 sm:p-12 rounded-2xl bg-[#16171B] border border-t-white/20 border-b-white/5 border-x-white/10 border-t-[#F2C21B]/40 text-center shadow-2xl relative min-h-[440px] sm:min-h-[500px] flex flex-col items-center justify-center overflow-hidden group">
                  {/* Subtle Ambient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute w-[300px] h-[300px] rounded-full bg-[#F2C21B]/10 blur-3xl -z-0 pointer-events-none" />

                  {/* 18 do Forte Authentic Distressed Gothic Emblem */}
                  <div className="relative z-10 my-2 flex items-center justify-center">
                    <img
                      src="/images/insanos/18_do_forte_logo.png"
                      alt="18 do Forte — Insanos Moto Clube"
                      width={240}
                      height={330}
                      className="max-h-[260px] sm:max-h-[320px] w-auto object-contain filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.9)] transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="relative z-10 mt-3">
                    <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white mb-2 tracking-wide">
                      O Símbolo do Forte
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D4D1CA] max-w-md mx-auto font-mono">
                      Honra · Lealdade · Disciplina · Bravura no Asfalto · Resistência
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Interactive Detailed Timeline */}
        <section className="py-20 sm:py-32 bg-[#0A0A0B] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C21B] via-[#FFD700] to-[#B88E07] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  Linha do Tempo Documentada
                </span>
                <span className="w-8 h-[2px] bg-gradient-to-r from-[#B88E07] via-[#FFD700] to-[#F2C21B] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
              </div>
              <h2 className="font-['Anton'] uppercase text-3xl sm:text-5xl text-white tracking-[-0.015em]">
                Os Marcos da Nossa Conquista
              </h2>
              <p className="text-xs text-[#D4D1CA] font-medium mt-2 font-mono">
                Marcos históricos cruzados com registros oficiais, atos públicos e atas constitutivas.
              </p>
            </div>

            {/* Timeline Milestones Navigation (Metallic Badge Buttons) */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {TIMELINE_EXPANDED.map((item, idx) => (
                <button
                  key={item.year + item.title}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`px-6 py-3 rounded-xl font-['Anton'] text-base sm:text-xl uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedMilestone === idx
                      ? "bg-gradient-to-b from-[#F2C21B] to-[#D4A50E] text-black shadow-[0_0_20px_rgba(242,194,27,0.4)] border border-[#FFE066] scale-105 font-extrabold"
                      : "bg-[#141517] text-white/70 hover:text-white hover:bg-[#1C1E23] border border-white/10 hover:border-white/20"
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
                <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-2xl bg-[#141518] border border-t-white/25 border-b-white/5 border-x-white/15 border-t-[#F2C21B]/40 shadow-2xl transition-opacity duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-['Anton'] text-5xl text-[#F2C21B] drop-shadow-md">{current.year}</span>
                      {current.dateBadge && (
                        <span className="px-3 py-1 bg-white/10 text-white text-xs font-mono rounded border border-white/10">
                          {current.dateBadge}
                        </span>
                      )}
                      <span className="px-3 py-1 bg-[#F2C21B]/15 text-[#F2C21B] text-xs font-mono font-bold uppercase rounded border border-[#F2C21B]/30">
                        {current.badge}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-['Anton'] text-3xl sm:text-4xl uppercase text-white mb-2">{current.title}</h3>
                  <p className="text-xs uppercase font-bold text-[#F2C21B] tracking-wider mb-6">{current.subtitle}</p>
                  <div className="text-base sm:text-lg text-[#D4D1CA] font-medium leading-relaxed space-y-4">
                    {current.text}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* CTA Bottom */}
        <section className="py-20 bg-gradient-to-r from-[#17181C] via-[#212328] to-[#17181C] text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-8">
            <h2 className="font-['Anton'] uppercase text-3xl sm:text-5xl text-white leading-[1.2] mb-6">
              Escreva os próximos<br className="hidden sm:inline" /> capítulos conosco
            </h2>
            <p className="text-sm sm:text-base text-[#AAA8A1] mb-8">
              A estrada está aberta para homens e mulheres que vivem com honra, disciplina e compromisso com o próximo.
            </p>
            <Link
              href="/faca-parte"
              className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-lg rounded-xl shadow-xl inline-flex items-center gap-2.5 transition-colors duration-200 hover-lift whitespace-nowrap"
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
