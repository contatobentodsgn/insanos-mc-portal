export interface TextItem {
  key: string;
  page: string;
  section: string;
  label: string;
  description?: string;
  defaultValue: string;
}

export const SITE_TEXT_CATALOG: TextItem[] = [
  // ================= HOME =================
  {
    key: "home_hero_badge",
    page: "/",
    section: "Hero Principal",
    label: "Selo Superior do Hero",
    description: "Texto no topo do banner inicial",
    defaultValue: "Original de OZ · Desde 2015 · 18 do Forte",
  },
  {
    key: "home_hero_title",
    page: "/",
    section: "Hero Principal",
    label: "Título Principal do Hero",
    description: "Frase de impacto principal",
    defaultValue: "O maior motoclube do Brasil e do mundo.",
  },
  {
    key: "home_hero_subtitle",
    page: "/",
    section: "Hero Principal",
    label: "Subtítulo do Hero",
    description: "Texto explicativo do hero",
    defaultValue: "Forjados na disciplina, lealdade e respeito mútuo. Nas ruas, na estrada ou na ação social: #SomosDeVerdade.",
  },
  {
    key: "home_pillars_tagline",
    page: "/",
    section: "4 Pilares da Doutrina",
    label: "Subtítulo da Seção 4 Pilares",
    description: "Texto introdutório dos pilares",
    defaultValue: "Para vestir nosso escudo, cada integrante honra esses quatro princípios sagrados. Não há espaço para vaidade ou deslealdade: a conduta na estrada e na vida define quem somos.",
  },
  {
    key: "home_pilar_1_desc",
    page: "/",
    section: "4 Pilares da Doutrina",
    label: "Pilar 1 — Família",
    description: "Descrição do primeiro pilar",
    defaultValue: "A base de tudo. Nenhuma jornada tem sentido se a nossa casa e os nossos não estiverem protegidos e honrados em primeiro lugar.",
  },
  {
    key: "home_pilar_2_desc",
    page: "/",
    section: "4 Pilares da Doutrina",
    label: "Pilar 2 — Trabalho",
    description: "Descrição do segundo pilar",
    defaultValue: "O sustento digno e o esforço diário são inegociáveis. Quem roda com o Insanos trabalha e constrói com suas próprias mãos.",
  },
  {
    key: "home_pilar_3_desc",
    page: "/",
    section: "4 Pilares da Doutrina",
    label: "Pilar 3 — Motoclube",
    description: "Descrição do terceiro pilar",
    defaultValue: "A irmandade leal, a disciplina do comboio e o respeito à hierarquia. Um irmão cuida do outro em qualquer estrada do mundo.",
  },
  {
    key: "home_pilar_4_desc",
    page: "/",
    section: "4 Pilares da Doutrina",
    label: "Pilar 4 — Ação Social",
    description: "Descrição do quarto pilar",
    defaultValue: "Fazer o bem sem olhar a quem. Cada quilômetro rodado deve gerar impacto positivo na vida de quem mais precisa.",
  },
  {
    key: "home_timeline_subtitle",
    page: "/",
    section: "Linha do Tempo",
    label: "Subtítulo da Linha do Tempo",
    description: "Texto introdutório da história na Home",
    defaultValue: "Nossa história foi escrita no asfalto com coragem, união e compromisso irrevogável. Da bravura histórica de 1922 à fundação em Osasco e à consagração como o maior motoclube do planeta.",
  },
  {
    key: "home_social_subtitle",
    page: "/",
    section: "Ação Social",
    label: "Subtítulo da Seção de Ação Social",
    description: "Texto introdutório dos projetos sociais",
    defaultValue: "Arrecadação simultânea em mais de 480 facções para distribuição noturna direta a famílias e pessoas em situação de vulnerabilidade.",
  },
  {
    key: "home_pcd_desc",
    page: "/",
    section: "Ação Social",
    label: "Descrição do Projeto PcD",
    description: "Texto do card maior de Ação Social",
    defaultValue: "Apoiamos e promovemos inclusão, mobilidade e respeito no motociclismo. Porque liberdade também é poder ir e vir sobre duas ou três rodas.",
  },
  {
    key: "home_bonde_desc",
    page: "/",
    section: "Ação Social",
    label: "Descrição Bonde Pela Vida",
    description: "Texto do card de doação de sangue",
    defaultValue: "Conscientização no trânsito, doação de sangue e responsabilidade social em todo o país.",
  },
  {
    key: "home_combate_desc",
    page: "/",
    section: "Ação Social",
    label: "Descrição Combate Insano",
    description: "Texto do card de artes marciais",
    defaultValue: "Ações de inclusão através de artes marciais para jovens em áreas de vulnerabilidade.",
  },
  {
    key: "home_leadership_subtitle",
    page: "/",
    section: "Liderança e Legado",
    label: "Subtítulo da Seção de Liderança",
    description: "Texto introdutório do comando na Home",
    defaultValue: "Uma organização mundial com hierarquia clara, disciplina inegociável e respeito solene àqueles que abriram a estrada.",
  },
  {
    key: "home_content_subtitle",
    page: "/",
    section: "Hub de Conteúdo",
    label: "Subtítulo do Hub de Conteúdo (18News)",
    description: "Texto do card de destaque de notícias",
    defaultValue: "Uma reportagem sobre o que nos move todos os dias: propósito, lealdade e atitudes que transformam.",
  },

  // ================= HISTÓRIA =================
  {
    key: "historia_hero_title",
    page: "/historia",
    section: "História & Tradição",
    label: "Título do Hero da História",
    description: "Título principal da página /historia",
    defaultValue: "A Força Que Vem da Tradição.",
  },
  {
    key: "historia_hero_subtitle",
    page: "/historia",
    section: "História & Tradição",
    label: "Subtítulo da História",
    description: "Texto de abertura da página /historia",
    defaultValue: "Nascemos da coragem, da disciplina e da vontade de criar uma verdadeira família na estrada. Conheça as origens, os valores e a evolução da maior irmandade de motociclistas do planeta.",
  },
  {
    key: "historia_18forte_desc",
    page: "/historia",
    section: "História & Tradição",
    label: "Os 18 do Forte de Copacabana",
    description: "Texto sobre o simbolismo dos 18 do Forte",
    defaultValue: "Para o Insanos MC, esse número sintetiza nossa essência: lealdade inegociável, união na adversidade e a certeza de que nenhum irmão é deixado para trás.",
  },

  // ================= COMANDO =================
  {
    key: "comando_hero_subtitle",
    page: "/comando",
    section: "Comando & Memorial",
    label: "Subtítulo do Comando Mundial",
    description: "Texto de abertura da página /comando",
    defaultValue: "Conheça os responsáveis pela administração, representação e coordenação dos capítulos no Brasil e no exterior.",
  },
  {
    key: "comando_memorial_text",
    page: "/comando",
    section: "Comando & Memorial",
    label: "Texto Solene do Memorial In Memoriam",
    description: "Homenagem aos irmãos que partiram",
    defaultValue: "Prestamos tributo e solene gratidão aos irmãos que dedicaram suas vidas à construção, fortalecimento e honra do Insanos Moto Clube. Em especial ao nosso irmão e cofundador Edson Lopes, cuja conduta, bravura e espírito de fraternidade permanecem gravados para sempre em nossos corações.",
  },
  {
    key: "comando_edson_desc",
    page: "/comando",
    section: "Comando & Memorial",
    label: "Homenagem a Edson Lopes",
    description: "Texto do card de Edson Lopes",
    defaultValue: "Líder exemplar cuja integridade moldou o regimento de disciplina e conduta do clube desde a fundação em 2015. Seu legado continuará guiando cada comboio pelo mundo.",
  },
  {
    key: "comando_fundadores_desc",
    page: "/comando",
    section: "Comando & Memorial",
    label: "Homenagem aos Fundadores de 2015",
    description: "Texto do card dos Fundadores Originais de OZ",
    defaultValue: "Aos pioneiros liderados por Jonatas Kiss Feitosa, Bugdam Alves Nunes, Edson Lopes e Bin, que tiveram a coragem de romper paradigmas e fundar em Osasco uma nova história de fraternidade e caridade.",
  },

  // ================= IMPACTO =================
  {
    key: "impacto_hero_subtitle",
    page: "/impacto",
    section: "Impacto Social",
    label: "Subtítulo da Página de Impacto",
    description: "Texto de abertura de /impacto",
    defaultValue: "Nosso destino é fazer o bem. Rodar na estrada é nossa paixão, mas apoiar quem precisa e estender a mão à comunidade é o que dá sentido à nossa irmandade.",
  },
  {
    key: "impacto_pcd_stats",
    page: "/impacto",
    section: "Impacto Social",
    label: "Resultado Auditado — Projeto PcD",
    description: "Estatística de motos adaptadas",
    defaultValue: "+450 Triciclos e motos adaptadas em todo o país",
  },
  {
    key: "impacto_sangue_stats",
    page: "/impacto",
    section: "Impacto Social",
    label: "Resultado Auditado — Bonde Pela Vida",
    description: "Estatística de bolsas de sangue",
    defaultValue: "+25.000 Bolsas de sangue coletadas",
  },
  {
    key: "impacto_combate_stats",
    page: "/impacto",
    section: "Impacto Social",
    label: "Resultado Auditado — Combate Insano",
    description: "Estatística de crianças e jovens",
    defaultValue: "+1.200 Crianças e adolescentes atendidos",
  },
  {
    key: "impacto_alimentos_stats",
    page: "/impacto",
    section: "Impacto Social",
    label: "Resultado Auditado — Ação Social Permanente",
    description: "Estatística de doações entregues",
    defaultValue: "+420 Toneladas de alimentos e agasalhos entregues",
  },

  // ================= FAÇA PARTE =================
  {
    key: "faca_parte_subtitle",
    page: "/faca-parte",
    section: "Faça Parte / Alistamento",
    label: "Subtítulo do Formulário de Alistamento",
    description: "Texto de abertura do cadastro de novos membros",
    defaultValue: "Preencha seus dados de contato, região e dados de motocicleta para que a diretoria regional do seu estado entre em contato.",
  },
];
