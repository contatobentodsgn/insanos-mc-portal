"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconPin, IconClose } from "./ui/Icons";

export interface GalleryItem {
  file: string;
  title: string;
  category: "Ações Sociais" | "Comboios & Asfalto" | "Eventos & Sedes";
  description: string;
  location?: string;
  date?: string;
}

export const OFFICIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    file: "/images/gallery/acao_pcd_inclusao_2024.jpg",
    title: "2º Evento Nacional PcD Insanos MC",
    category: "Ações Sociais",
    description: "Grande marco de inclusão no motoclubismo brasileiro reunindo centenas de triciclos adaptados, voluntários e famílias assistidas.",
    location: "São Paulo / Nacional",
    date: "Dezembro 2024",
  },
  {
    file: "/images/gallery/comboio_estrada_oficial.jpg",
    title: "Grande Comboio Rodoviário",
    category: "Comboios & Asfalto",
    description: "Disciplina marcial, alinhamento rigoroso e segurança em marcha coletiva pelas principais rodovias do país.",
    location: "Rodovia Castelo Branco / SP",
    date: "Oficial Insanos",
  },
  {
    file: "/images/gallery/acao_social_alimentos.jpg",
    title: "Caravana da Solidariedade & Alimentos",
    category: "Ações Sociais",
    description: "Entrega direta de cestas básicas e donativos essenciais nas portas de centenas de famílias em comunidades vulneráveis.",
    location: "Distribuição Nacional",
    date: "Ação Consolidada",
  },
  {
    file: "/images/gallery/acao_social_entregas_noturnas.jpg",
    title: "Ação Noturna: Marmitas & Agasalhos",
    category: "Ações Sociais",
    description: "Equipes de voluntários nas ruas durante a madrugada entregando refeições quentes e cobertores a pessoas em situação de rua.",
    location: "Capitais & Regiões Metropolitanas",
    date: "Inverno Solidário",
  },
  {
    file: "/images/gallery/homenagem_motociclista.jpg",
    title: "Tributo & Respeito às Raízes",
    category: "Eventos & Sedes",
    description: "Homenagem aos pioneiros e veteranos que moldaram os princípios de lealdade, honra e fraternidade no asfalto.",
    location: "Matriz Insanos MC",
    date: "Acervo Histórico",
  },
  {
    file: "/images/gallery/acao_inclusao_criancas.jpg",
    title: "Projeto de Acolhimento Social",
    category: "Ações Sociais",
    description: "Apoio e suporte contínuo a crianças e jovens em comunidades periféricas através do esporte e solidariedade.",
    location: "Diretoria Social",
    date: "Campanha Contínua",
  },
  {
    file: "/images/gallery/acao_social_integrantes.jpg",
    title: "Irmandade Unida em Força-Tarefa",
    category: "Ações Sociais",
    description: "Mobilização em massa de integrantes uniformizados dedicando seu tempo livre para servir à comunidade.",
    location: "Sedes Regionais",
    date: "Ação Social Coletiva",
  },
  {
    file: "/images/gallery/estrada_horizonte.jpg",
    title: "Estrada Sem Fronteiras",
    category: "Comboios & Asfalto",
    description: "A essência pura do motoclubismo: quilômetros de asfalto aberto, respeito mútuo e irmandade inquebrável.",
    location: "Rotas Nacionais",
    date: "Expedições Oficiais",
  },
  {
    file: "/images/gallery/acao_social_doacao_familias.jpg",
    title: "Suporte Direto às Famílias",
    category: "Ações Sociais",
    description: "Atendimento humanitário em bairros de extrema carência com distribuição de alimentos e agasalhos.",
    location: "Ação Comunitária",
    date: "Diretoria de Ação Social",
  },
  {
    file: "/images/gallery/comando_reuniao.jpg",
    title: "Comando Geral & Lideranças",
    category: "Eventos & Sedes",
    description: "Alinhamento estratégico com presidentes e diretores de facções de todo o território nacional e internacional.",
    location: "Encontro de Liderança",
    date: "Convenção Anual",
  },
  {
    file: "/images/gallery/encontro_irmandade_2024.jpg",
    title: "Encontro de Facções & Capítulos",
    category: "Eventos & Sedes",
    description: "Confraternização oficial entre integrantes de diferentes estados fortalecendo a rede mundial de capítulos.",
    location: "Encontro Oficial",
    date: "Novembro 2024",
  },
  {
    file: "/images/gallery/acao_social_voluntarios.jpg",
    title: "Triagem & Montagem de Donativos",
    category: "Ações Sociais",
    description: "Logística impecável de separação de roupas de frio, sapatos e alimentos arrecadados em campanhas oficiais.",
    location: "Centro de Distribuição Social",
    date: "Força-Tarefa Anual",
  },
  {
    file: "/images/gallery/asfalto_estrada.jpg",
    title: "Tradição do Asfalto",
    category: "Comboios & Asfalto",
    description: "Marca registrada dos Insanos MC: lealdade forjada na rodovia sob chuva, sol e vento.",
    location: "Estradas Brasileiras",
    date: "Tradição Viva",
  },
  {
    file: "/images/gallery/transmissao_oficial.jpg",
    title: "Conexão Global Insanos",
    category: "Eventos & Sedes",
    description: "Transmissões e celebrações oficiais integrando os mais de 480 capítulos ao redor do planeta.",
    location: "Estúdio Rádio Insanos",
    date: "Ao Vivo & Global",
  },
];

