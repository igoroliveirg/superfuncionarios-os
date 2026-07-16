import { useSyncExternalStore } from 'react'

// ── Contador de economia (dinheiro/tempo/pessoas) ────────────────────
// Persistente entre os 5 agentes via localStorage; cada agente, ao produzir
// seu primeiro artefato, soma um pedaço (dedup por agente). Porta a lógica
// do os.js da spec (gdia-landing-page-v2, public/os-spec/real/os.js).

const KEY = 'sf-os-savings'
const BASE = { money: 47000, hours: 320 }
const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

const hasLS = () => typeof localStorage !== 'undefined'

function readStore() {
  try {
    const raw = hasLS() ? localStorage.getItem(KEY) : null
    const s = raw ? JSON.parse(raw) : {}
    return {
      money: typeof s.money === 'number' ? s.money : BASE.money,
      hours: typeof s.hours === 'number' ? s.hours : BASE.hours,
      counted: s.counted && typeof s.counted === 'object' ? s.counted : {},
    }
  } catch { return { ...BASE, counted: {} } }
}

let state = readStore()
const listeners = new Set()
const emit = () => listeners.forEach((l) => l())
function persist() { try { if (hasLS()) localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* noop */ } }

// soma o pedaço de um agente uma única vez (dedup por agentId)
export function recordArtifact(agentId, money, hours) {
  if (!agentId || state.counted[agentId]) return
  state = {
    money: state.money + (money || 0),
    hours: state.hours + (hours || 0),
    counted: { ...state.counted, [agentId]: 1 },
  }
  persist(); emit()
}

export function resetSavings() { state = { ...BASE, counted: {} }; persist(); emit() }

// nº de pessoas equivalente: horas / (176h/mês) * fator de overhead
export const peopleFrom = (h) => Math.max(1, Math.round((h / 176) * 3.3))

// leitura síncrona do estado (testes / debug) — sem React
export function peekSavings() { return { money: state.money, hours: state.hours, people: peopleFrom(state.hours) } }

const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l) }
const snapshot = () => state

export function useSavings() {
  const s = useSyncExternalStore(subscribe, snapshot, snapshot)
  return { money: s.money, hours: s.hours, people: peopleFrom(s.hours) }
}

export function SavingsBar({ eq }) {
  const { money, hours, people } = useSavings()
  return (
    <div className="savings">
      <span className="savings__lead">Este mês você economizou</span>
      <span className="savings__m"><span className="v">{BRL.format(money)}</span><span className="l">dinheiro</span></span>
      <span className="savings__m"><span className="v">{hours}h</span><span className="l">tempo</span></span>
      <span className="savings__m"><span className="v">{people} pessoas</span><span className="l">equipe</span></span>
      {eq && <span className="savings__eq">{eq}</span>}
    </div>
  )
}

// expõe um reset manual no console pra demos/palco
if (typeof window !== 'undefined') window.SFOS = { reset: resetSavings }
