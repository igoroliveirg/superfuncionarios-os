import { describe, it, expect, vi, beforeEach } from 'vitest'
import { extractBrandColor } from '../server/brandcolor.mjs'

beforeEach(() => { vi.restoreAllMocks() })
const htmlRes = (html) => ({ ok: true, text: async () => html })

describe('extractBrandColor', () => {
  it('usa <meta name="theme-color"> quando presente (cor de marca exata)', async () => {
    global.fetch = vi.fn().mockResolvedValue(htmlRes(
      '<head><meta name="theme-color" content="#820AD1"></head>'))
    expect(await extractBrandColor('nubank.com.br')).toBe('#820ad1')
  })
  it('ignora theme-color neutro e pega a cor saturada dominante do CSS', async () => {
    global.fetch = vi.fn().mockResolvedValue(htmlRes(
      '<meta name="theme-color" content="#ffffff">' +
      '<style>.a{color:#1aab2c}.b{background:#1aab2c}.c{border:1px solid #1aab2c}</style>'))
    expect(await extractBrandColor('x.com')).toBe('#1aab2c')
  })
  it('aceita rgb() no CSS', async () => {
    global.fetch = vi.fn().mockResolvedValue(htmlRes(
      '<style>.x{background:rgb(225, 29, 72)} .y{color:rgb(225,29,72)}</style>'))
    expect(await extractBrandColor('x.com')).toBe('#e11d48')
  })
  it('só cores neutras → null', async () => {
    global.fetch = vi.fn().mockResolvedValue(htmlRes(
      '<style>body{background:#fff;color:#111;border:#888}</style>'))
    expect(await extractBrandColor('x.com')).toBeNull()
  })
  it('fetch falha → null', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('net'))
    expect(await extractBrandColor('x.com')).toBeNull()
  })
})
