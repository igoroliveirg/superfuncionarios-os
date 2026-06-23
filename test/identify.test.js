import { describe, it, expect, vi, beforeEach } from 'vitest'

const h = vi.hoisted(() => ({ state: { niche: 'clinicas', empresa: 'Clínica Bem' } }))

vi.mock('@anthropic-ai/sdk', () => ({
  default: class {
    messages = {
      create: async () => ({
        content: [{
          type: 'tool_use', name: 'identify', input: {
            niche: h.state.niche, empresa: h.state.empresa, oferta: 'protocolo facial',
            primaryColor: '#ff6f91', segmento: 'estética', confidence: 0.9,
          },
        }],
      }),
    }
  },
}))
vi.mock('../server/scrape.mjs', () => ({ scrapeSite: vi.fn().mockResolvedValue('Clínica Bem — harmonização facial') }))

import { identify } from '../server/identify.mjs'

describe('identify', () => {
  beforeEach(() => { h.state.niche = 'clinicas'; h.state.empresa = 'Clínica Bem' })
  it('devolve nicho + vars do tool_use', async () => {
    const out = await identify('clinicabem.com.br')
    expect(out.niche).toBe('clinicas')
    expect(out.empresa).toBe('Clínica Bem')
    expect(out.primaryColor).toMatch(/^#/)
  })
  it('nicho fora da lista cai para generico', async () => {
    h.state.niche = 'zzz'
    const out = await identify('x.com')
    expect(out.niche).toBe('generico')
  })
  it('sanitiza placeholders do modelo (<UNKNOWN> → vazio + cor da marca)', async () => {
    h.state.empresa = '<UNKNOWN>'
    const out = await identify('x.com')
    expect(out.empresa).toBe('')
    expect(out.primaryColor).toBe('#ff8a3c') // sem empresa → volta pra cor da marca
  })
})
