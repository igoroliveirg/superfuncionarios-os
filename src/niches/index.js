import { BASE_PACK } from './base.js'
import { deepMerge, interpolate } from './util.js'
import { GENERICO } from './generico.js'
import { INFOPRODUTOS } from './infoprodutos.js'
import { CLINICAS } from './clinicas.js'
import { ECOMMERCE } from './ecommerce.js'
import { SERVICOS } from './servicos.js'
import { AGENCIAS } from './agencias.js'
import { APP } from './app.js'
import { IMOBILIARIA } from './imobiliaria.js'

export const NICHES = {
  generico: GENERICO,
  infoprodutos: INFOPRODUTOS,
  clinicas: CLINICAS,
  ecommerce: ECOMMERCE,
  servicos: SERVICOS,
  agencias: AGENCIAS,
  app: APP,
  imobiliaria: IMOBILIARIA,
}

// Resolve o pack final = BASE_PACK + override do nicho, interpolado com as
// variáveis do cliente ({empresa}/{oferta}/{cor}). Nicho desconhecido → genérico.
export function resolvePack(nicheId, vars = {}) {
  const override = NICHES[nicheId] ?? NICHES.generico
  return interpolate(deepMerge(BASE_PACK, override), vars)
}
