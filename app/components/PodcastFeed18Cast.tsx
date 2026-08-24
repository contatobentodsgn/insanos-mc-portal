"use client";

import React, { useState } from "react";
import { IconPodcast, IconPlay } from "./ui/Icons";

export interface PodcastEpisode {
  id: string;
  number: string;
  title: string;
  date: string;
  duration: string;
  guest: string;
  desc: string;
  image: string;
  youtubeUrl: string;
  spotifyUrl: string;
}

export const EPISODES_18CAST: PodcastEpisode[] = [
  {
    id: "ep-48",
    number: "EP #48",
    title: "Doutrina & Os Quatro Pilares da Irmandade no Século XXI",
    date: "Agosto 2026",
    duration: "1h 24m",
    guest: "Comando Mundial & Veteranos",
    desc: "Um debate profundo sobre disciplina, respeito à família e o papel de cada integrante na expansão para mais de 65 países.",
    image: "/images/insanos/podcast_18cast_studio.webp",
    youtubeUrl: "https://www.youtube.com/@InsanosMCOficial",
    spotifyUrl: "https://open.spotify.com/show/insanosmc",
  },
  {
    id: "ep-47",
    number: "EP #47",
    title: "Expedição Extrema: Travessia da Cordilheira dos Andes",
    date: "Julho 2026",
    duration: "58 min",
    guest: "Divisão Nômades Internacional",
    desc: "Relatos de superação em mais de 5.000 km sob altitude severa e o suporte mútuo entre facções da América Latina.",
    image: "/images/insanos/expedicoes/expedicao_1.webp",
    youtubeUrl: "https://www.youtube.com/@InsanosMCOficial",
    spotifyUrl: "https://open.spotify.com/show/insanosmc",
  },
  {
    id: "ep-46",
    number: "EP #46",
    title: "Combate Insano & A Revolução da Inclusão PcD nas Pistas",
    date: "Junho 2026",
    duration: "1h 12m",
    guest: "Diretoria Social & Atletas PcD",
    desc: "Como as artes marciais e a engenharia de adaptação de motocicletas estão devolvendo a liberdade a centenas de irmãos.",
    image: "/images/insanos/impact_combat.webp",
    youtubeUrl: "https://www.youtube.com/@InsanosMCOficial",
    spotifyUrl: "https://open.spotify.com/show/insanosmc",
  },
  {
    id: "ep-45",
    number: "EP #45",
    title: "A Raiz de OZ: A História Oral da Fundação em Osasco",
    date: "Maio 2026",
    duration: "1h 45m",
    guest: "Pioneiros do Asfalto (2015)",
    desc: "O registro documentado das primeiras reuniões na Av. dos Autonomistas e a inspiração heróica dos 18 do Forte de 1922.",
    image: "/images/insanos/history_1922.webp",
    youtubeUrl: "https://www.youtube.com/@InsanosMCOficial",
    spotifyUrl: "https://open.spotify.com/show/insanosmc",
  },
];

