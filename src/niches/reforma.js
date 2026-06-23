// Reforma / construção.
// Persona = Rodrigo, Comprou apartamento usado, quer reformar antes de mudar a família.
export const REFORMA = {
  label: "Reforma / construção",
  accentDefault: "#c2410c",
  pesquisa: {
    persona: {
      nome: "Rodrigo", idade: 42,
      contexto: "Comprou apartamento usado, quer reformar antes de mudar a família",
      fat: "R$ 12 a 20 mil", fatLabel: "renda familiar",
      time: "pede 3 orçamentos, demora semanas pra decidir",
      traits: [
        "Já se queimou com pedreiro que sumiu no meio da obra",
        "Anota tudo e cobra cada item do orçamento",
        "Tem medo de morar em obra por meses",
        "Quer contrato no papel, com prazo e valor fechado",
      ],
      naoE: "Quem quer só uma pintura de fim de semana e pesquisa preço pra fazer sozinho.",
    },
    dores: [
      "Paguei adiantado e o pedreiro sumiu com a obra pela metade.",
      "Pedi orçamento de 30 mil e na conta final bateu 55 mil.",
      "Tô há 4 meses no meio da bagunça e ninguém me dá uma data.",
    ],
    desejos: [
      "Saber o valor final antes de a obra começar, sem surpresa no fim.",
      "Ter data de entrega no contrato e ela cumprida.",
      "Receber a casa limpa, pronta pra mudar a mobília no mesmo dia.",
    ],
  },
  copywriter: {
    headlineAfter: "Reforme com a {empresa}: preço fechado em contrato, data de entrega e a casa limpa na chave.",
    angles: [
      { tag: 'Medo', h: "Mais uma reforma que começou em 60 dias e já passou de 6 meses?", score: 74, note: "dor de obra que não acaba" },
      { tag: 'Desejo', h: "Reforma com data no contrato e a casa entregue limpa, pronta pra mudar.", score: 84, note: "desejo de prazo e entrega" },
      { tag: 'Prova', h: "A {empresa} já entregou 380 reformas no prazo, com preço fechado em contrato.", score: 93, note: "prova com número e garantia" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Orçamento em 48h", "Contrato com data"],
      pre: "Para quem vai reformar e tem medo de obra que não acaba",
      h1Typed: "Reforme com a {empresa}: preço fechado em contrato, data de entrega e a casa limpa na chave.",
      h1Pre: "Reforme com a ",
      h1Grad: '{empresa}',
      h1Post: ": preço fechado em contrato, data de entrega e a casa limpa na chave.",
      sub: "A gente mede tudo, fecha o valor no papel e cumpre o prazo. Você acompanha por foto e recebe a obra limpa, sem entulho.",
      cta: "QUERO MEU ORÇAMENTO",
      ctaNote: "Visita e orçamento em 48h, sem custo",
    },
    ticker: [
      { v: "+380", l: "reformas entregues" },
      { v: "4,9★", l: "nota dos clientes" },
      { v: "48h", l: "pro orçamento" },
    ],
    depoimentos: [
      { nome: "Patrícia Lemos", cargo: "reformou apê de 78m²", txt: "Fecharam 41 mil no contrato e a conta final bateu certinho. Entregaram 3 dias antes do prazo, tudo limpo." },
      { nome: "Anderson Souza", cargo: "reformou a cozinha e os 2 banheiros", txt: "Recebia foto toda sexta. Em 6 semanas ficou pronto, sem drama de pedreiro que some." },
      { nome: "Cláudia Ferraz", cargo: "reformou casa de 120m²", txt: "Outra empresa me pediu 70 mil e nem prazo dava. A obra saiu por 52 mil, com data no papel." },
    ],
    includes: [
      "Visita técnica e orçamento detalhado em 48h",
      "Contrato com valor fechado e data de entrega",
      "Acompanhamento por foto toda semana",
      "Limpeza fina e retirada do entulho na entrega",
    ],
    offer: {
      eyebrow: "A reforma",
      hPre: "Você recebe a obra com ", hGrad: "preço fechado e data no contrato", hPost: ", limpa na entrega",
      cdLab: "Vagas na agenda de obra deste mês acabam em", cdWhen: "Início garantido em até 15 dias", cdFoot: "Agenda e prazos podem mudar conforme a demanda",
      guaranteeTitle: "Atraso descontado da fatura", guaranteeText: "Passou da data do contrato, a gente desconta por dia de atraso. O prazo é nosso, não seu.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Os 4 itens que somem do orçamento barato e estouram a conta no fim." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Um dia na obra: como a gente fecha parede sem deixar você na poeira." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Antes e depois de uma cozinha entregue em 6 semanas, no valor do contrato." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Como ler um orçamento de reforma e achar o custo escondido antes de assinar." },
    ],
    tags: ["#reforma", "#reformadeapartamento", "#obrasemdrama", "#precofechado", "#reformaresidencial", "#construcao", "#reformadecasa", "#prazocumprido"],
  },
}
