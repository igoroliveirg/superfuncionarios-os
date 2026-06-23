// Agências & consultorias B2B.
// Persona = o dono de negócio que contrata a agência; copy vende venda, não relatório.
export const AGENCIAS = {
  label: 'Agências & consultorias',
  accentDefault: '#8b5cf6',
  pesquisa: {
    persona: {
      nome: 'Patrícia', idade: 41,
      contexto: 'Dona de negócio cansada de promessa de agência',
      fat: 'R$ 220 mil/mês', fatLabel: 'faturamento',
      time: 'já contratou três agências, decide na prova',
      traits: [
        'Quer venda no caixa, não relatório bonito',
        'Já pagou agência que entregou métrica vazia',
        'Cobra clareza de quanto cada real retorna',
        'Fecha com quem mostra caso do mesmo porte',
      ],
      naoE: 'Quem busca o fee mais barato e troca de agência todo mês.',
    },
    dores: [
      'Pago agência e recebo relatório, não venda.',
      'Ninguém me diz quanto cada real de mídia volta.',
      'Já troquei de agência três vezes e nada mudou.',
    ],
    desejos: [
      'Ver venda no caixa, não gráfico de alcance.',
      'Saber exatamente o retorno de cada real investido.',
      'Uma agência que pensa no meu negócio, não só na campanha.',
    ],
  },
  copywriter: {
    headlineAfter: 'A {empresa} entrega venda no caixa, não relatório de alcance.',
    angles: [
      { tag: 'Medo', h: 'Sua agência entrega relatório bonito e zero venda? Compare.', score: 77, note: 'ataca a dor da métrica vazia' },
      { tag: 'Desejo', h: 'Cada real de mídia rastreado até a venda no seu caixa.', score: 92, note: 'vende retorno claro' },
      { tag: 'Prova', h: 'Veja o que a {empresa} fez por negócios do mesmo porte que o seu.', score: 94, note: 'prova de caso comparável' },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ['Diagnóstico gratuito', '30 min'],
      pre: 'Para negócios que investem em tráfego e querem ver venda, não relatório',
      h1Typed: 'A {empresa} entrega venda no seu caixa, não relatório de alcance',
      h1Pre: 'A ',
      h1Grad: '{empresa}',
      h1Post: ' entrega venda no seu caixa, não relatório de alcance',
      sub: 'Cada real de mídia rastreado até a venda. Você cobra resultado, não slide de alcance.',
      cta: 'QUERO MEU DIAGNÓSTICO',
      ctaNote: 'Gratuito, 30 min, sem compromisso',
    },
    ticker: [
      { v: '+120', l: 'negócios atendidos' },
      { v: '3,2×', l: 'retorno médio em mídia' },
      { v: 'R$ 80mi', l: 'em vendas rastreadas' },
    ],
    depoimentos: [
      { nome: 'Patrícia N.', cargo: 'CEO · varejo', txt: 'Saí do relatório bonito pra venda no caixa. Primeira agência que mostra retorno.' },
      { nome: 'Marcelo D.', cargo: 'Dono · serviços', txt: 'Agora sei quanto cada real de mídia volta. Mudou a conversa.' },
      { nome: 'Aline G.', cargo: 'Sócia · indústria', txt: 'Pensam no meu negócio, não só na campanha. Fez diferença no caixa.' },
    ],
    includes: [
      'Diagnóstico do seu funil de aquisição',
      'Mídia rastreada do clique até a venda',
      'Plano ligado ao caixa, não ao alcance',
      'Relatório que o dono entende em 2 minutos',
    ],
    offer: {
      eyebrow: 'O diagnóstico',
      hPre: 'Você sai com ', hGrad: 'o plano de aquisição', hPost: ' ligado à venda, não ao alcance',
      cdLab: 'Os diagnósticos do mês fecham em', cdWhen: 'Vagas deste mês', cdFoot: 'Limitado a poucos diagnósticos por mês',
      guaranteeTitle: 'Diagnóstico sem compromisso', guaranteeText: 'Não viu valor na conversa? Sem custo, sem insistência.',
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: 'Sua tese sobre por que agência foca na métrica errada.' },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: 'Como você liga mídia a venda, do clique ao caixa.' },
      { nome: 'Prova', ic: '✓', share: 25, ex: 'Caso de cliente: o que mudou no faturamento, com número.' },
      { nome: 'Educação', ic: '✎', share: 20, ex: 'A métrica que o dono devia cobrar da agência hoje.' },
    ],
    tags: ['#agenciademarketing', '#consultoria', '#trafegopago', '#b2b',
      '#performance', '#vendas', '#roi', '#gestao'],
  },
}
