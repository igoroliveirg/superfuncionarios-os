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
import { RESTAURANTE } from './restaurante.js'
import { ACADEMIA } from './academia.js'
import { AUTOMOTIVO } from './automotivo.js'
import { BELEZA } from './beleza.js'
import { PETSHOP } from './petshop.js'
import { TURISMO } from './turismo.js'
import { EVENTOS } from './eventos.js'
import { EDUCACAO } from './educacao.js'
import { REFORMA } from './reforma.js'
import { MODA } from './moda.js'
import { FINANCAS } from './financas.js'
import { SEGUROS } from './seguros.js'
import { SAUDE } from './saude.js'
import { TECNOLOGIA } from './tecnologia.js'
import { CONFEITARIA } from './confeitaria.js'
import { LIMPEZA } from './limpeza.js'
import { ENERGIASOLAR } from './energiasolar.js'
import { AGRO } from './agro.js'
import { LOGISTICA } from './logistica.js'
import { FOTOGRAFIA } from './fotografia.js'

export const NICHES = {
  generico: GENERICO,
  infoprodutos: INFOPRODUTOS,
  clinicas: CLINICAS,
  ecommerce: ECOMMERCE,
  servicos: SERVICOS,
  agencias: AGENCIAS,
  app: APP,
  imobiliaria: IMOBILIARIA,
  restaurante: RESTAURANTE,
  academia: ACADEMIA,
  automotivo: AUTOMOTIVO,
  beleza: BELEZA,
  petshop: PETSHOP,
  turismo: TURISMO,
  eventos: EVENTOS,
  educacao: EDUCACAO,
  reforma: REFORMA,
  moda: MODA,
  financas: FINANCAS,
  seguros: SEGUROS,
  saude: SAUDE,
  tecnologia: TECNOLOGIA,
  confeitaria: CONFEITARIA,
  limpeza: LIMPEZA,
  energiasolar: ENERGIASOLAR,
  agro: AGRO,
  logistica: LOGISTICA,
  fotografia: FOTOGRAFIA,
}

// Resolve o pack final = BASE_PACK + override do nicho, interpolado com as
// variáveis do cliente ({empresa}/{oferta}/{cor}). Nicho desconhecido → genérico.
export function resolvePack(nicheId, vars = {}) {
  const override = NICHES[nicheId] ?? NICHES.generico
  return interpolate(deepMerge(BASE_PACK, override), vars)
}
