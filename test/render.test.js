import { describe, it, expect } from 'vitest'
import { pickBrand, themeFromBg } from '../server/render.mjs'

describe('pickBrand (cor de marca do estilo computado)', () => {
  it('pega o bg de botão saturado mais frequente', () => {
    const r = pickBrand([
      ['rgb(227, 68, 50)', 9],   // vermelho (botões) — vence
      ['rgb(255, 255, 255)', 20], // branco (neutro) — ignora
      ['rgb(17, 17, 17)', 15],    // quase-preto (neutro) — ignora
    ])
    expect(r).toBe('#e34432')
  })
  it('só neutros → null', () => {
    expect(pickBrand([['rgb(255,255,255)', 10], ['rgb(0,0,0)', 8]])).toBeNull()
  })
  it('ignora cor transparente', () => {
    expect(pickBrand([['rgba(34,197,94,0.1)', 9]])).toBeNull()
  })
})

describe('themeFromBg', () => {
  it('fundo claro → light', () => { expect(themeFromBg('rgb(254,253,252)')).toBe('light') })
  it('fundo escuro → dark', () => { expect(themeFromBg('rgb(8,9,10)')).toBe('dark') })
  it('sem cor (transparente) → null', () => { expect(themeFromBg('rgba(0,0,0,0)')).toBeNull() })
})
