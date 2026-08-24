"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import {
  IconCalendar,
  IconPin,
  IconClock,
  IconDownload,
  IconSearch,
  IconRoute,
  IconShield,
  IconFire,
  IconChat,
  IconArrowRight,
  IconCheck,
  IconClose,
} from "../components/ui/Icons";

export interface InsanosEvent {
  id: string;
  title: string;
  subtitle: string;
  category: "social" | "nacional" | "expedicao" | "faccao" | "mundial";
  categoryLabel: string;
  dateStart: string; // YYYYMMDD
  dateEnd: string;   // YYYYMMDD
  dateDisplay: {
    day: string;
    monthShort: string;
    monthFull: string;
    year: string;
    full: string;
  };
  time: string;
  location: string;
  city: string;
  state: string;
  region: "sudeste" | "sul" | "nordeste" | "centro-oeste" | "internacional";
  regionLabel: string;
  meetingPoint: string;
  routeDistance: string;
  audience: string;
  status: "destaque" | "confirmado" | "aberto";
  statusLabel: string;
  description: string;
  image: string;
}

export const EVENTS_DATA: InsanosEvent[] = [
  {
    id: "encontro-nacional-osasco-2026",
    title: "Mega Encontro Nacional em Osasco — 11 Anos de Glória",
    subtitle: "A Maior Concentração de Motociclistas do Brasil no Berço Oficial de OZ",
    category: "nacional",
    categoryLabel: "Encontro Nacional",
    dateStart: "20260710T110000Z",
    dateEnd: "20260712T230000Z",
    dateDisplay: {
      day: "10-12",
      monthShort: "JUL",
      monthFull: "Julho",
      year: "2026",
      full: "10 a 12 de Julho de 2026",
    },
    time: "Sexta a Domingo · Portões abertos a partir das 10h",
    location: "Espaço de Eventos Osasco — Av. dos Autonomistas",
    city: "Osasco",
    state: "SP",
    region: "sudeste",
    regionLabel: "Sudeste",
    meetingPoint: "Sede Matriz Nacional (Av. dos Autonomistas) & Espaço de Convenções",
    routeDistance: "Concentração Geral em OZ",
    audience: "Aberto a Todos os Motociclistas & Famílias",
    status: "destaque",
    statusLabel: "Mega Evento Oficial",
    description:
      "Três dias de celebração da irmandade no berço onde tudo começou. Shows de rock ao vivo, praça de alimentação, expositores de alta cilindrada, estandes da 18Store e comboios sincronizados de facções de todo o país e delegações internacionais.",
    image: "/images/insanos/events/encontro_nacional_osasco.webp",
  },
  {
    id: "bonde-pela-vida-inverno-2026",
    title: "Bonde Pela Vida — Etapa Nacional de Doação de Sangue",
    subtitle: "Comboios Simultâneos para Abastecer os Principais Hemocentros do País",
    category: "social",
    categoryLabel: "Ação Social & Sangue",
    dateStart: "20260808T080000Z",
    dateEnd: "20260808T140000Z",
    dateDisplay: {
      day: "08",
      monthShort: "AGO",
      monthFull: "Agosto",
      year: "2026",
      full: "08 de Agosto de 2026",
    },
    time: "Concentração às 08h00 · Saída dos Bonde às 08h45",
    location: "Hemocentros Regionais (Mais de 120 Cidades Participantes)",
    city: "Nacional (Todas as Sedes)",
    state: "BR",
    region: "sudeste",
    regionLabel: "Nacional",
    meetingPoint: "Sedes Regionais do Insanos MC em cada capital e interior",
    routeDistance: "Trajeto urbano escoltado até o hemocentro",
    audience: "Aberto a Todos os Doadores & Motociclistas Solidários",
    status: "confirmado",
    statusLabel: "Ação Humanitária",
    description:
      "Ação humanitária oficial do Insanos MC focada em abastecer os bancos de sangue no período crítico de inverno. Todos os irmãos, familiares, simpáticos e motociclistas amigos estão convocados para salvar vidas.",
    image: "/images/insanos/impact_blood.webp",
  },
  {
    id: "expedicao-serra-rio-do-rastro-2026",
    title: "Expedição Serra do Rio do Rastro & Serra do Corvo Branco",
    subtitle: "Travessia das 250 Curvas e Mirantes Alpinos de Santa Catarina",
    category: "expedicao",
    categoryLabel: "Expedição de Estrada",
    dateStart: "20260918T060000Z",
    dateEnd: "20260921T180000Z",
    dateDisplay: {
      day: "18-21",
      monthShort: "SET",
      monthFull: "Setembro",
      year: "2026",
      full: "18 a 21 de Setembro de 2026",
    },
    time: "Briefing 06h00 · Partida do Comboio 06h30",
    location: "Serra do Rio do Rastro — SC-390 / Lauro Müller / Bom Jardim",
    city: "Lauro Müller",
    state: "SC",
    region: "sul",
    regionLabel: "Sul",
    meetingPoint: "Posto Graal Curitiba (BR-116) / Encontro com Facção SC em Florianópolis",
    routeDistance: "1.450 km (Circuito Completo Sul)",
    audience: "Comboio Geral de Médias e Altas Cilindradas",
    status: "destaque",
    statusLabel: "Expedição Épica",
    description:
      "Uma das estradas mais espetaculares do planeta. Comboio estruturado com batedores táticos, carro de apoio mecânico e paradas programadas nas facções irmãs de Curitiba, Joinville e Florianópolis.",
    image: "/images/insanos/expedicoes/expedicao_1.webp",
  },
  {
    id: "acao-dia-das-criancas-2026",
    title: "Ação Social Nacional — Dia das Crianças Insanos",
    subtitle: "Entrega de Brinquedos e Dia de Lazer em Comunidades e Orfanatos",
    category: "social",
    categoryLabel: "Ação Social",
    dateStart: "20261011T090000Z",
    dateEnd: "20261012T170000Z",
    dateDisplay: {
      day: "11-12",
      monthShort: "OUT",
      monthFull: "Outubro",
      year: "2026",
      full: "11 e 12 de Outubro de 2026",
    },
    time: "Saída dos Bonde às 09h00 das sedes regionais",
    location: "Comunidades, Creches e Entidades Assistenciais Cadastradas",
    city: "Mais de 480 Cidades",
    state: "BR",
    region: "sudeste",
    regionLabel: "Nacional",
    meetingPoint: "Sedes de cada divisão e facção regional",
    routeDistance: "Rotas locais de entrega",
    audience: "Voluntários, Doadores e Integrantes",
    status: "confirmado",
    statusLabel: "Caridade & Honra",
    description:
      "Arrecadação e distribuição direta de milhares de brinquedos novos, doces e estrutura de recreação infantil em áreas de extrema vulnerabilidade social, levando alegria e dignidade a milhares de famílias.",
    image: "/images/insanos/impact_social.webp",
  },
  {
    id: "aniversario-oficial-fundacao-2026",
    title: "Aniversário Oficial de Fundação Insanos Moto Clube",
    subtitle: "Celebração Magna de 11 Anos — Reunião Geral de Facções e Capítulos",
    category: "nacional",
    categoryLabel: "Celebração Magna",
    dateStart: "20261114T100000Z",
    dateEnd: "20261115T220000Z",
    dateDisplay: {
      day: "14-15",
      monthShort: "NOV",
      monthFull: "Novembro",
      year: "2026",
      full: "14 e 15 de Novembro de 2026",
    },
    time: "Concentração a partir das 10h00",
    location: "Complexo de Eventos e Kartódromo Internacional de Granja Viana / Osasco",
    city: "Grande São Paulo",
    state: "SP",
    region: "sudeste",
    regionLabel: "Sudeste",
    meetingPoint: "Reunião de Comboios na Rodovia Castelo Branco / Raposo Tavares",
    routeDistance: "Concentração Geral",
    audience: "Integrantes, Simpáticos, Clubes Irmãos e Famílias",
    status: "destaque",
    statusLabel: "Data Magna",
    description:
      "O maior evento do calendário oficial. Solenidade de graduação, entrega de comendas de honra, retrospectiva anual de ações sociais e shows com as maiores bandas de rock do cenário nacional.",
    image: "/images/insanos/history_2015.webp",
  },
  {
    id: "bonde-encerramento-solidario-2026",
    title: "Bonde Noturno de Encerramento & Ceia Solidária",
    subtitle: "Distribuição de Marmitas Especiais e Cobertores de Natal",
    category: "social",
    categoryLabel: "Ação Social de Natal",
    dateStart: "20261219T190000Z",
    dateEnd: "20261220T020000Z",
    dateDisplay: {
      day: "19",
      monthShort: "DEZ",
      monthFull: "Dezembro",
      year: "2026",
      full: "19 de Dezembro de 2026",
    },
    time: "Concentração 19h00 · Partida do Comboio Noturno 20h30",
    location: "Centro Histórico e Regiões Periféricas das Capitais",
    city: "São Paulo, Rio, BH, Curitiba e Salvador",
    state: "BR",
    region: "sudeste",
    regionLabel: "Nacional",
    meetingPoint: "Sedes Regionais de cada capital",
    routeDistance: "Rondas noturnas assistenciais",
    audience: "Integrantes e Voluntários de Apoio",
    status: "confirmado",
    statusLabel: "Bonde Solidário",
    description:
      "A tradicional ação de final de ano que percorre as ruas nas madrugadas entregando ceias quentes, panetones e kits de higiene para quem não tem onde passar a ceia de fim de ano.",
    image: "/images/insanos/campanha.webp",
  },
  {
    id: "expedicao-transcontinental-atacama-2027",
    title: "Expedição Transcontinental: Travessia do Atacama & Rota 40",
    subtitle: "Mais de 6.500 km pelo Deserto Mais Árido do Mundo e Cordilheira",
    category: "expedicao",
    categoryLabel: "Expedição Internacional",
    dateStart: "20270115T060000Z",
    dateEnd: "20270128T180000Z",
    dateDisplay: {
      day: "15-28",
      monthShort: "JAN",
      monthFull: "Janeiro",
      year: "2027",
      full: "15 a 28 de Janeiro de 2027",
    },
    time: "Saída Oficial de Foz do Iguaçu (PR) às 06h00",
    location: "Paso de Jama · San Pedro de Atacama · Salar de Uyuni",
    city: "Chile / Argentina / Bolívia",
    state: "INT",
    region: "internacional",
    regionLabel: "Internacional",
    meetingPoint: "Sede Foz do Iguaçu — Tríplice Fronteira",
    routeDistance: "6.800 km de Asfalto e Rípio",
    audience: "Divisão Nômades & Pilotos Inscritos",
    status: "aberto",
    statusLabel: "Inscrições Abertas",
    description:
      "A jornada definitiva de superação mototurística. Travessia internacional com apoio logístico de facções da Argentina e do Chile, cruzando altitudes acima de 4.800 metros sob o comando de veteranos experientes.",
    image: "/images/insanos/expedicoes/expedicao_2.webp",
  },
];

