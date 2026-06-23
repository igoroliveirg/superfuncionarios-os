// Logística / transporte.
// Persona = Ricardo, Toca a logística de uma indústria, leva a culpa quando a carga atrasa.
export const LOGISTICA = {
  label: "Logística / transporte",
  accentDefault: "#1d4ed8",
  pesquisa: {
    persona: {
      nome: "Ricardo", idade: 44,
      contexto: "Toca a logística de uma indústria, leva a culpa quando a carga atrasa",
      fat: "R$ 200 a 800 mil/mês", fatLabel: "faturamento",
      time: "cota com 3 ou 4 transportadoras, demora pra confiar",
      traits: [
        "Já perdeu cliente por entrega atrasada e não esquece",
        "Quer rastrear a carga sem ligar pro motorista",
        "Desconfia de transportadora que some depois da coleta",
        "Mede tudo por prazo cumprido e avaria",
      ],
      naoE: "Quem só quer o frete mais barato e aceita perder carga no caminho.",
    },
    dores: [
      "Minha carga atrasa e quem leva o telefonema do cliente bravo sou eu.",
      "Coletam a mercadoria e somem, fico sem saber onde ela está.",
      "Já recebi pallet quebrado e refiz o pedido do meu bolso.",
    ],
    desejos: [
      "Saber onde está minha carga sem ligar pra ninguém.",
      "Entregar no prazo prometido e parar de pedir desculpa pro cliente.",
      "Receber a mercadoria inteira, do jeito que saiu.",
    ],
  },
  copywriter: {
    headlineAfter: "Carga no prazo e inteira com a {empresa}: rastreio em tempo real e 99,4% de entregas sem avaria.",
    angles: [
      { tag: 'Medo', h: "Outra entrega atrasada e o cliente cobrando você de novo?", score: 74, note: "dor de levar a culpa pelo atraso" },
      { tag: 'Desejo', h: "Rastreie cada carga em tempo real e entregue na data que prometeu.", score: 84, note: "desejo de controle e prazo cumprido" },
      { tag: 'Prova', h: "A {empresa} entrega 99,4% das cargas no prazo e sem avaria, com nota fiscal de cada coleta.", score: 93, note: "prova com índice e número" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Rastreio 24h", "Seguro de carga incluso"],
      pre: "Para quem não pode atrasar nem entregar carga quebrada",
      h1Typed: "Carga no prazo e inteira com a {empresa}: rastreio em tempo real e 99,4% sem avaria.",
      h1Pre: "Carga no prazo e inteira com a ",
      h1Grad: '{empresa}',
      h1Post: ": rastreio em tempo real e 99,4% sem avaria.",
      sub: "A gente coleta, rastreia e entrega na data combinada. Você acompanha cada parada pelo painel e o cliente recebe a carga do jeito que saiu.",
      cta: "QUERO COTAR MEU FRETE",
      ctaNote: "Cotação em até 1 hora útil",
    },
    ticker: [
      { v: "99,4%", l: "entregas sem avaria" },
      { v: "+18 mil", l: "cargas/mês no prazo" },
      { v: "24h", l: "rastreio em tempo real" },
    ],
    depoimentos: [
      { nome: "Fernanda Lima", cargo: "compras, indústria de bebidas", txt: "Mandava 40 pallets por semana e sempre chegava algo quebrado. Com eles, fechei o mês sem uma avaria sequer." },
      { nome: "Anderson Souza", cargo: "logística, distribuidora", txt: "Acompanho a carga pelo painel e já aviso o cliente da hora certa. Parei de ligar pro motorista a cada duas horas." },
      { nome: "Patrícia Gomes", cargo: "e-commerce de móveis", txt: "Prometo prazo no site e eles cumprem. Minha taxa de reclamação por atraso caiu de 12% pra menos de 2%." },
    ],
    includes: [
      "Rastreio em tempo real no painel e no WhatsApp",
      "Seguro de carga em todo trajeto, sem custo extra",
      "Comprovante de entrega com foto e assinatura",
      "Gerente de conta que responde no mesmo dia",
    ],
    offer: {
      eyebrow: "O serviço",
      hPre: "Sua carga sai e chega com ", hGrad: "prazo cumprido e rastreio", hPost: " do início ao fim",
      cdLab: "Agenda de coleta desta semana fecha em", cdWhen: "Vagas de rota desta semana", cdFoot: "Capacidade por rota é limitada e pode variar",
      guaranteeTitle: "Atrasou, você não paga o frete", guaranteeText: "Se a carga não chegar na data combinada por culpa nossa, o frete daquela viagem sai de graça.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Os 3 erros que fazem carga atrasar e como a gente corta cada um." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Um dia na operação: como rastreamos 18 mil cargas por mês sem perder nenhuma." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Antes e depois: cliente que tirou a avaria de 9% pra zero em 60 dias." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Como ler o índice de avaria da sua transportadora antes de fechar contrato." },
    ],
    tags: ["#logistica", "#transportedecargas", "#frete", "#rastreamento", "#noprazo", "#cargasegura", "#transportadora", "#supplychain"],
  },
}
