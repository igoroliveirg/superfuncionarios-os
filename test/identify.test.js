import { describe, it, expect, vi, beforeEach } from 'vitest'

const h = vi.hoisted(() => ({ state: { niche: 'clinicas', empresa: 'Clínica Bem', color: '#820ad1', theme: 'light', guess: '#ff6f91' } }))

vi.mock('@anthropic-ai/sdk', () => ({
  default: class {
    messages = {
      create: async () => ({
        content: [{
          type: 'tool_use', name: 'identify', input: {
            niche: h.state.niche, empresa: h.state.empresa, oferta: 'protocolo facial',
            primaryColor: h.state.guess, segmento: 'estética', confidence: 0.9,
          },
        }],
      }),
    }
  },
}))
vi.mock('../server/scrape.mjs', () => ({ scrapeSite: vi.fn().mockResolvedValue('Clínica Bem — harmonização facial') }))
vi.mock('../server/brandcolor.mjs', () => ({ extractBrandStyle: vi.fn().mockImplementation(async () => ({ color: h.state.color, theme: h.state.theme })) }))
// render do browser indisponível no teste → null → usa o heurístico mockado acima
vi.mock('../server/render.mjs', () => ({ renderStyle: vi.fn().mockResolvedValue(null) }))

import { identify } from '../server/identify.mjs'

describe('identify', () => {
  beforeEach(() => { h.state.niche = 'clinicas'; h.state.empresa = 'Clínica Bem'; h.state.color = '#820ad1'; h.state.theme = 'light'; h.state.guess = '#ff6f91' })
  it('devolve nicho + empresa do tool_use; cor + tema = os REAIS extraídos do site', async () => {
    const out = await identify('clinicabem.com.br')
    expect(out.niche).toBe('clinicas')
    expect(out.empresa).toBe('Clínica Bem')
    expect(out.primaryColor).toBe('#820ad1') // cor REAL extraída vence o chute do modelo
    expect(out.theme).toBe('light')          // tema segue o site do cliente
  })
  it('nicho fora da lista cai para generico', async () => {
    h.state.niche = 'zzz'
    const out = await identify('x.com')
    expect(out.niche).toBe('generico')
  })
  it('sanitiza empresa placeholder (<UNKNOWN> → vazio)', async () => {
    h.state.empresa = '<UNKNOWN>'
    const out = await identify('x.com')
    expect(out.empresa).toBe('')
  })
  it('site blindado (sem cor extraída) → usa o chute VALIDADO do modelo como último recurso', async () => {
    h.state.color = null // render + heurístico falharam (anti-bot)
    const out = await identify('x.com')
    expect(out.primaryColor).toBe('#ff6f91') // chute saturado do modelo, melhor que accent genérico
  })
  it('sem cor extraída E chute do modelo neutro/inválido → primaryColor vazio (accent do nicho)', async () => {
    h.state.color = null
    h.state.guess = '#f4f4f4' // quase-branco → validBrandHex rejeita
    const out = await identify('x.com')
    expect(out.primaryColor).toBe('')
  })
})
