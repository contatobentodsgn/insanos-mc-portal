"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { RadioBar } from "../components/RadioBar";
import { IconShop, IconRadio, IconPodcast, IconShield } from "../components/ui/Icons";

const ASSETS = {
  storeBg: "/images/insanos/store_merch_official.webp",
  radioBg: "/images/insanos/radio_insanos_live.webp",
  podcastBg: "/images/insanos/podcast_18cast_studio.webp",
};

export function EcossistemaClient() {
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans">
      <Navbar isPlayingRadio={isPlayingRadio} onToggleRadio={() => setIsPlayingRadio(!isPlayingRadio)} />
      <RadioBar isPlaying={isPlayingRadio} onClose={() => setIsPlayingRadio(false)} />

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
            <h1 className="font-['Anton'] uppercase text-4xl sm:text-7xl text-white mb-6 leading-tight">
              Nosso <span className="text-[#F2C21B]">Ecossistema.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#C7C5BF] max-w-2xl leading-relaxed">
              Mais do que um motoclube: uma rede completa de produtos oficiais, comunicação independente, apoio e proteção para o motociclista.
            </p>
          </div>
        </section>

        {/* Ecosystem Hub Grid */}
        <section className="py-20 sm:py-32 bg-[#0A0A0B]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-16">
            {/* 01. 18 Store */}
            <div className="grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-14 rounded-2xl bg-[#131417] border border-white/15 shadow-2xl overflow-hidden">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] font-mono text-xs uppercase font-bold tracking-wider">
                  <IconShop className="w-4 h-4 text-[#F2C21B]" />
                  <span>Loja Oficial</span>
                </div>
                <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-tight">
                  18 Store — Wear The Story
                </h2>
                <p className="text-sm sm:text-base text-[#AAA8A1] leading-relaxed">
                  Camisetas exclusivas, bonés oficiais, jaquetas de couro de alta densidade, acessórios e artigos comemorativos de 10 anos de história. Vista a identidade oficial com a máxima qualidade e durabilidade.
                </p>
                <div className="pt-2">
                  <a
                    href="https://www.18store.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-base rounded shadow-lg transition-colors duration-200 hover-lift inline-flex items-center gap-3"
                  >
                    <span>Acessar 18Store.com.br</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div
                  className="h-72 sm:h-96 rounded-xl bg-cover bg-center border border-white/10 shadow-2xl relative overflow-hidden group"
                  style={{ backgroundImage: `url(${ASSETS.storeBg})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <span className="font-['Anton'] text-2xl uppercase text-white">Coleção Oficial 2026</span>
                    <span className="px-3 py-1 rounded bg-[#F2C21B] text-black font-mono text-xs font-bold uppercase">100% Original</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 02. Rádio Insanos */}
            <div className="grid lg:grid-cols-12 gap-8 items-center p-8 sm:p-14 rounded-2xl bg-gradient-to-r from-[#17191E] via-[#22262E] to-[#17191E] border border-[#F2C21B]/40 shadow-2xl">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F2C21B]/20 text-[#F2C21B] font-mono text-xs uppercase font-bold tracking-wider">
                  <IconRadio className="w-4 h-4 text-[#F2C21B]" />
                  <span>Transmissão 24h</span>
                </div>
                <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-tight">
                  Rádio Insanos Web
                </h2>
                <p className="text-sm sm:text-base text-[#C7C5BF] leading-relaxed">
                  A trilha sonora do asfalto: clássicos do rock, heavy metal, blues de estrada, informes de trânsito em tempo real, comunicados oficiais e boletins de expedições mundiais.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsPlayingRadio(!isPlayingRadio)}
                    className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-base rounded shadow-lg transition-colors duration-200 hover-lift flex items-center gap-3"
                  >
                    <span>{isPlayingRadio ? "Pausar Rádio" : "Ouvir Ao Vivo Agora"}</span>
                    <span>{isPlayingRadio ? "⏸" : "▶"}</span>
                  </button>
                  <span className="text-xs font-mono text-[#AAA8A1]">
                    +1.800 ouvintes conectados simultaneamente
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div
                  className="h-44 rounded-xl bg-cover bg-center border border-white/10 relative overflow-hidden"
                  style={{ backgroundImage: `url(${ASSETS.radioBg})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-mono font-bold text-white uppercase">Estúdio de Transmissão Ao Vivo</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#0E0F12] border border-white/10">
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

            {/* 03. 18Cast & ALAMO */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Podcast 18Cast */}
              <div className="p-8 sm:p-10 rounded-2xl bg-[#131417] border border-white/15 flex flex-col justify-between overflow-hidden">
                <div
                  className="h-44 rounded-xl bg-cover bg-center mb-6 border border-white/10 relative overflow-hidden"
                  style={{ backgroundImage: `url(${ASSETS.podcastBg})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-red-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider">
                    YouTube Oficial
                  </div>
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-wider flex items-center gap-1.5 mb-2">
                    <IconPodcast className="w-4 h-4 text-[#F2C21B]" />
                    <span>Podcast Oficial</span>
                  </span>
                  <h3 className="font-['Anton'] text-3xl uppercase text-white mb-4">Podcast 18Cast</h3>
                  <p className="text-sm text-[#AAA8A1] leading-relaxed mb-6">
                    Entrevistas com veteranos, fundadores, mecânicos especialistas e líderes comunitários debatendo a essência do motociclismo de conduta e relatos de expedições extremas.
                  </p>
                </div>
                <a
                  href="https://www.youtube.com/@18cast"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black rounded text-xs font-['Anton'] uppercase tracking-wider inline-flex items-center gap-2 self-start transition-colors duration-200 shadow-md hover-lift"
                >
                  <span>Acessar no YouTube</span>
                  <span>↗</span>
                </a>
              </div>

              {/* ALAMO Associação */}
              <div className="p-8 sm:p-10 rounded-2xl bg-[#131417] border border-white/15 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-wider flex items-center gap-1.5 mb-2">
                    <IconShield className="w-4 h-4 text-[#F2C21B]" />
                    <span>Proteção & Apoio</span>
                  </span>
                  <h3 className="font-['Anton'] text-3xl uppercase text-white mb-4">Associação ALAMO</h3>
                  <p className="text-sm text-[#AAA8A1] leading-relaxed mb-6">
                    Associação de proteção veicular e benefícios mútuos para motociclistas, oferecendo socorro 24h com guincho, assistência jurídica especializada e cobertura para estradas e rodovias em todo o Brasil.
                  </p>
                </div>
                <a
                  href="https://alamo.org.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 self-start"
                >
                  <span>Conhecer Benefícios ALAMO</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
