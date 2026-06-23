// Turismo / viagens.
// Persona = Renata, Trabalha o ano inteiro, junta dinheiro pra uma viagem e tem medo de errar.
export const TURISMO = {
  label: "Turismo / viagens",
  accentDefault: "#0ea5e9",
  pesquisa: {
    persona: {
      nome: "Renata", idade: 41,
      contexto: "Trabalha o ano inteiro, junta dinheiro pra uma viagem e tem medo de errar",
      fat: "R$ 6 a 12 mil", fatLabel: "renda mensal",
      time: "pesquisa por semanas, abre 20 abas, trava na hora de fechar",
      traits: [
        "Quer a viagem dos sonhos sem virar pesquisadora de fórum",
        "Tem medo de pagar caro e descobrir que pagou o dobro",
        "Já se queimou com hotel bonito na foto e ruim na vida",
        "Quer aproveitar o destino com tudo resolvido antes de embarcar",
      ],
      naoE: "Mochileiro que monta tudo sozinho na hora e curte se virar improvisando.",
    },
    dores: [
      "Passo semanas pesquisando e termino mais perdida do que comecei.",
      "Tenho pavor de fechar uma furada e perder o dinheiro que juntei o ano todo.",
      "Já cheguei em hotel que não tinha nada a ver com a foto.",
    ],
    desejos: [
      "Receber o roteiro pronto e só fazer as malas.",
      "Ter alguém pra ligar se der problema no meio da viagem.",
      "Voltar com a sensação de que valeu cada real.",
    ],
  },
  copywriter: {
    headlineAfter: "Viaje com a {empresa}: roteiro pronto, preço travado e alguém do seu lado se der problema.",
    angles: [
      { tag: 'Medo', h: "Mais um ano juntando dinheiro pra arriscar numa viagem que pode dar errado?", score: 74, note: "medo de perder o dinheiro guardado" },
      { tag: 'Desejo', h: "Receba o roteiro pronto e só faça as malas.", score: 84, note: "desejo de viajar sem dor de cabeça" },
      { tag: 'Prova', h: "Mais de 3.200 viagens fechadas pela {empresa}, com nota 4,9 de quem voltou.", score: 92, note: "prova social com número e avaliação" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Atendimento por uma pessoa real", "Suporte 24h na viagem"],
      pre: "Para quem quer a viagem dos sonhos sem cair em furada",
      h1Typed: "Viaje com a {empresa}: roteiro pronto, preço travado e alguém do seu lado se der problema.",
      h1Pre: "Viaje com a ",
      h1Grad: '{empresa}',
      h1Post: ": roteiro pronto, preço travado e alguém do seu lado se der problema.",
      sub: "A gente monta o roteiro pro seu perfil, cota voo e hotel, trava o preço e fica de plantão 24h na viagem. Você escolhe o destino e curte.",
      cta: "QUERO MEU ROTEIRO",
      ctaNote: "Primeira proposta grátis em 24h",
    },
    ticker: [
      { v: "+3.200", l: "viagens fechadas" },
      { v: "4,9★", l: "nota de quem voltou" },
      { v: "24h", l: "suporte no destino" },
    ],
    depoimentos: [
      { nome: "Patrícia Alves", cargo: "viagem em família, Porto Seguro", txt: "Mandei o que eu queria e em dois dias veio o roteiro inteiro com hotel pé na areia. Não abri uma aba de pesquisa sequer." },
      { nome: "Carlos Menezes", cargo: "lua de mel, Maldivas", txt: "Travaram o preço antes de subir na alta. Quando o voo atrasou, resolveram tudo pelo WhatsApp em 20 minutos." },
      { nome: "Juliana Rocha", cargo: "primeira viagem internacional", txt: "Tinha pavor de errar fora do país. Me passaram cada passo e cheguei sabendo exatamente o que fazer no aeroporto." },
    ],
    includes: [
      "Roteiro dia a dia montado pro seu perfil e bolso",
      "Voo e hotel cotados em 3 opções, com preço travado",
      "Hotéis conferidos por quem já foi, com fotos reais",
      "Suporte 24h por WhatsApp durante toda a viagem",
    ],
    offer: {
      eyebrow: "O atendimento",
      hPre: "Você sai com ", hGrad: "o roteiro pronto e o preço travado", hPost: ", sem semanas de pesquisa",
      cdLab: "As tarifas desta semana sobem em", cdWhen: "Voos saindo pra alta temporada", cdFoot: "Preço e disponibilidade da companhia podem mudar",
      guaranteeTitle: "Do orçamento ao desembarque", guaranteeText: "A gente fica do seu lado da primeira cotação até você voltar pra casa. Deu problema no destino, é com a gente.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Sua leitura de destino: quando comprar passagem pra pagar metade." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Como a gente confere um hotel antes de colocar no seu roteiro." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "3.200 viagens depois: o erro que faz a pessoa pagar caro sem perceber." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "O que olhar num seguro viagem antes de fechar qualquer pacote." },
    ],
    tags: ["#viagem", "#roteirodeviagem", "#viagemdossonhos", "#turismo", "#dicasdeviagem", "#viajarsemestresse", "#segurodeviagem", "#viajarbarato"],
  },
}
