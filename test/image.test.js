import { describe, it, expect } from 'vitest'
import { sizeFor, buildImagePrompt, generateImage } from '../server/image.mjs'

describe('sizeFor', () => {
  it('feed e post são quadrados', () => {
    expect(sizeFor('feed')).toBe('1024x1024')
    expect(sizeFor('post')).toBe('1024x1024')
  })
  it('story é retrato', () => {
    expect(sizeFor('story')).toBe('1024x1536')
  })
  it('formato desconhecido cai no quadrado', () => {
    expect(sizeFor('xyz')).toBe('1024x1024')
  })
})

describe('buildImagePrompt', () => {
  it('ancora no nicho, oferta e cor da marca', () => {
    const p = buildImagePrompt({
      niche: 'clinicas', empresa: 'Clínica Aurora', oferta: 'harmonização facial',
      brandColor: '#33b9ff', hook: 'Seu rosto renovado em 30 dias', format: 'feed',
    })
    expect(p).toContain('Clínica Aurora')
    expect(p).toContain('harmonização facial')
    expect(p.toLowerCase()).toContain('sem texto') // imagem pura, sem copy nos pixels
    expect(p).toContain('#33b9ff')
  })
  it('não vaza a marca Super Funcionários', () => {
    const p = buildImagePrompt({ niche: 'generico', empresa: 'ACME', oferta: 'x', hook: 'y', format: 'feed' })
    expect(p.toLowerCase()).not.toContain('super funcionários')
    expect(p.toLowerCase()).not.toContain('imersão')
  })
})

describe('generateImage sem chave', () => {
  it('retorna null quando OPENAI_API_KEY está vazia', async () => {
    const prev = process.env.OPENAI_API_KEY
    process.env.OPENAI_API_KEY = ''
    const out = await generateImage({ niche: 'generico', empresa: 'ACME', oferta: 'x', hook: 'y', format: 'feed' })
    expect(out).toBeNull()
    process.env.OPENAI_API_KEY = prev
  })
})
