import { describe, it, expect, vi, beforeEach } from 'vitest'

const h = vi.hoisted(() => ({ state: { niche: 'clinicas' } }))

vi.mock('@anthropic-ai/sdk', () => ({
  default: class {
    messages = {
      create: async () => ({
        content: [{
          type: 'tool_use', name: 'identify', input: {
            niche: h.state.niche, empresa: 'Clínica Bem', oferta: 'protocolo facial',
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
  beforeEach(() => { h.state.niche = 'clinicas' })
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
})
