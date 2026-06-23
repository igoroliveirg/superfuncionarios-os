// Agronegócio.
// Persona = Edson, Toca 800 hectares de soja e milho, segunda safra apertada depois de um ano de seca.
export const AGRO = {
  label: "Agronegócio",
  accentDefault: "#4d7c0f",
  pesquisa: {
    persona: {
      nome: "Edson", idade: 47,
      contexto: "Toca 800 hectares de soja e milho, segunda safra apertada depois de um ano de seca",
      fat: "R$ 3 a 8 milhões por safra", fatLabel: "faturamento da lavoura",
      time: "decide antes do plantio, pesquisa preço com 3 ou 4 revendas",
      traits: [
        "Quer mais saca por hectare sem virar cobaia de produto novo",
        "Já levou prejuízo com insumo que rendeu menos do que prometeram",
        "Confia mais em vizinho e agrônomo de campo do que em folder",
        "Quer agrônomo que pise na lavoura e fique até a colheita",
      ],
      naoE: "Curioso de feira agro que pede cotação de tudo, pechincha e nunca planta.",
    },
    dores: [
      "Comprei insumo barato e perdi sacas na hora da colheita.",
      "Vendedor sumiu depois da nota, fiquei sozinho com a praga no talhão.",
      "Aposto a safra inteira e fico no escuro até a hora de colher.",
    ],
    desejos: [
      "Tirar mais saca por hectare sem aumentar o risco da safra.",
      "Ter um agrônomo no talhão quando a praga aparecer.",
      "Saber o que plantar e quando aplicar, com base no meu solo.",
    ],
  },
  copywriter: {
    headlineAfter: "Mais saca por hectare com a {empresa}: insumo certo pro seu solo e agrônomo no talhão a safra inteira.",
    angles: [
      { tag: 'Medo', h: "Outra safra apostada no escuro, esperando a colheita pra saber se deu certo?", score: 74, note: "dor de arriscar tudo sem suporte" },
      { tag: 'Desejo', h: "Quer fechar a safra com 6 a 10 sacas a mais por hectare?", score: 84, note: "desejo de ganho concreto por hectare" },
      { tag: 'Prova', h: "412 produtores subiram a produtividade com a {empresa} na última safra.", score: 92, note: "prova social com número e resultado" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Agrônomo no campo", "Análise de solo grátis"],
      pre: "Para o produtor que mede o ano em saca por hectare",
      h1Typed: "Mais saca por hectare com a {empresa}: insumo certo pro seu solo e agrônomo no talhão a safra inteira.",
      h1Pre: "Mais saca por hectare com a ",
      h1Grad: '{empresa}',
      h1Post: ": insumo certo pro seu solo e agrônomo no talhão a safra inteira.",
      sub: "A gente analisa seu solo, monta o pacote de insumo pro seu talhão e o agrônomo acompanha do plantio à colheita. Praga apareceu, ele vai na lavoura.",
      cta: "QUERO MAIS PRODUTIVIDADE",
      ctaNote: "Análise de solo grátis na primeira visita",
    },
    ticker: [
      { v: "+412", l: "produtores na safra" },
      { v: "+8 sc/ha", l: "ganho médio por hectare" },
      { v: "24h", l: "agrônomo no talhão" },
    ],
    depoimentos: [
      { nome: "Valdir Scheffer", cargo: "produtor de soja, 1.200 ha", txt: "Subi de 58 pra 67 sacas por hectare na soja. O agrônomo deles pegou a ferrugem cedo, antes de virar prejuízo." },
      { nome: "Cleusa Andrade", cargo: "produtora de milho, 600 ha", txt: "Trocaram meu pacote depois da análise de solo. Gastei parecido e colhi 11 sacas a mais no milho." },
      { nome: "Reinaldo Bortolin", cargo: "produtor de soja e milho, 2.000 ha", txt: "Terceira safra com eles. Ligo e o agrônomo aparece no talhão no mesmo dia, não some depois da venda." },
    ],
    includes: [
      "Análise de solo do seu talhão antes de fechar o pacote",
      "Insumo selecionado pro seu solo e pra sua cultura",
      "Agrônomo na lavoura do plantio à colheita",
      "Visita em 24h quando aparecer praga ou doença",
    ],
    offer: {
      eyebrow: "A parceria",
      hPre: "Você colhe ", hGrad: "mais saca por hectare", hPost: " com agrônomo do seu lado a safra toda",
      cdLab: "A tabela de pré-safra fecha em", cdWhen: "Pedidos pra plantio desta janela", cdFoot: "Preço e estoque de insumo podem mudar com o dólar",
      guaranteeTitle: "Acompanhamento até a colheita", guaranteeText: "O agrônomo fica com você do plantio à colheita. Praga ou doença no talhão, ele vai no campo em 24h.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Leitura de safra: a hora certa de plantar pra fugir do veranico." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Um dia com nosso agrônomo: o que ele olha no seu talhão antes de indicar insumo." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Antes e depois: o talhão que saiu de 58 pra 67 sacas por hectare." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Como ler a análise de solo e parar de comprar insumo errado." },
    ],
    tags: ["#agronegocio", "#produtividade", "#soja", "#milho", "#safra", "#agronomia", "#manejodesolo", "#produtorrural"],
  },
}
