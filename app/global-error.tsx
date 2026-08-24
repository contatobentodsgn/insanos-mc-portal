"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // If navigation failed due to deployment update or chunk mismatch, reload automatically
    const isChunkOrRouteError =
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("Loading chunk") ||
      error?.message?.includes("Failed to fetch") ||
      error?.message?.includes("Failed to load") ||
      error?.message?.includes("removeChild");

    if (isChunkOrRouteError) {
      window.location.reload();
    }
  }, [error]);

  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-full bg-[#F2C21B]/15 border border-[#F2C21B] flex items-center justify-center mb-6">
          <span className="font-['Anton'] text-2xl text-[#F2C21B]">!</span>
        </div>
        <h2 className="font-['Anton'] text-3xl uppercase tracking-wider mb-2">
          Atualizando Portal
        </h2>
        <p className="text-sm text-[#AAA8A1] max-w-md mb-8">
          Uma nova versão do portal foi disponibilizada. Carregando dados atualizados...
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase text-sm rounded-xl tracking-wider shadow-lg transition-all cursor-pointer"
          >
            Carregar Página
          </button>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-xs rounded-xl tracking-wider border border-white/20 transition-all cursor-pointer"
          >
            Tentar Novamente
          </button>
        </div>
      </body>
    </html>
  );
}
