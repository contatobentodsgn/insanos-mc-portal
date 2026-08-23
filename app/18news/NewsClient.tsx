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

  const categories = ["Todas", "Eventos", "Expedições", "Ação Social", "18Cast"];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchTag = selectedTag === "Todas" || art.tag === selectedTag;
      const matchSearch =
        searchQuery.trim() === "" ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTag && matchSearch;
    });
  }, [selectedTag, searchQuery]);

  const featured = ARTICLES_DATA[0];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans">
      <Navbar />

      <main className="py-24 sm:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#F2C21B]" />
              <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                Portal de Notícias & Comunicação
              </span>
            </div>
            <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6">
              18<span className="text-[#F2C21B]">News.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#C7C5BF] leading-relaxed">
              Cobertura oficial das ações sociais, grandes expedições internacionais, bastidores dos podcasts e comunicados da diretoria mundial.
            </p>
          </div>

          {/* Search & Categories Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-8 mb-12 border-b border-white/10">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTag(cat)}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-bold tracking-wider transition-colors duration-150 ${
                    selectedTag === cat
                      ? "bg-[#F2C21B] text-black"
                      : "bg-[#121316] text-[#AAA8A1] hover:text-white border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input with visual icon */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar notícias ou tags..."
                className="w-full bg-[#121316] border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#F2C21B] focus:outline-none"
              />
              <IconSearch className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Featured Headline Article (shown only when 'Todas' is active and no search) */}
          {selectedTag === "Todas" && !searchQuery && (
            <div className="mb-16">
              <Link
                href={`/18news/${featured.slug}`}
                className="block group bg-[#121316] border border-white/10 rounded-2xl overflow-hidden hover:border-[#F2C21B]/50 transition-all duration-300 shadow-2xl"
              >
                <div className="grid lg:grid-cols-12 gap-0">
                  <div
                    className="lg:col-span-7 h-72 sm:h-96 lg:h-auto bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${featured.image})` }}
                  />
                  <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs uppercase font-extrabold px-3 py-1 bg-[#F2C21B] text-black rounded font-mono">
                          {featured.tag}
                        </span>
                        <span className="text-xs text-white/50 font-mono">{featured.date}</span>
                      </div>
                      <h2 className="font-['Anton'] text-3xl sm:text-4xl lg:text-5xl uppercase text-white leading-tight mb-4 group-hover:text-[#F2C21B] transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-sm text-[#C7C5BF] leading-relaxed mb-6">
                        {featured.desc}
                      </p>
                    </div>
                    <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-wider inline-flex items-center gap-2">
                      <span>Ler Reportagem Completa</span>
                      <IconArrowRight className="w-3.5 h-3.5 text-[#F2C21B] group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Articles Grid with smooth transitions */}
          {filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300">
              {filteredArticles.map((art) => (
                <Link
                  key={art.slug}
                  href={`/18news/${art.slug}`}
                  className="bg-[#121316] border border-white/10 rounded-xl overflow-hidden hover:border-[#F2C21B]/50 transition-all flex flex-col justify-between group transform hover:-translate-y-1 shadow-lg"
                >
                  <div>
                    <div
                      className="h-52 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${art.image})` }}
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs uppercase font-bold text-[#F2C21B]">{art.tag}</span>
                        <span className="text-[11px] text-white/40 font-mono">{art.date}</span>
                      </div>
                      <h3 className="font-['Anton'] text-2xl uppercase text-white mb-3 group-hover:text-[#F2C21B] transition-colors leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-[#C7C5BF] line-clamp-3 leading-relaxed mb-4">
                        {art.desc}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#AAA8A1]">
                    <span>{art.readTime}</span>
                    <span className="text-[#F2C21B] font-bold uppercase tracking-wider inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Acessar</span>
                      <IconArrowRight className="w-3.5 h-3.5 text-[#F2C21B]" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#121316] border border-white/10 rounded-2xl max-w-xl mx-auto">
              <IconSearch className="w-10 h-10 text-[#F2C21B] mx-auto mb-3" />
              <h3 className="font-['Anton'] text-2xl uppercase text-white mb-2">Nenhuma matéria encontrada</h3>
              <p className="text-xs text-[#AAA8A1] mb-6">Não encontramos resultados para sua busca "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("Todas");
                }}
                className="px-6 py-2.5 bg-[#F2C21B] text-black font-bold uppercase text-xs rounded"
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
