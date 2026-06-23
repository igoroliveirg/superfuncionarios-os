import React, { useState, useRef, useCallback, useEffect, useLayoutEffect, useMemo } from 'react'
import { EMPLOYEES, EmployeeContent, SCRIPTS } from './employees.jsx'
import { useAgentChat, ChatPanel } from './chat.jsx'
import { AudioProvider, useAudio } from './audio.jsx'
import { Presentation } from './presentation.jsx'
import { resolvePack } from './niches/index.js'

// Marca da Super Funcionários: três barras (eco do favicon do GDIA)
function Mark() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path fill="currentColor" d="M14 19h36a3 3 0 0 1 0 6H14a3 3 0 0 1 0-6Zm0 12h26a3 3 0 0 1 0 6H14a3 3 0 0 1 0-6Zm0 12h36a3 3 0 0 1 0 6H14a3 3 0 0 1 0-6Z" />
    </svg>
  )
}

// ── genie (FLIP a partir do ícone do dock) ───────────────────────────
const GENIE_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)' // = --e-expo
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// transform que cola o canto sup-esq da janela sobre o ícone (INVERT)
function genieInvert(win, icon) {
  const dx = icon.x - win.x
  const dy = icon.y - win.y
  const sx = icon.w / win.w
  const sy = icon.h / win.h
  return `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`
}

// genie compartilhado por Window e RoutinesWindow: entrada (FLIP do círculo)
// + saída (voa de volta pro launcher). StrictMode-safe (cleanup remove a classe).
function useGenieWindow(origin) {
  const ref = useRef(null)
  const animRef = useRef(null)
  const exitingRef = useRef(false)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.focus()
    if (prefersReduced() || !origin) return
    el.style.animation = 'none'
    const r = el.getBoundingClientRect()
    const invert = genieInvert({ x: r.left, y: r.top, w: r.width, h: r.height }, origin)
    el.classList.add('genie-anim')
    el.style.willChange = 'transform, opacity'
    const anim = el.animate(
      [
        { transformOrigin: 'top left', transform: invert, opacity: 0 },
        { transformOrigin: 'top left', transform: invert, opacity: 0.85, offset: 0.12 },
        { transformOrigin: 'top left', transform: 'translate(0,0) scale(1,1)', opacity: 1 },
      ],
      { duration: 420, easing: GENIE_EASE, fill: 'both' }
    )
    animRef.current = anim
    const done = () => { el.classList.remove('genie-anim'); el.style.willChange = '' }
    anim.onfinish = () => { if (!el.isConnected) return; anim.cancel(); animRef.current = null; done() }
    return () => { try { anim.cancel() } catch (_) {} animRef.current = null; done() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => () => { try { animRef.current?.cancel() } catch (_) {} }, [])

  const flyToDock = useCallback((target, after) => {
    if (exitingRef.current) return
    exitingRef.current = true
    const el = ref.current
    if (prefersReduced() || !el || !target) { after(); return }
    if (animRef.current) { try { animRef.current.cancel() } catch (_) {} }
    const r = el.getBoundingClientRect()
    const invert = genieInvert({ x: r.left, y: r.top, w: r.width, h: r.height }, target)
    el.classList.add('genie-anim')
    el.style.willChange = 'transform, opacity'
    const anim = el.animate(
      [
        { transformOrigin: 'top left', transform: 'translate(0,0) scale(1,1)', opacity: 1 },
        { transformOrigin: 'top left', transform: invert, opacity: 0 },
      ],
      { duration: 320, easing: GENIE_EASE, fill: 'forwards' }
    )
    animRef.current = anim
    anim.onfinish = () => after()
  }, [])

  return { ref, flyToDock }
}

// 5ª bolinha do launcher (entrada sintética, não é um funcionário)
const ROTINAS = { id: 'rotinas', name: 'Rotinas', color: '#7c8195', glow: 'rgba(90,96,120,.5)' }

