import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext } from 'react'

// Em modo apresentação as seções respeitam o passo EXATO (avança revela,
// volta esconde) — pro passador de slides funcionar nos dois sentidos.
export const PresentationCtx = React.createContext(false)

// Modo demo (screen-share do Zoom): mata typewriter char-a-char, rAF de scroll e
// micro-movimento. Provido lá no App; lido por render onde precisa cravar frame.
export const ZoomCtx = React.createContext(false)

// reduced-motion lido por render (barato); mesmo padrão do App.jsx
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ── <Typewriter> ─────────────────────────────────────────────────────
// Digita char a char. Determinístico (sem random). rAF com cleanup.
// reduced-motion = texto inteiro de imediato. onDone dispara 1× por run.
export function Typewriter({
  text = '', msPerChar = 14, minMs = 260, maxMs = 1700,
  className, onDone, as: Tag = 'span', caret = true,
}) {
  const zoom = useContext(ZoomCtx)
  const instant = prefersReduced() || zoom // Modo demo: texto inteiro, sem char-a-char
  const [count, setCount] = useState(instant ? text.length : 0)
  const doneRef = useRef(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    doneRef.current = false
    if (instant || !text) {
      setCount(text.length)
      onDoneRef.current?.()
      return
    }
    setCount(0)
    const total = Math.min(maxMs, Math.max(minMs, text.length * msPerChar))
    let raf = 0
    let start = 0
    const tick = (now) => {
      if (!start) start = now
      const p = Math.min(1, (now - start) / total)
      const eased = 1 - Math.pow(1 - p, 4) // easeOutQuart
      setCount(Math.round(eased * text.length))
      if (p < 1) raf = requestAnimationFrame(tick)
      else if (!doneRef.current) { doneRef.current = true; onDoneRef.current?.() }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, msPerChar, minMs, maxMs, instant])

  const shown = text.slice(0, count)
  const typing = !instant && count < text.length
  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden={!instant}>{shown}</span>
      {caret && typing && <span className="tw-caret" aria-hidden="true" />}
    </Tag>
  )
}

