// Clínicas & estética / saúde (odonto, harmonização, derma).
// Persona = a paciente; copy fala com quem decide o procedimento.
export const CLINICAS = {
  label: 'Clínicas & estética',
  accentDefault: '#ff6f91',
  pesquisa: {
    persona: {
      nome: 'Marina', idade: 39,
      contexto: 'Mulher, capital, cuida da própria imagem',
      fat: 'R$ 3 a 9 mil', fatLabel: 'ticket médio',
      time: 'pesquisa semanas antes de marcar',
      traits: [
        'Quer resultado natural, sem parecer que fez',
        'Tem medo de cair em mão errada',
        'Compara três clínicas antes de decidir',
        'Decide pela confiança, não pelo preço',
      ],
      naoE: 'Quem caça só o mais barato e some depois.',
    },
    dores: [
      'Tenho medo de estragar meu rosto numa mão ruim.',
      'Já vi resultado exagerado e me assustei.',
      'Não sei em quem confiar entre tanta clínica.',
    ],
    desejos: [
      'Um resultado que ninguém percebe que é procedimento.',
      'Profissional que mostra caso real, não só foto pronta.',
      'Sentir segurança antes de sentar na cadeira.',
    ],
  },
  copywriter: {
    headlineAfter: 'Realce o seu natural na {empresa}, com quem mostra resultado, não promete milagre.',
    angles: [
      { tag: 'Medo', h: 'Procedimento errado marca o rosto. Escolha quem mostra antes e depois real.', score: 76, note: 'ativa o medo do resultado ruim' },
      { tag: 'Desejo', h: 'O resultado natural que ninguém percebe e todo mundo elogia.', score: 91, note: 'fala com quem quer discrição' },
      { tag: 'Prova', h: 'Veja casos reais da {empresa} antes de marcar a sua avaliação.', score: 94, note: 'prova visual, não promessa' },
    ],
  },
  construtor: {
    hero: {
      h1Typed: 'Realce o seu natural na {empresa} com quem mostra resultado real, não promete milagre',
      h1Pre: 'Realce o seu natural na ',
      h1Grad: '{empresa}',
      h1Post: ' com quem mostra resultado real, não promete milagre',
    },
    offer: { hPre: 'Você sai com ', hGrad: 'a avaliação e o plano', hPost: ' do seu rosto na mão' },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: 'Sua leitura técnica do rosto: por que menos é mais.' },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: 'O procedimento por dentro, do protocolo à recuperação.' },
      { nome: 'Prova', ic: '✓', share: 25, ex: 'Antes e depois real, com consentimento da paciente.' },
      { nome: 'Educação', ic: '✎', share: 20, ex: 'O que perguntar antes de fazer qualquer procedimento.' },
    ],
    tags: ['#harmonizacaofacial', '#estetica', '#odontologia', '#dermatologia',
      '#resultadonatural', '#autoestima', '#cuidadocomapele', '#antesedepois'],
  },
}
