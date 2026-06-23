// Eventos / buffet.
// Persona = Patrícia, Vai casar a filha e não dorme com medo de algo furar no dia.
export const EVENTOS = {
  label: "Eventos / buffet",
  accentDefault: "#7c3aed",
  pesquisa: {
    persona: {
      nome: "Patrícia", idade: 44,
      contexto: "Vai casar a filha e não dorme com medo de algo furar no dia",
      fat: "R$ 12 a 25 mil", fatLabel: "orçamento da festa",
      time: "decide com calma, quer provar e ver tudo antes",
      traits: [
        "Quer a festa do jeito que imaginou, sem sustos",
        "Tem pavor de comida acabar ou chegar fria",
        "Só fecha depois de provar o cardápio",
        "Topa pagar mais por quem assume o dia inteiro",
      ],
      naoE: "Quem só pede cotação por WhatsApp pra comparar preço e some.",
    },
    dores: [
      "Tenho pavor de a comida acabar na frente dos convidados.",
      "Já fui em festa onde o buffet atrasou e o anfitrião passou vergonha.",
      "Quero curtir o dia, não ficar correndo atrás de garçom.",
    ],
    desejos: [
      "Provar o cardápio antes e saber exatamente o que vai pro prato.",
      "Uma equipe que chega cedo e resolve sem me chamar.",
      "Receber elogio dos convidados sem ter levantado da cadeira.",
    ],
  },
  copywriter: {
    headlineAfter: "Dê a festa que você sonhou com o {empresa}: cardápio provado antes, equipe na hora e nada saindo do controle.",
    angles: [
      { tag: 'Medo', h: "Vai arriscar a festa mais importante do ano com quem some depois do sinal?", score: 74, note: "medo de buffet sumir e o dia desandar" },
      { tag: 'Desejo', h: "A festa do jeito que você imaginou: comida quente até a última mesa, você na cadeira aproveitando.", score: 84, note: "desejo de curtir sem operar nos bastidores" },
      { tag: 'Prova', h: "120 festas no último ano com o {empresa}, comida quente até o fim e nenhum prato faltando.", score: 92, note: "prova de volume e entrega consistente" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Degustação agendada", "Plano B incluso"],
      pre: "Para quem vai dar a festa do ano e tem pavor de algo furar",
      h1Typed: "Dê a festa que você sonhou com o {empresa}: cardápio provado antes, equipe na hora e nada saindo do controle.",
      h1Pre: "Dê a festa que você sonhou com o ",
      h1Grad: '{empresa}',
      h1Post: ": cardápio provado antes, equipe na hora e nada saindo do controle.",
      sub: "A gente assume tudo: cardápio que você prova antes de fechar, equipe na sua casa 3 horas antes e plano B pra cada imprevisto. Você fica com seus convidados. Stress, zero.",
      cta: "QUERO AGENDAR MINHA DEGUSTAÇÃO",
      ctaNote: "Resposta em até 24h, sem compromisso",
    },
    ticker: [
      { v: "+800", l: "festas realizadas" },
      { v: "4,9★", l: "média dos anfitriões" },
      { v: "3h", l: "equipe antes do 1º convidado" },
    ],
    depoimentos: [
      { nome: "Cláudia Ramos", cargo: "mãe da noiva, 130 convidados", txt: "Comida quente até a última mesa, nada faltou. Eu chorei na entrada e não pensei na cozinha uma vez." },
      { nome: "Roberto Tavares", cargo: "aniversário de 50, 80 convidados", txt: "Provei o cardápio uma semana antes. No dia veio igualzinho. A equipe chegou cedo e eu só recebi gente." },
      { nome: "Fernanda Lopes", cargo: "batizado, 60 convidados", txt: "O garçom resolveu um imprevisto sem me chamar. Só descobri depois. Foi a primeira festa que eu de fato curti." },
    ],
    includes: [
      "Degustação do cardápio antes de você fechar",
      "Equipe montando na sua casa 3 horas antes",
      "Reposição garantida: comida quente até o fim",
      "Plano B pra chuva, atraso e convidado extra",
    ],
    offer: {
      eyebrow: "O dia da sua festa",
      hPre: "Você senta com seus convidados e a gente entrega ", hGrad: "a festa redonda, sem sobra de stress", hPost: " do começo ao último brinde",
      cdLab: "As datas deste mês estão fechando, restam", cdWhen: "Datas livres na agenda", cdFoot: "Agenda e cardápio podem mudar conforme a data",
      guaranteeTitle: "Comida quente até a última mesa", guaranteeText: "Se a comida acabar antes do fim, a reposição corre por nossa conta. Você não passa vergonha na frente de ninguém.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Quanta comida por pessoa pra ninguém ficar com fome (e nada virar desperdício)." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Bastidor: a equipe chegando 3h antes e montando o salão do zero." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Festa de 120 pessoas que rolou sem um prato faltar: o que a gente fez." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "3 erros que fazem a comida chegar fria na mesa do convidado." },
    ],
    tags: ["#buffet", "#festacompleta", "#casamento", "#aniversario", "#eventos", "#semstress", "#cardapio", "#festaredonda"],
  },
}
