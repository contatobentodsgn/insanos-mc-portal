"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { IconSearch } from "../components/ui/Icons";
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

      <main>
        {/* Header Hero */}
        <section className="py-20 sm:py-28 bg-[#0E0F12] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#F2C21B]" />
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  18News Revista Digital
                </span>
              </div>
              <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6">
                A irmandade<br />
                <span className="text-[#F2C21B]">em movimento.</span>
              </h1>
              <p className="text-base sm:text-xl text-[#C7C5BF] leading-relaxed">
                Cobertura oficial de expedições, grandes encontros, podcast 18Cast, relatórios de ações sociais e o dia a dia das nossas facções pelo mundo.
              </p>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="py-8 bg-[#121316] border-b border-white/10 sticky top-[69px] z-30 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTag(cat)}
                  className={`px-4 py-2 rounded-lg text-xs uppercase font-bold tracking-wider transition-all ${
                    selectedTag === cat
                      ? "bg-[#F2C21B] text-black shadow-md"
                      : "bg-[#1B1D22] text-white/70 hover:bg-[#252830] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full md:w-80">
              <input
                type="text"
                placeholder="Buscar reportagem..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/20 rounded-lg px-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#F2C21B]"
              />
            </div>
          </div>
        </section>

        {/* Featured Story & Articles Grid */}
        <section className="py-16 sm:py-24 bg-[#0A0A0B]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            {/* Featured Item */}
            {selectedTag === "Todas" && !searchQuery && (
              <div className="mb-16">
                <Link
                  href={`/18news/${featured.slug}`}
                  className="block bg-[#141519] border border-white/10 rounded-2xl overflow-hidden hover:border-[#F2C21B]/60 transition-all group shadow-2xl"
                >
                  <div className="grid lg:grid-cols-12">
                    <div
                      className="lg:col-span-7 h-80 lg:h-[450px] bg-cover bg-center"
                      style={{ backgroundImage: `url(${featured.image})` }}
                    />
                    <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-[#F2C21B] text-black font-extrabold text-xs uppercase rounded">
                            {featured.tag}
                          </span>
                          <span className="text-xs text-[#AAA8A1] font-mono">{featured.date} · {featured.readTime}</span>
                        </div>
                        <h2 className="font-['Anton'] text-3xl sm:text-4xl lg:text-5xl uppercase text-white leading-tight mb-4 group-hover:text-[#F2C21B] transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-sm text-[#C7C5BF] leading-relaxed mb-6">
                          {featured.desc}
                        </p>
                      </div>
                      <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-wider flex items-center gap-2">
                        Ler Reportagem Completa →
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
                        <p className="text-xs text-[#AAA8A1] line-clamp-3 leading-relaxed mb-4">
                          {art.desc}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#AAA8A1]">
                      <span>{art.readTime}</span>
                      <span className="text-[#F2C21B] font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                        Acessar →
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
        </section>

      </main>

      <Footer />
    </div>
  );
}
