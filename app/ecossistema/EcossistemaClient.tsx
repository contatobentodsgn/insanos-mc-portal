"use client";

import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { IconShop, IconRadio, IconShield } from "../components/ui/Icons";
import { useRadio } from "../context/RadioContext";
import { PodcastFeed18Cast } from "../components/PodcastFeed18Cast";

const ASSETS = {
  storeBg: "/images/insanos/store_merch_official.webp",
  radioBg: "/images/insanos/radio_insanos_live.webp",
};

export function EcossistemaClient() {
  const { isPlaying: isPlayingRadio, toggleRadio } = useRadio();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans">
      <Navbar />

      <main id="conteudo">
        {/* Page Hero */}
        <section className="py-20 sm:py-28 bg-[#111215] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#F2C21B]" />
              <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                Universo Integrado Insanos
              </p>
            </div>
            <h1 className="font-['Anton'] uppercase text-4xl sm:text-7xl text-white mb-6 leading-tight tracking-[-0.015em] sm:tracking-[-0.02em]">
              Nosso <span className="text-[#F2C21B]">Ecossistema.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#D4D1CA] font-medium max-w-2xl leading-relaxed">
              Mais do que um motoclube: uma rede integrada de produtos oficiais, comunicação independente, apoio e proteção para o motociclista na estrada.
            </p>
          </div>
        </section>

        {/* Ecosystem Hub Grid */}
        <section className="py-20 sm:py-32 bg-[#0A0A0B]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
            {/* 01. 18 Store */}
            <div className="grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-14 rounded-[2px] bg-[#131417] border-2 border-t-white/25 border-b-white/5 border-x-white/15 shadow-2xl overflow-hidden">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#F2C21B]/15 text-[#F2C21B] font-mono text-xs uppercase font-bold tracking-wider border border-[#F2C21B]/30">
                  <IconShop className="w-4 h-4 text-[#F2C21B]" />
                  <span>Loja Oficial</span>
                </div>
                <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-tight tracking-[-0.015em]">
                  18 Store — Wear The Story
                </h2>
                <p className="text-sm sm:text-base text-[#D4D1CA] font-medium leading-relaxed">
                  Camisetas exclusivas, bonés oficiais, jaquetas de couro de alta densidade, acessórios e artigos comemorativos. Vista a identidade oficial com a máxima qualidade e durabilidade.
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.18store.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-base rounded-[2px] border-2 border-[#F2C21B] shadow-lg transition-colors duration-200 hover-lift inline-flex items-center gap-3 cursor-pointer"
                  >
                    <span>Acessar 18Store.com.br</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div
                  className="h-72 sm:h-96 rounded-[2px] bg-cover bg-center border border-white/10 shadow-2xl relative overflow-hidden group"
                  style={{ backgroundImage: `url(${ASSETS.storeBg})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <span className="font-['Anton'] text-2xl uppercase text-white">Coleção Oficial 2026</span>
                    <span className="px-3 py-1 rounded-[2px] bg-[#F2C21B] text-black font-mono text-xs font-bold uppercase">100% Original</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 02. Rádio Insanos */}
            <div className="grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-14 rounded-[2px] bg-gradient-to-r from-[#17191E] via-[#22262E] to-[#17191E] border-2 border-[#F2C21B]/40 shadow-2xl">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#F2C21B]/20 text-[#F2C21B] font-mono text-xs uppercase font-bold tracking-wider border border-[#F2C21B]/30">
                  <IconRadio className="w-4 h-4 text-[#F2C21B]" />
                  <span>Transmissão 24h</span>
                </div>
                <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-tight">
                  Rádio Insanos Web
                </h2>
                <p className="text-sm sm:text-base text-[#C7C5BF] leading-relaxed">
                  A trilha sonora do asfalto: clássicos do rock, heavy metal, blues de estrada, boletins e informes para quem vive sobre duas rodas.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={toggleRadio}
                    className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-base rounded-[2px] border-2 border-[#F2C21B] shadow-lg transition-colors duration-200 hover-lift flex items-center gap-3 cursor-pointer"
                  >
                    <span>{isPlayingRadio ? "Pausar Rádio" : "Ouvir Rádio Ao Vivo"}</span>
                    <span>{isPlayingRadio ? "⏸" : "▶"}</span>
                  </button>
                  <a
                    href="https://stream.radioparadise.com/rock-128"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-4 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase rounded-[2px] border border-white/20 inline-flex items-center gap-2"
                  >
                    <span>Abrir Stream Direto</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div
                  className="h-44 rounded-[2px] bg-cover bg-center border border-white/10 relative overflow-hidden"
                  style={{ backgroundImage: `url(${ASSETS.radioBg})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-none bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-white uppercase">Estúdio de Transmissão Online</span>
                  </div>
                </div>
                <div className="p-4 rounded-[2px] bg-[#0E0F12] border border-white/10">
                  <h4 className="font-['Anton'] text-sm uppercase text-[#F2C21B] mb-2">Programação Destaque:</h4>
                  <ul className="text-xs text-[#AAA8A1] space-y-2">
                    <li className="flex justify-between border-b border-white/5 pb-1">
                      <span className="font-bold text-white">Madrugada do Asfalto</span>
                      <span className="text-[#F2C21B]">00h – 06h</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-1">
                      <span className="font-bold text-white">Rock & Rota 18</span>
                      <span className="text-[#F2C21B]">12h – 14h</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 03. 18Cast — Feed de Episódios Recentes com Player Interativo */}
            <PodcastFeed18Cast />

            {/* 04. ALAMO Associação */}
            <div className="grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-14 rounded-[2px] bg-[#131417] border-2 border-t-white/20 border-b-white/5 border-x-white/10 shadow-2xl overflow-hidden">
              <div className="lg:col-span-8 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#F2C21B]/15 text-[#F2C21B] font-mono text-xs uppercase font-bold tracking-wider border border-[#F2C21B]/30">
                  <IconShield className="w-4 h-4 text-[#F2C21B]" />
                  <span>Associação Parceira</span>
                </div>
                <h3 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-tight tracking-[-0.015em]">
                  Associação ÁLAMO — Proteção & Apoio ao Motociclista
                </h3>
                <p className="text-sm sm:text-base text-[#D4D1CA] font-medium leading-relaxed max-w-3xl">
                  Conheça a associação parceira e consulte os planos de proteção veicular, serviços de assistência 24h e benefícios mútuos disponíveis para motociclistas de todo o país.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="https://alamo.org.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-base rounded-[2px] border-2 border-[#F2C21B] shadow-lg transition-colors duration-200 hover-lift inline-flex items-center gap-3 cursor-pointer"
                  >
                    <span>Consultar Condições na ÁLAMO</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-[2px] bg-[#0E1014] border border-white/10 space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-[#F2C21B] block">
                  Serviços & Assistência:
                </span>
                <ul className="text-xs text-[#D4D1CA] space-y-2.5 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="text-[#F2C21B]">✓</span>
                    <span>Assistência e socorro 24h em rodovias</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F2C21B]">✓</span>
                    <span>Condições especiais para motociclistas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F2C21B]">✓</span>
                    <span>Apoio e suporte em viagens</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F2C21B]">✓</span>
                    <span>Atendimento consultivo direto na associação</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
