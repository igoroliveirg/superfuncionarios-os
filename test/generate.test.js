import { describe, it, expect } from 'vitest'
import { fixSplit } from '../server/generate.mjs'

describe('fixSplit (espaços de fronteira do título em 3 partes)', () => {
  it('injeta espaço entre pre|destaque|post quando o modelo não manda', () => {
    const { pre, grad, post } = fixSplit('Banco feito para', 'pessoas que querem', 'sua vida')
    expect(pre + grad + post).toBe('Banco feito para pessoas que querem sua vida')
  })
  it('não duplica espaço já existente (molde com espaços embutidos)', () => {
    const { pre, grad, post } = fixSplit('Crie ', '5 funcionários', ' rodando')
    expect(pre + grad + post).toBe('Crie 5 funcionários rodando')
  })
  it('lida com partes vazias sem deixar espaço solto', () => {
    expect(fixSplit('', 'Só o destaque', '')).toEqual({ pre: '', grad: 'Só o destaque', post: '' })
  })
})
