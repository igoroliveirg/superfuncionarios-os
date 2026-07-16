import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Middleware de dev: serve os POST /api/* no mesmo origin (porta 5180), sem 2º
// processo. A chave fica no process.env do servidor — nunca no client.
function apiMiddleware() {
  // registra uma rota POST que passa o body inteiro (objeto) pro handler e
  // responde com o retorno em JSON. Cada handler decide o que ler do body.
  const route = (server, path, handler, onError) => {
    server.middlewares.use(path, (req, res) => {
      if (req.method !== 'POST') { res.statusCode = 405; return res.end('method') }
      let body = ''
      req.on('data', (c) => (body += c))
      req.on('end', async () => {
        try {
          const parsed = JSON.parse(body || '{}')
          const out = await handler(parsed)
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(out))
        } catch (e) {
          res.statusCode = 500
          res.end(JSON.stringify(onError(e)))
        }
      })
    })
  }
  return {
    name: 'sfos-api',
    configureServer(server) {
      // pré-aquece o chromium do render no boot (1ª análise já sai rápida)
      import('./server/render.mjs').then((m) => m.prewarm()).catch(() => {})
      route(server, '/api/identify', async (b) => (await import('./server/identify.mjs')).identify(b.url),
        (e) => ({ niche: 'generico', error: String(e?.message || e) }))
      route(server, '/api/generate', async (b) => (await import('./server/generate.mjs')).generatePack(b.url),
        (e) => ({ _error: String(e?.message || e) }))
      route(server, '/api/image', async (b) => (await import('./server/image.mjs')).generateImage(b),
        (e) => ({ _error: String(e?.message || e) }))
      route(server, '/api/chat', async (b) => (await import('./server/chat.mjs')).chatTurn(b),
        (e) => ({ text: 'Erro ao conversar agora.', images: [], _error: String(e?.message || e) }))
    },
  }
}

export default defineConfig(({ mode }) => {
  // '' = carrega TODAS as vars do .env (não só VITE_*) e injeta no process.env
  // do servidor. Como não usamos prefixo VITE_, a chave não vai pro bundle.
  const env = loadEnv(mode, process.cwd(), '')
  process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY || ''
  process.env.JINA_API_KEY = process.env.JINA_API_KEY || env.JINA_API_KEY || ''
  process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || env.OPENAI_API_KEY || ''

  return {
    plugins: [react(), apiMiddleware()],
    server: { port: 5180, open: true },
  }
})
