// App / SaaS (aplicativo, automação, ferramenta no WhatsApp, produtividade,
// saúde/fitness digital). Persona = o usuário final que quer praticidade.
export const APP = {
  label: 'App / SaaS',
  accentDefault: '#4f46e5',
  pesquisa: {
    persona: {
      nome: 'Letícia', idade: 31,
      contexto: 'Rotina corrida, quer praticidade',
      fat: 'classe A/B', fatLabel: 'perfil',
      time: 'resolve tudo pelo celular',
      traits: [
        'Quer resultado sem complicação',
        'Largou app chato que exige disciplina',
        'Compra o que promete facilidade real',
        'Desconfia de mais um app que vai abandonar',
      ],
      naoE: 'Quem adora configurar e virar power-user.',
    },
    dores: [
      'Todo app exige uma disciplina que eu não tenho.',
      'Começo animada e largo na segunda semana.',
      'Perco tempo configurando em vez de usar.',
    ],
    desejos: [
      'Resolver no automático, sem esforço.',
      'Um app que funciona só mandando uma mensagem.',
      'Resultado sem virar especialista no assunto.',
    ],
  },
  copywriter: {
    headlineAfter: '{empresa}: o resultado no automático, sem você ter que aprender nada.',
    angles: [
      { tag: 'Medo', h: 'Cansada de baixar app e largar na primeira semana?', score: 74, note: 'fala com quem já desistiu' },
      { tag: 'Desejo', h: 'O resultado no automático: você só manda uma mensagem.', score: 91, note: 'promete zero esforço' },
      { tag: 'Prova', h: 'Veja gente comum usando {empresa} todo dia, sem disciplina.', score: 93, note: 'prova de uso real' },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ['Grátis pra testar', 'No celular'],
      pre: 'Para quem quer resultado sem virar especialista',
      h1Typed: '{empresa}: o resultado no automático, sem você aprender nada',
      h1Pre: '',
      h1Grad: '{empresa}',
      h1Post: ': o resultado no automático, sem você aprender nada',
      sub: 'Sem planilha, sem curva de aprendizado. Você usa em segundos e o app faz o resto.',
      cta: 'COMEÇAR AGORA',
      ctaNote: 'Grátis pra testar',
    },
    ticker: [
      { v: '+50 mil', l: 'usuários ativos' },
      { v: '4,8★', l: 'na loja de apps' },
      { v: '30s', l: 'pra começar a usar' },
    ],
    depoimentos: [
      { nome: 'Carla M.', cargo: 'Usuária', txt: 'Finalmente um app que eu não largo. Faz tudo sozinho.' },
      { nome: 'Thiago R.', cargo: 'Usuário', txt: 'Mando uma mensagem e tá resolvido. Simples assim.' },
      { nome: 'Aline P.', cargo: 'Usuária', txt: 'Resultado real sem eu virar expert. Recomendo demais.' },
    ],
    includes: [
      'Acesso completo, sem cartão pra testar',
      'Funciona direto no seu celular',
      'Resultado no automático, sem configurar nada',
      'Suporte humano quando você precisar',
    ],
    offer: {
      eyebrow: 'O app',
      hPre: 'Você começa a usar ', hGrad: 'em 30 segundos', hPost: ', de graça',
      cdLab: 'A oferta de lançamento acaba em', cdWhen: 'Vagas grátis desta semana', cdFoot: 'Sem cartão pra testar',
      guaranteeTitle: 'Grátis pra testar', guaranteeText: 'Não curtiu? Cancela em 1 toque, sem pegadinha.',
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: 'Por que o método "com disciplina" falha e o automático vence.' },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: 'Como o app funciona por dentro, sem termo técnico.' },
      { nome: 'Prova', ic: '✓', share: 25, ex: 'Usuário real mostrando o resultado no dia a dia.' },
      { nome: 'Educação', ic: '✎', share: 20, ex: 'Uma dica rápida que o seguidor aplica hoje, de graça.' },
    ],
    tags: ['#app', '#tecnologia', '#praticidade', '#automacao',
      '#produtividade', '#inteligenciaartificial', '#facilitaavida', '#novidade'],
  },
}