// ── <CountUp> ────────────────────────────────────────────────────────
export function CountUp({
  to = 0, from = 0, durationMs = 900, format = (n) => String(Math.round(n)),
  className, as: Tag = 'span',
}) {
  const reduce = prefersReduced()
  const [val, setVal] = useState(reduce ? to : from)

  useEffect(() => {
    if (reduce) { setVal(to); return }
    let raf = 0, start = 0
    const tick = (now) => {
      if (!start) start = now
      const p = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - p, 4)
      setVal(from + (to - from) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(to)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, from, durationMs, reduce])

  return <Tag className={className}>{format(val)}</Tag>
}

// formatos PT-BR — Intl memoizado (não reconstrói por frame no CountUp)
const NF_INT = new Intl.NumberFormat('pt-BR')
const NF_2 = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
export const fmt = {
  int: (n) => NF_INT.format(Math.round(n)),
  brl: (n) => 'R$ ' + NF_INT.format(Math.round(n)),
  brlc: (n) => 'R$ ' + NF_2.format(n),
  x: (n) => n.toFixed(n < 10 ? 1 : 0).replace('.', ',') + '×',
  pct: (n) => Math.round(n) + '%',
}

// ── <Section> ── revela a seção quando show vira true; nunca volta atrás
export function Section({ show, className = '', children }) {
  const presenting = useContext(PresentationCtx)
  const [revealed, setRevealed] = useState(show)
  useEffect(() => { if (show) setRevealed(true) }, [show])
  // .sec-block marca os blocos gated por step → a janela rola até o mais novo
  // apresentação: honra o passo exato (some ao voltar); demais: revela-uma-vez
  if (presenting) return show ? <div className={`reveal sec-block ${className}`}>{children}</div> : null
  if (!revealed) return null
  return <div className={`reveal sec-block ${className}`}>{children}</div>
}

// ════════════════════════════════════════════════════════════════════
//  <BuildBlock> · a primitiva única dos 5 outputs (linguagem de "build")
//  Máquina de 4 estados idle→skeleton→fill→locked. Troca a gramática de
//  movimento (typewriter/rAF/scaleX/glow) por uma que o codec H.264 do Zoom
//  encoda limpo: reveal de linha inteira, número quantizado, barra com snap-lock,
//  borda sólida de conclusão. Cada `hold` vira frame de bitrate quase zero.
//  Fase 0: a primitiva + sub-componentes existem e são testáveis. NÃO aplicada
//  aos 5 ainda — nada visual muda pros funcionários nesta fase.
// ════════════════════════════════════════════════════════════════════

// stops do build: 5 frames discretos (0/40/70/90/100%), último cravado
export const BUILD_STOPS = [0, 0.4, 0.7, 0.9, 1]

// valores quantizados do <Tally> — puro e testável. O último é exatamente `to`
// (cravado), então o número nunca para num valor errado mesmo se um tick cair.
export function tallyValues(to, from = 0) {
  const last = BUILD_STOPS.length - 1
  return BUILD_STOPS.map((s, i) => (i === last ? to : from + (to - from) * s))
}

// máquina de estados do build — pura e testável. `locked` é terminal: nenhuma
// turn futura re-anima o bloco.
export function buildReducer(state, action) {
  switch (action.type) {
    case 'START': return state === 'idle' ? 'skeleton' : state
    case 'FILL':  return state === 'skeleton' ? 'fill' : state
    case 'LOCK':  return state === 'fill' ? 'locked' : state
    case 'SNAP':  return 'locked' // reduced-motion / prioriza framerate
    default: return state
  }
}

// classe de estado do bloco — pura e testável
export function buildClass(phase) {
  return `bb is-${phase}`
}

// agenda de ondas da grade — pura e testável. Devolve a contagem cumulativa de
// tiles visíveis ao fim de cada onda. Ex.: 9 tiles em 3 ondas → [3, 6, 9].
export function gridWaveCounts(total, waves) {
  const per = Math.max(1, Math.ceil(total / Math.max(1, waves)))
  const out = []
  for (let w = 1; (w - 1) * per < total; w++) out.push(Math.min(total, w * per))
  return out
}

// timeline por beat (~1,4s, dentro do range travado 1,2–1,8s)
const BB_T = { skeleton: 280, fill: 420, hold: 600, lock: 200 }

// fila sequencial: cada <BuildBlock beat={n}> só inicia quando o anterior travou.
// 1 foco por beat (não stagger paralelo). Sem provider → o bloco libera de imediato.
const BuildSeqCtx = React.createContext(null)
const BBPhaseCtx = React.createContext('idle')

export function BuildSequence({ children }) {
  const [activeBeat, setActiveBeat] = useState(0)
  const advance = useCallback((beat) => setActiveBeat((b) => Math.max(b, beat + 1)), [])
  const value = useMemo(() => ({ activeBeat, advance }), [activeBeat, advance])
  return <BuildSeqCtx.Provider value={value}>{children}</BuildSeqCtx.Provider>
}

export function BuildBlock({ beat = 0, className = '', children, onLocked, as: Tag = 'div' }) {
  const seq = useContext(BuildSeqCtx)
  const reduce = prefersReduced()
  const [phase, dispatch] = useReducer(buildReducer, 'idle')
  const ref = useRef(null)
  const startedRef = useRef(false)
  const cbRef = useRef(onLocked); cbRef.current = onLocked
  // beat liberado pela fila? (sem fila → sempre liberado)
  const myTurn = !seq || seq.activeBeat >= beat

  useEffect(() => {
    if (!myTurn || startedRef.current) return
    startedRef.current = true
    if (reduce) { // sem movimento: vai direto pro locked e libera o próximo
      dispatch({ type: 'SNAP' }); seq?.advance(beat); cbRef.current?.()
      return
    }
    dispatch({ type: 'START' }) // → skeleton
    const t1 = setTimeout(() => dispatch({ type: 'FILL' }), BB_T.skeleton)
    const t2 = setTimeout(() => dispatch({ type: 'LOCK' }), BB_T.skeleton + BB_T.fill + BB_T.hold)
    const t3 = setTimeout(() => { seq?.advance(beat); cbRef.current?.() },
      BB_T.skeleton + BB_T.fill + BB_T.hold + BB_T.lock)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myTurn])

  // will-change só enquanto preenche (a fila adiciona e remove); no lock some, pra
  // não deixar camada órfã viva que derruba o framerate nos holds.
  const willChange = phase === 'fill' ? 'opacity, transform' : 'auto'

  return (
    <BBPhaseCtx.Provider value={phase}>
      <Tag ref={ref} className={`${buildClass(phase)} ${className}`} style={{ willChange }}>
        {children}
      </Tag>
    </BBPhaseCtx.Provider>
  )
}

// ── sub-componentes: mesma primitiva, garantem a consistência dos 5 ──
// Todos leem o estado do bloco (BBPhaseCtx) e a cor do cliente via --bb-accent
// /--bb-ink/--bb-bone do contexto CSS. A curva é sempre --e-quart.

// texto/headline brandado: reveal de linha inteira (bone→ink), nunca char-a-char.
// Lê o estado do bloco: só fica "bone" durante o skeleton; fora dele (ou solto,
// sem BuildBlock em volta) renderiza em ink já legível.
function BBLine({ children, className = '', as: Tag = 'div' }) {
  const phase = useContext(BBPhaseCtx)
  const bone = phase === 'skeleton'
  return <Tag className={`bb-line ${bone ? 'is-bone' : 'is-ink'} ${className}`}>{children}</Tag>
}

// barras com snap-lock: cresce a 80%, hold, trava (sem scaleX sub-pixel, sem glow)
function BBBars({ rows = [], className = '' }) {
  const phase = useContext(BBPhaseCtx)
  const on = phase === 'fill' || phase === 'locked'
  return (
    <div className={`bb-bars ${className}`}>
      {rows.map((r, i) => (
        <div className="bb-bar-row" key={r.id ?? i}>
          {r.label && <span className="bb-bar-k">{r.label}</span>}
          <div className="bb-bar-track">
            <span className="bb-bar-fill" style={{ '--bb-pct': `${on ? r.pct : 0}%` }} />
          </div>
          {r.value != null && <span className="bb-bar-v">{r.value}</span>}
        </div>
      ))}
    </div>
  )
}

// número quantizado: setInterval 110ms, 5 ticks, final cravado (substitui CountUp rAF)
function BBTally({ to, from = 0, format = (n) => String(Math.round(n)), className, as: Tag = 'span' }) {
  const reduce = prefersReduced()
  const steps = useMemo(() => tallyValues(to, from), [to, from])
  const [idx, setIdx] = useState(reduce ? steps.length - 1 : 0)
  useEffect(() => {
    if (reduce) { setIdx(steps.length - 1); return }
    setIdx(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      setIdx(i)
      if (i >= steps.length - 1) clearInterval(id)
    }, 110)
    return () => clearInterval(id)
  }, [steps, reduce])
  return <Tag className={`bb-tally ${className || ''}`}>{format(steps[Math.min(idx, steps.length - 1)])}</Tag>
}

