"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconVolumeUp, IconVolumeMute, IconClose } from "./ui/Icons";

interface RadioBarProps {
  isPlaying: boolean;
  onClose: () => void;
}

// 24h High-Fidelity Rock Stream (Radio Paradise Rock Mix / Classic Rock)
const ROCK_STREAM_URL = "https://stream.radioparadise.com/rock-128";

export function RadioBar({ isPlaying, onClose }: RadioBarProps) {
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and manage audio stream playback
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(ROCK_STREAM_URL);
      audio.preload = "none";
      audioRef.current = audio;

      audio.addEventListener("waiting", () => setIsLoadingAudio(true));
      audio.addEventListener("playing", () => setIsLoadingAudio(false));
      audio.addEventListener("canplay", () => setIsLoadingAudio(false));
      audio.addEventListener("error", (e) => {
        console.warn("Primary radio stream error, switching to backup rock stream...", e);
        audio.src = "https://stream.zeno.fm/k22222xsyreuv";
        if (isPlaying) {
          audio.play().catch(() => {});
        }
      });
    }

    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume / 100;
      if (isPlaying) {
        setIsLoadingAudio(true);
        audio.play().then(() => {
          setIsLoadingAudio(false);
        }).catch((err) => {
          console.log("Audio autoplay prevented or stream interrupted:", err);
          setIsLoadingAudio(false);
        });
      } else {
        audio.pause();
        setIsLoadingAudio(false);
      }
    }

    return () => {
      if (audio && !isPlaying) {
        audio.pause();
      }
    };
  }, [isPlaying]);

  // Handle volume updates
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  if (!isPlaying) return null;

  const currentVolume = isMuted ? 0 : volume;

  return (
    <div
      role="region"
      aria-label="Player da Rádio Insanos Web"
      className="sticky top-[69px] z-40 bg-[#141518]/95 backdrop-blur-md border-b border-[#F2C21B]/40 px-4 py-2.5 flex items-center justify-between text-xs shadow-2xl transition-all"
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
              {isLoadingAudio ? "Sintonizando transmissão ao vivo..." : "Rock & Asfalto 24h · O som que embala o comboio"}
            </span>
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
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
              onChange={(e) => {
                const val = Number(e.target.value);
                setVolume(val);
                if (isMuted && val > 0) setIsMuted(false);
              }}
              className="w-16 sm:w-24 accent-[#F2C21B] h-1 bg-white/20 rounded cursor-pointer focus:outline-none"
              aria-label="Controle de volume da rádio"
            />
            <span className="text-[10px] font-mono text-[#AAA8A1] w-7 text-right">
              {currentVolume}%
            </span>
          </div>

          <button
            onClick={onClose}
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
