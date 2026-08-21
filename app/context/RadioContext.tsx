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

// 24h High-Fidelity Rock Stream (Primary & Backup Streams)
const PRIMARY_STREAM_URL = "https://stream.radioparadise.com/rock-128";
const BACKUP_STREAM_URL = "https://stream.zeno.fm/k22222xsyreuv";

export function RadioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(85);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize persistent single audio instance
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!audioRef.current) {
      const audio = new Audio(PRIMARY_STREAM_URL);
      audio.preload = "none";
      audioRef.current = audio;

      audio.addEventListener("waiting", () => setIsLoading(true));
      audio.addEventListener("playing", () => setIsLoading(false));
      audio.addEventListener("canplay", () => setIsLoading(false));
      audio.addEventListener("error", (e) => {
        console.warn("Primary radio stream failed, switching to backup stream...", e);
        audio.src = BACKUP_STREAM_URL;
        audio.play().catch(() => {});
      });
    }

    // Restore user preference if previously playing in this session
    const savedPlayState = sessionStorage.getItem("insanos_radio_playing");
    if (savedPlayState === "true") {
      setIsPlaying(true);
      audioRef.current.play().catch(() => {
        // Autoplay may require user gesture
        setIsPlaying(false);
        sessionStorage.removeItem("insanos_radio_playing");
      });
    }
  }, []);

  // Update volume on audio instance
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Handle Play / Pause
  const playRadio = () => {
    if (!audioRef.current) return;
    setIsLoading(true);
    setIsPlaying(true);
    sessionStorage.setItem("insanos_radio_playing", "true");

    audioRef.current
      .play()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Audio play error:", err);
        setIsLoading(false);
      });
  };

  const pauseRadio = () => {
    if (!audioRef.current) return;
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
