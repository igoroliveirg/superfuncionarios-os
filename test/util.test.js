import { describe, it, expect } from 'vitest'
import { deepMerge, interpolate } from '../src/niches/util.js'

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
