import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Middleware de dev: serve POST /api/identify no mesmo origin (porta 5180),
// sem 2º processo. A chave fica no process.env do servidor — nunca no client.
function apiMiddleware() {
  return {
    name: 'sfos-api',
    configureServer(server) {
      // pré-aquece o chromium do render no boot (1ª análise já sai rápida)
      import('./server/render.mjs').then((m) => m.prewarm()).catch(() => {})
      server.middlewares.use('/api/identify', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; return res.end('method') }
        let body = ''
        req.on('data', (c) => (body += c))
        req.on('end', async () => {
          try {
            const { url } = JSON.parse(body || '{}')
            const { identify } = await import('./server/identify.mjs')
            const out = await identify(url)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(out))
          } catch (e) {
            res.statusCode = 500
            res.end(JSON.stringify({ niche: 'generico', error: String(e?.message || e) }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // '' = carrega TODAS as vars do .env (não só VITE_*) e injeta no process.env
  // do servidor. Como não usamos prefixo VITE_, a chave não vai pro bundle.
  const env = loadEnv(mode, process.cwd(), '')
  process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY || ''
  process.env.JINA_API_KEY = process.env.JINA_API_KEY || env.JINA_API_KEY || ''

  return {
    plugins: [react(), apiMiddleware()],
    server: { port: 5180, open: true },
  }
})