const CATEGORIES = ["Todas", "Ações Sociais", "Comboios & Asfalto", "Eventos & Sedes"] as const;

export function SocialProofGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("Todas");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const filteredItems = OFFICIAL_GALLERY_ITEMS.filter((item) =>
    activeCategory === "Todas" ? true : item.category === activeCategory
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") {
        setSelectedPhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev > 0 ? prev - 1 : filteredItems.length - 1) : null
        );
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev < filteredItems.length - 1 ? prev + 1 : 0) : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredItems.length]);

  return (
    <section id="galeria" className="py-20 sm:py-28 bg-[#090A0D] border-b border-white/10 relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F2C21B]/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-white/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#F2C21B]" />
              <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                Prova Social & Acervo Fotográfico
              </p>
            </div>
            <h2 className="font-['Anton'] uppercase text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none mb-3">
              Somos Loucos Uns Pelos Outros
            </h2>
            <p className="text-sm sm:text-base text-[#D4D1CA] font-medium leading-relaxed">
              Registros reais da nossa irmandade na estrada e nas maiores ações sociais do motoclubismo mundial.
            </p>
          </div>

          {/* Instagram Social Proof Link Badge */}
          <a
            href="https://www.instagram.com/insanosmc_oficial"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto px-5 py-3 rounded-[2px] bg-[#14161D] border border-white/15 hover:border-[#F2C21B] text-white hover:text-[#F2C21B] transition-all flex items-center gap-2.5 group shadow-lg cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              @insanosmc_oficial
            </span>
            <span className="font-sans text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#F2C21B]">
              ↗
            </span>
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-8 -mx-1 px-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedPhotoIndex(null);
              }}
              className={`px-4 sm:px-6 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer border ${
                activeCategory === cat
                  ? "bg-[#F2C21B] text-black border-[#F2C21B] shadow-[0_0_15px_rgba(242,194,27,0.4)] font-extrabold"
                  : "bg-[#14161D]/80 backdrop-blur-md text-white/70 hover:text-white border-white/10 hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="text-xs font-mono text-white/40 ml-auto hidden sm:inline">
            {filteredItems.length} Registros Oficiais
          </span>
        </div>

        {/* Responsive Gallery Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.file}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative rounded-[2px] overflow-hidden bg-[#14161D] border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/70 shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <Image
                  src={item.file}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105 group-hover:filter group-hover:brightness-105"
                  loading="lazy"
                />

                {/* Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badge: Category */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-[2px] bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold uppercase text-[#F2C21B] tracking-wider">
                  {item.category}
                </div>

                {/* Top Right Zoom Icon */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-[2px] bg-black/70 backdrop-blur-md border border-white/15 text-white/80 group-hover:text-[#F2C21B] group-hover:border-[#F2C21B]/40 flex items-center justify-center text-xs transition-all opacity-0 group-hover:opacity-100">
                  🔍
                </div>
              </div>

              {/* Text Card Content */}
              <div className="p-4 bg-[#12141A] border-t border-white/5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-['Anton'] text-lg uppercase text-white group-hover:text-[#F2C21B] transition-colors leading-tight mb-1.5 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#AAA8A1] font-medium leading-relaxed line-clamp-2 mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-white/50">
                  <span className="flex items-center gap-1 truncate max-w-[65%]">
                    <IconPin className="w-3 h-3 text-[#F2C21B] shrink-0" />
                    <span className="truncate">{item.location || "Nacional"}</span>
                  </span>
                  <span className="text-[#F2C21B] font-semibold">{item.date || "Oficial"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX FULLSCREEN MODAL */}
      {selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto z-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F2C21B]" />
              <span className="font-mono text-xs text-[#F2C21B] font-bold uppercase tracking-wider">
                {filteredItems[selectedPhotoIndex].category} • {selectedPhotoIndex + 1} de {filteredItems.length}
              </span>
            </div>
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-[2px] border border-white/20 transition-all cursor-pointer flex items-center gap-2 text-xs font-mono"
            >
              <span>FECHAR</span>
              <IconClose className="w-4 h-4" />
            </button>
          </div>

          {/* Lightbox Center: Image + Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 w-full max-w-6xl mx-auto" onClick={(e) => e.stopPropagation()}>
            {/* Prev Button */}
            <button
              onClick={() =>
                setSelectedPhotoIndex((prev) =>
                  prev !== null ? (prev > 0 ? prev - 1 : filteredItems.length - 1) : null
                )
              }
              aria-label="Foto Anterior"
              className="absolute left-2 sm:-left-6 z-20 w-12 h-12 bg-black/80 hover:bg-[#F2C21B] hover:text-black text-white rounded-[2px] border border-white/20 hover:border-[#F2C21B] flex items-center justify-center text-xl font-bold transition-all cursor-pointer shadow-2xl"
            >
              ‹
            </button>

            {/* Main Image Frame */}
            <div className="relative max-w-full max-h-[70vh] w-full h-[65vh] rounded-[2px] overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
              <Image
                src={filteredItems[selectedPhotoIndex].file}
                alt={filteredItems[selectedPhotoIndex].title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setSelectedPhotoIndex((prev) =>
                  prev !== null ? (prev < filteredItems.length - 1 ? prev + 1 : 0) : null
                )
              }
              aria-label="Próxima Foto"
              className="absolute right-2 sm:-right-6 z-20 w-12 h-12 bg-black/80 hover:bg-[#F2C21B] hover:text-black text-white rounded-[2px] border border-white/20 hover:border-[#F2C21B] flex items-center justify-center text-xl font-bold transition-all cursor-pointer shadow-2xl"
            >
              ›
            </button>
          </div>

          {/* Lightbox Bottom Details Bar */}
          <div
            className="w-full max-w-4xl mx-auto bg-[#12141A]/90 backdrop-blur-md border border-white/15 p-4 sm:p-6 rounded-[2px] text-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white tracking-wide mb-1.5 text-[#F2C21B]">
              {filteredItems[selectedPhotoIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#D4D1CA] font-medium leading-relaxed max-w-2xl mx-auto mb-2">
              {filteredItems[selectedPhotoIndex].description}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs font-mono text-white/50 pt-2 border-t border-white/10">
              <span>📍 {filteredItems[selectedPhotoIndex].location || "Nacional"}</span>
              <span>•</span>
              <span className="text-[#F2C21B] font-bold">🗓️ {filteredItems[selectedPhotoIndex].date || "Oficial"}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
