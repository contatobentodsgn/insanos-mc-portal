"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IconArrowRight } from "../components/ui/Icons";
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
  const [isNoiseActive, setIsNoiseActive] = useState(false);

  // Mobile Simulator States
  const [activeTab, setActiveTab] = useState<"dashboard" | "simulator">("dashboard");
  const [showModalSimulator, setShowModalSimulator] = useState(false);
  const [simulatorPage, setSimulatorPage] = useState("/");
  const [simulatorMode, setSimulatorMode] = useState<"preview" | "editor">("preview");
  const [browserChrome, setBrowserChrome] = useState<"safari" | "fullscreen">("safari");
  const [simulatorDevice, setSimulatorDevice] = useState<"iphone15" | "iphone14" | "iphonese" | "galaxy">("iphone15");
  const [simulatorOrientation, setSimulatorOrientation] = useState<"portrait" | "landscape">("portrait");
  const [simulatorScale, setSimulatorScale] = useState(0.85);
  const [iframeReloadKey, setIframeReloadKey] = useState(1);

  const DEVICE_PRESETS = {
    iphone15: { name: "iPhone 15/16 Pro", width: 393, height: 852, viewportHeight: 710, os: "iOS" },
    iphone14: { name: "iPhone 14 / Standard", width: 390, height: 844, viewportHeight: 700, os: "iOS" },
    iphonese: { name: "iPhone SE / Compact", width: 375, height: 667, viewportHeight: 570, os: "iOS" },
    galaxy: { name: "Samsung Galaxy S24", width: 412, height: 915, viewportHeight: 780, os: "Android" },
  };

  const getIframeUrl = () => {
    const base = simulatorPage.split("?")[0];
    return simulatorMode === "editor" ? `${base}?editor=true` : base;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsNoiseActive(localStorage.getItem("insanos_noise_overlay") === "true");
      const local = localStorage.getItem("insanos_custom_texts");
      const localSync = localStorage.getItem("insanos_last_sync");
      if (localSync) {
        setLastSyncTime(localSync);
      }
      if (local) {
        try {
          const parsed = JSON.parse(local);
          const merged = { ...parsed, ...customTextsData };
          setTexts(merged);
          localStorage.setItem("insanos_custom_texts", JSON.stringify(merged));
        } catch {
          setTexts(customTextsData);
        }
      } else {
        setTexts(customTextsData);
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

  const handleToggleNoise = () => {
    const next = !isNoiseActive;
    setIsNoiseActive(next);
    localStorage.setItem("insanos_noise_overlay", String(next));
    window.dispatchEvent(
      new CustomEvent("insanos_noise_change", { detail: { enabled: next } })
    );
  };

  const filteredEntries = Object.entries(texts).filter(
    ([key, val]) =>
      key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pages = [
    { name: "Página Inicial (Home)", path: "/", desc: "Hero, 4 Pilares, Linha do Tempo, Números Globais" },
    { name: "História & Tradição", path: "/historia", desc: "1922 Copacabana, 2015 Osasco, Linha Expandida" },
    { name: "Comando & Memorial", path: "/comando", desc: "Liderança Executiva, Diretorias e Homenagens" },
    { name: "Impacto Social", path: "/impacto", desc: "Campanhas do Agasalho, Projeto PcD, Sangue" },
    { name: "18News & Mídia", path: "/18news", desc: "Notícias oficiais, matérias e podcasts" },
    { name: "Ecossistema 18", path: "/ecossistema", desc: "Loja Oficial, Rádio Insanos, 18Cast" },
    { name: "Faça Parte", path: "/faca-parte", desc: "Formulário de Alistamento e Quiz de DNA Insano" },
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

          {/* Tab Switcher */}
          <div className="inline-flex bg-[#121316] p-1 rounded-xl border border-white/15">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-1.5 rounded-lg text-xs font-['Anton'] uppercase tracking-wider transition-all ${
                activeTab === "dashboard"
                  ? "bg-[#F2C21B] text-black shadow-md font-bold"
                  : "text-[#AAA8A1] hover:text-white"
              }`}
            >
              📋 Visão Geral & Textos
            </button>
            <button
              onClick={() => setActiveTab("simulator")}
              className={`px-4 py-1.5 rounded-lg text-xs font-['Anton'] uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === "simulator"
                  ? "bg-[#F2C21B] text-black shadow-md font-bold"
                  : "text-[#AAA8A1] hover:text-white"
              }`}
            >
              <span>📱 Simulador Mobile ao Vivo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://insanosmc.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono items-center gap-2 hover:bg-emerald-900/60 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Vercel Produção ↗</span>
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

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* =========================================================================
            ABA 1: SIMULADOR MOBILE INTERATIVO AO VIVO
        ========================================================================= */}
        {activeTab === "simulator" ? (
          <section className="space-y-6 animate-fadeIn">
            {/* Toolbar do Simulador */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#111215] border border-[#F2C21B]/40 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Seletor de Página */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F2C21B] uppercase">Página:</span>
                  <select
                    value={simulatorPage}
                    onChange={(e) => setSimulatorPage(e.target.value)}
                    className="bg-[#0A0A0C] border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-[#F2C21B]"
                  >
                    {pages.map((p) => (
                      <option key={p.path} value={p.path}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Modo de Visualização (Visitante Real vs Editor Visual) */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F2C21B] uppercase">Modo:</span>
                  <div className="inline-flex bg-[#0A0A0C] p-0.5 rounded-lg border border-white/20">
                    <button
                      onClick={() => setSimulatorMode("preview")}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                        simulatorMode === "preview"
                          ? "bg-[#F2C21B] text-black font-bold"
                          : "text-[#AAA8A1] hover:text-white"
                      }`}
                      title="Exibir o site 100% limpo exatamente como o visitante real vê no smartphone"
                    >
                      👁️ Visitante Real
                    </button>
                    <button
                      onClick={() => setSimulatorMode("editor")}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                        simulatorMode === "editor"
                          ? "bg-[#F2C21B] text-black font-bold"
                          : "text-[#AAA8A1] hover:text-white"
                      }`}
                      title="Ativar ferramentas e caixas de edição visual dentro do celular"
                    >
                      ✏️ Editor Visual
                    </button>
                  </div>
                </div>

                {/* Seletor de Dispositivo */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F2C21B] uppercase">Aparelho:</span>
                  <select
                    value={simulatorDevice}
                    onChange={(e) => setSimulatorDevice(e.target.value as any)}
                    className="bg-[#0A0A0C] border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-[#F2C21B]"
                  >
                    {Object.entries(DEVICE_PRESETS).map(([k, dev]) => (
                      <option key={k} value={k}>
                        {dev.name} ({dev.width}×{dev.height}px)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estilo de Navegador (Safari com Barra vs Tela Cheia) */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F2C21B] uppercase">Visual:</span>
                  <select
                    value={browserChrome}
                    onChange={(e) => setBrowserChrome(e.target.value as any)}
                    className="bg-[#0A0A0C] border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-[#F2C21B]"
                  >
                    <option value="safari">Safari (Barra Real iOS)</option>
                    <option value="fullscreen">Tela Cheia (App PWA)</option>
                  </select>
                </div>

                {/* Zoom / Escala */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F2C21B] uppercase">Zoom:</span>
                  <select
                    value={simulatorScale}
                    onChange={(e) => setSimulatorScale(Number(e.target.value))}
                    className="bg-[#0A0A0C] border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-[#F2C21B]"
                  >
                    <option value={1}>100% (Tamanho Real)</option>
                    <option value={0.9}>90%</option>
                    <option value={0.85}>85% (Recomendado)</option>
                    <option value={0.75}>75% (Compacto)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setSimulatorOrientation(simulatorOrientation === "portrait" ? "landscape" : "portrait")
                  }
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5"
                  title="Girar Orientação do Aparelho"
                >
                  <span>🔄 {simulatorOrientation === "portrait" ? "Retrato" : "Paisagem"}</span>
                </button>

                <button
                  onClick={() => setIframeReloadKey((k) => k + 1)}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono transition-colors flex items-center gap-1.5"
                  title="Recarregar tela do celular"
                >
                  <span>⚡ Atualizar</span>
                </button>

                <a
                  href={getIframeUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase text-xs rounded-lg transition-colors flex items-center gap-1.5 font-bold"
                  title="Abrir página em nova aba completa"
                >
                  <span>Abrir em Nova Aba ↗</span>
                </a>
              </div>
            </div>

            {/* Container Central do Mockup do Smartphone */}
            <div className="flex justify-center items-start py-4 overflow-x-auto min-h-[900px]">
              <div
                style={{
                  transform: `scale(${simulatorScale})`,
                  transformOrigin: "top center",
                }}
                className="transition-transform duration-300"
              >
                {(() => {
                  const currentDev = DEVICE_PRESETS[simulatorDevice];
                  const isPortrait = simulatorOrientation === "portrait";
                  const w = isPortrait ? currentDev.width : currentDev.height;
                  const totalH = isPortrait ? currentDev.height : currentDev.width;
                  const isSafari = browserChrome === "safari" && isPortrait;
                  const iframeH = isSafari ? currentDev.viewportHeight : totalH;

                  return (
                    <div
                      style={{ width: `${w + 24}px`, minHeight: `${totalH + 24}px` }}
                      className="p-3 rounded-[50px] bg-gradient-to-b from-[#2A2B30] via-[#141518] to-[#0A0A0C] border-[5px] border-[#3E4048] shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative overflow-hidden flex flex-col items-center justify-between"
                    >
                      {/* Top iOS Status Bar (Print 3 Exact Match) */}
                      {isPortrait && (
                        <div
                          style={{ width: `${w}px` }}
                          className="h-11 bg-black text-white px-7 flex items-center justify-between text-xs font-semibold select-none z-30"
                        >
                          {/* Clock */}
                          <span className="font-mono text-[13px] tracking-tight">15:17</span>

                          {/* Dynamic Island Pill in Center */}
                          <div className="w-28 h-[26px] rounded-full bg-[#050505] border border-white/10 flex items-center justify-end px-3 shadow-inner">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-blue-900/60" />
                          </div>

                          {/* Signal / Wifi / Battery */}
                          <div className="flex items-center gap-1.5 text-[11px] font-mono">
                            <span>5G</span>
                            <span className="text-[10px]">📶</span>
                            <div className="flex items-center gap-0.5 bg-white/20 px-1 py-0.2 rounded text-[10px] font-bold">
                              <span>75</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Side Buttons Visual Accents */}
                      <div className="absolute -left-[6px] top-24 w-[4px] h-10 bg-white/20 rounded-l-sm" />
                      <div className="absolute -left-[6px] top-38 w-[4px] h-12 bg-white/20 rounded-l-sm" />
                      <div className="absolute -right-[6px] top-28 w-[4px] h-14 bg-white/20 rounded-r-sm" />

                      {/* Screen Viewport with Iframe */}
                      <div
                        style={{ width: `${w}px`, height: `${iframeH}px` }}
                        className="overflow-hidden bg-black relative shadow-inner flex-1"
                      >
                        <iframe
                          key={`${getIframeUrl()}-${iframeReloadKey}`}
                          src={getIframeUrl()}
                          title="Simulador Mobile Insanos MC"
                          className="w-full h-full border-0 bg-[#0A0A0A]"
                        />
                      </div>

                      {/* Bottom Safari Navigation Bar (Print 3 Exact Match) */}
                      {isSafari ? (
                        <div
                          style={{ width: `${w}px` }}
                          className="bg-black/95 border-t border-white/10 px-4 py-2.5 flex flex-col items-center gap-1.5 z-30 select-none"
                        >
                          {/* Safari Floating Address Capsule */}
                          <div className="w-full max-w-[280px] bg-[#1C1D22] border border-white/15 rounded-full py-1.5 px-4 flex items-center justify-between text-xs text-white/90 shadow-md">
                            <span className="text-white/40 text-[11px]">🔒</span>
                            <span className="font-mono text-[11.5px] font-medium tracking-tight text-white/95">
                              insanosmc.vercel.app
                            </span>
                            <span
                              onClick={() => setIframeReloadKey((k) => k + 1)}
                              className="text-white/50 hover:text-white cursor-pointer text-xs"
                              title="Recarregar"
                            >
                              ↻
                            </span>
                          </div>

                          {/* Home Gesture Bar */}
                          <div className="w-32 h-1 bg-white/40 rounded-full mt-1" />
                        </div>
                      ) : (
                        /* Standard Home Gesture Bar */
                        <div className="w-full py-2 flex justify-center bg-black">
                          <div className="w-32 h-1 bg-white/40 rounded-full" />
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </section>
        ) : (
          /* =========================================================================
              ABA 2: DASHBOARD GERAL & TEXTOS
          ========================================================================= */
          <>
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
                  O modo de edição visual foi isolado exclusivamente para este painel. Visitantes públicos veem o site limpo e seguro. Clique abaixo para abrir o simulador mobile ou editar no desktop.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab("simulator")}
                    className="px-6 py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase text-sm tracking-wider rounded-xl shadow-[0_0_20px_rgba(242,194,27,0.35)] transition-all flex items-center gap-2"
                  >
                    <span>📱 Abrir Simulador Mobile Interativo</span>
                    <IconArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
                  </button>

                  <a
                    href="/?editor=true"
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-['Anton'] uppercase text-sm tracking-wider rounded-xl border border-white/20 transition-all flex items-center gap-2"
                  >
                    <span>Abrir Editor em Tela Cheia</span>
                  </a>
                </div>
              </div>
            </section>

        {/* Controles de Efeitos Visuais & Experiência */}
        <section className="p-6 rounded-2xl bg-[#111215] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎞️</span>
              <h2 className="font-['Anton'] text-xl uppercase text-white tracking-wide">
                Efeito Visual: Granulação de Filme (Noise Overlay)
              </h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  isNoiseActive
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "bg-white/10 text-white/50 border border-white/10"
                }`}
              >
                {isNoiseActive ? "Ativado" : "Desativado"}
              </span>
            </div>
            <p className="text-xs text-[#AAA8A1] max-w-2xl leading-relaxed">
              Sobreposição cinematográfica procedural de granulação de filme sobre o viewport. Ative para testar a estética vintage escura ou desative a qualquer momento.
            </p>
          </div>

          <button
            onClick={handleToggleNoise}
            className={`px-6 py-3.5 rounded-xl font-['Anton'] uppercase text-xs tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              isNoiseActive
                ? "bg-[#F2C21B] text-black shadow-[0_0_20px_rgba(242,194,27,0.4)] hover:bg-[#ffe053]"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
          >
            <span>{isNoiseActive ? "✓ Desativar Granulação" : "▶ Ativar Granulação (Noise)"}</span>
          </button>
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
      </>
    )}
  </main>
</div>
);
}
