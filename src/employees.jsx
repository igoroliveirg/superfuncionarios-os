import React from 'react'
import { Typewriter, CountUp, Section, fmt } from './chat.jsx'

// ── Metadados dos 5 super funcionários ───────────────────────────────
// color = neon de assinatura (glows, dots, bordas) · ink = variante escura
// AA pra texto/preenchimento sobre branco · glow = sombra colorida
export const EMPLOYEES = [
  {
    id: 'pesquisa',
    name: 'O Pesquisador',
    role: 'Pesquisa de mercado',
    code: 'AG.PESQUISA',
    img: '/agentes/pesquisa.png',
    color: '#ff4f9a', ink: '#c11d68', glow: 'rgba(255,79,154,.55)',
    win: { w: 760, h: 540, x: 150, y: 90 },
  },
  {
    id: 'copywriter',
    name: 'O Copywriter',
    role: 'Copy de anúncio e formulário que filtra',
    code: 'AG.COPY',
    img: '/agentes/copywriter.png',
    color: '#9b6bff', ink: '#6a3fd0', glow: 'rgba(155,107,255,.55)',
    win: { w: 780, h: 560, x: 220, y: 120 },
  },
  {
    id: 'construtor',
    name: 'O Construtor de Páginas',
    role: 'Página de vendas no ar em 24h',
    code: 'AG.PAGINA',
    img: '/agentes/construtor.png',
    color: '#ff8a3c', ink: '#a8500e', glow: 'rgba(255,138,60,.55)',
    win: { w: 860, h: 580, x: 130, y: 70 },
  },
  {
    id: 'conteudo',
    name: 'O Criador de Conteúdo',
    role: 'Conteúdo orgânico que atrai e nutre, sem anúncio',
    code: 'AG.CONTEUDO',
    img: '/agentes/conteudo.png',
    color: '#2fd49a', ink: '#0a7a52', glow: 'rgba(47,212,154,.55)',
    win: { w: 820, h: 560, x: 200, y: 100 },
  },
  {
    id: 'metricas',
    name: 'O Analista',
    role: 'Analisa canais, anúncios, páginas e conteúdos',
    code: 'AG.NUMEROS',
    img: '/agentes/metricas.png',
    color: '#33b9ff', ink: '#0d72b4', glow: 'rgba(51,185,255,.55)',
    win: { w: 820, h: 560, x: 180, y: 80 },
  },
]

// ── SCRIPTS · roteiro de conversa de cada funcionário ────────────────
// contrato: { greeting, turns:[{chip,reply}] } (5+ turns cada)
// a seção da turn i do output aparece quando step > i.
export const SCRIPTS = {
  pesquisa: {
    greeting:
      'Antes de escrever uma linha de anúncio, eu leio o seu mercado. Li 12.480 comentários, vídeos e avaliações de empresários como o seu cliente. O que você quer ver primeiro?',
    turns: [
      {
        chip: 'Mostrar o que você analisou',
        reply:
          'Varri 6 fontes: YouTube, comentários de anúncio no Meta/Instagram, Reclame Aqui, grupos e comunidades, avaliações Google e fóruns. 12.480 trechos no total, sem repetição, marcados por idioma e confiança. Três semanas de pesquisa numa manhã.',
      },
      {
        chip: 'Desenhar o cliente ideal',
        reply:
          'O seu comprador tem nome: Ricardo, 43, fatura R$ 180 mil/mês, tem 2 vendedores e é o gargalo do próprio negócio. Não é iniciante curioso, é dono cansado de pagar caro por lead lixo.',
      },
      {
        chip: 'Trazer dores, medos e desejos',
        reply:
          'Tudo na fala dele, não na minha. "O time está ocupado mas não cresce." "Antes o telefone tocava, agora gasto o dobro e vendo a metade." É daqui que o Copywriter tira a primeira linha do anúncio.',
      },
      {
        chip: 'Priorizar as objeções',
        reply:
          'Ranqueei o que trava a venda, da mais comum pra menos. "Já tentei IA e não funcionou" lidera 41%. Pra cada uma já deixei o contra-argumento pronto pro Redator usar.',
      },
      {
        chip: 'Medir o nível de consciência',
        reply:
          'Ele está no nível 3 de Schwartz: sabe que "IA pra negócio" existe, não sabe qual mecanismo resolve. Mercado saturado (sofisticação 3-4): promessa genérica morre, mecanismo único vende. Persona, dores, objeções e nível: entrego tudo pronto pro Copywriter virar anúncio.',
      },
    ],
  },

  copywriter: {
    greeting:
      'Sou o redator. Pego seu site e devolvo o anúncio que filtra: copy, variações por ângulo e o formulário que barra curioso. Por onde começo?',
    turns: [
      {
        chip: 'Reescrever meu anúncio',
        reply:
          'Pronto. Reescrevi seu anúncio inteiro a partir do site, headline, abertura, três bullets e o botão, do jeito que o cliente lê antes de decidir se clica ou rola pra baixo. Olha à esquerda.',
      },
      {
        chip: 'Criar variações por ângulo',
        reply:
          'Gerei três versões. Cada uma ataca por um ângulo diferente, medo, desejo e prova, porque o empresário que tem medo de ficar pra trás não compra pelo mesmo motivo do que já viu o concorrente faturar. Falam com cabeças diferentes.',
      },
      {
        chip: 'Montar o formulário que filtra',
        reply:
          'Escrevi quatro perguntas pro formulário, e a ordem importa: quanto investe, se já tem time comercial, prazo pra implantar e faturamento. Curioso trava na segunda. Quem tem dinheiro e pressa responde até o fim.',
      },
      {
        chip: 'Por que filtrar é melhor',
        reply:
          'Olha o funil. De cada cem cliques, o anúncio que filtra traz menos lead. Mas oito de cada dez que chegam já têm verba, e é isso que tira seu vendedor de cima do curioso e bota ele só em reunião que fecha.',
      },
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
        reply:
          'Hoje o lead te custa R$ 11,80, a reunião R$ 92 e a venda fechada R$ 684. Com a mesma verba dá pra dobrar as vendas. Já te mostro onde.',
      },
      {
        chip: 'Abrir o funil etapa por etapa',
        reply:
          'De 100% de cliques, 7% viram lead, 41% viram reunião e 28% fecham. O furo tá entre clique e lead: gente boa entra e cai antes do formulário.',
      },
      {
        chip: 'Ver a tendência dos últimos 14 dias',
        reply:
          'A linha de vendas sobe desde que o filtro de lead entrou: de 3 pra 9 vendas/dia. O custo por venda caiu junto. Não é sorte, é o funil afinando.',
      },
      {
        chip: 'Comparar canal por canal',
        reply:
          'Três canais no ar. O Meta puxa metade das vendas a R$ 612. O Google segura, mais caro. E o orgânico fecha 14 vendas sem gastar um real. Esse é o achado.',
      },
      {
        chip: 'Comparar anúncio por anúncio',
        reply:
          'Quatro anúncios rodando. Dois trazem venda barata, um tá no talo e um só queima verba. Olha a coluna de custo por venda que fica óbvio.',
      },
      {
        chip: 'Como a página está convertendo',
        reply:
          'A página que o Construtor subiu converte 6,8%, acima da média do mercado. Mas o bloco "Mecanismo" perde 19% do scroll. Encurta ali e a conversão passa de 8%.',
      },
      {
        chip: 'Quais conteúdos viram lead',
        reply:
          'Os Reels carregam: "não tira férias" e "antes x depois" geram 53 leads sem mídia paga. O post de prova morreu: alcance baixo, zero lead. Esse a gente troca.',
      },
      {
        chip: 'Projetar a nova divisão de verba',
        reply:
          'Mesma verba de R$ 18 mil: a projeção sai de 26 pra 41 vendas no mês, CAC de R$ 684 pra R$ 439. É 1,9× de retorno sem gastar um real a mais.',
      },
      {
        chip: 'Me dá o veredito final',
        reply:
          'Corta o "Genérico IA" e o post morto. Escala "Sem folha" no Meta e os Reels que provam. Conserta o meio da página. Os 5 funcionários fecharam o ciclo, da pesquisa a este painel. A máquina mede sozinha agora; daqui é só escalar o que dá lucro.',
      },
    ],
  },

  construtor: {
    greeting:
      'Eu monto sua página de vendas inteira a partir do que o seu site já diz: estrutura, texto, prova, oferta e publicação. Por onde começamos?',
    turns: [
      {
        chip: 'Montar a estrutura',
        reply:
          'Fechei a espinha da página em 7 blocos, na ordem que faz o empresário rolar até o botão: promessa no topo, prova e mecanismo no meio, oferta e formulário no fim. Olha a lista montando à esquerda.',
      },
      {
        chip: 'Escrever o hero',
        reply:
          'Hero pronto, puxando a promessa do seu site: badge da imersão, headline que para o scroll, subtítulo e o botão de candidatura. A página já começa a ganhar cara de verdade à direita.',
      },
      {
        chip: 'Puxar a prova social',
        reply:
          'Coloquei os números que sustentam a oferta e três depoimentos de quem aplicou. Prova é o que tira o "será que funciona pra mim?" da cabeça do lead antes dele ver o preço.',
      },
      {
        chip: 'Montar a oferta',
        reply:
          'Oferta fechada: o que ele monta na imersão, a contagem regressiva com data e lugar, e a garantia logo abaixo. É aqui que a decisão acontece, então o risco fica do nosso lado.',
      },
      {
        chip: 'Ver no celular',
        reply:
          'Mesma página, layout de celular. 7 em cada 10 leads chegam pelo Instagram, então a versão mobile é a que mais vende. Toca pra alternar entre desktop e celular.',
      },
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
        reply:
          'Página no ar, domínio ligado, pixel e formulário plugados no seu funil. Levou uma conversa, não seis semanas de agência.',
      },
    ],
  },

  conteudo: {
    greeting:
      'Eu não escrevo anúncio. Disso cuida o Copywriter. Eu faço o conteúdo orgânico que aquece o seu público antes de ele ver qualquer oferta: Reels, carrossel, story. Por onde começo?',
    turns: [
      {
        chip: 'Definir os pilares de conteúdo',
        reply:
          'Antes de postar, defino os 4 pilares que sustentam o seu perfil: Autoridade, Bastidor, Prova e Educação. Todo post nasce de um deles, assim você ensina e mostra os bastidores sem parecer que está vendendo o tempo todo.',
      },
      {
        chip: 'Abrir o banco de ganchos',
        reply:
          'Os 3 primeiros segundos decidem se o Reels segura ou perde o seguidor. Montei um banco de ganchos puxados da fala do seu público, ordenados pela retenção que costumam segurar. São a primeira linha de cada vídeo.',
      },
      {
        chip: 'Montar o calendário da semana',
        connect: {
          prompt: 'Pra achar o melhor horário e já deixar agendado, conecta suas redes:',
          items: [
            { id: 'ig', label: 'Instagram', mono: 'IG', color: '#d6249f' },
            { id: 'fb', label: 'Facebook', mono: 'f', color: '#1877f2' },
          ],
        },
        reply:
          'Distribuí os pilares na semana: cada dia tem formato, tema e o melhor horário pra esse público: não é chute, é quando o seu seguidor está online. Frequência que nutre sem cansar. Olha o calendário do lado.',
      },
      {
        chip: 'Escrever o roteiro do Reels',
        reply:
          'Pro Reels de segunda eu escrevo o roteiro cena a cena: o gancho nos 3 primeiros segundos, o que falar em cada corte e como fechar convidando pra salvar e comentar, interação orgânica, nada de "compre agora". Você só aponta a câmera e lê.',
      },
      {
        chip: 'Ver o post no feed',
        reply:
          'Esse é o post orgânico já dentro do feed, do jeitinho que vai aparecer, post de perfil, não anúncio. Legenda com o gancho na primeira linha, contexto, e o convite pra salvar e comentar. Veja no celular ou no desktop.',
      },
      {
        chip: 'Fechar o plano do mês',
        reply:
          'Pronto: o mês inteiro montado em cima dos 4 pilares, com ganchos e horários. Conteúdo que atrai e nutre todo dia, no piloto automático. Quando esse público estiver aquecido, é o anúncio do Copywriter que colhe. Seu time de 5 funcionários está completo.',
      },
    ],
  },
}

