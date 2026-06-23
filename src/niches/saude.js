// Saúde / bem-estar.
// Persona = Camila, Trabalha, cuida da casa e dos filhos, sobra zero pra ela.
export const SAUDE = {
  label: "Saúde / bem-estar",
  accentDefault: "#10b981",
  pesquisa: {
    persona: {
      nome: "Camila", idade: 37,
      contexto: "Trabalha, cuida da casa e dos filhos, sobra zero pra ela",
      fat: "R$ 6 a 12 mil", fatLabel: "renda familiar",
      time: "adia há meses, decide quando o corpo cobra",
      traits: [
        "Acorda cansada mesmo dormindo a noite toda",
        "Já tentou dieta e treino por conta e largou em 3 semanas",
        "Tem medo de gastar e não mudar nada de novo",
        "Quer alguém que escute antes de receitar",
      ],
      naoE: "Quem quer remédio pra emagrecer rápido e sumir, sem mudar rotina nem voltar pra consulta.",
    },
    dores: [
      "Vivo no automático e só percebo o cansaço quando deito.",
      "Já paguei por planos prontos que não olharam pra mim.",
      "Sinto que cuido de todo mundo, menos de mim.",
    ],
    desejos: [
      "Acordar com energia pra aguentar o dia inteiro.",
      "Ter um plano montado em cima da minha rotina e dos meus exames, do meu jeito.",
      "Me sentir bem no meu corpo sem viver de regime.",
    ],
  },
  copywriter: {
    headlineAfter: "Cuide de você de verdade com a {empresa}: plano feito pra sua rotina, com acompanhamento toda semana.",
    angles: [
      { tag: 'Medo', h: "Mais um ano cansada e fora do seu corpo?", score: 74, note: "dor de adiar o próprio cuidado" },
      { tag: 'Desejo', h: "Acorde com energia e termine o dia ainda de pé.", score: 84, note: "desejo de disposição na rotina real" },
      { tag: 'Prova', h: "Na {empresa}, 9 em cada 10 pacientes seguem o plano depois de 90 dias.", score: 92, note: "prova de adesão e resultado real" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Primeira escuta de 50 min", "Plano individual por escrito"],
      pre: "Para quem cuida de todo mundo e esqueceu de si",
      h1Typed: "Cuide de você de verdade com a {empresa}: plano feito pra sua rotina, com acompanhamento toda semana.",
      h1Pre: "Cuide de você de verdade com a ",
      h1Grad: '{empresa}',
      h1Post: ": plano feito pra sua rotina, com acompanhamento toda semana.",
      sub: "A gente escuta sua rotina, exames e história numa consulta de 50 minutos. Sai dela com um plano por escrito e um retorno marcado a cada 7 dias pra ajustar o que travou.",
      cta: "QUERO MINHA PRIMEIRA ESCUTA",
      ctaNote: "Agenda em 2 min, resposta no mesmo dia",
    },
    ticker: [
      { v: "+800", l: "pacientes acompanhados" },
      { v: "50 min", l: "na primeira escuta" },
      { v: "4,9★", l: "média de avaliação" },
    ],
    depoimentos: [
      { nome: "Renata M.", cargo: "professora, 41 anos", txt: "Cheguei achando que era preguiça. Em 2 meses parei de acordar arrasada e voltei a treinar 3 vezes por semana." },
      { nome: "Patrícia S.", cargo: "analista, 35 anos", txt: "Foi a primeira vez que alguém olhou meus exames e perguntou da minha rotina antes de mandar fazer dieta." },
      { nome: "Juliana T.", cargo: "autônoma, 44 anos", txt: "O retorno toda semana me segurou. Perdi 7 kg sem cortar tudo o que gosto e sem culpa." },
    ],
    includes: [
      "Primeira escuta de 50 min, sem pressa e sem fila",
      "Plano individual por escrito pra sua rotina e seus exames",
      "Retorno a cada 7 dias pra ajustar o que travou",
      "Canal direto no WhatsApp pra dúvida entre consultas",
    ],
    offer: {
      eyebrow: "O acompanhamento",
      hPre: "Você sai com ", hGrad: "um plano por escrito e um retorno marcado", hPost: " pra cada 7 dias",
      cdLab: "As vagas desta semana fecham em", cdWhen: "Agenda desta semana", cdFoot: "Atendo 12 pacientes novos por semana, agenda pode encher antes",
      guaranteeTitle: "Acompanhamento até o plano andar", guaranteeText: "Se na primeira escuta você não sair com um plano claro pra sua rotina, devolvo o valor da consulta.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Cansaço o dia inteiro nem sempre é falta de sono: o que seus exames mostram primeiro." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Como monto um plano numa consulta de 50 min: o que pergunto antes de receitar." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Renata acordava arrasada e voltou a treinar 3x por semana em 2 meses." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Por que dieta pronta falha em 3 semanas e o que segura a mudança no longo prazo." },
    ],
    tags: ["#saude", "#bemestar", "#energiadiaria", "#autocuidado", "#planoindividual", "#qualidadedevida", "#mudancareal", "#cuidardevoce"],
  },
}
