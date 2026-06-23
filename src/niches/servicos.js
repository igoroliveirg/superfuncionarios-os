// Serviços profissionais locais (advocacia, contabilidade, arquitetura).
// Persona = quem contrata o serviço; copy vende confiança e resolução.
export const SERVICOS = {
  label: 'Serviços profissionais',
  accentDefault: '#2e6cf6',
  pesquisa: {
    persona: {
      nome: 'Eduardo', idade: 45,
      contexto: 'Empresário que precisa resolver, não entender',
      fat: 'R$ 90 mil/mês', fatLabel: 'faturamento',
      time: 'busca indicação, decide por confiança',
      traits: [
        'Quer o problema resolvido, não uma aula',
        'Já foi mal atendido e ficou no escuro',
        'Paga bem por quem responde rápido',
        'Decide por reputação e prova, não por preço',
      ],
      naoE: 'Quem quer consulta grátis e some na hora de fechar.',
    },
    dores: [
      'Contratei e fiquei semanas sem retorno.',
      'Ninguém me explica em português o que está rolando.',
      'Tenho medo de errar e pagar caro depois.',
    ],
    desejos: [
      'Alguém que assume o problema e me dá tranquilidade.',
      'Resposta clara e rápida, sem juridiquês.',
      'Profissional que já resolveu o meu tipo de caso.',
    ],
  },
  copywriter: {
    headlineAfter: 'Resolva com a {empresa}: quem assume o seu caso e responde no mesmo dia.',
    angles: [
      { tag: 'Medo', h: 'Cansado de contratar e ficar no escuro? Aqui você sabe de tudo.', score: 75, note: 'ataca o medo do abandono' },
      { tag: 'Desejo', h: 'Seu problema na mão de quem resolve e responde no mesmo dia.', score: 90, note: 'vende tranquilidade' },
      { tag: 'Prova', h: 'Veja casos que a {empresa} já resolveu pra quem estava no seu lugar.', score: 93, note: 'prova de resolução' },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ['Atendimento direto', 'Resposta no mesmo dia'],
      pre: 'Para quem precisa resolver, não virar especialista no assunto',
      h1Typed: 'Resolva com a {empresa}, quem assume o seu caso e responde no mesmo dia',
      h1Pre: 'Resolva com a ',
      h1Grad: '{empresa}',
      h1Post: ', quem assume o seu caso e responde no mesmo dia',
      sub: 'Você explica uma vez. A gente assume daí. Resposta clara, sem juridiquês, no mesmo dia.',
      cta: 'FALAR COM UM ESPECIALISTA',
      ctaNote: 'Retorno em até 3h úteis',
    },
    ticker: [
      { v: '+800', l: 'casos resolvidos' },
      { v: '4,9★', l: 'avaliação dos clientes' },
      { v: '3h', l: 'pra primeira resposta' },
    ],
    depoimentos: [
      { nome: 'Eduardo M.', cargo: 'Cliente', txt: 'Assumiram o problema e me deram tranquilidade. Resolveram rápido.' },
      { nome: 'Sandra L.', cargo: 'Cliente', txt: 'Pela primeira vez entendi tudo, sem termo difícil.' },
      { nome: 'Roberto A.', cargo: 'Empresário', txt: 'Respondem no mesmo dia. Nunca mais fiquei no escuro.' },
    ],
    includes: [
      'Diagnóstico do seu caso na primeira conversa',
      'Um responsável direto pelo seu atendimento',
      'Atualização clara em cada etapa',
      'Próximos passos definidos, sem enrolação',
    ],
    offer: {
      eyebrow: 'O atendimento',
      hPre: 'Você sai com ', hGrad: 'o diagnóstico do seu caso', hPost: ' e o próximo passo claro',
      cdLab: 'As vagas da semana fecham em', cdWhen: 'Agenda desta semana', cdFoot: 'Atendimento limitado por semana',
      guaranteeTitle: 'Clareza garantida', guaranteeText: 'Saiu da conversa sem entender? A gente explica de novo, sem custo.',
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: 'Sua leitura do erro que mais custa caro ao cliente.' },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: 'Como você conduz um caso, do primeiro contato ao fim.' },
      { nome: 'Prova', ic: '✓', share: 25, ex: 'Caso resolvido, com o resultado que o cliente teve.' },
      { nome: 'Educação', ic: '✎', share: 20, ex: 'O que checar antes de assinar qualquer contrato.' },
    ],
    tags: ['#advocacia', '#contabilidade', '#servicos', '#empresario',
      '#consultoria', '#segurancajuridica', '#atendimento', '#resolucao'],
  },
}
