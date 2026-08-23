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
        A referência ao numeral <strong>18</strong> remete ao episódio histórico consagrado como a Revolta dos 18 do Forte de Copacabana, em julho de 1922. Para o Insanos MC, a memória desse acontecimento simboliza a decisão inegociável de um grupo em desvantagem numérica de permanecer unido, leal e firme em seus valores diante de adversidades muito superiores.
      </>
    ),
    badge: "Raiz Histórica",
  },
  {
    year: "2015",
    dateBadge: "03 de Dezembro de 2015",
    title: "Fundação Histórica: Original de OZ",
    subtitle: "Osasco / SP — A Decisão Que Rompeu Paradigmas",
    text: (
      <>
        Em <strong>03 de dezembro de 2015</strong>, na cidade de Osasco/SP, um grupo pioneiro de motociclistas experientes liderado por <strong>Jonatas Kiss Feitosa</strong>, <strong>Bugdam Alves Nunes</strong>, <strong>Edson Lopes</strong> e <strong>Bin</strong> rompeu com um motoclube anterior para construir uma nova irmandade pautada no respeito à família, hierarquia militar, trabalho honrado e ação social permanente. Da bravura de encarar esse recomeço nasceu a máxima institucional: <em>"Para encarar isso, é preciso ser insano"</em> — batizando o <strong>Insanos Moto Clube</strong>.
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
    title: "Reconhecimento Oficial & Mais de 70 Países",
    subtitle: "Salva de Prata e Presença Global",
    text: (
      <>
        Homenageado pela Câmara Municipal de São Paulo com a <strong>Salva de Prata</strong> por sua extraordinária contribuição humanitária, o Insanos MC reúne dezenas de milhares de integrantes e presença consolidada em mais de 70 países. Uma só irmandade movida pela disciplina, pela família e pela certeza inabalável de que colete não cria irmão: atitude cria.
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
                Nascido em <strong>3 de dezembro de 2015</strong> em Osasco/SP (Original de OZ), o Insanos MC surgiu da união de homens com disciplina militar, lealdade inegociável e uma vocação inabalável para fazer o bem. Conheça a história documentada da maior irmandade do planeta.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Fundadores Históricos */}
        <section className="py-20 bg-[#0C0D0F] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl mb-12">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2C21B]" />
                <span className="text-xs font-mono text-[#F2C21B] uppercase tracking-wider font-bold">
                  Núcleo de Fundação (03/12/2015)
                </span>
              </div>
              <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white mb-4">
                Os Pioneiros do Asfalto
              </h2>
              <p className="text-sm sm:text-base text-[#AAA8A1] leading-relaxed">
                A história do Insanos MC foi forjada pela coragem de romper paradigmas. Liderados por um núcleo histórico de comando, estes pioneiros estabeleceram os alicerces de honra, conduta e fraternidade que hoje unem milhares de irmãos em mais de 70 países.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#141518] border border-white/10 hover:border-[#F2C21B]/50 transition-all">
                <span className="text-[10px] font-mono text-[#F2C21B] uppercase tracking-wider block mb-1">
                  Fundador & Presidente Mundial
                </span>
                <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2">Jonatas Kiss Feitosa</h3>
                <p className="text-xs text-[#AAA8A1] leading-relaxed">
                  Líder fundador e Presidente da Associação, responsável pelo comando institucional, direcionamento doutrinário e expansão global do motoclube.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#141518] border border-white/10 hover:border-[#F2C21B]/50 transition-all">
                <span className="text-[10px] font-mono text-[#F2C21B] uppercase tracking-wider block mb-1">
                  Fundador & Vice-Presidente Mundial
                </span>
                <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2">Bugdam Alves Nunes</h3>
                <p className="text-xs text-[#AAA8A1] leading-relaxed">
                  Cofundador e Vice-Presidente, liderança executiva central, interlocutor institucional e idealizador do projeto social Combate Insano.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#141518] border border-[#F2C21B]/30 bg-[#17181D]">
                <span className="text-[10px] font-mono text-[#F2C21B] uppercase tracking-wider block mb-1 font-bold">
                  Fundador · In Memoriam (1965–2024)
                </span>
                <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2">Edson Lopes</h3>
                <p className="text-xs text-[#AAA8A1] leading-relaxed">
                  Pilar histórico e eterno Diretor de Disciplina, estabeleceu as normas de conduta e segurança que balizam o regimento interno do motoclube.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#141518] border border-white/10 hover:border-[#F2C21B]/50 transition-all">
                <span className="text-[10px] font-mono text-[#F2C21B] uppercase tracking-wider block mb-1">
                  Fundador & Identidade Visual
                </span>
                <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2">Bin</h3>
                <p className="text-xs text-[#AAA8A1] leading-relaxed">
                  Cofundador e responsável histórico pela criação da simbologia, brasões, padronização visual e comunicação do Insanos MC.
                </p>
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
                <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-[1.2] mb-6">
                  A Memória e Bravura<br className="hidden sm:inline" /> dos 18 do Forte
                </h2>
                <p className="text-sm sm:text-base text-[#AAA8A1] leading-relaxed mb-6">
                  O numeral <strong>18</strong> gravado com orgulho em nossos coletes homenageia o episódio histórico consagrado como a Revolta dos 18 do Forte de Copacabana (julho de 1922), quando um grupo em menor número marchou pelo asfalto sem recuar, defendendo seus princípios e a lealdade recíproca.
                </p>
                <p className="text-sm sm:text-base text-[#AAA8A1] leading-relaxed mb-8">
                  Para o Insanos MC, essa memória sintetiza a nossa própria jornada: <strong>a coragem de um grupo pequeno que, unido pela fé e pela fraternidade, enfrenta forças e desafios muito maiores sem jamais deixar um irmão para trás.</strong>
                </p>
                <div className="p-6 bg-[#17181C] border-l-4 border-[#F2C21B] rounded-r-lg">
                  <p className="font-['Anton'] text-xl uppercase text-white tracking-wide">
                    "Colete não cria irmão. Atitude cria."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-8 sm:p-12 rounded-2xl bg-[#16171B] border border-[#F2C21B]/30 text-center shadow-2xl relative min-h-[440px] sm:min-h-[500px] flex flex-col items-center justify-center overflow-hidden group">
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
                    <p className="text-xs sm:text-sm text-[#AAA8A1] max-w-md mx-auto font-mono">
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
              <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B] block mb-2">
                Linha do Tempo Documentada
              </span>
              <h2 className="font-['Anton'] uppercase text-3xl sm:text-5xl text-white">
                Os Marcos da Nossa Conquista
              </h2>
              <p className="text-xs text-[#AAA8A1] mt-2 font-mono">
                Marcos históricos cruzados com registros oficiais, atos públicos e atas constitutivas.
              </p>
            </div>

            {/* Timeline Milestones Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {TIMELINE_EXPANDED.map((item, idx) => (
                <button
                  key={item.year + item.title}
                  onClick={() => setSelectedMilestone(idx)}
                  className={`px-5 py-3 rounded-lg font-['Anton'] text-base sm:text-lg uppercase tracking-wider transition-colors duration-150 ${
                    selectedMilestone === idx
                      ? "bg-[#F2C21B] text-black shadow-lg font-extrabold"
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
                      {current.dateBadge && (
                        <span className="px-3 py-1 bg-white/10 text-white text-xs font-mono rounded border border-white/10">
                          {current.dateBadge}
                        </span>
                      )}
                      <span className="px-3 py-1 bg-[#F2C21B]/15 text-[#F2C21B] text-xs font-mono font-bold uppercase rounded">
                        {current.badge}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-['Anton'] text-3xl sm:text-4xl uppercase text-white mb-2">{current.title}</h3>
                  <p className="text-xs uppercase font-bold text-[#F2C21B] tracking-wider mb-6">{current.subtitle}</p>
                  <div className="text-base sm:text-lg text-[#C7C5BF] leading-relaxed space-y-4">
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
