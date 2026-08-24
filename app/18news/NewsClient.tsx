"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { IconSearch, IconArrowRight } from "../components/ui/Icons";
import { ARTICLES_DATA } from "../data/articles";

export function NewsClient() {
  const [selectedTag, setSelectedTag] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Todas",
    "Motos & Lançamentos",
    "Eventos",
    "Expedições",
    "Ação Social",
    "18Cast",
    "18Store",
    "Rádio Insanos",
  ];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchTag = selectedTag === "Todas" || art.tag === selectedTag;
      const matchSearch =
        searchQuery.trim() === "" ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tag.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTag && matchSearch;
    });
  }, [selectedTag, searchQuery]);

  const featured = ARTICLES_DATA[0];
  const isDefaultView = selectedTag === "Todas" && !searchQuery.trim();
  const secondaryArticles = isDefaultView
    ? filteredArticles.filter((art) => art.slug !== featured.slug)
    : filteredArticles;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans">
      <Navbar />

      <main className="py-24 sm:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C21B] via-[#FFD700] to-[#B88E07] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
              <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                Revista & Comunicação Oficial
              </span>
            </div>
            <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6 tracking-[-0.015em] sm:tracking-[-0.02em]">
              18<span className="text-[#F2C21B]">News.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#D4D1CA] font-medium leading-relaxed">
              Lançamentos e novidades do mundo das duas rodas, grandes eventos no asfalto, expedições internacionais, bastidores do 18Cast e comunicados oficiais.
            </p>
          </div>

          {/* Search & Categories Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between pb-8 mb-12 border-b border-white/10">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto" role="group" aria-label="Filtrar por categoria editorial">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTag(cat)}
                  aria-pressed={selectedTag === cat}
                  className={`px-4 py-2 rounded-[2px] text-xs uppercase font-bold tracking-wider transition-all duration-200 cursor-pointer border ${
                    selectedTag === cat
                      ? "bg-[#F2C21B] text-black border-[#FFE066] shadow-[0_0_15px_rgba(242,194,27,0.3)] font-extrabold scale-105"
                      : "bg-[#141518] text-white/70 hover:text-white hover:bg-white/5 border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input with visual icon */}
            <div className="relative w-full lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Buscar notícias, expedições ou tags"
                placeholder="Buscar notícias, expedições ou tags..."
                className="w-full bg-[#121316] border border-white/10 rounded-[2px] pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#F2C21B] focus:outline-none transition-colors"
              />
              <IconSearch className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Featured Headline Master Article (shown in default view) */}
          {isDefaultView && featured && (
            <div className="mb-16">
              <Link
                href={`/18news/${featured.slug}`}
                className="block group bg-[#111215] border-2 border-t-white/20 border-b-white/5 border-x-white/10 rounded-[2px] overflow-hidden hover:border-[#F2C21B]/50 transition-all duration-300 shadow-2xl hover-lift"
              >
                <div className="grid lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-7 h-80 sm:h-96 lg:h-[460px] overflow-hidden relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${featured.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-black/20 to-transparent lg:hidden" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-[2px] bg-[#F2C21B] text-black text-xs font-mono font-extrabold uppercase tracking-wider shadow-lg">
                        Reportagem de Capa
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-[#111215] relative z-10">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
                        <span className="px-2.5 py-0.5 rounded-[2px] bg-white/10 text-white font-mono font-bold uppercase">
                          {featured.tag}
                        </span>
                        <span className="text-[#AAA8A1] font-mono">{featured.date}</span>
                        <span className="text-[#F2C21B] font-mono">• {featured.readTime}</span>
                      </div>

                      <h2 className="font-['Anton'] text-2xl sm:text-4xl uppercase text-white leading-tight mb-4 group-hover:text-[#F2C21B] transition-colors">
                        {featured.title}
                      </h2>

                      <p className="text-sm sm:text-base text-[#C7C5BF] leading-relaxed mb-6 font-medium">
                        {featured.desc}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-[#AAA8A1] font-mono">Por {featured.author}</span>
                      <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-wider inline-flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        <span>Ler Reportagem Completa</span>
                        <IconArrowRight className="w-3.5 h-3.5 text-[#F2C21B]" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Section Sub-heading for Grid */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-['Anton'] text-xl sm:text-2xl uppercase text-white tracking-wide">
              {isDefaultView ? "Outras Matérias & Reportagens" : `Resultados (${filteredArticles.length})`}
            </h3>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-[#F2C21B] hover:underline font-mono"
              >
                Limpar busca
              </button>
            )}
          </div>

          {/* Articles Grid (Without duplicating the featured article) */}
          {secondaryArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300">
              {secondaryArticles.map((art) => (
                <Link
                  key={art.slug}
                  href={`/18news/${art.slug}`}
                  className="bg-[#121316] border-2 border-t-white/15 border-b-white/5 border-x-white/10 rounded-[2px] overflow-hidden hover:border-[#F2C21B]/50 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    <div className="h-52 overflow-hidden relative">
                      <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${art.image})` }}
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-[2px] bg-black/75 text-[#F2C21B] font-mono text-xs font-bold uppercase tracking-wider border border-white/10">
                          {art.tag}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-3 text-xs font-mono text-[#AAA8A1]">
                        <span>{art.date}</span>
                        <span>{art.readTime}</span>
                      </div>

                      <h4 className="font-['Anton'] text-xl uppercase text-white mb-3 group-hover:text-[#F2C21B] transition-colors leading-snug">
                        {art.title}
                      </h4>

                      <p className="text-xs text-[#C7C5BF] line-clamp-3 leading-relaxed mb-4">
                        {art.desc}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#AAA8A1]">
                    <span className="text-xs font-mono">Por {art.author}</span>
                    <span className="text-[#F2C21B] font-bold uppercase tracking-wider inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Ler Matéria</span>
                      <IconArrowRight className="w-3.5 h-3.5 text-[#F2C21B]" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#121316] border-2 border-white/10 rounded-[2px] max-w-xl mx-auto">
              <IconSearch className="w-10 h-10 text-[#F2C21B] mx-auto mb-3" />
              <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2">Nenhuma matéria encontrada</h3>
              <p className="text-xs text-[#AAA8A1] mb-6">Não encontramos publicações para a sua seleção.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("Todas");
                }}
                className="px-6 py-2.5 bg-[#F2C21B] text-black font-bold uppercase text-xs rounded-[2px] border-2 border-[#F2C21B] hover:bg-[#ffe053] transition-colors cursor-pointer"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
