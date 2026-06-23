// Imobiliária / imóveis (corretor, imobiliária, lançamentos, construtora).
// Persona = o comprador do imóvel; copy fala com quem quer sair do aluguel.
export const IMOBILIARIA = {
  label: 'Imobiliária / imóveis',
  accentDefault: '#0d9488',
  pesquisa: {
    persona: {
      nome: 'Marcelo', idade: 38,
      contexto: 'Família crescendo, cansado de pagar aluguel',
      fat: 'R$ 8 a 15 mil', fatLabel: 'renda familiar',
      time: 'pesquisa meses, visita vários',
      traits: [
        'Quer sair do aluguel sem se enrolar',
        'Tem medo de fechar um negócio ruim',
        'Compara financiamento em todo banco',
        'Decide com a família, sem pressa',
      ],
      naoE: 'Curioso que só quer "dar uma olhada" e some.',
    },
    dores: [
      'Pago aluguel há anos e não construo nada meu.',
      'Tenho medo de me enrolar no financiamento.',
      'Vejo foto bonita e o imóvel real decepciona.',
    ],
    desejos: [
      'Sair do aluguel sem susto na parcela.',
      'Ver o imóvel de verdade antes de visitar.',
      'Alguém que resolve a papelada por mim.',
    ],
  },
  copywriter: {
    headlineAfter: 'Saia do aluguel com a {empresa}: o imóvel certo, com a parcela que cabe no seu bolso.',
    angles: [
      { tag: 'Medo', h: 'Mais um ano jogando dinheiro fora no aluguel?', score: 75, note: 'dor de não construir patrimônio' },
      { tag: 'Desejo', h: 'O apê dos seus sonhos com a parcela do seu aluguel de hoje.', score: 91, note: 'ancora na parcela que ele já paga' },
      { tag: 'Prova', h: 'Veja famílias que saíram do aluguel com a {empresa} este ano.', score: 93, note: 'prova social local' },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ['Plantão de vendas', 'Visita agendada'],
      pre: 'Para quem quer sair do aluguel sem dor de cabeça',
      h1Typed: 'Saia do aluguel com a {empresa}: o imóvel certo, com a parcela que cabe no bolso',
      h1Pre: 'Saia do aluguel com a ',
      h1Grad: '{empresa}',
      h1Post: ': o imóvel certo, com a parcela que cabe no bolso',
      sub: 'A gente acha o imóvel, simula o financiamento e cuida da papelada. Você só escolhe e se muda.',
      cta: 'QUERO VER IMÓVEIS',
      ctaNote: 'Simulação grátis em 2 min',
    },
    ticker: [
      { v: '+1.200', l: 'famílias realizadas' },
      { v: '4,9★', l: 'avaliação dos clientes' },
      { v: '48h', l: 'pra aprovar seu crédito' },
    ],
    depoimentos: [
      { nome: 'Renata e João', cargo: 'Compraram o 1º apê', txt: 'Saímos do aluguel com a parcela quase igual. Cuidaram de tudo.' },
      { nome: 'Anderson P.', cargo: 'Investidor', txt: 'Acharam o imóvel certo pro meu perfil. Fechei sem stress.' },
      { nome: 'Camila R.', cargo: 'Cliente', txt: 'A papelada que me assustava, eles resolveram. Recomendo.' },
    ],
    includes: [
      'Curadoria de imóveis pro seu perfil e bolso',
      'Simulação de financiamento em todos os bancos',
      'Visita agendada quando for melhor pra você',
      'Toda a papelada e o cartório no nosso colo',
    ],
    offer: {
      eyebrow: 'O atendimento',
      hPre: 'Você sai com ', hGrad: 'o imóvel certo e o crédito', hPost: ' aprovado',
      cdLab: 'As condições de lançamento acabam em', cdWhen: 'Unidades desta semana', cdFoot: 'Estoque e tabela podem mudar',
      guaranteeTitle: 'Acompanhamento até a chave', guaranteeText: 'A gente fica do seu lado, da proposta à entrega das chaves.',
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: 'Sua leitura do mercado: a hora certa de sair do aluguel.' },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: 'Tour real do imóvel, sem foto que engana.' },
      { nome: 'Prova', ic: '✓', share: 25, ex: 'Família recebendo a chave, antes e depois.' },
      { nome: 'Educação', ic: '✎', share: 20, ex: 'Como aprovar o financiamento sem dor de cabeça.' },
    ],
    tags: ['#imoveis', '#imobiliaria', '#saiadoaluguel', '#casapropria',
      '#financiamento', '#apartamento', '#investimento', '#realizandosonhos'],
  },
}
