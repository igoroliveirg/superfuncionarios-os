// Energia solar.
// Persona = Rogério, Casa própria, conta de luz passou de R$ 600 e não para de subir.
export const ENERGIASOLAR = {
  label: "Energia solar",
  accentDefault: "#f59e0b",
  pesquisa: {
    persona: {
      nome: "Rogério", idade: 44,
      contexto: "Casa própria, conta de luz passou de R$ 600 e não para de subir",
      fat: "R$ 6 a 12 mil", fatLabel: "renda familiar",
      time: "pesquisa por semanas, pede 3 ou 4 orçamentos",
      traits: [
        "Faz conta antes de assinar qualquer coisa",
        "Já viu instalador sumir depois do PIX",
        "Quer ver o nome da empresa e obra pronta perto de casa",
        "Desconfia de promessa de economia sem número",
      ],
      naoE: "Quem só quer saber o preço por curiosidade e não tem telhado nem conta no próprio nome.",
    },
    dores: [
      "Pago mais de R$ 600 de luz e a bandeira vermelha aperta ainda mais.",
      "Tenho medo de pagar a instalação e o cara sumir na primeira pane.",
      "Cada empresa me dá um número diferente e não sei em quem confiar.",
    ],
    desejos: [
      "Ver a conta cair já no primeiro mês depois de ligar.",
      "Saber a data exata em que o sistema se paga.",
      "Ter quem atenda quando der problema, não só na venda.",
    ],
  },
  copywriter: {
    headlineAfter: "Corte até 90% da conta de luz com a {empresa}: instalação em 5 dias e economia na primeira fatura.",
    angles: [
      { tag: 'Medo', h: "Mais um verão pagando R$ 600 de luz pra distribuidora?", score: 74, note: "dor da conta que só sobe" },
      { tag: 'Desejo', h: "Conta de luz 90% menor já no primeiro mês de ligado.", score: 85, note: "desejo de economia imediata" },
      { tag: 'Prova', h: "412 telhados instalados pela {empresa}, com 25 anos de garantia no painel.", score: 93, note: "prova de obra feita e suporte" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Visita técnica grátis", "Garantia de 25 anos"],
      pre: "Para quem cansou da conta de luz alta e desconfia de promessa vazia",
      h1Typed: "Corte até 90% da conta de luz com a {empresa}: instalação em 5 dias e economia na primeira fatura.",
      h1Pre: "Corte até 90% da conta de luz com a ",
      h1Grad: '{empresa}',
      h1Post: ": instalação em 5 dias e economia na primeira fatura.",
      sub: "A gente sobe no seu telhado, mede o consumo da sua conta e mostra a data exata em que o sistema se paga. Você acompanha cada etapa e tem suporte por 25 anos.",
      cta: "QUERO MINHA SIMULAÇÃO",
      ctaNote: "Visita e orçamento grátis em 48h",
    },
    ticker: [
      { v: "-90%", l: "na conta de luz" },
      { v: "412", l: "telhados instalados" },
      { v: "5 dias", l: "da assinatura à ligação" },
    ],
    depoimentos: [
      { nome: "Cláudia Menezes", cargo: "moradora, Campinas", txt: "Minha conta era R$ 740 e caiu pra R$ 92 no primeiro mês. Pagaram o que prometeram." },
      { nome: "Wanderson Lima", cargo: "dono de oficina", txt: "Instalaram em 4 dias e voltaram quando um inversor deu erro. Resolveram no mesmo dia." },
      { nome: "Patrícia Goulart", cargo: "moradora, Sorocaba", txt: "Me mostraram quanto eu pagaria em 5 anos antes de fechar. Bateu certinho." },
    ],
    includes: [
      "Visita técnica no seu telhado e projeto com economia em número",
      "Painéis e inversor com garantia de 25 anos por escrito",
      "Homologação na distribuidora, da papelada à troca do medidor",
      "Monitoramento do sistema pelo app e suporte por telefone",
    ],
    offer: {
      eyebrow: "Como funciona",
      hPre: "Você sai com ", hGrad: "a conta 90% menor e a data do retorno", hPost: " na mão",
      cdLab: "As condições deste mês acabam em", cdWhen: "Agendas de instalação desta semana", cdFoot: "Preço do painel e prazo podem mudar com o dólar",
      guaranteeTitle: "O mesmo time que vende é quem volta na pane", guaranteeText: "Se um painel ou inversor falhar dentro da garantia, a gente troca sem custo. Mesmo time, mesmo telefone, do primeiro dia ao último.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Quanto custa de verdade ligar o ar-condicionado o verão todo na bandeira vermelha." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Um dia de instalação no telhado de um cliente, do andaime à energia ligada." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Conta antes e depois: de R$ 740 para R$ 92 no telhado da Cláudia." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Como ler sua conta de luz e descobrir se o solar vale pra você." },
    ],
    tags: ["#energiasolar", "#contadeluz", "#economiadeenergia", "#paineissolares", "#energialimpa", "#fotovoltaica", "#solarbrasil", "#economianaconta"],
  },
}
