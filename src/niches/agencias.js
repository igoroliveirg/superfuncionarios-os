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
      h1Typed: 'A {empresa} entrega venda no seu caixa, não relatório de alcance',
      h1Pre: 'A ',
      h1Grad: '{empresa}',
      h1Post: ' entrega venda no seu caixa, não relatório de alcance',
    },
    offer: { hPre: 'Você sai com ', hGrad: 'o plano de aquisição', hPost: ' ligado à venda, não ao alcance' },
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
