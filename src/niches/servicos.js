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
      h1Typed: 'Resolva com a {empresa}, quem assume o seu caso e responde no mesmo dia',
      h1Pre: 'Resolva com a ',
      h1Grad: '{empresa}',
      h1Post: ', quem assume o seu caso e responde no mesmo dia',
    },
    offer: { hPre: 'Você sai com ', hGrad: 'o diagnóstico do seu caso', hPost: ' e o próximo passo claro' },
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
