import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { EMPLOYEES, EmployeeContent, SCRIPTS } from './employees.jsx'
import { PresentationCtx } from './chat.jsx'
import { resolvePack } from './niches/index.js'

const PACK = resolvePack('generico', { empresa: 'superfuncionarios' })

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// marca (três barras) — eco do favicon GDIA
function Mark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path fill="currentColor" d="M14 19h36a3 3 0 0 1 0 6H14a3 3 0 0 1 0-6Zm0 12h26a3 3 0 0 1 0 6H14a3 3 0 0 1 0-6Zm0 12h36a3 3 0 0 1 0 6H14a3 3 0 0 1 0-6Z" />
    </svg>
  )
}

// papel curto de cada funcionário (pro slide do time)
const TEAM_ROLE = {
  pesquisa: 'Lê o mercado e desenha o cliente certo',
  copywriter: 'Escreve o anúncio que filtra curioso',
  construtor: 'Sobe a página de vendas em 24h',
  conteudo: 'Aquece o público no orgânico, sem mídia',
  metricas: 'Mede tudo e diz onde escalar',
}

// rotinas de exemplo (slide "trabalham sozinhos")
const PRES_ROUTINES = [
  { id: 'conteudo',   what: 'Posta 1 Reels por dia',             when: 'Todo dia · 09:00', rec: 'Diário' },
  { id: 'metricas',   what: 'Manda o relatório de métricas',     when: 'Segunda · 08:00',  rec: 'Semanal' },
  { id: 'pesquisa',   what: 'Varre comentários e reviews novos', when: 'Todo dia · 07:30', rec: 'Diário' },
  { id: 'copywriter', what: '5 variações dos anúncios campeões', when: 'Segunda · 09:00',  rec: 'Semanal' },
]

// notas do apresentador (só pra você — tecla N)
const NARRATIVE_NOTES = {
  cover: [
    'Abre com pergunta: "quantas vendas você perdeu esse mês por lead que não fecha?"',
    'Deixa o nome assentar: não é ferramenta, é um time. Cinco contratados que não tiram férias.',
  ],
  nvidia: [
    'Abre o ritmo da IA: avançou 1 milhão de vezes em 10 anos (fonte na tela: Tom\'s Hardware).',
    '"Quem não embarcar nisso agora vai competir contra quem embarcou."',
  ],
  karp: [
    'Contraponto: a IA acelera tudo, mas execução virou commodity. O que diferencia é gosto e julgamento.',
    'Liga no seu papel: você traz o gosto e a estratégia; a IA executa em escala.',
  ],
  hackr: [
    'Sua credibilidade: já construí e vendi software de verdade (Hackr Ads → Conta Simples).',
    'Não é teoria: já operei isso no mercado.',
  ],
  pitaia: [
    'Mostra que você cria produto de IA pra dono de negócio (pitaia.ai: post de 40 min vira 30 seg).',
    'Conecta com a dor do público: tempo e custo de conteúdo/agência.',
  ],
  lucia: [
    'Aqui é a Lúcia, uma funcionária de IA minha, executando de verdade: "faça um post sobre a Havan" e ela entrega os 10 slides.',
    'É o nível 4 na prática: você manda, ela faz. Não explica como, executa.',
  ],
  saasdead: [
    'Cria tensão: acabei de mostrar que crio SaaS, mas até o Satya Nadella (Microsoft) pergunta se SaaS morreu.',
    'Software tradicional vira commodity. Quem não muda, a IA passa por cima. Isso me leva pra próxima.',
  ],
  realization: [
    'O momento de virada: percebi que sem estudar a fundo o que as maiores empresas fazem, qualquer coisa morre em 6 meses.',
    'Foi o que me levou a montar o sistema dos Super Funcionários.',
  ],
  levels: [
    'A escada: conversar → ensinar → delegar → contratar. A maioria das pessoas para no nível 1.',
    'Nível 4 é o funcionário de IA: executa rotinas sozinho. O iFood roda 9 mil. É a fronteira.',
    'Bridge: "é exatamente nesse nível 4 que os seus 5 Super Funcionários vivem."',
  ],
  problem: [
    'Espelhe a dor com a fala dele. "Quanto do dia do seu vendedor vai pra quem nunca ia comprar?"',
    'Aqui você não vende solução. Só faz doer. O time entra no próximo slide.',
  ],
  team: [
    'Apresente como contratação, não software.',
    'Aponte a ordem: pesquisa vira copy, copy vira página, página recebe tráfego, conteúdo aquece, analista mede.',
    'Avise que nos próximos slides cada um trabalha ao vivo na sua frente.',
  ],
  routines: [
    'Tira o medo de "mais uma ferramenta pra eu operar".',
    'Eles rodam sozinhos: postam, medem, ajustam. Você só olha o resultado.',
  ],
  offer: [
    'Recapitule o ciclo em uma frase só.',
    'Ancore no custo de UM funcionário CLT contra os cinco rodando 24h.',
    'Garantia tira o risco. Feche pedindo o próximo passo: candidatura / condição da turma.',
  ],
  reward: [
    'O brinde: a skill /human, que tira a cara de IA de qualquer texto. Amostra de ter um funcionário, não uma ferramenta.',
    'A dinâmica: escanear o QR, me seguir, postar um story desta palestra e me marcar. Eu mando a /human no direct.',
    'Engajamento e alcance na veia: cada pessoa posta um story da sua palestra te marcando, no comecinho da talk.',
  ],
}

