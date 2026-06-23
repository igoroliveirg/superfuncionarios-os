// Academia / fitness.
// Persona = Renata, Voltou a engordar depois da gravidez, sem energia quando chega em casa.
export const ACADEMIA = {
  label: "Academia / fitness",
  accentDefault: "#f97316",
  pesquisa: {
    persona: {
      nome: "Renata", idade: 34,
      contexto: "Voltou a engordar depois da gravidez, sem energia quando chega em casa",
      fat: "R$ 3 a 6 mil", fatLabel: "renda",
      time: "decide rápido, mas larga em 3 semanas",
      traits: [
        "Já começou e largou academia umas três vezes",
        "Tem vergonha de treinar perto de gente musculosa",
        "Acha que treino bom dura duas horas",
        "Chega em casa às 19h sem energia",
      ],
      naoE: "Atleta avançado que treina há anos e só quer trocar de ficha.",
    },
    dores: [
      "Já comecei academia umas três vezes e larguei antes de um mês.",
      "Tenho vergonha de treinar perto de gente musculosa me olhando.",
      "Chego em casa morta às 19h e ainda penso em treino de duas horas.",
    ],
    desejos: [
      "Treinar 40 minutos e sentir que valeu, sem passar a noite na academia.",
      "Entrar na academia sem ninguém me julgando pelo corpo.",
      "Ver o jeans antigo fechar de novo em três meses.",
    ],
  },
  copywriter: {
    headlineAfter: "Comece a treinar com a {empresa}: 40 minutos por dia, acompanhamento de perto e sem julgamento.",
    angles: [
      { tag: 'Medo', h: "Mais um mês prometendo que segunda você começa?", score: 74, note: "dor de largar de novo antes de um mês" },
      { tag: 'Desejo', h: "O jeans antigo fechando em três meses, treinando 40 minutos por dia.", score: 84, note: "resultado concreto com prazo curto" },
      { tag: 'Prova', h: "1.300 alunas voltaram a treinar com a {empresa} e ficaram.", score: 93, note: "prova de constância em número" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Aula experimental grátis", "Avaliação no primeiro dia"],
      pre: "Para quem quer voltar a treinar e dessa vez não largar",
      h1Typed: "Comece a treinar com a {empresa}: 40 minutos por dia, acompanhamento de perto e sem julgamento.",
      h1Pre: "Comece a treinar com a ",
      h1Grad: '{empresa}',
      h1Post: ": 40 minutos por dia, acompanhamento de perto e sem julgamento.",
      sub: "A gente monta um treino de 40 minutos pro seu corpo de hoje, marca seu horário e te chama no dia que você some. Você só aparece e faz.",
      cta: "QUERO MEU TREINO DE 40 MIN",
      ctaNote: "Aula experimental grátis, sem fidelidade",
    },
    ticker: [
      { v: "+1.300", l: "alunas que voltaram a treinar" },
      { v: "40 min", l: "duração do treino" },
      { v: "4,9★", l: "avaliação das alunas" },
    ],
    depoimentos: [
      { nome: "Renata Alves", cargo: "aluna há 8 meses", txt: "Tinha parado 4 vezes. Aqui o professor ficava do meu lado, o treino acabava em 40 minutos e em 3 meses caí dois números de calça." },
      { nome: "Patrícia Gomes", cargo: "aluna há 1 ano", txt: "Eu morria de vergonha de entrar. No primeiro dia me mostraram cada máquina com calma. Hoje treino sozinha e fico à vontade." },
      { nome: "Camila Souza", cargo: "aluna há 5 meses", txt: "Trabalho até as 18h30 e achava que não dava tempo. Treino 40 minutos antes do jantar e em casa nem percebem que saí." },
    ],
    includes: [
      "Avaliação física e foto de antes no seu primeiro dia",
      "Treino de 40 minutos montado pro seu nível, revisado a cada 30 dias",
      "Professor do seu lado em cada série, sem te deixar perdida na máquina",
      "Mensagem no dia que você falta, pra você não sumir de novo",
    ],
    offer: {
      eyebrow: "O acompanhamento",
      hPre: "Você sai daqui com ", hGrad: "treino montado e horário marcado", hPost: " pra amanhã de manhã.",
      cdLab: "A matrícula sem taxa termina em", cdWhen: "Vagas com horário de professor desta semana", cdFoot: "Horários e vagas por turno podem mudar",
      guaranteeTitle: "Primeira semana sem mensalidade", guaranteeText: "Treine os 5 dias com a gente. Se não gostar, você sai sem pagar nada.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Por que treino de 2 horas faz você largar antes do primeiro mês." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Como a gente monta o treino de quem nunca pisou numa academia." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Renata caiu dois números de calça em 3 meses treinando 40 minutos." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "3 exercícios pra fazer em casa no dia que não der pra vir." },
    ],
    tags: ["#academia", "#voltaratreinar", "#treino40min", "#semvergonha", "#fitnessparainiciantes", "#constancia", "#vidasaudavel", "#projetoverao"],
  },
}