// troca o placeholder (caixa cinza com selo do nicho) pelo artefato brandado
function BBImage({ src, alt = '', fallbackNiche, className = '' }) {
  const phase = useContext(BBPhaseCtx)
  const ready = (phase === 'fill' || phase === 'locked') && src
  return (
    <div className={`bb-img ${ready ? 'is-ready' : 'is-bone'} ${className}`}>
      {ready
        ? <img src={src} alt={alt} className="bb-img-real" />
        : <span className="bb-img-seal" aria-hidden="true">{fallbackNiche || ''}</span>}
    </div>
  )
}

// popula tile a tile em ondas (não 9 de uma vez); "preencher tudo" antecipa o resto
function BBGrid({ tiles = [], waves = 3, cadence = 600, className = '' }) {
  const reduce = prefersReduced()
  const total = tiles.length
  const schedule = useMemo(() => gridWaveCounts(total, waves), [total, waves])
  const [shown, setShown] = useState(reduce ? total : 0)
  const fillAll = useCallback(() => setShown(total), [total])
  useEffect(() => {
    if (reduce) { setShown(total); return }
    setShown(0)
    let w = 0
    const id = setInterval(() => {
      setShown(schedule[Math.min(w, schedule.length - 1)])
      w += 1
      if (w >= schedule.length) clearInterval(id)
    }, cadence)
    return () => clearInterval(id)
  }, [schedule, total, cadence, reduce])
  return (
    <div className={`bb-grid ${className}`} onClick={fillAll}>
      {tiles.map((t, i) => {
        const on = i < shown
        const branded = on && !t.src // tile mockup brandado (cor do cliente + selo)
        return (
          <div className={`bb-tile ${on ? 'is-on' : 'is-bone'} ${branded ? 'is-branded' : ''}`} key={t.id ?? i}>
            {on && (t.src
              ? <img src={t.src} alt={t.alt || ''} />
              : <span className="bb-tile-seal" aria-hidden="true">{t.label || ''}</span>)}
          </div>
        )
      })}
    </div>
  )
}

