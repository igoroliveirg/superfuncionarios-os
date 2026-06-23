import { describe, it, expect } from 'vitest'
import { safeAccent } from '../src/niches/color.js'

describe('safeAccent', () => {
  it('cor vívida vira tema (accent/accent2/grad em hex)', () => {
    const t = safeAccent('#820AD1') // roxo Nubank
    expect(t).not.toBeNull()
    expect(t.accent).toMatch(/^#[0-9a-f]{6}$/i)
    expect(t.accent2).toMatch(/^#[0-9a-f]{6}$/i)
    expect(t.grad).toMatch(/^#[0-9a-f]{6}$/i)
  })
  it('preserva o matiz (vermelho continua com R dominante)', () => {
    const t = safeAccent('#e01010')
    const r = parseInt(t.accent.slice(1, 3), 16)
    const g = parseInt(t.accent.slice(3, 5), 16)
    const b = parseInt(t.accent.slice(5, 7), 16)
    expect(r).toBeGreaterThan(g)
    expect(r).toBeGreaterThan(b)
  })
  it('branco/preto/cinza → null (não dá pra tematizar tema escuro)', () => {
    expect(safeAccent('#ffffff')).toBeNull()
    expect(safeAccent('#000000')).toBeNull()
    expect(safeAccent('#888888')).toBeNull()
  })
  it('hex inválido/ausente → null', () => {
    expect(safeAccent('garbage')).toBeNull()
    expect(safeAccent('')).toBeNull()
    expect(safeAccent(undefined)).toBeNull()
  })
  it('aceita forma curta (#abc)', () => {
    expect(safeAccent('#0af')).not.toBeNull()
  })
})
