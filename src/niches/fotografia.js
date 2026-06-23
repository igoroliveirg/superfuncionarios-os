// Fotografia / audiovisual.
// Persona = Camila, Casando em 6 meses, quer foto que ela vá olhar daqui a 20 anos.
export const FOTOGRAFIA = {
  label: "Fotografia / audiovisual",
  accentDefault: "#6366f1",
  pesquisa: {
    persona: {
      nome: "Camila", idade: 33,
      contexto: "Casando em 6 meses, quer foto que ela vá olhar daqui a 20 anos",
      fat: "R$ 6 a 12 mil", fatLabel: "renda familiar",
      time: "pesquisa 2 a 3 meses, pede portfólio e indicação antes de fechar",
      traits: [
        "Salva referência de foto no Pinterest e tem medo de não ficar igual",
        "Já viu amiga receber álbum sem graça e travou",
        "Quer alguém que dirija a pose, porque ela não sabe posar",
        "Cobra prazo, sumiço de fotógrafo é o pesadelo dela",
      ],
      naoE: "Quem só quer o arquivo bruto mais barato e edita no celular sozinho.",
    },
    dores: [
      "Tenho pavor de gastar 4 mil e receber foto dura, todo mundo posando igual estátua.",
      "Já contratei gente que sumiu e entregou as fotos 3 meses depois.",
      "Não sei posar e travo na frente da câmera, aí saio feia em tudo.",
    ],
    desejos: [
      "Abrir o álbum e sentir o nervoso do dia de novo, com gente vivendo o momento.",
      "Receber as fotos no prazo combinado, sem cobrar 10 vezes.",
      "Alguém que me guie na pose e me deixe à vontade pra eu sair natural.",
    ],
  },
  copywriter: {
    headlineAfter: "Seu dia registrado pela {empresa}: prévia em 7 dias, álbum completo em 30, com a emoção que você sentiu.",
    angles: [
      { tag: 'Medo', h: "Vai gastar 4 mil e arriscar receber foto dura, todo mundo posando igual?", score: 74, note: "medo de pagar caro e receber sem graça" },
      { tag: 'Desejo', h: "Abra o álbum daqui a 20 anos e sinta o nervoso do dia de novo.", score: 83, note: "desejo de memória que dura" },
      { tag: 'Prova', h: "230 casamentos registrados pela {empresa}, prévia em 7 dias e nota 4,9.", score: 92, note: "prova com número e prazo" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Prévia em 7 dias", "Agenda com data reservada"],
      pre: "Para quem quer foto com emoção e morre de medo de receber álbum sem graça",
      h1Typed: "Seu dia registrado pela {empresa}: prévia em 7 dias, álbum em 30, com a emoção que você sentiu.",
      h1Pre: "Seu dia registrado pela ",
      h1Grad: '{empresa}',
      h1Post: ": prévia em 7 dias, álbum em 30, com a emoção que você sentiu.",
      sub: "A gente dirige cada pose pra você sair natural, fotografa o momento real e entrega no prazo do contrato. Você só vive o dia.",
      cta: "QUERO VER O PORTFÓLIO",
      ctaNote: "Resposta com agenda em até 24h",
    },
    ticker: [
      { v: "+230", l: "casamentos registrados" },
      { v: "4,9★", l: "avaliação dos noivos" },
      { v: "7 dias", l: "pra prévia chegar" },
    ],
    depoimentos: [
      { nome: "Letícia e Bruno", cargo: "casaram em março", txt: "Eu não sabia posar e travava, a Camila foi me guiando o tempo todo. Saí natural em quase toda foto." },
      { nome: "Marina Prado", cargo: "noiva, festa de 150 pessoas", txt: "A prévia chegou no sétimo dia, certinho. Chorei vendo a foto do meu pai me entregando no altar." },
      { nome: "Rafael Tavares", cargo: "aniversário de 1 ano da filha", txt: "Tinha medo de foto posada e dura. Vieram naturais, minha filha rindo de verdade. Álbum em 28 dias." },
    ],
    includes: [
      "Direção de pose no dia, pra você não ficar travado na frente da câmera",
      "Prévia com 20 fotos editadas em 7 dias",
      "Álbum completo tratado em até 30 dias, do jeito do contrato",
      "Backup duplo das fotos guardado por 1 ano",
    ],
    offer: {
      eyebrow: "A cobertura",
      hPre: "Você abre o álbum e ", hGrad: "revive o dia inteiro", hPost: ", com prazo cumprido",
      cdLab: "As datas deste mês fecham em", cdWhen: "Vagas de agenda da temporada", cdFoot: "Reservo uma data por dia, pode esgotar",
      guaranteeTitle: "Prazo no contrato ou desconto", guaranteeText: "O prazo da prévia e do álbum entra no contrato assinado. Atrasou por minha conta, você ganha 10% de volta.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Como eu leio a luz da igreja antes da cerimônia pra não perder a hora do altar." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Os 40 minutos de bastidor: noiva se arrumando enquanto eu já fotografo os detalhes." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Antes e depois: a mesma noiva travada e depois solta, com direção de pose." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "3 erros que deixam sua foto de casamento dura e como o fotógrafo evita." },
    ],
    tags: ["#fotografiadecasamento", "#fotografodecasamento", "#casamento", "#noivas2026", "#fotonatural", "#ensaiodecasal", "#vestidodenoiva", "#fotografiaautoral"],
  },
}
