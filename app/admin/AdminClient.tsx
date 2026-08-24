"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IconArrowRight, IconCheck } from "../components/ui/Icons";
import { SITE_TEXT_CATALOG } from "../data/siteTexts";
import customTextsData from "../data/customContent.json";

export function AdminClient() {
  const [texts, setTexts] = useState<Record<string, string>>(customTextsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState<string>("ALL");
  const [copied, setCopied] = useState(false);
  const [savedKeySuccess, setSavedKeySuccess] = useState<string | null>(null);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Mobile Simulator States
  const [activeTab, setActiveTab] = useState<"dashboard" | "simulator">("dashboard");
  const [simulatorPage, setSimulatorPage] = useState("/");
  const [simulatorMode, setSimulatorMode] = useState<"preview" | "editor">("editor");
  const [simulatorDevice, setSimulatorDevice] = useState<"iphone15" | "iphone14" | "iphonese" | "galaxy">("iphone15");
  const [simulatorScale, setSimulatorScale] = useState(0.85);
  const [iframeReloadKey, setIframeReloadKey] = useState(1);

  const DEVICE_PRESETS = {
    iphone15: { name: "iPhone 15/16 Pro", width: 393, height: 852, viewportHeight: 710, os: "iOS" },
    iphone14: { name: "iPhone 14 / Standard", width: 390, height: 844, viewportHeight: 700, os: "iOS" },
    iphonese: { name: "iPhone SE / Compact", width: 375, height: 667, viewportHeight: 570, os: "iOS" },
    galaxy: { name: "Samsung Galaxy S24", width: 412, height: 915, viewportHeight: 780, os: "Android" },
  };

  const pages = [
    { name: "Página Inicial (Home)", path: "/", desc: "Hero, 4 Pilares, Linha do Tempo, Ações Sociais, Liderança" },
    { name: "História & Tradição", path: "/historia", desc: "1922 Copacabana, 2015 Osasco, Linha Expandida" },
    { name: "Comando & Memorial", path: "/comando", desc: "Liderança Executiva, Diretorias e Memorial" },
    { name: "Impacto Social", path: "/impacto", desc: "Campanhas do Agasalho, Projeto PcD, Sangue, Combate" },
    { name: "18News & Mídia", path: "/18news", desc: "Notícias oficiais, matérias e lançamentos" },
    { name: "Ecossistema 18", path: "/ecossistema", desc: "Loja Oficial, Rádio Insanos, 18Cast" },
    { name: "Faça Parte", path: "/faca-parte", desc: "Formulário de Alistamento e Quiz de DNA Insano" },
  ];

  const getIframeUrl = () => {
    const base = simulatorPage.split("?")[0];
    return simulatorMode === "editor" ? `${base}?admin=true&editor=true` : `${base}?admin=true`;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("insanos_admin_active", "true");

      const local = localStorage.getItem("insanos_custom_texts");
      const localSync = localStorage.getItem("insanos_last_sync");
      if (localSync) {
        setLastSyncTime(localSync);
      }

      // Fetch latest from API
      fetch("/api/save-content")
        .then((res) => res.json())
        .then((serverData) => {
          if (serverData && typeof serverData === "object" && Object.keys(serverData).length > 0) {
            const localParsed = local ? JSON.parse(local) : {};
            const merged = { ...customTextsData, ...localParsed, ...serverData };
            setTexts(merged);
            localStorage.setItem("insanos_custom_texts", JSON.stringify(merged));
          } else if (local) {
            try {
              const parsed = JSON.parse(local);
              const merged = { ...customTextsData, ...parsed };
              setTexts(merged);
            } catch {
              setTexts(customTextsData);
            }
          }
        })
        .catch(() => {
          if (local) {
            try {
              setTexts(JSON.parse(local));
            } catch {
              setTexts(customTextsData);
            }
          }
        });
    }
  }, []);

  const handleStartEdit = (key: string, currentVal: string) => {
    setEditingKey(key);
    setEditValue(currentVal);
  };

  const handleSaveItem = async (key: string, value: string) => {
    const updated = { ...texts, [key]: value };
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
        body: JSON.stringify(updated),
      });
      setSavedKeySuccess(key);
      setTimeout(() => setSavedKeySuccess(null), 3000);
    } catch {
      // ignore
    }
  };

  const handleResetToClean = async () => {
    if (window.confirm("Deseja ZERAR todas as alterações e restaurar os textos originais do código?")) {
      localStorage.removeItem("insanos_custom_texts");
      localStorage.removeItem("insanos_last_sync");
      setTexts({});
      setLastSyncTime(null);

      try {
        await fetch("/api/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
      } catch {
        // ignore
      }

      alert("Todas as alterações foram zeradas com sucesso! O portal voltou ao padrão original.");
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
    a.download = `insanos_textos_backup_${new Date().toISOString().slice(0, 10)}.json`;
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
            body: JSON.stringify(parsed),
          });

          alert("Backup restaurado com sucesso!");
        }
      } catch {
        alert("Erro ao ler o arquivo JSON de backup. Certifique-se de que é um formato válido.");
      }
    };
    reader.readAsText(file);
  };

  // Section categories
  const sections = Array.from(new Set(SITE_TEXT_CATALOG.map((item) => item.section)));

  const filteredCatalog = SITE_TEXT_CATALOG.filter((item) => {
    const matchesSection = selectedSection === "ALL" || item.section === selectedSection;
    const currentVal = texts[item.key] || item.defaultValue;
    const matchesSearch =
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      currentVal.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSection && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans antialiased selection:bg-[#F2C21B] selection:text-black">
      {/* Top Header */}
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
            <span className="px-2.5 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] font-mono text-xs font-bold uppercase tracking-wider border border-[#F2C21B]/30">
              Painel Administrativo
            </span>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex bg-[#121316] p-1 rounded-xl border border-white/15">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-1.5 rounded-lg text-xs font-['Anton'] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-[#F2C21B] text-black shadow-md font-bold"
                  : "text-[#AAA8A1] hover:text-white"
              }`}
            >
              ✍️ Gerenciador de Textos
            </button>
            <button
              onClick={() => setActiveTab("simulator")}
              className={`px-4 py-1.5 rounded-lg text-xs font-['Anton'] uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
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
              href="/?editor=true"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-[#F2C21B]/15 border border-[#F2C21B]/40 text-[#F2C21B] text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#F2C21B]/25 transition-colors cursor-pointer"
            >
              <span>✏️ Abrir Editor na Home ↗</span>
            </a>

            <button
              onClick={handleResetToClean}
              className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1"
              title="Zerar todas as alterações e restaurar padrão do código"
            >
              <span>🗑️ Zerar Alterações</span>
            </button>

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

                {/* Modo de Visualização */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F2C21B] uppercase">Modo:</span>
                  <div className="inline-flex bg-[#0A0A0C] p-0.5 rounded-lg border border-white/20">
                    <button
                      onClick={() => setSimulatorMode("preview")}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                        simulatorMode === "preview"
                          ? "bg-[#F2C21B] text-black font-bold"
                          : "text-[#AAA8A1] hover:text-white"
                      }`}
                    >
                      👁️ Visitante
                    </button>
                    <button
                      onClick={() => setSimulatorMode("editor")}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                        simulatorMode === "editor"
                          ? "bg-[#F2C21B] text-black font-bold"
                          : "text-[#AAA8A1] hover:text-white"
                      }`}
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

                {/* Zoom */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#F2C21B] uppercase">Zoom:</span>
                  <select
                    value={simulatorScale}
                    onChange={(e) => setSimulatorScale(Number(e.target.value))}
                    className="bg-[#0A0A0C] border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white font-medium focus:outline-none focus:border-[#F2C21B]"
                  >
                    <option value={0.75}>75%</option>
                    <option value={0.85}>85%</option>
                    <option value={1.0}>100% (Real)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIframeReloadKey((k) => k + 1)}
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>↻ Recarregar</span>
                </button>

                <a
                  href={`${simulatorPage}?editor=true`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase text-xs rounded-lg transition-colors flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span>Abrir Tela Cheia ↗</span>
                </a>
              </div>
            </div>

            {/* Viewport do Smartphone */}
            <div className="py-8 flex justify-center items-center overflow-x-auto min-h-[820px] bg-[#070809] rounded-2xl border border-white/10">
              {(() => {
                const dev = DEVICE_PRESETS[simulatorDevice];
                const w = dev.width;
                const h = dev.height;

                return (
                  <div
                    style={{
                      transform: `scale(${simulatorScale})`,
                      transformOrigin: "top center",
                      width: `${w}px`,
                      height: `${h}px`,
                    }}
                    className="relative rounded-[48px] bg-black p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_0_2px_#333,0_0_0_6px_#1c1c1e] shrink-0 transition-all flex flex-col justify-between overflow-hidden"
                  >
                    {/* Dynamic Island */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-between px-3 border border-white/10 shadow-lg pointer-events-none">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0a2540]/80" />
                    </div>

                    {/* Iframe */}
                    <div className="w-full h-full rounded-[36px] overflow-hidden bg-[#0A0A0A] relative z-10">
                      <iframe
                        key={iframeReloadKey}
                        src={getIframeUrl()}
                        title="Simulador Mobile Insanos MC"
                        className="w-full h-full border-0 bg-[#0A0A0A]"
                      />
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>
        ) : (
          /* =========================================================================
              ABA 2: DASHBOARD GERAL & TEXTOS
          ========================================================================= */
          <>
            {/* Quick Action Hero Banner */}
            <section className="p-8 rounded-2xl bg-gradient-to-r from-[#14161B] via-[#121316] to-[#0E0F12] border border-[#F2C21B]/40 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] text-xs font-mono font-bold uppercase tracking-wider border border-[#F2C21B]/30">
                  <span className="w-2 h-2 rounded-full bg-[#F2C21B] animate-ping" />
                  <span>Editor de Textos & Gestão Visual</span>
                </div>
                <h1 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-tight">
                  Ajuste qualquer texto do portal em tempo real
                </h1>
                <p className="text-[#C7C5BF] text-sm sm:text-base leading-relaxed">
                  Você pode editar os textos diretamente na tabela organizada por seções abaixo, ou abrir qualquer página no modo de edição visual direto na tela.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <a
                    href="/?editor=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase text-sm tracking-wider rounded-xl shadow-[0_0_20px_rgba(242,194,27,0.35)] transition-all flex items-center gap-2 cursor-pointer font-bold"
                  >
                    <span>✏️ Abrir Editor Visual na Home ↗</span>
                    <IconArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
                  </a>

                  <button
                    onClick={() => setActiveTab("simulator")}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-['Anton'] uppercase text-sm tracking-wider rounded-xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>📱 Abrir Simulador Mobile</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Quick Links por Página */}
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
                    href={`${p.path}?editor=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-xl bg-[#111215] border border-white/10 hover:border-[#F2C21B] transition-all group hover:-translate-y-0.5 cursor-pointer block"
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

            {/* Gerenciador de Textos por Seção */}
            <section className="p-8 rounded-2xl bg-[#111215] border border-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#F2C21B]" />
                    <h2 className="font-['Anton'] text-2xl uppercase text-white">
                      Catálogo de Textos do Portal ({filteredCatalog.length} Textos)
                    </h2>
                  </div>
                  <p className="text-xs text-[#AAA8A1]">
                    Edite os textos principais com salvamento instantâneo.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {lastSyncTime && (
                    <span className="text-[11px] font-mono text-[#AAA8A1] bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                      Última sincronização: <strong className="text-[#F2C21B]">{lastSyncTime}</strong>
                    </span>
                  )}

                  <button
                    onClick={handleCopyJSON}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>{copied ? "✓ Copiado!" : "📋 Copiar JSON"}</span>
                  </button>

                  <button
                    onClick={handleDownloadJSON}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>📥 Baixar Backup</span>
                  </button>

                  <button
                    onClick={handleResetToClean}
                    className="px-3.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-mono text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>🗑️ Zerar Alterações</span>
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

              {/* Filtros de Seção & Pesquisa */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSection("ALL")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                      selectedSection === "ALL"
                        ? "bg-[#F2C21B] text-black shadow-md"
                        : "bg-[#0E0F12] text-[#AAA8A1] border border-white/10 hover:text-white"
                    }`}
                  >
                    Todos ({SITE_TEXT_CATALOG.length})
                  </button>
                  {sections.map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setSelectedSection(sec)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                        selectedSection === sec
                          ? "bg-[#F2C21B] text-black shadow-md"
                          : "bg-[#0E0F12] text-[#AAA8A1] border border-white/10 hover:text-white"
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Buscar por título, chave ou conteúdo do texto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0A0A0B] border border-white/15 rounded-xl text-sm text-white placeholder:text-[#666] focus:outline-none focus:border-[#F2C21B]"
                  />
                </div>
              </div>

              {/* Lista de Cards de Textos */}
              <div className="grid gap-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCatalog.map((item) => {
                  const currentValue = texts[item.key] || item.defaultValue;
                  const isBeingEdited = editingKey === item.key;
                  const isSavedNow = savedKeySuccess === item.key;

                  return (
                    <div
                      key={item.key}
                      className="p-5 rounded-xl bg-[#0E0F12] border border-white/10 hover:border-white/20 transition-all space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-[#F2C21B]/15 text-[#F2C21B] font-mono text-[11px] font-bold uppercase">
                              {item.section}
                            </span>
                            <span className="text-xs font-mono text-[#AAA8A1]">
                              Página: <strong className="text-white">{item.page}</strong>
                            </span>
                          </div>
                          <h4 className="font-['Anton'] text-lg uppercase text-white mt-1">
                            {item.label}
                          </h4>
                          {item.description && (
                            <p className="text-xs text-[#AAA8A1]">{item.description}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {isSavedNow && (
                            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                              <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                              Salvo com sucesso!
                            </span>
                          )}

                          {!isBeingEdited ? (
                            <button
                              onClick={() => handleStartEdit(item.key, currentValue)}
                              className="px-4 py-2 bg-white/10 hover:bg-[#F2C21B] hover:text-black rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
                            >
                              ✏️ Editar Texto
                            </button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSaveItem(item.key, editValue)}
                                className="px-4 py-2 bg-[#F2C21B] text-black font-bold rounded-lg text-xs font-mono transition-all cursor-pointer shadow-md"
                              >
                                💾 Salvar Alteração
                              </button>
                              <button
                                onClick={() => setEditingKey(null)}
                                className="px-3 py-2 bg-white/10 text-white rounded-lg text-xs font-mono cursor-pointer"
                              >
                                Cancelar
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {isBeingEdited ? (
                        <div className="space-y-2">
                          <textarea
                            rows={4}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full p-3.5 bg-[#070809] border border-[#F2C21B] rounded-xl text-sm text-white focus:outline-none font-sans leading-relaxed shadow-inner"
                          />
                          <div className="flex items-center justify-between text-xs text-[#AAA8A1] font-mono">
                            <span>{editValue.length} caracteres</span>
                            <button
                              onClick={() => setEditValue(item.defaultValue)}
                              className="text-amber-400 hover:underline cursor-pointer"
                            >
                              Restaurar texto original padrão
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-lg bg-[#070809] border border-white/5 text-sm text-[#DDD] leading-relaxed">
                          {currentValue}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
