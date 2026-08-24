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
  IconChat,
  IconArrowRight,
  IconCheck,
  IconClose,
} from "../components/ui/Icons";
import { INSTITUTIONAL_METRICS } from "../data/institutional";

export interface InsanosEvent {
  id: string;
  title: string;
  subtitle: string;
  category: "social" | "nacional" | "expedicao" | "faccao" | "mundial";
  categoryLabel: string;
  isPast: boolean;
  dateStartUtc: string; // YYYYMMDDTHHMMSSZ (UTC adjusted for BRT UTC-3)
  dateEndUtc: string;   // YYYYMMDDTHHMMSSZ
  dateStartLocal: string; // YYYYMMDDTHHMMSS
  dateEndLocal: string;
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
  status: "destaque" | "confirmado" | "aberto" | "realizado";
  statusLabel: string;
  description: string;
  image: string;
  newsSlug?: string;
}

export const EVENTS_DATA: InsanosEvent[] = [
  // 1. Realizado: Encontro Nacional Osasco
  {
    id: "encontro-nacional-osasco-2026",
    title: "Encontro Nacional em Osasco 2026",
    subtitle: "A Maior Concentração de Motociclistas do Brasil no Berço Oficial de OZ",
    category: "nacional",
    categoryLabel: "Encontro Nacional",
    isPast: true,
    dateStartUtc: "20260710T130000Z", // 10h BRT = 13h UTC
    dateEndUtc: "20260712T230000Z",
    dateStartLocal: "20260710T100000",
    dateEndLocal: "20260712T200000",
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
    status: "realizado",
    statusLabel: "Realizado",
    description:
      "Três dias de celebração da irmandade no berço onde tudo começou. Shows de rock ao vivo, praça de alimentação, expositores de alta cilindrada, estandes da 18Store e comboios sincronizados de facções de todo o país e delegações internacionais.",
    image: "/images/insanos/events/encontro_nacional_osasco.webp",
    newsSlug: "encontro-nacional-osasco-2026-reune-milhares",
  },
  // 2. Realizado: Bonde Pela Vida Sangue
  {
    id: "bonde-pela-vida-inverno-2026",
    title: "Bonde Pela Vida — Etapa Nacional de Doação de Sangue",
    subtitle: "Comboios Simultâneos para Abastecer os Principais Hemocentros do País",
    category: "social",
    categoryLabel: "Ação Social & Sangue",
    isPast: true,
    dateStartUtc: "20260808T110000Z", // 08h BRT = 11h UTC
    dateEndUtc: "20260808T170000Z",
    dateStartLocal: "20260808T080000",
    dateEndLocal: "20260808T140000",
    dateDisplay: {
      day: "08",
      monthShort: "AGO",
      monthFull: "Agosto",
      year: "2026",
      full: "08 de Agosto de 2026",
    },
    time: "Concentração às 08h00 · Saída dos Bondes às 08h45",
    location: "Hemocentros Regionais (Mais de 120 Cidades Participantes)",
    city: "Nacional (Todas as Sedes)",
    state: "BR",
    region: "sudeste",
    regionLabel: "Nacional",
    meetingPoint: "Sedes Regionais do Insanos MC em cada capital e interior",
    routeDistance: "Trajeto urbano escoltado até o hemocentro",
    audience: "Aberto a Todos os Doadores & Motociclistas Solidários",
    status: "realizado",
    statusLabel: "Realizado",
    description:
      "Ação humanitária oficial do Insanos MC focada em abastecer os bancos de sangue no período crítico de inverno. Todos os irmãos, familiares, simpáticos e motociclistas amigos uniram forças para salvar vidas.",
    image: "/images/insanos/impact_blood.webp",
    newsSlug: "bonde-pela-vida-mobiliza-doacao-sangue",
  },
  // 3. Próximo: Serra do Rio do Rastro (Setembro)
  {
    id: "expedicao-serra-rio-do-rastro-2026",
    title: "Expedição Serra do Rio do Rastro & Serra do Corvo Branco",
    subtitle: "Travessia das 250 Curvas e Mirantes Alpinos de Santa Catarina",
    category: "expedicao",
    categoryLabel: "Expedição de Estrada",
    isPast: false,
    dateStartUtc: "20260918T090000Z", // 06h BRT = 09h UTC
    dateEndUtc: "20260921T210000Z",
    dateStartLocal: "20260918T060000",
    dateEndLocal: "20260921T180000",
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
    status: "confirmado",
    statusLabel: "Confirmado",
    description:
      "Uma das estradas mais espetaculares do planeta. Comboio estruturado com batedores táticos, carro de apoio mecânico e paradas programadas nas facções irmãs de Curitiba, Joinville e Florianópolis.",
    image: "/images/insanos/expedicoes/expedicao_1.webp",
  },
  // 4. Próximo: Dia das Crianças (Outubro)
  {
    id: "acao-dia-das-criancas-2026",
    title: "Ação Social Nacional — Dia das Crianças",
    subtitle: "Entrega de Brinquedos e Dia de Lazer em Comunidades e Orfanatos",
    category: "social",
    categoryLabel: "Ação Social",
    isPast: false,
    dateStartUtc: "20261011T120000Z", // 09h BRT = 12h UTC
    dateEndUtc: "20261012T200000Z",
    dateStartLocal: "20261011T090000",
    dateEndLocal: "20261012T170000",
    dateDisplay: {
      day: "11-12",
      monthShort: "OUT",
      monthFull: "Outubro",
      year: "2026",
      full: "11 e 12 de Outubro de 2026",
    },
    time: "Saída dos Bondes às 09h00 das sedes regionais",
    location: "Comunidades, Creches e Entidades Assistenciais Cadastradas",
    city: "Mais de 480 Cidades",
    state: "BR",
    region: "sudeste",
    regionLabel: "Nacional",
    meetingPoint: "Sedes de cada divisão e facção regional",
    routeDistance: "Rotas locais de entrega",
    audience: "Voluntários, Doadores e Integrantes",
    status: "confirmado",
    statusLabel: "Confirmado",
    description:
      "Arrecadação e distribuição direta de milhares de brinquedos novos, doces e estrutura de recreação infantil em áreas de extrema vulnerabilidade social, levando alegria e dignidade a milhares de famílias.",
    image: "/images/insanos/impact_social.webp",
  },
  // 5. Próximo: Aniversário de Fundação Oficial (Novembro / Dezembro)
  {
    id: "aniversario-oficial-fundacao-2026",
    title: "Comemoração Oficial de Aniversário — Fundação Insanos MC",
    subtitle: "Reunião Geral de Facções e Capítulos em Celebração aos Pioneiros de 2015",
    category: "nacional",
    categoryLabel: "Encontro Nacional",
    isPast: false,
    dateStartUtc: "20261114T130000Z", // 10h BRT = 13h UTC
    dateEndUtc: "20261115T230000Z",
    dateStartLocal: "20261114T100000",
    dateEndLocal: "20261115T200000",
    dateDisplay: {
      day: "14-15",
      monthShort: "NOV",
      monthFull: "Novembro",
      year: "2026",
      full: "14 e 15 de Novembro de 2026",
    },
    time: "Concentração a partir das 10h00",
    location: "Complexo de Eventos e Kartódromo Internacional / Osasco",
    city: "Grande São Paulo",
    state: "SP",
    region: "sudeste",
    regionLabel: "Sudeste",
    meetingPoint: "Reunião de Comboios na Rodovia Castelo Branco / Raposo Tavares",
    routeDistance: "Concentração Geral",
    audience: "Integrantes, Simpáticos, Clubes Irmãos e Famílias",
    status: "confirmado",
    statusLabel: "Confirmado",
    description:
      "Evento oficial do calendário em celebração aos pioneiros fundadores de 03/12/2015. Solenidade de graduação, entrega de comendas de honra, retrospectiva anual de ações sociais e bandas de rock.",
    image: "/images/insanos/history_2015.webp",
  },
  // 6. Próximo: Bonde Noturno de Natal (Dezembro)
  {
    id: "bonde-encerramento-solidario-2026",
    title: "Bonde Noturno de Encerramento & Ceia Solidária",
    subtitle: "Distribuição de Marmitas Especiais e Cobertores de Natal",
    category: "social",
    categoryLabel: "Ação Social",
    isPast: false,
    dateStartUtc: "20261219T220000Z", // 19h BRT = 22h UTC
    dateEndUtc: "20261220T050000Z",
    dateStartLocal: "20261219T190000",
    dateEndLocal: "20261220T020000",
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
    statusLabel: "Confirmado",
    description:
      "A tradicional ação de final de ano que percorre as ruas nas madrugadas entregando ceias quentes, panetones e kits de higiene para quem se encontra em situação de vulnerabilidade social.",
    image: "/images/insanos/campanha.webp",
  },
  // 7. Próximo: Expedição Atacama (Janeiro 2027)
  {
    id: "expedicao-transcontinental-atacama-2027",
    title: "Expedição Transcontinental: Travessia do Atacama & Rota 40",
    subtitle: "Mais de 6.500 km pelo Deserto Mais Árido do Mundo e Cordilheira",
    category: "expedicao",
    categoryLabel: "Expedição",
    isPast: false,
    dateStartUtc: "20270115T090000Z", // 06h BRT = 09h UTC
    dateEndUtc: "20270128T210000Z",
    dateStartLocal: "20270115T060000",
    dateEndLocal: "20270128T180000",
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
      "A jornada de superação mototurística internacional com apoio logístico de facções da Argentina e do Chile, cruzando altitudes acima de 4.800 metros sob comando de veteranos experientes.",
    image: "/images/insanos/expedicoes/expedicao_2.webp",
  },
];

