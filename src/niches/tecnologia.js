// Assistência / tecnologia.
// Persona = Rafael, Trabalha do celular e do notebook, ficou sem o aparelho e precisa pra ontem.
export const TECNOLOGIA = {
  label: "Assistência / tecnologia",
  accentDefault: "#4f46e5",
  pesquisa: {
    persona: {
      nome: "Rafael", idade: 34,
      contexto: "Trabalha do celular e do notebook, ficou sem o aparelho e precisa pra ontem",
      fat: "R$ 3 a 7 mil", fatLabel: "renda",
      time: "decide rápido, pesquisa 2 ou 3 lugares no WhatsApp",
      traits: [
        "Depende do aparelho pra trabalhar e ganhar",
        "Tem medo de perder fotos e arquivos",
        "Já levou cano de assistência que enrolou o prazo",
        "Quer o preço antes, sem surpresa no balcão",
      ],
      naoE: "Quer só um orçamento de graça pra comparar e conserta sozinho com vídeo do YouTube.",
    },
    dores: [
      "Meu celular quebrou e sem ele eu não trabalho nem recebo.",
      "Toda assistência me dá um prazo e estoura, dez dias viram vinte.",
      "Tenho pavor de entregar o aparelho e voltarem com a placa pior.",
    ],
    desejos: [
      "Quero o aparelho de volta hoje, com as fotos do meu filho intactas.",
      "Quero o preço fechado antes de você abrir o aparelho, sem susto no balcão.",
      "Quero garantia por escrito na nota, valendo na peça e no serviço.",
    ],
  },
  copywriter: {
    headlineAfter: "Conserto rápido na {empresa}: diagnóstico em 15 min, seus dados intactos e garantia de 90 dias por escrito.",
    angles: [
      { tag: 'Medo', h: "Mais um dia sem o celular que você usa pra trabalhar?", score: 74, note: "dor de ficar parado sem o aparelho" },
      { tag: 'Desejo', h: "Aparelho de volta no mesmo dia, com as fotos e arquivos salvos.", score: 84, note: "desejo de velocidade sem perder dados" },
      { tag: 'Prova', h: "Na {empresa} você aprova o orçamento antes e leva 90 dias de garantia por escrito.", score: 93, note: "prova de transparência e garantia real" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Diagnóstico em 15 min", "Garantia de 90 dias"],
      pre: "Para quem quebrou o aparelho e precisa dele de volta hoje",
      h1Typed: "Conserto rápido na {empresa}: diagnóstico em 15 min, seus dados intactos e 90 dias de garantia.",
      h1Pre: "Conserto rápido na ",
      h1Grad: '{empresa}',
      h1Post: ": diagnóstico em 15 min, seus dados intactos e 90 dias de garantia.",
      sub: "A gente abre, mostra o que tem no WhatsApp e só conserta com seu ok. Tela de celular pronta em 40 min, seu backup feito antes de mexer.",
      cta: "QUERO O ORÇAMENTO AGORA",
      ctaNote: "Diagnóstico grátis, resposta no WhatsApp em 15 min",
    },
    ticker: [
      { v: "+8.400", l: "aparelhos consertados" },
      { v: "40 min", l: "troca de tela na sua frente" },
      { v: "4,9★", l: "no Google, 1.300 avaliações" },
    ],
    depoimentos: [
      { nome: "Camila Reis", cargo: "designer freelancer", txt: "Notebook morreu numa sexta com meu projeto dentro. Domingo já estava ligando, sem perder um arquivo. Pagaram a garantia sem discutir quando travou de novo." },
      { nome: "Diego Antunes", cargo: "motorista de app", txt: "Tela do celular estourou e eu vivo dele. Trocaram em 35 min enquanto eu tomava café. Voltei pra rua no mesmo dia." },
      { nome: "Patrícia Lemos", cargo: "professora", txt: "Achei que tinha perdido as fotos do meu filho quando o aparelho molhou. Recuperaram tudo e ainda salvaram num pendrive pra mim." },
    ],
    includes: [
      "Diagnóstico aberto, com foto do problema no WhatsApp",
      "Backup dos seus dados antes de qualquer reparo",
      "Orçamento fechado antes de mexer, sem surpresa no balcão",
      "Nota fiscal e 90 dias de garantia na peça e no serviço",
    ],
    offer: {
      eyebrow: "O conserto",
      hPre: "Você sai com ", hGrad: "o aparelho funcionando e os dados salvos", hPost: ", no mesmo dia",
      cdLab: "Vagas de reparo expresso de hoje acabam em", cdWhen: "Bancada de hoje", cdFoot: "Peças e prazo podem mudar conforme o modelo",
      guaranteeTitle: "Garantia de 90 dias por escrito", guaranteeText: "Deu o mesmo defeito na peça ou no serviço dentro de 90 dias, você traz e a gente refaz sem cobrar nada.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Como saber se vale consertar ou trocar de celular, pela conta do reparo." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Um dia na bancada: como abrimos um aparelho molhado e salvamos os dados." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Antes e depois: placa queimada que voltou a ligar em 2h." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "3 erros que estragam de vez a tela trincada antes de chegar na assistência." },
    ],
    tags: ["#assistenciatecnica", "#conserto", "#trocadetela", "#recuperacaodedados", "#celular", "#notebook", "#garantia", "#reparoexpresso"],
  },
}
