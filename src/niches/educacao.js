// Educação / escolas e cursos.
// Persona = Cláudia, Mãe de filho no 3º ano, contagem regressiva pro vestibular já começou.
export const EDUCACAO = {
  label: "Educação / escolas e cursos",
  accentDefault: "#4338ca",
  pesquisa: {
    persona: {
      nome: "Cláudia", idade: 44,
      contexto: "Mãe de filho no 3º ano, contagem regressiva pro vestibular já começou",
      fat: "R$ 6 a 12 mil", fatLabel: "renda familiar",
      time: "pesquisa por indicação, compara 3 ou 4 cursos antes de matricular",
      traits: [
        "Quer o filho aprovado em federal sem pagar cursinho de novo",
        "Já gastou com curso que o filho largou no segundo mês",
        "Confia mais em nota que subiu do que em promessa",
        "Acompanha boletim e cobra presença nas aulas",
      ],
      naoE: "Quem quer matrícula barata e some, sem cobrar estudo do filho em casa.",
    },
    dores: [
      "Paguei um curso caro e meu filho parou de assistir no segundo mês.",
      "Estudo o ano todo e a nota na prova não sai do lugar.",
      "Tenho medo de chegar no vestibular e ver que joguei dinheiro fora de novo.",
    ],
    desejos: [
      "Ver a nota do simulado subir mês a mês, não só no fim do ano.",
      "Meu filho com plano de estudo claro, sabendo o que cair na prova.",
      "Alguém de perto cobrando presença e tirando dúvida na hora.",
    ],
  },
  copywriter: {
    headlineAfter: "Estude na {empresa} e chegue na prova com a nota que abre a vaga, com plano semanal e tutor que cobra de perto.",
    angles: [
      { tag: 'Medo', h: "Mais um ano de curso que o aluno larga no segundo mês?", score: 74, note: "dor de pagar e ver o filho desistir" },
      { tag: 'Desejo', h: "Nota do simulado subindo todo mês até a vaga sair", score: 85, note: "desejo de progresso visível na prova" },
      { tag: 'Prova', h: "Na {empresa}, 7 de cada 10 alunos passam na primeira opção", score: 93, note: "prova com número de aprovação" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Tutor por aluno", "Simulado a cada 15 dias"],
      pre: "Para a mãe cansada de pagar curso que o filho abandona",
      h1Typed: "Estude na {empresa} e chegue na prova com a nota que abre a vaga",
      h1Pre: "Estude na ",
      h1Grad: '{empresa}',
      h1Post: " e chegue na prova com a nota que abre a vaga",
      sub: "Montamos o plano de estudo da semana, marcamos simulado a cada 15 dias e um tutor cobra presença e tira dúvida no mesmo dia. O aluno sabe o que estudar e a nota mostra o avanço.",
      cta: "QUERO UMA AULA GRÁTIS",
      ctaNote: "Diagnóstico do nível em 1 aula",
    },
    ticker: [
      { v: "+2.800", l: "alunos aprovados" },
      { v: "72%", l: "passam na 1ª opção" },
      { v: "15 dias", l: "entre simulados" },
    ],
    depoimentos: [
      { nome: "Renata Alves", cargo: "mãe do João, aprovado em medicina", txt: "Meu filho largou dois cursinhos antes. Aqui o tutor ligava quando ele faltava. Passou em medicina na federal no primeiro ano." },
      { nome: "Pedro Santana", cargo: "aluno aprovado em engenharia", txt: "Comecei tirando 480 no simulado. Em sete meses cheguei a 720 e passei em engenharia. O plano semanal salvou." },
      { nome: "Marina Costa", cargo: "mãe da Letícia, 2ª no curso de direito", txt: "Eu via a nota subir a cada quinze dias no relatório. Pela primeira vez senti que o dinheiro virou resultado." },
    ],
    includes: [
      "Plano de estudo da semana feito pro nível do aluno",
      "Tutor que acompanha presença e responde dúvida no mesmo dia",
      "Simulado a cada 15 dias com nota comparada à anterior",
      "Relatório de evolução enviado pro responsável todo mês",
    ],
    offer: {
      eyebrow: "O acompanhamento",
      hPre: "Seu filho chega na prova com ", hGrad: "plano claro e nota que subiu", hPost: " no relatório",
      cdLab: "As vagas da turma de junho fecham em", cdWhen: "Turma com início dia 1º de julho", cdFoot: "Turmas têm limite de 25 alunos por tutor",
      guaranteeTitle: "30 dias pra sentir o método", guaranteeText: "Faça o primeiro mês completo. Se o aluno não engajar com o plano e o tutor, devolvemos a mensalidade.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Sua leitura do edital: o que mais cai na prova deste ano e como estudar." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Um dia na tutoria: como o tutor monta o plano da semana de um aluno real." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "De 480 a 720 no simulado: a evolução do Pedro em sete meses." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Como ler um simulado: o que a nota mostra sobre o que falta estudar." },
    ],
    tags: ["#vestibular", "#aprovacao", "#cursinho", "#enem", "#estudos", "#federal", "#tutoria", "#planodeestudo"],
  },
}
