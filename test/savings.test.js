import { describe, it, expect, beforeEach } from 'vitest'
import { recordArtifact, resetSavings, peopleFrom, peekSavings } from '../src/savings.jsx'

describe('savings store', () => {
  beforeEach(() => resetSavings())

  it('parte da base R$ 47.000 / 320h / 6 pessoas', () => {
    expect(peekSavings()).toEqual({ money: 47000, hours: 320, people: 6 })
  })

  it('credita o pedaço de um agente uma única vez (dedup por id)', () => {
    recordArtifact('pesquisa', 8200, 38)
    recordArtifact('pesquisa', 8200, 38) // repetido → ignorado
    recordArtifact('construtor', 13000, 86)
    const s = peekSavings()
    expect(s.money).toBe(47000 + 8200 + 13000) // 68200
    expect(s.hours).toBe(320 + 38 + 86)        // 444
  })

  it('peopleFrom: horas → pessoas, mínimo 1', () => {
    expect(peopleFrom(0)).toBe(1)
    expect(peopleFrom(320)).toBe(6)
    expect(peopleFrom(444)).toBe(8)
  })

  it('resetSavings volta à base e permite recreditar o mesmo agente', () => {
    recordArtifact('pesquisa', 8200, 38)
    resetSavings()
    expect(peekSavings().money).toBe(47000)
    recordArtifact('pesquisa', 8200, 38)
    expect(peekSavings().money).toBe(47000 + 8200)
  })
})