function RotinasIcon({ className = 'sat-ic' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 12a8 8 0 1 1-2.34-5.66" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 3.5v4.2h-4.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ════════════════════════════════════════════════════════════════════
//  BOOT · abertura cinematográfica (marca + 5 orbs + partículas + câmera)
// ════════════════════════════════════════════════════════════════════

const PARTICLES = [
  { x: 12, y: 22, s: 4, d: 0, dur: 11 }, { x: 84, y: 16, s: 3, d: 1.4, dur: 13 },
  { x: 26, y: 78, s: 5, d: 0.6, dur: 12 }, { x: 70, y: 70, s: 3, d: 2.1, dur: 14 },
  { x: 90, y: 52, s: 4, d: 1.7, dur: 15 }, { x: 18, y: 34, s: 2, d: 0.5, dur: 12 },
  { x: 62, y: 38, s: 3, d: 3.1, dur: 16 },
]

function Boot({ onLeaveStart, onDone }) {
  const { playBootChime } = useAudio()
  const [leaving, setLeaving] = useState(false)

  const begin = useCallback(() => {
    setLeaving(true)
    onLeaveStart?.()
  }, [onLeaveStart])
  const finish = useCallback(() => { playBootChime(); begin() }, [playBootChime, begin])

  useEffect(() => {
    const t1 = setTimeout(begin, 3200)
    return () => clearTimeout(t1)
  }, [begin])

  // o push-in (cameraPush) é a única animação finita no .splash-stage → avança
  const onAnimEnd = (e) => { if (leaving && e.target.classList.contains('splash-stage')) onDone() }

  const SIZE = 360, R = 138, ORB = 62
  const c = SIZE / 2

  return (
    <div className={`splash ${leaving ? 'leaving' : ''}`} onClick={finish}>
      <div className="splash-depth" aria-hidden="true">
        <span className="depth-glow a" />
        <span className="depth-glow b" />
        <div className="splash-particles">
          {PARTICLES.map((p, i) => (
            <span key={i} className="particle"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, '--pd': `${p.d}s`, '--pdur': `${p.dur}s` }} />
          ))}
        </div>
      </div>

      <div className="splash-stage" style={{ width: SIZE, height: SIZE }} onAnimationEnd={onAnimEnd}>
        <div className="orbit-ring" style={{ inset: c - R }} />
        {EMPLOYEES.map((e, i) => {
          const a = ((-90 + i * 72) * Math.PI) / 180
          const x = c + R * Math.cos(a) - ORB / 2
          const y = c + R * Math.sin(a) - ORB / 2
          return (
            <div key={e.id} className="orb"
              style={{
                left: x, top: y, width: ORB, height: ORB,
                '--dx': `${-R * Math.cos(a)}px`, '--dy': `${-R * Math.sin(a)}px`,
                '--ox': `${-Math.sin(a)}`, '--oy': `${Math.cos(a)}`,
                '--i': i, '--glow': e.glow,
                boxShadow: `0 0 0 2.5px ${e.color}, 0 10px 34px ${e.glow}`,
              }}>
              <img src={e.img} alt="" />
            </div>
          )
        })}
        <div className="splash-mark"><Mark /></div>
      </div>
      <div className="splash-word">
        <h1>Super Funcionários</h1>
        <p>Sistema Operacional</p>
      </div>
      <div className="splash-bar"><span /></div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════
//  ONBOARDING (telas = só o card; o fundo é a .onboarding-stage contínua)
// ════════════════════════════════════════════════════════════════════

function ConnectScreen({ onDone }) {
  const [openai, setOpenai] = useState('idle')
  const [claude, setClaude] = useState('idle')
  const connect = (which) => {
    const set = which === 'openai' ? setOpenai : setClaude
    set('connecting')
    setTimeout(() => set('done'), 1100)
  }
  const both = openai === 'done' && claude === 'done'
  return (
    <div className="boot-card">
      <div className="boot-logo"><Mark /></div>
      <h1>Conecte suas contas de IA</h1>
      <p className="boot-sub">Seus 5 funcionários rodam na <b>sua própria assinatura</b>. Sua conta, seus créditos, seus dados.</p>
      <button className={`oauth ${openai}`} onClick={() => connect('openai')} disabled={openai !== 'idle'}>
        <span className="oauth-ic openai">◉</span>
        <span className="oauth-label">
          {openai === 'idle' && 'Conectar OpenAI'}
          {openai === 'connecting' && 'Conectando…'}
          {openai === 'done' && 'OpenAI conectada'}
        </span>
        {openai === 'done' && <span className="oauth-check">✓</span>}
      </button>
      <button className={`oauth ${claude}`} onClick={() => connect('claude')} disabled={claude !== 'idle'}>
        <span className="oauth-ic claude">✻</span>
        <span className="oauth-label">
          {claude === 'idle' && 'Conectar Claude'}
          {claude === 'connecting' && 'Conectando…'}
          {claude === 'done' && 'Claude conectado'}
        </span>
        {claude === 'done' && <span className="oauth-check">✓</span>}
      </button>
      <button className="boot-next" disabled={!both} onClick={onDone}>Continuar →</button>
      <button className="boot-skip" onClick={onDone}>Pular por agora</button>
    </div>
  )
}

function SiteScreen({ onAnalyze }) {
  const [url, setUrl] = useState('imersaosuperfuncionarios.com.br')
  return (
    <div className="boot-card">
      <div className="boot-logo"><Mark /></div>
      <h1>Qual é o site da sua empresa?</h1>
      <p className="boot-sub">Os funcionários leem seu site e aprendem seu negócio, sua oferta e seu jeito de falar.</p>
      <div className="url-row">
        <span className="url-pre">https://</span>
        <input className="url-in" value={url} onChange={(e) => setUrl(e.target.value)} spellCheck={false} />
      </div>
      <button className="boot-next solo" disabled={!url.trim()} onClick={() => onAnalyze(url.trim())}>
        Analisar meu site →
      </button>
    </div>
  )
}

function AnalyzeScreen({ site, onDone }) {
  const steps = [
    'Lendo seu site…',
    'Mapeando sua oferta e seu público…',
    'Extraindo seu tom de voz…',
    'Treinando seus 5 funcionários…',
    'Tudo pronto.',
  ]
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (step >= steps.length - 1) {
      const t = setTimeout(onDone, 700)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setStep((s) => s + 1), 750)
    return () => clearTimeout(t)
  }, [step])
  return (
    <div className="boot-card analyzing">
      <div className="spinner" />
      <h1>Analisando {site}</h1>
      <ul className="steps">
        {steps.map((s, i) => (
          <li key={i} className={i < step ? 'done' : i === step ? 'active' : ''}>
            <span className="step-mk">{i < step ? '✓' : i === step ? '◐' : '○'}</span>{s}
          </li>
        ))}
      </ul>
      <div className="bar-track"><div className="bar-fill" style={{ transform: `scaleX(${step / (steps.length - 1)})` }} /></div>
    </div>
  )
}

