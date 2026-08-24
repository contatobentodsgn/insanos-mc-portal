export interface Article {
  slug: string;
  tag: string;
  date: string;
  title: string;
  desc: string;
  readTime: string;
  author: string;
  image: string;
  featured?: boolean;
  content: string;
}

export const ARTICLES_DATA: Article[] = [
  {
    slug: "encontro-nacional-osasco-2026",
    tag: "Eventos",
    date: "18 Ago 2026",
    title: "Encontro em Osasco reúne 6 mil motos e 30 toneladas de alimentos",
    desc: "Celebração no berço do motoclube reuniu comboios de todas as regiões do Brasil e delegações internacionais em um fim de semana de estrada e caridade.",
    readTime: "5 min de leitura",
    author: "Redação 18News",
    image: "/images/insanos/news_featured_aniversario.webp",
    featured: true,
    content: `Mais de seis mil motocicletas percorreram as ruas de Osasco durante a celebração do Encontro Nacional Insanos MC 2026. O evento teve como ponto alto a entrega de 30 toneladas de alimentos não perecíveis a instituições de acolhimento social do município.
    
Comboios organizados partiram simultaneamente do Sul, Nordeste, Centro-Oeste, Minas Gerais e Rio de Janeiro, cruzando as rodovias com respeito à segurança e disciplina de estrada.
    
"Nosso objetivo ao nos reunirmos não é apenas rodar; é demonstrar a força da fraternidade e retribuir à comunidade", destacou a diretoria durante o encerramento.`,
  },
  {
    slug: "expedicao-rota-40-patagonia",
    tag: "Expedições",
    date: "12 Ago 2026",
    title: "Expedição Rota 40: Travessia de 8 mil km pela Patagônia",
    desc: "Mais de 8.000 km rodados sob ventos extremos e frio intenso, levando doações de agasalhos a escolas rurais da cordilheira.",
    readTime: "7 min de leitura",
    author: "Divisão Internacional",
    image: "/images/insanos/history_today.webp",
    featured: false,
    content: `Uma equipe de vinte motociclistas do Insanos MC completou com sucesso a travessia de 8.000 km pela mítica Rota 40, na Argentina, chegando a Ushuaia.
    
A viagem foi marcada por ventos laterais fortes e temperaturas negativas, exigindo pilotagem atenta em comboio e companheirismo mútuo.
    
Ao longo do trajeto, o grupo visitou escolas rurais isoladas da Patagônia, entregando agasalhos térmicos, cobertores e materiais arrecadados previamente pelos capítulos sul-americanos.`,
  },
  {
    slug: "bonde-pela-vida-recorde-historico",
    tag: "Ação Social",
    date: "05 Ago 2026",
    title: "Bonde Pela Vida bate recorde com 3.500 doações de sangue",
    desc: "Mobilização solidária em 42 hemocentros espalhados pelo Brasil ajudou a suprir estoques em período de baixas doações.",
    readTime: "4 min de leitura",
    author: "Diretoria Social",
    image: "/images/insanos/impact_blood.webp",
    featured: false,
    content: `A campanha nacional 'Bonde Pela Vida' alcançou uma marca expressiva neste inverno. Em uma ação coordenada em 42 hemocentros estaduais e municipais, mais de 3.500 bolsas de sangue foram doadas em 48 horas por integrantes e apoiadores do motoclube.
    
A ação permitiu abastecer hospitais públicos em um período historicamente crítico de queda nas doações, reforçando o compromisso social de estender a mão a quem precisa.`,
  },
  {
    slug: "podcast-18cast-ep-44-filosofia",
    tag: "18Cast",
    date: "28 Jul 2026",
    title: "18Cast #44: Bastidores da estrada e a fundação do motoclube",
    desc: "Uma conversa franca sobre histórias da fundação de 2015 em Osasco, os 4 Pilares e a convivência de irmandade na estrada.",
    readTime: "52 min de áudio",
    author: "Núcleo 18Cast",
    image: "/images/insanos/podcast_18cast_studio.webp",
    featured: false,
    content: `No 44º episódio do 18Cast, recebemos integrantes pioneiros do clube para relembrar a trajetória de fundação em Osasco em 2015, a importância dos 4 Pilares (Deus, Família, Trabalho e Motoclube) e as lições aprendidas em mais de uma década rodando pelo Brasil e pelo mundo.`,
  },
  {
    slug: "18store-nova-colecao-oficial",
    tag: "18Store",
    date: "20 Jul 2026",
    title: "18Store apresenta nova linha oficial de jaquetas e acessórios",
    desc: "Vestuário resistente e equipamentos de pilotagem testados na estrada com renda revertida para a manutenção das ações sociais.",
    readTime: "3 min de leitura",
    author: "18Store Oficial",
    image: "/images/insanos/store_merch_official.webp",
    featured: false,
    content: `A 18Store oficial apresentou sua nova linha de vestuário e acessórios para motociclistas. Desenvolvidas com tecidos de alta durabilidade e modelagem voltada para longas viagens no asfalto, as peças já estão disponíveis na loja virtual do clube.
    
Parte dos recursos arrecadados com os produtos oficiais é destinada ao fundo de apoio às campanhas sociais do Insanos MC em todo o território nacional.`,
  },
  {
    slug: "radio-insanos-programacao-24h",
    tag: "Rádio Insanos",
    date: "10 Jul 2026",
    title: "Rádio Insanos Web expande grade de clássicos do rock 24 horas",
    desc: "A rádio oficial dos motociclistas alcança ouvintes em mais de 40 países com rock clássico, notícias da estrada e boletins informativos.",
    readTime: "4 min de leitura",
    author: "Equipe Rádio Insanos",
    image: "/images/insanos/radio_insanos_live.webp",
    featured: false,
    content: `Com transmissão digital ininterrupta, a Rádio Insanos Web consolidou sua nova grade musical dedicada ao bom e velho rock'n'roll, boletins sobre condições de estradas e informações sobre os encontros e eventos dos capítulos.
    
A emissora online já conta com ouvintes frequentes em mais de 40 países, conectando motociclistas que amam a cultura da estrada.`,
  },
];