// agrupa os sub-componentes sob BuildBlock.* (mesma primitiva, leitura única)
BuildBlock.Line = BBLine
BuildBlock.Bars = BBBars
BuildBlock.Tally = BBTally
BuildBlock.Image = BBImage
BuildBlock.Grid = BBGrid

// ════════════════════════════════════════════════════════════════════
//  MOTOR DA CONVERSA · useAgentChat(script)
// ════════════════════════════════════════════════════════════════════
const THINK_MS = 720 // determinístico

function chatReducer(state, action) {
  switch (action.type) {
    case 'PICK': {
      const turn = state.script.turns[state.step]
      if (!turn || state.phase !== 'idle') return state
      const userId = state.seq
      let messages = [...state.messages, { id: userId, role: 'user', text: turn.chip }]
      let seq = state.seq + 1
      // tarefa que exige integração → card de conexão inline antes da resposta
      if (turn.connect) {
        const connectId = seq
        messages = [...messages, { id: connectId, role: 'connect', connect: turn.connect }]
        seq += 1
        return { ...state, phase: 'awaiting', pendingConnectId: connectId, messages, seq }
      }
      return { ...state, phase: 'thinking', messages, seq }
    }
    case 'CONNECTED': {
      if (state.phase !== 'awaiting') return state
      return { ...state, phase: 'thinking', pendingConnectId: null }
    }
    case 'THOUGHT': {
      if (state.phase !== 'thinking') return state
      const turn = state.script.turns[state.step]
      return {
        ...state, phase: 'streaming', streamingId: state.seq,
        messages: [...state.messages, { id: state.seq, role: 'agent', text: turn.reply, streaming: true }],
        seq: state.seq + 1,
      }
    }
    case 'STREAM_DONE': {
      if (state.phase !== 'streaming') return state
      return {
        ...state, phase: 'idle', step: state.step + 1, streamingId: null,
        messages: state.messages.map((m) => (m.id === state.streamingId ? { ...m, streaming: false } : m)),
      }
    }
    default: return state
  }
}

function init(script) {
  return {
    script, phase: 'idle', step: 0, seq: 1, streamingId: null, pendingConnectId: null,
    messages: [{ id: 0, role: 'agent', text: script.greeting, streaming: false }],
  }
}

export function useAgentChat(script) {
  const [state, dispatch] = useReducer(chatReducer, script, init)

  useEffect(() => {
    if (state.phase !== 'thinking') return
    const t = setTimeout(() => dispatch({ type: 'THOUGHT' }), prefersReduced() ? 0 : THINK_MS)
    return () => clearTimeout(t)
  }, [state.phase, state.step])

  const pickChip = useCallback(() => dispatch({ type: 'PICK' }), [])
  const onStreamDone = useCallback(() => dispatch({ type: 'STREAM_DONE' }), [])
  const onConnected = useCallback(() => dispatch({ type: 'CONNECTED' }), [])

  const chips = useMemo(() => {
    if (state.phase !== 'idle') return []
    const turn = state.script.turns[state.step]
    return turn ? [{ id: state.step, label: turn.chip }] : []
  }, [state.phase, state.step, state.script])

  return {
    messages: state.messages,
    step: state.step,
    thinking: state.phase === 'thinking',
    streamingId: state.streamingId,
    pendingConnectId: state.pendingConnectId,
    chips,
    pickChip,
    onStreamDone,
    onConnected,
  }
}

