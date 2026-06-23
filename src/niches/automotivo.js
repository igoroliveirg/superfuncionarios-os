// Oficina / automotivo.
// Persona = Rafael, Carro é ferramenta de trabalho, não pode ficar parado.
export const AUTOMOTIVO = {
  label: "Oficina / automotivo",
  accentDefault: "#2563eb",
  pesquisa: {
    persona: {
      nome: "Rafael", idade: 37,
      contexto: "Carro é ferramenta de trabalho, não pode ficar parado",
      fat: "R$ 4 a 9 mil", fatLabel: "renda mensal",
      time: "pesquisa indicação, desconfia de preço fechado fácil",
      traits: [
        "Já levou gato em outra oficina e ficou queimado",
        "Quer saber o preço antes, sem surpresa na entrega",
        "Depende do carro pronto na data pro trabalho",
        "Pergunta tudo, quer entender o que vão fazer",
      ],
      naoE: "Quem liga só pra cotar preço por telefone e some quando marca a entrada do carro.",
    },
    dores: [
      "Levei pra arrumar uma coisa e voltou com outro problema.",
      "Orçamento começou em 800 e fechou em 2 mil na hora de pagar.",
      "Falaram três dias e ficou três semanas com meu carro parado.",
    ],
    desejos: [
      "Saber o valor final antes, sem aumentar na entrega.",
      "Pegar o carro no dia que marcaram.",
      "Confiar que trocaram a peça certa, com nota fiscal.",
    ],
  },
  copywriter: {
    headlineAfter: "Conserto na {empresa}: orçamento fechado antes, carro pronto na data, sem peça remarcada.",
    angles: [
      { tag: 'Medo', h: "Já pegou o carro com problema novo que não tinha quando deixou?", score: 74, note: "medo de sair pior do que entrou" },
      { tag: 'Desejo', h: "Orçamento fechado antes, carro pronto no dia marcado.", score: 84, note: "desejo de previsibilidade e prazo" },
      { tag: 'Prova', h: "Na {empresa}, 9 em cada 10 carros saem na data combinada, com peça de nota fiscal.", score: 92, note: "prova de prazo e peça rastreável" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Diagnóstico em 24h", "Orçamento por escrito"],
      pre: "Pra quem cansou de oficina que enrola e estoura o orçamento",
      h1Typed: "Conserte seu carro na {empresa}: preço fechado antes, prazo cumprido e peça certa no lugar",
      h1Pre: "Conserte seu carro na ",
      h1Grad: '{empresa}',
      h1Post: ": preço fechado antes, prazo cumprido e peça certa no lugar",
      sub: "A gente faz o diagnóstico, te passa o orçamento fechado por escrito e só começa com seu ok. Você acompanha cada peça trocada por foto.",
      cta: "QUERO MEU ORÇAMENTO",
      ctaNote: "Diagnóstico e orçamento em 24h",
    },
    ticker: [
      { v: "+3.400", l: "carros consertados" },
      { v: "4,9★", l: "nota dos clientes" },
      { v: "24h", l: "diagnóstico e orçamento" },
    ],
    depoimentos: [
      { nome: "Cláudio", cargo: "motorista de app", txt: "Deixei o carro numa sexta, peguei na terça como combinaram. O orçamento foi o mesmo do começo, sem aumentar." },
      { nome: "Vanessa", cargo: "dona de pet shop", txt: "Mostraram cada peça trocada por foto e a nota fiscal. Nunca tinha visto oficina fazer isso." },
      { nome: "Diego", cargo: "representante comercial", txt: "Meu carro é meu escritório. Eles entenderam a pressa e entregaram no prazo." },
    ],
    includes: [
      "Diagnóstico completo antes de qualquer serviço",
      "Orçamento fechado por escrito, sem aumentar na entrega",
      "Foto e nota fiscal de cada peça trocada",
      "3 meses de garantia no serviço e na peça",
    ],
    offer: {
      eyebrow: "O atendimento",
      hPre: "Você sai com o ", hGrad: "carro pronto e o orçamento cumprido", hPost: ", na data combinada",
      cdLab: "As vagas de entrada desta semana acabam em", cdWhen: "Carros que entram esta semana", cdFoot: "Agenda pode lotar antes do prazo",
      guaranteeTitle: "3 meses de garantia no serviço", guaranteeText: "Voltou o mesmo defeito dentro de 3 meses, a gente refaz sem cobrar de novo.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Como saber se a peça que puseram no seu carro é nova ou remarcada." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "O diagnóstico que a gente faz antes de passar qualquer preço." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Carro que rodou em três oficinas e só voltou a andar aqui." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Três sinais de que o orçamento vai estourar na entrega." },
    ],
    tags: ["#oficina", "#mecanica", "#autocenter", "#carros", "#conserto", "#manutencao", "#revisao", "#mecanico"],
  },
}
