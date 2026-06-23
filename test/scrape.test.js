import { describe, it, expect, vi, beforeEach } from 'vitest'
import { scrapeSite } from '../server/scrape.mjs'

beforeEach(() => { vi.restoreAllMocks() })

describe('scrapeSite', () => {
  it('usa Jina Reader e devolve markdown limpo', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, text: async () => '# Clínica Bem\nHarmonização facial' })
    const out = await scrapeSite('clinicabem.com.br')
    expect(out).toContain('Harmonização facial')
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('r.jina.ai'), expect.any(Object))
  })
  it('trunca conteúdo gigante', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, text: async () => 'x'.repeat(200000) })
    const out = await scrapeSite('site.com')
    expect(out.length).toBeLessThanOrEqual(50000)
  })
  it('normaliza URL sem protocolo', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true, text: async () => 'conteudo suficiente pra passar do minimo de 50 chars aqui' })
    await scrapeSite('site.com')
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('https://site.com'), expect.any(Object))
  })
})
