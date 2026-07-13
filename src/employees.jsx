import React from 'react'
import { Section, fmt, BuildBlock } from './chat.jsx'
import { BASE_PACK } from './niches/base.js'
import { safeAccent } from './niches/color.js'
import { SavingsBar, recordArtifact } from './savings.jsx'

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
    name: 'O Construtor',
    role: 'Criativos (design e vídeo) e página no ar',
    code: 'AG.CONSTRUTOR',
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
export const SCRIPTS = BASE_PACK.scripts

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
function Pesquisador({ step = 0, accent, ink, site, pack }) {
  const { persona, dores, medos, desejos, objecoes, schwartz, nivelAtivo, fontes, angulos = [] } = pack.pesquisa

  return (
    <div className="emp pesq">
      <div className="emp-head">
        <div>
          <h2>Pesquisa de mercado</h2>
          <p className="muted">Fonte: {site} · público de empresários high-ticket</p>
        </div>
        {step >= 6
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
          { v: <BuildBlock.Tally to={12480} format={fmt.int} />, l: 'comentários e vídeos lidos' },
          { v: '3 sem → 1 manhã', l: 'tempo de pesquisa' },
          { v: <><BuildBlock.Tally to={2} format={fmt.int} />× CTR</>, l: 'na palavra que o cliente usa' },
        ]} />
        <SectionTitle accent={accent}>Fontes analisadas · 12.480 trechos</SectionTitle>
        <div className="src-list">
          {fontes.map((s, i) => (
            <div key={i} className="src-row" style={{ '--sd': `${(i * 0.07).toFixed(2)}s` }}>
              <span className="src-name">{s.f}</span>
              <span className="src-bar"><span className="src-fill" style={{ transform: `scaleX(${(s.n / fontes[0].n).toFixed(3)})`, background: accent }} /></span>
              <span className="src-n" style={{ color: ink }}><BuildBlock.Tally to={s.n} format={fmt.int} /></span>
            </div>
          ))}
        </div>
      </Section>

      <Section show={step > 1}>
        <SectionTitle accent={accent}>Cliente ideal</SectionTitle>
        <div className="persona" style={{ '--pa': accent }}>
          <div className="persona-av" style={{ background: accent }}>
            {persona.nome[0]}
          </div>
          <div className="persona-body">
            <div className="persona-top">
              <h3><BuildBlock.Line as="span" className="persona-name-line">{persona.nome}</BuildBlock.Line> <span className="persona-age">{persona.idade} anos</span></h3>
              <span className="persona-ctx">{persona.contexto}</span>
            </div>
            <div className="persona-meta">
              <span className="pm"><b style={{ color: ink }}>{persona.fat}</b> {persona.fatLabel}</span>
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
                  <span className="obj-pct" style={{ color: ink }}><BuildBlock.Tally to={o.pct} format={fmt.int} />%</span>
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

      {/* ângulos rankeados por potencial de venda (Onda 3) */}
      {angulos.length > 0 && (
        <Section show={step > 5}>
          <SectionTitle accent={accent}>Ângulos rankeados por potencial de venda</SectionTitle>
          <div className="pa-angles">
            {[...angulos].sort((a, b) => b.score - a.score).map((a, i) => (
              <div key={i} className="pa-row" style={{ '--ad': `${i * 0.07}s` }}>
                <span className="pa-rk" style={{ color: accent }}>{i + 1}</span>
                <div className="pa-main">
                  <div className="pa-head">
                    <span className="pa-nm">{a.nome}</span>
                    <span className="pa-sc" style={{ color: ink }}>{a.score}</span>
                  </div>
                  <div className="pa-track"><span className="pa-fill" style={{ width: `${a.score}%`, background: accent }} /></div>
                  <p className="pa-why">{a.why}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

    </div>
  )
}

// ── 02 · O Redator que Filtra ────────────────────────────────────────
function Redator({ accent, ink, site, step = 0, pack }) {
  const show = (i) => step > i
  const fresh = (i) => step === i + 1

  const { headlineBefore, headlineAfter, lead, bullets, cta, angles, perguntas, funil } = pack.copywriter

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
            <BuildBlock.Line as="p">{headlineAfter}</BuildBlock.Line>
          </div>
        </div>

        <SectionTitle accent={accent}>Anúncio completo</SectionTitle>
        <div className="ad-doc" style={{ '--ac': accent }}>
          <span className="ad-kicker" style={{ color: ink }}>● Anúncio pronto pra subir</span>
          <BuildBlock.Line as="h3" className="ad-h">{headlineAfter}</BuildBlock.Line>
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
                  {fresh(1) ? <BuildBlock.Tally to={a.score} format={fmt.int} /> : a.score}<small>/100</small>
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
                {fresh(3) ? <BuildBlock.Tally to={f.v} format={fmt.int} /> : f.v}
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

// KPI com número quantizado (BB.Tally) ao revelar — codec-friendly no Zoom
function Kpi({ to, label, prefix = '', suffix = '', dec = 0, ink, big }) {
  const format = (n) => prefix + n.toLocaleString('pt-BR', {
    minimumFractionDigits: dec, maximumFractionDigits: dec,
  }) + suffix
  return (
    <div className={`kpi ${big ? 'kpi-big' : ''}`}>
      <div className="kpi-v" style={{ color: ink }}>
        <BuildBlock.Tally to={to} format={format} />
      </div>
      <div className="kpi-l">{label}</div>
    </div>
  )
}

// Linha de ROI: "de X → para Y" (Y quantizado com BB.Tally)
function RoiStat({ from, to, label, prefix = '', suffix = '', dec = 0, ink }) {
  const format = (n) => prefix + n.toLocaleString('pt-BR', {
    minimumFractionDigits: dec, maximumFractionDigits: dec,
  }) + suffix
  return (
    <div className="roi-stat">
      <span className="roi-from">{from}</span>
      <span className="roi-arrow" style={{ color: ink }}>→</span>
      <span className="roi-to" style={{ color: ink }}><BuildBlock.Tally to={to} format={format} /></span>
      <span className="roi-l">{label}</span>
    </div>
  )
}

function Analista({ accent, ink, site, step = 0, pack }) {
  const { FUNNEL, STAGE_COST, TREND, CHANNELS, CREATIVES, PAGE, PAGE_SECTIONS, CONTENT, FINAL, leak, action } = pack.metricas
  const [fired, setFired] = React.useState(false)
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
          {FUNNEL.map((f, i) => {
            const isLeak = leak && f.k === leak.stage
            return (
            <div key={f.k} className={`fn-row fn-row-metr ${isLeak ? 'fn-leak' : ''}`} style={{ '--ac': accent }}>
              <div className="fn-meta">
                <span className="fn-k">{f.k}</span>
                <span className="fn-sub">{f.sub}</span>
              </div>
              <div className="fn-bar-wrap">
                <div
                  className="fn-bar building"
                  style={{ '--w': `${Math.max(f.pct, 6)}%`, '--d': `${i * 70}ms`, background: isLeak ? '#d23b3b' : ink }}
                >
                  <span className="fn-bv">{fmtInt(f.v)}</span>
                </div>
              </div>
              {i > 0 && (
                <span className="fn-conv" style={{ color: isLeak ? '#c0392b' : ink }}>
                  {f.pct}% <i>↘</i>
                </span>
              )}
            </div>
          )})}
        </div>
      </Section>

      {/* 1b · Onde vaza dinheiro + ação que dispara a esteira (Onda 2) */}
      {leak && action && (
        <Section show={step > 1}>
          <div className="leak-grid">
            <div className="leakbox">
              <h4>● Onde vaza dinheiro</h4>
              <div className="leak-lost">− {leak.lostPerMonth} / mês</div>
              <p>{leak.reason} Levar os {leak.actualPct}% pros {leak.expectedPct}% do nicho rende mais venda com a mesma verba.</p>
            </div>
            <div className="actionbox">
              <h4>{action.title}</h4>
              <p className="muted" style={{ fontSize: 12.5 }}>{action.sub}</p>
              <ul className="fix-list">
                {action.items.map((a, i) => (
                  <li key={i}><span className={`who who-${a.who}`}>{a.label}</span><span>{a.text}</span></li>
                ))}
              </ul>
              <div className="fire">
                <button className="chip-mini" onClick={() => setFired(true)} disabled={fired}>
                  {fired ? 'Correção disparada ✓' : 'Disparar correção'}
                </button>
                {fired && (
                  <div className="fired reveal">
                    <span className="klabel-sm">Esteira reiniciada — o Analista chamou os agentes sozinho</span>
                    <div className="fired-row">
                      <span className="fa"><i style={{ background: '#ff4f9a' }} /> Pesquisador ✓</span>
                      <span className="fa"><i style={{ background: '#9b6bff' }} /> Copywriter ✓</span>
                      <span className="fa"><i style={{ background: '#2fd49a' }} /> Rotinas ✓</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Section>
      )}

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
                    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
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
                  ? <><BuildBlock.Tally to={c.roi} format={(n) => fmt.x(n)} /> </>
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
              <span className="pk-v" style={{ color: ink }}><BuildBlock.Tally to={PAGE.conv} format={(n) => fmt.pct(n)} /></span>
              <span className="pk-l">visitante → lead <i>{PAGE.vsBench}</i></span>
            </div>
            <div className="pk">
              <span className="pk-v" style={{ color: ink }}><BuildBlock.Tally to={PAGE.scroll} format={(n) => fmt.pct(n)} /></span>
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
            <BuildBlock.Line as="p" className="vc-tx">Os 5 funcionários rodaram de ponta a ponta: pesquisa → copy → página → conteúdo → este painel. A máquina está medindo sozinha. Daqui é só escalar o que prova.</BuildBlock.Line>
          </div>
        </div>
      </Section>
    </div>
  )
}

// ── 04 · O Construtor ────────────────────────────────────────────────
// Constrói os criativos (designs story/feed + vídeo avatar/voz/legenda) E a
// página (preview escuro real). Três artefatos gated por step (A/B/C).
// Toggle Desktop/Celular funcional. Vidro só no chrome (lp-chrome).

// criativo (story 9:16 / feed 1:1): composição em camadas (fundo + glow + grão
// + copy), com 3 tratamentos visuais reais. Parece anúncio, não wireframe.
function CreativeCard({ cls, fmt, d, tr, fmtKey }) {
  const img = d.images?.[fmtKey]
  // Anúncio SEMPRE com texto por cima. Com imagem real (gpt-image-2) ela vira
  // fundo (+ scrim pra legibilidade) e a copy fica sobreposta; sem imagem, cai
  // na composição CSS. Nunca é imagem pura.
  return (
    <div className={`creative ${cls} ${img ? 'is-real' : `tr-${tr}`}`}>
      {img ? (
        <>
          <img className="cr-real" src={`data:image/png;base64,${img.b64}`} alt={img.alt || `${d.brand}: ${d.hook}`} />
          <div className="cr-scrim" aria-hidden="true" />
        </>
      ) : (
        <>
          <div className="cr-bg" aria-hidden="true" />
          <div className="cr-orb" aria-hidden="true" />
        </>
      )}
      <div className="cr-grain" aria-hidden="true" />
      <span className="cr-fmt">{fmt}</span>
      <div className="cr-inner">
        <span className="cr-brand">{d.brand}</span>
        <h4 className="cr-hook">{d.hook}</h4>
        <p className="cr-sub">{d.sub}</p>
        <span className="cr-cta">{d.cta} <i aria-hidden="true">→</i></span>
      </div>
    </div>
  )
}

const TREATMENTS = [
  { id: 'a', label: 'Gradiente', tone: 'Cor cheia, contraste alto. A versão mais forte.' },
  { id: 'b', label: 'Duotone', tone: 'Clima de foto, premium e sóbrio.' },
  { id: 'c', label: 'Dark neon', tone: 'Minimalista, foco total na frase.' },
]

// artefato Designs: story + feed + troca de tratamento (A/B/C real) + export
function DesignArtifact({ designs }) {
  const [tr, setTr] = React.useState('a')
  const cur = TREATMENTS.find((t) => t.id === tr) || TREATMENTS[0]
  return (
    <div className="design-art reveal">
      <div className="pair">
        <CreativeCard cls="creative--story" fmt={designs.formatos?.[0] || 'STORY · 9:16'} d={designs} tr={tr} fmtKey="story" />
        <CreativeCard cls="creative--feed" fmt={designs.formatos?.[1] || 'FEED · 1:1'} d={designs} tr={tr} fmtKey="feed" />
      </div>
      <div className="vars-side">
        <span className="klabel-sm">Tratamentos</span>
        <div className="vars">
          {TREATMENTS.map((t) => (
            <button key={t.id} className={`vt tr-${t.id} ${tr === t.id ? 'sel' : ''}`}
              onClick={() => setTr(t.id)} aria-pressed={tr === t.id} title={t.label}>
              <span>{t.label[0]}</span>
            </button>
          ))}
        </div>
        <p className="muted" style={{ fontSize: 12.5 }}><b>{cur.label}.</b> {cur.tone}</p>
        <button className="chip-mini" style={{ marginTop: 10 }}>Exportar PNG · 4 formatos</button>
      </div>
    </div>
  )
}

// vídeo: player com legenda palavra a palavra + "como foi montado" + timeline
function VideoArtifact({ video, accent, brand }) {
  const [fmt, setFmt] = React.useState('story')
  const words = (video.caption || '').split(/\s+/).filter(Boolean)
  const [hl, setHl] = React.useState(0)
  React.useEffect(() => {
    if (!words.length) return
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setHl(words.length - 1); return }
    const t = setInterval(() => setHl((h) => (h + 1) % words.length), 380)
    return () => clearInterval(t)
  }, [words.length])
  const wave = [40, 70, 30, 90, 55, 80, 35, 60, 95, 45, 70, 50, 85, 40, 65, 30, 75, 55, 90, 60, 35, 80]
  return (
    <div className="vwrap reveal">
      {/* poster estilo Reel: cena com apresentador estilizado + legenda CapCut */}
      <div className={`player ${fmt === 'feed' ? 'feed' : ''}`}>
        <div className="pl-scene" aria-hidden="true" />
        <div className="pl-figure" aria-hidden="true"><span className="pl-head" /><span className="pl-body" /></div>
        <div className="pl-grain" aria-hidden="true" />
        <span className="pl-brand">{brand}</span>
        <span className="badge"><i className="rec" />0:22</span>
        <div className="cap">
          {words.map((w, i) => (
            <span key={i} className={`w ${i <= hl ? 'on' : ''} ${i === hl ? 'hl' : ''}`}>{w}</span>
          ))}
        </div>
        <div className="pl-bar" aria-hidden="true"><i /></div>
        <button className="play" aria-hidden="true">▶</button>
      </div>
      <div className="vside">
        <span className="klabel-sm">Como foi montado</span>
        <div className="mods">
          {(video.modulos || []).map((m, i) => (
            <div key={i} className="mod"><span className="d" /><span className="nm">{m.nm}</span><span className="by">{m.by}</span></div>
          ))}
        </div>
        <span className="klabel-sm">Timeline ({video.duracao})</span>
        <div className="vtl" style={{ margin: '8px 0 12px' }}>
          <div className="vtl-track">
            {(video.timeline || []).map((t, i) => (
              <div key={i} className="vtl-cell" style={{ flex: t.f }}><span>{t.l}</span></div>
            ))}
          </div>
          <div className="wave">{wave.map((v, i) => <i key={i} style={{ height: `${v}%` }} />)}</div>
        </div>
        <div className="vfmt">
          <span className="klabel-sm">Formato</span>
          <div className="seg">
            {(video.formatos || ['Story 9:16', 'Feed 1:1']).map((f, i) => {
              const key = i === 0 ? 'story' : 'feed'
              return <button key={f} className={fmt === key ? 'on' : ''} onClick={() => setFmt(key)}>{f}</button>
            })}
          </div>
          <button className="chip-mini" style={{ marginLeft: 'auto' }}>Exportar MP4</button>
        </div>
      </div>
    </div>
  )
}

function Construtor({ accent, ink, site, step = 0, pack }) {
  const [device, setDevice] = React.useState('desktop')
  // ao chegar no passo "ver no celular", troca pro mobile sozinho (1×) —
  // no deck ninguém clica no toggle, então sem isso "nada muda"
  const switchedRef = React.useRef(false)
  React.useEffect(() => {
    if (step > 5 && !switchedRef.current) { switchedRef.current = true; setDevice('mobile') }
  }, [step])

  const { designs, video, blocos, ticker, depoimentos, countdown, hero, includes, offer } = pack.construtor

  // identidade visual da landing = cor da marca do cliente (validada p/ tema
  // escuro); se não houver cor utilizável, cai no accent do nicho; senão laranja.
  const light = pack.construtor.theme === 'light' // landing clara segue o site do cliente
  const themed = safeAccent(pack.construtor.brandColor) || safeAccent(pack.accentDefault)
  const la = themed ? themed.accent : accent // acento da landing p/ usos inline
  // no tema claro o realce de texto usa a variante mais escura (contraste no branco)
  const lpVars = themed ? { '--lp-accent': themed.accent, '--lp-accent-2': themed.accent2, '--lp-grad': light ? themed.accent2 : themed.grad } : undefined

  const showDesigns = step > 0  // A · designs do anúncio
  const showVideo = step > 1    // B · vídeo gerado
  const showBlocos = step > 2   // C · estrutura da página
  const showHero = step > 2
  const showProva = step > 3
  const showOferta = step > 4
  const showMobile = step > 5   // turn "ver no celular" libera o toggle
  const showPublicado = step > 6

  const dev = showMobile ? device : 'desktop'

  return (
    <div className="emp build" style={{ '--accent': accent, '--accent-ink': ink }}>
      <div className="emp-head">
        <div>
          <h2>O Construtor</h2>
          <p className="muted">Criativos e página a partir de {site}</p>
        </div>
        <Pill ink={ink}>{showPublicado ? 'No ar' : 'Montando…'}</Pill>
      </div>

      {/* A · DESIGNS do anúncio */}
      <section className="sec-block cnv-block">
        <span className="block-tab"><span className="b">A</span> Designs do anúncio</span>
        {showDesigns
          ? <DesignArtifact designs={designs} />
          : <div className="blk-empty">Aplico a copy do anúncio em story 9:16 e feed 1:1.</div>}
      </section>

      {/* B · VÍDEO gerado e editado */}
      <section className="sec-block cnv-block">
        <span className="block-tab"><span className="b">B</span> Vídeo gerado e editado</span>
        {showVideo
          ? <VideoArtifact video={video} accent={accent} brand={designs.brand} />
          : <div className="blk-empty">Avatar (HeyGen) + voz (ElevenLabs) + legenda palavra a palavra.</div>}
      </section>

      {/* C · PÁGINA publicada */}
      <span className="block-tab"><span className="b">C</span> Página publicada</span>
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

          <div className={`lp dev-${dev} ${light ? 'is-light' : ''}`} style={lpVars}>
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
                    {hero.badge.map((b, i) => i
                      ? <React.Fragment key={i}><i>·</i>{b}</React.Fragment>
                      : <React.Fragment key={i}>{b}</React.Fragment>)}
                  </span>
                  <p className="lp-pre">{hero.pre}</p>
                  {hero.showAvatars && (
                    <div className="lp-avatars" aria-hidden="true">
                      {['pesquisa', 'copywriter', 'metricas', 'construtor', 'conteudo'].map((a, i) => (
                        <img key={a} src={`/agentes/${a}.png`} alt="" style={{ '--ai': i }} />
                      ))}
                    </div>
                  )}
                  <h1 className="lp-h1">
                    {showHero && step === 3
                      ? <BuildBlock.Line as="span" className="lp-h1-line">{hero.h1Typed}</BuildBlock.Line>
                      : <>{hero.h1Pre}<span className="lp-grad">{hero.h1Grad}</span>{hero.h1Post}</>}
                  </h1>
                  <p className="lp-sub">{hero.sub}</p>
                  <div className="lp-cta-row">
                    <button className="lp-cta">{hero.cta} <span aria-hidden="true">→</span></button>
                    <span className="lp-cta-note">{hero.ctaNote}</span>
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
                          <span className="lp-q-av" style={{ background: `linear-gradient(135deg, ${la}, ${themed ? themed.accent2 : '#ff3b30'})` }}>
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
                  <span className="lp-eyebrow">{offer.eyebrow}</span>
                  <h2 className="lp-offer-h">{offer.hPre}<span className="lp-grad">{offer.hGrad}</span>{offer.hPost}</h2>
                  <ul className="lp-includes">
                    {includes.map((t, i) => (
                      <li key={i} style={{ '--ri': i }}><span className="lp-ck" style={{ color: la }}>✓</span>{t}</li>
                    ))}
                  </ul>

                  <div className="lp-countdown">
                    <div className="lp-cd-top">
                      <span className="lp-cd-lab">{offer.cdLab}</span>
                      <span className="lp-cd-when">{offer.cdWhen}</span>
                    </div>
                    <div className="lp-cd-units">
                      {countdown.map((c, i) => (
                        <div key={i} className="lp-cd-u"><b>{c.v}</b><span>{c.l}</span></div>
                      ))}
                    </div>
                    <p className="lp-cd-foot">{offer.cdFoot}</p>
                  </div>

                  <div className="lp-guarantee">
                    <span className="lp-shield" aria-hidden="true">🛡</span>
                    <div>
                      <b>{offer.guaranteeTitle}</b>
                      <span>{offer.guaranteeText}</span>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* barra de publicação */}
          {showPublicado && (
            <div className="publish-bar reveal" style={{ borderColor: la }}>
              <span className="pub-dot" style={{ background: la, boxShadow: `0 0 10px ${la}` }} />
              <div className="pub-text">
                <b style={{ color: ink }}>Publicado · no ar em 24h</b>
                <span className="pub-checks">
                  <i>✓ domínio</i><i>✓ pixel</i><i>✓ formulário no funil</i><i>✓ SSL</i>
                </span>
              </div>
              <a className="pub-link" style={{ borderColor: la, color: la }} href={`https://${site}`} onClick={(e) => e.preventDefault()}>
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
function FeedPreview({ accent, ink, caption, tags, type, igUser, img }) {
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
            <span className="ig-user">{igUser}</span>
            <span className="ig-loc">Publicação · perfil</span>
          </div>
          <span className="ig-more">⋯</span>
        </div>
        {img ? (
          <div className="ig-media ig-real" style={{ '--accent': accent }}>
            <img src={`data:image/png;base64,${img.b64}`} alt={img.alt || firstLine} />
            <span className="igp-tag">{type === 'Reels' ? '▶ Reels' : 'Publicação'}</span>
          </div>
        ) : (
          <div className="ig-media ig-poster" style={{ '--accent': accent }}>
            <span className="igp-bg" aria-hidden="true" />
            <span className="igp-orb" aria-hidden="true" />
            <span className="igp-glyph" aria-hidden="true">{(igUser || '★').trim().charAt(0).toUpperCase()}</span>
            <span className="igp-grain" aria-hidden="true" />
            <span className="igp-scrim" aria-hidden="true" />
            <p className="igp-hook">{firstLine}</p>
            <span className="igp-tag">{type === 'Reels' ? '▶ Reels' : 'Publicação'}</span>
          </div>
        )}
        <div className="ig-actions">
          <span className="ig-ic">♡</span><span className="ig-ic">💬</span><span className="ig-ic">➦</span>
          <span className="ig-save">⬚</span>
        </div>
        <div className="ig-likes">2.4 mil curtidas</div>
        <div className="ig-caption">
          <b>{igUser}</b> {firstLine} <span className="ig-more-txt">… mais</span>
        </div>
        <div className="ig-tags">{tags.slice(0, 4).join(' ')}</div>
        <div className="ig-time">HÁ 2 HORAS</div>
      </div>
    </div>
  )
}

function CriadorDeConteudo({ accent, ink, step = 0, pack }) {
  const { igUser, pilares, ganchos, dias, posts, legenda, tags, reels } = pack.conteudo

  const open = posts[0]

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
          <span className="insight-v" style={{ color: ink }}><BuildBlock.Tally to={4} format={fmt.int} /></span>
          <span className="insight-l">pilares de conteúdo</span>
        </div>
        <div className="insight">
          <span className="insight-v" style={{ color: ink }}><BuildBlock.Tally to={30} format={fmt.int} /></span>
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
                    {has(0) ? <BuildBlock.Tally to={p.share} format={fmt.int} /> : p.share}%
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
                <BuildBlock.Line as="p" className="hook-txt">{g.txt}</BuildBlock.Line>
                <div className="hook-meta">
                  <span className="hook-pilar" style={{ borderColor: accent, color: ink }}>{g.pilar}</span>
                  <span className="hook-ret">
                    <span className="hook-ret-track">
                      <span className={`hook-ret-fill ${has(1) ? 'building' : ''}`}
                            style={{ width: `${g.ret}%`, background: accent }} />
                    </span>
                    <b style={{ color: ink }}>{has(1) ? <BuildBlock.Tally to={g.ret} format={fmt.int} /> : g.ret}%</b> retenção est.
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
                <div className="cal-thumb" style={{ background: accent }}>
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
            <BuildBlock.Line className="pd-text">{legenda}</BuildBlock.Line>
            <div className="pd-label">Hashtags</div>
            <div className="pd-tags">
              {tags.map((t, i) => (
                <span key={i} className="hashtag" style={{ '--hi': i }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <SectionTitle accent={accent}>Como vai aparecer no feed</SectionTitle>
        <FeedPreview accent={accent} ink={ink} caption={legenda} tags={tags} type={open.tipo} igUser={igUser} img={open.img} />
        <SectionTitle accent={accent}>Seu feed enchendo no mês</SectionTitle>
        <div className="ig-profile-grid" style={{ '--bb-accent': accent }}>
          <BuildBlock.Grid
            waves={3}
            cadence={620}
            tiles={Array.from({ length: 9 }, (_, i) => ({
              id: i,
              label: pilares[i % pilares.length].ic,
              src: posts[i]?.img ? `data:image/png;base64,${posts[i].img.b64}` : null,
              alt: posts[i]?.txt,
            }))}
          />
          <p className="grid-hint muted">30 posts na fila · 3 ondas de 3 · clique pra preencher tudo</p>
        </div>
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

// ── Economia por agente (quanto cada um substitui) ───────────────────
// money/hours somam UMA vez quando o agente entrega o 1º artefato (dedup por
// id no savings store). eq = equivalência mostrada na faixa daquele agente.
const SAVE = {
  pesquisa: { money: 8200, hours: 38, eq: 'uma pesquisa de agência: R$ 8.000 e 2 semanas' },
  copywriter: { money: 5400, hours: 26, eq: 'um redator sênior dedicado, sem o salário' },
  construtor: { money: 13000, hours: 86, eq: 'designer + editor + dev: 3 contratações num agente' },
  conteudo: { money: 4200, hours: 40, eq: 'um social media inteiro, no piloto automático' },
  metricas: { money: 4000, hours: 30, eq: 'um analista de dados lendo o funil todo dia' },
}

function agentPanel({ id, accent, ink, site, step, pack }) {
  switch (id) {
    case 'pesquisa': return <Pesquisador accent={accent} ink={ink} site={site} step={step} pack={pack} />
    case 'copywriter': return <Redator accent={accent} ink={ink} site={site} step={step} pack={pack} />
    case 'metricas': return <Analista accent={accent} ink={ink} site={site} step={step} pack={pack} />
    case 'construtor': return <Construtor accent={accent} ink={ink} site={site} step={step} pack={pack} />
    case 'conteudo': return <CriadorDeConteudo accent={accent} ink={ink} step={step} pack={pack} />
    default: return null
  }
}

// ── Roteador de conteúdo por funcionário + esteira + contador ─────────
export function EmployeeContent({ id, accent, ink, site, step = 0, pack, onOpenAgent }) {
  const save = SAVE[id]
  // ao entregar o 1º artefato (step>=1), credita a economia do agente (1×)
  const produced = step >= 1
  React.useEffect(() => {
    if (produced && save) recordArtifact(id, save.money, save.hours)
  }, [produced, id]) // eslint-disable-line react-hooks/exhaustive-deps

  const i = EMPLOYEES.findIndex((e) => e.id === id)
  const next = i >= 0 && i < EMPLOYEES.length - 1 ? EMPLOYEES[i + 1] : null
  const nextLabel = next ? next.name.replace(/^O\s+/, '') : ''

  const panel = agentPanel({ id, accent, ink, site, step, pack })
  if (!panel) return null

  return (
    <>
      {panel}
      <div className="emp-foot" style={{ '--accent': accent, '--accent-ink': ink }}>
        <SavingsBar eq={save?.eq} />
        {next && onOpenAgent && (
          <div className="esteira">
            <button className="esteira__send" onClick={() => onOpenAgent(next.id)}>
              Enviar pro {nextLabel} →
            </button>
            <span className="esteira__note">Não são 5 chats: é uma esteira. Um alimenta o próximo.</span>
          </div>
        )}
      </div>
    </>
  )
}
