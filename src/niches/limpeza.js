// Limpeza / conservação.
// Persona = Patrícia, Trabalha fora o dia todo, casa vira bagunça e o fim de semana some na faxina.
export const LIMPEZA = {
  label: "Limpeza / conservação",
  accentDefault: "#0891b2",
  pesquisa: {
    persona: {
      nome: "Patrícia", idade: 41,
      contexto: "Trabalha fora o dia todo, casa vira bagunça e o fim de semana some na faxina",
      fat: "R$ 9 a 18 mil", fatLabel: "renda familiar",
      time: "já se queimou com diarista que some, pesquisa indicação antes de abrir a porta",
      traits: [
        "Não abre a porta pra estranho sem referência",
        "Já teve sumiço de diarista em cima da hora",
        "Quer a casa limpa sem perder o sábado",
        "Confere canto de banheiro e atrás do fogão",
      ],
      naoE: "Quem caça o serviço mais barato e some quando vê que limpeza de verdade tem hora e padrão.",
    },
    dores: [
      "Perco meu sábado inteiro limpando e nem fica do jeito que eu queria.",
      "Já tive diarista que sumiu na sexta e me deixou na mão com visita marcada.",
      "Fico tensa de deixar gente que não conheço sozinha dentro de casa.",
    ],
    desejos: [
      "Chegar do trabalho e achar a casa cheirosa e no lugar.",
      "A mesma equipe toda semana, gente que eu já conheço pelo nome.",
      "Saber quem entra na minha casa antes de a pessoa chegar.",
    ],
  },
  copywriter: {
    headlineAfter: "Casa limpa toda semana com a {empresa}: equipe fixa, com referência, limpeza que você confere no canto do banheiro.",
    angles: [
      { tag: 'Medo', h: "Mais um sábado perdido na faxina depois de uma semana inteira correndo?", score: 74, note: "dor de perder o descanso limpando" },
      { tag: 'Desejo', h: "Chegue em casa na sexta e ache tudo no lugar, cheiroso e brilhando", score: 84, note: "desejo da casa pronta sem esforço" },
      { tag: 'Prova', h: "A {empresa} manda a mesma equipe toda semana, com nome, foto e referência antes de entrar", score: 92, note: "prova de confiança e equipe fixa" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Equipe fixa e identificada", "Você sabe quem entra"],
      pre: "Para quem quer a casa limpa sem abrir a porta pra estranho",
      h1Typed: "Casa limpa toda semana com a {empresa}: equipe fixa, com referência, limpeza que você confere no canto do banheiro",
      h1Pre: "Casa limpa toda semana com a ",
      h1Grad: '{empresa}',
      h1Post: ": equipe fixa, com referência, limpeza que você confere no canto do banheiro",
      sub: "A mesma dupla vai à sua casa toda semana, com foto e nome enviados antes. Você confere o checklist no fim e libera o pagamento.",
      cta: "QUERO MINHA EQUIPE FIXA",
      ctaNote: "Orçamento em 5 min, sem visita chata",
    },
    ticker: [
      { v: "+850", l: "casas atendidas toda semana" },
      { v: "4,9★", l: "média de 600 avaliações" },
      { v: "0", l: "faltas sem aviso em 2 anos" },
    ],
    depoimentos: [
      { nome: "Renata Soares", cargo: "Cliente em Moema", txt: "A mesma dupla vem há 8 meses. Já conheço pelo nome, deixo a chave tranquila e a casa fica impecável até atrás do fogão." },
      { nome: "Carlos Menezes", cargo: "Dono de escritório", txt: "Antes eu vivia trocando de diarista. Agora recebo a foto de quem vai entrar e o checklist no fim. Acabou minha dor de cabeça." },
      { nome: "Juliana Prado", cargo: "Mãe e advogada", txt: "Sexta cheguei e a casa estava cheirosa, roupa dobrada, banheiro brilhando. Recuperei meu sábado com as crianças." },
    ],
    includes: [
      "Equipe fixa identificada, com foto e nome enviados antes de cada visita",
      "Checklist de 40 itens conferido no fim, do canto do box ao atrás do fogão",
      "Produtos e material inclusos, você não compra nada",
      "Reposição em 24h se algo passou batido",
    ],
    offer: {
      eyebrow: "O serviço",
      hPre: "Você ganha de volta ", hGrad: "o sábado e a tranquilidade", hPost: " de saber quem entra em casa",
      cdLab: "Vagas de equipe fixa nesta região acabam em", cdWhen: "Agenda da próxima semana", cdFoot: "Cada equipe atende um número limitado de casas por semana",
      guaranteeTitle: "Refez ou não paga", guaranteeText: "Achou um canto malfeito? Manda foto e a equipe volta em 24h sem custo. Se não resolver, você não paga aquela limpeza.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "O ponto que toda diarista esquece no banheiro e ninguém te conta" },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Um dia com a equipe: como a gente confere o checklist de 40 itens antes de sair" },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Antes e depois da cozinha da Renata, com o atrás do fogão que ninguém limpava" },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Como saber se a empresa de limpeza tem gente de confiança antes de abrir a porta" },
    ],
    tags: ["#limpeza", "#faxina", "#equipefixa", "#casalimpa", "#diarista", "#conservacao", "#limpezaresidencial", "#organizacao"],
  },
}
