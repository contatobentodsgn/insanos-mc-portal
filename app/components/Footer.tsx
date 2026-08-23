"use client";

import React from "react";
import Link from "next/link";

const ASSETS = {
  logo: "/images/insanos/insanos_mc_logo.svg",
};

export function Footer() {
  return (
    <footer className="bg-[#060607] text-[#888] text-xs py-16 border-t border-white/10">
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
            <p className="text-xs text-[#AAA8A1] leading-relaxed max-w-sm">
              O maior motoclube do Brasil e do mundo. Unidos por Deus, Família, Trabalho e Motoclube.
              Rompendo paradigmas do motociclismo com honra, disciplina e ajuda humanitária.
            </p>
            <div className="text-[11px] font-mono text-[#F2C21B]">
              #SomosDeVerdade · #InsanosMC · #OriginalDeOZ
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-['Anton'] text-sm uppercase text-white tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#F2C21B] transition-colors">Início</Link></li>
              <li><Link href="/historia" className="hover:text-[#F2C21B] transition-colors">História & 18 do Forte</Link></li>
              <li><Link href="/impacto" className="hover:text-[#F2C21B] transition-colors">Ações Sociais & PcD</Link></li>
              <li><Link href="/comando" className="hover:text-[#F2C21B] transition-colors">Liderança & Memorial</Link></li>
              <li><Link href="/18news" className="hover:text-[#F2C21B] transition-colors">18News & Revista</Link></li>
              <li><Link href="/faca-parte" className="hover:text-[#F2C21B] transition-colors">Adesão & Ingresso</Link></li>
            </ul>
          </div>

          {/* Social Projects */}
          <div>
            <h4 className="font-['Anton'] text-sm uppercase text-white tracking-wider mb-4">Projetos Oficiais</h4>
            <ul className="space-y-2">
              <li><Link href="/impacto" className="hover:text-[#F2C21B] transition-colors">Projeto PcD (Inclusão)</Link></li>
              <li><Link href="/impacto" className="hover:text-[#F2C21B] transition-colors">Bonde Pela Vida (Sangue)</Link></li>
              <li><Link href="/impacto" className="hover:text-[#F2C21B] transition-colors">Combate Insano (Artes Marciais)</Link></li>
              <li><Link href="/ecossistema" className="hover:text-[#F2C21B] transition-colors">Rádio Insanos 24h</Link></li>
              <li><Link href="/ecossistema" className="hover:text-[#F2C21B] transition-colors">18 Store Oficial</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-['Anton'] text-sm uppercase text-white tracking-wider mb-4">Canais Oficiais</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.instagram.com/insanosmc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F2C21B] transition-colors flex items-center gap-1.5"
                >
                  <span>Instagram (@insanosmc)</span>
                  <span>↗</span>
                </a>
              </li>
              <li><Link href="/faca-parte" className="hover:text-[#F2C21B] transition-colors">Processo de PP</Link></li>
              <li><Link href="/ecossistema" className="hover:text-[#F2C21B] transition-colors">Ecossistema Digital</Link></li>
              <li><Link href="/faca-parte" className="hover:text-[#F2C21B] transition-colors">Diretorias Regionais</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AAA8A1]">
          <div>
            © 2015–2026 Insanos Moto Clube. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <Link href="/termos" className="text-[#C7C5BF] hover:text-[#F2C21B] transition-colors">Termos de Uso</Link>
            <Link href="/privacidade" className="text-[#C7C5BF] hover:text-[#F2C21B] transition-colors">Política de Privacidade (LGPD)</Link>
            <a href="#" className="text-[#C7C5BF] hover:text-[#F2C21B] transition-colors">Voltar ao Topo ↑</a>
          </div>
        </div>
      </div>
    </footer>

  );
}
