// Seguros.
// Persona = Roberto, Pai de dois, casa financiada e um pequeno negócio nas costas.
export const SEGUROS = {
  label: "Seguros",
  accentDefault: "#1e40af",
  pesquisa: {
    persona: {
      nome: "Roberto", idade: 44,
      contexto: "Pai de dois, casa financiada e um pequeno negócio nas costas",
      fat: "R$ 12 a 25 mil", fatLabel: "renda familiar",
      time: "pesquisa com calma, compara 3 corretoras, lê a apólice antes de assinar",
      traits: [
        "Quer proteger a família sem cair em pegadinha de contrato",
        "Já ouviu história de quem pagou e não foi coberto",
        "Lê a letra miúda e desconfia de promessa fácil",
        "Quer um telefone que atende no dia do problema",
      ],
      naoE: "Quem quer só o seguro mais barato da tabela e ignora o que está coberto.",
    },
    dores: [
      "Paguei seguro 6 anos e na hora do problema ninguém atendeu o telefone.",
      "Tenho medo de assinar e descobrir que justo o meu caso ficou de fora.",
      "Não entendo metade da apólice e o corretor some depois que vende.",
    ],
    desejos: [
      "Dormir tranquilo sabendo que minha família está coberta de verdade.",
      "Falar com alguém de carne e osso no dia do sinistro, não com robô.",
      "Saber exatamente o que cobre e o que não cobre antes de assinar.",
    ],
  },
  copywriter: {
    headlineAfter: "Proteja sua família e o que você construiu com a {empresa}: cobertura sem letra miúda e consultor que atende no dia do sinistro.",
    angles: [
      { tag: 'Medo', h: "Pagou seguro anos e descobriu que o seu caso ficou de fora?", score: 74, note: "medo de não estar coberto na hora h" },
      { tag: 'Desejo', h: "Durma tranquilo: família e patrimônio cobertos, sem pegadinha no contrato.", score: 83, note: "desejo de tranquilidade concreta" },
      { tag: 'Prova', h: "Na {empresa}, 94% dos sinistros saem em até 7 dias úteis.", score: 92, note: "prova de atendimento real no sinistro" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Consultor no WhatsApp", "Sinistro em até 24h"],
      pre: "Para quem sustenta a casa e não quer surpresa na hora do sinistro",
      h1Typed: "Proteja sua família e o que você construiu com a {empresa}: cobertura sem letra miúda e consultor que atende no dia do sinistro.",
      h1Pre: "Proteja sua família e o que você construiu com a ",
      h1Grad: '{empresa}',
      h1Post: ": cobertura sem letra miúda e consultor que atende no dia do sinistro.",
      sub: "A gente lê a apólice com você, mostra o que cobre e o que fica de fora antes de fechar, e põe um consultor no seu WhatsApp pra acionar o seguro em menos de 24h.",
      cta: "QUERO MINHA COTAÇÃO",
      ctaNote: "Cotação grátis em 5 min, sem compromisso",
    },
    ticker: [
      { v: "+4.200", l: "famílias protegidas" },
      { v: "94%", l: "sinistros liberados em 7 dias" },
      { v: "24h", l: "para acionar o seguro" },
    ],
    depoimentos: [
      { nome: "Cláudia Ramos", cargo: "dona de loja, Campinas", txt: "Bateram no meu carro num sábado à noite. Mandei mensagem pro consultor, no domingo já estava com guincho e carro reserva na porta." },
      { nome: "Anderson Pádua", cargo: "engenheiro, Belo Horizonte", txt: "Eles me mostraram, item por item, o que não estava coberto na proposta antiga. Troquei a apólice e paguei 18% a menos com mais cobertura." },
      { nome: "Sônia Vieira", cargo: "aposentada, Curitiba", txt: "Perdi meu marido e tinha pavor da burocracia. O consultor cuidou de tudo, o seguro de vida caiu em 9 dias." },
    ],
    includes: [
      "Leitura da apólice com você, o que cobre e o que fica de fora, antes de assinar",
      "Consultor fixo no seu WhatsApp, mesma pessoa do começo ao fim",
      "Acionamento do sinistro em até 24h, sem call center",
      "Revisão anual da cobertura quando a família ou o negócio mudam",
    ],
    offer: {
      eyebrow: "O atendimento",
      hPre: "Você assina com ", hGrad: "a apólice explicada linha por linha", hPost: " e um consultor no seu WhatsApp.",
      cdLab: "As condições desta tabela acabam em", cdWhen: "Cotações desta semana", cdFoot: "Preço e cobertura variam por perfil e seguradora",
      guaranteeTitle: "Do contrato ao pagamento do sinistro", guaranteeText: "A gente fica do seu lado da contratação ao pagamento. Se o sinistro acontecer, o mesmo consultor que te atendeu cuida do processo até o dinheiro cair.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "As 3 cláusulas que mais deixam família descoberta." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Um dia no atendimento de sinistro: do WhatsApp à liberação do pagamento." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Caso real: seguro de vida liberado em 9 dias para a dona Sônia." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Como ler a sua apólice sem ser advogado: o que cobre e o que não cobre." },
    ],
    tags: ["#seguros", "#segurodevida", "#protejaquemvocêama", "#segurodecarro", "#corretoradeseguros", "#sinistro", "#tranquilidadefinanceira", "#segurempresarial"],
  },
}
