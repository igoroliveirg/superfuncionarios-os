// Finanças / investimentos.
// Persona = Renato, Ganha bem, junta dinheiro, mas vê tudo parado na conta.
export const FINANCAS = {
  label: "Finanças / investimentos",
  accentDefault: "#059669",
  pesquisa: {
    persona: {
      nome: "Renato", idade: 37,
      contexto: "Ganha bem, junta dinheiro, mas vê tudo parado na conta",
      fat: "R$ 12 a 25 mil", fatLabel: "renda mensal",
      time: "adia há meses, abre 5 abas e fecha tudo",
      traits: [
        "Tem reserva parada na poupança rendendo quase nada",
        "Trava na hora de escolher onde investir",
        "Desconfia de promessa de ganho fácil",
        "Quer um plano claro pra seguir, sem mais um gráfico pra estudar",
      ],
      naoE: "Caçador de cripto do momento que quer dobrar o capital em 30 dias e some quando o gráfico cai.",
    },
    dores: [
      "Ganho bem, mas no fim do ano não sobra patrimônio, só extrato.",
      "Tenho R$ 80 mil parado na conta com medo de errar onde colocar.",
      "Abro o app do banco, vejo 200 opções e fecho sem decidir nada.",
    ],
    desejos: [
      "Ver meu dinheiro render mais que a poupança sem virar trader.",
      "Um plano escrito que diz onde colocar cada real e por quê.",
      "Dormir tranquilo sabendo que a reserva está protegida e rendendo.",
    ],
  },
  copywriter: {
    headlineAfter: "Pare de deixar dinheiro parado: com a {empresa} você sai com um plano que diz onde investir cada real.",
    angles: [
      { tag: 'Medo', h: "Mais um ano com o dinheiro parado rendendo menos que a inflação?", score: 74, note: "dor de ver patrimônio encolher parado" },
      { tag: 'Desejo', h: "Seu salário rendendo o ano inteiro, até enquanto você dorme.", score: 84, note: "desejo de dinheiro rendendo no automático" },
      { tag: 'Prova', h: "Com a {empresa}, mais de 1.800 pessoas saíram da poupança com plano escrito em 7 dias.", score: 92, note: "prova com número e prazo" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Plano em 7 dias", "Sem vender produto de banco"],
      pre: "Para quem ganha bem e cansou de ver o dinheiro parado",
      h1Typed: "Pare de deixar dinheiro parado: com a {empresa} você sai com um plano que diz onde investir cada real.",
      h1Pre: "Pare de deixar dinheiro parado: com a ",
      h1Grad: '{empresa}',
      h1Post: " você sai com um plano que diz onde investir cada real.",
      sub: "A gente mapeia sua renda, monta a carteira pro seu objetivo e entrega o passo a passo. Você abre o app e segue, sem virar trader.",
      cta: "QUERO MEU PLANO",
      ctaNote: "Diagnóstico grátis em 15 min",
    },
    ticker: [
      { v: "+1.800", l: "carteiras montadas" },
      { v: "7 dias", l: "da conversa ao plano pronto" },
      { v: "4,9★", l: "nota de quem investiu" },
    ],
    depoimentos: [
      { nome: "Carla M.", cargo: "dentista, 34", txt: "Tinha R$ 120 mil na poupança há 3 anos. Em uma semana saí com a carteira montada e hoje rendo 4 vezes mais, sem mexer todo dia." },
      { nome: "Diego F.", cargo: "engenheiro, 41", txt: "Eu abria o app do banco e fechava sem decidir. Recebi um plano de uma página, segui e em 6 meses já tinha a reserva de emergência separada." },
      { nome: "Patrícia L.", cargo: "gerente comercial, 39", txt: "Não me empurraram produto nenhum. Olharam minha renda, meu medo de risco e montaram algo que eu entendo. Parei de adiar." },
    ],
    includes: [
      "Diagnóstico da sua renda, gastos e reserva atual",
      "Carteira montada pro seu objetivo e seu nível de risco",
      "Plano de uma página: onde colocar cada real e por quê",
      "Acompanhamento por 90 dias pra ajustar quando a vida mudar",
    ],
    offer: {
      eyebrow: "O acompanhamento",
      hPre: "Você sai com ", hGrad: "a carteira montada e o passo a passo", hPost: " pra começar hoje",
      cdLab: "As vagas desta semana acabam em", cdWhen: "Atendemos 12 pessoas por semana", cdFoot: "Agenda e vagas podem mudar",
      guaranteeTitle: "7 dias pra testar sem risco", guaranteeText: "Recebeu o plano e não fez sentido pra você? Devolvemos o valor em 7 dias, sem pergunta.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Quanto a poupança perdeu pra inflação nos últimos 12 meses, com número na tela." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Como montamos a carteira de um cliente que tinha R$ 80 mil parado, do zero ao plano." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Print real: a renda da Carla 4 vezes maior depois de sair da poupança." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Reserva de emergência, renda fixa e renda variável: onde cada real entra e por quê." },
    ],
    tags: ["#investimentos", "#sairdapoupanca", "#liberdadefinanceira", "#dinheirorendendo", "#educacaofinanceira", "#rendafixa", "#planejamentofinanceiro", "#patrimonio"],
  },
}
