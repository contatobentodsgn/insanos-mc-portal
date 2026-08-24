"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

interface RadioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isLoading: boolean;
  toggleRadio: () => void;
  playRadio: () => void;
  pauseRadio: () => void;
  toggleMute: () => void;
  setVolume: (vol: number) => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

// High-Fidelity 24h Rock Stream URLs
const PRIMARY_STREAM_URL = "https://stream.radioparadise.com/rock-128";
const BACKUP_STREAM_URL = "https://stream.zeno.fm/k22222xsyreuv";

export function RadioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(85);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Restore state on mount if user had active session
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedPlayState = sessionStorage.getItem("insanos_radio_playing");
    if (savedPlayState === "true" && audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        sessionStorage.removeItem("insanos_radio_playing");
      });
    }
  }, []);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const triggerHaptic = (ms = 15) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {
        // ignore
      }
    }
  };

  const playRadio = () => {
    if (!audioRef.current) return;
    triggerHaptic(15);
    setIsLoading(true);
    setIsPlaying(true);
    sessionStorage.setItem("insanos_radio_playing", "true");

    audioRef.current
      .play()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn("Audio play blocked or stream unavailable:", err);
        setIsLoading(false);
      });
  };

  const pauseRadio = () => {
    if (!audioRef.current) return;
    triggerHaptic(12);
    audioRef.current.pause();
    setIsPlaying(false);
    setIsLoading(false);
    sessionStorage.removeItem("insanos_radio_playing");
  };

  const toggleRadio = () => {
    if (isPlaying) {
      pauseRadio();
    } else {
      playRadio();
    }
  };

  const toggleMute = () => {
    triggerHaptic(12);
    setIsMuted((prev) => !prev);
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    if (isMuted && val > 0) {
      setIsMuted(false);
    }
  };

  return (
    <RadioContext.Provider
      value={{
        isPlaying,
        isMuted,
        volume,
        isLoading,
        toggleRadio,
        playRadio,
        pauseRadio,
        toggleMute,
        setVolume,
      }}
    >
      {/* Explicit native <audio> element rendered in DOM for accessibility, media controls and live stream playback */}
      <audio
        ref={audioRef}
        id="insanos-radio-live"
        src={PRIMARY_STREAM_URL}
        preload="none"
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onCanPlay={() => setIsLoading(false)}
        onError={(e) => {
          console.warn("Primary radio stream fallback triggered...", e);
          if (audioRef.current && audioRef.current.src !== BACKUP_STREAM_URL) {
            audioRef.current.src = BACKUP_STREAM_URL;
            audioRef.current.play().catch(() => {});
          }
        }}
      />
      {children}
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error("useRadio must be used within a RadioProvider");
  }
  return context;
}