// ════════════════════════════════════════════════════════════════════
//  MOTOR DA CONVERSA AO VIVO · useLiveChat
//  Manda o texto pro /api/chat (Claude Sonnet) e recebe { text, images }.
//  Papel 'image' = balão com a imagem gerada. Histórico no formato Anthropic.
// ════════════════════════════════════════════════════════════════════
export function useLiveChat({ empId, siteCtx, pack, greeting }) {
  const [messages, setMessages] = useState(() => [{ id: 0, role: 'agent', text: greeting || 'Oi. Como posso ajudar?', streaming: false }])
  const [busy, setBusy] = useState(false)
  const seq = useRef(1)
  const histRef = useRef([]) // [{ role:'user'|'assistant', content:string }]

  const send = useCallback(async (text) => {
    const t = (text || '').trim()
    if (!t || busy) return
    const uid = seq.current++
    setMessages((m) => [...m, { id: uid, role: 'user', text: t }])
    setBusy(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ empId, history: histRef.current, userText: t, vars: siteCtx, pack }),
      }).then((r) => r.json())
      const reply = res.text || 'Feito.'
      histRef.current = [...histRef.current, { role: 'user', content: t }, { role: 'assistant', content: reply }].slice(-12)
      setMessages((m) => [...m, { id: seq.current++, role: 'agent', text: reply, streaming: true }])
      ;(res.images || []).forEach((img) => setMessages((m) => [...m, { id: seq.current++, role: 'image', img }]))
    } catch {
      setMessages((m) => [...m, { id: seq.current++, role: 'agent', text: 'Não consegui responder agora. Tenta de novo?', streaming: false }])
    } finally {
      setBusy(false)
    }
  }, [empId, siteCtx, pack, busy])

  return { messages, busy, send }
}

