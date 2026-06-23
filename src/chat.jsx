import React, { useState, useEffect, useRef, useCallback, useMemo, useReducer, useContext } from 'react'

// Em modo apresentação as seções respeitam o passo EXATO (avança revela,
// volta esconde) — pro passador de slides funcionar nos dois sentidos.
export const PresentationCtx = React.createContext(false)

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
  const reduce = prefersReduced()
  const [count, setCount] = useState(reduce ? text.length : 0)
  const doneRef = useRef(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    doneRef.current = false
    if (reduce || !text) {
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
  }, [text, msPerChar, minMs, maxMs, reduce])

  const shown = text.slice(0, count)
  const typing = !reduce && count < text.length
  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden={!reduce}>{shown}</span>
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

// ════════════════════════════════════════════════════════════════════
//  ChatPanel · painel de vidro flutuante à direita
// ════════════════════════════════════════════════════════════════════
export function ChatPanel({ emp, chat, nextAgent, onNext }) {
  const { messages, thinking, chips, pickChip, streamingId, onStreamDone, pendingConnectId, onConnected } = chat
  const scrollRef = useRef(null)
  const chipRef = useRef(null)
  const prevStream = useRef(null)
  const [announce, setAnnounce] = useState('') // região sr-only que anuncia a resposta pronta

  // pula pro fim quando entra msg/thinking
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages.length, thinking, streamingId])

  // acompanha o texto crescendo durante o streaming (sem isso, o caret some da dobra)
  useEffect(() => {
    if (!streamingId || prefersReduced()) return
    let raf = 0
    const loop = () => {
      const el = scrollRef.current
      if (el) el.scrollTop = el.scrollHeight
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [streamingId])

  // ao terminar uma resposta: foca o próximo chip (teclado) + anuncia a resposta (leitor)
  useEffect(() => {
    if (prevStream.current && !streamingId) {
      const lastAgent = [...messages].reverse().find((m) => m.role === 'agent')
      if (lastAgent) setAnnounce(lastAgent.text)
      requestAnimationFrame(() => chipRef.current?.focus())
    }
    prevStream.current = streamingId
  }, [streamingId]) // eslint-disable-line react-hooks/exhaustive-deps

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
            {thinking ? 'pensando…' : streamingId ? 'digitando…' : pendingConnectId ? 'aguardando conexão…' : 'online'}
          </span>
        </div>
      </header>

      <div className="chat-log" ref={scrollRef} role="log" aria-label="Conversa">
        {messages.map((m) => (
          m.role === 'connect'
            ? <ConnectCard key={m.id} connect={m.connect} active={m.id === pendingConnectId} onConnected={onConnected} />
            : (
              <div key={m.id} className={`bubble ${m.role} reveal`}>
                {m.role === 'agent' && m.streaming
                  ? <Typewriter text={m.text} className="bubble-tx" onDone={m.id === streamingId ? onStreamDone : undefined} />
                  : <span className="bubble-tx">{m.text}</span>}
              </div>
            )
        ))}
        {thinking && (
          <div className="bubble agent thinking reveal" aria-hidden="true">
            <span className="dots"><i /><i /><i /></span>
          </div>
        )}
      </div>

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

      <p className="sr-only" role="status" aria-live="polite">{announce}</p>
    </aside>
  )
}