// ── Componentes auxiliares ───────────────────────────────────────────
function Stat({ value, label, ink }) {
  return (
    <div className="stat">
      <div className="stat-value" style={{ color: ink }}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

function SectionTitle({ children, accent }) {
  return (
    <div className="sec-title">
      <span className="sec-dot" style={{ background: accent }} />
      {children}
    </div>
  )
}

// tira de métrica inline (não-card) — alternativa ao stat-row pra
// quebrar a mesmice estrutural entre janelas
function InsightStrip({ items, ink }) {
  return (
    <div className="insight-strip">
      {items.map((it, i) => (
        <div key={i} className="insight">
          <span className="insight-v" style={{ color: ink }}>{it.v}</span>
          <span className="insight-l">{it.l}</span>
        </div>
      ))}
    </div>
  )
}

function Pill({ children, ink }) {
  return <span className="pill done" style={{ borderColor: ink, color: ink }}>● {children}</span>
}

// ── 01 · O Pesquisador ───────────────────────────────────────────────
// Output gated por `step` (0..6). Cada seção aparece quando step > i e
// entra com .reveal. Texto de corpo em superfície sólida (#fff / #f7f8fa).
function Pesquisador({ step = 0, accent, ink, site }) {
  const persona = {
    nome: 'Ricardo',
    idade: 43,
    contexto: 'Dono de empresa de serviço · São Paulo',
    fat: 'R$ 180 mil/mês',
    time: '2 vendedores + 1 SDR',
    traits: [
      'Quer escalar sem virar refém da indicação',
      'Orgulho de "fazer acontecer", mas é o gargalo',
      'Teme ficar pra trás na corrida da IA',
      'Já queimou dinheiro em mentoria que sumiu',
    ],
    naoE: 'Iniciante sem faturamento, "começando do zero".',
  }
  const dores = [
    'O time está ocupado, mas o resultado não cresce.',
    'Gasto o dobro em anúncio e vendo a metade.',
    'Pago R$ 800+ por cada "oportunidade" que não fecha.',
  ]
  const medos = [
    'Basta parar de indicar e o funil seca.',
    'Mais uma mentoria que promete e some depois.',
    'Sem mim, nada anda na empresa.',
  ]
  const desejos = [
    'Vendedor falando só com quem já decidiu comprar.',
    'Começar o mês sabendo quantas vendas vêm.',
    'Empresa que roda quando eu tiro férias.',
  ]
  const objecoes = [
    { txt: '"Já tentei IA/chatbot e não funcionou."', pct: 41, fix: 'Mostrar o mecanismo dos 5 funcionários: é filtro, não chatbot.' },
    { txt: '"Mais uma mentoria que não entrega."', pct: 28, fix: 'Garantia + prova nominal, de empresário pra empresário.' },
    { txt: '"É caro."', pct: 19, fix: 'Reframe: não é "é caro?", é "qual o retorno?".' },
    { txt: '"Não tenho tempo pra isso."', pct: 12, fix: 'O ganho é tempo: tira o dono do operacional.' },
  ]
  const schwartz = [
    'Inconsciente', 'Consciente do problema', 'Consciente da solução',
    'Consciente do produto', 'Totalmente consciente',
  ]
  const nivelAtivo = 2
  const fontes = [
    { f: 'Comentários do YouTube', n: 4120 },
    { f: 'Comentários de anúncio (Meta/IG)', n: 3180 },
    { f: 'Grupos e comunidades', n: 2240 },
    { f: 'Reclame Aqui', n: 1490 },
    { f: 'Avaliações Google', n: 980 },
    { f: 'Fóruns e Reddit', n: 470 },
  ]

  return (
    <div className="emp pesq">
      <div className="emp-head">
        <div>
          <h2>Pesquisa de mercado</h2>
          <p className="muted">Fonte: {site} · público de empresários high-ticket</p>
        </div>
        {step >= 5
          ? <Pill ink={ink}>Concluído</Pill>
          : <span className="pill working" style={{ borderColor: accent, color: ink }}>
              <span className="work-dot" style={{ background: accent }} /> Analisando
            </span>}
      </div>

      {step === 0 && (
        <div className="emp-empty">
          <span className="ee-ic" style={{ color: accent }}>◴</span>
          <p>Escolha uma sugestão ao lado pra eu começar a montar a pesquisa.</p>
        </div>
      )}

      <Section show={step > 0}>
        <InsightStrip ink={ink} items={[
          { v: <CountUp to={12480} format={fmt.int} />, l: 'comentários e vídeos lidos' },
          { v: '3 sem → 1 manhã', l: 'tempo de pesquisa' },
          { v: <><CountUp to={2} format={fmt.int} />× CTR</>, l: 'na palavra que o cliente usa' },
        ]} />
        <SectionTitle accent={accent}>Fontes analisadas · 12.480 trechos</SectionTitle>
        <div className="src-list">
          {fontes.map((s, i) => (
            <div key={i} className="src-row" style={{ '--sd': `${(i * 0.07).toFixed(2)}s` }}>
              <span className="src-name">{s.f}</span>
              <span className="src-bar"><span className="src-fill" style={{ transform: `scaleX(${(s.n / fontes[0].n).toFixed(3)})`, background: accent }} /></span>
              <span className="src-n" style={{ color: ink }}><CountUp to={s.n} format={fmt.int} /></span>
            </div>
          ))}
        </div>
      </Section>

      <Section show={step > 1}>
        <SectionTitle accent={accent}>Cliente ideal</SectionTitle>
        <div className="persona" style={{ '--pa': accent }}>
          <div className="persona-av" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}66)`, boxShadow: `0 8px 24px ${accent}44` }}>
            {persona.nome[0]}
          </div>
          <div className="persona-body">
            <div className="persona-top">
              <h3><Typewriter text={persona.nome} /> <span className="persona-age">{persona.idade} anos</span></h3>
              <span className="persona-ctx">{persona.contexto}</span>
            </div>
            <div className="persona-meta">
              <span className="pm"><b style={{ color: ink }}>{persona.fat}</b> faturamento</span>
              <span className="pm-sep" />
              <span className="pm"><b style={{ color: ink }}>{persona.time}</b></span>
            </div>
            <ul className="persona-traits">
              {persona.traits.map((t, i) => (
                <li key={i} style={{ '--td': `${0.1 + i * 0.07}s` }}><span style={{ color: accent }}>›</span> {t}</li>
              ))}
            </ul>
            <div className="persona-not">
              <span className="pn-tag">Não é</span> {persona.naoE}
            </div>
          </div>
        </div>
      </Section>

      <Section show={step > 2}>
        <SectionTitle accent={accent}>Na fala dele (verbatim)</SectionTitle>
        <div className="cols-3">
          <div className="card"><SectionTitle accent={accent}>Dores</SectionTitle>{dores.map((d, i) => <p key={i} className="bullet">{d}</p>)}</div>
          <div className="card"><SectionTitle accent={accent}>Medos</SectionTitle>{medos.map((d, i) => <p key={i} className="bullet">{d}</p>)}</div>
          <div className="card"><SectionTitle accent={accent}>Desejos</SectionTitle>{desejos.map((d, i) => <p key={i} className="bullet">{d}</p>)}</div>
        </div>
      </Section>

      <Section show={step > 3}>
        <SectionTitle accent={accent}>O que trava a venda · priorizado</SectionTitle>
        <div className="obj-list">
          {objecoes.map((o, i) => (
            <div key={i} className="obj-row" style={{ '--od': `${i * 0.08}s` }}>
              <div className="obj-rank" style={{ color: ink }}>{String(i + 1).padStart(2, '0')}</div>
              <div className="obj-main">
                <div className="obj-head">
                  <span className="obj-txt">{o.txt}</span>
                  <span className="obj-pct" style={{ color: ink }}><CountUp to={o.pct} format={fmt.int} />%</span>
                </div>
                <div className="obj-track">
                  <span className="obj-fill" style={{ width: `${o.pct}%`, background: accent, boxShadow: `0 0 10px ${accent}66` }} />
                </div>
                <div className="obj-fix"><span style={{ color: accent }}>→</span> {o.fix}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section show={step > 4}>
        <SectionTitle accent={accent}>Nível de consciência (Schwartz)</SectionTitle>
        <div className="schwartz">
          {schwartz.map((s, i) => (
            <div key={i} className={`sw-step ${i === nivelAtivo ? 'is-on' : ''} ${i < nivelAtivo ? 'is-past' : ''}`}
              style={{ '--sa': accent, '--swd': `${i * 0.08}s` }}>
              <span className="sw-dot" />
              <span className="sw-lab">{s}</span>
            </div>
          ))}
        </div>
        <div className="sw-note">
          <p>
            Ele sabe que <b>"IA pra negócio"</b> existe, mas não sabe qual mecanismo resolve. Abrir pela
            dor + mecanismo, não educar sobre o que é IA.
          </p>
          <div className="sw-soph">
            <span className="sw-soph-lab">Sofisticação do mercado</span>
            <div className="sw-soph-bar"><span style={{ width: '72%', background: accent }} /></div>
            <span className="sw-soph-v" style={{ color: ink }}>3-4 · saturado</span>
          </div>
        </div>
      </Section>

    </div>
  )
}

// ── 02 · O Redator que Filtra ────────────────────────────────────────
function Redator({ accent, ink, site, step = 0 }) {
  const show = (i) => step > i
  const fresh = (i) => step === i + 1

  const headlineBefore = 'Conheça nossa imersão de inteligência artificial para empresários.'
  const headlineAfter = 'Monte 5 funcionários de IA que vendem por você, sem folha de pagamento.'
  const lead =
    'Sua empresa para de depender de gente cara e lenta. Em 30 dias você sobe um time de IA na sua própria assinatura que pesquisa, escreve, mede e posta, 24h, sem CLT.'
  const bullets = [
    'Anúncio e página no ar em 24h, com a sua voz extraída do seu site.',
    'A IA filtra curioso e entrega só lead com dinheiro pro seu vendedor.',
    '2× vendas na mesma verba, porque ninguém mais queima orçamento no escuro.',
  ]
  const cta = 'Quero meus 5 funcionários →'

  const angles = [
    { tag: 'Medo', h: 'Seu concorrente já tem IA vendendo 24h. E você?', score: 71, note: 'volume alto, qualifica médio' },
    { tag: 'Desejo', h: 'Monte 5 funcionários de IA que vendem por você, sem folha.', score: 88, note: 'fala com quem quer escalar' },
    { tag: 'Prova', h: '2× vendas na mesma verba. Veja como a IA filtra quem tem dinheiro.', score: 94, note: 'menos lead, mais qualificado' },
  ]

  const perguntas = [
    { q: 'Quanto você investe em anúncio por mês hoje?', barra: 'Barra quem não investe' },
    { q: 'Já tem time comercial ou vende sozinho?', barra: 'Separa estrutura de iniciante' },
    { q: 'Em quanto tempo quer implantar? (30 / 60 / 90 dias)', barra: 'Filtra quem não tem pressa' },
    { q: 'Qual o faturamento atual da empresa?', barra: 'Confirma poder de compra' },
  ]

  const funil = [
    { l: 'Cliques no anúncio', v: 100, pct: 100 },
    { l: 'Preencheram o formulário', v: 24, pct: 24 },
    { l: 'Passaram no filtro', v: 11, pct: 11 },
    { l: 'Chegam prontos pro vendedor', v: 8, pct: 8 },
  ]

  return (
    <div className="emp copy">
      <div className="emp-head">
        <div>
          <h2>Copy que filtra</h2>
          <p className="muted">Reescrito a partir de {site}</p>
        </div>
        <Pill ink={ink}>8/10 chegam prontos</Pill>
      </div>

      <Section show={show(0)}>
        <SectionTitle accent={accent}>Headline · antes e depois</SectionTitle>
        <div className="ba">
          <div className="ba-col before">
            <span className="ba-tag">Antes</span>
            <p>{headlineBefore}</p>
          </div>
          <div className="ba-arrow" style={{ color: ink }}>→</div>
          <div className="ba-col after" style={{ borderColor: ink }}>
            <span className="ba-tag" style={{ background: ink }}>Depois</span>
            <p>{fresh(0) ? <Typewriter text={headlineAfter} /> : headlineAfter}</p>
          </div>
        </div>

        <SectionTitle accent={accent}>Anúncio completo</SectionTitle>
        <div className="ad-doc" style={{ '--ac': accent }}>
          <span className="ad-kicker" style={{ color: ink }}>● Anúncio pronto pra subir</span>
          <h3 className="ad-h">{fresh(0) ? <Typewriter text={headlineAfter} durationMs={900} /> : headlineAfter}</h3>
          <p className="ad-lead">{lead}</p>
          <ul className="ad-bullets">
            {bullets.map((b, i) => (
              <li key={i} style={{ '--bd': `${i * 0.06}s` }}>
                <span className="ad-tick" style={{ color: ink }}>✓</span>{b}
              </li>
            ))}
          </ul>
          <button className="ad-cta" style={{ background: ink }}>{cta}</button>
        </div>
      </Section>

      <Section show={show(1)}>
        <SectionTitle accent={accent}>Variações por ângulo · score de qualificação</SectionTitle>
        <div className="angles">
          {angles.map((a, i) => (
            <div key={i} className="angle" style={{ '--ac': accent }}>
              <div className="angle-top">
                <span className="angle-tag" style={{ borderColor: accent, color: ink }}>{a.tag}</span>
                <span className="angle-score" style={{ color: ink }}>
                  {fresh(1) ? <CountUp to={a.score} format={fmt.int} /> : a.score}<small>/100</small>
                </span>
              </div>
              <p className="angle-h">{a.h}</p>
              <div className="angle-meter">
                <span
                  className={`angle-fill ${fresh(1) ? 'building' : ''}`}
                  style={{ width: `${a.score}%`, background: accent }}
                />
              </div>
              <p className="angle-note">{a.note}</p>
              <button className="ghost-btn" style={{ borderColor: accent, color: ink }}>Usar</button>
            </div>
          ))}
        </div>
      </Section>

      <Section show={show(2)}>
        <SectionTitle accent={accent}>Formulário que qualifica o lead</SectionTitle>
        <div className="qf-list">
          {perguntas.map((p, i) => (
            <div key={i} className="qf-row" style={{ '--bd': `${i * 0.07}s` }}>
              <span className="qf-n" style={{ background: accent }}>{i + 1}</span>
              <div className="qf-body">
                <p className="qf-q">{p.q}</p>
                <span className="qf-barra" style={{ color: ink }}>◇ {p.barra}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section show={show(3)}>
        <SectionTitle accent={accent}>Por que filtrar paga mais</SectionTitle>
        <div className="funnel">
          {funil.map((f, i) => (
            <div key={i} className="fn-row" style={{ '--bd': `${i * 0.08}s` }}>
              <span className="fn-l">{f.l}</span>
              <div className="fn-track">
                <span
                  className={`fn-fill ${fresh(3) ? 'building' : ''}`}
                  style={{ width: `${f.pct}%`, background: i === 3 ? ink : accent }}
                />
              </div>
              <span className="fn-v" style={{ color: ink }}>
                {fresh(3) ? <CountUp to={f.v} format={fmt.int} /> : f.v}
              </span>
            </div>
          ))}
        </div>
        <p className="funnel-note">
          Mesma verba. O vendedor para de gastar o dia com curioso e só entra em reunião que fecha.
        </p>
      </Section>
    </div>
  )
}

// ── 03 · O Analista ──────────────────────────────────────────────────
// (último do fluxo — fecha o ciclo: analisa canais, anúncios, página e
//  conteúdo, e amarra tudo num insight final.)
const FUNNEL = [
  { k: 'Impressões', v: 184200, pct: 100, sub: 'alcance pago + orgânico' },
  { k: 'Cliques',    v: 9210,  pct: 5.0, sub: 'CTR 5,0%' },
  { k: 'Leads',      v: 645,   pct: 7.0, sub: '7% do clique' },
  { k: 'Reuniões',   v: 264,   pct: 41,  sub: '41% do lead' },
  { k: 'Vendas',     v: 74,    pct: 28,  sub: '28% da reunião' },
]
const STAGE_COST = [
  { k: 'por clique',  v: 'R$ 1,96' },
  { k: 'por lead',    v: 'R$ 11,80' },
  { k: 'por reunião', v: 'R$ 92' },
  { k: 'por venda',   v: 'R$ 684' },
]
const TREND = [3, 2, 4, 3, 5, 4, 6, 5, 7, 6, 8, 7, 9, 9]

// canais — cada um com gasto, vendas e retorno
const CHANNELS = [
  { name: 'Meta Ads',        spend: 'R$ 9.400', sales: 41, cpv: 'R$ 612',  roi: 2.4, share: 52, status: 'escala' },
  { name: 'Google Ads',      spend: 'R$ 5.200', sales: 19, cpv: 'R$ 740',  roi: 1.8, share: 29, status: 'ok' },
  { name: 'Orgânico (posts)', spend: 'R$ 0',     sales: 14, cpv: 'R$ 0',    roi: '∞',  share: 19, status: 'escala' },
]

const CREATIVES = [
  { name: 'Sem folha de pagamento', cpl: 'R$ 9,40',  cpr: 'R$ 71',  cpv: 'R$ 612',   share: 22, status: 'escala' },
  { name: 'Filtra o curioso',       cpl: 'R$ 11,20', cpr: 'R$ 88',  cpv: 'R$ 740',   share: 26, status: 'ok' },
  { name: 'Depoimento de aluno',    cpl: 'R$ 14,90', cpr: 'R$ 130', cpv: 'R$ 1.980', share: 21, status: 'cortar' },
  { name: 'Genérico "IA pra tudo"', cpl: 'R$ 18,30', cpr: 'R$ 210', cpv: '-',        share: 17, status: 'cortar' },
]

// página de vendas — performance da landing que o Construtor publicou
const PAGE = {
  conv: 6.8,            // % visitante → lead
  scroll: 71,           // % que rola até a oferta
  time: '2m 41s',       // tempo médio
  vsBench: '+2,3 pts',  // vs. média de mercado
}
const PAGE_SECTIONS = [
  { k: 'Hero (promessa)',  drop: 8,  note: 'segura quase todo mundo' },
  { k: 'Mecanismo',        drop: 19, note: 'maior queda, encurtar' },
  { k: 'Prova social',     drop: 6,  note: 'depoimentos seguram' },
  { k: 'Oferta + form',    drop: 11, note: 'converte 6,8%' },
]

// conteúdo orgânico — performance dos posts/Reels que o Criador subiu
const CONTENT = [
  { name: 'Reels · não tira férias', reach: '38,2 mil', saves: 1840, leads: 31, status: 'escala' },
  { name: 'Carrossel · 5 tarefas',   reach: '12,4 mil', saves: 920,  leads: 12, status: 'ok' },
  { name: 'Reels · antes x depois',  reach: '21,7 mil', saves: 1310, leads: 22, status: 'escala' },
  { name: 'Post · prova de vendas',  reach: '4,1 mil',  saves: 180,  leads: 3,  status: 'cortar' },
]

// insight final — amarra anúncio + página + conteúdo
const FINAL = [
  { kind: 'cut',   t: 'Corte o que sangra',     d: 'Anúncio "Genérico IA" + post "prova de vendas": 0 venda, alcance morto. Some.' },
  { kind: 'scale', t: 'Escale o que prova',     d: '"Sem folha" no Meta + Reels "não tira férias" puxam a venda mais barata da conta.' },
  { kind: 'fix',   t: 'Conserte o meio da página', d: 'Bloco "Mecanismo" perde 19% do scroll. Encurtar sobe a conversão de 6,8% pra ~8%.' },
  { kind: 'scale', t: 'Orgânico é verba grátis', d: 'Reels geram 53 leads sem gasto. Mais 3 por semana no mesmo ângulo.' },
]

// KPI com CountUp (número anima ao revelar)
function Kpi({ to, label, prefix = '', suffix = '', dec = 0, ink, big }) {
  const format = (n) => prefix + n.toLocaleString('pt-BR', {
    minimumFractionDigits: dec, maximumFractionDigits: dec,
  }) + suffix
  return (
    <div className={`kpi ${big ? 'kpi-big' : ''}`}>
      <div className="kpi-v" style={{ color: ink }}>
        <CountUp to={to} format={format} />
      </div>
      <div className="kpi-l">{label}</div>
    </div>
  )
}

// Linha de ROI: "de X → para Y" (Y anima com CountUp)
function RoiStat({ from, to, label, prefix = '', suffix = '', dec = 0, ink }) {
  const format = (n) => prefix + n.toLocaleString('pt-BR', {
    minimumFractionDigits: dec, maximumFractionDigits: dec,
  }) + suffix
  return (
    <div className="roi-stat">
      <span className="roi-from">{from}</span>
      <span className="roi-arrow" style={{ color: ink }}>→</span>
      <span className="roi-to" style={{ color: ink }}><CountUp to={to} format={format} /></span>
      <span className="roi-l">{label}</span>
    </div>
  )
}

function Analista({ accent, ink, site, step = 0 }) {
  const fmtInt = (n) => n.toLocaleString('pt-BR')
  const peak = Math.max(...TREND)
  const W = 460, H = 120, pad = 6
  const pts = TREND.map((v, i) => {
    const x = pad + (i * (W - pad * 2)) / (TREND.length - 1)
    const y = H - pad - (v / peak) * (H - pad * 2)
    return [x, y]
  })
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${H - pad} L${pts[0][0].toFixed(1)} ${H - pad} Z`

  const tag = (s) => s === 'escala' ? 'Escalar' : s === 'ok' ? 'Manter' : 'Cortar'

  return (
    <div className="emp metr">
      <div className="emp-head">
        <div>
          <h2>Painel completo</h2>
          <p className="muted">Canais, anúncios, página e conteúdo, num lugar só</p>
        </div>
        {step >= 9
          ? <Pill ink={ink}>Ciclo fechado</Pill>
          : <Pill ink={ink}>Sincronizado agora</Pill>}
      </div>

      {step === 0 && (
        <div className="emp-empty">
          <span className="ee-ic" style={{ color: accent }}>◴</span>
          <p>Escolha uma sugestão ao lado pra eu puxar os números.</p>
        </div>
      )}

      {/* 0 · KPIs de custo */}
      <Section show={step > 0}>
        <div className="kpi-row">
          <Kpi ink={ink} to={11.8}  prefix="R$ " dec={2} label="custo por contato" />
          <Kpi ink={ink} to={92}    prefix="R$ "        label="custo por reunião" />
          <Kpi ink={ink} to={684}   prefix="R$ "        label="custo por venda fechada" />
          <Kpi ink={ink} to={2}     suffix="×"          label="vendas na mesma verba" big />
        </div>
      </Section>

      {/* 1 · Funil */}
      <Section show={step > 1}>
        <SectionTitle accent={accent}>Funil · do anúncio à venda</SectionTitle>
        <div className="funnel">
          {FUNNEL.map((f, i) => (
            <div key={f.k} className="fn-row fn-row-metr" style={{ '--ac': accent }}>
              <div className="fn-meta">
                <span className="fn-k">{f.k}</span>
                <span className="fn-sub">{f.sub}</span>
              </div>
              <div className="fn-bar-wrap">
                <div
                  className="fn-bar building"
                  style={{ '--w': `${Math.max(f.pct, 6)}%`, '--d': `${i * 70}ms`, background: ink }}
                >
                  <span className="fn-bv">{fmtInt(f.v)}</span>
                </div>
              </div>
              {i > 0 && (
                <span className="fn-conv" style={{ color: ink }}>
                  {f.pct}% <i>↘</i>
                </span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 2 · Tendência + custo por etapa */}
      <Section show={step > 2}>
        <div className="trend-grid">
          <div>
            <SectionTitle accent={accent}>Vendas por dia · 14 dias</SectionTitle>
            <div className="trend">
              <div className="trend-plot">
                <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="trend-svg" aria-hidden="true">
                  <defs>
                    <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"  stopColor={accent} stopOpacity="0.22" />
                      <stop offset="100%" stopColor={accent} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path className="trend-area" d={area} fill="url(#trendFill)" />
                  <path className="trend-line" d={line} fill="none" stroke={ink}
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                </svg>
                <div className="trend-dots" aria-hidden="true">
                  {pts.map((p, i) => (
                    <span key={i} className="trend-dot"
                      style={{ left: `${((p[0] / W) * 100).toFixed(2)}%`, top: `${((p[1] / H) * 100).toFixed(2)}%`, '--di': i, borderColor: ink }} />
                  ))}
                </div>
              </div>
              <div className="trend-foot">
                <span>3/dia</span>
                <span className="trend-tag" style={{ color: ink }}>filtro de lead entrou ↑</span>
                <span>9/dia</span>
              </div>
            </div>
          </div>
          <div>
            <SectionTitle accent={accent}>Custo por etapa</SectionTitle>
            <div className="stage-cost">
              {STAGE_COST.map((s) => (
                <div key={s.k} className="sc-row">
                  <span className="sc-k">{s.k}</span>
                  <span className="sc-v" style={{ color: ink }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 3 · Por canal */}
      <Section show={step > 3}>
        <SectionTitle accent={accent}>Por canal · gasto x retorno</SectionTitle>
        <div className="chan-grid">
          {CHANNELS.map((c, i) => (
            <div key={c.name} className={`chan chan-${c.status}`} style={{ '--ac': accent, '--in': ink, '--ri': i }}>
              <div className="chan-top">
                <span className="chan-name">{c.name}</span>
                <span className={`tag tag-${c.status}`}>{tag(c.status)}</span>
              </div>
              <div className="chan-roi" style={{ color: ink }}>
                {typeof c.roi === 'number'
                  ? <><CountUp to={c.roi} format={(n) => fmt.x(n)} /> </>
                  : <>{c.roi}× </>}
                <small>ROI</small>
              </div>
              <div className="chan-meta">
                <span><b style={{ color: ink }}>{c.spend}</b> gasto</span>
                <span className="chan-sep" />
                <span><b style={{ color: ink }}>{c.sales}</b> vendas</span>
              </div>
              <div className="chan-track">
                <span className="chan-fill building" style={{ '--w': `${c.share}%`, background: ink }} />
              </div>
              <span className="chan-cpv">venda a {c.cpv}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 4 · Por criativo / anúncio */}
      <Section show={step > 4}>
        <SectionTitle accent={accent}>Por anúncio</SectionTitle>
        <table className="tbl tbl-cre">
          <thead>
            <tr>
              <th>Anúncio</th><th>Custo/contato</th><th>Custo/reunião</th>
              <th>Custo/venda</th><th>Verba</th><th></th>
            </tr>
          </thead>
          <tbody>
            {CREATIVES.map((a) => (
              <tr key={a.name} className={a.status === 'cortar' ? 'row-cut' : ''}>
                <td className="cre-name">{a.name}</td>
                <td>{a.cpl}</td><td>{a.cpr}</td>
                <td className={a.cpv === '-' ? 'cre-zero' : ''}>{a.cpv}</td>
                <td>
                  <span className="share">
                    <span className="share-fill building" style={{ '--w': `${a.share}%`, background: ink }} />
                    <span className="share-n">{a.share}%</span>
                  </span>
                </td>
                <td><span className={`tag tag-${a.status}`}>{tag(a.status)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* 5 · Por página (landing do Construtor) */}
      <Section show={step > 5}>
        <SectionTitle accent={accent}>Página de vendas · performance</SectionTitle>
        <div className="page-grid">
          <div className="page-kpis">
            <div className="pk">
              <span className="pk-v" style={{ color: ink }}><CountUp to={PAGE.conv} format={(n) => fmt.pct(n)} /></span>
              <span className="pk-l">visitante → lead <i>{PAGE.vsBench}</i></span>
            </div>
            <div className="pk">
              <span className="pk-v" style={{ color: ink }}><CountUp to={PAGE.scroll} format={(n) => fmt.pct(n)} /></span>
              <span className="pk-l">rola até a oferta</span>
            </div>
            <div className="pk">
              <span className="pk-v" style={{ color: ink }}>{PAGE.time}</span>
              <span className="pk-l">tempo na página</span>
            </div>
          </div>
          <div className="page-sections">
            {PAGE_SECTIONS.map((s, i) => (
              <div key={s.k} className="ps-row" style={{ '--ri': i }}>
                <span className="ps-k">{s.k}</span>
                <div className="ps-track">
                  <span className="ps-fill building" style={{ '--w': `${100 - s.drop}%`, background: s.drop >= 18 ? '#d23b3b' : ink }} />
                </div>
                <span className="ps-drop" style={{ color: s.drop >= 18 ? '#d23b3b' : 'var(--muted)' }}>−{s.drop}%</span>
                <span className="ps-note">{s.note}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6 · Por conteúdo (posts/Reels do Criador) */}
      <Section show={step > 6}>
        <SectionTitle accent={accent}>Conteúdo orgânico · o que gerou lead</SectionTitle>
        <table className="tbl tbl-cont">
          <thead>
            <tr>
              <th>Post / Reels</th><th>Alcance</th><th>Salvamentos</th><th>Leads</th><th></th>
            </tr>
          </thead>
          <tbody>
            {CONTENT.map((c) => (
              <tr key={c.name} className={c.status === 'cortar' ? 'row-cut' : ''}>
                <td className="cre-name">{c.name}</td>
                <td>{c.reach}</td>
                <td>{fmtInt(c.saves)}</td>
                <td className={c.leads === 0 ? 'cre-zero' : 'cont-leads'} style={c.leads > 0 ? { color: ink } : null}>{c.leads}</td>
                <td><span className={`tag tag-${c.status}`}>{tag(c.status)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* 7 · Projeção */}
      <Section show={step > 7}>
        <SectionTitle accent={accent}>Projeção · mesma verba, nova divisão</SectionTitle>
        <div className="roi">
          <div className="roi-stats">
            <RoiStat ink={ink} label="vendas no mês" from="26" to={41} suffix="" />
            <RoiStat ink={ink} label="CAC (custo por venda)" from="R$ 684" to={439} prefix="R$ " />
            <RoiStat ink={ink} label="retorno sobre a verba" from="1×" to={1.9} suffix="×" dec={1} />
          </div>
          <div className="roi-bar" style={{ '--ac': accent, '--in': ink }}>
            <div className="roi-track">
              <span className="roi-now" style={{ '--w': '63%' }}><b>hoje</b> 26 vendas</span>
            </div>
            <div className="roi-track">
              <span className="roi-proj building" style={{ '--w': '100%' }}><b>projetado</b> 41 vendas</span>
            </div>
            <p className="roi-note">Sem gastar um real a mais. Só tirando a verba de quem não fecha.</p>
          </div>
        </div>
      </Section>

      {/* 8 · Insight final consolidado — fecha o ciclo dos 5 */}
      <Section show={step > 8}>
        <SectionTitle accent={accent}>O veredito · anúncio + página + conteúdo</SectionTitle>
        <div className="verdict" style={{ '--ac': accent, '--in': ink }}>
          <div className="verdict-actions">
            {FINAL.map((a, i) => (
              <div key={i} className={`vd act-${a.kind}`} style={{ '--ac': accent, '--in': ink, '--ri': i }}>
                <span className="act-ic" aria-hidden="true">
                  {a.kind === 'cut' ? '✕' : a.kind === 'fix' ? '◐' : '↑'}
                </span>
                <div className="act-body">
                  <span className="act-t">{a.t}</span>
                  <span className="act-d">{a.d}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="verdict-close">
            <span className="vc-dot" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
            <p className="vc-tx">
              {step === 9
                ? <Typewriter text="Os 5 funcionários rodaram de ponta a ponta: pesquisa → copy → página → conteúdo → este painel. A máquina está medindo sozinha. Daqui é só escalar o que prova." />
                : 'Os 5 funcionários rodaram de ponta a ponta: pesquisa → copy → página → conteúdo → este painel. A máquina está medindo sozinha. Daqui é só escalar o que prova.'}
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}

// ── 04 · O Construtor de Páginas ─────────────────────────────────────
// Preview = landing escura real (vibe GDIA: purple-black + glow laranja).
// Vidro só no chrome (lp-chrome). Corpo em superfície sólida escura (AA).
// Toggle Desktop/Celular funcional. Tudo gated por step.
function Construtor({ accent, ink, site, step = 0 }) {
  const [device, setDevice] = React.useState('desktop')
  // ao chegar no passo "ver no celular", troca pro mobile sozinho (1×) —
  // no deck ninguém clica no toggle, então sem isso "nada muda"
  const switchedRef = React.useRef(false)
  React.useEffect(() => {
    if (step > 4 && !switchedRef.current) { switchedRef.current = true; setDevice('mobile') }
  }, [step])

  // espinha da página (lista esquerda) — i=4 é a Oferta, destacada
  const blocos = [
    { n: 'Hero', d: 'badge + promessa + CTA' },
    { n: 'Prova rápida', d: 'números que sustentam' },
    { n: 'Mecanismo', d: 'os 5 funcionários no dia a dia' },
    { n: 'Depoimentos', d: 'quem já aplicou' },
    { n: 'Oferta', d: 'o que entra, data e lugar' },
    { n: 'Garantia', d: 'tira o risco da decisão' },
    { n: 'Formulário', d: 'aplicação que qualifica' },
  ]

  // prova: ticker (igual à landing real) + depoimentos nominais do repo
  const ticker = [
    { v: '+600', l: 'empresas atendidas' },
    { v: '+R$ 500mi', l: 'em vendas geradas' },
    { v: '+10 mil', l: 'contatos qualificados' },
  ]
  const depoimentos = [
    { nome: 'Vinicius de Sá', cargo: 'Sócio · Full Sales System', txt: 'Mudou nosso comercial em 30 dias. Saímos do achismo pro processo.' },
    { nome: 'Arthur Padrão', cargo: '+950k/mês com agências', txt: 'O vendedor só fala com quem tem dinheiro. O filtro fez o trabalho.' },
    { nome: 'Rodrigo Noll', cargo: 'CEO · Base Viral', txt: 'Página no ar no mesmo dia. Primeira reunião em 48h.' },
  ]

  // contagem regressiva ESTÁTICA (sem Date.now/new Date — determinístico)
  const countdown = [
    { v: '06', l: 'dias' }, { v: '14', l: 'horas' },
    { v: '38', l: 'min' }, { v: '52', l: 'seg' },
  ]

  const showBlocos = step > 0
  const showHero = step > 1
  const showProva = step > 2
  const showOferta = step > 3
  const showMobile = step > 4   // turn "ver no celular" libera o toggle
  const showPublicado = step > 5

  const dev = showMobile ? device : 'desktop'

  return (
    <div className="emp build" style={{ '--accent': accent, '--accent-ink': ink }}>
      <div className="emp-head">
        <div>
          <h2>Construtor de páginas</h2>
          <p className="muted">Montando a partir de {site}</p>
        </div>
        <Pill ink={ink}>{showPublicado ? 'No ar' : 'Montando…'}</Pill>
      </div>

      <div className="builder">
        {/* ── lista de blocos à esquerda ── */}
        <div className="blk-list">
          <div className="blk-head">Blocos da página</div>
          {showBlocos ? (
            <>
              {blocos.map((b, i) => (
                <div
                  key={i}
                  className="blk reveal"
                  style={{ '--ri': i, ...(i === 4 ? { borderColor: accent, color: ink } : null) }}
                >
                  <span className="blk-grip" aria-hidden="true">⋮⋮</span>
                  <span className="blk-body">
                    <span className="blk-name">{b.n}</span>
                    <span className="blk-desc">{b.d}</span>
                  </span>
                  <span className="blk-ok" style={{ color: accent }}>✓</span>
                </div>
              ))}
              <button className="add-blk" style={{ borderColor: accent, color: ink }}>+ Adicionar bloco</button>
            </>
          ) : (
            <div className="blk-empty">A estrutura aparece aqui.</div>
          )}
        </div>

        {/* ── preview da landing à direita ── */}
        <div className="preview-wrap">
          {showMobile && (
            <div className="dev-toggle reveal" role="group" aria-label="Visualizar em">
              <button
                className={`dev-btn ${dev === 'desktop' ? 'on' : ''}`}
                style={dev === 'desktop' ? { background: ink, borderColor: ink } : null}
                onClick={() => setDevice('desktop')}
                aria-pressed={dev === 'desktop'}
              >▭ Desktop</button>
              <button
                className={`dev-btn ${dev === 'mobile' ? 'on' : ''}`}
                style={dev === 'mobile' ? { background: ink, borderColor: ink } : null}
                onClick={() => setDevice('mobile')}
                aria-pressed={dev === 'mobile'}
              >▯ Celular</button>
            </div>
          )}

          <div className={`lp dev-${dev}`}>
            {/* chrome do navegador = único vidro */}
            <div className="lp-chrome">
              <span /><span /><span />
              <span className="lp-url">
                <span className="lp-lock" aria-hidden="true">🔒</span>
                {showPublicado ? site : 'rascunho · não publicado'}
              </span>
            </div>

            {/* viewport escuro = a landing real */}
            <div className="lp-view">
              <div className="lp-glow" aria-hidden="true" />

              {/* HERO */}
              {showHero ? (
                <header className="lp-hero reveal">
                  <span className="lp-badge">
                    Imersão presencial<i>·</i>3 dias<i>·</i>São Paulo
                  </span>
                  <p className="lp-pre">Para empresários que faturam a partir de R$ 130 mil/mês</p>
                  <div className="lp-avatars" aria-hidden="true">
                    {['pesquisa', 'copywriter', 'metricas', 'construtor', 'conteudo'].map((a, i) => (
                      <img key={a} src={`/agentes/${a}.png`} alt="" style={{ '--ai': i }} />
                    ))}
                  </div>
                  <h1 className="lp-h1">
                    {showHero && step === 2
                      ? <Typewriter text="Crie 5 Super Funcionários de IA que entregam pro seu vendedor só contato pronto pra comprar" />
                      : <>Crie <span className="lp-grad">5 Super Funcionários de IA</span> que entregam pro seu vendedor só contato pronto pra comprar</>}
                  </h1>
                  <p className="lp-sub">
                    Pare de queimar o tempo do seu vendedor. Com os 5 funcionários, <b>8 a cada 10</b> contatos chegam prontos para comprar.
                  </p>
                  <div className="lp-cta-row">
                    <button className="lp-cta">QUERO ME CANDIDATAR <span aria-hidden="true">→</span></button>
                    <span className="lp-cta-note">2 min · resposta em até 3h úteis</span>
                  </div>
                </header>
              ) : (
                <div className="lp-skeleton" aria-hidden="true">
                  <span className="sk sk-badge" /><span className="sk sk-h1" />
                  <span className="sk sk-h1 short" /><span className="sk sk-sub" /><span className="sk sk-cta" />
                </div>
              )}

              {/* PROVA: ticker + depoimentos */}
              {showProva && (
                <section className="lp-proof reveal">
                  <div className="lp-ticker">
                    {ticker.map((t, i) => (
                      <div key={i} className="lp-tk" style={{ '--ri': i }}>
                        <b>{t.v}</b><span>{t.l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="lp-quotes">
                    {depoimentos.map((d, i) => (
                      <figure key={i} className="lp-quote reveal" style={{ '--ri': i }}>
                        <span className="lp-q-mark" aria-hidden="true">“</span>
                        <blockquote>{d.txt}</blockquote>
                        <figcaption>
                          <span className="lp-q-av" style={{ background: `linear-gradient(135deg, ${accent}, #ff3b30)` }}>
                            {d.nome[0]}
                          </span>
                          <span className="lp-q-id">
                            <b>{d.nome}</b><span>{d.cargo}</span>
                          </span>
                          <span className="lp-q-check" aria-hidden="true">✔</span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              {/* OFERTA: o que entra + countdown + garantia */}
              {showOferta && (
                <section className="lp-offer reveal">
                  <span className="lp-eyebrow">A imersão</span>
                  <h2 className="lp-offer-h">Você sai com os <span className="lp-grad">5 funcionários</span> rodando na empresa</h2>
                  <ul className="lp-includes">
                    {[
                      'Os 5 Super Funcionários instalados e treinados',
                      'Tudo conectado ao seu CRM, WhatsApp e agenda',
                      'Filtro calibrado pro seu cliente certo',
                      'Painel pra medir o que cada um economiza',
                    ].map((t, i) => (
                      <li key={i} style={{ '--ri': i }}><span className="lp-ck" style={{ color: accent }}>✓</span>{t}</li>
                    ))}
                  </ul>

                  <div className="lp-countdown">
                    <div className="lp-cd-top">
                      <span className="lp-cd-lab">A imersão começa em</span>
                      <span className="lp-cd-when">30 jul · São Paulo</span>
                    </div>
                    <div className="lp-cd-units">
                      {countdown.map((c, i) => (
                        <div key={i} className="lp-cd-u"><b>{c.v}</b><span>{c.l}</span></div>
                      ))}
                    </div>
                    <p className="lp-cd-foot">3 dias presenciais · 30/07 a 01/08</p>
                  </div>

                  <div className="lp-guarantee">
                    <span className="lp-shield" aria-hidden="true">🛡</span>
                    <div>
                      <b>Garantia de aplicação</b>
                      <span>Saiu sem os 5 rodando? A gente fica até rodar. Risco é nosso.</span>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* barra de publicação */}
          {showPublicado && (
            <div className="publish-bar reveal" style={{ borderColor: accent }}>
              <span className="pub-dot" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
              <div className="pub-text">
                <b style={{ color: ink }}>Publicado · no ar em 24h</b>
                <span className="pub-checks">
                  <i>✓ domínio</i><i>✓ pixel</i><i>✓ formulário no funil</i><i>✓ SSL</i>
                </span>
              </div>
              <a className="pub-link" style={{ borderColor: accent, color: ink }} href={`https://${site}`} onClick={(e) => e.preventDefault()}>
                Abrir página →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── 05 · O Criador de Conteúdo ───────────────────────────────────────
// Conteúdo ORGÂNICO (topo/meio de funil): pilares, banco de ganchos,
// calendário de posts orgânicos, roteiro de Reels, post no feed (perfil).
// Distinto do Copywriter (que faz anúncio). Último do fluxo: encerra.

// Preview do post ORGÂNICO no feed (post de perfil — não anúncio)
function FeedPreview({ accent, ink, caption, tags, type }) {
  const [view, setView] = React.useState('mobile')
  const firstLine = caption.split('\n')[0]
  return (
    <div className={`feed-wrap view-${view}`}>
      <div className="feed-toggle" role="tablist" aria-label="Visualização">
        <button role="tab" aria-selected={view === 'mobile'}
                className={view === 'mobile' ? 'on' : ''}
                style={view === 'mobile' ? { background: ink, color: '#fff' } : null}
                onClick={() => setView('mobile')}>Celular</button>
        <button role="tab" aria-selected={view === 'desktop'}
                className={view === 'desktop' ? 'on' : ''}
                style={view === 'desktop' ? { background: ink, color: '#fff' } : null}
                onClick={() => setView('desktop')}>Desktop</button>
      </div>

      <div className="ig-card">
        <div className="ig-top">
          <span className="ig-av" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}66)` }} />
          <div className="ig-meta">
            <span className="ig-user">superfuncionarios</span>
            <span className="ig-loc">Publicação · perfil</span>
          </div>
          <span className="ig-more">⋯</span>
        </div>
        <div className="ig-media has-img">
          <img className="ig-post-img" src="/deck/post-spacex.webp" alt="" />
        </div>
        <div className="ig-actions">
          <span className="ig-ic">♡</span><span className="ig-ic">💬</span><span className="ig-ic">➦</span>
          <span className="ig-save">⬚</span>
        </div>
        <div className="ig-likes">2.4 mil curtidas</div>
        <div className="ig-caption">
          <b>superfuncionarios</b> {firstLine} <span className="ig-more-txt">… mais</span>
        </div>
        <div className="ig-tags">{tags.slice(0, 4).join(' ')}</div>
        <div className="ig-time">HÁ 2 HORAS</div>
      </div>
    </div>
  )
}

function CriadorDeConteudo({ accent, ink, step = 0 }) {
  // 4 pilares orgânicos — base de todo post
  const pilares = [
    { nome: 'Autoridade', ic: '◆', share: 30, ex: 'Tese forte sobre IA no comercial: você fincando bandeira.' },
    { nome: 'Bastidor',   ic: '◐', share: 25, ex: 'Como um funcionário de IA é montado por dentro, sem filtro.' },
    { nome: 'Prova',      ic: '✓', share: 25, ex: 'Print de resultado, antes/depois, sem prometer, mostrando.' },
    { nome: 'Educação',   ic: '✎', share: 20, ex: 'Passo a passo que o seguidor aplica hoje, de graça.' },
  ]

  // banco de ganchos (hooks) — primeira linha do Reels, por retenção estimada
  const ganchos = [
    { txt: '"Esse funcionário trabalha 24h e nunca pede aumento."', ret: 92, pilar: 'Autoridade', top: true },
    { txt: '"Parei de gravar conteúdo correndo. Olha como."',        ret: 84, pilar: 'Bastidor' },
    { txt: '"Ninguém te conta isso sobre IA no comercial."',         ret: 78, pilar: 'Educação' },
    { txt: '"3 erros que matam o seu Instagram de empresário."',     ret: 71, pilar: 'Educação' },
  ]

  // calendário — POSTS ORGÂNICOS, cada dia ligado a um pilar
  const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
  const posts = [
    { tipo: 'Reels',     txt: 'O funcionário que não tira férias', hora: '09:00', pilar: 'Autoridade' },
    { tipo: 'Carrossel', txt: '5 tarefas que a IA já faz por você', hora: '12:30', pilar: 'Educação' },
    { tipo: 'Story',     txt: 'Bastidor: montando um agente ao vivo', hora: '18:00', pilar: 'Bastidor' },
    { tipo: 'Reels',     txt: 'Um dia na rotina de quem usa IA',     hora: '09:00', pilar: 'Bastidor' },
    { tipo: 'Post',      txt: 'Print do antes e depois do perfil',   hora: '12:00', pilar: 'Prova' },
    { tipo: 'Reels',     txt: 'A pergunta que todo empresário faz',  hora: '17:30', pilar: 'Educação' },
    { tipo: 'Carrossel', txt: 'O que eu aprendi montando 5 agentes', hora: '11:00', pilar: 'Autoridade' },
  ]

  const open = posts[0]
  const legenda =
    'O funcionário que não tira férias, não pede aumento e ainda aprende o seu negócio sozinho.\n\n' +
    'Nesse vídeo eu te mostro por dentro como ele funciona, sem termo difícil, do jeito que dá pra entender ' +
    'tomando um café.\n\n' +
    'Salva esse post pra não esquecer e me conta nos comentários: qual tarefa do seu dia você passaria pra ele primeiro? 👇'
  const tags = ['#inteligenciaartificial', '#empresario', '#produtividade', '#iaparaempresas',
                '#automacao', '#superfuncionarios', '#conteudo', '#bastidores']

  // roteiro de Reels — cena a cena (orgânico, fecha pedindo salvar/comentar)
  const reels = [
    { t: '0-3s',   label: 'Gancho',  txt: '"Esse funcionário trabalha 24h e nunca pede aumento." (olho na câmera)' },
    { t: '3-8s',   label: 'Contexto', txt: 'Mostra a rotina travada: tarefas repetitivas comendo o seu dia.' },
    { t: '8-18s',  label: 'Mostra', txt: 'Corta pra tela: o agente fazendo a tarefa sozinho, passo a passo.' },
    { t: '18-25s', label: 'Insight', txt: '"Não é mágica, é processo. E dá pra montar no seu negócio."' },
    { t: '25-30s', label: 'Convite', txt: 'Olha pra câmera: "Salva esse vídeo e me conta nos comentários."' },
  ]

  const has = (n) => step > n

  return (
    <div className="emp social" style={{ '--social': accent, '--social-ink': ink }}>
      <div className="emp-head">
        <div>
          <h2>Conteúdo orgânico</h2>
          <p className="muted">Reels, carrossel e story que atraem e nutrem, antes de qualquer anúncio.</p>
        </div>
        <Pill ink={ink}>{has(5) ? 'Mês no ar' : 'Orgânico'}</Pill>
      </div>

      <div className="insight-strip">
        <div className="insight">
          <span className="insight-v" style={{ color: ink }}><CountUp to={4} format={fmt.int} /></span>
          <span className="insight-l">pilares de conteúdo</span>
        </div>
        <div className="insight">
          <span className="insight-v" style={{ color: ink }}><CountUp to={30} format={fmt.int} /></span>
          <span className="insight-l">posts orgânicos no mês</span>
        </div>
        <div className="insight">
          <span className="insight-v" style={{ color: ink }}>0h</span>
          <span className="insight-l">do seu tempo gravando</span>
        </div>
      </div>

      {step === 0 && (
        <div className="emp-empty">
          <span className="ee-ic" style={{ color: accent }}>◴</span>
          <p>Escolha uma sugestão ao lado pra eu montar o seu conteúdo orgânico.</p>
        </div>
      )}

      {/* turn 0 · pilares de conteúdo */}
      <Section show={has(0)} className="social-block">
        <SectionTitle accent={accent}>Pilares de conteúdo</SectionTitle>
        <div className="pillars">
          {pilares.map((p, i) => (
            <div key={i} className="pillar" style={{ '--pi': i, '--social': accent }}>
              <span className="pillar-ic" style={{ color: ink }} aria-hidden="true">{p.ic}</span>
              <div className="pillar-body">
                <div className="pillar-top">
                  <span className="pillar-name">{p.nome}</span>
                  <span className="pillar-share" style={{ color: ink }}>
                    {has(0) ? <CountUp to={p.share} format={fmt.int} /> : p.share}%
                  </span>
                </div>
                <div className="pillar-track">
                  <span className={`pillar-fill ${has(0) ? 'building' : ''}`}
                        style={{ width: `${p.share}%`, background: accent }} />
                </div>
                <p className="pillar-ex">{p.ex}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* turn 1 · banco de ganchos */}
      <Section show={has(1)} className="social-block">
        <SectionTitle accent={accent}>Banco de ganchos · primeiros 3 segundos</SectionTitle>
        <div className="hooks">
          {ganchos.map((g, i) => (
            <div key={i} className={`hook ${g.top ? 'is-top' : ''}`}
                 style={{ '--hi': i, '--social': accent, borderColor: g.top ? accent : 'var(--line)' }}>
              <span className="hook-quote" aria-hidden="true" style={{ color: accent }}>“</span>
              <div className="hook-main">
                <p className="hook-txt">{i === 0 ? <Typewriter text={g.txt} /> : g.txt}</p>
                <div className="hook-meta">
                  <span className="hook-pilar" style={{ borderColor: accent, color: ink }}>{g.pilar}</span>
                  <span className="hook-ret">
                    <span className="hook-ret-track">
                      <span className={`hook-ret-fill ${has(1) ? 'building' : ''}`}
                            style={{ width: `${g.ret}%`, background: accent }} />
                    </span>
                    <b style={{ color: ink }}>{has(1) ? <CountUp to={g.ret} format={fmt.int} /> : g.ret}%</b> retenção est.
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* turn 2 · calendário semanal de posts orgânicos */}
      <Section show={has(2)} className="social-block">
        <SectionTitle accent={accent}>Sua semana de conteúdo</SectionTitle>
        <div className="cal">
          {posts.map((p, i) => (
            <div key={i} className="cal-col" style={{ '--ci': i }}>
              <div className="cal-day">{dias[i]}</div>
              <div className={`cal-card ${i === 0 && has(3) ? 'is-open' : ''}`}
                   style={i === 0 && has(3) ? { borderColor: accent } : null}>
                <div className="cal-thumb"
                     style={{ background: `linear-gradient(135deg, ${accent}, ${accent}55)` }}>
                  <span className="cal-type">{p.tipo}</span>
                </div>
                <p className="cal-txt">{p.txt}</p>
                <span className="cal-pilar" style={{ color: ink }}>● {p.pilar}</span>
                <div className="cal-time">⏱ {p.hora}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* turn 3 · roteiro do Reels cena a cena */}
      <Section show={has(3)} className="social-block">
        <SectionTitle accent={accent}>Roteiro do Reels · cena a cena · 30s</SectionTitle>
        <div className="reels-script">
          {reels.map((r, i) => (
            <div key={i} className="reel-step" style={{ '--ri': i }}>
              <div className="reel-time" style={{ color: ink, borderColor: accent }}>{r.t}</div>
              <div className="reel-body">
                <span className="reel-label" style={{ color: ink }}>{r.label}</span>
                <p className="reel-txt">{r.txt}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* turn 4 · post orgânico no feed + legenda + melhor horário */}
      <Section show={has(4)} className="social-block">
        <SectionTitle accent={accent}>Post orgânico · {open.tipo} de segunda</SectionTitle>
        <div className="post-detail">
          <div className="post-caption">
            <div className="pd-head">
              <span className="pd-tag" style={{ background: ink }}>{open.tipo} · {open.pilar}</span>
              <span className="pd-when">
                Melhor horário <b style={{ color: ink }}>⏱ {open.hora}</b> · ter-qui (seguidor online)
              </span>
            </div>
            <div className="pd-label">Legenda</div>
            <div className="pd-text">
              {step === 5 ? <Typewriter text={legenda} durationMs={1400} /> : legenda}
            </div>
            <div className="pd-label">Hashtags</div>
            <div className="pd-tags">
              {tags.map((t, i) => (
                <span key={i} className="hashtag" style={{ '--hi': i }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <SectionTitle accent={accent}>Como vai aparecer no feed</SectionTitle>
        <FeedPreview accent={accent} ink={ink} caption={legenda} tags={tags} type={open.tipo} />
      </Section>

      {/* turn 5 · plano do mês fechado (encerra o fluxo) */}
      <Section show={has(5)} className="social-block">
        <SectionTitle accent={accent}>Plano do mês fechado</SectionTitle>
        <div className="month-plan">
          {pilares.map((p, i) => (
            <div key={i} className="mp-pill" style={{ '--pi': i, borderColor: accent, color: ink }}>
              <b>{p.nome}</b>
              <span>{Math.round((p.share / 100) * 30)} posts</span>
            </div>
          ))}
        </div>
        <div className="auto-badge" style={{ borderColor: accent, color: ink }}>
          <span className="ab-dot" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
          30 posts orgânicos na fila · atraindo e nutrindo todo dia
        </div>
        <p className="funnel-note" style={{ marginTop: 12 }}>
          Público aquecido, no piloto automático. Quando o anúncio do Copywriter chega, ele colhe, não esfria.
        </p>
      </Section>
    </div>
  )
}

// ── Roteador de conteúdo por funcionário ─────────────────────────────
export function EmployeeContent({ id, accent, ink, site, step = 0 }) {
  switch (id) {
    case 'pesquisa': return <Pesquisador accent={accent} ink={ink} site={site} step={step} />
    case 'copywriter': return <Redator accent={accent} ink={ink} site={site} step={step} />
    case 'metricas': return <Analista accent={accent} ink={ink} site={site} step={step} />
    case 'construtor': return <Construtor accent={accent} ink={ink} site={site} step={step} />
    case 'conteudo': return <CriadorDeConteudo accent={accent} ink={ink} step={step} />
    default: return null
  }
}
