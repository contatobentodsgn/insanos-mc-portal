"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import customTextsData from "../data/customContent.json";

export function AdminClient() {
  const [texts, setTexts] = useState<Record<string, string>>(customTextsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [history, setHistory] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("insanos_custom_texts");
      const localSync = localStorage.getItem("insanos_last_sync");
      if (localSync) {
        setLastSyncTime(localSync);
      }
      if (local) {
        try {
          const parsed = JSON.parse(local);
          setTexts((prev) => ({ ...prev, ...parsed }));
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const handleStartEdit = (key: string, currentVal: string) => {
    setEditingKey(key);
    setEditValue(currentVal);
  };

  const handleSaveItem = async () => {
    if (!editingKey) return;
    setHistory((prev) => [...prev, texts]);
    const updated = { ...texts, [editingKey]: editValue };
    setTexts(updated);
    setEditingKey(null);

    const nowStr = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLastSyncTime(nowStr);

    if (typeof window !== "undefined") {
      localStorage.setItem("insanos_custom_texts", JSON.stringify(updated));
      localStorage.setItem("insanos_last_sync", nowStr);
    }

    try {
      await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: updated }),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleUndo = async () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setTexts(previousState);

    if (typeof window !== "undefined") {
      localStorage.setItem("insanos_custom_texts", JSON.stringify(previousState));
    }

    try {
      await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: previousState }),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(texts, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(texts, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `insanos_textos_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (typeof parsed === "object" && parsed !== null) {
          setHistory((prev) => [...prev, texts]);
          setTexts(parsed);
          const nowStr = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
          setLastSyncTime(nowStr);

          if (typeof window !== "undefined") {
            localStorage.setItem("insanos_custom_texts", JSON.stringify(parsed));
            localStorage.setItem("insanos_last_sync", nowStr);
          }

          await fetch("/api/save-content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texts: parsed }),
          });

          setSavedSuccess(true);
          setTimeout(() => setSavedSuccess(false), 3000);
        }
      } catch (err) {
        alert("Erro ao ler o arquivo JSON de backup. Certifique-se de que é um formato válido.");
      }
    };
    reader.readAsText(file);
  };

  const filteredEntries = Object.entries(texts).filter(
    ([key, val]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pages = [
    { name: "Página Inicial (Home)", path: "/?editor=true", desc: "Hero, 4 Pilares, Linha do Tempo, Números Globais" },
    { name: "História & Tradição", path: "/historia?editor=true", desc: "1922 Copacabana, 2015 Osasco, Linha Expandida" },
    { name: "Comando & Memorial", path: "/comando?editor=true", desc: "Liderança Executiva, Diretorias e Homenagens" },
    { name: "Impacto Social", path: "/impacto?editor=true", desc: "Campanhas do Agasalho, Projeto PcD, Sangue" },
    { name: "18News & Mídia", path: "/18news?editor=true", desc: "Notícias oficiais, matérias e podcasts" },
    { name: "Ecossistema 18", path: "/ecossistema?editor=true", desc: "Loja Oficial, Rádio Insanos, 18Cast" },
    { name: "Faça Parte", path: "/faca-parte?editor=true", desc: "Formulário de Alistamento e Quiz de DNA Insano" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans antialiased selection:bg-[#F2C21B] selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0E0F12]/95 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/insanos/insanos_mc_logo.svg"
                alt="Insanos MC"
                className="h-7 w-auto object-contain"
              />
            </Link>
            <span className="text-white/20">|</span>
            <span className="px-2.5 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] font-mono text-xs font-bold uppercase tracking-wider">
              Painel Administrativo
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://insanos-mc-portal.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2 hover:bg-emerald-900/60 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vercel Produção (No Ar) ↗</span>
            </a>

            <a
              href="https://github.com/contatobentodsgn/insanos-mc-portal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white text-xs font-mono flex items-center gap-2 hover:bg-white/20 transition-colors"
            >
              <span>GitHub ↗</span>
            </a>

            <Link
              href="/"
              className="px-4 py-1.5 rounded-lg bg-[#F2C21B] text-black font-['Anton'] uppercase text-xs tracking-wider font-bold hover:bg-[#ffe053] transition-colors"
            >
              Voltar ao Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
        {/* Banner de Ação Rápida */}
        <section className="p-8 rounded-2xl bg-gradient-to-r from-[#14161B] via-[#121316] to-[#0E0F12] border border-[#F2C21B]/40 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] text-xs font-mono font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#F2C21B] animate-ping" />
              <span>Editor Visual Direto na Tela</span>
            </div>
            <h1 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-tight">
              Edite qualquer texto clicando diretamente na página
            </h1>
            <p className="text-[#C7C5BF] text-sm sm:text-base leading-relaxed">
              O modo de edição visual foi isolado exclusivamente para este painel. Visitantes públicos veem o site limpo e seguro. Clique abaixo para abrir o site com a barra de ferramentas de edição ativada.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="/?editor=true"
                className="px-6 py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase text-sm tracking-wider rounded-xl shadow-[0_0_20px_rgba(242,194,27,0.35)] transition-all flex items-center gap-2"
              >
                <span>🚀 Abrir Modo Editor na Página Inicial</span>
                <span className="font-sans font-bold">↘</span>
              </a>
            </div>
          </div>
        </section>

        {/* Links Rápidos por Página com Editor Ativo */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-['Anton'] text-2xl uppercase text-white">
                Abrir Editor por Página Específica
              </h2>
              <p className="text-xs text-[#AAA8A1]">
                Clique na página desejada para abri-la diretamente em modo de edição visual.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((p) => (
              <a
                key={p.path}
                href={p.path}
                className="p-5 rounded-xl bg-[#111215] border border-white/10 hover:border-[#F2C21B] transition-all group hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-['Anton'] text-lg uppercase text-white group-hover:text-[#F2C21B] transition-colors">
                    {p.name}
                  </h3>
                  <span className="text-xs text-[#F2C21B] font-mono">Editar ↗</span>
                </div>
                <p className="text-xs text-[#AAA8A1] leading-relaxed">
                  {p.desc}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Gerenciador de Textos & JSON */}
        <section className="p-8 rounded-2xl bg-[#111215] border border-white/10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#F2C21B]" />
                <h2 className="font-['Anton'] text-2xl uppercase text-white">
                  Banco de Textos Sincronizados ({Object.keys(texts).length} Itens)
                </h2>
              </div>
              <p className="text-xs text-[#AAA8A1]">
                Todos os textos blocados e quebras de linha oficiais persistidos no projeto.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {lastSyncTime && (
                <span className="text-[11px] font-mono text-[#AAA8A1] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                  Última sincronização: <strong className="text-[#F2C21B]">{lastSyncTime}</strong>
                </span>
              )}

              {history.length > 0 && (
                <button
                  onClick={handleUndo}
                  className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  title="Desfazer última alteração de texto"
                >
                  <span>↩ Desfazer ({history.length})</span>
                </button>
              )}

              <button
                onClick={handleCopyJSON}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-lg transition-colors flex items-center gap-2"
              >
                <span>{copied ? "✓ Copiado!" : "📋 Copiar JSON"}</span>
              </button>

              <button
                onClick={handleDownloadJSON}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-lg transition-colors flex items-center gap-2"
              >
                <span>📥 Baixar Backup</span>
              </button>

              <label className="px-4 py-2 bg-[#F2C21B]/15 hover:bg-[#F2C21B]/25 text-[#F2C21B] border border-[#F2C21B]/40 font-mono text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
                <span>📤 Restaurar Backup (.json)</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono rounded-lg">
              ✓ Texto atualizado e salvo com sucesso!
            </div>
          )}

          {/* Barra de Pesquisa */}
          <div>
            <input
              type="text"
              placeholder="Buscar por texto ou seletor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#666] focus:outline-none focus:border-[#F2C21B]"
            />
          </div>

          {/* Tabela de Textos */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredEntries.map(([key, val]) => (
              <div
                key={key}
                className="p-4 rounded-xl bg-[#0E0F12] border border-white/10 hover:border-white/20 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] text-[#F2C21B] break-all bg-black/40 px-2 py-0.5 rounded border border-white/5">
                    {key}
                  </span>
                  {editingKey !== key ? (
                    <button
                      onClick={() => handleStartEdit(key, val)}
                      className="px-3 py-1 bg-white/10 hover:bg-[#F2C21B] hover:text-black rounded text-[11px] font-mono transition-colors shrink-0"
                    >
                      ✏️ Editar
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveItem}
                        className="px-3 py-1 bg-[#F2C21B] text-black font-bold rounded text-[11px] font-mono transition-colors"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditingKey(null)}
                        className="px-2 py-1 bg-white/10 text-white rounded text-[11px] font-mono"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>

                {editingKey === key ? (
                  <textarea
                    rows={3}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full p-3 bg-[#0A0A0B] border border-[#F2C21B] rounded-lg text-sm text-white focus:outline-none font-mono"
                  />
                ) : (
                  <div
                    className="text-sm text-[#DDD] leading-relaxed bg-[#0A0A0B]/60 p-3 rounded-lg border border-white/5"
                    dangerouslySetInnerHTML={{ __html: val }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