export function PodcastFeed18Cast() {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode>(EPISODES_18CAST[0]);

  return (
    <div className="rounded-[2px] bg-[#111317] border-2 border-t-white/20 border-b-white/5 border-x-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-8 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-none bg-[#F2C21B]" />
            <span className="text-xs font-mono font-bold text-[#F2C21B] uppercase tracking-wider">
              18Cast Oficial · Hub de Comunicação
            </span>
          </div>
          <h3 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white tracking-[-0.015em] leading-tight">
            Episódios do <span className="text-[#F2C21B]">18Cast</span>
          </h3>
          <p className="text-sm text-[#D4D1CA] font-medium mt-1 max-w-xl">
            Conversas com pioneiros, bastidores de grandes expedições mundiais e relatos da estrada. Acompanhe diretamente nos canais oficiais.
          </p>
        </div>

        {/* Global Channel Direct Links */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://www.youtube.com/@InsanosMCOficial"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-[2px] bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase transition-all shadow-md hover-lift flex items-center gap-2 border border-red-500 cursor-pointer"
          >
            <span>Canal YouTube</span>
            <span>↗</span>
          </a>
          <a
            href="https://open.spotify.com/show/insanosmc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-[2px] bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-mono font-bold uppercase transition-all shadow-md hover-lift flex items-center gap-2 border border-[#1DB954] cursor-pointer"
          >
            <span>Spotify Oficial</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Main Interactive Grid: Active Episode Spotlight + Selection List */}
      <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Col (7 Cols): Active Episode Spotlight */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-[2px] overflow-hidden bg-black border-2 border-white/15 aspect-video shadow-2xl relative group">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${selectedEpisode.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
            </div>

            {/* Direct Channel Action Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <span className="px-3 py-1 rounded-[2px] bg-black/85 border border-[#F2C21B]/40 text-[#F2C21B] font-mono text-xs font-bold uppercase mb-2">
                {selectedEpisode.number} · {selectedEpisode.duration}
              </span>
              <h4 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white max-w-lg leading-tight mb-4">
                {selectedEpisode.title}
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={selectedEpisode.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-[2px] bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase text-xs tracking-wider transition-all shadow-lg hover-lift inline-flex items-center gap-2 cursor-pointer"
                >
                  <IconPlay className="w-4 h-4 fill-black" />
                  <span>Assistir no YouTube</span>
                  <span>↗</span>
                </a>
                <a
                  href={selectedEpisode.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-[2px] bg-[#14161C] hover:bg-[#1DB954] hover:text-black text-white font-['Anton'] uppercase text-xs tracking-wider transition-all border border-white/20 hover:border-[#1DB954] inline-flex items-center gap-2 cursor-pointer"
                >
                  <IconPodcast className="w-4 h-4 text-inherit" />
                  <span>Ouvir no Spotify</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80 z-10 border-t border-white/10 pt-2">
              <span>Convidado: {selectedEpisode.guest}</span>
              <span className="text-[#F2C21B] font-bold">{selectedEpisode.date}</span>
            </div>
          </div>

          {/* Episode Description */}
          <div className="p-5 rounded-[2px] bg-[#0C0E12] border border-white/10 text-xs text-[#D4D1CA] leading-relaxed">
            <strong className="text-white font-mono block mb-1 uppercase tracking-wider text-[11px]">Sinopse Oficial:</strong>
            {selectedEpisode.desc}
          </div>
        </div>

        {/* Right Col (5 Cols): Episode List Selection */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-mono font-bold uppercase text-white">
              Episódios em Destaque
            </span>
            <span className="text-[11px] font-mono text-[#F2C21B] font-bold">Temporada 2026</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {EPISODES_18CAST.map((ep) => {
              const isCurrent = selectedEpisode.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => setSelectedEpisode(ep)}
                  role="button"
                  tabIndex={0}
                  className={`p-4 rounded-[2px] border-2 transition-all duration-200 cursor-pointer flex gap-3.5 items-center group hover-lift ${
                    isCurrent
                      ? "bg-[#181A20] border-[#F2C21B] shadow-[0_0_20px_rgba(242,194,27,0.15)]"
                      : "bg-[#0E1014] border-white/10 hover:border-white/30 opacity-85 hover:opacity-100"
                  }`}
                >
                  {/* Thumbnail with Play Icon */}
                  <div
                    className="w-20 h-20 rounded-[2px] bg-cover bg-center shrink-0 border border-white/10 relative overflow-hidden flex items-center justify-center group-hover:border-[#F2C21B]/60"
                    style={{ backgroundImage: `url(${ep.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors" />
                    <div className={`w-8 h-8 rounded-[2px] flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 ${
                      isCurrent ? "bg-[#F2C21B] text-black" : "bg-black/80 text-white border border-white/20"
                    }`}>
                      <IconPlay className="w-3.5 h-3.5 translate-x-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#F2C21B] px-2 py-0.5 rounded-[2px] bg-[#F2C21B]/15">
                        {ep.number}
                      </span>
                      <span className="text-[10px] font-mono text-white/50">{ep.duration}</span>
                    </div>
                    <h5 className="font-['Anton'] text-base uppercase text-white truncate leading-tight group-hover:text-[#F2C21B] transition-colors">
                      {ep.title}
                    </h5>
                    <p className="text-[11px] text-[#AAA8A1] truncate mt-0.5 font-mono">
                      {ep.guest}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
