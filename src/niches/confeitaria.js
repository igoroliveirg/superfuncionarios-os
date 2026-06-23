// Confeitaria / doces.
// Persona = Renata, Festa marcada, quer um doce que impressione sem arriscar.
export const CONFEITARIA = {
  label: "Confeitaria / doces",
  accentDefault: "#ec4899",
  pesquisa: {
    persona: {
      nome: "Renata", idade: 34,
      contexto: "Festa marcada, quer um doce que impressione sem arriscar",
      fat: "R$ 5 a 9 mil", fatLabel: "renda familiar",
      time: "decide com 2 a 4 semanas de antecedência, pesquisa no Instagram",
      traits: [
        "Já levou bolo bonito na foto que chegou torto e seco",
        "Manda print da referência e quer igualzinho",
        "Tem medo de pagar caro e passar vergonha na frente dos convidados",
        "Confia em quem mostra entrega e avaliação, não só foto de divulgação",
      ],
      naoE: "Quem quer o bolo pra ontem, sem data definida, e some quando vê o orçamento.",
    },
    dores: [
      "Paguei caro num bolo lindo na foto que chegou seco e sem graça.",
      "Tenho pavor de o doce atrasar e a festa começar sem o bolo na mesa.",
      "Mando a referência e recebo algo sem nada a ver com o que pedi.",
    ],
    desejos: [
      "Quero o bolo igual à foto que mandei, no sabor e na aparência.",
      "Quero receber no horário combinado, sem ligar correndo pra confirmar.",
      "Quero ver a cara dos convidados quando o bolo entra na sala.",
    ],
  },
  copywriter: {
    headlineAfter: "Encomende com a {empresa}: o doce igual à foto que você mandou, entregue no horário e gostoso na primeira garfada.",
    angles: [
      { tag: 'Medo', h: "Outro bolo lindo na foto que chega seco e estraga a festa?", score: 74, note: "medo de pagar caro e passar vergonha" },
      { tag: 'Desejo', h: "O bolo igual à referência que você mandou, entregue na hora marcada", score: 85, note: "desejo de acertar no olho e no sabor" },
      { tag: 'Prova', h: "Mais de 1.800 festas entregues no prazo pela {empresa}, com nota 4,9", score: 93, note: "prova de entrega e avaliação real" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Entrega no horário", "Prova de massa grátis"],
      pre: "Para quem tem data marcada e não pode arriscar com o doce",
      h1Typed: "Encomende com a {empresa}: o doce igual à foto que você mandou, entregue no horário e gostoso na primeira garfada.",
      h1Pre: "Encomende com a ",
      h1Grad: '{empresa}',
      h1Post: ": o doce igual à foto que você mandou, entregue no horário e gostoso na primeira garfada.",
      sub: "Você manda a referência, a gente aprova o desenho com você antes de fazer e entrega no horário combinado. Sabor testado, sem massa seca.",
      cta: "QUERO MEU ORÇAMENTO",
      ctaNote: "Resposta no WhatsApp em até 1 hora",
    },
    ticker: [
      { v: "+1.800", l: "festas entregues" },
      { v: "4,9★", l: "avaliação dos clientes" },
      { v: "100%", l: "entregas no prazo" },
    ],
    depoimentos: [
      { nome: "Camila Andrade", cargo: "aniversário da filha, 5 anos", txt: "Mandei a foto de um tema da Frozen e veio igualzinho. Chegou 11h em ponto, a festa era meio-dia. O recheio de ninho com morango sumiu antes do parabéns." },
      { nome: "Patrícia Gomes", cargo: "casamento em casa", txt: "Tinha medo de bolo bonito e seco, já tinha passado por isso. Pedi prova de massa antes e provei. No dia chegou no horário e ninguém deixou pedaço no prato." },
      { nome: "Diego Martins", cargo: "bodas dos pais", txt: "Encomendei com 3 semanas, mandaram o desenho pra eu aprovar e foi exatamente aquilo. Minha mãe chorou quando viu o bolo na mesa." },
    ],
    includes: [
      "Aprovação do desenho com você antes de começar a fazer",
      "Prova da massa e do recheio antes do dia da festa",
      "Entrega no horário combinado, com confirmação no dia anterior",
      "Embalagem que protege o doce até a mesa, sem amassar",
    ],
    offer: {
      eyebrow: "A encomenda",
      hPre: "Você recebe ", hGrad: "o doce igual à foto e no horário", hPost: ", sem surpresa na festa",
      cdLab: "Agenda da semana fecha em", cdWhen: "Vagas de entrega deste fim de semana", cdFoot: "Agenda limita o número de festas por dia pra garantir o prazo",
      guaranteeTitle: "Garantia do horário combinado", guaranteeText: "Se a entrega atrasar do horário que combinamos, você não paga a taxa de entrega. A gente confirma tudo com você no dia anterior.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Como ler a foto de referência e saber se aquele bolo aguenta o calor da festa." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Bastidor: a massa indo pro forno às 5h pra chegar fresca na sua mesa ao meio-dia." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Antes e depois: o print que a cliente mandou e o bolo que entregamos lado a lado." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "3 recheios que não derretem em festa de tarde no sol, e quais evitar." },
    ],
    tags: ["#bolodecorado", "#docesparafesta", "#bolopersonalizado", "#confeitaria", "#boloaniversario", "#encomendadebolo", "#docesgourmet", "#festas"],
  },
}
