import { describe, it, expect } from 'vitest'
import { deepMerge, interpolate, mergePack } from '../src/niches/util.js'

describe('deepMerge', () => {
  it('mescla objetos recursivamente', () => {
    const base = { a: { x: 1, y: 2 }, b: 3 }
    const over = { a: { y: 9 } }
    expect(deepMerge(base, over)).toEqual({ a: { x: 1, y: 9 }, b: 3 })
  })
  it('array do override SUBSTITUI o do base', () => {
    expect(deepMerge({ list: [1, 2, 3] }, { list: [9] })).toEqual({ list: [9] })
  })
  it('não muta o base', () => {
    const base = { a: { x: 1 } }
    deepMerge(base, { a: { x: 2 } })
    expect(base.a.x).toBe(1)
  })
  it('override vazio devolve cópia do base', () => {
    expect(deepMerge({ a: 1 }, {})).toEqual({ a: 1 })
  })
})

describe('interpolate', () => {
  const vars = { empresa: 'Clínica Bem', oferta: 'protocolo de 8 semanas', primaryColor: '#ff0' }
  it('troca tokens em strings aninhadas', () => {
    const o = { h: 'Bem-vindo à {empresa}', n: 42, list: ['{oferta} já', 'fixo'] }
    expect(interpolate(o, vars)).toEqual({
      h: 'Bem-vindo à Clínica Bem', n: 42, list: ['protocolo de 8 semanas já', 'fixo'],
    })
  })
  it('aceita {cor} como alias de primaryColor', () => {
    expect(interpolate({ c: '{cor}' }, vars)).toEqual({ c: '#ff0' })
  })
  it('token sem valor vira string vazia', () => {
    expect(interpolate({ x: 'a{inexistente}b' }, vars)).toEqual({ x: 'ab' })
  })
})

describe('mergePack', () => {
  // base mínimo no formato real: painéis + scripts com bloco connect preservável
  const base = () => ({
    pesquisa: { persona: { nome: 'Ricardo', idade: 43, contexto: 'SP' }, dores: ['a', 'b'] },
    metricas: { FUNNEL: [1, 2, 3] },
    scripts: {
      construtor: {
        greeting: 'oi base',
        turns: [
          { chip: 'x', reply: 'r0base' },
          { chip: 'pub', reply: 'r1base', connect: { prompt: 'ligar CRM', items: [1, 2] } },
        ],
      },
    },
  })

  it('personaliza campos do painel e herda o resto do molde', () => {
    const out = mergePack(base(), { pesquisa: { persona: { nome: 'Marina' }, dores: ['x', 'y', 'z'] } })
    expect(out.pesquisa.persona.nome).toBe('Marina')
    expect(out.pesquisa.persona.contexto).toBe('SP')  // herdado
    expect(out.pesquisa.persona.idade).toBe(43)       // herdado
    expect(out.pesquisa.dores).toEqual(['x', 'y', 'z']) // array substitui
  })

  it('sobrescreve greeting/chip/reply por índice e PRESERVA o bloco connect', () => {
    const gen = { scripts: { construtor: { greeting: 'oi nubank', turns: [{ reply: 'r0novo' }, { reply: 'r1novo' }] } } }
    const out = mergePack(base(), gen)
    expect(out.scripts.construtor.greeting).toBe('oi nubank')
    expect(out.scripts.construtor.turns[0].reply).toBe('r0novo')
    expect(out.scripts.construtor.turns[1].reply).toBe('r1novo')
    expect(out.scripts.construtor.turns[1].connect).toEqual({ prompt: 'ligar CRM', items: [1, 2] }) // preservado
    expect(out.scripts.construtor.turns[1].chip).toBe('pub') // chip não enviado → herdado
  })

  it('ignora _error e não muta o base', () => {
    const b = base()
    const out = mergePack(b, { _error: 'falhou', pesquisa: { persona: { nome: 'Z' } } })
    expect(out._error).toBeUndefined()
    expect(out.pesquisa.persona.nome).toBe('Z')
    expect(b.pesquisa.persona.nome).toBe('Ricardo') // base intacto
  })

  it('gen nulo/indefinido devolve o base', () => {
    expect(mergePack(base(), null).pesquisa.persona.nome).toBe('Ricardo')
  })
})
