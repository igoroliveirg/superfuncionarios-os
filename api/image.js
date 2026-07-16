import { generateImage } from '../server/image.mjs'

// Função serverless Vercel (produção). Gera uma imagem via gpt-image-2.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    res.status(200).json(await generateImage(body))
  } catch (e) {
    res.status(500).json({ _error: String(e?.message || e) })
  }
}
