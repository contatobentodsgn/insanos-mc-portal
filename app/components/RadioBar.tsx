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
      aria-label="Player da Rádio Insanos Mobile"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121316]/95 backdrop-blur-xl border-t border-[#F2C21B]/50 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] text-xs shadow-[0_-10px_35px_rgba(0,0,0,0.85)] transition-all"
    >
      <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between gap-3">
        {/* Equalizer & Station Info */}
        <div className="flex items-center gap-2.5 overflow-hidden min-w-0">
          <div className="flex items-end gap-0.5 h-4 w-4 shrink-0" aria-hidden="true">
            <span className="w-1 bg-[#F2C21B] h-full animate-[bounce_0.8s_infinite] rounded-t-sm" />
            <span className="w-1 bg-[#F2C21B] h-2/3 animate-[bounce_1.1s_infinite] rounded-t-sm" />
            <span className="w-1 bg-[#F2C21B] h-4/5 animate-[bounce_0.9s_infinite] rounded-t-sm" />
            <span className="w-1 bg-[#F2C21B] h-1/2 animate-[bounce_1.3s_infinite] rounded-t-sm" />
          </div>
          <div className="truncate flex items-center gap-2 min-w-0">
            <span className="text-[#F2C21B] font-bold uppercase tracking-wider text-xs shrink-0 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
              AO VIVO:
            </span>
            <span className="text-white font-medium text-xs truncate">
              {isLoading ? "Sintonizando..." : "Rádio Insanos 24h · Rock & Asfalto"}
            </span>
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Mute Toggle */}
          <button
            onClick={toggleMute}
            className="min-w-[44px] min-h-[44px] p-2.5 rounded-[2px] bg-white/10 border border-white/20 text-white hover:text-[#F2C21B] transition-all flex items-center justify-center active:scale-95 cursor-pointer"
            title={isMuted ? "Desmutar rádio" : "Mutar rádio"}
            aria-label={isMuted ? "Desmutar áudio" : "Mutar áudio"}
          >
            {isMuted || volume === 0 ? (
              <IconVolumeMute className="w-4 h-4 text-[#AAA8A1]" />
            ) : (
              <IconVolumeUp className="w-4 h-4 text-[#F2C21B]" />
            )}
          </button>

          <button
            onClick={pauseRadio}
            className="min-h-[44px] px-4 py-2 bg-[#F2C21B] hover:bg-[#ffe053] text-black rounded-[2px] border border-[#F2C21B] text-xs font-['Anton'] tracking-wider uppercase transition-all focus:outline-none flex items-center gap-1.5 shadow-md active:scale-95 font-extrabold cursor-pointer"
            aria-label="Pausar rádio"
          >
            <span>Pausar</span>
            <IconClose className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
