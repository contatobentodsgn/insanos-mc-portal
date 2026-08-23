"use client";

import React, { useState } from "react";
import { IconChat, IconCheck } from "./ui/Icons";

interface ShareButtonsProps {
  title: string;
  url?: string;
  summary?: string;
}

export function ShareButtons({ title, url, summary }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined" ? url || window.location.href : "https://insanosmc.vercel.app";
  const encodedTitle = encodeURIComponent(`${title} — Insanos Moto Clube`);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedSummary = encodeURIComponent(summary || "Confira essa matéria no portal oficial do Insanos MC:");

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${title} | Insanos MC`,
          text: summary || title,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-xs uppercase font-extrabold text-[#AAA8A1] tracking-wider shrink-0 mr-1">
        Compartilhar:
      </span>

      {/* Web Share API (Nativo para Celulares - Instagram, Stories, WhatsApp) */}
      {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
        <button
          onClick={handleNativeShare}
          className="px-3.5 py-2 rounded-lg bg-[#F2C21B] hover:bg-[#ffe053] text-black font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          title="Compartilhar no dispositivo"
        >
          <span>📲 Compartilhar</span>
        </button>
      )}

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedSummary}%0A*${encodedTitle}*%0A${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3.5 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
        title="Compartilhar no WhatsApp"
      >
        <IconChat className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
        title="Compartilhar no Facebook"
      >
        <span>Facebook</span>
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=InsanosMC,SomosDeVerdade`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
        title="Compartilhar no X (Twitter)"
      >
        <span>X</span>
      </a>

      {/* Copiar Link */}
      <button
        onClick={handleCopy}
        className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer"
        title="Copiar link para a área de transferência"
      >
        {copied ? (
          <>
            <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copiado!</span>
          </>
        ) : (
          <span>Copiar Link</span>
        )}
      </button>
    </div>
  );
}
