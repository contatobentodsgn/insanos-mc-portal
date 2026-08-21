"use client";

import React, { useState } from "react";
import { IconChat, IconCheck } from "./ui/Icons";

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? (url || window.location.href) : "https://insanosmc.vercel.app";
  const encodedTitle = encodeURIComponent(`${title} — Insanos Moto Clube`);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs uppercase font-extrabold text-[#AAA8A1] tracking-wider shrink-0">
        Compartilhar:
      </span>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3.5 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
        title="Compartilhar no WhatsApp"
      >
        <IconChat className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* Telegram */}
      <a
        href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3.5 py-2 rounded-lg bg-sky-600/20 hover:bg-sky-600 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
        title="Compartilhar no Telegram"
      >
        <span>Telegram</span>
      </a>

      {/* Copiar Link */}
      <button
        onClick={handleCopy}
        className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none"
      >
        {copied ? (
          <>
            <IconCheck className="w-3.5 h-3.5 text-[#F2C21B]" />
            <span className="text-[#F2C21B]">Link Copiado!</span>
          </>
        ) : (
          <>
            <span>🔗 Copiar Link</span>
          </>
        )}
      </button>
    </div>
  );
}