// crossfade + slide entre os cards; o fundo (.onboarding-stage) não desmonta
function PhaseTransition({ phaseKey, dir = 'fwd', children }) {
  const [current, setCurrent] = useState({ key: phaseKey, node: children })
  const [prev, setPrev] = useState(null)

  useEffect(() => {
    if (phaseKey === current.key) {
      setCurrent((c) => ({ ...c, node: children }))
      return
    }
    setPrev(current)
    setCurrent({ key: phaseKey, node: children })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseKey, children])

  const clearPrev = () => setPrev(null)
  useEffect(() => {
    if (!prev) return
    const t = setTimeout(clearPrev, 800)
    return () => clearTimeout(t)
  }, [prev])

  return (
    <div className="phase-rail" data-dir={dir}>
      {prev && (
        <div
          key={prev.key}
          className="phase-slot exit"
          onAnimationEnd={(e) => { if (e.target === e.currentTarget && e.animationName.startsWith('phaseExit')) clearPrev() }}
          aria-hidden="true"
        >
          {prev.node}
        </div>
      )}
      <div key={current.key} className="phase-slot enter">{current.node}</div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════
//  DESKTOP
// ════════════════════════════════════════════════════════════════════

function Window({ emp, site, origin, getExitTarget, onClose, onMinimize, onOpen, pack }) {
  const { ref, flyToDock } = useGenieWindow(origin)
  const chat = useAgentChat(SCRIPTS[emp.id]) // conversa viva do agente ativo
  const _i = EMPLOYEES.findIndex((e) => e.id === emp.id)
  const nextAgent = _i < EMPLOYEES.length - 1 ? EMPLOYEES[_i + 1] : null // último encerra o ciclo

  const handleMinimize = () => flyToDock(getExitTarget?.(), onMinimize)
  const handleClose = () => flyToDock(getExitTarget?.(), onClose)

  // ── o painel ANTECIPA: quando o agente entrega um bloco novo, a janela
  //    rola sozinha até ele (sem o usuário ter que caçar o que foi produzido)
  const bodyRef = useRef(null)
  const prevStepRef = useRef(chat.step)
  useEffect(() => {
    if (chat.step <= prevStepRef.current) { prevStepRef.current = chat.step; return }
    prevStepRef.current = chat.step
    const body = bodyRef.current
    if (!body) return
    let freshT = 0
    const raf = requestAnimationFrame(() => {
      const reduce = prefersReduced()
      const behavior = reduce ? 'auto' : 'smooth'
      // preview do Construtor tem scroll próprio → segue o bloco novo lá dentro
      const lp = body.querySelector('.lp-view')
      if (lp) lp.scrollTo({ top: lp.scrollHeight, behavior })
      // demais agentes: traz o bloco recém-revelado pra vista (só se preciso)
      const blocks = body.querySelectorAll('.sec-block')
      const last = blocks[blocks.length - 1]
      if (!last) return
      const cr = body.getBoundingClientRect()
      const br = last.getBoundingClientRect()
      const fits = br.top >= cr.top - 1 && br.bottom <= cr.bottom + 1
      if (!fits) body.scrollTo({ top: body.scrollTop + (br.top - cr.top) - 18, behavior })
      // realce do bloco novo: glow sutil entra e some (pro olho pousar nele)
      if (!reduce) {
        blocks.forEach((el) => el.classList.remove('is-fresh'))
        last.classList.add('is-fresh')
        freshT = window.setTimeout(() => last.classList.remove('is-fresh'), 1100)
      }
    })
    return () => { cancelAnimationFrame(raf); if (freshT) clearTimeout(freshT) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chat.step])

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-label={`${emp.name}, ${emp.role}`}
      className="window"
      style={{ '--win-glow': emp.glow }}
    >
      <div className="titlebar" style={{ borderTopColor: emp.color }}>
        <div className="traffic">
          <button className="tl close" onClick={handleClose} aria-label="Fechar" />
          <button className="tl min" onClick={handleMinimize} aria-label="Voltar ao launcher" />
        </div>
        <div className="title">
          <img src={emp.img} alt="" className="title-av" style={{ boxShadow: `0 0 0 2px ${emp.color}` }} />
          <span>{emp.name}</span>
          <span className="title-code" style={{ color: emp.ink }}>{emp.code}</span>
        </div>
        <div className="title-model">
          <span className="dot" style={{ background: emp.color }} /> rodando na sua IA
        </div>
      </div>
      <div className="window-body has-chat" ref={bodyRef}>
        <EmployeeContent id={emp.id} accent={emp.color} ink={emp.ink} site={site} step={chat.step} pack={pack} />
      </div>
      <ChatPanel emp={emp} chat={chat} nextAgent={nextAgent} onNext={() => onOpen?.(nextAgent.id)} />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════
//  ROTINAS · janela de automações (lista ativa à direita, cria via chat)
// ════════════════════════════════════════════════════════════════════

// rotinas que já estão rodando (mix dos 5 funcionários)
const ACTIVE_ROUTINES = [
  { id: 'r1', agent: 'conteudo',   what: 'Posta 1 Reels por dia',            when: 'Todo dia · 09:00',     rec: 'Diário' },
  { id: 'r2', agent: 'conteudo',   what: 'Publica 3 stories',                when: 'Todo dia · 11h/15h/19h', rec: 'Diário' },
  { id: 'r3', agent: 'metricas',   what: 'Manda o relatório de métricas',    when: 'Segunda · 08:00',      rec: 'Semanal' },
  { id: 'r4', agent: 'pesquisa',   what: 'Varre comentários e reviews novos', when: 'Todo dia · 07:30',     rec: 'Diário' },
  { id: 'r5', agent: 'copywriter', what: '5 variações dos anúncios campeões', when: 'Segunda · 09:00',      rec: 'Semanal' },
  { id: 'r6', agent: 'construtor', what: 'Roda A/B da página, mantém a melhor', when: 'Domingo · 22:00',    rec: 'Semanal' },
]

// sugestões de rotina por funcionário (o que ele sabe automatizar)
const ROUTINE_TEMPLATES = {
  pesquisa: [
    { what: 'Varrer comentários e reviews novos', when: 'Todo dia · 07:30', rec: 'Diário' },
    { what: 'Mapear objeções novas do mercado',   when: 'Sexta · 16:00',    rec: 'Semanal' },
  ],
  copywriter: [
    { what: 'Gerar 5 variações dos anúncios campeões', when: 'Segunda · 09:00',     rec: 'Semanal' },
    { what: 'Reescrever anúncio que perdeu CTR',       when: 'Quando o CTR cair 15%', rec: 'Por gatilho' },
  ],
  construtor: [
    { what: 'Rodar A/B da página e manter a melhor', when: 'Domingo · 22:00',      rec: 'Semanal' },
    { what: 'Publicar a página da nova oferta',      when: 'Quando a oferta mudar', rec: 'Por gatilho' },
  ],
  conteudo: [
    { what: 'Postar 1 Reels por dia',         when: 'Todo dia · 09:00', rec: 'Diário' },
    { what: 'Publicar 3 stories por dia',     when: 'Todo dia',         rec: 'Diário' },
    { what: 'Montar o calendário da semana',  when: 'Segunda · 08:00',  rec: 'Semanal' },
  ],
  metricas: [
    { what: 'Enviar o relatório de métricas', when: 'Segunda · 08:00', rec: 'Semanal' },
    { what: 'Alertar quando o CAC subir 15%', when: 'Tempo real',      rec: 'Por gatilho' },
  ],
}

// chat de criação: escolhe funcionário → escolhe a rotina → cria ao vivo
function RoutineCreator({ onCreate }) {
  const [msgs, setMsgs] = useState([
    { id: 0, role: 'agent', text: 'Vamos montar uma rotina. Qual funcionário deve executar?' },
  ])
  const [phase, setPhase] = useState('agent') // agent | routine | done
  const [agent, setAgent] = useState(null)
  const seq = useRef(1)
  const scrollRef = useRef(null)
  const push = (role, text) => setMsgs((m) => [...m, { id: seq.current++, role, text }])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs.length])

  const pickAgent = (a) => { push('user', a.name); setAgent(a); setPhase('routine'); push('agent', `Boa. O que o ${a.name} deve fazer sozinho?`) }
  const pickRoutine = (t) => {
    push('user', t.what)
    onCreate({ agent: agent.id, what: t.what, when: t.when, rec: t.rec })
    setPhase('done')
    push('agent', `Pronto ✓ ${agent.name} vai executar "${t.what}", ${t.when} · ${t.rec}. Já está rodando.`)
  }
  const restart = () => { setAgent(null); setPhase('agent'); push('agent', 'Qual funcionário executa a próxima?') }

  const chips = phase === 'agent'
    ? EMPLOYEES.map((a) => ({ key: a.id, label: a.name, on: () => pickAgent(a) }))
    : phase === 'routine'
      ? (ROUTINE_TEMPLATES[agent.id] || []).map((t, i) => ({ key: i, label: t.what, on: () => pickRoutine(t) }))
      : [{ key: 'again', label: '+ Criar outra rotina', on: restart }]

  return (
    <aside className="chat-panel" style={{ '--accent': ROTINAS.color, '--accent-ink': '#454a5a' }} aria-label="Criar rotina">
      <header className="chat-head">
        <span className="chat-av chat-av-ic" style={{ boxShadow: `0 0 0 2px ${ROTINAS.color}` }}><RotinasIcon className="rot-head-ic" /></span>
        <div className="chat-id">
          <strong>Criar rotina</strong>
          <span className="chat-status"><i className="chat-dot" style={{ background: ROTINAS.color }} aria-hidden="true" />monte um fluxo automático</span>
        </div>
      </header>
      <div className="chat-log" ref={scrollRef} role="log" aria-label="Criação de rotina">
        {msgs.map((m) => (
          <div key={m.id} className={`bubble ${m.role} reveal`}><span className="bubble-tx">{m.text}</span></div>
        ))}
      </div>
      <div className="chat-chips">
        {chips.map((c) => (
          <button key={c.key} className="chip" onClick={c.on}>{c.label}</button>
        ))}
      </div>
    </aside>
  )
}

// lista de rotinas ativas (lado direito da janela)
function RoutinesContent({ routines, newId }) {
  const byId = (id) => EMPLOYEES.find((e) => e.id === id)
  const diarias = routines.filter((r) => r.rec === 'Diário').length
  return (
    <div className="emp rotinas">
      <div className="emp-head">
        <div>
          <h2>Rotinas e automações</h2>
          <p className="muted">Seus funcionários trabalhando sozinhos, no horário e na recorrência que você definir.</p>
        </div>
        <span className="pill done" style={{ borderColor: ROTINAS.color, color: '#454a5a' }}>● {routines.length} ativas</span>
      </div>

      <div className="insight-strip">
        <div className="insight"><span className="insight-v" style={{ color: '#454a5a' }}>{routines.length}</span><span className="insight-l">rotinas ativas</span></div>
        <div className="insight"><span className="insight-v" style={{ color: '#454a5a' }}>{diarias}</span><span className="insight-l">rodando todo dia</span></div>
        <div className="insight"><span className="insight-v" style={{ color: '#454a5a' }}>24/7</span><span className="insight-l">sem você apertar nada</span></div>
      </div>

      <div className="rot-list">
        {routines.map((r) => {
          const a = byId(r.agent)
          return (
            <div key={r.id} className={`rot-card ${r.id === newId ? 'is-new' : ''}`} style={{ '--accent': a.color }}>
              <img className="rot-av" src={a.img} alt="" style={{ boxShadow: `0 0 0 2px ${a.color}` }} />
              <div className="rot-main">
                <div className="rot-top">
                  <span className="rot-agent">{a.name}</span>
                  {r.id === newId && <span className="rot-new-tag" style={{ background: a.color }}>nova</span>}
                </div>
                <p className="rot-what">{r.what}</p>
                <div className="rot-meta">
                  <span className="rot-when">🕑 {r.when}</span>
                  <span className="rot-rec" style={{ color: a.ink, borderColor: a.color }}>{r.rec}</span>
                </div>
              </div>
              <span className="rot-status"><i className="rot-dot" style={{ background: '#2fbf6c' }} aria-hidden="true" />ativa</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function RoutinesWindow({ origin, getExitTarget, onClose, onMinimize }) {
  const { ref, flyToDock } = useGenieWindow(origin)
  const [routines, setRoutines] = useState(ACTIVE_ROUTINES)
  const [newId, setNewId] = useState(null)
  const idRef = useRef(100)

  const create = (r) => {
    const id = 'rn' + (idRef.current++)
    setRoutines((rs) => [{ id, ...r }, ...rs])
    setNewId(id)
  }
  const handleMinimize = () => flyToDock(getExitTarget?.(), onMinimize)
  const handleClose = () => flyToDock(getExitTarget?.(), onClose)

  return (
    <div ref={ref} tabIndex={-1} role="dialog" aria-label="Rotinas e automações" className="window" style={{ '--win-glow': ROTINAS.glow }}>
      <div className="titlebar" style={{ borderTopColor: ROTINAS.color }}>
        <div className="traffic">
          <button className="tl close" onClick={handleClose} aria-label="Fechar" />
          <button className="tl min" onClick={handleMinimize} aria-label="Voltar ao launcher" />
        </div>
        <div className="title">
          <span className="title-av title-av-ic" style={{ boxShadow: `0 0 0 2px ${ROTINAS.color}` }}><RotinasIcon className="rot-head-ic" /></span>
          <span>Rotinas</span>
          <span className="title-code" style={{ color: '#454a5a' }}>AUTOMAÇÕES</span>
        </div>
        <div className="title-model"><span className="dot" style={{ background: ROTINAS.color }} /> {routines.length} rotinas ativas</div>
      </div>
      <div className="window-body has-chat">
        <RoutinesContent routines={routines} newId={newId} />
      </div>
      <RoutineCreator onCreate={create} />
    </div>
  )
}

// Launcher radial: um círculo central (robô ativo, ou marca) e os OUTROS
// robôs florescem em volta. Janela única.
const Launcher = React.forwardRef(function Launcher({ activeId, onOpen }, ref) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const ALL = [...EMPLOYEES, ROTINAS]
  const anchor = ALL.find((e) => e.id === activeId) || null
  const sats = ALL.filter((e) => e.id !== activeId)
  const N = sats.length
  const SPREAD = N <= 4 ? 150 : N === 5 ? 168 : 176
  const R = 122
  const geo = sats.map((e, i) => {
    const aud = N === 1 ? 0 : -SPREAD / 2 + (SPREAD * i) / (N - 1)
    const rad = (aud * Math.PI) / 180
    return { e, dx: R * Math.sin(rad), dy: -R * Math.cos(rad), i }
  })

  const focusCore = () => rootRef.current?.querySelector('.launcher-core')?.focus()
  const closeFan = () => { setOpen(false); focusCore() }

  const pick = (id, ev) => {
    const r = ev.currentTarget.getBoundingClientRect()
    onOpen(id, { x: r.left, y: r.top, w: r.width, h: r.height })
    setOpen(false)
  }

  // ao abrir: foco vai pro 1º satélite; Esc fecha e devolve foco ao núcleo
  useEffect(() => {
    if (!open) return
    const raf = requestAnimationFrame(() => rootRef.current?.querySelector('.sat')?.focus())
    const onKey = (e) => { if (e.key === 'Escape') { e.stopPropagation(); closeFan() } }
    window.addEventListener('keydown', onKey, true)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey, true) }
  }, [open])

  const setRefs = (el) => {
    rootRef.current = el
    if (typeof ref === 'function') ref(el)
    else if (ref) ref.current = el
  }

  return (
    <div className={`launcher ${open ? 'is-open' : ''}`} ref={setRefs}>
      {open && <div className="launcher-scrim" aria-hidden="true" onClick={() => setOpen(false)} />}
      <div className="launcher-ring" role="group" aria-label="Funcionários">
        {geo.map(({ e, dx, dy, i }) => (
          <div key={e.id} className="sat-slot" style={{ '--dx': `${dx}px`, '--dy': `${dy}px`, '--si': i }}>
            <button
              className={`sat ${e.id === 'rotinas' ? 'sat-rotinas' : ''} ${activeId === e.id ? 'is-active' : ''}`}
              data-sat={e.id}
              style={{ '--ring': e.color, '--glow': e.glow }}
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              aria-label={e.id === 'rotinas' ? 'Abrir Rotinas e automações' : `Abrir ${e.name}`}
              onClick={(ev) => pick(e.id, ev)}
            >
              <span className="sat-bub">
                {e.id === 'rotinas' ? <RotinasIcon /> : <img src={e.img} alt="" />}
              </span>
              <span className="sat-tip" aria-hidden="true">{e.name}</span>
            </button>
          </div>
        ))}
      </div>
      {!open && <span className="core-ring" style={{ '--ring': anchor ? anchor.color : '#3a3c46' }} aria-hidden="true" />}
      <button
        className={`launcher-core ${anchor && anchor.id === 'rotinas' ? 'lc-rotinas' : ''}`}
        data-sat={anchor ? anchor.id : ''}
        style={anchor
          ? { '--ring': anchor.color, '--glow': anchor.glow }
          : { '--ring': '#3a3c46', '--glow': 'rgba(40,44,60,.35)' }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={open ? 'Fechar' : activeId ? 'Trocar funcionário' : 'Abrir seus 5 funcionários'}
        title={open ? 'Fechar' : activeId ? 'Trocar funcionário' : 'Abrir seus funcionários'}
        onClick={() => setOpen((o) => !o)}
      >
        {open
          ? <span className="lc-x" aria-hidden="true">✕</span>
          : anchor
            ? (anchor.id === 'rotinas' ? <RotinasIcon className="lc-ic" /> : <img src={anchor.img} alt="" />)
            : <span className="lc-dots" aria-hidden="true">{EMPLOYEES.map((e) => <i key={e.id} style={{ background: e.color, color: e.color }} />)}</span>}
      </button>
      {!open && !activeId && <span className="launcher-label" aria-hidden="true">Seus funcionários</span>}
    </div>
  )
})

function Desktop({ site, onPresent, pack }) {
  const [activeId, setActiveId] = useState('pesquisa') // janela única (ou null)
  const [origin, setOrigin] = useState(null)           // rect do círculo de origem (genie)
  const launcherRef = useRef(null)

  const open = (id, rect) => { setOrigin(rect || null); setActiveId(id) }
  const close = () => {
    setActiveId(null)
    launcherRef.current?.querySelector('.launcher-core')?.focus()
  }

  // genie de saída mira o núcleo do launcher (a janela "engole" pro círculo)
  const centerRectOf = () => {
    const el = launcherRef.current?.querySelector('.launcher-core img') || launcherRef.current?.querySelector('.launcher-core')
    if (!el) return origin
    const r = el.getBoundingClientRect()
    return { x: r.left, y: r.top, w: r.width, h: r.height }
  }

  // Esc fecha a janela ativa (o leque trata o próprio Esc antes, via capture)
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && activeId) close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeId])

  const emp = EMPLOYEES.find((e) => e.id === activeId) || null
  const isRotinas = activeId === 'rotinas'

  return (
    <div className="desktop">
      {onPresent && (
        <button className="present-launch" onClick={onPresent} title="Modo apresentação (passador de slides)">
          <span className="pl-ic" aria-hidden="true">▶</span> Apresentar
        </button>
      )}
      <div className="wallpaper">
        {!activeId && (
          <div className="wp-hint">
            <h2>Seus 5 super funcionários estão prontos.</h2>
            <p>Toque no círculo flutuante e escolha quem você quer ver, pra <b>{site}</b>.</p>
          </div>
        )}
        {emp && (
          <Window
            key={emp.id}
            emp={emp}
            site={site}
            origin={origin}
            getExitTarget={centerRectOf}
            onClose={close}
            onMinimize={close}
            onOpen={open}
            pack={pack}
          />
        )}
        {isRotinas && (
          <RoutinesWindow
            key="rotinas"
            origin={origin}
            getExitTarget={centerRectOf}
            onClose={close}
            onMinimize={close}
          />
        )}
      </div>
      <Launcher ref={launcherRef} activeId={activeId} onOpen={open} />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════
//  APP
// ════════════════════════════════════════════════════════════════════

const PHASE_ORDER = ['boot', 'connect', 'site', 'analyze', 'desktop']
const ONBOARDING = ['connect', 'site', 'analyze']

function Shell() {
  const [phase, setPhase] = useState('boot')
  const [site, setSite] = useState('')
  const [bootLeaving, setBootLeaving] = useState(false)
  const [stageLeaving, setStageLeaving] = useState(false)
  const [presenting, setPresenting] = useState(() =>
    typeof window !== 'undefined' && /present/i.test(window.location.hash))
  const prevPhaseRef = useRef('boot')
  const [niche, setNiche] = useState('generico')
  const [vars, setVars] = useState({})
  const identifyRef = useRef(null)
  // pack resolvido = nicho + variáveis do cliente (com defaults seguros p/ vazio)
  const pack = useMemo(() => resolvePack(niche, {
    empresa: vars.empresa || 'superfuncionarios',
    oferta: vars.oferta || 'a imersão',
    primaryColor: vars.primaryColor || '#ff8a3c',
  }), [niche, vars])

  // entra no modo apresentação (tela cheia pedida no gesto do clique)
  const startPresent = useCallback(() => {
    document.documentElement.requestFullscreen?.().catch(() => {})
    setPresenting(true)
  }, [])
  const stopPresent = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
    setPresenting(false)
  }, [])

  const dir = PHASE_ORDER.indexOf(phase) >= PHASE_ORDER.indexOf(prevPhaseRef.current) ? 'fwd' : 'back'
  useEffect(() => { prevPhaseRef.current = phase }, [phase])

  // brilho especular do vidro segue o cursor (princípio Apple Liquid Glass:
  // o material reage ao movimento). rAF-throttled; desligado em reduced-motion.
  useEffect(() => {
    if (prefersReduced()) return
    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const s = document.documentElement.style
        s.setProperty('--px', (e.clientX / window.innerWidth).toFixed(3))
        s.setProperty('--py', (e.clientY / window.innerHeight).toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => { window.removeEventListener('pointermove', onMove); if (raf) cancelAnimationFrame(raf) }
  }, [])

  const goDesktop = () => {
    setStageLeaving(true)
    setTimeout(() => setPhase('desktop'), 400) // = stageOutFade
  }

  // ao analisar o site: dispara a identificação do nicho (1 chamada real) por
  // baixo da animação que já existe. Override de palco: #niche=<id> pula a chamada.
  const startAnalyze = useCallback((url) => {
    setSite(url)
    setPhase('analyze')
    const m = typeof window !== 'undefined' && window.location.hash.match(/niche=([a-z]+)/i)
    if (m) {
      identifyRef.current = Promise.resolve({ niche: m[1].toLowerCase() })
    } else {
      identifyRef.current = fetch('/api/identify', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url }),
      }).then((r) => r.json()).catch(() => ({ niche: 'generico' }))
    }
  }, [])

  // ao fim da animação: aguarda a identificação (timeout 8s → genérico) e entra.
  const finalize = useCallback(async () => {
    const timeout = new Promise((res) => setTimeout(() => res(null), 8000))
    const out = (identifyRef.current ? await Promise.race([identifyRef.current, timeout]) : null) || {}
    if (out.niche) setNiche(out.niche)
    setVars({ empresa: out.empresa, oferta: out.oferta, primaryColor: out.primaryColor })
    goDesktop()
  }, [])

  // durante a saída do boot, já montamos o onboarding por baixo (push-in sem corte)
  const showOnboarding = ONBOARDING.includes(phase) || (phase === 'boot' && bootLeaving)
  const obPhase = phase === 'boot' ? 'connect' : phase

  let card = null
  if (obPhase === 'connect') card = <ConnectScreen onDone={() => setPhase('site')} />
  else if (obPhase === 'site') card = <SiteScreen onAnalyze={startAnalyze} />
  else if (obPhase === 'analyze') card = <AnalyzeScreen site={site} onDone={finalize} />

  return (
    <div className="app">
      <div className="mobile-gate">
        <div className="mg-card">
          <div className="mg-mark"><Mark /></div>
          <h1>Super Funcionários OS</h1>
          <p>Este é o app de Mac. Abra no seu computador pra experiência completa, com a área de trabalho e os 5 funcionários.</p>
          <div className="mg-orbs">
            {EMPLOYEES.map((e) => (
              <img key={e.id} src={e.img} alt={e.name} style={{ boxShadow: `0 4px 16px ${e.glow}` }} />
            ))}
          </div>
        </div>
      </div>

      {showOnboarding && (
        <div className={`onboarding-stage ${stageLeaving ? 'leaving' : ''}`}>
          <PhaseTransition phaseKey={obPhase} dir={dir}>{card}</PhaseTransition>
        </div>
      )}

      {phase === 'boot' && (
        <Boot
          onLeaveStart={() => setBootLeaving(true)}
          onDone={() => { setPhase('connect'); setBootLeaving(false) }}
        />
      )}

      {phase === 'desktop' && <Desktop site={site} onPresent={startPresent} pack={pack} />}

      {presenting && (
        <Presentation site={site || 'superfuncionarios.ai'} onExit={stopPresent} />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AudioProvider>
      <Shell />
    </AudioProvider>
  )
}
