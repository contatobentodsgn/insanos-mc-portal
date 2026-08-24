/**
 * Fonte Única de Verdade (Single Source of Truth) para Métricas Institucionais Oficiais
 * do Insanos Moto Clube.
 *
 * Qualquer atualização nos números globais do clube deve ser feita exclusivamente neste arquivo,
 * garantindo consistência matemática e editorial em 100% das páginas, componentes e metadados.
 */

export const INSTITUTIONAL_METRICS = {
  // Fundação & Origem
  foundingYear: 2015,
  foundingCity: "Osasco/SP",
  birthplace: "Berço Oficial de OZ (Osasco, São Paulo)",
  originsArticle: "18 do Forte de Copacabana (1922)",

  // Métricas Globais Oficiais
  members: "+12.000",
  membersRaw: 12000,
  membersLabel: "Integrantes Ativos",

  countries: "65",
  countriesRaw: 65,
  countriesLabel: "Países Presentes",

  chapters: "480+",
  chaptersRaw: 480,
  chaptersLabel: "Capítulos & Facções",

  familiesAssisted: "+10.000",
  familiesAssistedRaw: 10000,
  familiesAssistedLabel: "Famílias Atendidas",

  // Pilares Doutrinários & Lemas
  slogan: "#SomosDeVerdade",
  motto: "Nosso destino é fazer o bem.",
  creed: "Colete não cria irmão. Atitude cria.",
  pillars: ["01 DEUS", "02 FAMÍLIA", "03 TRABALHO", "04 MOTOCLUBE"],

  // Informações de Contato & Governança
  dpoEmail: "privacidade@insanosmc.com.br",
  headquartersAddress: "Av. dos Autonomistas, 1818 — Osasco/SP",
} as const;

export type InstitutionalMetrics = typeof INSTITUTIONAL_METRICS;
