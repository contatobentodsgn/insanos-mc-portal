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
    title: "Encontro Nacional em Osasco reúne mais de 6.000 motos e arrecada 30 toneladas de alimentos",
    desc: "A celebração histórica no berço do motoclube reuniu comboios de todas as regiões do Brasil e delegações internacionais em um fim de semana de celebração e caridade.",
    readTime: "5 min de leitura",
    author: "Redação 18News",
    image: "/images/insanos/news_featured_aniversario.webp",
    featured: true,
    content: `Mais de seis mil motocicletas rugiram em uníssono pelas ruas de Osasco durante a celebração do Encontro Nacional Insanos MC 2026. O evento, que já se consolidou como uma das maiores reuniões de motociclistas de conduta do continente, teve como ponto alto a entrega de 30 toneladas de alimentos não perecíveis a instituições de acolhimento social do município.
    
Comboios organizados partiram simultaneamente do Sul, Nordeste, Centro-Oeste, Minas Gerais e Rio de Janeiro, cruzando as rodovias com a disciplina e padronização militar que caracterizam o clube.
    
"Nosso objetivo ao nos reunirmos não é apenas acelerar; é demonstrar a força da fraternidade e retribuir à comunidade", declarou o comando durante a cerimônia de encerramento.`,
  },
  {
    slug: "expedicao-rota-40-patagonia",
    tag: "Expedições",
    date: "12 Ago 2026",
    title: "Expedição Rota 40: Irmãos cruzam a Patagônia e levam apoio às comunidades do extremo sul",
    desc: "Mais de 8.000 km rodados sob condições climáticas extremas e ventos patagônicos levando agasalhos e donativos a escolas rurais da cordilheira.",
    readTime: "7 min de leitura",
    author: "Divisão Internacional",
    image: "/images/insanos/history_today.webp",
    featured: false,
    content: `Uma equipe de vinte motociclistas do Insanos MC completou com sucesso a travessia de 8.000 km pela mítica Rota 40, na Argentina, chegando a Ushuaia, a cidade do fim do mundo.
    
A viagem foi marcada por ventos laterais superiores a 90 km/h e temperaturas negativas, exigindo o mais alto nível de pilotagem em comboio e companheirismo mútuo.
    
Ao longo do trajeto, o grupo visitou três escolas rurais isoladas da Patagônia, entregando agasalhos térmicos, cobertores e materiais escolares arrecadados previamente pelas divisões sul-americanas.`,
  },
  {
    slug: "bonde-pela-vida-recorde-historico",
    tag: "Ação Social",
    date: "05 Ago 2026",
    title: "Campanha Bonde Pela Vida bate recorde histórico com mais de 3.500 doações simultâneas de sangue",
    desc: "Mobilização em 42 hemocentros espalhados por todo o território nacional supriu os estoques para emergências hospitalares.",
    readTime: "4 min de leitura",
    author: "Diretoria Social",
    image: "/images/insanos/impact_blood.webp",
    featured: false,
    content: `A campanha nacional 'Bonde Pela Vida' alcançou uma marca histórica neste inverno. Em uma ação coordenada em 42 hemocentros estaduais e municipais, mais de 3.500 bolsas de sangue foram doadas em apenas 48 horas por integrantes, familiares e apoiadores do clube.
    
A ação permitiu abastecer hospitais públicos em um período historicamente crítico de queda nas doações, reforçando o lema de que nosso combustível é a solidariedade.`,
  },
  {
    slug: "podcast-18cast-ep-44-filosofia",
    tag: "18Cast",
    date: "28 Jul 2026",
    title: "18Cast Ep. #44: A filosofia do motociclismo de conduta e a superação dos desafios na estrada",
    desc: "Uma conversa profunda sobre respeito à hierarquia, histórias da fundação de 2015 e o papel de cada integrante na sociedade.",
    readTime: "52 min de áudio",
    author: "Núcleo de Podcast",
    image: "/images/insanos/podcast_18cast_studio.webp",
    featured: false,
    content: `No 44º episódio do 18Cast, recebemos veteranos do clube para discutir a evolução da doutrina dos 4 Pilares (Deus, Família, Trabalho e Motoclube) e como a disciplina militar aplicada ao motociclismo transformou a vida de milhares de homens e mulheres em mais de 65 países.`,
  },
];
