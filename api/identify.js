import { identify } from '../server/identify.mjs'

// Função serverless Vercel (produção). A chave vem das env vars do projeto Vercel.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  try {
    const { url } = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    res.status(200).json(await identify(url))
  } catch (e) {
    res.status(500).json({ niche: 'generico', error: String(e?.message || e) })
  }
}
