import { describe, it, expect } from 'vitest'
import { resolvePack, NICHES } from '../src/niches/index.js'

describe('resolvePack', () => {
  const vars = { empresa: 'Acme', oferta: 'plano X', primaryColor: '#abc' }
  it('genérico devolve o base interpolado', () => {
    const p = resolvePack('generico', vars)
    expect(p.conteudo.igUser).toBe('Acme')           // {empresa} resolvido
    expect(p.pesquisa.persona.nome).toBe('Ricardo')  // base preservado
  })
  it('nicho desconhecido cai no genérico (não quebra)', () => {
    expect(() => resolvePack('inexistente', vars)).not.toThrow()
  })
  it('todos os nichos registrados resolvem sem erro', () => {
    for (const id of Object.keys(NICHES)) expect(() => resolvePack(id, vars)).not.toThrow()
  })
})