// ════════════════════════════════════════════════════════════════════
//  ConnectCard · card de integração inline (estilo OAuth) dentro do chat
//  contrato connect: { prompt, items:[ {id,label,mono,color}
//                       | {id,label,options:[{id,label,mono,color}]} ] }
// ════════════════════════════════════════════════════════════════════
function ConnectCard({ connect, active, onConnected }) {
  const [st, setSt] = useState({}) // { [itemId]: { chosen, status:'connecting'|'done' } }
  const doneRef = useRef(false)

  const connectItem = (item, optId) => {
    const cur = st[item.id]?.status
    if (cur === 'connecting' || cur === 'done') return
    setSt((s) => ({ ...s, [item.id]: { chosen: optId, status: 'connecting' } }))
    const delay = prefersReduced() ? 0 : 1000
    setTimeout(() => setSt((s) => ({ ...s, [item.id]: { chosen: optId, status: 'done' } })), delay)
  }

  // quando todos os itens estão conectados → libera o agente a continuar (1×)
  useEffect(() => {
    if (!active || doneRef.current) return
    if (connect.items.every((it) => st[it.id]?.status === 'done')) {
      doneRef.current = true
      onConnected?.()
    }
  }, [st, active, connect, onConnected])

  const Badge = (m, color) => <span className="cc-mono" style={{ background: color }}>{m}</span>

  return (
    <div className="bubble agent connect-bubble reveal">
      <div className="connect-card">
        <p className="cc-prompt">{connect.prompt}</p>
        {connect.items.map((item) => {
          const s = st[item.id] || { status: 'idle' }
          if (item.options) {
            return (
              <div key={item.id} className="cc-item">
                <span className="cc-label">{item.label}</span>
                <div className="cc-opts">
                  {item.options.map((o) => {
                    const chosen = s.chosen === o.id
                    return (
                      <button
                        key={o.id}
                        type="button"
                        className={`cc-opt ${chosen ? 'is-' + s.status : ''} ${s.status !== 'idle' && !chosen ? 'is-dim' : ''}`}
                        disabled={s.status !== 'idle'}
                        onClick={() => connectItem(item, o.id)}
                      >
                        {Badge(o.mono, o.color)}
                        <span className="cc-opt-label">{o.label}</span>
                        {chosen && s.status === 'connecting' && <span className="cc-spin" aria-hidden="true" />}
                        {chosen && s.status === 'done' && <span className="cc-ok" aria-hidden="true">✓</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          }
          return (
            <button
              key={item.id}
              type="button"
              className={`cc-prov is-${s.status}`}
              disabled={s.status !== 'idle'}
              onClick={() => connectItem(item, item.id)}
            >
              {Badge(item.mono, item.color)}
              <span className="cc-prov-label">
                {s.status === 'idle' && <>Conectar {item.label}</>}
                {s.status === 'connecting' && 'Conectando…'}
                {s.status === 'done' && <>{item.label} conectado</>}
              </span>
              {s.status === 'connecting' && <span className="cc-spin" aria-hidden="true" />}
              {s.status === 'done' && <span className="cc-ok" aria-hidden="true">✓</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// motor de produção visível (Onda 2): ferramentas que "rodam" enquanto o agente
// pensa — nomeia o trabalho real (HeyGen, ElevenLabs, cruzando reviews…).
const PRODUCE_STEPS = {
  pesquisa: ['lendo o site', 'cruzando reviews e concorrentes', 'extraindo dores reais', 'rankeando ângulos'],
  copywriter: ['lendo a pesquisa', 'escrevendo 4 ângulos', 'prevendo o CTR', 'montando o formulário'],
  construtor: ['aplicando a copy', 'gerando os designs', 'avatar HeyGen + voz ElevenLabs', 'legenda e corte ffmpeg'],
  conteudo: ['lendo os pilares', 'gerando ganchos', 'montando o calendário', 'escrevendo o roteiro'],
  metricas: ['conectando pixel e CRM', 'montando o funil', 'calculando CAC e ROAS', 'achando onde vaza'],
}
function ProduceLog({ id }) {
  const steps = PRODUCE_STEPS[id] || []
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!steps.length || prefersReduced()) return
    const t = setInterval(() => setI((v) => (v + 1) % steps.length), 480)
    return () => clearInterval(t)
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!steps.length) return null
  return <span className="produce-log">▸ {steps[i]}…</span>
}

// ════════════════════════════════════════════════════════════════════
//  ChatPanel · painel de vidro flutuante à direita
// ════════════════════════════════════════════════════════════════════
export function ChatPanel({ emp, chat, nextAgent, onNext, siteCtx, pack }) {
  const { messages, thinking, chips, pickChip, streamingId, onStreamDone, pendingConnectId, onConnected } = chat
  const zoom = useContext(ZoomCtx)
  const scrollRef = useRef(null)
  const chipRef = useRef(null)
  const inputRef = useRef(null)
  const prevStream = useRef(null)
  const [announce, setAnnounce] = useState('') // região sr-only que anuncia a resposta pronta
  const [mode, setMode] = useState('demo')      // 'demo' (roteirizado) | 'live' (conversa)
  const [draft, setDraft] = useState('')

  // motor da conversa ao vivo (instanciado sempre; só exibido em 'live')
  const live = useLiveChat({ empId: emp.id, siteCtx, pack, greeting: messages[0]?.text })

  // qual conjunto está na tela agora
  const isLive = mode === 'live'
  const viewMessages = isLive ? live.messages : messages
  const viewStreamingId = isLive ? null : streamingId
  const viewOnStreamDone = isLive ? undefined : onStreamDone
  const viewPendingConnectId = isLive ? null : pendingConnectId
  const viewThinking = isLive ? live.busy : thinking

  // pula pro fim quando entra msg/atividade
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [viewMessages.length, viewThinking, viewStreamingId])

  // acompanha o texto crescendo durante o streaming do demo (caret na dobra)
  useEffect(() => {
    if (isLive || !streamingId || prefersReduced() || zoom) return
    let raf = 0
    const loop = () => {
      const el = scrollRef.current
      if (el) el.scrollTop = el.scrollHeight
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [streamingId, zoom, isLive])

  // ao terminar uma resposta do demo: foca o próximo chip + anuncia (leitor)
  useEffect(() => {
    if (prevStream.current && !streamingId) {
      const lastAgent = [...messages].reverse().find((m) => m.role === 'agent')
      if (lastAgent) setAnnounce(lastAgent.text)
      if (!isLive) requestAnimationFrame(() => chipRef.current?.focus())
    }
    prevStream.current = streamingId
  }, [streamingId]) // eslint-disable-line react-hooks/exhaustive-deps

  const submit = (e) => {
    e.preventDefault()
    const t = draft.trim()
    if (!t) return
    setDraft('')
    live.send(t)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  return (
    <aside
      className="chat-panel"
      style={{ '--accent': emp.color, '--accent-ink': emp.ink, '--accent-glow': emp.glow }}
      aria-label={`Conversa com ${emp.name}`}
    >
      <header className="chat-head">
        <img src={emp.img} alt="" className="chat-av" style={{ boxShadow: `0 0 0 2px ${emp.color}` }} />
        <div className="chat-id">
          <strong>{emp.name}</strong>
          <span className="chat-status" aria-live="polite">
            <i className="chat-dot" style={{ background: emp.color }} aria-hidden="true" />
            {viewThinking ? 'pensando…' : viewStreamingId ? 'digitando…' : viewPendingConnectId ? 'aguardando conexão…' : 'online'}
          </span>
        </div>
        <div className="chat-mode" role="tablist" aria-label="Modo do chat">
          <button role="tab" type="button" aria-selected={!isLive} className={`cm-tab ${!isLive ? 'on' : ''}`} onClick={() => setMode('demo')}>Demo</button>
          <button role="tab" type="button" aria-selected={isLive} className={`cm-tab ${isLive ? 'on' : ''}`} onClick={() => setMode('live')}>Conversa</button>
        </div>
      </header>

      <div className="chat-log" ref={scrollRef} role="log" aria-label="Conversa">
        {viewMessages.map((m) => {
          if (m.role === 'connect') return <ConnectCard key={m.id} connect={m.connect} active={m.id === viewPendingConnectId} onConnected={onConnected} />
          if (m.role === 'image') return (
            <figure key={m.id} className="bubble agent img-bubble reveal">
              <img src={`data:image/png;base64,${m.img.b64}`} alt={m.img.alt || 'Imagem gerada'} />
              <figcaption>gerado agora · {m.img.format}</figcaption>
            </figure>
          )
          return (
            <div key={m.id} className={`bubble ${m.role} reveal`}>
              {m.role === 'agent' && m.streaming
                ? <Typewriter text={m.text} className="bubble-tx" onDone={m.id === viewStreamingId ? viewOnStreamDone : undefined} />
                : <span className="bubble-tx">{m.text}</span>}
            </div>
          )
        })}
        {viewThinking && (
          <div className="bubble agent thinking reveal" aria-hidden="true">
            <span className="dots"><i /><i /><i /></span>
            {isLive ? <span className="produce-log">▸ pensando…</span> : <ProduceLog id={emp.id} />}
          </div>
        )}
      </div>

      {isLive ? (
        <form className="chat-input" onSubmit={submit}>
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Fale com ${emp.name}…`}
            disabled={live.busy}
            aria-label={`Mensagem para ${emp.name}`}
            spellCheck={false}
          />
          <button type="submit" disabled={live.busy || !draft.trim()} aria-label="Enviar">↑</button>
        </form>
      ) : (
        <div className="chat-chips">
          {chips.length === 0 && !thinking && !streamingId && !pendingConnectId && (
            <>
              <p className="chat-end" role="status">
                {nextAgent ? 'Demonstração concluída.' : 'Fim do fluxo, seus 5 funcionários trabalharam de ponta a ponta.'}
              </p>
              {nextAgent && onNext && (
                <button
                  ref={chipRef}
                  className="chip chip-next"
                  style={{ '--accent': nextAgent.color, '--accent-ink': nextAgent.ink }}
                  onClick={onNext}
                >
                  <img src={nextAgent.img} alt="" className="chip-next-av" />
                  Falar com {nextAgent.name} →
                </button>
              )}
            </>
          )}
          {chips.map((c, i) => (
            <button key={c.id} ref={i === 0 ? chipRef : undefined} className="chip" onClick={pickChip} disabled={thinking || !!streamingId}>
              {c.label}
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" role="status" aria-live="polite">{announce}</p>
    </aside>
  )
}
