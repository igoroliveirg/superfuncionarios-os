// E-commerce / loja virtual / D2C.
// Persona = o consumidor; copy ataca preço, prazo e confiança.
export const ECOMMERCE = {
  label: 'E-commerce / loja virtual',
  accentDefault: '#2fb6ff',
  pesquisa: {
    persona: {
      nome: 'Bruno', idade: 29,
      contexto: 'Compra pelo celular, compara tudo',
      fat: 'R$ 150 a 400', fatLabel: 'ticket médio',
      time: 'decide em minutos, abandona carrinho fácil',
      traits: [
        'Compara preço e prazo em três abas abertas',
        'Desconfia de loja sem avaliação',
        'Abandona se o frete assusta no fim',
        'Volta se o anúncio reaparece com prova',
      ],
      naoE: 'Quem só quer cupom e nunca fecha.',
    },
    dores: [
      'Já comprei online e o produto não chegou.',
      'O frete dobra o preço na última tela.',
      'Não sei se a loja é confiável de verdade.',
    ],
    desejos: [
      'Comprar sem medo de cair em golpe.',
      'Prazo claro e frete justo desde o anúncio.',
      'Achar avaliação real antes de pagar.',
    ],
  },
  copywriter: {
    headlineAfter: 'Compre na {empresa} com prazo claro, frete justo e avaliação real de quem já recebeu.',
    angles: [
      { tag: 'Medo', h: 'Cansado de loja que some depois do pagamento? Veja quem entrega.', score: 74, note: 'ataca o medo do golpe' },
      { tag: 'Desejo', h: 'Frete justo, prazo claro e troca fácil. Do clique à porta.', score: 89, note: 'remove atrito da compra' },
      { tag: 'Prova', h: 'Milhares de avaliações reais antes de você adicionar ao carrinho.', score: 93, note: 'prova social no anúncio' },
    ],
  },
  construtor: {
    hero: {
      h1Typed: 'Compre na {empresa} com prazo claro, frete justo e avaliação real de quem já recebeu',
      h1Pre: 'Compre na ',
      h1Grad: '{empresa}',
      h1Post: ' com prazo claro, frete justo e avaliação real de quem já recebeu',
    },
    offer: { hPre: 'Você fecha ', hGrad: 'a compra em 1 minuto', hPost: ', com frete e prazo na cara' },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: 'Por que a sua curadoria vence o marketplace genérico.' },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: 'Do estoque ao envio: como o pedido chega rápido.' },
      { nome: 'Prova', ic: '✓', share: 25, ex: 'Unboxing e avaliação real de cliente que recebeu.' },
      { nome: 'Educação', ic: '✎', share: 20, ex: 'Como escolher o produto certo sem errar o tamanho.' },
    ],
    tags: ['#lojavirtual', '#ecommerce', '#compraonline', '#fretegratis',
      '#novidades', '#promocao', '#unboxing', '#avaliacaoreal'],
  },
}
