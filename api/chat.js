import { chatTurn } from '../server/chat.mjs'

// Função serverless Vercel (produção). Roda um turno de conversa (Claude + imagem).
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' })
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    res.status(200).json(await chatTurn(body))
  } catch (e) {
    res.status(500).json({ text: 'Erro ao conversar agora.', images: [], _error: String(e?.message || e) })
  }
}
