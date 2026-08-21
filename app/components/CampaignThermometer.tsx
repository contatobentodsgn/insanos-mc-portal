import React, { useState } from "react";
import Link from "next/link";
import { IconFire, IconChat } from "./ui/Icons";

interface DropPoint {
  city: string;
  state: string;
  location: string;
  responsible: string;
  phone: string;
}

const DROP_POINTS: DropPoint[] = [
  { city: "Osasco", state: "SP", location: "Sede Matriz — Av. dos Autonomistas", responsible: "Diretoria Social Matriz", phone: "(11) 98888-1818" },
  { city: "São Paulo", state: "SP", location: "Sub-Sede Z/L — Tatuapé / Mooca", responsible: "Dir. Social Capital", phone: "(11) 97777-1818" },
  { city: "Rio de Janeiro", state: "RJ", location: "Divisão Guanabara — Barra da Tijuca", responsible: "Dir. Social RJ", phone: "(21) 99999-1818" },
  { city: "Belo Horizonte", state: "MG", location: "Divisão Minas Gerais — Savassi", responsible: "Dir. Social MG", phone: "(31) 98888-1818" },
  { city: "Curitiba", state: "PR", location: "Divisão Paraná — Batel", responsible: "Dir. Social Sul", phone: "(41) 99999-1818" },
  { city: "Salvador", state: "BA", location: "Divisão Bahia — Pituba", responsible: "Dir. Social Nordeste", phone: "(71) 98888-1818" },
];

export function CampaignThermometer() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const goalTotal = 50000;
  const currentTotal = 42850;
  const percentage = Math.round((currentTotal / goalTotal) * 100);

  const filteredPoints = DROP_POINTS.filter((p) =>
    selectedFilter === "" ? true : p.state.toLowerCase() === selectedFilter.toLowerCase()
  );

  return (
    <div className="p-8 sm:p-12 rounded-2xl bg-[#131518] border border-[#F2C21B]/40 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <IconFire className="w-3.5 h-3.5 text-[#F2C21B]" />
            <span>Campanha Nacional Ativa · Inverno 2026</span>
          </div>
          <h3 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white mb-2">
            Campanha do Agasalho & Alimentos
          </h3>
          <p className="text-sm sm:text-base text-[#C7C5BF] max-w-2xl">
            Arrecadação simultânea em mais de 480 facções para distribuição noturna direta a famílias e pessoas em situação de vulnerabilidade.
          </p>
        </div>

        {/* Big Counter */}
        <div className="p-6 rounded-xl bg-[#0A0A0B] border border-white/15 text-center min-w-[200px]">
          <span className="text-[11px] text-[#AAA8A1] uppercase font-bold tracking-wider block mb-1">
            Meta Consolidada
          </span>
          <strong className="font-['Anton'] text-4xl sm:text-5xl text-[#F2C21B]">
            {percentage}%
          </strong>
          <span className="text-xs text-white/80 block mt-1">
            {currentTotal.toLocaleString("pt-BR")} / {goalTotal.toLocaleString("pt-BR")} itens
          </span>
        </div>
      </div>

      {/* Thermometer Progress Bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-[#AAA8A1] mb-3">
          <span>Marco Zero (0 itens)</span>
          <span className="text-[#F2C21B]">42.850 Itens Coletados</span>
          <span>Meta: 50.000 Itens</span>
        </div>
        <div className="h-6 w-full rounded-full bg-[#0A0A0B] border border-white/20 p-1 relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#d8a80d] via-[#F2C21B] to-[#ffe053] shadow-[0_0_20px_rgba(242,194,27,0.8)] transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Drop Points Section */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h4 className="font-['Anton'] text-xl sm:text-2xl uppercase text-white">
            Pontos de Coleta Oficiais por Região
          </h4>
          <div className="flex gap-2">
            {["", "SP", "RJ", "MG", "PR", "BA"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedFilter(st)}
                className={`px-3 py-1 rounded text-xs font-bold uppercase transition-colors duration-150 ${
                  selectedFilter === st
                    ? "bg-[#F2C21B] text-black"
                    : "bg-[#1C1E23] text-white/70 hover:text-white"
                }`}
              >
                {st === "" ? "Todos" : st}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredPoints.map((dp, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[#0C0D0F] border border-white/10 hover:border-[#F2C21B]/40 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono font-bold text-[#F2C21B]">[{dp.state}] {dp.city}</span>
                <span className="text-[10px] text-white/50">{dp.phone}</span>
              </div>
              <p className="text-xs font-semibold text-white mb-1">{dp.location}</p>
              <p className="text-[11px] text-[#8E8D88]">{dp.responsible}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-white/10 flex flex-wrap justify-center items-center gap-4">
          <a
            href="https://wa.me/5511988881818?text=Ola%2C%20gostaria%20de%20entregar%20uma%20doacao%20para%20a%20Campanha%20Insanos%20MC"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors duration-150 inline-flex items-center gap-2 shadow-lg hover-lift"
          >
            <IconChat className="w-4 h-4" />
            <span>Entregar Doação via WhatsApp</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
