// Petshop / veterinária.
// Persona = Camila, Mora sozinha com dois cachorros, trata os dois como filhos.
export const PETSHOP = {
  label: "Petshop / veterinária",
  accentDefault: "#ea580c",
  pesquisa: {
    persona: {
      nome: "Camila", idade: 34,
      contexto: "Mora sozinha com dois cachorros, trata os dois como filhos",
      fat: "R$ 5 a 9 mil", fatLabel: "renda",
      time: "pesquisa avaliação, pede indicação, desconfia de preço baixo demais",
      traits: [
        "Lê review de banho e tosa antes de marcar",
        "Já tirou um pet de petshop que machucou",
        "Quer saber o nome de quem cuida do bicho",
        "Topa pagar mais por câmera e foto durante o serviço",
      ],
      naoE: "Tutor que escolhe pelo mais barato e some se subir R$ 5 no banho.",
    },
    dores: [
      "Saí do último petshop com meu cachorro tremendo e uma orelha cortada.",
      "O veterinário empurrou três exames e nunca me explicou pra quê.",
      "Deixo meu pet e fico o dia inteiro sem saber se ele tá bem.",
    ],
    desejos: [
      "Deixar meu cão no banho e receber foto dele tranquilo.",
      "Ouvir do vet só o exame que ele de fato precisa.",
      "Conhecer pelo nome quem põe a mão no meu bicho.",
    ],
  },
  copywriter: {
    headlineAfter: "Na {empresa} seu pet sai do banho calmo e cheiroso, com foto do começo ao fim e o nome de quem cuidou.",
    angles: [
      { tag: 'Medo', h: "Você sabe quem segura seu cachorro no banho enquanto você trabalha?", score: 74, note: "medo de maus tratos sem testemunha" },
      { tag: 'Desejo', h: "Receba foto do seu pet calmo no meio do banho, sem precisar ligar pra perguntar.", score: 84, note: "desejo de acompanhar e ficar tranquilo" },
      { tag: 'Prova', h: "1.400 tutores acompanham o banho por foto na {empresa} e voltam todo mês.", score: 92, note: "prova de recorrência e transparência" },
    ],
  },
  construtor: {
    hero: {
      showAvatars: false,
      badge: ["Foto durante o serviço", "Tosa sem sedação"],
      pre: "Para quem trata o pet como família e quer saber quem cuida dele",
      h1Typed: "Na {empresa} seu pet sai do banho calmo, com foto do começo ao fim.",
      h1Pre: "Na ",
      h1Grad: '{empresa}',
      h1Post: " seu pet sai do banho calmo, com foto do começo ao fim.",
      sub: "A mesma profissional cuida do seu cão do banho à secagem e te manda foto no meio do serviço. No vet, você ouve só o exame que o bicho precisa, com o porquê na sua frente.",
      cta: "QUERO AGENDAR O BANHO",
      ctaNote: "Resposta no WhatsApp em até 15 min",
    },
    ticker: [
      { v: "+1.400", l: "pets cuidados por mês" },
      { v: "4,9★", l: "média em 600 avaliações" },
      { v: "0", l: "sedação na tosa" },
    ],
    depoimentos: [
      { nome: "Renata Lopes", cargo: "tutora da Mel, poodle", txt: "Recebi a foto da Mel no banho às 10h, tranquila no colo da banhista. Nunca mais saí do dia com aquela aflição." },
      { nome: "Diego Martins", cargo: "tutor do Thor, golden", txt: "O vet olhou o Thor e pediu um exame só, não os três que outro lugar tinha mandado. Me explicou cada coisa." },
      { nome: "Patrícia Souza", cargo: "tutora de dois gatos", txt: "Meus gatos odeiam tosa e saíram sem um arranhão, sem sedativo. A mesma moça cuida deles toda vez, eles já conhecem." },
    ],
    includes: [
      "A mesma profissional do banho à secagem, com nome anotado na ficha",
      "Foto do seu pet durante o serviço, enviada no WhatsApp",
      "Tosa sem sedação, com pausa se o bicho estressar",
      "Avaliação do vet com o porquê de cada exame antes de cobrar",
    ],
    offer: {
      eyebrow: "O cuidado",
      hPre: "Você deixa seu pet e recebe ", hGrad: "foto, nome e o porquê de cada coisa", hPost: " antes de qualquer cobrança",
      cdLab: "As vagas de banho desta semana fecham em", cdWhen: "Horários de sábado", cdFoot: "A agenda de fim de semana lota antes",
      guaranteeTitle: "Pet voltou estressado, banho por nossa conta", guaranteeText: "Se seu cão ou gato voltar machucado ou nervoso por algo que a gente fez, o próximo banho é grátis e a gente te liga pra entender.",
    },
  },
  conteudo: {
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: "Os 4 sinais de que seu pet sofreu no último banho e o que olhar antes de marcar." },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: "Um dia da banhista: como a gente segura um cão medroso sem prender nem gritar." },
      { nome: 'Prova', ic: '✓', share: 25, ex: "Antes e depois do Thor: tosa sem sedação em 50 min, foto a foto." },
      { nome: 'Educação', ic: '✎', share: 20, ex: "Quando exame de sangue no pet é necessário e quando é só empurrar conta." },
    ],
    tags: ["#petshop", "#banhoetosa", "#veterinaria", "#cuidadocompet", "#tosasemsedacao", "#petfamilia", "#caoegato", "#tutorresponsavel"],
  },
}
