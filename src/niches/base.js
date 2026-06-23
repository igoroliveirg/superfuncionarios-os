// ── BASE_PACK ────────────────────────────────────────────────────────
// Todo o conteúdo do demo (o "genérico" Super Funcionários), extraído dos
// componentes de employees.jsx. Os overrides de nicho (src/niches/*.js)
// sobrescrevem só os campos que mudam; o resto herda daqui.
// Tokens de cliente: {empresa} / {oferta} / {cor}. site chega por prop.

export const BASE_PACK = {
  // ── 01 · O Pesquisador ──────────────────────────────────────────
  pesquisa: {
    persona: {
      nome: 'Ricardo',
      idade: 43,
      contexto: 'Dono de empresa de serviço · São Paulo',
      fat: 'R$ 180 mil/mês',
      fatLabel: 'faturamento',
      time: '2 vendedores + 1 SDR',
      traits: [
        'Quer escalar sem virar refém da indicação',
        'Orgulho de "fazer acontecer", mas é o gargalo',
        'Teme ficar pra trás na corrida da IA',
        'Já queimou dinheiro em mentoria que sumiu',
      ],
      naoE: 'Iniciante sem faturamento, "começando do zero".',
    },
    dores: [
      'O time está ocupado, mas o resultado não cresce.',
      'Gasto o dobro em anúncio e vendo a metade.',
      'Pago R$ 800+ por cada "oportunidade" que não fecha.',
    ],
    medos: [
      'Basta parar de indicar e o funil seca.',
      'Mais uma mentoria que promete e some depois.',
      'Sem mim, nada anda na empresa.',
    ],
    desejos: [
      'Vendedor falando só com quem já decidiu comprar.',
      'Começar o mês sabendo quantas vendas vêm.',
      'Empresa que roda quando eu tiro férias.',
    ],
    objecoes: [
      { txt: '"Já tentei IA/chatbot e não funcionou."', pct: 41, fix: 'Mostrar o mecanismo dos 5 funcionários: é filtro, não chatbot.' },
      { txt: '"Mais uma mentoria que não entrega."', pct: 28, fix: 'Garantia + prova nominal, de empresário pra empresário.' },
      { txt: '"É caro."', pct: 19, fix: 'Reframe: não é "é caro?", é "qual o retorno?".' },
      { txt: '"Não tenho tempo pra isso."', pct: 12, fix: 'O ganho é tempo: tira o dono do operacional.' },
    ],
    schwartz: [
      'Inconsciente', 'Consciente do problema', 'Consciente da solução',
      'Consciente do produto', 'Totalmente consciente',
    ],
    nivelAtivo: 2,
    fontes: [
      { f: 'Comentários do YouTube', n: 4120 },
      { f: 'Comentários de anúncio (Meta/IG)', n: 3180 },
      { f: 'Grupos e comunidades', n: 2240 },
      { f: 'Reclame Aqui', n: 1490 },
      { f: 'Avaliações Google', n: 980 },
      { f: 'Fóruns e Reddit', n: 470 },
    ],
  },

  // ── 02 · O Redator que Filtra ───────────────────────────────────
  copywriter: {
    headlineBefore: 'Conheça nossa imersão de inteligência artificial para empresários.',
    headlineAfter: 'Monte 5 funcionários de IA que vendem por você, sem folha de pagamento.',
    lead: 'Sua empresa para de depender de gente cara e lenta. Em 30 dias você sobe um time de IA na sua própria assinatura que pesquisa, escreve, mede e posta, 24h, sem CLT.',
    bullets: [
      'Anúncio e página no ar em 24h, com a sua voz extraída do seu site.',
      'A IA filtra curioso e entrega só lead com dinheiro pro seu vendedor.',
      '2× vendas na mesma verba, porque ninguém mais queima orçamento no escuro.',
    ],
    cta: 'Quero meus 5 funcionários →',
    angles: [
      { tag: 'Medo', h: 'Seu concorrente já tem IA vendendo 24h. E você?', score: 71, note: 'volume alto, qualifica médio' },
      { tag: 'Desejo', h: 'Monte 5 funcionários de IA que vendem por você, sem folha.', score: 88, note: 'fala com quem quer escalar' },
      { tag: 'Prova', h: '2× vendas na mesma verba. Veja como a IA filtra quem tem dinheiro.', score: 94, note: 'menos lead, mais qualificado' },
    ],
    perguntas: [
      { q: 'Quanto você investe em anúncio por mês hoje?', barra: 'Barra quem não investe' },
      { q: 'Já tem time comercial ou vende sozinho?', barra: 'Separa estrutura de iniciante' },
      { q: 'Em quanto tempo quer implantar? (30 / 60 / 90 dias)', barra: 'Filtra quem não tem pressa' },
      { q: 'Qual o faturamento atual da empresa?', barra: 'Confirma poder de compra' },
    ],
    funil: [
      { l: 'Cliques no anúncio', v: 100, pct: 100 },
      { l: 'Preencheram o formulário', v: 24, pct: 24 },
      { l: 'Passaram no filtro', v: 11, pct: 11 },
      { l: 'Chegam prontos pro vendedor', v: 8, pct: 8 },
    ],
  },

  // ── 03 · O Analista ─────────────────────────────────────────────
  metricas: {
    FUNNEL: [
      { k: 'Impressões', v: 184200, pct: 100, sub: 'alcance pago + orgânico' },
      { k: 'Cliques', v: 9210, pct: 5.0, sub: 'CTR 5,0%' },
      { k: 'Leads', v: 645, pct: 7.0, sub: '7% do clique' },
      { k: 'Reuniões', v: 264, pct: 41, sub: '41% do lead' },
      { k: 'Vendas', v: 74, pct: 28, sub: '28% da reunião' },
    ],
    STAGE_COST: [
      { k: 'por clique', v: 'R$ 1,96' },
      { k: 'por lead', v: 'R$ 11,80' },
      { k: 'por reunião', v: 'R$ 92' },
      { k: 'por venda', v: 'R$ 684' },
    ],
    TREND: [3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 9],
    CHANNELS: [
      { name: 'Meta Ads', spend: 'R$ 9.400', sales: 41, cpv: 'R$ 612', roi: 2.4, share: 52, status: 'escala' },
      { name: 'Google Ads', spend: 'R$ 5.200', sales: 19, cpv: 'R$ 740', roi: 1.8, share: 29, status: 'ok' },
      { name: 'Orgânico (posts)', spend: 'R$ 0', sales: 14, cpv: 'R$ 0', roi: '∞', share: 19, status: 'escala' },
    ],
    CREATIVES: [
      { name: 'Sem folha de pagamento', cpl: 'R$ 9,40', cpr: 'R$ 71', cpv: 'R$ 612', share: 22, status: 'escala' },
      { name: 'Filtra o curioso', cpl: 'R$ 11,20', cpr: 'R$ 88', cpv: 'R$ 740', share: 26, status: 'ok' },
      { name: 'Depoimento de aluno', cpl: 'R$ 14,90', cpr: 'R$ 130', cpv: 'R$ 1.980', share: 21, status: 'cortar' },
      { name: 'Genérico "IA pra tudo"', cpl: 'R$ 18,30', cpr: 'R$ 210', cpv: '-', share: 17, status: 'cortar' },
    ],
    PAGE: { conv: 6.8, scroll: 71, time: '2m 41s', vsBench: '+2,3 pts' },
    PAGE_SECTIONS: [
      { k: 'Hero (promessa)', drop: 8, note: 'segura quase todo mundo' },
      { k: 'Mecanismo', drop: 19, note: 'maior queda, encurtar' },
      { k: 'Prova social', drop: 6, note: 'depoimentos seguram' },
      { k: 'Oferta + form', drop: 11, note: 'converte 6,8%' },
    ],
    CONTENT: [
      { name: 'Reels · não tira férias', reach: '38,2 mil', saves: 1840, leads: 31, status: 'escala' },
      { name: 'Carrossel · 5 tarefas', reach: '12,4 mil', saves: 920, leads: 12, status: 'ok' },
      { name: 'Reels · antes x depois', reach: '21,7 mil', saves: 1310, leads: 22, status: 'escala' },
      { name: 'Post · prova de vendas', reach: '4,1 mil', saves: 180, leads: 3, status: 'cortar' },
    ],
    FINAL: [
      { kind: 'cut', t: 'Corte o que sangra', d: 'Anúncio "Genérico IA" + post "prova de vendas": 0 venda, alcance morto. Some.' },
      { kind: 'scale', t: 'Escale o que prova', d: '"Sem folha" no Meta + Reels "não tira férias" puxam a venda mais barata da conta.' },
      { kind: 'fix', t: 'Conserte o meio da página', d: 'Bloco "Mecanismo" perde 19% do scroll. Encurtar sobe a conversão de 6,8% pra ~8%.' },
      { kind: 'scale', t: 'Orgânico é verba grátis', d: 'Reels geram 53 leads sem gasto. Mais 3 por semana no mesmo ângulo.' },
    ],
  },

  // ── 04 · O Construtor de Páginas ────────────────────────────────
  construtor: {
    blocos: [
      { n: 'Hero', d: 'badge + promessa + CTA' },
      { n: 'Prova rápida', d: 'números que sustentam' },
      { n: 'Mecanismo', d: 'os 5 funcionários no dia a dia' },
      { n: 'Depoimentos', d: 'quem já aplicou' },
      { n: 'Oferta', d: 'o que entra, data e lugar' },
      { n: 'Garantia', d: 'tira o risco da decisão' },
      { n: 'Formulário', d: 'aplicação que qualifica' },
    ],
    ticker: [
      { v: '+600', l: 'empresas atendidas' },
      { v: '+R$ 500mi', l: 'em vendas geradas' },
      { v: '+10 mil', l: 'contatos qualificados' },
    ],
    depoimentos: [
      { nome: 'Vinicius de Sá', cargo: 'Sócio · Full Sales System', txt: 'Mudou nosso comercial em 30 dias. Saímos do achismo pro processo.' },
      { nome: 'Arthur Padrão', cargo: '+950k/mês com agências', txt: 'O vendedor só fala com quem tem dinheiro. O filtro fez o trabalho.' },
      { nome: 'Rodrigo Noll', cargo: 'CEO · Base Viral', txt: 'Página no ar no mesmo dia. Primeira reunião em 48h.' },
    ],
    countdown: [
      { v: '06', l: 'dias' }, { v: '14', l: 'horas' },
      { v: '38', l: 'min' }, { v: '52', l: 'seg' },
    ],
    hero: {
      badge: ['Imersão presencial', '3 dias', 'São Paulo'],
      pre: 'Para empresários que faturam a partir de R$ 130 mil/mês',
      h1Typed: 'Crie 5 Super Funcionários de IA que entregam pro seu vendedor só contato pronto pra comprar',
      h1Pre: 'Crie ',
      h1Grad: '5 Super Funcionários de IA',
      h1Post: ' que entregam pro seu vendedor só contato pronto pra comprar',
      sub: 'Pare de queimar o tempo do seu vendedor. Com os 5 funcionários, 8 a cada 10 contatos chegam prontos para comprar.',
      cta: 'QUERO ME CANDIDATAR',
      ctaNote: '2 min · resposta em até 3h úteis',
    },
    includes: [
      'Os 5 Super Funcionários instalados e treinados',
      'Tudo conectado ao seu CRM, WhatsApp e agenda',
      'Filtro calibrado pro seu cliente certo',
      'Painel pra medir o que cada um economiza',
    ],
    offer: {
      eyebrow: 'A imersão',
      hPre: 'Você sai com os ',
      hGrad: '5 funcionários',
      hPost: ' rodando na empresa',
      cdLab: 'A imersão começa em',
      cdWhen: '30 jul · São Paulo',
      cdFoot: '3 dias presenciais · 30/07 a 01/08',
      guaranteeTitle: 'Garantia de aplicação',
      guaranteeText: 'Saiu sem os 5 rodando? A gente fica até rodar. Risco é nosso.',
    },
  },

  // ── 05 · O Criador de Conteúdo ──────────────────────────────────
  conteudo: {
    igUser: '{empresa}',
    pilares: [
      { nome: 'Autoridade', ic: '◆', share: 30, ex: 'Tese forte sobre IA no comercial: você fincando bandeira.' },
      { nome: 'Bastidor', ic: '◐', share: 25, ex: 'Como um funcionário de IA é montado por dentro, sem filtro.' },
      { nome: 'Prova', ic: '✓', share: 25, ex: 'Print de resultado, antes/depois, sem prometer, mostrando.' },
      { nome: 'Educação', ic: '✎', share: 20, ex: 'Passo a passo que o seguidor aplica hoje, de graça.' },
    ],
    ganchos: [
      { txt: '"Esse funcionário trabalha 24h e nunca pede aumento."', ret: 92, pilar: 'Autoridade', top: true },
      { txt: '"Parei de gravar conteúdo correndo. Olha como."', ret: 84, pilar: 'Bastidor' },
      { txt: '"Ninguém te conta isso sobre IA no comercial."', ret: 78, pilar: 'Educação' },
      { txt: '"3 erros que matam o seu Instagram de empresário."', ret: 71, pilar: 'Educação' },
    ],
    dias: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    posts: [
      { tipo: 'Reels', txt: 'O funcionário que não tira férias', hora: '09:00', pilar: 'Autoridade' },
      { tipo: 'Carrossel', txt: '5 tarefas que a IA já faz por você', hora: '12:30', pilar: 'Educação' },
      { tipo: 'Story', txt: 'Bastidor: montando um agente ao vivo', hora: '18:00', pilar: 'Bastidor' },
      { tipo: 'Reels', txt: 'Um dia na rotina de quem usa IA', hora: '09:00', pilar: 'Bastidor' },
      { tipo: 'Post', txt: 'Print do antes e depois do perfil', hora: '12:00', pilar: 'Prova' },
      { tipo: 'Reels', txt: 'A pergunta que todo empresário faz', hora: '17:30', pilar: 'Educação' },
      { tipo: 'Carrossel', txt: 'O que eu aprendi montando 5 agentes', hora: '11:00', pilar: 'Autoridade' },
    ],
    legenda:
      'O funcionário que não tira férias, não pede aumento e ainda aprende o seu negócio sozinho.\n\n' +
      'Nesse vídeo eu te mostro por dentro como ele funciona, sem termo difícil, do jeito que dá pra entender ' +
      'tomando um café.\n\n' +
      'Salva esse post pra não esquecer e me conta nos comentários: qual tarefa do seu dia você passaria pra ele primeiro? 👇',
    tags: ['#inteligenciaartificial', '#empresario', '#produtividade', '#iaparaempresas',
      '#automacao', '#superfuncionarios', '#conteudo', '#bastidores'],
    reels: [
      { t: '0-3s', label: 'Gancho', txt: '"Esse funcionário trabalha 24h e nunca pede aumento." (olho na câmera)' },
      { t: '3-8s', label: 'Contexto', txt: 'Mostra a rotina travada: tarefas repetitivas comendo o seu dia.' },
      { t: '8-18s', label: 'Mostra', txt: 'Corta pra tela: o agente fazendo a tarefa sozinho, passo a passo.' },
      { t: '18-25s', label: 'Insight', txt: '"Não é mágica, é processo. E dá pra montar no seu negócio."' },
      { t: '25-30s', label: 'Convite', txt: 'Olha pra câmera: "Salva esse vídeo e me conta nos comentários."' },
    ],
  },

  // ── Roteiros de conversa (greeting + turns por agente) ──────────
  scripts: {
    pesquisa: {
      greeting:
        'Antes de escrever uma linha de anúncio, eu leio o seu mercado. Li 12.480 comentários, vídeos e avaliações de empresários como o seu cliente. O que você quer ver primeiro?',
      turns: [
        { chip: 'Mostrar o que você analisou', reply: 'Varri 6 fontes: YouTube, comentários de anúncio no Meta/Instagram, Reclame Aqui, grupos e comunidades, avaliações Google e fóruns. 12.480 trechos no total, sem repetição, marcados por idioma e confiança. Três semanas de pesquisa numa manhã.' },
        { chip: 'Desenhar o cliente ideal', reply: 'O seu comprador tem nome: Ricardo, 43, fatura R$ 180 mil/mês, tem 2 vendedores e é o gargalo do próprio negócio. Não é iniciante curioso, é dono cansado de pagar caro por lead lixo.' },
        { chip: 'Trazer dores, medos e desejos', reply: 'Tudo na fala dele, não na minha. "O time está ocupado mas não cresce." "Antes o telefone tocava, agora gasto o dobro e vendo a metade." É daqui que o Copywriter tira a primeira linha do anúncio.' },
        { chip: 'Priorizar as objeções', reply: 'Ranqueei o que trava a venda, da mais comum pra menos. "Já tentei IA e não funcionou" lidera 41%. Pra cada uma já deixei o contra-argumento pronto pro Redator usar.' },
        { chip: 'Medir o nível de consciência', reply: 'Ele está no nível 3 de Schwartz: sabe que "IA pra negócio" existe, não sabe qual mecanismo resolve. Mercado saturado (sofisticação 3-4): promessa genérica morre, mecanismo único vende. Persona, dores, objeções e nível: entrego tudo pronto pro Copywriter virar anúncio.' },
      ],
    },
    copywriter: {
      greeting:
        'Sou o redator. Pego seu site e devolvo o anúncio que filtra: copy, variações por ângulo e o formulário que barra curioso. Por onde começo?',
      turns: [
        { chip: 'Reescrever meu anúncio', reply: 'Pronto. Reescrevi seu anúncio inteiro a partir do site, headline, abertura, três bullets e o botão, do jeito que o cliente lê antes de decidir se clica ou rola pra baixo. Olha à esquerda.' },
        { chip: 'Criar variações por ângulo', reply: 'Gerei três versões. Cada uma ataca por um ângulo diferente, medo, desejo e prova, porque o empresário que tem medo de ficar pra trás não compra pelo mesmo motivo do que já viu o concorrente faturar. Falam com cabeças diferentes.' },
        { chip: 'Montar o formulário que filtra', reply: 'Escrevi quatro perguntas pro formulário, e a ordem importa: quanto investe, se já tem time comercial, prazo pra implantar e faturamento. Curioso trava na segunda. Quem tem dinheiro e pressa responde até o fim.' },
        { chip: 'Por que filtrar é melhor', reply: 'Olha o funil. De cada cem cliques, o anúncio que filtra traz menos lead. Mas oito de cada dez que chegam já têm verba, e é isso que tira seu vendedor de cima do curioso e bota ele só em reunião que fecha.' },
      ],
    },
    metricas: {
      greeting:
        'Sou o último da fila. Pra te mostrar os números reais (anúncio, canal, página e conteúdo no mesmo painel), primeiro ligo nas suas fontes. Por onde a gente começa?',
      turns: [
        {
          chip: 'Mostrar meus custos reais',
          connect: {
            prompt: 'Pra puxar os números reais, primeiro ligo nas suas fontes:',
            items: [
              { id: 'meta', label: 'Meta Ads', mono: 'M', color: '#1877f2' },
              { id: 'ga', label: 'Google Analytics', mono: 'GA', color: '#e8710a' },
              {
                id: 'crm', label: 'CRM (origem dos leads)', options: [
                  { id: 'rd', label: 'RD Station', mono: 'RD', color: '#19b9c9' },
                  { id: 'hub', label: 'HubSpot', mono: 'H', color: '#ff7a59' },
                  { id: 'pipe', label: 'Pipedrive', mono: 'P', color: '#1a7a3c' },
                  { id: 'sheets', label: 'Google Sheets', mono: 'GS', color: '#0f9d58' },
                ],
              },
            ],
          },
          reply: 'Hoje o lead te custa R$ 11,80, a reunião R$ 92 e a venda fechada R$ 684. Com a mesma verba dá pra dobrar as vendas. Já te mostro onde.',
        },
        { chip: 'Abrir o funil etapa por etapa', reply: 'De 100% de cliques, 7% viram lead, 41% viram reunião e 28% fecham. O furo tá entre clique e lead: gente boa entra e cai antes do formulário.' },
        { chip: 'Ver a tendência dos últimos 14 dias', reply: 'A linha de vendas sobe desde que o filtro de lead entrou: de 3 pra 9 vendas/dia. O custo por venda caiu junto. Não é sorte, é o funil afinando.' },
        { chip: 'Comparar canal por canal', reply: 'Três canais no ar. O Meta puxa metade das vendas a R$ 612. O Google segura, mais caro. E o orgânico fecha 14 vendas sem gastar um real. Esse é o achado.' },
        { chip: 'Comparar anúncio por anúncio', reply: 'Quatro anúncios rodando. Dois trazem venda barata, um tá no talo e um só queima verba. Olha a coluna de custo por venda que fica óbvio.' },
        { chip: 'Como a página está convertendo', reply: 'A página que o Construtor subiu converte 6,8%, acima da média do mercado. Mas o bloco "Mecanismo" perde 19% do scroll. Encurta ali e a conversão passa de 8%.' },
        { chip: 'Quais conteúdos viram lead', reply: 'Os Reels carregam: "não tira férias" e "antes x depois" geram 53 leads sem mídia paga. O post de prova morreu: alcance baixo, zero lead. Esse a gente troca.' },
        { chip: 'Projetar a nova divisão de verba', reply: 'Mesma verba de R$ 18 mil: a projeção sai de 26 pra 41 vendas no mês, CAC de R$ 684 pra R$ 439. É 1,9× de retorno sem gastar um real a mais.' },
        { chip: 'Me dá o veredito final', reply: 'Corta o "Genérico IA" e o post morto. Escala "Sem folha" no Meta e os Reels que provam. Conserta o meio da página. Os 5 funcionários fecharam o ciclo, da pesquisa a este painel. A máquina mede sozinha agora; daqui é só escalar o que dá lucro.' },
      ],
    },
    construtor: {
      greeting:
        'Eu monto sua página de vendas inteira a partir do que o seu site já diz: estrutura, texto, prova, oferta e publicação. Por onde começamos?',
      turns: [
        { chip: 'Montar a estrutura', reply: 'Fechei a espinha da página em 7 blocos, na ordem que faz o empresário rolar até o botão: promessa no topo, prova e mecanismo no meio, oferta e formulário no fim. Olha a lista montando à esquerda.' },
        { chip: 'Escrever o hero', reply: 'Hero pronto, puxando a promessa do seu site: badge da imersão, headline que para o scroll, subtítulo e o botão de candidatura. A página já começa a ganhar cara de verdade à direita.' },
        { chip: 'Puxar a prova social', reply: 'Coloquei os números que sustentam a oferta e três depoimentos de quem aplicou. Prova é o que tira o "será que funciona pra mim?" da cabeça do lead antes dele ver o preço.' },
        { chip: 'Montar a oferta', reply: 'Oferta fechada: o que ele monta na imersão, a contagem regressiva com data e lugar, e a garantia logo abaixo. É aqui que a decisão acontece, então o risco fica do nosso lado.' },
        { chip: 'Ver no celular', reply: 'Mesma página, layout de celular. 7 em cada 10 leads chegam pelo Instagram, então a versão mobile é a que mais vende. Toca pra alternar entre desktop e celular.' },
        {
          chip: 'Publicar agora',
          connect: {
            prompt: 'Pra publicar de verdade, preciso ligar duas coisas no seu funil:',
            items: [
              { id: 'dominio', label: 'domínio / hospedagem', mono: '🌐', color: '#3a3c46' },
              {
                id: 'crm', label: 'CRM (pros leads do formulário)', options: [
                  { id: 'rd', label: 'RD Station', mono: 'RD', color: '#19b9c9' },
                  { id: 'hub', label: 'HubSpot', mono: 'H', color: '#ff7a59' },
                  { id: 'pipe', label: 'Pipedrive', mono: 'P', color: '#1a7a3c' },
                  { id: 'sheets', label: 'Google Sheets', mono: 'GS', color: '#0f9d58' },
                ],
              },
            ],
          },
          reply: 'Página no ar, domínio ligado, pixel e formulário plugados no seu funil. Levou uma conversa, não seis semanas de agência.',
        },
      ],
    },
    conteudo: {
      greeting:
        'Eu não escrevo anúncio. Disso cuida o Copywriter. Eu faço o conteúdo orgânico que aquece o seu público antes de ele ver qualquer oferta: Reels, carrossel, story. Por onde começo?',
      turns: [
        { chip: 'Definir os pilares de conteúdo', reply: 'Antes de postar, defino os 4 pilares que sustentam o seu perfil: Autoridade, Bastidor, Prova e Educação. Todo post nasce de um deles, assim você ensina e mostra os bastidores sem parecer que está vendendo o tempo todo.' },
        { chip: 'Abrir o banco de ganchos', reply: 'Os 3 primeiros segundos decidem se o Reels segura ou perde o seguidor. Montei um banco de ganchos puxados da fala do seu público, ordenados pela retenção que costumam segurar. São a primeira linha de cada vídeo.' },
        {
          chip: 'Montar o calendário da semana',
          connect: {
            prompt: 'Pra achar o melhor horário e já deixar agendado, conecta suas redes:',
            items: [
              { id: 'ig', label: 'Instagram', mono: 'IG', color: '#d6249f' },
              { id: 'fb', label: 'Facebook', mono: 'f', color: '#1877f2' },
            ],
          },
          reply: 'Distribuí os pilares na semana: cada dia tem formato, tema e o melhor horário pra esse público: não é chute, é quando o seu seguidor está online. Frequência que nutre sem cansar. Olha o calendário do lado.',
        },
        { chip: 'Escrever o roteiro do Reels', reply: 'Pro Reels de segunda eu escrevo o roteiro cena a cena: o gancho nos 3 primeiros segundos, o que falar em cada corte e como fechar convidando pra salvar e comentar, interação orgânica, nada de "compre agora". Você só aponta a câmera e lê.' },
        { chip: 'Ver o post no feed', reply: 'Esse é o post orgânico já dentro do feed, do jeitinho que vai aparecer, post de perfil, não anúncio. Legenda com o gancho na primeira linha, contexto, e o convite pra salvar e comentar. Veja no celular ou no desktop.' },
        { chip: 'Fechar o plano do mês', reply: 'Pronto: o mês inteiro montado em cima dos 4 pilares, com ganchos e horários. Conteúdo que atrai e nutre todo dia, no piloto automático. Quando esse público estiver aquecido, é o anúncio do Copywriter que colhe. Seu time de 5 funcionários está completo.' },
      ],
    },
  },
}
