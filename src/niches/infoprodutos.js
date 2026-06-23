// Infoprodutos / educação online (mentorias, cursos, lançamentos).
// Override mínimo: persona do aluno, copy, hero/oferta, pilares e tags.
export const INFOPRODUTOS = {
  label: 'Infoprodutos / educação',
  accentDefault: '#ff8a3c',
  pesquisa: {
    persona: {
      nome: 'Camila', idade: 34,
      contexto: 'Profissional CLT querendo virar a chave',
      fat: 'R$ 9 mil/mês', fatLabel: 'renda',
      time: 'decide sozinha, no celular, à noite',
      traits: [
        'Quer virada de carreira, não passatempo',
        'Já comprou curso barato e travou na aula 3',
        'Tem medo de gastar e não conseguir aplicar',
        'Compra de quem mostra aluno, não promessa',
      ],
      naoE: 'Curioso que coleciona PDF grátis e nunca executa.',
    },
    dores: [
      'Comprei o curso, vi metade, não saí do lugar.',
      'Tenho conteúdo demais e método de menos.',
      'Travo na primeira dúvida porque estudo sozinha.',
    ],
    desejos: [
      'Um passo a passo que cabe na minha noite.',
      'Sair da aula 1 com a primeira entrega pronta.',
      'Alguém que responde quando eu empaco.',
    ],
  },
  copywriter: {
    headlineAfter: 'O método de {empresa} pra você sair do zero à primeira entrega em 30 dias.',
    angles: [
      { tag: 'Medo', h: 'Mais um curso na prateleira ou a virada que você adiou?', score: 73, note: 'fala com quem comprou e travou' },
      { tag: 'Desejo', h: 'Saia da aula 1 com a primeira entrega pronta, não com mais teoria.', score: 90, note: 'promete execução, não conteúdo' },
      { tag: 'Prova', h: 'Veja alunos de {empresa} aplicando no primeiro fim de semana.', score: 95, note: 'prova de execução real' },
    ],
  },
  construtor: {
    hero: {
      h1Typed: 'Aprenda o método de {empresa} e saia com a primeira entrega pronta em 30 dias',
      h1Pre: 'Aprenda o método de ',
      h1Grad: '{empresa}',
      h1Post: ' e saia com a primeira entrega pronta em 30 dias',
    },
    offer: { hPre: 'Você sai com ', hGrad: 'a primeira entrega', hPost: ' rodando, não só com teoria' },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: 'Sua tese: por que o método comum trava o aluno.' },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: 'Como você ensina por dentro, com o aluno aplicando.' },
      { nome: 'Prova', ic: '✓', share: 25, ex: 'Print do aluno que saiu do zero, antes e depois.' },
      { nome: 'Educação', ic: '✎', share: 20, ex: 'Uma aula curta que o seguidor aplica hoje, de graça.' },
    ],
    tags: ['#mentoria', '#cursoonline', '#empreendedorismo', '#educacao',
      '#metododevenda', '#resultadoreal', '#carreira', '#aprendizado'],
  },
}