const AGENT_NOTES = {
  pesquisa: 'O Pesquisador não chuta público, ele lê o mercado. Mostre o volume (12 mil trechos) e a persona com nome. Venda: "seu anúncio fala a língua que o cliente já usa."',
  copywriter: 'Pega a pesquisa e escreve o anúncio que filtra curioso. Mostre o antes/depois e o formulário. Venda: "menos lead, mais lead com dinheiro."',
  construtor: 'Página de vendas no ar em 24h, não seis semanas de agência. Mostre a página montando e o mobile. Venda: "você olha e fala: quero essa página."',
  conteudo: 'Orgânico que aquece antes do anúncio. Mostre os pilares e o calendário. Venda: "topo de funil que não custa mídia."',
  metricas: 'Fecha o ciclo: mede canal, anúncio, página e conteúdo. Mostre o custo por venda e a projeção. Venda: "a máquina te diz onde está o lucro." Esse é o clímax.',
}

// monta a lista plana de slides do deck
function buildDeck() {
  const slides = [
    { kind: 'cover' },
    { kind: 'hackr' }, { kind: 'reward' },
    { kind: 'nvidia' }, { kind: 'karp' },
    { kind: 'pitaia' }, { kind: 'saasdead' }, { kind: 'lucia' },
    { kind: 'realization' }, { kind: 'levels' },
    { kind: 'problem' }, { kind: 'team' },
  ]
  EMPLOYEES.forEach((e) => {
    SCRIPTS[e.id].turns.forEach((t, i) => {
      slides.push({ kind: 'agent', id: e.id, step: i + 1, chip: t.chip, reply: t.reply })
    })
  })
  slides.push({ kind: 'routines' }, { kind: 'offer' })
  return slides
}

// ── slides narrativos ────────────────────────────────────────────────
function CoverSlide({ site }) {
  return (
    <div className="ps ps-cover">
      <div className="ps-mark"><Mark /></div>
      <div className="ps-orbs" aria-hidden="true">
        {EMPLOYEES.map((e, i) => (
          <img key={e.id} src={e.img} alt="" style={{ '--oi': i, boxShadow: `0 10px 34px ${e.glow}, 0 0 0 3px ${e.color}` }} />
        ))}
      </div>
      <h1 className="ps-title">Super Funcionários</h1>
      <p className="ps-tag">Cinco funcionários de IA que vendem por você. Sem folha de pagamento.</p>
      <p className="ps-foot">superfuncionarios.ai</p>
    </div>
  )
}

