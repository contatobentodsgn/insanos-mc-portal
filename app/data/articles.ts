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
    slug: "lancamentos-harley-davidson-cvo-grand-american-touring",
    tag: "Motos & Lançamentos",
    date: "24 Ago 2026",
    title: "Harley-Davidson revela nova linha Grand American Touring e CVO com motor Milwaukee-Eight 121 VVT",
    desc: "Street Glide e Road Glide chegam com aerodinâmica retrabalhada em túnel de vento, suspensão Showa ajustável e nova central multimídia Skyline OS de 12.3 polegadas para grandes viagens.",
    readTime: "6 min de leitura",
    author: "Redação Duas Rodas 18News",
    image: "/images/insanos/motos_lancamentos_showcase.jpg",
    featured: true,
    content: `A Harley-Davidson apresentou oficialmente a nova geração da família Grand American Touring e sua cobiçada linha CVO (Custom Vehicle Operations), estabelecendo um novo patamar de conforto, tecnologia e torque para viagens continentais em comboio.

Equipadas com o poderoso motor Milwaukee-Eight 121 VVT (comando de válvulas variável) e refrigeração líquida nas cabeças dos cilindros, as novas Street Glide e Road Glide oferecem entrega linear de potência, torque massivo em rotações baixas e redução considerável do calor emitido para as pernas do piloto.

Entre as principais inovações técnicas destacam-se:
- Redução de peso de aproximadamente 14 kg em relação à geração anterior;
- Carenagens Batwing e Sharknose reprojetadas com controle dinâmico de fluxo de ar e defletores ajustáveis que reduzem o impacto do vento no capacete em até 60%;
- Suspensão invertida Showa na dianteira com 117 mm de curso e amortecedores traseiros de emulsão com pré-carga rápida;
- Sistema de infoentretenimento Skyline OS com tela touchscreen antirreflexo de 12.3 polegadas, navegação GPS offline nativa e compatibilidade total com comunicadores de capacete;
- Modos de pilotagem eletrônicos (Road, Sport, Rain e Custom) integrados ao controle de tração sensível à inclinação e ABS em curvas.

Para motociclistas de estrada que percorrem milhares de quilômetros em comboios e travessias interestaduais, a nova linha consolida o equilíbrio perfeito entre o DNA clássico custom e a eletrônica de ponta.`,
  },
  {
    slug: "bmw-motorrad-nova-r1300-gs-adventure-r18-custom",
    tag: "Motos & Lançamentos",
    date: "20 Ago 2026",
    title: "BMW Motorrad lança nova R 1300 GS Adventure e série especial da Cruiser R 18",
    desc: "Com tanque de 30 litros, transmissão automatizada ASA e suspensão eletrônica adaptativa, a Big Trail alemã redefine a autonomia para travessias extremas ao lado da clássica R 18.",
    readTime: "5 min de leitura",
    author: "Redação Duas Rodas 18News",
    image: "/images/insanos/expedicoes/expedicao_1.webp",
    featured: false,
    content: `A BMW Motorrad expandiu sua presença no segmento de longa distância com o lançamento mundial da nova R 1300 GS Adventure e de novas variantes da imponente Cruiser R 18.

A nova R 1300 GS Adventure traz motor Boxer de 1.300cc que desenvolve 145 cv de potência a 7.750 rpm e 149 Nm de torque. O destaque fica por conta do sistema opcional Automated Shift Assistant (ASA), que elimina a necessidade da manete de embreagem e realiza trocas suaves de marcha automáticas ou manuais via pedal, reduzindo a fadiga em viagens de mais de 1.000 km por dia.

Destaques da máquina:
- Tanque de combustível em alumínio de 30 litros com pontos de ancoragem rápida para bolsas de tanque;
- Suspensão Dynamic Suspension Adjustment (DSA) com ajuste dinâmico de amortecimento e controle de altura do veículo em paradas;
- Farol Matrix LED compacto integrado ao radar frontal para piloto automático adaptativo (ACC) e aviso de colisão;
- Nova Cruiser R 18 com o emblemático 'Big Boxer' de 1.802cc, agora com novo acabamento Dark Shadow e escape reto customizado de fábrica.`,
  },
  {
    slug: "triumph-rocket-3-storm-maior-motor-producao",
    tag: "Motos & Lançamentos",
    date: "15 Ago 2026",
    title: "Triumph Rocket 3 Storm: O maior motor de motocicleta do mundo entrega 182 cv e torque brutal de 225 Nm",
    desc: "A muscle bike britânica ganha versão Storm com rodas mais leves, eletrônica refinada com modos de pilotagem táticos e acabamento escurecido de fábrica.",
    readTime: "5 min de leitura",
    author: "Redação Duas Rodas 18News",
    image: "/images/insanos/harley_custom_cruiser_2026.jpg",
    featured: false,
    content: `A fabricante britânica Triumph Motorcycles elevou a potência do lendário motor tricilíndrico em linha de 2.458cc com o lançamento das novas Rocket 3 Storm R e Rocket 3 Storm GT.

O novo acerto de injeção e componentes internos gerou um ganho de 15 cv, atingindo impressionantes 182 cv a 7.000 rpm e um torque inacreditável de 225 Nm já a 4.000 rpm. Para colocar essa força no chão, as rodas de alumínio fundido de 10 raios reduziram a massa não suspensa em 1 kg, proporcionando respostas mais ágeis em curvas sinuosas de serra.

Especificações de destaque:
- Chassi de alumínio hidroformado de alta rigidez;
- Freios Brembo Stylema de competição com discos dianteiros de 320 mm e pinça monobloco traseira;
- Eletrônica IMU de 6 eixos com ABS em curva, controle de tração ajustável e assistente de partida em rampa;
- Posição de pilotagem ajustável na versão GT para conforto superior em rodovias de piso irregular.`,
  },
  {
    slug: "indian-motorcycle-nova-geracao-scout-challenger-powerplus",
    tag: "Motos & Lançamentos",
    date: "10 Ago 2026",
    title: "Indian Motorcycle renova a icônica Scout e apresenta a Bagger Challenger com motor PowerPlus 108",
    desc: "Novo chassi de aço tubular, motor SpeedPlus 1250 com refrigeração líquida e tecnologia de conectividade Ride Command desafiam o segmento custom norte-americano.",
    readTime: "4 min de leitura",
    author: "Redação Duas Rodas 18News",
    image: "/images/insanos/pillar_03_carater_trabalho.webp",
    featured: false,
    content: `A Indian Motorcycle anunciou uma reformulação completa na clássica família Scout (modelos Bobber, Sport e Classic) e aprimoramentos para a Bagger Challenger.

A nova plataforma Scout estreia o motor V-Twin SpeedPlus 1250 refrigerado a líquido, entregando até 111 cv de potência e torque vigoroso em qualquer marcha. O novo chassi foi projetado pensando em customizadores, facilitando a troca de guidões, assentos solo e escapamentos esportivos.

Para o segmento Touring de alta performance, a Challenger mantém sua liderança com a carenagem montada no chassi (frame-mounted), suspensão traseira Fox ajustável e motor PowerPlus 108 V-Twin de 122 cv e 178 Nm de torque.`,
  },
  {
    slug: "royal-enfield-super-meteor-shotgun-650-customizacao",
    tag: "Motos & Lançamentos",
    date: "04 Ago 2026",
    title: "Royal Enfield expande portfólio 650cc com a Bobber Shotgun 650 e Super Meteor estradeira",
    desc: "A plataforma bicilíndrica 650 Twin conquista motociclistas de estrada pela facilidade de customização, ciclística estável e excelente acessibilidade mecânica.",
    readTime: "4 min de leitura",
    author: "Redação Duas Rodas 18News",
    image: "/images/insanos/news_featured_aniversario.webp",
    featured: false,
    content: `Com forte presença no cenário de customização mundial, a Royal Enfield consolidou sua linha de dois cilindros paralelos de 648cc com a chegada da Shotgun 650, uma bobber modular inspirada no conceito SG650.

O modelo permite alternar rapidamente entre assento individual com paralamas exposto, assento duplo ou configuração com bagageiro de aço traseiro para longas viagens. A ciclística desenvolvida pela lendária Harris Performance conta com garfo invertido Showa SF-BPF de 43 mm e rodas de 18 polegadas na frente e 17 na traseira, garantindo estabilidade exemplar no asfalto.`,
  },
  {
    slug: "ducati-diavel-v4-multistrada-v4-rally-tecnologia",
    tag: "Motos & Lançamentos",
    date: "29 Jul 2026",
    title: "Ducati Multistrada V4 Rally e Diavel V4 unem esportividade italiana e alta autonomia para viagens",
    desc: "Motor V4 Granturismo de 170 cv com desativação estendida de cilindros e autonomia superior a 500 km elevam o padrão de performance no turismo de aventura.",
    readTime: "5 min de leitura",
    author: "Redação Duas Rodas 18News",
    image: "/images/insanos/pillar_04_estrada_motoclube.webp",
    featured: false,
    content: `A marca italiana Ducati reforçou sua linha de alto desempenho estradeiro com as novas versões da Diavel V4 e Multistrada V4 Rally.

O motor V4 Granturismo de 1.158cc dispensa o tradicional sistema desmodrômico em favor de molas de retorno de válvula de alta durabilidade, permitindo intervalos de checagem de folga de válvulas de impressionantes 60.000 km — ideal para pilotos que cruzam continentes inteiros sem paradas para manutenção pesada.

Com tanque de 30 litros na versão Rally, suspensão Skyhook semi-ativa com curso ampliado de 200 mm e radares frontal e traseiro (com detector de ponto cego nos espelhos), o modelo oferece segurança inigualável para viagens em grupo e estradas de serra sob qualquer clima.`,
  },
  {
    slug: "encontro-nacional-osasco-2026",
    tag: "Eventos",
    date: "18 Ago 2026",
    title: "Encontro em Osasco reúne 6 mil motos e 30 toneladas de alimentos",
    desc: "Celebração no berço do motoclube reuniu comboios de todas as regiões do Brasil e delegações internacionais em um fim de semana de estrada e caridade.",
    readTime: "5 min de leitura",
    author: "Redação 18News",
    image: "/images/insanos/news_featured_aniversario.webp",
    featured: false,
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
