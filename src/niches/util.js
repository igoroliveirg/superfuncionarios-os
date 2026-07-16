const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v)

// override raso por chave: objetos mesclam recursivamente; arrays do override
// SUBSTITUEM os do base (não concatenam). Nunca muta o base.
export function deepMerge(base, over) {
  if (over === undefined || over === null) return structuredClone(base)
  if (!isObj(base) || !isObj(over)) return structuredClone(over)
  const out = structuredClone(base)
  for (const k of Object.keys(over)) {
    out[k] = isObj(base?.[k]) && isObj(over[k]) ? deepMerge(base[k], over[k]) : structuredClone(over[k])
  }
  return out
}

// Funde o pack gerado pela IA (gen) por cima do pack base já resolvido.
// Painéis: deepMerge normal (arrays do gen substituem). scripts: merge por
// ÍNDICE de turn (só greeting/chip/reply), preservando os blocos `connect` e a
// estrutura do roteiro base — assim a UI nunca perde as integrações.
export function mergePack(base, gen) {
  if (!gen || typeof gen !== 'object') return base
  const { scripts: genScripts, _error, ...panels } = gen
  const out = deepMerge(base, panels)
  if (genScripts && base.scripts) {
    out.scripts = structuredClone(base.scripts)
    for (const id of Object.keys(genScripts)) {
      const g = genScripts[id], b = out.scripts[id]
      if (!b) continue
      if (g.greeting) b.greeting = g.greeting
      if (Array.isArray(g.turns)) {
        g.turns.forEach((t, i) => {
          if (!b.turns?.[i] || !t) return
          if (t.chip) b.turns[i].chip = t.chip
          if (t.reply) b.turns[i].reply = t.reply
        })
      }
    }
  }
  return out
}

// substitui {empresa}/{oferta}/{cor}/{primaryColor}/etc em qualquer string
// (recursivo); preserva não-strings. {cor} é alias de primaryColor.
export function interpolate(node, vars) {
  const map = { ...vars, cor: vars.primaryColor ?? vars.cor }
  const sub = (s) => s.replace(/\{(\w+)\}/g, (_, k) => (map[k] ?? '').toString())
  const walk = (n) => {
    if (typeof n === 'string') return sub(n)
    if (Array.isArray(n)) return n.map(walk)
    if (isObj(n)) { const o = {}; for (const k of Object.keys(n)) o[k] = walk(n[k]); return o }
    return n
  }
  return walk(node)
}
