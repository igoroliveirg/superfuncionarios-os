// Restaurante / delivery.
// Persona = Renata, Trabalha o dia todo, chega em casa com fome e sem paciência pra cozinhar.
export const RESTAURANTE = {
  label: "Restaurante / delivery",
  accentDefault: "#e23744",
  pesquisa: {
    persona: {
      nome: "Renata", idade: 34,
      contexto: "Trabalha o dia todo, chega em casa com fome e sem paciência pra cozinhar",
      fat: "R$ 4 a 9 mil", fatLabel: "renda mensal",
      time: "decide em 5 min no celular, na hora da fome",
      traits: [
        "Pede pelo celular antes de sair do trabalho",
        "Cansou de comida que chega fria e murcha",
        "Repete o pedido quando confia na cozinha",
        "Lê avaliação e foto antes de pedir num lugar novo",
      ],
      naoE: "Caçador de cupom que pede uma vez, só no maior desconto, e nunca volta.",
    },
    dores: [
      "Peço comida e chega fria, embalagem amassada, molho derramado.",
      "Espero mais de uma hora numa sexta e ninguém me avisa nada.",
      "Pago caro no iFood e ainda some metade em acréscimo e taxa.",
    ],
    desejos: [
      "Comida quente na porta em até 40 minutos, sem novela.",
      "Saber onde está meu pedido sem precisar ligar.",
      "Achar um lugar fixo, daqueles que acerto toda vez.",
    ],
  },
  copywriter: {
    headlineAfter: "Peça na {empresa}: comida quente na sua porta em até 40 minutos, ou a próxima é por nossa conta.",
    angles: [
      { tag: 'Medo', h: "Mais uma sexta esperando uma hora por comida que chega fria?", score: 74, note: "dor da espera e do prato frio" },
      { tag: 'Desejo', h: "Pediu, chegou em 40 minutos, ainda saindo fumaça da marmita.", score: 84, note: "desejo de comida rápida e quente" },
      { tag: 'Prova', h: "9 em cada 10 clientes da {empresa} pedem de novo na mesma semana.", score: 92, note: "prova de recompra real" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Entrega em até 40 min", "4,9 estrelas no app"],
      pre: "Pra quem está com fome agora e não quer arriscar",
      h1Typed: "Peça na {empresa}: comida quente na sua porta em até 40 minutos, ou a próxima é por nossa conta",
      h1Pre: "Peça na ",
      h1Grad: '{empresa}',
      h1Post: ": comida quente na sua porta em até 40 minutos, ou a próxima é por nossa conta",
      sub: "Cozinha que sai na hora, embalagem que segura o calor e entregador que você acompanha no mapa. Você pede, a gente leva quente.",
      cta: "QUERO PEDIR AGORA",
      ctaNote: "Cardápio aberto, pedido em 2 min",
    },
    ticker: [
      { v: "40 min", l: "tempo médio de entrega" },
      { v: "4,9★", l: "em mais de 2.000 avaliações" },
      { v: "+12 mil", l: "pedidos entregues quentes" },
    ],
    depoimentos: [
      { nome: "Camila Reis", cargo: "cliente do bairro", txt: "Pedi 19h numa sexta, chegou 19h35 ainda quente. Virei cliente fixa, peço toda semana." },
      { nome: "Diego Martins", cargo: "pede pro almoço no trabalho", txt: "Acompanho o entregador no mapa e como na hora certa do meu intervalo. Nunca mais chegou frio." },
      { nome: "Paula Nogueira", cargo: "cliente há 8 meses", txt: "Embalagem chega lacrada, molho no lugar, nada derramado. Confio de olho fechado." },
    ],
    includes: [
      "Comida feita na hora do pedido, nunca requentada",
      "Embalagem térmica que segura o calor por 45 min",
      "Rastreio do entregador no mapa, do fogão à sua porta",
      "Atendimento no WhatsApp se algo sair errado",
    ],
    offer: {
      eyebrow: "Como funciona",
      hPre: "Você pede e recebe ", hGrad: "comida quente em até 40 minutos", hPost: ", com rastreio do começo ao fim",
      cdLab: "O combo desta semana acaba em", cdWhen: "Promoção válida só hoje, até as 23h", cdFoot: "Estoque do dia e horário de cozinha podem variar",
      guaranteeTitle: "Chegou frio, a gente refaz", guaranteeText: "Se sua comida chegar fria, refazemos na hora ou a próxima entrega fica por nossa conta. Sem briga.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "O segredo de manter a marmita quente nos 40 minutos de entrega." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Cozinha às 18h numa sexta: como a gente prepara 200 pedidos sem atrasar." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Mesmo cliente, mesmo prato, 14 semanas seguidas. Por quê." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Como ler a foto e a avaliação antes de pedir num lugar novo." },
    ],
    tags: ["#delivery", "#comidaquente", "#peçaagora", "#entregarapida", "#marmita", "#jantar", "#deliverydecomida", "#comidaboa"],
  },
}
