import { generatePack } from '../server/generate.mjs'

// Função serverless Vercel (produção). Gera o pack personalizado do site do cliente.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  try {
    const { url } = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    res.status(200).json(await generatePack(url))
  } catch (e) {
    res.status(500).json({ _error: String(e?.message || e) })
  }
}
