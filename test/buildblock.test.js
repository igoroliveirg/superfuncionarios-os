import { describe, it, expect } from 'vitest'
import { buildReducer, tallyValues, buildClass, BUILD_STOPS } from '../src/chat.jsx'

describe('buildReducer (máquina idle→skeleton→fill→locked)', () => {
  it('segue a ordem dos estados', () => {
    expect(buildReducer('idle', { type: 'START' })).toBe('skeleton')
    expect(buildReducer('skeleton', { type: 'FILL' })).toBe('fill')
    expect(buildReducer('fill', { type: 'LOCK' })).toBe('locked')
  })
  it('ignora transição fora de ordem (não pula etapa)', () => {
    expect(buildReducer('idle', { type: 'FILL' })).toBe('idle')
    expect(buildReducer('idle', { type: 'LOCK' })).toBe('idle')
    expect(buildReducer('skeleton', { type: 'LOCK' })).toBe('skeleton')
    expect(buildReducer('skeleton', { type: 'START' })).toBe('skeleton')
  })
  it('locked é terminal: nenhuma turn futura re-anima', () => {
    expect(buildReducer('locked', { type: 'START' })).toBe('locked')
    expect(buildReducer('locked', { type: 'FILL' })).toBe('locked')
    expect(buildReducer('locked', { type: 'LOCK' })).toBe('locked')
  })
  it('SNAP vai direto pro locked de qualquer estado (reduced-motion)', () => {
    expect(buildReducer('idle', { type: 'SNAP' })).toBe('locked')
    expect(buildReducer('skeleton', { type: 'SNAP' })).toBe('locked')
    expect(buildReducer('fill', { type: 'SNAP' })).toBe('locked')
  })
  it('ação desconhecida não muda o estado', () => {
    expect(buildReducer('fill', { type: 'NOPE' })).toBe('fill')
  })
})

describe('tallyValues (número quantizado, 5 ticks, final cravado)', () => {
  it('5 frames discretos', () => {
    expect(tallyValues(100)).toHaveLength(BUILD_STOPS.length)
    expect(tallyValues(100)).toHaveLength(5)
  })
  it('começa em `from` e crava exatamente em `to`', () => {
    const v = tallyValues(100)
    expect(v[0]).toBe(0)
    expect(v[v.length - 1]).toBe(100)
  })
  it('o último é EXATAMENTE `to` mesmo com número quebrado (nunca para errado)', () => {
    const v = tallyValues(12480)
    expect(v[v.length - 1]).toBe(12480)
    expect(v).toEqual([0, 4992, 8736, 11232, 12480])
  })
  it('respeita o `from` inicial', () => {
    const v = tallyValues(200, 100)
    expect(v[0]).toBe(100)
    expect(v[v.length - 1]).toBe(200)
  })
  it('é monotônico crescente', () => {
    const v = tallyValues(90)
    for (let i = 1; i < v.length; i++) expect(v[i]).toBeGreaterThanOrEqual(v[i - 1])
  })
})

describe('buildClass', () => {
  it('mapeia o estado pra classe do bloco', () => {
    expect(buildClass('skeleton')).toBe('bb is-skeleton')
    expect(buildClass('locked')).toBe('bb is-locked')
  })
})
