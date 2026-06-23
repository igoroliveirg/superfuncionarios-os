// Moda / vestuário.
// Persona = Patrícia, Trabalha fora, agenda cheia, odeia perder sábado no provador.
export const MODA = {
  label: "Moda / vestuário",
  accentDefault: "#be123c",
  pesquisa: {
    persona: {
      nome: "Patrícia", idade: 37,
      contexto: "Trabalha fora, agenda cheia, odeia perder sábado no provador",
      fat: "R$ 6 a 12 mil", fatLabel: "renda mensal",
      time: "compra por impulso, se arrepende e devolve metade",
      traits: [
        "Quer se vestir bem sem virar projeto de fim de semana",
        "Já comprou peça linda na arara que nunca usou",
        "Tem medo de gastar e a roupa não cair bem no corpo dela",
        "Confia em quem entende o estilo dela, não no que está na moda",
      ],
      naoE: "Quem caça só promoção, leva 5 peças baratas e some até a próxima liquidação.",
    },
    dores: [
      "Compro peça que fica linda na loja e estranha em mim.",
      "Perco meu sábado inteiro no provador e volto de mãos vazias.",
      "Meu armário tá cheio e nunca tenho o que vestir.",
    ],
    desejos: [
      "Abrir o armário e montar look em 5 minutos.",
      "Comprar uma peça e saber que ela cai bem no meu corpo.",
      "Me olhar no espelho e gostar do que vejo.",
    ],
  },
  copywriter: {
    headlineAfter: "Vista o que cai bem em você com a {empresa}: peça certa pro seu corpo, sem perder o sábado no provador.",
    angles: [
      { tag: 'Medo', h: "Mais uma peça linda parada no armário sem nunca sair de casa?", score: 74, note: "dor de errar a compra e desperdiçar dinheiro" },
      { tag: 'Desejo', h: "Abra o armário e monte o look em 5 minutos, sem estresse.", score: 84, note: "desejo de praticidade e confiança no espelho" },
      { tag: 'Prova', h: "Mais de 800 mulheres já saíram da {empresa} com a peça certa na primeira prova.", score: 92, note: "prova social com número e resultado concreto" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Atendimento por estilo", "Prova marcada"],
      pre: "Para quem quer se vestir bem sem perder o sábado no provador",
      h1Typed: "Vista o que cai bem em você com a {empresa}: a peça certa pro seu corpo, sem errar a compra.",
      h1Pre: "Vista o que cai bem em você com a ",
      h1Grad: '{empresa}',
      h1Post: ": a peça certa pro seu corpo, sem errar a compra.",
      sub: "A gente lê seu corpo e seu estilo, separa as peças antes de você chegar e monta os looks. Você prova 4, leva o que ama e sai vestida.",
      cta: "QUERO MINHA PROVA",
      ctaNote: "Atendimento marcado em 1 min",
    },
    ticker: [
      { v: "+800", l: "mulheres vestidas" },
      { v: "4,9★", l: "no Google" },
      { v: "40 min", l: "da prova ao look pronto" },
    ],
    depoimentos: [
      { nome: "Carla Menezes", cargo: "advogada, 41", txt: "Cheguei sem saber o que queria, saí com 3 peças que uso toda semana. Provei só o que cabia em mim." },
      { nome: "Renata Lima", cargo: "dentista, 35", txt: "Odeio provador. Elas separaram tudo antes, provei 4 e levei 2 em meia hora. Nunca mais comprei errado." },
      { nome: "Juliana Souza", cargo: "gerente comercial, 39", txt: "Acertaram meu estilo na primeira visita. Hoje monto look em 5 minutos e recebo elogio no trabalho." },
    ],
    includes: [
      "Leitura do seu corpo e do seu estilo antes de provar",
      "Peças separadas pro seu tom de pele e biotipo",
      "Montagem de 3 looks que combinam com o que você já tem",
      "Ajuste e troca em até 7 dias se algo não caiu bem",
    ],
    offer: {
      eyebrow: "O atendimento",
      hPre: "Você sai com ", hGrad: "a peça certa e o look montado", hPost: ", sem provar 20 cabides",
      cdLab: "As vagas de atendimento desta semana fecham em", cdWhen: "Horários desta semana", cdFoot: "Agenda e coleção podem mudar",
      guaranteeTitle: "Caiu bem ou a gente ajusta", guaranteeText: "Levou pra casa e não ficou como queria? Troca ou ajuste em até 7 dias, sem rodeio.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Como saber qual modelagem cai bem no seu corpo, antes de comprar." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Um sábado de atendimento: como a gente separa as peças antes de você chegar." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Carla chegou sem saber o que queria e saiu com 3 peças que usa toda semana." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "3 erros que enchem o armário de roupa que você nunca veste." },
    ],
    tags: ["#modafeminina", "#estilo", "#consultoriadeimagem", "#lookdodia", "#vestirbem", "#modaparamulheres", "#guardaroupa", "#personalstylist"],
  },
}
