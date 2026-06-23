// Salão / beleza.
// Persona = Patrícia, Rotina cheia, quer um cantinho onde é bem cuidada sem pressa.
export const BELEZA = {
  label: "Salão / beleza",
  accentDefault: "#db2777",
  pesquisa: {
    persona: {
      nome: "Patrícia", idade: 34,
      contexto: "Rotina cheia, quer um cantinho onde é bem cuidada sem pressa",
      fat: "R$ 5 a 12 mil", fatLabel: "renda mensal",
      time: "marca com antecedência, fica fiel quando gosta",
      traits: [
        "Marca hora e espera que respeitem o horário",
        "Já saiu de salão com o cabelo diferente do que pediu",
        "Paga por capricho e atenção, topa pagar mais por isso",
        "Quer sair do salão bonita, com a autoestima lá em cima",
      ],
      naoE: "Quem só busca o mais barato e troca de salão toda semana atrás de promoção.",
    },
    dores: [
      "Marco 14h e só me atendem 15h30, perco a tarde inteira esperando.",
      "Saio com a cor errada porque ninguém me ouviu de verdade.",
      "O salão tá tão cheio que me sinto só mais uma na fila.",
    ],
    desejos: [
      "Sentar na cadeira na hora que marquei, sem espera.",
      "Sair com o espelho me mostrando exatamente o que pedi.",
      "Ter alguém que lembra do meu cabelo e do meu gosto.",
    ],
  },
  copywriter: {
    headlineAfter: "No {empresa} sua hora é sua: atendimento marcado, capricho do começo ao fim e você sai pra rua confiante.",
    angles: [
      { tag: 'Medo', h: "Mais uma tarde perdida esperando o salão te chamar?", score: 75, note: "dor do atraso e da espera" },
      { tag: 'Desejo', h: "Sente na cadeira na hora marcada e sai bonita pra valer", score: 84, note: "desejo de hora respeitada e autoestima" },
      { tag: 'Prova', h: "9 em cada 10 clientes do {empresa} voltam, atendidas no horário e sem fila", score: 92, note: "prova de pontualidade e fidelização" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Hora marcada respeitada", "Atendimento sem fila"],
      pre: "Para quem cansou de esperar e quer sair confiante",
      h1Typed: "No {empresa} sua hora é sua: atendimento marcado e capricho do começo ao fim",
      h1Pre: "No ",
      h1Grad: '{empresa}',
      h1Post: " sua hora é sua: atendimento marcado e capricho do começo ao fim",
      sub: "Você marca, a gente respeita o horário e escuta o que você quer antes de tocar no seu cabelo. Sai com o resultado certo e a autoestima lá em cima.",
      cta: "QUERO MARCAR MINHA HORA",
      ctaNote: "Agenda pelo WhatsApp em 1 min",
    },
    ticker: [
      { v: "0 fila", l: "atendimento na hora marcada" },
      { v: "4,9★", l: "média de 600 avaliações" },
      { v: "9/10", l: "clientes que voltam" },
    ],
    depoimentos: [
      { nome: "Carla Menezes", cargo: "Cliente há 3 anos", txt: "Marco 9h e às 9h já tô na cadeira. Nunca mais perdi manhã de sábado esperando." },
      { nome: "Renata Lopes", cargo: "Professora", txt: "Pedi um loiro que clareia sem amarelar e foi exatamente isso. Me ouviram antes de começar." },
      { nome: "Juliana Prado", cargo: "Cliente fixa", txt: "Lembram da minha franja, do meu café, do que deu errado da última vez. Saio me sentindo gente." },
    ],
    includes: [
      "Conversa de 10 min antes pra entender o que você quer",
      "Horário marcado que começa na hora, sem fila de espera",
      "Acabamento revisado no espelho antes de você ir embora",
      "Lembrete da sua próxima visita e do histórico do seu cabelo",
    ],
    offer: {
      eyebrow: "O atendimento",
      hPre: "Você sai com ", hGrad: "o cabelo que pediu e a tarde livre", hPost: ", sem espera",
      cdLab: "As vagas com horário garantido desta semana acabam em", cdWhen: "Agenda desta semana", cdFoot: "Horários abrem conforme a agenda das profissionais",
      guaranteeTitle: "Ajuste no mesmo dia, sem custo", guaranteeText: "Se o resultado saiu diferente do combinado, a gente acerta na hora ou marca seu retorno sem cobrar nada.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Como escolher a cor certa pro seu tom de pele sem errar." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Bastidor: como organizamos a agenda pra ninguém esperar na fila." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Antes e depois de uma cliente que chegou com a cor amarelada." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "3 cuidados em casa que fazem a escova durar 4 dias a mais." },
    ],
    tags: ["#salaodebeleza", "#horamarcada", "#autoestima", "#cabelo", "#correcaodecor", "#beleza", "#atendimentovip", "#semfila"],
  },
}
