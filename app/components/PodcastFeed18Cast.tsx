"use client";

import React, { useState } from "react";
import { IconPodcast, IconPlay, IconPause } from "./ui/Icons";

export interface PodcastEpisode {
  id: string;
  number: string;
  title: string;
  date: string;
  duration: string;
  guest: string;
  desc: string;
  image: string;
  youtubeId: string; // YouTube Video ID for clean direct embed
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
    youtubeId: "dQw4w9WgXcQ", // fallback id / official channel stream
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
    youtubeId: "dQw4w9WgXcQ",
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
    youtubeId: "dQw4w9WgXcQ",
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
    youtubeId: "dQw4w9WgXcQ",
    spotifyUrl: "https://open.spotify.com/show/insanosmc",
  },
];

export function PodcastFeed18Cast() {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode>(EPISODES_18CAST[0]);
  const [playerMode, setPlayerMode] = useState<"video" | "audio">("video");
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(34); // demo progress 34%

  const handleSelect = (ep: PodcastEpisode) => {
    setSelectedEpisode(ep);
    setIsPlayingAudio(false);
  };

  return (
    <div className="rounded-3xl bg-[#111317] border border-t-white/20 border-b-white/5 border-x-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F2C21B]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-8 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2C21B] animate-pulse" />
            <span className="text-xs font-mono font-bold text-[#F2C21B] uppercase tracking-wider">
              18Cast Official Feed · Multimídia
            </span>
          </div>
          <h3 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white tracking-[-0.015em] leading-tight">
            Episódios Recentes do <span className="text-[#F2C21B]">18Cast</span>
          </h3>
          <p className="text-sm text-[#D4D1CA] font-medium mt-1 max-w-xl">
            Assista ou ouça diretamente no portal. Conversas exclusivas, conduta, mecânica de alta cilindrada e relatos de estrada.
          </p>
        </div>

        {/* Global Links */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://www.youtube.com/@InsanosMCOficial"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase transition-all shadow-md hover-lift flex items-center gap-2"
          >
            <span>Canal YouTube</span>
            <span>↗</span>
          </a>
          <a
            href="https://open.spotify.com/show/insanosmc"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black text-xs font-mono font-bold uppercase transition-all shadow-md hover-lift flex items-center gap-2"
          >
            <span>Spotify Oficial</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Main Interactive Grid: Active Player + Episode Carousel Selector */}
      <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Col (7 Cols): Active Player Showcase */}
        <div className="lg:col-span-7 space-y-4">
          {/* Mode Switcher: Video Player vs Audio Wave Player */}
          <div className="flex items-center justify-between bg-[#0B0C0E] p-1.5 rounded-xl border border-white/10">
            <div className="flex gap-2">
              <button
                onClick={() => setPlayerMode("video")}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  playerMode === "video"
                    ? "bg-[#F2C21B] text-black font-extrabold shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                📺 Assistir Vídeo
              </button>
              <button
                onClick={() => setPlayerMode("audio")}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  playerMode === "audio"
                    ? "bg-[#F2C21B] text-black font-extrabold shadow-md"
                    : "text-white/60 hover:text-white"
                }`}
              >
                🎧 Ouvir Áudio
              </button>
            </div>
            <span className="text-[11px] font-mono text-[#F2C21B] px-3 font-bold">
              {selectedEpisode.number} · {selectedEpisode.duration}
            </span>
          </div>

          {/* Screen Box */}
          {playerMode === "video" ? (
            <div className="rounded-2xl overflow-hidden bg-black border border-white/15 aspect-video shadow-2xl relative group">
              {/* Responsive Video Canvas */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
                style={{ backgroundImage: `url(${selectedEpisode.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
              </div>

              {/* YouTube Play Overlay Banner */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <a
                  href={`https://www.youtube.com/@InsanosMCOficial`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-20 rounded-full bg-[#F2C21B] hover:bg-[#ffe053] text-black flex items-center justify-center shadow-[0_0_35px_rgba(242,194,27,0.7)] transition-transform duration-300 hover:scale-110 active:scale-95 group mb-4 cursor-pointer"
                  title="Reproduzir no YouTube Oficial"
                >
                  <IconPlay className="w-8 h-8 text-black translate-x-0.5 fill-black" />
                </a>
                <span className="px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-[#F2C21B]/40 text-[#F2C21B] font-mono text-xs font-bold uppercase mb-1">
                  Transmitido pelo 18Cast Oficial
                </span>
                <h4 className="font-['Anton'] text-xl sm:text-2xl uppercase text-white max-w-lg leading-tight">
                  {selectedEpisode.title}
                </h4>
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/80 z-10">
                <span>Convidado: {selectedEpisode.guest}</span>
                <span className="text-[#F2C21B]">{selectedEpisode.date}</span>
              </div>
            </div>
          ) : (
            /* Audio Wave Player Mode */
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0C0E12] border border-white/15 space-y-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0 border border-[#F2C21B]/40 shadow-lg"
                  style={{ backgroundImage: `url(${selectedEpisode.image})` }}
                />
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-[#F2C21B] block">
                    Reproduzindo Áudio HQ
                  </span>
                  <h4 className="font-['Anton'] text-xl sm:text-2xl uppercase text-white leading-tight">
                    {selectedEpisode.title}
                  </h4>
                  <p className="text-xs text-[#AAA8A1] font-mono mt-0.5">{selectedEpisode.guest}</p>
                </div>
              </div>

              {/* Progress & Waveform Sim */}
              <div className="space-y-2">
                <div className="h-10 flex items-center gap-1 px-2 bg-black/40 rounded-lg overflow-hidden border border-white/5">
                  {Array.from({ length: 48 }).map((_, idx) => {
                    const active = (idx / 48) * 100 <= audioProgress;
                    const heightPercent = 20 + Math.abs(Math.sin(idx * 0.45) * 75);
                    return (
                      <div
                        key={idx}
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          active ? "bg-[#F2C21B]" : "bg-white/15"
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-[11px] font-mono text-[#AAA8A1]">
                  <span>28:40</span>
                  <span className="text-[#F2C21B] font-bold">{selectedEpisode.duration}</span>
                </div>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-12 h-12 rounded-full bg-[#F2C21B] hover:bg-[#ffe053] text-black flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <IconPause className="w-5 h-5 text-black" />
                    ) : (
                      <IconPlay className="w-5 h-5 text-black translate-x-0.5 fill-black" />
                    )}
                  </button>
                  <span className="text-xs font-mono text-white/90">
                    {isPlayingAudio ? "▶ Reproduzindo Áudio..." : "⏸ Pausado"}
                  </span>
                </div>

                <a
                  href={selectedEpisode.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#1DB954]/20 hover:bg-[#1DB954] hover:text-black text-[#1DB954] text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5"
                >
                  <span>Abrir no Spotify</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          )}

          {/* Episode Description Footer */}
          <div className="p-4 rounded-xl bg-[#0C0E12] border border-white/10 text-xs text-[#D4D1CA] leading-relaxed">
            <strong className="text-white font-mono block mb-1">Sinopse do Episódio:</strong>
            {selectedEpisode.desc}
          </div>
        </div>

        {/* Right Col (5 Cols): Episode List Selection Carousel */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-mono font-bold uppercase text-white">
              Todos os 4 Episódios Destaque
            </span>
            <span className="text-[11px] font-mono text-[#F2C21B]">Temporada 2026</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {EPISODES_18CAST.map((ep) => {
              const isCurrent = selectedEpisode.id === ep.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => handleSelect(ep)}
                  role="button"
                  tabIndex={0}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex gap-3.5 items-center group hover-lift ${
                    isCurrent
                      ? "bg-[#181A20] border-[#F2C21B] shadow-[0_0_25px_rgba(242,194,27,0.2)] scale-[1.01]"
                      : "bg-[#0E1014] border-white/10 hover:border-white/25 opacity-85 hover:opacity-100"
                  }`}
                >
                  {/* Thumbnail with Play Icon overlay */}
                  <div
                    className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0 border border-white/10 relative overflow-hidden flex items-center justify-center group-hover:border-[#F2C21B]/60"
                    style={{ backgroundImage: `url(${ep.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors" />
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 ${
                      isCurrent ? "bg-[#F2C21B] text-black" : "bg-black/80 text-white border border-white/20"
                    }`}>
                      <IconPlay className="w-3.5 h-3.5 translate-x-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold text-[#F2C21B] px-2 py-0.5 rounded bg-[#F2C21B]/15">
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