function ProblemSlide() {
  const lines = [
    'Seu vendedor passa o dia peneirando curioso.',
    'Você paga R$ 800+ por "oportunidade" que não fecha.',
    'Mesma verba, metade das vendas.',
  ]
  return (
    <div className="ps ps-problem">
      <span className="ps-kicker">O gargalo</span>
      <h1 className="ps-h1">O problema não é tráfego.<br />É lead lixo chegando no seu time.</h1>
      <div className="ps-lines">
        {lines.map((l, i) => (
          <p key={i} className="ps-line" style={{ '--li': i }}><span className="ps-x">✕</span>{l}</p>
        ))}
      </div>
    </div>
  )
}

function TeamSlide() {
  return (
    <div className="ps ps-team">
      <h1 className="ps-h1 center">Cinco funcionários. Um fluxo.<br />Da pesquisa à venda.</h1>
      <p className="ps-sub">Cada um faz uma parte. Juntos, fecham o ciclo.</p>
      <div className="ps-team-grid">
        {EMPLOYEES.map((e, i) => (
          <div key={e.id} className="ps-member" style={{ '--mi': i, '--accent': e.color }}>
            <img src={e.img} alt="" style={{ boxShadow: `0 8px 24px ${e.glow}, 0 0 0 2.5px ${e.color}` }} />
            <strong>{e.name}</strong>
            <span>{TEAM_ROLE[e.id]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RoutinesSlide() {
  const byId = (id) => EMPLOYEES.find((e) => e.id === id)
  return (
    <div className="ps ps-routines">
      <h1 className="ps-h1 center">E eles trabalham sozinhos.</h1>
      <p className="ps-sub">Você define quando e com que frequência. Eles executam no piloto automático.</p>
      <div className="ps-rot-grid">
        {PRES_ROUTINES.map((r, i) => {
          const a = byId(r.id)
          return (
            <div key={i} className="ps-rot" style={{ '--mi': i, '--accent': a.color }}>
              <img src={a.img} alt="" style={{ boxShadow: `0 0 0 2px ${a.color}` }} />
              <div className="ps-rot-main">
                <span className="ps-rot-agent">{a.name}</span>
                <p className="ps-rot-what">{r.what}</p>
                <div className="ps-rot-meta">
                  <span>🕑 {r.when}</span>
                  <span className="ps-rot-rec" style={{ color: a.ink, borderColor: a.color }}>{r.rec}</span>
                </div>
              </div>
              <span className="ps-rot-dot" style={{ background: '#2fbf6c' }} aria-hidden="true" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function OfferSlide() {
  const inc = [
    'Os 5 instalados e treinados no seu negócio',
    'Conectados ao seu CRM, WhatsApp e agenda',
    'Filtro calibrado pro seu cliente certo',
    'Painel que mede o que cada um traz',
  ]
  return (
    <div className="ps ps-offer">
      <span className="ps-kicker accent">A imersão</span>
      <h1 className="ps-h1">A Imersão Super Funcionários</h1>
      <p className="ps-sub big">Você sai com os cinco rodando na sua empresa.</p>
      <ul className="ps-inc">
        {inc.map((t, i) => (
          <li key={i} style={{ '--li': i }}><span className="ps-ck">✓</span>{t}</li>
        ))}
      </ul>
      <div className="ps-offer-foot">
        <div className="ps-when">
          <b>3 dias presenciais · São Paulo</b>
          <span>30/07 a 01/08</span>
        </div>
      </div>
    </div>
  )
}

// ── palco do agente (constrói a entrega ao vivo conforme o passo) ─────
function AgentSlide({ id, step, chip, reply, site }) {
  const emp = useMemo(() => EMPLOYEES.find((e) => e.id === id), [id])
  const bodyRef = useRef(null)
  const prevStep = useRef(0)

  useEffect(() => {
    const body = bodyRef.current
    if (!body || step <= prevStep.current) { prevStep.current = step; return }
    prevStep.current = step
    let freshT = 0
    const raf = requestAnimationFrame(() => {
      const reduce = prefersReduced()
      const behavior = reduce ? 'auto' : 'smooth'
      const lp = body.querySelector('.lp-view')
      if (lp) lp.scrollTo({ top: lp.scrollHeight, behavior })
      const blocks = body.querySelectorAll('.sec-block')
      const last = blocks[blocks.length - 1]
      if (!last) return
      const cr = body.getBoundingClientRect()
      const br = last.getBoundingClientRect()
      const fits = br.top >= cr.top - 1 && br.bottom <= cr.bottom + 1
      // offsetTop é coordenada de layout (não-escalada) → correto sob transform: scale
      if (!fits) body.scrollTo({ top: Math.max(0, last.offsetTop - 18), behavior })
      if (!reduce) {
        blocks.forEach((el) => el.classList.remove('is-fresh'))
        last.classList.add('is-fresh')
        freshT = window.setTimeout(() => last.classList.remove('is-fresh'), 1100)
      }
    })
    return () => { cancelAnimationFrame(raf); if (freshT) clearTimeout(freshT) }
  }, [step])

  return (
    <div className="ps-card" style={{ '--accent': emp.color, '--accent-ink': emp.ink, '--win-glow': emp.glow }}>
      <div className="ps-card-head" style={{ borderTopColor: emp.color }}>
        <img src={emp.img} alt="" className="ps-av" style={{ boxShadow: `0 0 0 2px ${emp.color}` }} />
        <div className="ps-head-id">
          <strong>{emp.name}</strong>
          <span className="ps-head-role">{emp.role}</span>
        </div>
        <span className="ps-action" style={{ color: emp.ink, borderColor: emp.color }}>{chip}</span>
      </div>
      <p className="ps-say">{reply}</p>
      <div className="ps-card-body" ref={bodyRef}>
        <PresentationCtx.Provider value={true}>
          <EmployeeContent id={id} accent={emp.color} ink={emp.ink} site={site} step={step} pack={PACK} />
        </PresentationCtx.Provider>
      </div>
    </div>
  )
}

// moldura de "print" estilo navegador (dá ar de prova real)
function NewsFrame({ src, source, alt, ratio = '16 / 10' }) {
  return (
    <figure className="deck-frame">
      <div className="deck-frame-bar">
        <span /><span /><span />
        <span className="deck-frame-url">🔒 {source}</span>
      </div>
      <div className="deck-frame-shot" style={{ aspectRatio: ratio }}>
        <img src={src} alt={alt} />
      </div>
    </figure>
  )
}

// slide de citação (NVIDIA, Karp) — frase grande + atribuição + print opcional
function QuoteSlide({ quote, sub, support, who, role, accent, print, source, photo }) {
  return (
    <div className={`ps ps-quote ${print ? 'has-print' : ''} ${photo ? 'has-photo' : ''}`} style={{ '--accent': accent }}>
      <div className="ps-quote-left">
        <div className="ps-quote-main">
          <span className="ps-qmark" aria-hidden="true">“</span>
          <h1 className="ps-quote-text">{quote}</h1>
          {sub && <p className="ps-quote-sub">{sub}</p>}
          {support && <p className="ps-quote-support">{support}</p>}
          <div className="ps-quote-who">
            <span className="ps-quote-bar" />
            <div><strong>{who}</strong><span>{role}</span></div>
          </div>
        </div>
        {print && (
          <div className="ps-quote-print">
            <NewsFrame src={print} source={source} alt={`Notícia: ${who}`} ratio="1204 / 204" />
          </div>
        )}
      </div>
      {photo && (
        <figure className="ps-quote-photo">
          <img src={photo} alt={who} />
        </figure>
      )}
    </div>
  )
}

// slide "história" com print real ao lado (Hackr Ads, pitaia.ai)
function StorySlide({ eyebrow, title, desc, accent, print, source, ratio, notes }) {
  return (
    <div className="ps ps-story" style={{ '--accent': accent }}>
      <div className="ps-story-text">
        <span className="ps-kicker" style={{ color: accent }}>{eyebrow}</span>
        <h1 className="ps-h1">{title}</h1>
        <p className="ps-sub">{desc}</p>
        {(notes || []).map((n, i) => (
          <div key={i} className="ps-story-note">
            <strong>{n.big}</strong>
            <span>{n.small}</span>
          </div>
        ))}
      </div>
      <div className="ps-story-print">
        <NewsFrame src={print} source={source} alt={title} ratio={ratio} />
      </div>
    </div>
  )
}

function RealizationSlide() {
  return (
    <div className="ps ps-realize">
      <span className="ps-kicker">A virada de chave</span>
      <h1 className="ps-h1">
        Se eu não estudasse de verdade o que dá pra fazer com IA (e o que as maiores empresas já fazem),
        qualquer coisa que eu criasse a IA mataria em <span className="ps-accent6">6 meses</span>.
      </h1>
    </div>
  )
}

const LEVELS = [
  { n: 1, name: 'Conversar', d: 'Você usa ChatGPT ou Claude. Pergunta, ela responde.' },
  { n: 2, name: 'Ensinar', d: 'Dá contexto e skills: ensina a IA a fazer do seu jeito.' },
  { n: 3, name: 'Delegar', d: 'Um agente sai do chat. Você pede e ele executa, não só explica.' },
  { n: 4, name: 'Contratar', d: 'O funcionário de IA. Executa rotinas sozinho: você define o quê e quando, ele faz sempre. É o que as maiores empresas já fazem.', top: true },
]
function LevelsSlide() {
  return (
    <div className="ps ps-levels">
      <div className="ps-levels-main">
        <h1 className="ps-h1">Existem 4 níveis de usar IA</h1>
        <div className="ps-ladder">
          {LEVELS.map((l) => (
            <div key={l.n} className={`ps-level ${l.top ? 'is-top' : ''}`} style={{ '--li': l.n - 1 }}>
              <span className="ps-level-n">{l.n}</span>
              <div className="ps-level-body">
                <strong>{l.name}</strong>
                <span>{l.d}</span>
              </div>
              {l.top && <span className="ps-level-stat">iFood roda <b>9 mil</b></span>}
            </div>
          ))}
        </div>
        <p className="ps-ladder-foot">Os Super Funcionários vivem no nível 4.</p>
      </div>
      <figure className="ps-levels-proof">
        <NewsFrame src="/deck/ifood.webp" source="epocanegocios.globo.com" alt="iFood: 9 mil agentes de IA, 10% no nível mais avançado" ratio="949 / 936" />
      </figure>
    </div>
  )
}

function RewardSlide() {
  return (
    <div className="ps ps-reward">
      <div className="ps-reward-text">
        <span className="ps-kicker" style={{ color: 'var(--c-construtor)' }}>Sua recompensa</span>
        <h1 className="ps-h1">Leve uma amostra de ter um super funcionário.</h1>
        <p className="ps-sub">Não uma IA que responde. Um funcionário que entrega.</p>
        <p className="ps-reward-body">
          De graça, te dou a <b>/human</b>: a skill que criei pra revisar e adaptar qualquer texto seu até
          ele soar gente de verdade, sem a cara de robô que denuncia IA de longe.
        </p>
        <div className="ps-reward-cta">
          <span className="ps-reward-step"><b>1</b> Escaneia o QR e me segue</span>
          <span className="ps-reward-step"><b>2</b> Posta um story desta palestra</span>
          <span className="ps-reward-step"><b>3</b> Me marca: <em>@igorgontjo</em></span>
        </div>
        <p className="ps-reward-foot">Eu te mando a /human no direct.</p>
      </div>
      <div className="ps-reward-qr">
        <div className="ps-qr-card">
          <img src="/deck/qr-instagram.svg" alt="QR code para o Instagram @igorgontjo" />
        </div>
        <span className="ps-qr-handle">@igorgontjo</span>
        <span className="ps-qr-hint">aponte a câmera do celular</span>
      </div>
    </div>
  )
}

// slide só com uma imagem centralizada (ex.: "Is SaaS Dead?")
function ImageSlide({ src, alt }) {
  return (
    <div className="ps ps-image">
      <img src={src} alt={alt} />
    </div>
  )
}

function SlideView({ slide, site }) {
  if (slide.kind === 'agent') {
    return <AgentSlide key={slide.id} id={slide.id} step={slide.step} chip={slide.chip} reply={slide.reply} site={site} />
  }
  if (slide.kind === 'cover') return <CoverSlide site={site} />
  if (slide.kind === 'nvidia') return (
    <QuoteSlide
      accent="#76b900"
      quote="Nos últimos 10 anos, a IA avançou 1 milhão de vezes."
      sub="E fica perto de 10× mais forte a cada ano."
      who="Jensen Huang" role="CEO da NVIDIA"
      print="/deck/jensen.webp" source="tomshardware.com"
      photo="/deck/jensen-photo.webp"
    />
  )
  if (slide.kind === 'karp') return (
    <QuoteSlide
      accent="#2a6b6b"
      quote="A IA não substitui bom gosto."
      support="No tempo da IA, execução virou commodity. Curadoria e julgamento viram o diferencial."
      who="Alex Karp" role="Fundador da Palantir"
      photo="/deck/karp.webp"
    />
  )
  if (slide.kind === 'hackr') return (
    <StorySlide
      accent="#6a3fd0"
      eyebrow="De onde eu venho"
      title="A Hackr Ads foi vendida pra Conta Simples."
      desc="Software de anúncios pra startups, adquirido pela fintech."
      notes={[
        { big: 'R$ 380 milhões/mês em anúncios', small: 'Equivalente a 5% de toda a verba de anúncios online do Brasil na época.' },
        { big: '10.000 clientes ativos por mês. 12 funcionários.', small: 'Foi tecnologia que me deixou atender tanta gente com um time tão enxuto assim. Hoje, a IA faz isso por você.' },
      ]}
      print="/deck/hackr.webp" source="startups.com.br" ratio="1280 / 805"
    />
  )
  if (slide.kind === 'pitaia') return (
    <StorySlide
      accent="#16b364"
      eyebrow="Depois, criei a pitaia.ai"
      title="IA que faz o conteúdo de Instagram do dono de negócio."
      desc="40 minutos criando um post viram 30 segundos. Sem agência, sem esperar ninguém."
      print="/deck/pitaia.webp" source="pitaia.ai" ratio="1280 / 900"
    />
  )
  if (slide.kind === 'lucia') return <ImageSlide src="/deck/lucia.webp" alt="Lúcia, funcionária de IA, criando um post sobre a Havan por chat" />
  if (slide.kind === 'saasdead') return <ImageSlide src="/deck/saas-dead.webp" alt="Satya Nadella: o SaaS morreu?" />
  if (slide.kind === 'realization') return <RealizationSlide />
  if (slide.kind === 'levels') return <LevelsSlide />
  if (slide.kind === 'problem') return <ProblemSlide />
  if (slide.kind === 'team') return <TeamSlide />
  if (slide.kind === 'routines') return <RoutinesSlide />
  if (slide.kind === 'offer') return <OfferSlide />
  if (slide.kind === 'reward') return <RewardSlide />
  return null
}

// notas do apresentador (overlay, tecla N)
function PresNotes({ slide }) {
  const notes = slide.kind === 'agent'
    ? [AGENT_NOTES[slide.id], `Na tela: "${slide.reply}"`]
    : (NARRATIVE_NOTES[slide.kind] || [])
  return (
    <div className="pres-notes" role="note">
      <span className="pres-notes-tag">Notas do apresentador · só você</span>
      <ul>{notes.map((n, i) => <li key={i}>{n}</li>)}</ul>
    </div>
  )
}

// ── Presentation (deck completo) ─────────────────────────────────────
export function Presentation({ site, onExit }) {
  const deck = useMemo(buildDeck, [])
  const total = deck.length
  const [i, setI] = useState(0)
  const [notes, setNotes] = useState(false)
  const [blank, setBlank] = useState(false)
  const [hintOff, setHintOff] = useState(false)
  const [scale, setScale] = useState(1)

  // canvas 16:9 (1280×720) escalado pra preencher a tela — telão de plenária
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const go = useCallback((d) => setI((p) => Math.max(0, Math.min(total - 1, p + d))), [total])

  useEffect(() => {
    const onKey = (e) => {
      const k = e.key
      if (k === 'Escape') { e.preventDefault(); onExit(); return }
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); setBlank(false); go(1); return }
      if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); setBlank(false); go(-1); return }
      if (k === 'Home') { e.preventDefault(); setI(0); return }
      if (k === 'End') { e.preventDefault(); setI(total - 1); return }
      if (k === 'n' || k === 'N') setNotes((v) => !v)
      if (k === 'b' || k === 'B' || k === '.') setBlank((v) => !v)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onExit, total])

  // some com a dica de navegação depois de um tempo
  useEffect(() => {
    const t = setTimeout(() => setHintOff(true), 4200)
    return () => clearTimeout(t)
  }, [])

  const slide = deck[i]
  // chave de "cena": estável dentro de um agente (passos não remontam o palco)
  const sceneKey = slide.kind === 'agent' ? `agent-${slide.id}` : slide.kind
  const sub = useMemo(() => {
    // posição dentro do agente (passo x/total) pro indicador
    if (slide.kind !== 'agent') return null
    const n = SCRIPTS[slide.id].turns.length
    return { cur: slide.step, n }
  }, [slide])

  return (
    <div className="pres" role="region" aria-label="Apresentação Super Funcionários">
      <div className="pres-bg" aria-hidden="true" />
      <div className="pres-stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <div key={sceneKey} className="pres-scene">
          <SlideView slide={slide} site={site} />
        </div>
      </div>

      {blank && <div className="pres-blank" onClick={() => setBlank(false)} />}

      <div className="pres-chrome">
        <button className="pres-btn" onClick={onExit} title="Sair (Esc)" aria-label="Sair da apresentação">✕</button>
        <div className="pres-progress">
          <div className="pres-bar"><span style={{ transform: `scaleX(${(i + 1) / total})` }} /></div>
          <span className="pres-count">{i + 1} / {total}{sub ? ` · passo ${sub.cur}/${sub.n}` : ''}</span>
        </div>
        <button className={`pres-btn ${notes ? 'on' : ''}`} onClick={() => setNotes((v) => !v)} title="Notas (N)" aria-label="Notas do apresentador">N</button>
        <div className="pres-nav">
          <button className="pres-btn" onClick={() => go(-1)} disabled={i === 0} aria-label="Anterior">‹</button>
          <button className="pres-btn" onClick={() => go(1)} disabled={i === total - 1} aria-label="Próximo">›</button>
        </div>
      </div>

      {!hintOff && <div className="pres-hint" aria-hidden="true">Passador / setas avançam · N notas · B tela preta · Esc sai</div>}
      {notes && <PresNotes slide={slide} />}
    </div>
  )
}
