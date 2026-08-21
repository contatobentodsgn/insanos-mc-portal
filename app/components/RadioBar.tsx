"use client";

import React from "react";
import { IconVolumeUp, IconVolumeMute, IconClose } from "./ui/Icons";
import { useRadio } from "../context/RadioContext";

export function RadioBar() {
  const { isPlaying, isMuted, volume, isLoading, pauseRadio, toggleMute, setVolume } = useRadio();

  if (!isPlaying) return null;

  const currentVolume = isMuted ? 0 : volume;

  return (
    <div
      role="region"
      aria-label="Player da Rádio Insanos Web"
      className="sticky top-[58px] sm:top-[63px] z-40 bg-[#141518]/95 backdrop-blur-md border-b border-[#F2C21B]/40 px-4 py-2.5 flex items-center justify-between text-xs shadow-2xl transition-all"
    >
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between gap-4">
        {/* Equalizer & Station Info */}
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-end gap-0.5 h-4 w-5 shrink-0" aria-hidden="true">
            <span className="w-1 bg-[#F2C21B] h-full animate-[bounce_0.8s_infinite] rounded-t-sm" />
            <span className="w-1 bg-[#F2C21B] h-2/3 animate-[bounce_1.1s_infinite] rounded-t-sm" />
            <span className="w-1 bg-[#F2C21B] h-4/5 animate-[bounce_0.9s_infinite] rounded-t-sm" />
            <span className="w-1 bg-[#F2C21B] h-1/2 animate-[bounce_1.3s_infinite] rounded-t-sm" />
          </div>
          <div className="truncate flex items-center gap-2">
            <span className="text-[#F2C21B] font-bold uppercase tracking-wider text-[11px] shrink-0">
              RÁDIO INSANOS WEB AO VIVO:
            </span>
            <span className="text-white font-medium truncate">
              {isLoading ? "Sintonizando transmissão ao vivo..." : "Rock & Asfalto 24h · O som que embala o comboio"}
            </span>
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Mobile Mute Toggle */}
          <button
            onClick={toggleMute}
            className="sm:hidden p-1.5 rounded-md bg-white/10 text-white hover:text-[#F2C21B] transition-colors"
            title={isMuted ? "Desmutar rádio" : "Mutar rádio"}
            aria-label={isMuted ? "Desmutar áudio" : "Mutar áudio"}
          >
            {isMuted || volume === 0 ? (
              <IconVolumeMute className="w-3.5 h-3.5 text-[#AAA8A1]" />
            ) : (
              <IconVolumeUp className="w-3.5 h-3.5 text-[#F2C21B]" />
            )}
          </button>

          {/* Desktop Volume Slider */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-[#AAA8A1] hover:text-[#F2C21B] text-xs transition-colors focus:outline-none flex items-center justify-center w-5 h-5"
              title={isMuted ? "Desmutar rádio" : "Mutar rádio"}
              aria-label={isMuted ? "Desmutar áudio" : "Mutar áudio"}
            >
              {isMuted || volume === 0 ? (
                <IconVolumeMute className="w-3.5 h-3.5 text-[#AAA8A1]" />
              ) : (
                <IconVolumeUp className="w-3.5 h-3.5 text-[#F2C21B]" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={currentVolume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-16 sm:w-24 accent-[#F2C21B] h-1 bg-white/20 rounded cursor-pointer focus:outline-none"
              aria-label="Controle de volume da rádio"
            />
            <span className="text-[10px] font-mono text-[#AAA8A1] w-7 text-right">
              {currentVolume}%
            </span>
          </div>

          <button
            onClick={pauseRadio}
            className="px-3.5 py-1.5 bg-white/10 hover:bg-[#F2C21B] hover:text-black text-white rounded text-[11px] font-bold uppercase transition-all focus:outline-none flex items-center gap-1.5 shadow-md"
            aria-label="Pausar rádio"
          >
            <span>Pausar</span>
            <IconClose className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
