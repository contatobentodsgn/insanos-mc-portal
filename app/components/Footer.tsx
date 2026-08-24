"use client";

import React from "react";
import Link from "next/link";

const ASSETS = {
  logo: "/images/insanos/insanos_mc_logo.svg",
};

export function Footer() {
  return (
    <footer className="bg-[#060607] text-[#AAA8A1] text-xs py-16 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group focus:outline-none" aria-label="Insanos MC — Início">
              <img
                src={ASSETS.logo}
                alt="Insanos Moto Clube"
                className="h-10 sm:h-12 w-auto max-w-[240px] sm:max-w-[280px] object-contain transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(242,194,27,0.3)]"
              />
            </Link>
            <p className="text-xs text-[#D4D1CA] font-medium leading-relaxed max-w-sm">
              O maior motoclube do Brasil e do mundo. Unidos por Deus, Família, Trabalho e Motoclube.
              Rompendo paradigmas do motociclismo com honra, disciplina e ajuda humanitária.
            </p>
            <div className="text-xs font-mono text-[#F2C21B] font-bold">
              #SomosDeVerdade · #InsanosMC · #OriginalDeOZ
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-[2px] bg-[#F2C21B] rounded-full" />
              <h4 className="font-['Anton'] text-sm uppercase text-white tracking-wider">Navegação</h4>
            </div>
            <ul className="space-y-1.5">
              <li><Link href="/" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Início</Link></li>
              <li><Link href="/historia" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">História & 18 do Forte</Link></li>
              <li><Link href="/impacto" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Ações Sociais & PcD</Link></li>
              <li><Link href="/comando" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Liderança & Memorial</Link></li>
              <li><Link href="/eventos" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Agenda & Eventos</Link></li>
              <li><Link href="/18news" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">18News & Revista</Link></li>
              <li><Link href="/faca-parte" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Adesão & Ingresso</Link></li>
            </ul>
          </div>

          {/* Social Projects */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-[2px] bg-[#F2C21B] rounded-full" />
              <h4 className="font-['Anton'] text-sm uppercase text-white tracking-wider">Projetos Oficiais</h4>
            </div>
            <ul className="space-y-1.5">
              <li><Link href="/impacto" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Projeto PcD (Inclusão)</Link></li>
              <li><Link href="/impacto" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Bonde Pela Vida (Sangue)</Link></li>
              <li><Link href="/impacto" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Combate Insano (Artes Marciais)</Link></li>
              <li><Link href="/ecossistema" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Rádio Insanos 24h</Link></li>
              <li><Link href="/ecossistema" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">18 Store Oficial</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-4 h-[2px] bg-[#F2C21B] rounded-full" />
              <h4 className="font-['Anton'] text-sm uppercase text-white tracking-wider">Canais Oficiais</h4>
            </div>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://www.instagram.com/insanosmc_oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors flex items-center gap-1.5 py-1 inline-flex"
                >
                  <span>Instagram Oficial</span>
                  <span>↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@InsanosMCOficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors flex items-center gap-1.5 py-1 inline-flex"
                >
                  <span>YouTube 18Cast</span>
                  <span>↗</span>
                </a>
              </li>
              <li><Link href="/faca-parte" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Adesão & Recrutamento</Link></li>
              <li><Link href="/ecossistema" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1 inline-block">Ecossistema Digital</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AAA8A1]">
          <div>
            © 2015–2026 Insanos Moto Clube. Todos os direitos reservados.
          </div>
          <div className="flex flex-wrap gap-6 items-center">
            <Link href="/termos" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1">Termos de Uso</Link>
            <Link href="/privacidade" className="text-[#D4D1CA] hover:text-[#F2C21B] transition-colors py-1">Política de Privacidade (LGPD)</Link>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-[#D4D1CA] hover:text-[#F2C21B] hover:bg-white/5 px-3 py-1.5 rounded-[2px] border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <span>Voltar ao Topo</span>
              <span className="text-[#F2C21B]">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
