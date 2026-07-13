import { describe, it, expect } from 'vitest'
import { buildSystem, truncate, hasImageTool, IMAGE_TOOL } from '../server/chat.mjs'

const pack = {
  pesquisa: { persona: { contexto: 'Dona de clínica · BH' } },
  construtor: { designs: { hook: 'Rosto renovado' } },
}

describe('buildSystem', () => {
  it('inclui o papel do funcionário e a empresa', () => {
    const s = buildSystem('construtor', { empresa: 'Clínica Aurora', oferta: 'harmonização', niche: 'clinicas' }, pack)
    expect(s).toContain('Clínica Aurora')
    expect(s).toContain('harmonização')
  })
  it('mantém a guarda anti Super Funcionários', () => {
    const s = buildSystem('pesquisa', { empresa: 'ACME', oferta: 'x', niche: 'generico' }, pack)
    expect(s.toLowerCase()).toContain('nunca')
    expect(s.toLowerCase()).toContain('super funcionários')
  })
})

describe('hasImageTool', () => {
  it('só Construtor e Criador geram imagem', () => {
    expect(hasImageTool('construtor')).toBe(true)
    expect(hasImageTool('conteudo')).toBe(true)
    expect(hasImageTool('pesquisa')).toBe(false)
    expect(hasImageTool('copywriter')).toBe(false)
    expect(hasImageTool('metricas')).toBe(false)
  })
})

describe('truncate', () => {
  it('mantém os últimos N turnos', () => {
    const h = Array.from({ length: 20 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: String(i) }))
    const t = truncate(h, 12)
    expect(t.length).toBe(12)
    expect(t[t.length - 1].content).toBe('19')
  })
  it('histórico curto passa inteiro', () => {
    const h = [{ role: 'user', content: 'oi' }]
    expect(truncate(h, 12)).toEqual(h)
  })
})

describe('IMAGE_TOOL', () => {
  it('tem schema com prompt e formato', () => {
    expect(IMAGE_TOOL.name).toBe('gerar_imagem')
    expect(IMAGE_TOOL.input_schema.properties).toHaveProperty('prompt')
    expect(IMAGE_TOOL.input_schema.properties).toHaveProperty('formato')
  })
})