export function EventosClient() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<InsanosEvent | null>(null);
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      const matchCategory = categoryFilter === "all" || event.category === categoryFilter;
      const matchRegion = regionFilter === "all" || event.region === regionFilter;
      const matchSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.dateDisplay.monthFull.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchRegion && matchSearch;
    });
  }, [categoryFilter, regionFilter, searchQuery]);

  // Google Calendar URL Generator
  const getGoogleCalendarUrl = (event: InsanosEvent) => {
    const title = encodeURIComponent(`🏍️ ${event.title} — Insanos MC`);
    const details = encodeURIComponent(
      `${event.subtitle}\n\n${event.description}\n\n📍 Ponto de Encontro: ${event.meetingPoint}\n⏰ Horário: ${event.time}\n🛣️ Percurso: ${event.routeDistance}\n👥 Público: ${event.audience}\n\n🌐 Portal Oficial: https://insanosmc.vercel.app/eventos`
    );
    const location = encodeURIComponent(`${event.location}, ${event.city} - ${event.state}`);
    const dates = `${event.dateStart}/${event.dateEnd}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Apple / Outlook .ics File Generator & Downloader
  const handleDownloadIcs = (event: InsanosEvent) => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Insanos Moto Clube//Agenda Oficial 2026//PT",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:event-${event.id}@insanosmc.vercel.app`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${event.dateStart}`,
      `DTEND:${event.dateEnd}`,
      `SUMMARY:🏍️ ${event.title} — Insanos MC`,
      `DESCRIPTION:${event.subtitle}\\n\\n${event.description}\\n\\nConcentracao: ${event.meetingPoint}\\nHorario: ${event.time}\\nPublico: ${event.audience}`,
      `LOCATION:${event.location}, ${event.city} - ${event.state}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `insanos-evento-${event.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setCopiedEventId(event.id);
    setTimeout(() => setCopiedEventId(null), 3000);
  };

  // WhatsApp Share Message
  const getWhatsAppShareUrl = (event: InsanosEvent) => {
    const text = encodeURIComponent(
      `🏍️ *EVENTO OFICIAL INSANOS MC*\n\n📌 *${event.title}*\n${event.subtitle}\n\n📅 *Data:* ${event.dateDisplay.full}\n⏰ *Horário:* ${event.time}\n📍 *Local:* ${event.location} (${event.city}/${event.state})\n🎯 *Público:* ${event.audience}\n\n👉 *Veja a agenda completa e adicione no seu calendário:* https://insanosmc.vercel.app/eventos`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans selection:bg-[#F2C21B] selection:text-black">
      <Navbar />

      <main id="conteudo">
        {/* Page Hero Header */}
        <section className="py-20 sm:py-28 bg-[#111215] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-gradient-to-r from-[#F2C21B] via-[#FFD700] to-[#B88E07] rounded-full shadow-[0_0_8px_rgba(242,194,27,0.4)]" />
              <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                Calendário Oficial de Bondes & Encontros · Temporada 2026
              </p>
            </div>
            <h1 className="font-['Anton'] uppercase text-4xl sm:text-7xl text-white mb-6 leading-tight tracking-[-0.015em] sm:tracking-[-0.02em]">
              Agenda da <span className="text-[#F2C21B]">Irmandade na Estrada.</span>
            </h1>
            <p className="text-base sm:text-xl text-[#D4D1CA] font-medium max-w-3xl leading-relaxed">
              Próximos passeios, mega encontros nacionais, ações humanitárias do Bonde Pela Vida e travessias continentais. Sincronize com o seu Google Agenda ou Apple Calendar em 1 clique.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-white/10">
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-[#AAA8A1] block font-bold">Eventos Mapeados</span>
                <span className="font-['Anton'] text-2xl sm:text-3xl text-[#F2C21B]">+38 no Ano</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-[#AAA8A1] block font-bold">Ponto Mais Esperado</span>
                <span className="font-['Anton'] text-2xl sm:text-3xl text-white">OZ Nacional</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-[#AAA8A1] block font-bold">Ações Humanitárias</span>
                <span className="font-['Anton'] text-2xl sm:text-3xl text-[#F2C21B]">12 Nacionais</span>
              </div>
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/10">
                <span className="text-[10px] font-mono uppercase text-[#AAA8A1] block font-bold">Sincronização</span>
                <span className="font-['Anton'] text-2xl sm:text-3xl text-white">1-Clique .ICS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Control Center */}
        <section className="py-8 bg-[#0D0E11] border-b border-white/10 sticky top-[72px] z-30 backdrop-blur-xl bg-opacity-95 shadow-md">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 lg:pb-0 -mx-2 px-2">
                {[
                  { key: "all", label: "Todos os Eventos" },
                  { key: "nacional", label: "🏛️ Nacionais & OZ" },
                  { key: "social", label: "🩸 Bonde Pela Vida & Social" },
                  { key: "expedicao", label: "🛣️ Expedições & Serras" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCategoryFilter(tab.key)}
                    className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-150 whitespace-nowrap active:scale-95 cursor-pointer flex items-center gap-1.5 ${
                      categoryFilter === tab.key
                        ? "bg-[#F2C21B] text-black shadow-[0_0_15px_rgba(242,194,27,0.3)] font-extrabold"
                        : "bg-[#16181F] text-white/70 hover:text-white border border-white/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search and Region Select */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                {/* Region Filter */}
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#16181F] border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-[#F2C21B] cursor-pointer"
                >
                  <option value="all">🌎 Todas as Regiões</option>
                  <option value="sudeste">📍 Sudeste (SP / RJ / MG / ES)</option>
                  <option value="sul">📍 Sul (PR / SC / RS)</option>
                  <option value="internacional">📍 Internacional / América do Sul</option>
                </select>

                {/* Live Search Input */}
                <div className="relative flex-1 sm:w-64">
                  <IconSearch className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por cidade, mês ou título..."
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#16181F] border border-white/15 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-[#F2C21B]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      <IconClose className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid Section */}
        <section className="py-16 sm:py-24 bg-[#0A0A0B]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            {filteredEvents.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-[#121316] border border-white/10 max-w-xl mx-auto space-y-4">
                <IconCalendar className="w-12 h-12 text-[#F2C21B] mx-auto opacity-60" />
                <h4 className="font-['Anton'] text-2xl uppercase text-white">Nenhum evento encontrado</h4>
                <p className="text-xs text-[#AAA8A1] font-mono">
                  Tente ajustar os filtros ou a busca digitada acima para encontrar outros encontros.
                </p>
                <button
                  onClick={() => {
                    setCategoryFilter("all");
                    setRegionFilter("all");
                    setSearchQuery("");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#F2C21B] text-black text-xs font-mono font-bold uppercase"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-3xl bg-[#111317] border border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/60 p-6 sm:p-8 lg:p-10 transition-all duration-300 shadow-xl group hover-lift relative overflow-hidden"
                  >
                    {/* Background Subtle Accent */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#F2C21B]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F2C21B]/10 transition-colors" />

                    <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                      {/* Left: Date Medal Block (3 Cols) */}
                      <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start gap-4">
                        <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-2xl bg-gradient-to-b from-[#1E2129] to-[#0D0F13] border-2 border-[#F2C21B]/60 p-2 flex flex-col items-center justify-center text-center shadow-lg group-hover:border-[#F2C21B] group-hover:shadow-[0_0_20px_rgba(242,194,27,0.3)] transition-all">
                          <span className="text-[11px] font-mono font-black uppercase text-[#F2C21B] tracking-wider">
                            {event.dateDisplay.monthShort}
                          </span>
                          <span className="font-['Anton'] text-3xl sm:text-4xl text-white leading-none my-0.5">
                            {event.dateDisplay.day}
                          </span>
                          <span className="text-[10px] font-mono text-white/50 font-bold">
                            {event.dateDisplay.year}
                          </span>
                        </div>

                        <div>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F2C21B]/15 text-[#F2C21B] font-mono text-[10px] uppercase font-bold tracking-wider border border-[#F2C21B]/30 mb-1">
                            <span>{event.statusLabel}</span>
                          </div>
                          <span className="text-xs font-mono text-white/70 block">
                            {event.categoryLabel}
                          </span>
                        </div>
                      </div>

                      {/* Center: Event Info & Tactical Sheet (6 Cols) */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <h3 className="font-['Anton'] text-2xl sm:text-4xl uppercase text-white leading-tight tracking-[-0.015em] group-hover:text-[#F2C21B] transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#D4D1CA] font-medium mt-1 leading-relaxed">
                            {event.subtitle}
                          </p>
                        </div>

                        {/* Tactical Specs Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#D4D1CA]">
                          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5">
                            <IconPin className="w-4 h-4 text-[#F2C21B] shrink-0" />
                            <span className="truncate" title={event.location}>
                              {event.city} ({event.state})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5">
                            <IconClock className="w-4 h-4 text-[#F2C21B] shrink-0" />
                            <span className="truncate">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5">
                            <IconRoute className="w-4 h-4 text-[#F2C21B] shrink-0" />
                            <span className="truncate">{event.routeDistance}</span>
                          </div>
                          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-white/5">
                            <IconShield className="w-4 h-4 text-[#F2C21B] shrink-0" />
                            <span className="truncate">{event.audience}</span>
                          </div>
                        </div>

                        <p className="text-xs text-[#AAA8A1] leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      {/* Right: Calendar 1-Click Sync Actions (3 Cols) */}
                      <div className="lg:col-span-3 flex flex-col gap-2.5 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                        {/* 1. Google Calendar Button */}
                        <a
                          href={getGoogleCalendarUrl(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-3 rounded-xl bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 shadow-md hover-lift flex items-center justify-center gap-2"
                        >
                          <IconCalendar className="w-4 h-4 text-black" />
                          <span>Google Agenda</span>
                          <span>↗</span>
                        </a>

                        {/* 2. Apple / Outlook .ICS Download */}
                        <button
                          onClick={() => handleDownloadIcs(event)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/15"
                        >
                          {copiedEventId === event.id ? (
                            <>
                              <IconCheck className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-400">.ICS Baixado!</span>
                            </>
                          ) : (
                            <>
                              <IconDownload className="w-4 h-4 text-white" />
                              <span>Apple / Outlook (.ics)</span>
                            </>
                          )}
                        </button>

                        {/* 3. WhatsApp Share */}
                        <a
                          href={getWhatsAppShareUrl(event)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#25D366] font-mono text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-2 border border-[#25D366]/30"
                        >
                          <IconChat className="w-3.5 h-3.5" />
                          <span>Convidar no WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* How Comboys Work / Security Briefing Footer Callout */}
        <section className="py-16 bg-[#111215] border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#171920] via-[#20242E] to-[#171920] border border-[#F2C21B]/40 shadow-2xl">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F2C21B]/20 text-[#F2C21B] font-mono text-xs uppercase font-bold tracking-wider">
                    <IconShield className="w-4 h-4 text-[#F2C21B]" />
                    <span>Doutrina de Estrada & Bonde Seguro</span>
                  </div>
                  <h3 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-tight tracking-[-0.015em]">
                    Vai Rodar no Comboio Oficial? Conheça as Regras.
                  </h3>
                  <p className="text-sm text-[#D4D1CA] leading-relaxed max-w-2xl">
                    Todos os bondes do Insanos MC seguem rígido padrão internacional de formação escalonada, batedores de segurança, carro de apoio e tolerância zero a imprudências. Chegue com o tanque cheio e equipamento completo de proteção.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    href="/faca-parte"
                    className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase tracking-wider text-sm rounded-xl text-center shadow-lg transition-all hover-lift"
                  >
                    Quero Ingressar no Motoclube →
                  </Link>
                  <Link
                    href="/historia"
                    className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase rounded-xl text-center transition-colors"
                  >
                    Ver História & Valores
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