export function EventosClient() {
  const [timelineTab, setTimelineTab] = useState<"upcoming" | "past">("upcoming");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null);

  // Filtered Events with Timeline Split (Próximos vs Realizados)
  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      // Timeline filter
      const matchesTimeline = timelineTab === "upcoming" ? !event.isPast : event.isPast;
      if (!matchesTimeline) return false;

      // Category filter
      const matchCategory = categoryFilter === "all" || event.category === categoryFilter;
      // Region filter
      const matchRegion = regionFilter === "all" || event.region === regionFilter;
      // Search filter
      const matchSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.dateDisplay.monthFull.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchRegion && matchSearch;
    });
  }, [timelineTab, categoryFilter, regionFilter, searchQuery]);

  // Counts for Timeline Tabs
  const upcomingCount = useMemo(() => EVENTS_DATA.filter((e) => !e.isPast).length, []);
  const pastCount = useMemo(() => EVENTS_DATA.filter((e) => e.isPast).length, []);

  // Google Calendar URL Generator with Explicit Timezone Parameter
  const getGoogleCalendarUrl = (event: InsanosEvent) => {
    const title = encodeURIComponent(`${event.title} — Insanos MC`);
    const details = encodeURIComponent(
      `${event.subtitle}\n\n${event.description}\n\nPonto de Encontro: ${event.meetingPoint}\nHorário: ${event.time}\nPercurso: ${event.routeDistance}\nPúblico: ${event.audience}\n\nPortal Oficial: https://insanosmc.vercel.app/eventos`
    );
    const location = encodeURIComponent(`${event.location}, ${event.city} - ${event.state}`);
    const dates = `${event.dateStartUtc}/${event.dateEndUtc}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}&ctz=America/Sao_Paulo`;
  };

  // Apple / Outlook .ics File Generator with Explicit TZID
  const handleDownloadIcs = (event: InsanosEvent) => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Insanos Moto Clube//Agenda Oficial//PT",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:event-${event.id}@insanosmc.vercel.app`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART;TZID=America/Sao_Paulo:${event.dateStartLocal}`,
      `DTEND;TZID=America/Sao_Paulo:${event.dateEndLocal}`,
      `SUMMARY:${event.title} — Insanos MC`,
      `DESCRIPTION:${event.subtitle}\\n\\n${event.description}\\n\\nPonto de Encontro: ${event.meetingPoint}\\nHorario: ${event.time}\\nPublico: ${event.audience}`,
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
      `*EVENTO OFICIAL INSANOS MC*\n\n📌 *${event.title}*\n${event.subtitle}\n\n📅 *Data:* ${event.dateDisplay.full}\n⏰ *Horário:* ${event.time}\n📍 *Local:* ${event.location} (${event.city}/${event.state})\n🎯 *Público:* ${event.audience}\n\n👉 *Consulte a agenda oficial:* https://insanosmc.vercel.app/eventos`
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans selection:bg-[#F2C21B] selection:text-black">
      <Navbar />

      <main id="conteudo">
        {/* Page Hero Header — Clean Industrial */}
        <section className="py-20 sm:py-28 bg-[#111215] border-b border-white/10 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#F2C21B]" />
              <p className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B] font-mono">
                Calendário Oficial de Encontros · Temporada 2026 / 2027
              </p>
            </div>
            <h1 className="font-['Anton'] uppercase text-4xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight tracking-[-0.015em] sm:tracking-[-0.02em]">
              Agenda de <span className="text-[#F2C21B]">Eventos Oficiais.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#D4D1CA] font-medium max-w-3xl leading-relaxed">
              Encontros nacionais, expedições de estrada e ações sociais do Insanos Moto Clube. Sincronize os próximos eventos com o Google Agenda ou Apple Calendar em 1 clique.
            </p>

            {/* Quick Metrics Bar — Verified & Clean */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10 max-w-2xl">
              <div className="p-4 rounded-[2px] bg-[#0A0A0C] border border-white/10">
                <span className="text-xs font-mono uppercase text-[#AAA8A1] block font-bold">Calendário Geral</span>
                <span className="font-['Anton'] text-2xl sm:text-3xl text-[#F2C21B]">{EVENTS_DATA.length} Encontros</span>
              </div>
              <div className="p-4 rounded-[2px] bg-[#0A0A0C] border border-white/10">
                <span className="text-xs font-mono uppercase text-[#AAA8A1] block font-bold">Facções Convocadas</span>
                <span className="font-['Anton'] text-2xl sm:text-3xl text-white">{INSTITUTIONAL_METRICS.chapters} Sedes</span>
              </div>
              <div className="p-4 rounded-[2px] bg-[#0A0A0C] border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-xs font-mono uppercase text-[#AAA8A1] block font-bold">Presença Global</span>
                <span className="font-['Anton'] text-2xl sm:text-3xl text-white">{INSTITUTIONAL_METRICS.countries} Países</span>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Switcher + Category Filters (Sticky Control Bar) */}
        <section className="py-6 bg-[#0D0E11] border-b border-white/10 sticky top-[72px] z-30 backdrop-blur-xl bg-opacity-95 shadow-md">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-4">
            {/* Top Row: Timeline Tabs (Próximos vs Realizados) */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2" role="group" aria-label="Filtrar eventos por período">
                <button
                  onClick={() => setTimelineTab("upcoming")}
                  aria-pressed={timelineTab === "upcoming"}
                  className={`px-5 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase transition-all duration-150 border flex items-center gap-2 cursor-pointer ${
                    timelineTab === "upcoming"
                      ? "bg-[#F2C21B] text-black border-[#F2C21B] font-extrabold shadow-[0_2px_10px_rgba(242,194,27,0.3)]"
                      : "bg-[#16181F] text-white/70 hover:text-white border-white/15"
                  }`}
                >
                  <IconCalendar className="w-4 h-4" />
                  <span>Próximos Eventos ({upcomingCount})</span>
                </button>

                <button
                  onClick={() => setTimelineTab("past")}
                  aria-pressed={timelineTab === "past"}
                  className={`px-5 py-2.5 rounded-[2px] text-xs font-mono font-bold uppercase transition-all duration-150 border flex items-center gap-2 cursor-pointer ${
                    timelineTab === "past"
                      ? "bg-[#F2C21B] text-black border-[#F2C21B] font-extrabold shadow-[0_2px_10px_rgba(242,194,27,0.3)]"
                      : "bg-[#16181F] text-white/70 hover:text-white border-white/15"
                  }`}
                >
                  <IconCheck className="w-4 h-4" />
                  <span>Eventos Realizados ({pastCount})</span>
                </button>
              </div>

              {/* Status Note */}
              <span className="text-xs font-mono text-[#AAA8A1]">
                {timelineTab === "upcoming"
                  ? "Sincronização com calendário disponível para próximos eventos"
                  : "Eventos já encerrados com cobertura jornalística"}
              </span>
            </div>

            {/* Bottom Row: Category Pills + Region Filter + Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Pills — Clean SVGs (No Emojis) */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 lg:pb-0 -mx-2 px-2" role="group" aria-label="Filtrar por categoria">
                {[
                  { key: "all", label: "Todos os Tipos" },
                  { key: "nacional", label: "Encontros Oficiais" },
                  { key: "social", label: "Ações Sociais" },
                  { key: "expedicao", label: "Expedições" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setCategoryFilter(tab.key)}
                    aria-pressed={categoryFilter === tab.key}
                    className={`min-h-[38px] px-4 py-2 rounded-[2px] text-xs font-mono font-bold uppercase transition-all duration-150 whitespace-nowrap active:scale-95 cursor-pointer border ${
                      categoryFilter === tab.key
                        ? "bg-white text-black border-white font-extrabold"
                        : "bg-[#16181F] text-white/70 hover:text-white border-white/10"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search and Region Select */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                {/* Region Filter */}
                <div className="relative">
                  <label htmlFor="regiao-eventos" className="sr-only">
                    Filtrar por região
                  </label>
                  <select
                    id="regiao-eventos"
                    aria-label="Filtrar eventos por região"
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="px-3.5 py-2 rounded-[2px] bg-[#16181F] border border-white/15 text-xs font-mono text-white focus:outline-none focus:border-[#F2C21B] cursor-pointer"
                  >
                    <option value="all">Todas as Regiões</option>
                    <option value="sudeste">Região Sudeste</option>
                    <option value="sul">Região Sul</option>
                    <option value="internacional">Internacional</option>
                  </select>
                </div>

                {/* Live Search Input */}
                <div className="relative flex-1 sm:w-64">
                  <IconSearch className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Buscar eventos por cidade, mês ou título"
                    placeholder="Buscar por cidade, mês..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-[2px] bg-[#16181F] border border-white/15 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-[#F2C21B]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      aria-label="Limpar busca de eventos"
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

        {/* Events Grid Section — Industrial Mechanical Styling */}
        <section className="py-16 sm:py-24 bg-[#0A0A0B]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            {filteredEvents.length === 0 ? (
              <div className="p-12 text-center rounded-[2px] bg-[#121316] border border-white/10 max-w-xl mx-auto space-y-4">
                <IconCalendar className="w-10 h-10 text-[#F2C21B] mx-auto opacity-60" />
                <h4 className="font-['Anton'] text-2xl uppercase text-white">Nenhum evento encontrado</h4>
                <p className="text-xs text-[#AAA8A1] font-mono">
                  Tente alterar a aba (Próximos / Realizados) ou ajustar os filtros de busca acima.
                </p>
                <button
                  onClick={() => {
                    setCategoryFilter("all");
                    setRegionFilter("all");
                    setSearchQuery("");
                  }}
                  className="px-6 py-2.5 rounded-[2px] bg-[#F2C21B] text-black text-xs font-mono font-bold uppercase cursor-pointer"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`rounded-[2px] bg-[#111317] border p-6 sm:p-8 lg:p-10 transition-all duration-200 shadow-xl group relative overflow-hidden ${
                      event.isPast
                        ? "border-white/10 opacity-90"
                        : "border-t-white/20 border-b-white/5 border-x-white/10 hover:border-[#F2C21B]/60 hover-lift"
                    }`}
                  >
                    <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
                      {/* Left: Date Block (3 Cols) — Sharp Metal Plaque */}
                      <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start gap-4">
                        <div
                          className={`w-24 sm:w-28 h-24 sm:h-28 rounded-[2px] border-2 p-2 flex flex-col items-center justify-center text-center shadow-lg transition-all ${
                            event.isPast
                              ? "bg-[#141518] border-white/20"
                              : "bg-gradient-to-b from-[#1E2129] to-[#0D0F13] border-[#F2C21B]/60 group-hover:border-[#F2C21B] group-hover:shadow-[0_0_20px_rgba(242,194,27,0.25)]"
                          }`}
                        >
                          <span
                            className={`text-xs font-mono font-black uppercase tracking-wider ${
                              event.isPast ? "text-white/60" : "text-[#F2C21B]"
                            }`}
                          >
                            {event.dateDisplay.monthShort}
                          </span>
                          <span className="font-['Anton'] text-3xl sm:text-4xl text-white leading-none my-0.5">
                            {event.dateDisplay.day}
                          </span>
                          <span className="text-xs font-mono text-white/50 font-bold">
                            {event.dateDisplay.year}
                          </span>
                        </div>

                        <div>
                          <div
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] font-mono text-xs uppercase font-bold tracking-wider border mb-1 ${
                              event.isPast
                                ? "bg-white/10 text-white/80 border-white/20"
                                : "bg-[#F2C21B]/15 text-[#F2C21B] border-[#F2C21B]/40"
                            }`}
                          >
                            <span>{event.statusLabel}</span>
                          </div>
                          <span className="text-xs font-mono text-white/70 block font-semibold">
                            {event.categoryLabel}
                          </span>
                        </div>
                      </div>

                      {/* Center: Event Info & Tactical Sheet (6 Cols) */}
                      <div className="lg:col-span-6 space-y-4">
                        <div>
                          <h3 className="font-['Anton'] text-2xl sm:text-3xl lg:text-4xl uppercase text-white leading-tight tracking-[-0.015em] group-hover:text-[#F2C21B] transition-colors">
                            {event.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#D4D1CA] font-medium mt-1 leading-relaxed">
                            {event.subtitle}
                          </p>
                        </div>

                        {/* Tactical Specs Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#D4D1CA]">
                          <div className="flex items-center gap-2 p-2.5 rounded-[2px] bg-black/50 border border-white/10">
                            <IconPin className="w-4 h-4 text-[#F2C21B] shrink-0" />
                            <span className="truncate" title={event.location}>
                              {event.city} ({event.state})
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-2.5 rounded-[2px] bg-black/50 border border-white/10">
                            <IconClock className="w-4 h-4 text-[#F2C21B] shrink-0" />
                            <span className="truncate">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 p-2.5 rounded-[2px] bg-black/50 border border-white/10">
                            <IconRoute className="w-4 h-4 text-[#F2C21B] shrink-0" />
                            <span className="truncate">{event.routeDistance}</span>
                          </div>
                          <div className="flex items-center gap-2 p-2.5 rounded-[2px] bg-black/50 border border-white/10">
                            <IconShield className="w-4 h-4 text-[#F2C21B] shrink-0" />
                            <span className="truncate">{event.audience}</span>
                          </div>
                        </div>

                        <p className="text-xs text-[#AAA8A1] leading-relaxed line-clamp-2">
                          {event.description}
                        </p>
                      </div>

                      {/* Right: Actions — Differentiated for Upcoming vs Past */}
                      <div className="lg:col-span-3 flex flex-col gap-2.5 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                        {!event.isPast ? (
                          <>
                            {/* Upcoming: 1. Google Calendar Button */}
                            <a
                              href={getGoogleCalendarUrl(event)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full px-4 py-3 rounded-[2px] border border-[#F2C21B] bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase tracking-wider text-xs sm:text-sm transition-all duration-150 shadow-md flex items-center justify-center gap-2 font-extrabold cursor-pointer"
                            >
                              <IconCalendar className="w-4 h-4 text-black" />
                              <span>Google Agenda</span>
                              <span>↗</span>
                            </a>

                            {/* Upcoming: 2. Apple / Outlook .ICS Download */}
                            <button
                              onClick={() => handleDownloadIcs(event)}
                              className="w-full px-4 py-2.5 rounded-[2px] bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/15"
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

                            {/* Upcoming: 3. WhatsApp Share */}
                            <a
                              href={getWhatsAppShareUrl(event)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full px-4 py-2 rounded-[2px] bg-[#25D366]/15 hover:bg-[#25D366]/30 text-[#25D366] font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 border border-[#25D366]/30 cursor-pointer"
                            >
                              <IconChat className="w-3.5 h-3.5" />
                              <span>Convidar no WhatsApp</span>
                            </a>
                          </>
                        ) : (
                          <>
                            {/* Past: Coverage in 18News */}
                            <div className="p-3 bg-black/40 rounded-[2px] border border-white/10 text-center">
                              <span className="text-xs font-mono text-white/50 uppercase block font-bold mb-1">
                                Status da Edição
                              </span>
                              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center justify-center gap-1">
                                <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                                Evento Concluído com Sucesso
                              </span>
                            </div>

                            <Link
                              href="/18news"
                              className="w-full px-4 py-3 rounded-[2px] border border-white/20 hover:border-[#F2C21B] bg-[#16181F] hover:bg-[#1C1F26] text-white hover:text-[#F2C21B] font-['Anton'] uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2"
                            >
                              <span>Ver Cobertura no 18News</span>
                              <IconArrowRight className="w-3.5 h-3.5" />
                            </Link>

                            <Link
                              href="/impacto"
                              className="w-full px-4 py-2.5 rounded-[2px] bg-white/5 hover:bg-white/10 text-[#AAA8A1] hover:text-white font-mono text-xs uppercase font-bold transition-all text-center border border-white/10"
                            >
                              Ver Galeria de Ações
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Security Briefing Footer Callout — Industrial Mechanical */}
        <section className="py-16 bg-[#111215] border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="p-8 sm:p-12 rounded-[2px] bg-[#171920] border-2 border-[#F2C21B]/40 shadow-2xl">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#F2C21B]/20 text-[#F2C21B] font-mono text-xs uppercase font-bold tracking-wider">
                    <IconShield className="w-4 h-4 text-[#F2C21B]" />
                    <span>Conduta de Estrada & Comboio Seguro</span>
                  </div>
                  <h3 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white leading-tight tracking-[-0.015em]">
                    Vai Rodar no Comboio Oficial? Conheça as Regras.
                  </h3>
                  <p className="text-sm text-[#D4D1CA] leading-relaxed max-w-2xl font-medium">
                    Todos os bondes do Insanos MC seguem rígido padrão de formação escalonada, batedores de segurança, carro de apoio e tolerância zero a imprudências. Chegue com o tanque cheio e equipamento completo de proteção.
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <Link
                    href="/faca-parte"
                    className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] uppercase tracking-wider text-sm rounded-[2px] border border-[#F2C21B] text-center shadow-lg transition-all"
                  >
                    Quero Ingressar no Motoclube →
                  </Link>
                  <Link
                    href="/historia"
                    className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase rounded-[2px] border border-white/15 text-center transition-colors"
                  >
                    Ver História & Origem de OZ
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
