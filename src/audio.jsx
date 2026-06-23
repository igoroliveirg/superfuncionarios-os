import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react'

const AudioCtx = createContext(null)
export const useAudio = () => useContext(AudioCtx)

const MUTE_KEY = 'sf-muted'

// ── Síntese do chime de assinatura ───────────────────────────────────
// Acorde ascendente suave (C add9) com osciladores seno+triângulo,
// envelope ADSR curto por voz, leve detune por uníssono e um feedback-delay
// simples (cauda tipo "ar" premium). ~1.9s total.
function synthChime(ctx, destination) {
  const now = ctx.currentTime
  const t0 = now + 0.02

  const master = ctx.createGain()
  master.gain.value = 0.0001
  master.connect(destination)
  master.gain.setValueAtTime(0.0001, t0)
  master.gain.exponentialRampToValueAtTime(0.9, t0 + 0.05)
  master.gain.exponentialRampToValueAtTime(0.18, t0 + 1.2)
  master.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.9)

  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.setValueAtTime(900, t0)
  lp.frequency.exponentialRampToValueAtTime(6500, t0 + 0.6)
  lp.Q.value = 0.6
  lp.connect(master)

  const delay = ctx.createDelay(1.0)
  delay.delayTime.value = 0.14
  const fb = ctx.createGain()
  fb.gain.value = 0.32
  const wet = ctx.createGain()
  wet.gain.value = 0.5
  lp.connect(delay)
  delay.connect(fb)
  fb.connect(delay)
  delay.connect(wet)
  wet.connect(master)

  const freqs = [523.25, 659.25, 783.99, 1174.66] // C5 E5 G5 D6
  const startGap = 0.085

  freqs.forEach((f, i) => {
    const at = t0 + i * startGap
    const voices = [
      { type: 'sine', detune: -4, level: 0.55 },
      { type: 'triangle', detune: +5, level: 0.22 },
    ]
    const vg = ctx.createGain()
    vg.gain.value = 0.0001
    vg.connect(lp)
    vg.gain.setValueAtTime(0.0001, at)
    vg.gain.exponentialRampToValueAtTime(0.8, at + 0.012)
    vg.gain.exponentialRampToValueAtTime(0.32, at + 0.18)
    vg.gain.exponentialRampToValueAtTime(0.0001, at + 1.6)

    voices.forEach((v) => {
      const osc = ctx.createOscillator()
      osc.type = v.type
      osc.frequency.value = f
      osc.detune.value = v.detune
      const g = ctx.createGain()
      g.gain.value = v.level
      osc.connect(g).connect(vg)
      osc.start(at)
      osc.stop(at + 1.7)
    })
  })

  const killAt = t0 + 2.2
  setTimeout(() => { try { master.disconnect() } catch (_) {} }, (killAt - now) * 1000 + 50)
}

// ── Provider ─────────────────────────────────────────────────────────
export function AudioProvider({ children }) {
  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const playedRef = useRef(false)
  const [muted, setMuted] = useState(() => {
    try { return localStorage.getItem(MUTE_KEY) === '1' } catch (_) { return false }
  })
  const [chimeTick, setChimeTick] = useState(0)

  const ensureCtx = useCallback(() => {
    if (ctxRef.current) return ctxRef.current
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    const ctx = new AC()
    const master = ctx.createGain()
    master.gain.value = muted ? 0 : 1
    master.connect(ctx.destination)
    ctxRef.current = ctx
    masterRef.current = master
    return ctx
  }, [muted])

  // toca o chime — DEVE ser chamado de dentro de um gesto do usuário
  const playBootChime = useCallback(() => {
    if (playedRef.current) return
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { playedRef.current = true; return }
    const ctx = ensureCtx()
    if (!ctx) { playedRef.current = true; return }
    playedRef.current = true
    const go = () => {
      if (masterRef.current.gain.value <= 0) return
      synthChime(ctx, masterRef.current)
      setChimeTick((n) => n + 1)
    }
    if (ctx.state === 'suspended') ctx.resume().then(go).catch(() => {})
    else go()
  }, [ensureCtx])

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      const next = !m
      try { localStorage.setItem(MUTE_KEY, next ? '1' : '0') } catch (_) {}
      if (masterRef.current) masterRef.current.gain.value = next ? 0 : 1
      return next
    })
  }, [])

  useEffect(() => () => { try { ctxRef.current?.close() } catch (_) {} }, [])

  const value = { playBootChime, muted, toggleMuted, chimeTick }
  return <AudioCtx.Provider value={value}>{children}</AudioCtx.Provider>
}

// ── Ícone de alto-falante (estado mudo via classe no botão) ──────────
export function SpeakerIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M4 9v6h4l5 4V5L8 9H4z" />
      <path className="spk-wave" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
      <line className="spk-slash" x1="16" y1="8" x2="22" y2="16"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
